import { describe, expect, it } from "vitest";
import { mapsScriptUrl } from "./loadMaps";

describe("mapsScriptUrl", () => {
  it("creates a direct Google Maps API URL from a browser-restricted public key", () => {
    expect(mapsScriptUrl("public-key", "marker,places")).toBe(
      "https://maps.googleapis.com/maps/api/js?key=public-key&v=weekly&libraries=marker%2Cplaces",
    );
  });
});
