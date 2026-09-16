import type { Lang } from "./langs";

export const RTL_LANGS: readonly Lang[] = ["ar"];

export function isRtl(lang: Lang): boolean {
  return RTL_LANGS.includes(lang);
}
