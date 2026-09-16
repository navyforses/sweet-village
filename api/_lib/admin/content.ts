import { DEFAULT_CONTENT, isSectionKey, type SectionKey } from "../../../shared/content.js";
import { parseSection, sectionIssues } from "../../../shared/contentSchema.js";
import { assertMutationAllowed, getAdminSession } from "../adminAuth.js";
import { readSection, upsertSection } from "../content.js";
import { getSql } from "../db.js";
import { isRecord, methodNotAllowed, parseBody, queryParam, type ApiRequest, type ApiResponse } from "../http.js";

const MAX_BODY_CHARS = 512 * 1024;

async function getSection(req: ApiRequest, res: ApiResponse) {
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
    const stored = await readSection(sql, key);
    if (stored) {
      res.status(200).json({ key, value: stored.value, updatedAt: stored.updatedAt, stored: true });
    } else {
      res.status(200).json({ key, value: DEFAULT_CONTENT[key], updatedAt: null, stored: false });
    }
  } catch (error) {
    console.error("[admin:content] read failed", error);
    res.status(502).json({ error: "database_error" });
  }
}

async function putSection(req: ApiRequest, res: ApiResponse) {
  const csrf = assertMutationAllowed(req);
  if (!csrf.ok) {
    res.status(403).json({ error: csrf.error });
    return;
  }
  const body = parseBody(req.body);
  if (!isRecord(body) || !isSectionKey(body.key) || JSON.stringify(body.value ?? null).length > MAX_BODY_CHARS) {
    res.status(422).json({ error: "invalid_request" });
    return;
  }
  const key: SectionKey = body.key;
  const ifUpdatedAt = typeof body.ifUpdatedAt === "string" && body.ifUpdatedAt.length < 64 ? body.ifUpdatedAt : null;
  const note = typeof body.note === "string" ? body.note.slice(0, 200) : null;

  const issues = sectionIssues(key, body.value);
  if (issues) {
    res.status(422).json({ error: "invalid_content", issues });
    return;
  }
  const value = parseSection(key, body.value);
  if (!value) {
    res.status(422).json({ error: "invalid_content" });
    return;
  }

  const sql = await getSql();
  if (!sql) {
    res.status(503).json({ error: "database_not_configured" });
    return;
  }
  try {
    const result = await upsertSection(sql, key, value, { ifUpdatedAt, note });
    if (!result.ok) {
      const current = await readSection(sql, key);
      res.status(409).json({ error: "conflict", updatedAt: current?.updatedAt ?? null });
      return;
    }
    res.status(200).json({ key, updatedAt: result.updatedAt });
  } catch (error) {
    console.error("[admin:content] write failed", error);
    res.status(502).json({ error: "database_error" });
  }
}

export async function content(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET" && req.method !== "PUT") {
    methodNotAllowed(res, "GET, PUT");
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  if (req.method === "GET") await getSection(req, res);
  else await putSection(req, res);
}
