import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_CONTENT } from "../shared/content";
import { createFakeSql, responseRecorder, type FakeQueryHandler } from "./_lib/testing/fakeNeon";
import bookingHandler from "./booking";

const neonState = vi.hoisted(() => ({ handler: null as null | FakeQueryHandler, calls: [] as { query: string; values: unknown[] }[] }));

vi.mock("@neondatabase/serverless", () => ({
  neon: () => {
    const fake = createFakeSql((query, values) => (neonState.handler ? neonState.handler(query, values) : []));
    neonState.calls = fake.calls;
    return fake.sql;
  },
}));

const validBody = { name: "Test Guest", phone: "+995 599 63 96 14", interest: "cottage", unit: "small-a", guests: 2, lang: "en" };

describe("Vercel booking endpoint", () => {
  beforeEach(() => {
    neonState.handler = null;
    vi.stubEnv("NEON_DATABASE_URL", "");
    vi.stubEnv("RESEND_API_KEY", "");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("only accepts POST requests", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "GET" }, response);
    expect(record.statusCode).toBe(405);
    expect(record.headers.get("Allow")).toBe("POST");
  });

  it("rejects malformed public booking data before calling any service", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "POST", body: { name: "A", phone: "invalid" } }, response);
    expect(record.statusCode).toBe(422);
    expect(record.body).toEqual({ error: "Invalid booking request" });
  });

  it("rejects a Garden Cottage request for more than two guests using the compiled defaults", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "POST", body: { ...validBody, guests: 3 } }, response);
    expect(record.statusCode).toBe(422);
  });

  it("rejects unknown unit ids", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "POST", body: { ...validBody, unit: "penthouse" } }, response);
    expect(record.statusCode).toBe(422);
  });

  it("returns a controlled fallback when a valid request reaches an unconfigured persistence layer", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "POST", body: validBody }, response);
    expect(record.statusCode).toBe(503);
    expect(record.body).toEqual({
      error: "Booking service unavailable",
      whatsapp: expect.stringContaining("https://wa.me/995599639614?text="),
    });
  });

  it("uses the owner-edited guest limits and WhatsApp number when they are stored", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "postgres://fake");
    const units = { units: DEFAULT_CONTENT.units.units.map(unit => (unit.id === "small-a" ? { ...unit, maxGuests: 4, beds: 2 } : unit)) };
    const contact = { ...DEFAULT_CONTENT.contact, whatsapp: "995500000000" };
    neonState.handler = (query, values) => {
      if (query.includes("FROM site_content WHERE key")) {
        const key = String(values[0]);
        const value = key === "units" ? units : key === "contact" ? contact : null;
        return value ? [{ key, value, updated_at: "2026-09-16 10:00:00+00", updated_by: "owner" }] : [];
      }
      if (query.includes("INSERT INTO bookings")) return [{ id: 7 }];
      return [];
    };

    let { record, response } = responseRecorder();
    await bookingHandler({ method: "POST", body: { ...validBody, guests: 4 } }, response);
    expect(record.statusCode).toBe(200);
    expect(record.body).toMatchObject({ id: 7, persisted: true, delivered: false, whatsapp: expect.stringContaining("https://wa.me/995500000000?text=") });

    ({ record, response } = responseRecorder());
    await bookingHandler({ method: "POST", body: { ...validBody, guests: 5 } }, response);
    expect(record.statusCode).toBe(422);
  });
});
