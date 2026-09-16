import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_CONTENT } from "../../shared/content";
import { hashPassword, signSession } from "../_lib/adminAuth";
import { createFakeSql, responseRecorder, type FakeQueryHandler, type FakeRow } from "../_lib/testing/fakeNeon";
import type { ApiRequest } from "../_lib/http";
import handler from "./[action]";

const neonState = vi.hoisted(() => ({ handler: null as null | FakeQueryHandler, calls: [] as { query: string; values: unknown[] }[] }));
const anthropic = vi.hoisted(() => ({ parse: vi.fn() }));

vi.mock("@neondatabase/serverless", () => ({
  neon: () => {
    const fake = createFakeSql((query, values) => (neonState.handler ? neonState.handler(query, values) : []));
    neonState.calls = fake.calls;
    return fake.sql;
  },
}));

vi.mock("@anthropic-ai/sdk", () => {
  class APIError extends Error {
    constructor(public status: number) {
      super(`API error ${status}`);
    }
  }
  class RateLimitError extends APIError {
    constructor() {
      super(429);
    }
  }
  class Anthropic {
    static APIError = APIError;
    static RateLimitError = RateLimitError;
    messages = { parse: anthropic.parse };
  }
  return { default: Anthropic };
});

vi.mock("@anthropic-ai/sdk/helpers/zod", () => ({
  zodOutputFormat: (schema: unknown) => ({ type: "json_schema", schema }),
}));

const SECRET = "s".repeat(48);
const PASSWORD = "owner-password-2026";
let PASSWORD_HASH = "";
let cookie = "";

const csrf = { "x-requested-with": "sv-admin", host: "www.sweet-village.com", origin: "https://www.sweet-village.com", "x-forwarded-proto": "https" };

function request(action: string, init: Partial<ApiRequest> & { auth?: boolean; mutate?: boolean } = {}): ApiRequest {
  const headers: Record<string, string> = { ...(init.mutate ? csrf : { host: csrf.host, "x-forwarded-proto": "https" }) };
  if (init.auth) headers.cookie = `sv_admin=${cookie}`;
  return { method: init.method ?? "GET", query: { action, ...(init.query ?? {}) }, headers: { ...headers, ...(init.headers as Record<string, string>) }, body: init.body };
}

/** Minimal in-memory content store driven by the SQL text the helpers emit. */
function contentStore(rows: Record<string, FakeRow>, options: { conflict?: boolean; failures?: { per_ip: number; global: number } } = {}): FakeQueryHandler {
  return (query, values) => {
    if (query.includes("FROM site_content WHERE key")) {
      const row = rows[String(values[0])];
      return row ? [row] : [];
    }
    if (query.includes("INSERT INTO site_content ")) {
      if (options.conflict) return [];
      const key = String(values[0]);
      rows[key] = { key, value: JSON.parse(String(values[1])), updated_at: "2026-09-16 12:00:00.000001+00", updated_by: "owner" };
      return [{ updated_at: "2026-09-16 12:00:00.000001+00" }];
    }
    if (query.includes("FROM admin_login_attempts")) return [options.failures ?? { per_ip: 0, global: 0 }];
    return [];
  };
}

beforeAll(async () => {
  PASSWORD_HASH = hashPassword(PASSWORD);
  cookie = (await signSession({ passwordHash: PASSWORD_HASH, secret: SECRET })).token;
});

