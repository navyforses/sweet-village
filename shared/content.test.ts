import { describe, expect, it } from "vitest";
import { capacityOf, DEFAULT_CONTENT, isSectionKey, pickLang, SECTION_KEYS } from "./content";
import { isAllowedImageRef, parseSection, SECTION_SCHEMAS, sectionIssues, unitSchema } from "./contentSchema";
import { CAPACITY, CONTACT, LOCATION, UNITS } from "./venue";
import { HOME_GALLERY_REFS, HOME_PHOTO_REFS } from "./venuePhotos";

describe("default content", () => {
  it("validates against every section schema", () => {
    for (const key of SECTION_KEYS) {
      expect(sectionIssues(key, DEFAULT_CONTENT[key]), key).toBeNull();
      expect(SECTION_SCHEMAS[key].parse(DEFAULT_CONTENT[key])).toEqual(DEFAULT_CONTENT[key]);
    }
  });

  it("mirrors the compiled venue facts so day-one rendering is unchanged", () => {
    const units = DEFAULT_CONTENT.units.units;
    expect(units.map(unit => unit.id)).toEqual(UNITS.map(unit => unit.id));
    for (const [index, unit] of units.entries()) {
      const source = UNITS[index];
      expect(unit.beds).toBe(source.beds);
      expect(unit.maxGuests).toBe(source.maxGuests);
      expect(unit.floors).toBe(source.floors);
      expect(unit.nightlyPrice).toBe(source.nightlyPrice);
      expect(unit.gallery.map(photo => photo.url)).toEqual([...source.gallery]);
      expect(unit.gallery[0].url).toBe(source.photo);
      expect(unit.gallery.every(photo => photo.caption?.ka && photo.caption.en)).toBe(true);
    }
    expect(capacityOf(units)).toEqual({ units: CAPACITY.units, beds: CAPACITY.beds, maxGuests: CAPACITY.maxGuests });
  });

  it("keeps the approved unit names and descriptions", () => {
    const byId = Object.fromEntries(DEFAULT_CONTENT.units.units.map(unit => [unit.id, unit]));
    expect(byId["small-a"].name.ka).toBe("ბაღის კოტეჯი 1");
    expect(byId["small-a"].name.en).toBe("Garden Cottage 1");
    expect(byId["large-b"].name.fr).toBe("Duplex Familial B");
    expect(byId.grand.name.ka).toBe("აუზისპირა სახლი");
    expect(byId.grand.name.en).toBe("Pool View House");
    expect(byId.grand.description.ar.length).toBeGreaterThan(20);
    expect(byId.grand.bestFor.es).toBe("5–6 amigos o una familia grande");
  });

  it("uses the same homepage, contact and location defaults as before", () => {
    expect(DEFAULT_CONTENT.home.hero.url).toBe(HOME_PHOTO_REFS.hero);
    expect(DEFAULT_CONTENT.home.services.stay.url).toBe(HOME_PHOTO_REFS.stay);
    expect(DEFAULT_CONTENT.home.stayTeaser.studio.url).toBe(HOME_PHOTO_REFS.cottageStudio);
    expect(DEFAULT_CONTENT.home.gallery.map(photo => photo.url)).toEqual([...HOME_GALLERY_REFS]);
    expect(DEFAULT_CONTENT.contact).toEqual({ ...CONTACT });
    expect(DEFAULT_CONTENT.location.lat).toBe(LOCATION.lat);
    expect(DEFAULT_CONTENT.location.lng).toBe(LOCATION.lng);
    expect(DEFAULT_CONTENT.location.address.ka).toContain("ქვილიშორი");
    expect(DEFAULT_CONTENT.texts).toEqual({});
  });
});

describe("pickLang", () => {
  it("falls back from the requested language to English and then Georgian", () => {
    const text = { ka: "ქართული", en: "", ru: "", ar: "", fr: "", es: "" };
    expect(pickLang(text, "ka")).toBe("ქართული");
    expect(pickLang(text, "fr")).toBe("ქართული");
    expect(pickLang({ ...text, en: "English" }, "fr")).toBe("English");
    expect(pickLang({ ...text, en: "English", fr: "Français" }, "fr")).toBe("Français");
    expect(pickLang(undefined, "en")).toBe("");
  });

  it("recognises section keys", () => {
    expect(isSectionKey("units")).toBe(true);
    expect(isSectionKey("menu")).toBe(false);
    expect(isSectionKey(42)).toBe(false);
  });
});

