import { claimPublishSlot, contentChangedSincePublish } from "./_lib/content.js";
import { getSql } from "./_lib/db.js";
import { header, noStore, type ApiRequest, type ApiResponse } from "./_lib/http.js";
import { deployHookUrl, PUBLISH_DEBOUNCE_SECONDS, triggerDeployHook } from "./_lib/publish.js";

/**
 * Nightly safety net (vercel.json `crons`): if the owner saved content that
 * never made it into a static rebuild (a debounced save, a failed hook),
 * request one now. Vercel calls this with `Authorization: Bearer $CRON_SECRET`.
 */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  noStore(res);
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    res.status(503).json({ error: "cron_secret_not_configured" });
    return;
  }
  if (header(req, "authorization") !== `Bearer ${secret}`) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const hook = deployHookUrl();
  const sql = await getSql();
  if (!hook || !sql) {
    res.status(503).json({ error: "not_configured" });
    return;
  }
  try {
    if (!(await contentChangedSincePublish(sql))) {
      res.status(200).json({ triggered: false, reason: "up_to_date" });
      return;
    }
    if (!(await claimPublishSlot(sql, PUBLISH_DEBOUNCE_SECONDS))) {
      res.status(200).json({ triggered: false, reason: "debounced" });
      return;
    }
    const ok = await triggerDeployHook(hook);
    res.status(ok ? 200 : 502).json({ triggered: ok });
  } catch (error) {
    console.error("[cron-publish] failed", error);
    res.status(502).json({ error: "database_error" });
  }
}
