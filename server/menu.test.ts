import { describe, expect, it } from "vitest";
import { MENU, MENU_ITEM_COUNT } from "../shared/menuData";
import { CATEGORY_TRANSLATIONS, ITEM_TRANSLATIONS } from "../shared/menuTranslations";

describe("menu data", () => {
  it("has 68 items across 9 categories", () => {
    expect(MENU).toHaveLength(9);
    expect(MENU_ITEM_COUNT).toBe(68);
  });

  it("uses unique sequential item ids", () => {
    const ids = MENU.flatMap(c => c.items.map(i => i.id)).sort((a, b) => a - b);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[0]).toBe(1);
    expect(ids.at(-1)).toBe(68);
  });

  it("prices every item within the printed menu's range", () => {
    for (const cat of MENU) {
      for (const item of cat.items) {
        expect(item.price).toBeGreaterThanOrEqual(2);
        expect(item.price).toBeLessThanOrEqual(35);
      }
    }
  });

  it("names every item in Georgian, English and Russian", () => {
    for (const cat of MENU) {
      for (const item of cat.items) {
        expect(item.ka.length).toBeGreaterThan(0);
        expect(item.en.length).toBeGreaterThan(0);
        expect(item.ru.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("menu translations", () => {
  it("translates every category into Arabic, French and Spanish", () => {
    for (const cat of MENU) {
      const tr = CATEGORY_TRANSLATIONS[cat.id];
      expect(tr, `missing category ${cat.id}`).toBeDefined();
      for (const lang of ["ar", "fr", "es"] as const) {
        expect(tr[lang].length, `${cat.id}.${lang}`).toBeGreaterThan(0);
      }
    }
  });

  it("translates all 68 items into Arabic, French and Spanish", () => {
    for (const cat of MENU) {
      for (const item of cat.items) {
        const tr = ITEM_TRANSLATIONS[item.id];
        expect(tr, `missing item ${item.id} (${item.en})`).toBeDefined();
        for (const lang of ["ar", "fr", "es"] as const) {
          expect(tr[lang].name.length, `item ${item.id}.${lang}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("writes Arabic names in Arabic script", () => {
    const arabic = /[\u0600-\u06FF]/;
    for (const cat of MENU) {
      for (const item of cat.items) {
        expect(arabic.test(ITEM_TRANSLATIONS[item.id].ar.name), `item ${item.id}`).toBe(true);
      }
    }
  });

  it("does not leave Georgian script in the Latin-script translations", () => {
    const georgian = /[\u10A0-\u10FF]/;
    for (const cat of MENU) {
      for (const item of cat.items) {
        for (const lang of ["fr", "es"] as const) {
          expect(georgian.test(ITEM_TRANSLATIONS[item.id][lang].name), `item ${item.id}.${lang}`).toBe(false);
        }
      }
    }
  });
});
