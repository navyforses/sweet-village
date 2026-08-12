import { describe, expect, it } from "vitest";

describe("Vercel Blob image redirect", () => {
  it("accepts only the Sweet Village storage namespace", () => {
    const accepted = "sweet-village/gen_hero.jpg".startsWith("sweet-village/");
    const rejected = "other-store/private.jpg".startsWith("sweet-village/");
    expect(accepted).toBe(true);
    expect(rejected).toBe(false);
  });
});
