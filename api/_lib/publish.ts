/**
 * Static pages are rebuilt by a Vercel Deploy Hook. The hook URL is a
 * secret (anyone holding it can trigger builds), so it only ever lives in
 * `VERCEL_DEPLOY_HOOK_URL` and is called server-side.
 */
export function deployHookUrl(): string | null {
  const url = process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
  return url && /^https:\/\/api\.vercel\.com\//.test(url) ? url : null;
}

export async function triggerDeployHook(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) console.error(`[publish] deploy hook answered ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error("[publish] deploy hook request failed", error);
    return false;
  }
}

/** Saves closer together than this collapse into one rebuild. */
export const PUBLISH_DEBOUNCE_SECONDS = 90;