describe("content schemas", () => {
  const unit = DEFAULT_CONTENT.units.units[0];

  it("rejects impossible unit facts", () => {
    expect(unitSchema.safeParse({ ...unit, nightlyPrice: -5 }).success).toBe(false);
    expect(unitSchema.safeParse({ ...unit, nightlyPrice: 120.5 }).success).toBe(false);
    expect(unitSchema.safeParse({ ...unit, beds: 4, maxGuests: 2 }).success).toBe(false);
    expect(unitSchema.safeParse({ ...unit, gallery: [] }).success).toBe(false);
    expect(unitSchema.safeParse({ ...unit, name: { ...unit.name, ka: "" } }).success).toBe(false);
    expect(unitSchema.safeParse({ ...unit, id: "penthouse" }).success).toBe(false);
  });

  it("rejects duplicate unit ids", () => {
    const issues = sectionIssues("units", { units: [unit, unit] });
    expect(issues).not.toBeNull();
  });

  it("fills missing translations with empty strings", () => {
    const parsed = parseSection("units", {
      units: DEFAULT_CONTENT.units.units.map(candidate => ({ ...candidate, bestFor: { ka: "ორისთვის" } })),
    });
    expect(parsed?.units[0].bestFor).toEqual({ ka: "ორისთვის", en: "", ru: "", ar: "", fr: "", es: "" });
  });

  it("only accepts site-relative paths and public Blob URLs as images", () => {
    expect(isAllowedImageRef("/events/real-01.jpg")).toBe(true);
    expect(isAllowedImageRef("/manus-storage/garden-cottage-exterior.webp")).toBe(true);
    expect(isAllowedImageRef("https://ps7b45pmn65x45ur.public.blob.vercel-storage.com/sweet-village/uploads/2026/pool-a1b2c3.webp")).toBe(true);
    expect(isAllowedImageRef("http://ps7b45pmn65x45ur.public.blob.vercel-storage.com/x.webp")).toBe(false);
    expect(isAllowedImageRef("https://evil.example/x.webp")).toBe(false);
    expect(isAllowedImageRef("//evil.example/x.webp")).toBe(false);
    expect(isAllowedImageRef("/../secret")).toBe(false);
    expect(isAllowedImageRef("javascript:alert(1)")).toBe(false);
    expect(sectionIssues("home", { ...DEFAULT_CONTENT.home, hero: { url: "https://evil.example/x.webp" } })).not.toBeNull();
  });

  it("validates contact and location details", () => {
    expect(sectionIssues("contact", { ...DEFAULT_CONTENT.contact, phone: "599 63 96 14" })).not.toBeNull();
    expect(sectionIssues("contact", { ...DEFAULT_CONTENT.contact, email: "not-an-email" })).not.toBeNull();
    expect(sectionIssues("contact", { ...DEFAULT_CONTENT.contact, instagramUrl: "" })).toBeNull();
    expect(sectionIssues("location", { ...DEFAULT_CONTENT.location, lat: 10 })).not.toBeNull();
  });

  it("accepts locale patches but rejects prototype keys and excessive depth", () => {
    expect(sectionIssues("texts", { ka: { hero: { title: "ახალი სათაური" }, highlights: { items: [{ title: "x", body: "y" }] } } })).toBeNull();
    expect(sectionIssues("texts", JSON.parse('{"ka": {"__proto__": {"x": "y"}}}'))).not.toBeNull();
    expect(sectionIssues("texts", { de: { hero: { title: "x" } } })).not.toBeNull();
    let deep: Record<string, unknown> = { leaf: "x" };
    for (let i = 0; i < 9; i += 1) deep = { nested: deep };
    expect(sectionIssues("texts", { ka: deep })).not.toBeNull();
    expect(sectionIssues("texts", { ka: { hero: { title: 42 } } })).not.toBeNull();
  });
});
