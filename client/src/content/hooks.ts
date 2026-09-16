import { useContext, useMemo } from "react";
import { DEFAULT_CONTENT } from "@shared/content";
import { useI18n } from "@/i18n";
import { ContentContext, type ContentValue } from "./context";
import { resolveVenue, type Venue } from "./resolve";

const FALLBACK: ContentValue = { content: DEFAULT_CONTENT, updatedAt: null, isLive: false };

/** Raw resolved content. Falls back to the defaults outside a ContentProvider (tests, admin). */
export function useContent(): ContentValue {
  return useContext(ContentContext) ?? FALLBACK;
}

/** Language-resolved venue data: units, capacity, contact, location and homepage photos. */
export function useVenue(): Venue {
  const { content } = useContent();
  const { lang } = useI18n();
  return useMemo(() => resolveVenue(content, lang), [content, lang]);
}

export type { Venue, VenuePhoto, VenueUnit } from "./resolve";
