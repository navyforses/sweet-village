import { getAdminSession } from "../adminAuth";
import { listBookings } from "../content";
import { getSql } from "../db";
import { methodNotAllowed, queryParam, type ApiRequest, type ApiResponse } from "../http";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

/** Read-only list of booking enquiries for the owner. */
export async function bookings(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    methodNotAllowed(res, "GET");
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const sql = await getSql();
  if (!sql) {
    res.status(503).json({ error: "database_not_configured" });
    return;
  }
  const raw = Number(queryParam(req, "limit"));
  const limit = Number.isInteger(raw) && raw > 0 ? Math.min(raw, MAX_LIMIT) : DEFAULT_LIMIT;
  try {
    const items = await listBookings(sql, limit);
    res.status(200).json({ bookings: items });
  } catch (error) {
    console.error("[admin:bookings] read failed", error);
    res.status(502).json({ error: "database_error" });
  }
}
