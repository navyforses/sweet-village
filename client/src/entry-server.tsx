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

/**
 * Build-time renderer used by scripts/prerender.ts. `prerender` waits for
 * every lazy page, so the output is the complete page, not a spinner.
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
  );
  const html = await new Response(prelude).text();
  const match = HOISTED.exec(html);
  const head = match ? match[0] : "";
  return { head, body: html.slice(head.length) };
}
