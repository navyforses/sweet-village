import { describe, expect, it } from "vitest";
import { DICTS } from "@/i18n";
import type { TextsSection } from "@shared/content";
import { collectLeaves, countOverrides, diffPatch, fromTextForm, getPath, leafKey, toTextForm } from "./textPatch";

describe("page text patches", () => {
  it("enumerates every string leaf of a section with six defaults", () => {
    const leaves = collectLeaves(DICTS, "highlights");
    expect(leaves.map(leaf => leaf.path)).toEqual(["title", "items.0.title", "items.0.body", "items.1.title", "items.1.body", "items.2.title", "items.2.body", "items.3.title", "items.3.body"]);
    expect(leaves[1].key).toBe("items__0__title");
    expect(leaves[1].defaults.ka).toBe(DICTS.ka.highlights.items[0].title);
    expect(leaves[1].defaults.fr).toBe(DICTS.fr.highlights.items[0].title);
    expect(collectLeaves(DICTS, "hero").every(leaf => leaf.defaults.ar.length > 0)).toBe(true);
  });

  it("reads current overrides back into the form and leaves defaults empty", () => {
    const leaves = collectLeaves(DICTS, "hero");
    const texts: TextsSection = { ka: { hero: { title: "ახალი სათაური" } }, en: { hero: { title: "New title" }, about: { title: "x" } } };
    const form = toTextForm(texts, "hero", leaves);
    expect(form.fields[leafKey("title")].ka).toBe("ახალი სათაური");
    expect(form.fields[leafKey("title")].en).toBe("New title");
    expect(form.fields[leafKey("title")].ru).toBe("");
    expect(form.fields[leafKey("subtitle")].ka).toBe("");
    expect(countOverrides(form)).toBe(1);
  });

  it("writes only changed leaves, emits whole arrays and keeps other sections", () => {
    const leaves = collectLeaves(DICTS, "highlights");
    const existing: TextsSection = { en: { about: { title: "Kept" } } };
    const form = toTextForm(existing, "highlights", leaves);
    form.fields[leafKey("items.1.title")].ka = "ახალი";
    form.fields[leafKey("title")].en = "Why us";
    const next = fromTextForm(existing, DICTS, "highlights", leaves, form);

    const kaItems = getPath(next.ka, "highlights.items") as { title: string; body: string }[];
    expect(kaItems).toHaveLength(4);
    expect(kaItems[1].title).toBe("ახალი");
    expect(kaItems[0].title).toBe(DICTS.ka.highlights.items[0].title);
    expect(getPath(next.ka, "highlights.title")).toBeUndefined();
    expect(next.en).toEqual({ about: { title: "Kept" }, highlights: { title: "Why us" } });
    expect(next.ru).toBeUndefined();
  });

  it("drops the section from the patch when every field is cleared", () => {
    const leaves = collectLeaves(DICTS, "hero");
    const existing: TextsSection = { ka: { hero: { title: "x" }, about: { title: "y" } } };
    const form = toTextForm(existing, "hero", leaves);
    form.fields[leafKey("title")].ka = "   ";
    expect(fromTextForm(existing, DICTS, "hero", leaves, form)).toEqual({ ka: { about: { title: "y" } } });
  });

  it("computes minimal diffs", () => {
    expect(diffPatch({ a: "1", b: { c: "2", d: "3" } }, { a: "1", b: { c: "2", d: "4" } })).toEqual({ b: { d: "4" } });
    expect(diffPatch({ a: ["x", "y"] }, { a: ["x", "z"] })).toEqual({ a: ["x", "z"] });
    expect(diffPatch({ a: "1" }, { a: "1" })).toBeUndefined();
  });
});
