import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import ka, { type Dict } from "./locales/ka";
import en from "./locales/en";
import ru from "./locales/ru";
import ar from "./locales/ar";
import fr from "./locales/fr";
import es from "./locales/es";
import { LANGS, type Lang, isRtl } from "./types";

/**
 * Locale modules are translated from ka.ts, so they share its shape. They are
 * cast to Dict because the translation pipeline produces plain object literals
 * whose string literal types differ from the Georgian source.
 */
const DICTS = { ka, en, ru, ar, fr, es } as unknown as Record<Lang, Dict>;

const STORAGE_KEY = "sv-lang";

function detectLang(): Lang {
  if (typeof window === "undefined") return "ka";

  // 1. Explicit ?lang= wins (used by QR codes and shared links).
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param && (LANGS as readonly string[]).includes(param)) return param as Lang;

  // 2. Returning visitor's stored choice.
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (LANGS as readonly string[]).includes(stored)) return stored as Lang;

  // 3. Browser language.
  for (const nav of navigator.languages ?? [navigator.language]) {
    const base = nav.toLowerCase().split("-")[0];
    if ((LANGS as readonly string[]).includes(base)) return base as Lang;
  }

  return "ka";
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  rtl: boolean;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");

  // Detect after mount so SSR/first paint stays deterministic.
  useEffect(() => {
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = isRtl(lang) ? "rtl" : "ltr";
    const dict = DICTS[lang];
    document.title = dict.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", dict.meta.description);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private browsing */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: DICTS[lang], rtl: isRtl(lang) }),
    [lang, setLang],
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
