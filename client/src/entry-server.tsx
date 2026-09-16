import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { prerender } from "react-dom/static";
import { Router } from "wouter";
import type { SparseContent } from "@shared/content";
import App from "./App";

export interface RenderResult {
  /** Hoisted <title>/<meta>/<link> tags React emits ahead of the markup. */
  head: string;
  /** Markup for the #root container. */
  body: string;
}

const HOISTED = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)+/;

/** A Suspense boundary emitted as fallback + hidden content + client-side swap script. */
const LATE_BOUNDARY = /<template id="B:\d+">/;

/**
 * Build-time renderer used by scripts/prerender.ts. `prerender` waits for
 * every lazy page, but Fizz still "outlines" any completed boundary larger
 * than `progressiveChunkSize` (12.8 KB by default): the fallback is written
 * in place and the page arrives in a hidden block a script swaps in, which
 * is what a reader without JavaScript or a link-preview bot would see.
 * Every page here is larger than that, so the limit is lifted and a late
 * boundary fails the build instead of shipping a spinner.
 */
export async function render(url: string, content: SparseContent | null): Promise<RenderResult> {
  const [path, search = ""] = url.split("?");
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const { prelude } = await prerender(
    <QueryClientProvider client={queryClient}>
      <Router ssrPath={path} ssrSearch={search}>
        <App initialContent={content} />
      </Router>
    </QueryClientProvider>,
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const html = await new Response(prelude).text();
  if (LATE_BOUNDARY.test(html)) throw new Error(`[prerender] ${url} has a Suspense boundary that was not rendered inline`);
  const match = HOISTED.exec(html);
  const head = match ? match[0] : "";
  return { head, body: html.slice(head.length) };
}
