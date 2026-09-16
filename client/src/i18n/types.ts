import { LANGS, type Lang } from "@shared/langs";

export { LANGS };
export type { Lang };

/** Language names written in their own script — never flags. */
export const LANG_NAMES: Record<Lang, string> = {
  ka: "ქართული",
  en: "English",
  ru: "Русский",
  ar: "العربية",
  fr: "Français",
  es: "Español",
};

export { RTL_LANGS, isRtl } from "@shared/langsRtl";

/**
 * Georgian visitors are mostly locals booking events, the pool and dining.
 * Everyone else is a traveller looking for a place to sleep near Prometheus
 * Cave. The homepage order flips accordingly.
 */
export function isLocalSegment(lang: Lang) {
  return lang === "ka";
}
