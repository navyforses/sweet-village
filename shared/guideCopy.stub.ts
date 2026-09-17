/**
 * Browser-bundle stand-in for ./guideCopy.ts (see vite.config.ts): the same
 * seed articles with a placeholder body in the languages they are written
 * in and no FAQ. Article pages import ./guideBodies.ts on demand, and every
 * prerendered article page embeds the full section for hydration.
 */
import { GUIDE_BODY_PENDING, GUIDE_META, type GuideSeedMeta } from "./guideMeta.js";
import type { LocalizedText } from "./langs.js";

export type GuideSeed = GuideSeedMeta & { body: LocalizedText; faq: { question: LocalizedText; answer: LocalizedText }[] };

export const GUIDE_SEEDS: GuideSeed[] = GUIDE_META.map(meta => ({
  ...meta,
  body: { ka: "", en: "", ru: "", ar: "", fr: "", es: "", ...Object.fromEntries(meta.bodyLangs.map(lang => [lang, GUIDE_BODY_PENDING])) } as LocalizedText,
  faq: [],
}));
