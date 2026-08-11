import { MENU, type MenuCategory, type MenuItem } from "@shared/menuData";
import { CATEGORY_TRANSLATIONS, ITEM_TRANSLATIONS, type ExtraLang } from "@shared/menuTranslations";
import { EN_RU_DESCRIPTIONS } from "@shared/menuDescriptions";
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
  if (lang === "ka") return item.descKa ?? "";
  return EN_RU_DESCRIPTIONS[item.id]?.[lang] ?? "";
}

/** Every live-menu locale has a short card description. */
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
