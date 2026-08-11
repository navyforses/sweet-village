import { MENU, type MenuCategory, type MenuItem } from "@shared/menuData";
import { CATEGORY_TRANSLATIONS, ITEM_TRANSLATIONS, type ExtraLang } from "@shared/menuTranslations";
import type { Lang } from "@/i18n";

/**
 * ka/en/ru are printed on the physical menu, so they live on the item itself.
 * ar/fr/es come from the translation layer. This resolves either source.
 */

function isExtra(lang: Lang): lang is ExtraLang {
  return lang === "ar" || lang === "fr" || lang === "es";
}

export function categoryName(cat: MenuCategory, lang: Lang): string {
  if (isExtra(lang)) return CATEGORY_TRANSLATIONS[cat.id]?.[lang] || cat.en;
  return cat[lang] ?? cat.en;
}

export function itemName(item: MenuItem, lang: Lang): string {
  if (isExtra(lang)) return ITEM_TRANSLATIONS[item.id]?.[lang]?.name || item.en;
  return item[lang] ?? item.en;
}

export function itemDesc(item: MenuItem, lang: Lang): string {
  if (isExtra(lang)) return ITEM_TRANSLATIONS[item.id]?.[lang]?.desc || "";
  // Only Georgian descriptions exist on the printed menu. For en/ru we borrow
  // the French translation's meaning is not available, so we show nothing
  // rather than mixing languages — the dish name carries the information.
  return lang === "ka" ? (item.descKa ?? "") : "";
}

/** Georgian and English descriptions we can show; ru falls back to none. */
export function hasDesc(item: MenuItem, lang: Lang): boolean {
  return itemDesc(item, lang).length > 0;
}

export function searchMenu(query: string, lang: Lang): MenuCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return MENU;
  return MENU.map(cat => ({
    ...cat,
    items: cat.items.filter(it => {
      const name = itemName(it, lang).toLowerCase();
      const alt = `${it.ka} ${it.en} ${it.ru}`.toLowerCase();
      return name.includes(q) || alt.includes(q);
    }),
  })).filter(cat => cat.items.length > 0);
}

export { MENU };
export type { MenuCategory, MenuItem };
