import { describe, expect, it } from "vitest";
import { capacityOf, DEFAULT_CONTENT, isSectionKey, nextMenuItemId, pickLang, SECTION_KEYS, visibleMenuItemCount } from "./content";
import { isAllowedImageRef, parseSection, SECTION_SCHEMAS, sectionIssues, unitSchema } from "./contentSchema";
import { ATTRACTIONS, CAPACITY, CONTACT, EVENT_TYPES, LOCATION, POOL, UNITS } from "./venue";
import { MENU, MENU_ITEM_COUNT } from "./menuData";
import { EN_RU_DESCRIPTIONS } from "./menuDescriptions";
import { CATEGORY_TRANSLATIONS, ITEM_TRANSLATIONS } from "./menuTranslations";
import { HOME_GALLERY_REFS, HOME_PHOTO_REFS, RAW_MENU_ITEM_PHOTOS } from "./venuePhotos";

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

describe("phase 2 defaults", () => {
  it("mirrors pool, events and attractions from the compiled constants", () => {
    const { pool, events, attractions, about } = DEFAULT_CONTENT;
    expect(pool).toMatchObject({ adult: POOL.adult, child: POOL.child, dailyLimit: POOL.dailyLimit, openFrom: POOL.openFrom, openTo: POOL.openTo, provisional: POOL.provisional });
    expect(events.events.map(event => event.id)).toEqual(EVENT_TYPES.map(event => event.id));
    for (const [index, event] of events.events.entries()) {
      expect(event.gallery.map(photo => photo.url)).toEqual([...EVENT_TYPES[index].gallery]);
      expect(event.gallery[0].url).toBe(EVENT_TYPES[index].photo);
      expect(event.minGuests).toBe(EVENT_TYPES[index].minGuests);
      expect(event.highlights).toHaveLength(3);
      expect(event.gallery.every(photo => photo.caption?.ka && photo.caption.es)).toBe(true);
    }
    expect(events.events.find(event => event.id === "masterclass")?.title.ka).toBe("კულინარიული მასტერკლასი");
    expect(events.hero.url).toBe("/events/00-events-overview.webp");
    expect(events.spacePhotos).toHaveLength(5);
    expect(attractions.attractions.map(item => [item.id, item.minutes])).toEqual(ATTRACTIONS.map(item => [item.id, item.minutes]));
    expect(attractions.attractions[0].title.en).toBe("Prometheus Cave");
    expect(about.photos.main.url).toContain("fb_outdoor_01");
  });

  it("rejects impossible pool, event and attraction facts", () => {
    const { pool, events, attractions } = DEFAULT_CONTENT;
    expect(sectionIssues("pool", { ...pool, child: pool.adult + 1 })).not.toBeNull();
    expect(sectionIssues("pool", { ...pool, openFrom: "25:00" })).not.toBeNull();
    expect(sectionIssues("pool", { ...pool, seasonTo: 13 })).not.toBeNull();
    const [first, ...rest] = events.events;
    expect(sectionIssues("events", { ...events, events: [{ ...first, maxGuests: first.minGuests - 1 }, ...rest] })).not.toBeNull();
    expect(sectionIssues("events", { ...events, events: [{ ...first, highlights: first.highlights.slice(0, 2) }, ...rest] })).not.toBeNull();
    expect(sectionIssues("events", { ...events, events: [first, first] })).not.toBeNull();
    expect(sectionIssues("attractions", { attractions: attractions.attractions.map(item => ({ ...item, lat: 10 })) })).not.toBeNull();
    expect(sectionIssues("attractions", { attractions: [] })).not.toBeNull();
  });
});