beforeEach(() => {
  neonState.handler = null;
  anthropic.parse.mockReset();
  vi.stubEnv("ADMIN_PASSWORD_HASH", PASSWORD_HASH);
  vi.stubEnv("ADMIN_SESSION_SECRET", SECRET);
  vi.stubEnv("NEON_DATABASE_URL", "postgres://fake");
  vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
  vi.stubEnv("ANTHROPIC_API_KEY", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("dispatcher", () => {
  it("rejects unknown actions and never caches", async () => {
    const { record, response } = responseRecorder();
    await handler(request("nope"), response);
    expect(record.statusCode).toBe(404);
    expect(record.headers.get("Cache-Control")).toBe("no-store");
  });
});

describe("login", () => {
  it("only accepts POST with the CSRF header", async () => {
    let { record, response } = responseRecorder();
    await handler(request("login", { method: "GET" }), response);
    expect(record.statusCode).toBe(405);
    ({ record, response } = responseRecorder());
    await handler(request("login", { method: "POST", body: { password: PASSWORD } }), response);
    expect(record.statusCode).toBe(403);
  });

  it("answers 503 when the admin is not configured", async () => {
    vi.stubEnv("ADMIN_PASSWORD_HASH", "");
    const { record, response } = responseRecorder();
    await handler(request("login", { method: "POST", mutate: true, body: { password: PASSWORD } }), response);
    expect(record.statusCode).toBe(503);
  });

  it("rejects malformed bodies, wrong passwords and throttled clients", async () => {
    neonState.handler = contentStore({});
    let { record, response } = responseRecorder();
    await handler(request("login", { method: "POST", mutate: true, body: {} }), response);
    expect(record.statusCode).toBe(422);

    ({ record, response } = responseRecorder());
    await handler(request("login", { method: "POST", mutate: true, body: JSON.stringify({ password: "wrong" }) }), response);
    expect(record.statusCode).toBe(401);
    expect(record.headers.has("Set-Cookie")).toBe(false);
    expect(neonState.calls.some(call => call.query.includes("INSERT INTO admin_login_attempts") && call.values[1] === false)).toBe(true);

    neonState.handler = contentStore({}, { failures: { per_ip: 5, global: 5 } });
    ({ record, response } = responseRecorder());
    await handler(request("login", { method: "POST", mutate: true, body: { password: PASSWORD } }), response);
    expect(record.statusCode).toBe(429);
    expect(record.headers.get("Retry-After")).toBe("900");
  });

  it("sets a hardened session cookie for the right password", async () => {
    neonState.handler = contentStore({});
    const { record, response } = responseRecorder();
    await handler(request("login", { method: "POST", mutate: true, body: { password: PASSWORD } }), response);
    expect(record.statusCode).toBe(200);
    const setCookie = String(record.headers.get("Set-Cookie"));
    expect(setCookie).toMatch(/^sv_admin=[^;]+; Max-Age=604800; Path=\/api\/admin; HttpOnly; Secure; SameSite=Lax$/);
    expect((record.body as { expiresAt: string }).expiresAt).toMatch(/^\d{4}-/);
  });
});

describe("me and logout", () => {
  it("reports the session state", async () => {
    let { record, response } = responseRecorder();
    await handler(request("me"), response);
    expect(record.statusCode).toBe(401);
    ({ record, response } = responseRecorder());
    await handler(request("me", { auth: true }), response);
    expect(record.statusCode).toBe(200);
  });

  it("clears the cookie on logout", async () => {
    const { record, response } = responseRecorder();
    await handler(request("logout", { method: "POST", mutate: true, auth: true }), response);
    expect(record.statusCode).toBe(200);
    expect(String(record.headers.get("Set-Cookie"))).toContain("Max-Age=0");
  });
});

describe("content", () => {
  it("requires a session", async () => {
    const { record, response } = responseRecorder();
    await handler(request("content", { query: { key: "units" } }), response);
    expect(record.statusCode).toBe(401);
  });

  it("returns defaults for unsaved sections and rejects unknown keys", async () => {
    neonState.handler = contentStore({});
    let { record, response } = responseRecorder();
    await handler(request("content", { auth: true, query: { key: "contact" } }), response);
    expect(record.statusCode).toBe(200);
    expect(record.body).toEqual({ key: "contact", value: DEFAULT_CONTENT.contact, updatedAt: null, stored: false });

    ({ record, response } = responseRecorder());
    await handler(request("content", { auth: true, query: { key: "bookings" } }), response);
    expect(record.statusCode).toBe(400);
  });

  it("answers 503 without a database", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "");
    const { record, response } = responseRecorder();
    await handler(request("content", { auth: true, query: { key: "contact" } }), response);
    expect(record.statusCode).toBe(503);
  });

  it("validates, stores and reports conflicts on PUT", async () => {
    const rows: Record<string, FakeRow> = {};
    neonState.handler = contentStore(rows);
    const contact = { ...DEFAULT_CONTENT.contact, phoneDisplay: "+995 599 00 00 00" };

    let { record, response } = responseRecorder();
    await handler(request("content", { method: "PUT", auth: true, body: { key: "contact", value: contact } }), response);
    expect(record.statusCode).toBe(403);

    ({ record, response } = responseRecorder());
    await handler(request("content", { method: "PUT", auth: true, mutate: true, body: { key: "contact", value: { ...contact, email: "nope" } } }), response);
    expect(record.statusCode).toBe(422);
    expect((record.body as { issues: { fieldErrors: Record<string, unknown> } }).issues.fieldErrors.email).toBeTruthy();

    ({ record, response } = responseRecorder());
    await handler(request("content", { method: "PUT", auth: true, mutate: true, body: { key: "contact", value: contact, ifUpdatedAt: null } }), response);
    expect(record.statusCode).toBe(200);
    expect(record.body).toEqual({ key: "contact", updatedAt: "2026-09-16 12:00:00.000001+00" });
    expect(rows.contact?.value).toEqual(contact);
    const write = neonState.calls.find(call => call.query.includes("INSERT INTO site_content "));
    expect(write?.query).toContain("site_content_revisions");

    ({ record, response } = responseRecorder());
    await handler(request("content", { auth: true, query: { key: "contact" } }), response);
    expect(record.body).toMatchObject({ stored: true, value: contact });

    neonState.handler = contentStore(rows, { conflict: true });
    ({ record, response } = responseRecorder());
    await handler(request("content", { method: "PUT", auth: true, mutate: true, body: { key: "contact", value: contact, ifUpdatedAt: "stale" } }), response);
    expect(record.statusCode).toBe(409);
    expect(record.body).toEqual({ error: "conflict", updatedAt: "2026-09-16 12:00:00.000001+00" });
  });
});

describe("upload", () => {
  const body = { type: "blob.generate-client-token", payload: { pathname: "sweet-village/uploads/2026/pool-abc123.webp", callbackUrl: "", clientPayload: null, multipart: false } };

  it("guards token generation with CSRF, session and configuration", async () => {
    let { record, response } = responseRecorder();
    await handler(request("upload", { method: "POST", mutate: true, auth: true, body: { type: "blob.upload-completed" } }), response);
    expect(record.statusCode).toBe(400);

    ({ record, response } = responseRecorder());
    await handler(request("upload", { method: "POST", auth: true, body }), response);
    expect(record.statusCode).toBe(403);

    ({ record, response } = responseRecorder());
    await handler(request("upload", { method: "POST", mutate: true, body }), response);
    expect(record.statusCode).toBe(401);

    ({ record, response } = responseRecorder());
    await handler(request("upload", { method: "POST", mutate: true, auth: true, body }), response);
    expect(record.statusCode).toBe(503);
  });
});

describe("translate", () => {
  const body = { items: [{ id: "name", text: "ბაღის კოტეჯი", kind: "title" }], context: "unit" };

  it("guards and validates the request", async () => {
    let { record, response } = responseRecorder();
    await handler(request("translate", { method: "POST", mutate: true, body }), response);
    expect(record.statusCode).toBe(401);

    ({ record, response } = responseRecorder());
    await handler(request("translate", { method: "POST", mutate: true, auth: true, body: { items: [] } }), response);
    expect(record.statusCode).toBe(422);

    ({ record, response } = responseRecorder());
    await handler(request("translate", { method: "POST", mutate: true, auth: true, body }), response);
    expect(record.statusCode).toBe(503);
  });

  it("returns translations from the model", async () => {
    vi.stubEnv("ANTHROPIC_API_KEY", "sk-test");
    anthropic.parse.mockResolvedValue({
      stop_reason: "end_turn",
      parsed_output: { items: [{ id: "name", translations: { en: "Garden Cottage", ru: "Садовый коттедж", ar: "كوخ الحديقة", fr: "Chalet du Jardin", es: "Cabaña del Jardín" } }] },
      usage: { input_tokens: 120, output_tokens: 40 },
    });
    const { record, response } = responseRecorder();
    await handler(request("translate", { method: "POST", mutate: true, auth: true, body }), response);
    expect(record.statusCode).toBe(200);
    expect(record.body).toEqual({
      items: [{ id: "name", translations: { en: "Garden Cottage", ru: "Садовый коттедж", ar: "كوخ الحديقة", fr: "Chalet du Jardin", es: "Cabaña del Jardín" } }],
      usage: { inputTokens: 120, outputTokens: 40 },
    });
    const params = anthropic.parse.mock.calls[0][0] as { model: string; output_config: { effort: string } };
    expect(params.model).toBe("claude-opus-5");
    expect(params.output_config.effort).toBe("low");
  });

  it("maps refusals, unparseable output and rate limits to errors", async () => {
    vi.stubEnv("ANTHROPIC_API_KEY", "sk-test");
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    anthropic.parse.mockResolvedValueOnce({ stop_reason: "refusal", parsed_output: null, usage: { input_tokens: 1, output_tokens: 1 } });
    let { record, response } = responseRecorder();
    await handler(request("translate", { method: "POST", mutate: true, auth: true, body }), response);
    expect(record.statusCode).toBe(502);
    expect(record.body).toEqual({ error: "translation_refused" });

    anthropic.parse.mockResolvedValueOnce({ stop_reason: "end_turn", parsed_output: null, usage: { input_tokens: 1, output_tokens: 1 } });
    ({ record, response } = responseRecorder());
    await handler(request("translate", { method: "POST", mutate: true, auth: true, body }), response);
    expect(record.statusCode).toBe(502);

    const sdk = (await import("@anthropic-ai/sdk")).default as unknown as { RateLimitError: new () => Error };
    anthropic.parse.mockRejectedValueOnce(new sdk.RateLimitError());
    ({ record, response } = responseRecorder());
    await handler(request("translate", { method: "POST", mutate: true, auth: true, body }), response);
    expect(record.statusCode).toBe(429);
    errors.mockRestore();
  });
});
