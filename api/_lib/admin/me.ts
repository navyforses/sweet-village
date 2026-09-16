import { getAdminSession } from "../adminAuth";
import { methodNotAllowed, type ApiRequest, type ApiResponse } from "../http";

export async function me(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    methodNotAllowed(res, "GET");
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.status(200).json({ ok: true, expiresAt: new Date(session.exp * 1000).toISOString() });
}
