import { CONTACT } from "@shared/venue";
import { getDb } from "./db";
import { bookings, type InsertBooking } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { bookingInput, formatBooking, whatsappLink, type BookingInput } from "../shared/booking";

export { bookingInput, formatBooking, whatsappLink, type BookingInput } from "../shared/booking";

async function sendOwnerEmail(subject: string, body: string): Promise<boolean> {
  const base = process.env.BUILT_IN_FORGE_API_URL;
  const key = process.env.BUILT_IN_FORGE_API_KEY;
  if (!base || !key) return false;
  try {
    const res = await fetch(`${base}/v1/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ to: CONTACT.email, subject, text: body }),
    });
    return res.ok;
  } catch (err) {
    console.warn("[booking] email dispatch failed:", err);
    return false;
  }
}

export async function submitBooking(input: BookingInput) {
  const { subject, body } = formatBooking(input);
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
  const [emailed, notified] = await Promise.all([
    sendOwnerEmail(subject, body),
    notifyOwner({ title: subject, content: body }).catch(() => false),
  ]);
  if ((emailed || notified) && db && savedId) {
    try {
      const { eq } = await import("drizzle-orm");
      await db.update(bookings).set({ notified: 1 }).where(eq(bookings.id, savedId));
    } catch {
      /* Non-critical owner-notified marker. */
    }
  }
  return { id: savedId, persisted: savedId !== null, delivered: emailed || notified, emailed, notified, whatsapp: whatsappLink(input) };
}
