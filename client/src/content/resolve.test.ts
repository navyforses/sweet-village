import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT } from "@shared/content";
import { resolveContent, resolveVenue, sanitizeSparse } from "./resolve";

describe("resolveContent", () => {
  it("returns the defaults when nothing is saved", () => {
    const resolved = resolveContent(DEFAULT_CONTENT, {});
    expect(resolved.units).toBe(DEFAULT_CONTENT.units);
    expect(resolved.home).toBe(DEFAULT_CONTENT.home);
    expect(resolved.texts).toEqual({});
  });

  it("replaces saved sections wholesale and merges texts per language", () => {
    const units = { units: DEFAULT_CONTENT.units.units.map(unit => ({ ...unit, nightlyPrice: unit.nightlyPrice + 10 })) };
    const resolved = resolveContent(
      { ...DEFAULT_CONTENT, texts: { ka: { hero: { title: "ძველი", subtitle: "ქვესათაური" } } } },
      { units, texts: { ka: { hero: { title: "ახალი" } }, en: { hero: { title: "New" } } } },
    );
    expect(resolved.units.units[0].nightlyPrice).toBe(DEFAULT_CONTENT.units.units[0].nightlyPrice + 10);
    expect(resolved.texts.ka).toEqual({ hero: { title: "ახალი", subtitle: "ქვესათაური" } });
    expect(resolved.texts.en).toEqual({ hero: { title: "New" } });
    expect(resolved.contact).toBe(DEFAULT_CONTENT.contact);
  });
});

describe("sanitizeSparse", () => {
  it("drops sections with an unexpected shape but keeps valid ones", () => {
    const sane = sanitizeSparse({
      units: { units: [{ id: "x", name: { ka: "x" }, nightlyPrice: 1, gallery: [{ url: "/a.jpg" }] }] },
      home: { hero: { url: "" } },
      contact: { phone: "+1", whatsapp: "1", email: "a@b.c" },
      location: { lat: "42", lng: 42, address: {} },
      texts: { ka: {} },
      menu: { categories: [] },
    });
    expect(Object.keys(sane).sort()).toEqual(["contact", "texts", "units"]);
    expect(sanitizeSparse(null)).toEqual({});
    expect(sanitizeSparse("nope")).toEqual({});
  });

  it("accepts the default content unchanged", () => {
    expect(sanitizeSparse(DEFAULT_CONTENT)).toEqual(DEFAULT_CONTENT);
  });
});

describe("resolveVenue", () => {
  it("resolves language-specific unit copy and captions with fallbacks", () => {
    const content = resolveContent(DEFAULT_CONTENT, {});
    const ka = resolveVenue(content, "ka");
    const fr = resolveVenue(content, "fr");
    expect(ka.units).toHaveLength(5);
    expect(ka.units[0].title).toBe("ბაღის კოტეჯი 1");
    expect(fr.units[0].title).toBe("Chalet du Jardin 1");
    expect(ka.units[0].cover).toBe(ka.units[0].gallery[0].url);
    expect(ka.units[4].gallery[0].caption).toBe("აუზისპირა სახლის გარე ხედი");
    expect(ka.capacity).toEqual({ units: 5, beds: 17, maxGuests: 18 });
    expect(ka.location.address).toContain("ქვილიშორი");
    expect(fr.location.address).toContain("Kvilishori");
    expect(ka.home.gallery).toHaveLength(8);
  });

  it("falls back to English then Georgian for untranslated fields", () => {
    const unit = { ...DEFAULT_CONTENT.units.units[0], name: { ka: "ქართული", en: "English", ru: "", ar: "", fr: "", es: "" }, gallery: [{ url: "/x.jpg", caption: { ka: "წარწერა" } }] };
    const content = resolveContent(DEFAULT_CONTENT, { units: { units: [unit] } });
    const ru = resolveVenue(content, "ru");
    expect(ru.units[0].title).toBe("English");
    expect(ru.units[0].gallery[0].caption).toBe("წარწერა");
    expect(ru.capacity.units).toBe(1);
  });
});
