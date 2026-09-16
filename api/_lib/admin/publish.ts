import { assertMutationAllowed, getAdminSession } from "../adminAuth.js";
import { claimPublishSlot } from "../content.js";
import { getSql } from "../db.js";
import { methodNotAllowed, type ApiRequest, type ApiResponse } from "../http.js";
import { deployHookUrl, PUBLISH_DEBOUNCE_SECONDS, triggerDeployHook } from "../publish.js";

/**
 * `POST` after a save: asks Vercel to rebuild the static pages so search
 * engines and link previews see the new content. Bursts are debounced in
 * the database; the nightly cron (api/cron-publish.ts) catches anything a
 * debounce swallowed.
 */
export async function publish(req: ApiRequest, res: ApiResponse) {
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
  const hook = deployHookUrl();
  if (!hook) {
    res.status(503).json({ error: "deploy_hook_not_configured" });
    return;
  }
  const sql = await getSql();
  if (!sql) {
    res.status(503).json({ error: "database_not_configured" });
    return;
  }
  try {
    const claimed = await claimPublishSlot(sql, PUBLISH_DEBOUNCE_SECONDS);
    if (!claimed) {
      res.status(202).json({ triggered: false, reason: "debounced", retryAfterSeconds: PUBLISH_DEBOUNCE_SECONDS });
      return;
    }
    const ok = await triggerDeployHook(hook);
    if (!ok) {
      res.status(502).json({ error: "deploy_hook_failed" });
      return;
    }
    res.status(200).json({ triggered: true });
  } catch (error) {
    console.error("[admin:publish] failed", error);
    res.status(502).json({ error: "database_error" });
  }
}
