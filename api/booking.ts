type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

type BookingInput = {
  name: string;
  phone: string;
  checkIn?: string;
  checkOut?: string;
  interest: "cottage" | "event" | "pool" | "restaurant" | "whole";
  unit?: "small-a" | "small-b" | "large-a" | "large-b" | "grand";
  guests?: number;
  notes?: string;
  lang: "ka" | "en" | "ru" | "ar" | "fr" | "es";
};

const OWNER_EMAIL = "iobidzeioseb@gmail.com";
const WHATSAPP_NUMBER = "995599639614";
const INTERESTS = new Set<BookingInput["interest"]>(["cottage", "event", "pool", "restaurant", "whole"]);
const UNITS = new Set<NonNullable<BookingInput["unit"]>>(["small-a", "small-b", "large-a", "large-b", "grand"]);
const LANGUAGES = new Set<BookingInput["lang"]>(["ka", "en", "ru", "ar", "fr", "es"]);

function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return undefined;
  }
}

function parseOptionalText(value: Record<string, unknown>, key: "checkIn" | "checkOut" | "notes", limit: number) {
  const raw = value[key];
  if (raw === undefined || raw === "") return undefined;
  return typeof raw === "string" && raw.trim().length <= limit ? raw.trim() : null;
}

function parseBooking(body: unknown): BookingInput | null {
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
  if (unit !== undefined && (typeof unit !== "string" || !UNITS.has(unit as NonNullable<BookingInput["unit"]>))) return null;

  const guests = value.guests;
  if (guests !== undefined && (typeof guests !== "number" || !Number.isInteger(guests) || guests < 1 || guests > 200)) return null;

  return {
    name,
    phone,
    interest: interest as BookingInput["interest"],
    lang: lang as BookingInput["lang"],
    ...(checkIn ? { checkIn } : {}),
    ...(checkOut ? { checkOut } : {}),
    ...(notes ? { notes } : {}),
    ...(typeof unit === "string" ? { unit: unit as BookingInput["unit"] } : {}),
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

function whatsappLink(input: BookingInput) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formatBooking(input).body)}`;
}

async function persistBooking(input: BookingInput) {
  const databaseUrl = process.env.NEON_DATABASE_URL;
  if (!databaseUrl) throw new Error("NEON_DATABASE_URL is not configured");

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

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [OWNER_EMAIL],
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

  const parsed = parseBooking(parseBody(req.body));
  if (!parsed) {
    res.status(422).json({ error: "Invalid booking request" });
    return;
  }

  const { subject, body } = formatBooking(parsed);
  try {
    const id = await persistBooking(parsed);
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
      whatsapp: whatsappLink(parsed),
    });
  } catch (error) {
    console.error("[booking] Vercel submission failed", error);
    res.status(503).json({ error: "Booking service unavailable", whatsapp: whatsappLink(parsed) });
  }
}
