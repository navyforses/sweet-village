/**
 * Database access for owner-editable content. Timestamps travel as Postgres
 * text (`updated_at::text`) so the optimistic-concurrency token round-trips
 * without losing microseconds; the client treats it as an opaque string.
 */
import { isSectionKey, type SectionKey, type SiteContent, type SparseContent } from "../../shared/content.js";
import { parseSection } from "../../shared/contentSchema.js";
import type { Sql } from "./db.js";

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

export interface RevisionSummary {
  id: number;
  key: SectionKey;
  savedAt: string;
  savedBy: string;
  note: string | null;
}

export interface StoredRevision<K extends SectionKey = SectionKey> extends RevisionSummary {
  key: K;
  value: SiteContent[K];
}

type RevisionRow = { id: number; key: string; saved_at: string; saved_by: string; note: string | null; value?: unknown };

/** Newest first. The revision whose `savedAt` equals the section's `updatedAt` is the live version. */
export async function listRevisions(sql: Sql, key: SectionKey, limit: number): Promise<RevisionSummary[]> {
  const rows = (await sql`
    SELECT id, key, saved_at::text AS saved_at, saved_by, note
    FROM site_content_revisions WHERE key = ${key}
    ORDER BY saved_at DESC, id DESC LIMIT ${limit}
  `) as RevisionRow[];
  return rows.map(row => ({ id: Number(row.id), key, savedAt: row.saved_at, savedBy: row.saved_by, note: row.note ?? null }));
}

/** One revision with its value; null when missing, of another section, or no longer valid for this build. */
export async function readRevision<K extends SectionKey>(sql: Sql, key: K, id: number): Promise<StoredRevision<K> | null> {
  const rows = (await sql`
    SELECT id, key, value, saved_at::text AS saved_at, saved_by, note
    FROM site_content_revisions WHERE id = ${id} AND key = ${key} LIMIT 1
  `) as RevisionRow[];
  const row = rows[0];
  if (!row) return null;
  const value = parseSection(key, row.value);
  if (!value) {
    console.error(`[content] revision ${id} of "${key}" failed validation`);
    return null;
  }
  return { id: Number(row.id), key, value, savedAt: row.saved_at, savedBy: row.saved_by, note: row.note ?? null };
}

export interface BookingRow {
  id: number;
  name: string;
  phone: string;
  checkIn: string | null;
  checkOut: string | null;
  interest: string;
  unit: string | null;
  guests: number | null;
  notes: string | null;
  lang: string;
  createdAt: string;
}

type RawBookingRow = {
  id: number;
  name: string;
  phone: string;
  check_in: string | null;
  check_out: string | null;
  interest: string;
  unit: string | null;
  guests: number | null;
  notes: string | null;
  lang: string;
  created_at: string;
};

/** Booking enquiries, newest first (read-only for the admin). */
export async function listBookings(sql: Sql, limit: number): Promise<BookingRow[]> {
  const rows = (await sql`
    SELECT id, name, phone, check_in, check_out, interest, unit, guests, notes, lang, created_at::text AS created_at
    FROM bookings ORDER BY created_at DESC, id DESC LIMIT ${limit}
  `) as RawBookingRow[];
  return rows.map(row => ({
    id: Number(row.id),
    name: row.name,
    phone: row.phone,
    checkIn: row.check_in ?? null,
    checkOut: row.check_out ?? null,
    interest: row.interest,
    unit: row.unit ?? null,
    guests: row.guests === null || row.guests === undefined ? null : Number(row.guests),
    notes: row.notes ?? null,
    lang: row.lang,
    createdAt: row.created_at,
  }));
}

/** Key of the bookkeeping row that remembers when the last static rebuild was requested. */
export const PUBLISH_KEY = "_publish";

/**
 * Records a rebuild request unless one was recorded less than `minSeconds`
 * ago, so a burst of saves triggers a single deployment. Returns true when
 * the caller should fire the deploy hook.
 */
export async function claimPublishSlot(sql: Sql, minSeconds: number): Promise<boolean> {
  const rows = (await sql`
    INSERT INTO site_content (key, value, updated_by)
    VALUES (${PUBLISH_KEY}, '{}'::jsonb, 'system')
    ON CONFLICT (key) DO UPDATE SET updated_at = now(), updated_by = 'system'
      WHERE site_content.updated_at < now() - (${minSeconds} || ' seconds')::interval
    RETURNING key
  `) as { key: string }[];
  return rows.length > 0;
}

/** True when a section was saved after the last recorded rebuild request (or none was ever recorded). */
export async function contentChangedSincePublish(sql: Sql): Promise<boolean> {
  const rows = (await sql`
    SELECT
      (SELECT max(updated_at) FROM site_content WHERE key <> ${PUBLISH_KEY}) AS content_at,
      (SELECT updated_at FROM site_content WHERE key = ${PUBLISH_KEY}) AS published_at
  `) as { content_at: string | null; published_at: string | null }[];
  const row = rows[0];
  if (!row?.content_at) return false;
  if (!row.published_at) return true;
  return new Date(row.content_at) > new Date(row.published_at);
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
