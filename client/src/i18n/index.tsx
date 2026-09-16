import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocation, useSearch } from "wouter";
import { deepMerge } from "@shared/deepMerge";
import { ContentContext } from "@/content/context";
import ka, { type Dict } from "./locales/ka";
import en from "./locales/en";
import ru from "./locales/ru";
import ar from "./locales/ar";
import fr from "./locales/fr";
import es from "./locales/es";
import { LANGS, type Lang, isRtl } from "./types";
import { localePath, stripLocale } from "./paths";

/**
 * Locale modules are translated from ka.ts, so they share its shape. They are
 * cast to Dict because the translation pipeline produces plain object literals
 * whose string literal types differ from the Georgian source.
 */
export const DICTS = { ka, en, ru, ar, fr, es } as unknown as Record<Lang, Dict>;

const STORAGE_KEY = "sv-lang";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  rtl: boolean;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * The language is a function of the URL: `/en/stay` is English, `/stay` is
 * Georgian. That gives every language its own crawlable address (hreflang,
 * canonical, sitemap) instead of a `?lang=` parameter that search engines
 * collapse into one page.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const { lang, path } = stripLocale(location);
  // Owner-edited texts (admin panel) are layered on top of the static
  // dictionary, after the authentic-copy overlay applied at module load.
  const texts = useContext(ContentContext)?.content.texts;
  const dict = useMemo<Dict>(() => {
    const patch = texts?.[lang];
    return patch && Object.keys(patch).length > 0 ? deepMerge(DICTS[lang], patch) : DICTS[lang];
  }, [lang, texts]);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = isRtl(lang) ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private browsing */
    }
  }, [lang]);

  /** Switching language keeps the visitor on the same page, in the other language's URL. */
  const setLang = useCallback(
    (l: Lang) => {
      const query = search ? `?${search.replace(/^\?/, "")}` : "";
      navigate(`${localePath(l, path)}${query}`);
    },
    [navigate, path, search],
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dict, rtl: isRtl(lang) }),
    [lang, setLang, dict],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export { LANGS, LANG_NAMES, isRtl, isLocalSegment } from "./types";
export type { Lang } from "./types";
