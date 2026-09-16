import { assertMutationAllowed, clearSessionCookie } from "../adminAuth.js";
import { methodNotAllowed, type ApiRequest, type ApiResponse } from "../http.js";

export async function logout(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }
  const csrf = assertMutationAllowed(req);
  if (!csrf.ok) {
    res.status(403).json({ error: csrf.error });
    return;
  }
  res.setHeader("Set-Cookie", clearSessionCookie(req));
  res.status(200).json({ ok: true });
}
