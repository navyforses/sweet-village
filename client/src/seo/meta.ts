import { LANGS, type Lang } from "@shared/langs";
import { canonicalUrl, DEFAULT_LANG, SITE_ORIGIN } from "@/i18n/paths";

export const OG_LOCALES: Record<Lang, string> = { ka: "ka_GE", en: "en_US", ru: "ru_RU", ar: "ar_AR", fr: "fr_FR", es: "es_ES" };

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og/default.png`;

export interface PageMetaInput {
  lang: Lang;
  /** Language-relative path, e.g. "/stay/grand". */
  path: string;
  title: string;
  description: string;
  /** Site-relative or absolute image; falls back to the brand card. */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Languages the page exists in (default: all six). Guides are only listed in the languages they are written in. */
  langs?: readonly Lang[];
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  alternates: { hrefLang: string; href: string }[];
  image: string;
  type: "website" | "article";
  locale: string;
  alternateLocales: string[];
  robots: string | null;
}

/** Cuts a sentence-ish description to the length search snippets actually show. */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
  return `${cut.slice(0, stop > 60 ? stop : cut.length).trim()}…`;
}

export function absoluteUrl(ref: string): string {
  if (/^https?:\/\//.test(ref)) return ref;
  return `${SITE_ORIGIN}${ref.startsWith("/") ? ref : `/${ref}`}`;
}

/** Everything a page's <head> needs, computed once from the language and the route. */
export function pageMeta(input: PageMetaInput): PageMeta {
  const { lang, path } = input;
  const langs = input.langs && input.langs.length > 0 ? input.langs : LANGS;
  const fallback = langs.includes(DEFAULT_LANG) ? DEFAULT_LANG : langs[0];
  return {
    title: input.title,
    description: truncate(input.description, 160),
    canonical: canonicalUrl(lang, path),
    alternates: [
      ...langs.map(code => ({ hrefLang: code, href: canonicalUrl(code, path) })),
      { hrefLang: "x-default", href: canonicalUrl(fallback, path) },
    ],
    image: input.image ? absoluteUrl(input.image) : DEFAULT_OG_IMAGE,
    type: input.type ?? "website",
    locale: OG_LOCALES[lang],
    alternateLocales: langs.filter(code => code !== lang).map(code => OG_LOCALES[code]),
    robots: input.noindex ? "noindex, nofollow" : null,
  };
}
