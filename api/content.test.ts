import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_CONTENT } from "../shared/content";
import { createFakeSql, responseRecorder, type FakeQueryHandler } from "./_lib/testing/fakeNeon";
import handler from "./content";

const neonState = vi.hoisted(() => ({ handler: null as null | FakeQueryHandler, calls: [] as { query: string; values: unknown[] }[] }));

vi.mock("@neondatabase/serverless", () => ({
  neon: () => {
    const fake = createFakeSql((query, values) => (neonState.handler ? neonState.handler(query, values) : []));
    neonState.calls = fake.calls;
    return fake.sql;
  },
}));

describe("GET /api/content", () => {
  beforeEach(() => {
    neonState.handler = null;
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("only accepts GET", async () => {
    const { record, response } = responseRecorder();
    await handler({ method: "POST" }, response);
    expect(record.statusCode).toBe(405);
    expect(record.headers.get("Allow")).toBe("GET");
  });

  it("returns an empty, uncached payload when the database is not configured", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "");
    const { record, response } = responseRecorder();
    await handler({ method: "GET" }, response);
    expect(record.statusCode).toBe(200);
    expect(record.body).toEqual({ updatedAt: null, sections: {} });
    expect(record.headers.get("Cache-Control")).toBe("no-store");
  });

  it("returns validated saved sections with an edge cache header", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "postgres://fake");
    const contact = { ...DEFAULT_CONTENT.contact, phone: "+995555000111" };
    neonState.handler = () => [
      { key: "contact", value: contact, updated_at: "2026-09-16 10:00:00.123456+00", updated_by: "owner" },
      { key: "units", value: { units: "broken" }, updated_at: "2026-09-16 11:00:00.000000+00", updated_by: "owner" },
      { key: "bookings", value: { rows: [] }, updated_at: "2026-09-16 12:00:00.000000+00", updated_by: "owner" },
    ];
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const { record, response } = responseRecorder();
    await handler({ method: "GET" }, response);
    expect(record.statusCode).toBe(200);
    expect(record.body).toEqual({ updatedAt: "2026-09-16 10:00:00.123456+00", sections: { contact } });
    expect(record.headers.get("Cache-Control")).toContain("s-maxage=60");
    expect(errors).toHaveBeenCalledTimes(1);
    errors.mockRestore();
  });

  it("answers 502 without caching when the database fails", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "postgres://fake");
    neonState.handler = () => {
      throw new Error("connection refused");
    };
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const { record, response } = responseRecorder();
    await handler({ method: "GET" }, response);
    expect(record.statusCode).toBe(502);
    expect(record.headers.get("Cache-Control")).toBe("no-store");
    errors.mockRestore();
  });
});
