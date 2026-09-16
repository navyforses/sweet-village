/**
 * The API transports `updated_at` as Postgres text (e.g.
 * "2026-09-16 14:03:21.482913+00") so it round-trips exactly as a concurrency
 * token. These helpers only turn it into something readable.
 */
export function parseDbTimestamp(value: string | null | undefined): Date | null {
  if (!value) return null;
  const iso = value.trim().replace(" ", "T").replace(/([+-]\d{2})$/, "$1:00");
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDateTime(value: string | null | undefined): string {
  const date = parseDbTimestamp(value);
  if (!date) return "";
  return date.toLocaleString("ka-GE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
