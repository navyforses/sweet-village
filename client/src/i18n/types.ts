export const LANGS = ["ka", "en", "ru", "ar", "fr", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** Language names written in their own script — never flags. */
export const LANG_NAMES: Record<Lang, string> = {
  ka: "ქართული",
  en: "English",
  ru: "Русский",
  ar: "العربية",
  fr: "Français",
  es: "Español",
};

export const RTL_LANGS: Lang[] = ["ar"];

export function isRtl(lang: Lang) {
  return RTL_LANGS.includes(lang);
}

/**
 * Georgian visitors are mostly locals booking events, the pool and dining.
 * Everyone else is a traveller looking for a place to sleep near Prometheus
 * Cave. The homepage order flips accordingly.
 */
export function isLocalSegment(lang: Lang) {
  return lang === "ka";
}
