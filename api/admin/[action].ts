import { noStore, queryParam, type ApiRequest, type ApiResponse } from "../_lib/http";
import { login } from "../_lib/admin/login";
import { logout } from "../_lib/admin/logout";
import { me } from "../_lib/admin/me";
import { content } from "../_lib/admin/content";
import { upload } from "../_lib/admin/upload";
import { translate } from "../_lib/admin/translate";

/**
 * Single admin function. Vercel maps `/api/admin/<action>` to `req.query.action`;
 * one function (instead of one per action) keeps the deployment well under
 * the Hobby plan's function limit. Every response is uncacheable.
 */
export const config = { maxDuration: 60 };

const ACTIONS: Record<string, (req: ApiRequest, res: ApiResponse) => Promise<void>> = {
  login,
  logout,
  me,
  content,
  upload,
  translate,
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  noStore(res);
  const action = queryParam(req, "action") ?? "";
  const run = Object.prototype.hasOwnProperty.call(ACTIONS, action) ? ACTIONS[action] : null;
  if (!run) {
    res.status(404).json({ error: "Unknown action" });
    return;
  }
  try {
    await run(req, res);
  } catch (error) {
    console.error(`[admin:${action}] unhandled failure`, error);
    res.status(500).json({ error: "Admin request failed" });
  }
}
