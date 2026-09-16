import { describe, expect, it } from "vitest";
import { canonicalUrl, localeBase, localePath, stripLocale, upgradeLegacyLangUrl } from "./paths";

describe("locale paths", () => {
  it("keeps Georgian at the root and prefixes the other languages", () => {
    expect(localePath("ka", "/")).toBe("/");
    expect(localePath("ka", "/stay")).toBe("/stay");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/stay/grand")).toBe("/en/stay/grand");
    expect(localePath("ar", "menu")).toBe("/ar/menu");
    expect(localeBase("ka")).toBe("");
    expect(localeBase("ru")).toBe("/ru");
  });

  it("reads the language back out of a pathname", () => {
    expect(stripLocale("/")).toEqual({ lang: "ka", path: "/" });
    expect(stripLocale("/stay")).toEqual({ lang: "ka", path: "/stay" });
    expect(stripLocale("/en")).toEqual({ lang: "en", path: "/" });
    expect(stripLocale("/en/")).toEqual({ lang: "en", path: "/" });
    expect(stripLocale("/fr/events/wedding")).toEqual({ lang: "fr", path: "/events/wedding" });
    // Unknown two-letter prefixes and the explicit /ka prefix are not languages here.
    expect(stripLocale("/de/stay")).toEqual({ lang: "ka", path: "/de/stay" });
    expect(stripLocale("/ka/stay")).toEqual({ lang: "ka", path: "/ka/stay" });
    expect(stripLocale("/english")).toEqual({ lang: "ka", path: "/english" });
  });

  it("builds canonical URLs on the production origin", () => {
    expect(canonicalUrl("ka", "/pool")).toBe("https://www.sweet-village.com/pool");
    expect(canonicalUrl("es", "/")).toBe("https://www.sweet-village.com/es");
  });

  it("upgrades legacy ?lang= links and keeps the other query parameters", () => {
    expect(upgradeLegacyLangUrl("/menu", "?lang=en")).toBe("/en/menu");
    expect(upgradeLegacyLangUrl("/booking", "?interest=cottage&unit=grand&lang=ru")).toBe("/ru/booking?interest=cottage&unit=grand");
    expect(upgradeLegacyLangUrl("/en/stay", "?lang=ka")).toBe("/stay");
    expect(upgradeLegacyLangUrl("/stay", "")).toBeNull();
    expect(upgradeLegacyLangUrl("/stay", "?lang=xx")).toBeNull();
  });
});
