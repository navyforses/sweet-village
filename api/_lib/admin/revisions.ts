import { isSectionKey } from "../../../shared/content";
import { getAdminSession } from "../adminAuth";
import { listRevisions, readRevision } from "../content";
import { getSql } from "../db";
import { methodNotAllowed, queryParam, type ApiRequest, type ApiResponse } from "../http";

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

function parseLimit(raw: string | undefined): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1) return DEFAULT_LIMIT;
  return Math.min(value, MAX_LIMIT);
}

/**
 * `GET ?key=` lists a section's saved versions (newest first);
 * `GET ?key=&id=` returns one version with its full value for diffing.
 */
export async function revisions(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    methodNotAllowed(res, "GET");
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const key = queryParam(req, "key");
  if (!isSectionKey(key)) {
    res.status(400).json({ error: "unknown_section" });
    return;
  }
  const sql = await getSql();
  if (!sql) {
    res.status(503).json({ error: "database_not_configured" });
    return;
  }
  try {
    const rawId = queryParam(req, "id");
    if (rawId !== undefined) {
      const id = Number(rawId);
      if (!Number.isInteger(id) || id < 1) {
        res.status(400).json({ error: "invalid_id" });
        return;
      }
      const revision = await readRevision(sql, key, id);
      if (!revision) {
        res.status(404).json({ error: "revision_not_found" });
        return;
      }
      res.status(200).json({ revision });
      return;
    }
    const items = await listRevisions(sql, key, parseLimit(queryParam(req, "limit")));
    res.status(200).json({ key, revisions: items });
  } catch (error) {
    console.error("[admin:revisions] read failed", error);
    res.status(502).json({ error: "database_error" });
  }
}