describe("phase 3 defaults", () => {
  it("folds the printed menu, translations, descriptions and photos into one object per dish", () => {
    const { menu } = DEFAULT_CONTENT;
    expect(menu.categories.map(category => category.id)).toEqual(MENU.map(category => category.id));
    expect(visibleMenuItemCount(menu)).toBe(MENU_ITEM_COUNT);
    expect(nextMenuItemId(menu)).toBe(69);
    for (const [index, category] of menu.categories.entries()) {
      const source = MENU[index];
      expect(category.name).toEqual({ ka: source.ka, en: source.en, ru: source.ru, ...CATEGORY_TRANSLATIONS[source.id] });
      expect(category.items.map(item => item.id)).toEqual(source.items.map(item => item.id));
      for (const [itemIndex, item] of category.items.entries()) {
        const printed = source.items[itemIndex];
        expect(item.name.ka).toBe(printed.ka);
        expect(item.name.en).toBe(printed.en);
        expect(item.name.ru).toBe(printed.ru);
        expect(item.name.ar).toBe(ITEM_TRANSLATIONS[printed.id].ar.name);
        expect(item.name.fr).toBe(ITEM_TRANSLATIONS[printed.id].fr.name);
        expect(item.description.ka).toBe(printed.descKa ?? "");
        expect(item.description.en).toBe(EN_RU_DESCRIPTIONS[printed.id].en);
        expect(item.description.es).toBe(ITEM_TRANSLATIONS[printed.id].es.desc);
        expect(item.price).toBe(printed.price);
        expect(item.volume).toBe(printed.volume ?? "");
        expect(item.photo?.url).toBe(RAW_MENU_ITEM_PHOTOS[printed.id]);
        expect(item.hidden).toBe(false);
      }
    }
    const water = menu.categories.find(category => category.id === "soft")?.items.find(item => item.id === 65);
    expect(water?.volume).toBe("1.0 L");
  });

  it("rejects impossible menu facts", () => {
    const { menu } = DEFAULT_CONTENT;
    const [first, second, ...rest] = menu.categories;
    const dish = first.items[0];
    expect(sectionIssues("menu", { categories: [{ ...first, items: [{ ...dish, price: -1 }, ...first.items.slice(1)] }, second, ...rest] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [{ ...first, items: [{ ...dish, price: 7.125 }, ...first.items.slice(1)] }, second, ...rest] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [{ ...first, items: [{ ...dish, price: 7.5 }, ...first.items.slice(1)] }, second, ...rest] })).toBeNull();
    expect(sectionIssues("menu", { categories: [{ ...first, items: [{ ...dish, name: { ...dish.name, ka: "" } }, ...first.items.slice(1)] }, second, ...rest] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [first, { ...second, items: [dish, ...second.items] }, ...rest] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [first, first, ...rest] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [{ ...first, id: "Cold Dishes" }, second, ...rest] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [] })).not.toBeNull();
    expect(sectionIssues("menu", { categories: [{ ...first, items: [{ ...dish, photo: { url: "https://evil.example/x.jpg" } }] }] })).not.toBeNull();
    const withoutPhoto = { ...dish, description: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" }, hidden: true };
    delete (withoutPhoto as { photo?: unknown }).photo;
    expect(sectionIssues("menu", { categories: [{ ...first, items: [withoutPhoto] }] })).toBeNull();
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
    expect(isSectionKey("menu")).toBe(true);
    expect(isSectionKey("bookings")).toBe(false);
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
    // zod drops prototype keys from the parsed value instead of reporting them; either way nothing pollutes prototypes.
    const parsed = parseSection("texts", JSON.parse('{"ka": {"__proto__": {"x": "y"}, "hero": {"title": "t"}}}'));
    expect(parsed && Object.prototype.hasOwnProperty.call(parsed.ka, "__proto__")).toBe(false);
    expect(parsed?.ka).toEqual({ hero: { title: "t" } });
    expect(sectionIssues("texts", { de: { hero: { title: "x" } } })).not.toBeNull();
    let deep: Record<string, unknown> = { leaf: "x" };
    for (let i = 0; i < 9; i += 1) deep = { nested: deep };
    expect(sectionIssues("texts", { ka: deep })).not.toBeNull();
    expect(sectionIssues("texts", { ka: { hero: { title: 42 } } })).not.toBeNull();
  });
});
