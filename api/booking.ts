import { bookingInput, formatBooking, whatsappLink } from "../shared/booking";
import type { BookingInput } from "../shared/booking";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return undefined;
  }
}

async function persistBooking(input: BookingInput) {
  const databaseUrl = process.env.NEON_DATABASE_URL;
  if (!databaseUrl) throw new Error("NEON_DATABASE_URL is not configured");

  // Keep database SDK loading inside the request path. This prevents a missing
  // or incompatible optional runtime dependency from crashing the complete
  // Vercel Function before it can return a controlled HTTP response.
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(databaseUrl);
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
  return created?.id ?? null;
}

async function sendOwnerEmail(subject: string, body: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!key || !from) return false;

  // Resend is only needed after persistence succeeds. Loading it lazily keeps
  // malformed public requests independent from the email SDK runtime.
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: ["iobidzeioseb@gmail.com"],
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

  const parsed = bookingInput.safeParse(parseBody(req.body));
  if (!parsed.success) {
    res.status(422).json({ error: "Invalid booking request" });
    return;
  }

  const { subject, body } = formatBooking(parsed.data);
  try {
    const id = await persistBooking(parsed.data);
    const emailed = await sendOwnerEmail(subject, body).catch(error => {
      console.warn("[booking] Resend delivery failed", error);
      return false;
    });
    res.status(200).json({
      id,
      persisted: id !== null,
      delivered: emailed,
      emailed,
      notified: false,
      whatsapp: whatsappLink(parsed.data),
    });
  } catch (error) {
    console.error("[booking] Vercel submission failed", error);
    res.status(503).json({ error: "Booking service unavailable" });
  }
}
