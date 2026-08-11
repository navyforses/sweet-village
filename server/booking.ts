import { z } from "zod";
import { CONTACT } from "@shared/venue";
import { getDb } from "./db";
import { bookings, type InsertBooking } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";

export const LANG_CODES = ["ka", "en", "ru", "ar", "fr", "es"] as const;
export const INTERESTS = ["cottage", "event", "pool", "restaurant", "whole"] as const;
export const UNIT_IDS = ["small-a", "small-b", "large-a", "large-b", "grand"] as const;

export const bookingInput = z.object({
  name: z.string().trim().min(2).max(160),
  // Guests write numbers in many shapes; keep it permissive but bounded.
  phone: z
    .string()
    .trim()
    .min(6)
    .max(40)
    .regex(/^[+()\d\s-]+$/, "invalid phone"),
  checkIn: z.string().trim().max(32).optional(),
  checkOut: z.string().trim().max(32).optional(),
  interest: z.enum(INTERESTS),
  /** Only meaningful when interest is "cottage". */
  unit: z.enum(UNIT_IDS).optional(),
  guests: z.number().int().min(1).max(200).optional(),
  notes: z.string().trim().max(2000).optional(),
  lang: z.enum(LANG_CODES),
});

export type BookingInput = z.infer<typeof bookingInput>;

const LANG_LABEL: Record<string, string> = {
  ka: "ქართული (Georgian)",
  en: "English",
  ru: "Русский (Russian)",
  ar: "العربية (Arabic)",
  fr: "Français (French)",
  es: "Español (Spanish)",
};

const INTEREST_LABEL: Record<string, string> = {
  cottage: "კოტეჯი / Cottage stay",
  event: "ღონისძიება / Event",
  pool: "აუზი / Pool day visit",
  restaurant: "რესტორანი / Restaurant",
  whole: "მთელი კომპლექსი / Whole property",
};

const UNIT_LABEL: Record<string, string> = {
  "small-a": "მცირე კოტეჯი I / Small cottage I (2 beds, up to 4)",
  "small-b": "მცირე კოტეჯი II / Small cottage II (2 beds, up to 4)",
  "large-a": "დიდი კოტეჯი — ნომერი A / Large cottage Room A (4 beds, 2 floors)",
  "large-b": "დიდი კოტეჯი — ნომერი B / Large cottage Room B (4 beds, 2 floors)",
  grand: "დიდი ნომერი / Grand room (5 beds, up to 6)",
};

/**
 * Human-readable summary of an enquiry. Deliberately bilingual: the owner
 * reads Georgian, but the guest's own language matters for how to reply.
 */
export function formatBooking(input: BookingInput): { subject: string; body: string } {
  const lines = [
    `სახელი / Name: ${input.name}`,
    `ტელეფონი / Phone: ${input.phone}`,
    `ინტერესი / Interest: ${INTEREST_LABEL[input.interest] ?? input.interest}`,
  ];

  if (input.unit) {
    lines.push(`ერთეული / Unit: ${UNIT_LABEL[input.unit] ?? input.unit}`);
  }

  if (input.checkIn || input.checkOut) {
    lines.push(
      `თარიღები / Dates: ${input.checkIn || "—"} → ${input.checkOut || "—"}`,
    );
  }
  if (input.guests) lines.push(`სტუმრები / Guests: ${input.guests}`);
  if (input.notes) lines.push(`შენიშვნა / Notes: ${input.notes}`);

  lines.push(`ენა / Browsing language: ${LANG_LABEL[input.lang] ?? input.lang}`);

  return {
    subject: `ახალი მოთხოვნა — ${input.name} (${
      input.unit ? UNIT_LABEL[input.unit].split(" / ")[0] : (INTEREST_LABEL[input.interest] ?? input.interest)
    })`,
    body: lines.join("\n"),
  };
}

/** Pre-filled WhatsApp deep link the guest can use as a fallback channel. */
export function whatsappLink(input: BookingInput): string {
  const { body } = formatBooking(input);
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`;
}

async function sendOwnerEmail(subject: string, body: string): Promise<boolean> {
  const base = process.env.BUILT_IN_FORGE_API_URL;
  const key = process.env.BUILT_IN_FORGE_API_KEY;
  if (!base || !key) return false;

  try {
    const res = await fetch(`${base}/v1/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        to: CONTACT.email,
        subject,
        text: body,
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn("[booking] email dispatch failed:", err);
    return false;
  }
}

export async function submitBooking(input: BookingInput) {
  const { subject, body } = formatBooking(input);

  // Persist first: the lead must survive any delivery failure.
  let savedId: number | null = null;
  const db = await getDb();
  if (db) {
    try {
      const row: InsertBooking = {
        name: input.name,
        phone: input.phone,
        checkIn: input.checkIn ?? null,
        checkOut: input.checkOut ?? null,
        interest: input.interest,
        unit: input.unit ?? null,
        guests: input.guests ?? null,
        notes: input.notes ?? null,
        lang: input.lang,
      };
      const result = await db.insert(bookings).values(row);
      savedId = Number((result as unknown as { insertId?: number }).insertId ?? 0) || null;
    } catch (err) {
      console.error("[booking] failed to persist:", err);
    }
  }

  // Then notify through both channels; either succeeding is enough.
  const [emailed, notified] = await Promise.all([
    sendOwnerEmail(subject, body),
    notifyOwner({ title: subject, content: body }).catch(() => false),
  ]);

  if ((emailed || notified) && db && savedId) {
    try {
      const { eq } = await import("drizzle-orm");
      await db.update(bookings).set({ notified: 1 }).where(eq(bookings.id, savedId));
    } catch {
      /* non-critical */
    }
  }

  return {
    id: savedId,
    /** Persisted means the lead is safe even if both channels failed. */
    persisted: savedId !== null,
    /** True only when the owner was actually reached on some channel. */
    delivered: emailed || notified,
    emailed,
    notified,
    whatsapp: whatsappLink(input),
  };
}
