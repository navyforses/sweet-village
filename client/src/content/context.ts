import { createContext } from "react";
import type { SiteContent } from "@shared/content";

export interface ContentValue {
  content: SiteContent;
  /** Opaque server timestamp of the newest saved section; null when nothing is saved. */
  updatedAt: string | null;
  /** True once the response from /api/content has been applied. */
  isLive: boolean;
}

export const ContentContext = createContext<ContentValue | null>(null);
