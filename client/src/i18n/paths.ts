import { LANGS, type Lang } from "@shared/langs";

/** Georgian lives at the root; every other language gets a path prefix (/en/stay). */
export const DEFAULT_LANG: Lang = "ka";

/** Canonical production origin used for canonical/hreflang/OG URLs and the sitemap. */
export const SITE_ORIGIN = "https://www.sweet-village.com";

/** Static public routes (language-relative). Dynamic ones are added from content. */
export const PUBLIC_ROUTES = ["/", "/stay", "/menu", "/events", "/pool", "/location", "/about", "/booking"] as const;

export function isLang(value: string | undefined | null): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** "/en/stay" → { lang: "en", path: "/stay" }; "/stay" → { lang: "ka", path: "/stay" }; "/en" → { lang: "en", path: "/" }. */
export function stripLocale(pathname: string): { lang: Lang; path: string } {
  const match = /^\/([a-z]{2})(?=\/|$)(.*)$/.exec(pathname);
  if (match && isLang(match[1]) && match[1] !== DEFAULT_LANG) {
    return { lang: match[1], path: match[2] || "/" };
  }
  return { lang: DEFAULT_LANG, path: pathname || "/" };
}

/** Language prefix wouter's <Router base> needs: "" for Georgian, "/en" otherwise. */
export function localeBase(lang: Lang): string {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

/** Absolute site path for a language-relative path: ("en", "/stay") → "/en/stay"; ("en", "/") → "/en". */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Full canonical URL. */
export function canonicalUrl(lang: Lang, path: string): string {
  return `${SITE_ORIGIN}${localePath(lang, path)}`;
}

/** Turns a legacy `?lang=xx` URL into its prefixed equivalent (without the param); null when nothing to do. */
export function upgradeLegacyLangUrl(pathname: string, search: string): string | null {
  const params = new URLSearchParams(search);
  const requested = params.get("lang");
  if (!isLang(requested)) return null;
  params.delete("lang");
  const { path } = stripLocale(pathname);
  const query = params.toString();
  return `${localePath(requested, path)}${query ? `?${query}` : ""}`;
}
