import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT } from "@shared/content";
import { describePath, diffLeaves, flattenLeaves, formatLeaf } from "./diff";

describe("revision diff", () => {
  it("flattens nested content into dotted leaf paths", () => {
    const leaves = flattenLeaves({ a: { b: [1, { c: "x" }] }, d: true, e: null });
    expect([...leaves.entries()]).toEqual([
      ["a.b.0", 1],
      ["a.b.1.c", "x"],
      ["d", true],
      ["e", null],
    ]);
  });

  it("reports changed, added and removed leaves", () => {
    const before = { units: [{ id: "small-a", nightlyPrice: 120, gallery: [{ url: "/a.jpg" }, { url: "/b.jpg" }] }] };
    const after = { units: [{ id: "small-a", nightlyPrice: 130, gallery: [{ url: "/a.jpg" }] }], extra: "new" };
    expect(diffLeaves(before, after)).toEqual([
      { path: "units.0.nightlyPrice", before: 120, after: 130 },
      { path: "extra", before: undefined, after: "new" },
      { path: "units.0.gallery.1.url", before: "/b.jpg", after: undefined },
    ]);
    expect(diffLeaves(before, before)).toEqual([]);
  });

  it("describes paths with Georgian labels and entry names", () => {
    const units = DEFAULT_CONTENT.units;
    expect(describePath("units.2.nightlyPrice", units)).toBe("ერთეული › «საოჯახო დუპლექსი A» › ფასი ღამეზე");
    expect(describePath("units.4.gallery.0.caption.en", units)).toBe("ერთეული › «აუზისპირა სახლი» › გალერეა › #1 › წარწერა › ინგლ.");
    const menu = DEFAULT_CONTENT.menu;
    expect(describePath("categories.0.items.1.price", menu)).toBe("კატეგორია › «ცივი კერძები» › კერძი › «ფხალის ასორტი» › ფასი");
    expect(describePath("categories.0.items.1.price", undefined, menu)).toContain("«ფხალის ასორტი»");
    expect(describePath("unknownKey.3", {})).toBe("unknownKey › #4");
  });

  it("formats leaves for people", () => {
    expect(formatLeaf(undefined)).toBe("—");
    expect(formatLeaf(true)).toBe("კი");
    expect(formatLeaf("")).toBe("(ცარიელი)");
    expect(formatLeaf(12.5)).toBe("12.5");
  });
});
