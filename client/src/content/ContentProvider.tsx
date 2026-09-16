import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CONTENT, type ContentResponse, type SparseContent } from "@shared/content";
import { ContentContext, type ContentValue } from "./context";
import { resolveContent, sanitizeSparse } from "./resolve";

const SNAPSHOT_KEY = "sv-content:v1";

/** Last payload seen by this browser, so returning visitors never see a default→live swap. */
function readSnapshot(): SparseContent | null {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY);
    return raw ? sanitizeSparse(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeSnapshot(sections: SparseContent) {
  try {
    window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(sections));
  } catch {
    /* private browsing or quota */
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
 * Renders immediately from the compile-time defaults (or the last snapshot)
 * and swaps in the owner's saved content once /api/content answers. Never
 * blocks first paint, and a failed request simply keeps the defaults.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [fresh] = useState(freshToken);
  const [snapshot] = useState<SparseContent | null>(() => (typeof window === "undefined" ? null : readSnapshot()));

  const query = useQuery({
    queryKey: ["site-content", fresh],
    queryFn: () => fetchContent(fresh),
    staleTime: 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) writeSnapshot(query.data.sections);
  }, [query.data]);

  const value = useMemo<ContentValue>(() => {
    const sections = query.data?.sections ?? snapshot ?? {};
    return {
      content: resolveContent(DEFAULT_CONTENT, sections),
      updatedAt: query.data?.updatedAt ?? null,
      isLive: Boolean(query.data),
    };
  }, [query.data, snapshot]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
