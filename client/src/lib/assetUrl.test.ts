import { describe, expect, it } from "vitest";
import { assetUrl, resolveAssetUrl } from "./assetUrl";

describe("assetUrl", () => {
  it("keeps non-Manus paths intact", () => {
    expect(assetUrl("https://example.com/photo.jpg")).toBe("https://example.com/photo.jpg");
    expect(assetUrl("/images/logo.svg")).toBe("/images/logo.svg");
  });

  it("keeps the current Manus paths while no Vercel Blob origin is configured", () => {
    expect(assetUrl("/manus-storage/gen_hero_f355fb4f.jpg")).toBe("/manus-storage/gen_hero_f355fb4f.jpg");
  });

  it("maps a legacy Manus asset to the stable Vercel Blob pathname", () => {
    expect(resolveAssetUrl("/manus-storage/gen_hero_f355fb4f.jpg", "https://abc.public.blob.vercel-storage.com/sweet-village/"))
      .toBe("https://abc.public.blob.vercel-storage.com/sweet-village/gen_hero.jpg");
  });
});
