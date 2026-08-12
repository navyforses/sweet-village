import { describe, expect, it } from "vitest";
import { DISHES, MENU_ITEM_PHOTOS, PHOTOS } from "../client/src/lib/assets";
import { UNITS } from "../shared/venue";
import { activeBlobSources } from "./migrate-assets";

const LEGACY_ORIGIN = "https://sweetvillage-pdzcphmy.manus.space";
const PREUPLOADED_BLOB_REFS = new Set([
  "/manus-storage/large-cottage-exterior-approved.webp",
  "/manus-storage/large-cottage-ground-floor-bedroom-approved.webp",
  "/manus-storage/large-cottage-second-floor-twin-bedroom-approved.webp",
  "/manus-storage/large-cottage-ground-floor-staircase-approved.webp",
  "/manus-storage/large-cottage-shared-kitchen-approved.webp",
  "/manus-storage/large-cottage-bathroom-approved.webp",
  "/manus-storage/garden-cottage-exterior.webp",
  "/manus-storage/garden-cottage-porch.webp",
  "/manus-storage/garden-cottage-studio.webp",
  "/manus-storage/garden-cottage-sleeping-area.webp",
  "/manus-storage/garden-cottage-garden-view.webp",
]);

function blobPathname(legacyPath: string) {
  const filename = legacyPath.split("/").pop() ?? "asset";
  return `sweet-village/${filename.replace(/_[a-f0-9]{8}(?=\.[a-z0-9]+$)/i, "")}`;
}

describe("Vercel Blob active-photo migration", () => {
  it("collects a stable, deduplicated source list for the live site photos", () => {
    const sources = activeBlobSources();
    expect(sources.length).toBeGreaterThan(90);
    expect(new Set(sources.map(source => source.pathname)).size).toBe(sources.length);
    expect(sources.every(source => source.source.startsWith(`${LEGACY_ORIGIN}/manus-storage/`))).toBe(true);
  });

  it("matches every active site photo to its exact legacy source URL", () => {
    const livePhotoRefs = [
      ...Object.values(PHOTOS),
      ...Object.values(DISHES),
      ...Object.values(MENU_ITEM_PHOTOS),
      ...UNITS.flatMap(unit => [unit.photo, ...unit.gallery]),
    ].filter(photo => photo.startsWith("/manus-storage/") && !PREUPLOADED_BLOB_REFS.has(photo));
    const expected = new Map(
      [...new Set(livePhotoRefs)].map(legacyPath => [
        blobPathname(legacyPath),
        `${LEGACY_ORIGIN}${legacyPath}`,
      ]),
    );
    const actual = new Map(activeBlobSources().map(source => [source.pathname, source.source]));

    expect(actual).toEqual(expected);
  });
});
