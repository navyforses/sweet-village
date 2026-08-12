import { describe, expect, it } from "vitest";
import { getPoolViewHouseCaptions } from "./accommodationDetailCopy";

describe("Pool View House gallery captions", () => {
  it("provides one localized caption for every approved photo", () => {
    for (const lang of ["ka", "en", "ru", "ar", "fr", "es"] as const) {
      const captions = getPoolViewHouseCaptions(lang);
      expect(captions).toHaveLength(10);
      expect(captions.every(Boolean)).toBe(true);
    }
  });

  it("uses the approved Georgian marketing name instead of Loft", () => {
    expect(getPoolViewHouseCaptions("ka")[0]).toContain("აუზისპირა სახლის");
    expect(getPoolViewHouseCaptions("ka").join(" ")).not.toMatch(/ლოფტ/i);
  });
});
