import { DEFAULT_CONTENT } from "../shared/content.js";
import { readSection } from "./_lib/content.js";
import { getSql, type Sql } from "./_lib/db.js";
import { parseBody, type ApiRequest, type ApiResponse } from "./_lib/http.js";

type BookingInput = {
  name: string;
  phone: string;
  checkIn?: string;
  checkOut?: string;
  interest: "cottage" | "event" | "pool" | "restaurant" | "whole";
  unit?: string;
  guests?: number;
  notes?: string;
  lang: "ka" | "en" | "ru" | "ar" | "fr" | "es";
};

const INTERESTS = new Set<BookingInput["interest"]>(["cottage", "event", "pool", "restaurant", "whole"]);
const LANGUAGES = new Set<BookingInput["lang"]>(["ka", "en", "ru", "ar", "fr", "es"]);

/** Unit ids and guest limits: the owner-edited content when available, the compiled defaults otherwise. */
type UnitLimits = Map<string, number>;

const STATIC_UNIT_LIMITS: UnitLimits = new Map(DEFAULT_CONTENT.units.units.map(unit => [unit.id, unit.maxGuests]));

async function loadUnitLimits(sql: Sql | null): Promise<UnitLimits> {
  if (!sql) return STATIC_UNIT_LIMITS;
  try {
    const stored = await readSection(sql, "units");
    if (stored) return new Map(stored.value.units.map(unit => [unit.id, unit.maxGuests]));
  } catch (error) {
    console.error("[booking] unit limits lookup failed, using defaults", error);
  }
  return STATIC_UNIT_LIMITS;
}

async function loadContact(sql: Sql | null) {
  if (sql) {
    try {
      const stored = await readSection(sql, "contact");
      if (stored) return stored.value;
    } catch (error) {
      console.error("[booking] contact lookup failed, using defaults", error);
    }
  }
  return DEFAULT_CONTENT.contact;
}

function parseOptionalText(value: Record<string, unknown>, key: "checkIn" | "checkOut" | "notes", limit: number) {
  const raw = value[key];
  if (raw === undefined || raw === "") return undefined;
  return typeof raw === "string" && raw.trim().length <= limit ? raw.trim() : null;
}

export function parseBooking(body: unknown, limits: UnitLimits): BookingInput | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const value = body as Record<string, unknown>;
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const phone = typeof value.phone === "string" ? value.phone.trim() : "";
  const interest = value.interest;
  const lang = value.lang;

  if (
    name.length < 2 ||
    name.length > 160 ||
    !/^[+()\d\s-]{6,40}$/.test(phone) ||
    typeof interest !== "string" ||
    !INTERESTS.has(interest as BookingInput["interest"]) ||
    typeof lang !== "string" ||
    !LANGUAGES.has(lang as BookingInput["lang"])
  ) {
    return null;
  }

  const checkIn = parseOptionalText(value, "checkIn", 32);
  const checkOut = parseOptionalText(value, "checkOut", 32);
  const notes = parseOptionalText(value, "notes", 2000);
  if (checkIn === null || checkOut === null || notes === null) return null;

  const unit = value.unit;
  if (unit !== undefined && (typeof unit !== "string" || !limits.has(unit))) return null;

  const guests = value.guests;
  if (guests !== undefined && (typeof guests !== "number" || !Number.isInteger(guests) || guests < 1 || guests > 200)) return null;
  if (typeof unit === "string" && typeof guests === "number" && guests > (limits.get(unit) ?? 0)) return null;

  return {
    name,
    phone,
    interest: interest as BookingInput["interest"],
    lang: lang as BookingInput["lang"],
    ...(checkIn ? { checkIn } : {}),
    ...(checkOut ? { checkOut } : {}),
    ...(notes ? { notes } : {}),
    ...(typeof unit === "string" ? { unit } : {}),
    ...(typeof guests === "number" ? { guests } : {}),
  };
}

function formatBooking(input: BookingInput) {
  const lines = [
    `სახელი / Name: ${input.name}`,
    `ტელეფონი / Phone: ${input.phone}`,
    `ინტერესი / Interest: ${input.interest}`,
  ];
  if (input.unit) lines.push(`ერთეული / Unit: ${input.unit}`);
  if (input.checkIn || input.checkOut) lines.push(`თარიღები / Dates: ${input.checkIn ?? "—"} → ${input.checkOut ?? "—"}`);
  if (input.guests) lines.push(`სტუმრები / Guests: ${input.guests}`);
  if (input.notes) lines.push(`შენიშვნა / Notes: ${input.notes}`);
  lines.push(`ენა / Browsing language: ${input.lang}`);
  return { subject: `ახალი მოთხოვნა — ${input.name}`, body: lines.join("\n") };
}

function whatsappLink(input: BookingInput, whatsappNumber: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatBooking(input).body)}`;
}

async function persistBooking(sql: Sql | null, input: BookingInput) {
  if (!sql) throw new Error("NEON_DATABASE_URL is not configured");
  const [created] = await sql`
    INSERT INTO bookings (name, phone, check_in, check_out, interest, unit, guests, notes, lang)
    VALUES (
      ${input.name},
      ${input.phone},
      ${input.checkIn ?? null},
      ${input.checkOut ?? null},
      ${input.interest},
      ${input.unit ?? null},
      ${input.guests ?? null},
      ${input.notes ?? null},
      ${input.lang}
    )
    RETURNING id
  `;
  return (created as { id?: number } | undefined)?.id ?? null;
}

async function sendOwnerEmail(to: string, subject: string, body: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!key || !from) return false;

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text: body,
  });
  return !error;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const sql = await getSql();
  const limits = await loadUnitLimits(sql);
  const parsed = parseBooking(parseBody(req.body), limits);
  if (!parsed) {
    res.status(422).json({ error: "Invalid booking request" });
    return;
  }

  const contact = await loadContact(sql);
  const { subject, body } = formatBooking(parsed);
  try {
    const id = await persistBooking(sql, parsed);
    const emailed = await sendOwnerEmail(contact.email, subject, body).catch(error => {
      console.warn("[booking] Resend delivery failed", error);
      return false;
    });
    res.status(200).json({
      id,
      persisted: id !== null,
      delivered: emailed,
      emailed,
      notified: false,
      whatsapp: whatsappLink(parsed, contact.whatsapp),
    });
  } catch (error) {
    console.error("[booking] Vercel submission failed", error);
    res.status(503).json({ error: "Booking service unavailable", whatsapp: whatsappLink(parsed, contact.whatsapp) });
  }
}
