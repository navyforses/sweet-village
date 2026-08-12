import { describe, expect, it } from "vitest";
import { activeBlobSources } from "./migrate-assets";

describe("Vercel Blob active-photo migration", () => {
  it("collects a stable, deduplicated source list for the live site photos", () => {
    const sources = activeBlobSources();
    expect(sources.length).toBeGreaterThan(100);
    expect(new Set(sources.map(source => source.pathname)).size).toBe(sources.length);
    expect(sources.every(source => source.source.startsWith("https://sweetvillage-pdzcphmy.manus.space/manus-storage/"))).toBe(true);
  });
});
