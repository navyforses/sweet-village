import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CONTENT, type ContentResponse, type SparseContent } from "@shared/content";
import { ContentContext, type ContentValue } from "./context";
import { resolveContent, sanitizeSparse } from "./resolve";

/** Id of the JSON block the prerender step embeds so hydration renders the same content the server did. */
export const EMBEDDED_CONTENT_ID = "sv-content";

function readEmbedded(): SparseContent | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = document.getElementById(EMBEDDED_CONTENT_ID)?.textContent;
    return raw ? sanitizeSparse(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

/** `?fresh=<token>` (used by the admin preview link) bypasses the edge cache. */
function freshToken(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("fresh");
}

export async function fetchContent(fresh: string | null): Promise<ContentResponse> {
  const url = fresh ? `/api/content?v=${encodeURIComponent(fresh)}` : "/api/content";
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Content request failed (HTTP ${response.status})`);
  const data = (await response.json()) as Partial<ContentResponse>;
  return { updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : null, sections: sanitizeSparse(data.sections) };
}

/**
 * First paint uses the content baked into the page at build time (or the
 * compile-time defaults), so the hydrated tree matches the prerendered HTML;
 * the owner's latest saves are then swapped in once /api/content answers.
 * A failed request simply keeps what the page shipped with.
 */
export function ContentProvider({ children, initial }: { children: ReactNode; initial?: SparseContent | null }) {
  const [fresh] = useState(freshToken);
  const [embedded] = useState<SparseContent | null>(() => initial ?? readEmbedded());

  const query = useQuery({
    queryKey: ["site-content", fresh],
    queryFn: () => fetchContent(fresh),
    staleTime: 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const value = useMemo<ContentValue>(() => {
    const sections = query.data?.sections ?? embedded ?? {};
    return {
      content: resolveContent(DEFAULT_CONTENT, sections),
      updatedAt: query.data?.updatedAt ?? null,
      isLive: Boolean(query.data),
    };
  }, [query.data, embedded]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
