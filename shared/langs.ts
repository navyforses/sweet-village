/**
 * Language primitives shared by the public site, the admin panel and the
 * Vercel functions. `client/src/i18n/types.ts` re-exports LANGS from here so
 * the six-language architecture has a single definition.
 */

export const LANGS = ["ka", "en", "ru", "ar", "fr", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** Owner-editable text with one value per supported language. "" = not translated yet. */
export type LocalizedText = Record<Lang, string>;

export function localized(
  ka: string,
  en: string,
  ru: string,
  ar: string,
  fr: string,
  es: string,
): LocalizedText {
  return { ka, en, ru, ar, fr, es };
}

export function emptyLocalized(): LocalizedText {
  return { ka: "", en: "", ru: "", ar: "", fr: "", es: "" };
}

/**
 * Resolves a localized value for the requested language. Georgian is the
 * only mandatory language, so untranslated fields fall back to English and
 * then Georgian instead of rendering an empty string.
 */
export function pickLang(text: Partial<LocalizedText> | undefined | null, lang: Lang): string {
  if (!text) return "";
  return text[lang] || text.en || text.ka || "";
}

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
