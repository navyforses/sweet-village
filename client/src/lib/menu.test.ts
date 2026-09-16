import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT } from "@shared/content";
import { resolveContent, resolveVenue } from "@/content/resolve";
import { searchMenu } from "./menu";

describe("searchMenu", () => {
  const menu = resolveVenue(resolveContent(DEFAULT_CONTENT, {}), "fr").menu;

  it("returns every category for an empty query", () => {
    expect(searchMenu(menu.categories, "  ")).toBe(menu.categories);
  });

  it("matches the visible name and the names in other languages", () => {
    const byFrench = searchMenu(menu.categories, "khatchapouri");
    const byEnglish = searchMenu(menu.categories, "KHACHAPURI");
    const byGeorgian = searchMenu(menu.categories, "ხაჭაპური");
    expect(byFrench.flatMap(category => category.items).length).toBeGreaterThan(0);
    expect(byEnglish.flatMap(category => category.items).map(item => item.id)).toEqual(expect.arrayContaining([17, 18, 19]));
    expect(byGeorgian.flatMap(category => category.items).map(item => item.id)).toEqual(expect.arrayContaining([17, 18, 19]));
    expect(byEnglish.every(category => category.items.length > 0)).toBe(true);
  });

  it("drops categories without matches", () => {
    expect(searchMenu(menu.categories, "zzzz-no-such-dish")).toEqual([]);
  });
});
