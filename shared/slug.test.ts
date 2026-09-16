import { describe, expect, it } from "vitest";
import { isSlug, slugify, transliterate } from "./slug";

describe("slugs", () => {
  it("transliterates Georgian and Cyrillic titles into readable Latin slugs", () => {
    expect(slugify("პრომეთეს მღვიმე: ბილეთი, საათები")).toBe("prometes-mghvime-bileti-saatebi");
    expect(slugify("Пещера Прометея — билеты")).toBe("peshchera-prometeya-bilety");
    expect(slugify("  Okatse & Martvili — one day trip!  ")).toBe("okatse-martvili-one-day-trip");
    expect(slugify("Café à Kutaïsi")).toBe("cafe-a-kutaisi");
    expect(transliterate("ღვინო")).toBe("ghvino");
  });

  it("caps the length and never ends with a dash", () => {
    expect(slugify("a".repeat(100))).toHaveLength(80);
    expect(slugify("word ".repeat(30), 12)).toBe("word-word-wo");
    expect(slugify("!!!")).toBe("");
  });

  it("recognises valid slugs", () => {
    expect(isSlug("prometheus-cave")).toBe(true);
    expect(isSlug("ab")).toBe(false);
    expect(isSlug("Bad_Slug")).toBe(false);
    expect(isSlug("-leading")).toBe(false);
    expect(isSlug("double--dash")).toBe(false);
  });
});
