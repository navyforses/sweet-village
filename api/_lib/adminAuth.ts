/**
 * Single-owner authentication for the admin panel.
 *
 * - The password is never stored: `ADMIN_PASSWORD_HASH` holds a scrypt hash
 *   produced by `pnpm admin:hash-password`.
 * - A successful login issues a short HS256 JWT (jose, Web Crypto based, so it
 *   runs unchanged in Vercel functions) stored in an HttpOnly cookie scoped to
 *   `/api/admin`. The token carries a fingerprint of the password hash, so
 *   changing the password invalidates every session; rotating
 *   `ADMIN_SESSION_SECRET` does the same.
 * - Mutations additionally require a custom request header and a same-host
 *   Origin, which together defeat cross-site request forgery even though the
 *   cookie is the credential.
 */
import { createHash, randomBytes, randomUUID, scrypt, scryptSync, timingSafeEqual } from "node:crypto";
import { parse as parseCookie, serialize as serializeCookie } from "cookie";
import { SignJWT, jwtVerify } from "jose";
import { header, isSecureRequest, type ApiRequest } from "./http.js";

export const ADMIN_COOKIE = "sv_admin";
export const ADMIN_COOKIE_PATH = "/api/admin";
export const CSRF_HEADER = "x-requested-with";
export const CSRF_HEADER_VALUE = "sv-admin";
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

const JWT_ISSUER = "sweet-village-admin";
const JWT_AUDIENCE = "admin";
const SCRYPT_KEY_LENGTH = 64;
const DEFAULT_SCRYPT = { N: 16384, r: 8, p: 1 } as const;

export interface AdminEnv {
  passwordHash: string;
  secret: string;
}

/** Both variables are required; a missing one means the admin is not enabled on this deployment. */
export function adminEnv(env: NodeJS.ProcessEnv = process.env): AdminEnv | null {
  const passwordHash = env.ADMIN_PASSWORD_HASH?.trim();
  const secret = env.ADMIN_SESSION_SECRET?.trim();
  if (!passwordHash || !secret || secret.length < 32) return null;
  return { passwordHash, secret };
}

/** `scrypt$N$r$p$<salt base64>$<key base64>` — self-describing so parameters can change later. */
export function hashPassword(password: string, params = DEFAULT_SCRYPT): string {
  const salt = randomBytes(16);
  const key = scryptSync(password.normalize("NFKC"), salt, SCRYPT_KEY_LENGTH, {
    N: params.N,
    r: params.r,
    p: params.p,
    maxmem: 64 * 1024 * 1024,
  });
  return ["scrypt", params.N, params.r, params.p, salt.toString("base64"), key.toString("base64")].join("$");
}

function parseHash(stored: string) {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return null;
  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  if (![N, r, p].every(n => Number.isInteger(n) && n > 0) || N > 2 ** 20) return null;
  try {
    const salt = Buffer.from(parts[4], "base64");
    const key = Buffer.from(parts[5], "base64");
    if (salt.length < 8 || key.length < 16) return null;
    return { N, r, p, salt, key };
  } catch {
    return null;
  }
}

/** Constant-time comparison; malformed stored hashes simply never match. */
export function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parsed = parseHash(stored);
  if (!parsed) return Promise.resolve(false);
  return new Promise(resolve => {
    scrypt(
      password.normalize("NFKC"),
      parsed.salt,
      parsed.key.length,
      { N: parsed.N, r: parsed.r, p: parsed.p, maxmem: 64 * 1024 * 1024 },
      (error, derived) => {
        if (error) return resolve(false);
        resolve(derived.length === parsed.key.length && timingSafeEqual(derived, parsed.key));
      },
    );
  });
}

/** Short fingerprint of the password hash embedded in every session token. */
export function passwordVersion(passwordHash: string): string {
  return createHash("sha256").update(passwordHash).digest("hex").slice(0, 16);
}

export interface AdminSession {
  /** Unix seconds. */
  exp: number;
  jti: string;
}

export async function signSession(env: AdminEnv, now = Math.floor(Date.now() / 1000)): Promise<{ token: string; exp: number }> {
  const exp = now + SESSION_TTL_SECONDS;
  const token = await new SignJWT({ pv: passwordVersion(env.passwordHash) })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("owner")
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setJti(randomUUID())
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(env.secret));
  return { token, exp };
}

export async function verifySession(token: string, env: AdminEnv): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(env.secret), {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      subject: "owner",
    });
    if (payload.pv !== passwordVersion(env.passwordHash) || typeof payload.exp !== "number" || typeof payload.jti !== "string") {
      return null;
    }
    return { exp: payload.exp, jti: payload.jti };
  } catch {
    return null;
  }
}

export function readSessionToken(req: ApiRequest): string | null {
  const raw = header(req, "cookie");
  if (!raw) return null;
  const token = parseCookie(raw)[ADMIN_COOKIE];
  return token && token.length < 4096 ? token : null;
}

export async function getAdminSession(req: ApiRequest, env: AdminEnv | null = adminEnv()): Promise<AdminSession | null> {
  if (!env) return null;
  const token = readSessionToken(req);
  return token ? verifySession(token, env) : null;
}

export function sessionCookie(token: string, req: ApiRequest): string {
  return serializeCookie(ADMIN_COOKIE, token, {
    path: ADMIN_COOKIE_PATH,
    httpOnly: true,
    secure: isSecureRequest(req),
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(req: ApiRequest): string {
  return serializeCookie(ADMIN_COOKIE, "", {
    path: ADMIN_COOKIE_PATH,
    httpOnly: true,
    secure: isSecureRequest(req),
    sameSite: "lax",
    maxAge: 0,
  });
}

export type MutationCheck = { ok: true } | { ok: false; error: "missing_csrf_header" | "forbidden_origin" };

/**
 * Cookie-authenticated mutations must carry the custom header (a cross-origin
 * page cannot add it without a CORS preflight we never answer) and, when the
 * browser sends an Origin, it must match the host serving the API.
 */
export function assertMutationAllowed(req: ApiRequest): MutationCheck {
  if (header(req, CSRF_HEADER) !== CSRF_HEADER_VALUE) return { ok: false, error: "missing_csrf_header" };
  const origin = header(req, "origin");
  if (origin) {
    const host = header(req, "host");
    try {
      if (!host || new URL(origin).host !== host) return { ok: false, error: "forbidden_origin" };
    } catch {
      return { ok: false, error: "forbidden_origin" };
    }
  }
  return { ok: true };
}
