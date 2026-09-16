import { adminEnv, assertMutationAllowed, sessionCookie, signSession, verifyPassword } from "../adminAuth.js";
import { countRecentFailures, LOGIN_RETRY_AFTER_SECONDS, loginThrottled, recordLoginAttempt } from "../content.js";
import { getSql } from "../db.js";
import { clientIp, isRecord, methodNotAllowed, parseBody, type ApiRequest, type ApiResponse } from "../http.js";

const FAILED_LOGIN_DELAY_MS = 400;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function login(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }
  const csrf = assertMutationAllowed(req);
  if (!csrf.ok) {
    res.status(403).json({ error: csrf.error });
    return;
  }
  const env = adminEnv();
  if (!env) {
    res.status(503).json({ error: "admin_not_configured" });
    return;
  }
  const body = parseBody(req.body);
  const password = isRecord(body) && typeof body.password === "string" ? body.password : "";
  if (!password || password.length > 256) {
    res.status(422).json({ error: "invalid_request" });
    return;
  }

  const ip = clientIp(req);
  const sql = await getSql();
  if (sql) {
    try {
      const failures = await countRecentFailures(sql, ip);
      if (loginThrottled(failures)) {
        res.setHeader("Retry-After", String(LOGIN_RETRY_AFTER_SECONDS));
        res.status(429).json({ error: "too_many_attempts", retryAfter: LOGIN_RETRY_AFTER_SECONDS });
        return;
      }
    } catch (error) {
      console.error("[admin:login] throttle lookup failed", error);
    }
  }

  const ok = await verifyPassword(password, env.passwordHash);
  if (sql) {
    recordLoginAttempt(sql, ip, ok).catch(error => console.error("[admin:login] attempt log failed", error));
  }
  if (!ok) {
    await delay(FAILED_LOGIN_DELAY_MS);
    res.status(401).json({ error: "invalid_password" });
    return;
  }

  const { token, exp } = await signSession(env);
  res.setHeader("Set-Cookie", sessionCookie(token, req));
  res.status(200).json({ ok: true, expiresAt: new Date(exp * 1000).toISOString() });
}
