import type { NeonQueryFunction } from "@neondatabase/serverless";

/** Tagged-template SQL client over Neon's HTTP driver (one round trip per query). */
export type Sql = NeonQueryFunction<false, false>;

/**
 * Returns a Neon client, or null when the database is not configured so
 * callers can degrade gracefully (public site keeps rendering defaults, admin
 * endpoints answer 503). The driver is imported lazily to keep cold starts
 * cheap for functions that never touch the database.
 */
export async function getSql(): Promise<Sql | null> {
  const url = process.env.NEON_DATABASE_URL;
  if (!url) return null;
  const { neon } = await import("@neondatabase/serverless");
  return neon(url) as Sql;
}
