import { z } from "zod";
import { CONTACT } from "./venue";

export const LANG_CODES = ["ka", "en", "ru", "ar", "fr", "es"] as const;
export const INTERESTS = ["cottage", "event", "pool", "restaurant", "whole"] as const;
export const UNIT_IDS = ["small-a", "small-b", "large-a", "large-b", "grand"] as const;

export const bookingInput = z.object({
  name: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(6).max(40).regex(/^[+()\d\s-]+$/, "invalid phone"),
  checkIn: z.string().trim().max(32).optional(),
  checkOut: z.string().trim().max(32).optional(),
  interest: z.enum(INTERESTS),
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
  "small-a": "ბაღის კოტეჯი 1 / Garden Cottage 1 (2 beds, up to 4)",
  "small-b": "ბაღის კოტეჯი 2 / Garden Cottage 2 (2 beds, up to 4)",
  "large-a": "დიდი კოტეჯი — ნომერი A / Large cottage Room A (4 beds, 2 floors)",
  "large-b": "დიდი კოტეჯი — ნომერი B / Large cottage Room B (4 beds, 2 floors)",
  grand: "დიდი ნომერი / Grand room (5 beds, up to 6)",
};

export function formatBooking(input: BookingInput): { subject: string; body: string } {
  const lines = [
    `სახელი / Name: ${input.name}`,
    `ტელეფონი / Phone: ${input.phone}`,
    `ინტერესი / Interest: ${INTEREST_LABEL[input.interest] ?? input.interest}`,
  ];
  if (input.unit) lines.push(`ერთეული / Unit: ${UNIT_LABEL[input.unit] ?? input.unit}`);
  if (input.checkIn || input.checkOut) lines.push(`თარიღები / Dates: ${input.checkIn || "—"} → ${input.checkOut || "—"}`);
  if (input.guests) lines.push(`სტუმრები / Guests: ${input.guests}`);
  if (input.notes) lines.push(`შენიშვნა / Notes: ${input.notes}`);
  lines.push(`ენა / Browsing language: ${LANG_LABEL[input.lang] ?? input.lang}`);
  return {
    subject: `ახალი მოთხოვნა — ${input.name} (${input.unit ? UNIT_LABEL[input.unit].split(" / ")[0] : (INTEREST_LABEL[input.interest] ?? input.interest)})`,
    body: lines.join("\n"),
  };
}

export function whatsappLink(input: BookingInput): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(formatBooking(input).body)}`;
}
