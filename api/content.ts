import { getSql } from "./_lib/db";
import { readAllSections } from "./_lib/content";
import { methodNotAllowed, type ApiRequest, type ApiResponse } from "./_lib/http";

/**
 * Public, read-only view of the owner-edited content. Returns only the
 * sections that were saved; the browser overlays them on the compile-time
 * defaults, so an unconfigured or unreachable database never breaks the site.
 * Edge-cached for a minute; the admin bypasses the cache with `?v=<updatedAt>`.
 */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    methodNotAllowed(res, "GET");
    return;
  }

  const sql = await getSql();
  if (!sql) {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ updatedAt: null, sections: {} });
    return;
  }

  try {
    const { updatedAt, sections } = await readAllSections(sql);
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
    res.status(200).json({ updatedAt, sections });
  } catch (error) {
    console.error("[content] read failed", error);
    res.setHeader("Cache-Control", "no-store");
    res.status(502).json({ error: "Content unavailable" });
  }
}
