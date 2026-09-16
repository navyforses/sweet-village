import { isSectionKey } from "../../../shared/content";
import { assertMutationAllowed, getAdminSession } from "../adminAuth";
import { readRevision, readSection, upsertSection } from "../content";
import { getSql } from "../db";
import { isRecord, methodNotAllowed, parseBody, type ApiRequest, type ApiResponse } from "../http";

/**
 * `POST { key, id, ifUpdatedAt? }` copies a saved version back over the live
 * section. The restore is itself a new save (and a new revision), so nothing
 * is ever lost and the action can be undone the same way.
 */
export async function restore(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const csrf = assertMutationAllowed(req);
  if (!csrf.ok) {
    res.status(403).json({ error: csrf.error });
    return;
  }
  const body = parseBody(req.body);
  if (!isRecord(body) || !isSectionKey(body.key) || typeof body.id !== "number" || !Number.isInteger(body.id) || body.id < 1) {
    res.status(422).json({ error: "invalid_request" });
    return;
  }
  const key = body.key;
  const id = body.id;
  const ifUpdatedAt = typeof body.ifUpdatedAt === "string" && body.ifUpdatedAt.length < 64 ? body.ifUpdatedAt : null;

  const sql = await getSql();
  if (!sql) {
    res.status(503).json({ error: "database_not_configured" });
    return;
  }
  try {
    const revision = await readRevision(sql, key, id);
    if (!revision) {
      res.status(404).json({ error: "revision_not_found" });
      return;
    }
    const result = await upsertSection(sql, key, revision.value, { ifUpdatedAt, note: `restore:${id}` });
    if (!result.ok) {
      const current = await readSection(sql, key);
      res.status(409).json({ error: "conflict", updatedAt: current?.updatedAt ?? null });
      return;
    }
    res.status(200).json({ key, restoredFrom: id, updatedAt: result.updatedAt });
  } catch (error) {
    console.error("[admin:restore] failed", error);
    res.status(502).json({ error: "database_error" });
  }
}
