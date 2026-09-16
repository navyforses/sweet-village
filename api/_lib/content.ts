/**
 * Database access for owner-editable content. Timestamps travel as Postgres
 * text (`updated_at::text`) so the optimistic-concurrency token round-trips
 * without losing microseconds; the client treats it as an opaque string.
 */
import { isSectionKey, type SectionKey, type SiteContent, type SparseContent } from "../../shared/content";
import { parseSection } from "../../shared/contentSchema";
import type { Sql } from "./db";

export interface StoredSection<K extends SectionKey = SectionKey> {
  key: K;
  value: SiteContent[K];
  updatedAt: string;
  updatedBy: string;
}

type ContentRow = { key: string; value: unknown; updated_at: string; updated_by: string };

/** Every saved section that still validates; broken rows are skipped, never fatal. */
export async function readAllSections(sql: Sql): Promise<{ updatedAt: string | null; sections: SparseContent }> {
  const rows = (await sql`SELECT key, value, updated_at::text AS updated_at, updated_by FROM site_content`) as ContentRow[];
  const sections: Record<string, unknown> = {};
  let updatedAt: string | null = null;
  for (const row of rows) {
    if (!isSectionKey(row.key)) continue;
    const parsed = parseSection(row.key, row.value);
    if (!parsed) {
      console.error(`[content] stored section "${row.key}" failed validation and was ignored`);
      continue;
    }
    sections[row.key] = parsed;
    if (!updatedAt || row.updated_at > updatedAt) updatedAt = row.updated_at;
  }
  return { updatedAt, sections: sections as SparseContent };
}

export async function readSection<K extends SectionKey>(sql: Sql, key: K): Promise<StoredSection<K> | null> {
  const rows = (await sql`
    SELECT key, value, updated_at::text AS updated_at, updated_by
    FROM site_content WHERE key = ${key} LIMIT 1
  `) as ContentRow[];
  const row = rows[0];
  if (!row) return null;
  const value = parseSection(key, row.value);
  if (!value) {
    console.error(`[content] stored section "${key}" failed validation`);
    return null;
  }
  return { key, value, updatedAt: row.updated_at, updatedBy: row.updated_by };
}

export type UpsertResult = { ok: true; updatedAt: string } | { ok: false; reason: "conflict" };

/**
 * Writes the section and a revision in one statement. When `ifUpdatedAt` is
 * provided and the row has moved on since the caller read it, nothing is
 * written and a conflict is reported so the admin can reload.
 */
export async function upsertSection<K extends SectionKey>(
  sql: Sql,
  key: K,
  value: SiteContent[K],
  options: { ifUpdatedAt?: string | null; note?: string | null; by?: string } = {},
): Promise<UpsertResult> {
  const ifUpdatedAt = options.ifUpdatedAt ?? null;
  const note = options.note ?? null;
  const by = options.by ?? "owner";
  const json = JSON.stringify(value);
  const rows = (await sql`
    WITH up AS (
      INSERT INTO site_content (key, value, updated_by)
      VALUES (${key}, ${json}::jsonb, ${by})
      ON CONFLICT (key) DO UPDATE
        SET value = EXCLUDED.value, updated_at = now(), updated_by = EXCLUDED.updated_by
        WHERE ${ifUpdatedAt}::timestamptz IS NULL OR site_content.updated_at = ${ifUpdatedAt}::timestamptz
      RETURNING key, value, updated_at, updated_by
    ), rev AS (
      INSERT INTO site_content_revisions (key, value, saved_at, saved_by, note)
      SELECT key, value, updated_at, updated_by, ${note} FROM up
      RETURNING id
    )
    SELECT up.updated_at::text AS updated_at FROM up
  `) as { updated_at: string }[];
  const row = rows[0];
  return row ? { ok: true, updatedAt: row.updated_at } : { ok: false, reason: "conflict" };
}

const LOGIN_WINDOW_MINUTES = 15;
export const LOGIN_MAX_FAILURES_PER_IP = 5;
export const LOGIN_MAX_FAILURES_GLOBAL = 40;

export async function recordLoginAttempt(sql: Sql, ip: string, success: boolean): Promise<void> {
  await sql`INSERT INTO admin_login_attempts (ip, success) VALUES (${ip}, ${success})`;
  // Keep the table small; one day of history is plenty for throttling.
  await sql`DELETE FROM admin_login_attempts WHERE attempted_at < now() - interval '1 day'`;
}

export async function countRecentFailures(sql: Sql, ip: string): Promise<{ perIp: number; global: number }> {
  const rows = (await sql`
    SELECT
      count(*) FILTER (WHERE ip = ${ip})::int AS per_ip,
      count(*)::int AS global
    FROM admin_login_attempts
    WHERE success = false AND attempted_at > now() - (${LOGIN_WINDOW_MINUTES} || ' minutes')::interval
  `) as { per_ip: number; global: number }[];
  return { perIp: rows[0]?.per_ip ?? 0, global: rows[0]?.global ?? 0 };
}

export function loginThrottled(failures: { perIp: number; global: number }): boolean {
  return failures.perIp >= LOGIN_MAX_FAILURES_PER_IP || failures.global >= LOGIN_MAX_FAILURES_GLOBAL;
}

export const LOGIN_RETRY_AFTER_SECONDS = LOGIN_WINDOW_MINUTES * 60;
