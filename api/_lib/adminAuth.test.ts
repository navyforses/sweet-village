import { describe, expect, it } from "vitest";
import {
  adminEnv,
  assertMutationAllowed,
  clearSessionCookie,
  getAdminSession,
  hashPassword,
  passwordVersion,
  sessionCookie,
  signSession,
  verifyPassword,
  verifySession,
} from "./adminAuth";

const SECRET = "x".repeat(48);

describe("password hashing", () => {
  const hash = hashPassword("ტკბილი-სოფელი-2026");

  it("verifies the right password and rejects the wrong one", async () => {
    expect(hash.startsWith("scrypt$16384$8$1$")).toBe(true);
    await expect(verifyPassword("ტკბილი-სოფელი-2026", hash)).resolves.toBe(true);
    await expect(verifyPassword("ტკბილი-სოფელი-2027", hash)).resolves.toBe(false);
    await expect(verifyPassword("", hash)).resolves.toBe(false);
  });

  it("never matches a malformed stored hash", async () => {
    await expect(verifyPassword("anything", "")).resolves.toBe(false);
    await expect(verifyPassword("anything", "plaintext")).resolves.toBe(false);
    await expect(verifyPassword("anything", "scrypt$abc$8$1$AAAA$BBBB")).resolves.toBe(false);
    await expect(verifyPassword("anything", "bcrypt$1$2$3$4$5")).resolves.toBe(false);
  });

  it("produces a stable short fingerprint", () => {
    expect(passwordVersion(hash)).toHaveLength(16);
    expect(passwordVersion(hash)).toBe(passwordVersion(hash));
    expect(passwordVersion(hash)).not.toBe(passwordVersion(hashPassword("other")));
  });
});

describe("admin environment", () => {
  it("requires both variables and a long enough secret", () => {
    expect(adminEnv({})).toBeNull();
    expect(adminEnv({ ADMIN_PASSWORD_HASH: "scrypt$1$1$1$a$b" })).toBeNull();
    expect(adminEnv({ ADMIN_PASSWORD_HASH: "scrypt$1$1$1$a$b", ADMIN_SESSION_SECRET: "short" })).toBeNull();
    expect(adminEnv({ ADMIN_PASSWORD_HASH: "scrypt$1$1$1$a$b", ADMIN_SESSION_SECRET: SECRET })).toEqual({ passwordHash: "scrypt$1$1$1$a$b", secret: SECRET });
  });
});

describe("sessions", () => {
  const env = { passwordHash: hashPassword("owner-password"), secret: SECRET };

  it("signs and verifies a token bound to the password hash", async () => {
    const { token, exp } = await signSession(env, 1_800_000_000);
    expect(exp).toBe(1_800_000_000 + 7 * 24 * 3600);
    const session = await verifySession(token, env);
    expect(session?.exp).toBe(exp);
    expect(session?.jti).toMatch(/[0-9a-f-]{36}/);
  });

  it("rejects tampered, foreign-secret, expired and password-rotated tokens", async () => {
    const { token } = await signSession(env);
    await expect(verifySession(token + "x", env)).resolves.toBeNull();
    await expect(verifySession(token, { ...env, secret: "y".repeat(48) })).resolves.toBeNull();
    await expect(verifySession(token, { ...env, passwordHash: hashPassword("new-password") })).resolves.toBeNull();
    const { token: expired } = await signSession(env, Math.floor(Date.now() / 1000) - 8 * 24 * 3600);
    await expect(verifySession(expired, env)).resolves.toBeNull();
  });

  it("reads the session from the cookie header", async () => {
    const { token } = await signSession(env);
    await expect(getAdminSession({ headers: { cookie: `other=1; sv_admin=${token}` } }, env)).resolves.not.toBeNull();
    await expect(getAdminSession({ headers: { cookie: "other=1" } }, env)).resolves.toBeNull();
    await expect(getAdminSession({ headers: {} }, env)).resolves.toBeNull();
    await expect(getAdminSession({ headers: { cookie: `sv_admin=${token}` } }, null)).resolves.toBeNull();
  });

  it("serialises hardened cookies, Secure only behind TLS", () => {
    const secure = sessionCookie("tok", { headers: { "x-forwarded-proto": "https" } });
    expect(secure).toContain("sv_admin=tok");
    expect(secure).toContain("Path=/api/admin");
    expect(secure).toContain("HttpOnly");
    expect(secure).toContain("Secure");
    expect(secure).toContain("SameSite=Lax");
    expect(secure).toContain("Max-Age=604800");
    const local = sessionCookie("tok", { headers: {} });
    expect(local).not.toContain("Secure");
    expect(clearSessionCookie({ headers: { "x-forwarded-proto": "https" } })).toContain("Max-Age=0");
  });
});

describe("mutation guard", () => {
  it("requires the custom header and a same-host origin", () => {
    expect(assertMutationAllowed({ headers: {} })).toEqual({ ok: false, error: "missing_csrf_header" });
    expect(assertMutationAllowed({ headers: { "x-requested-with": "XMLHttpRequest" } })).toEqual({ ok: false, error: "missing_csrf_header" });
    expect(assertMutationAllowed({ headers: { "x-requested-with": "sv-admin" } })).toEqual({ ok: true });
    expect(assertMutationAllowed({ headers: { "x-requested-with": "sv-admin", origin: "https://www.sweet-village.com", host: "www.sweet-village.com" } })).toEqual({ ok: true });
    expect(assertMutationAllowed({ headers: { "x-requested-with": "sv-admin", origin: "https://evil.example", host: "www.sweet-village.com" } })).toEqual({ ok: false, error: "forbidden_origin" });
    expect(assertMutationAllowed({ headers: { "x-requested-with": "sv-admin", origin: "garbage" } })).toEqual({ ok: false, error: "forbidden_origin" });
  });
});
