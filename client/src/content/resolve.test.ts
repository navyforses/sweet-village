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
      about: { photos: {} },
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

  it("resolves pool, events, attractions and about photos", () => {
    const content = resolveContent(DEFAULT_CONTENT, {});
    const en = resolveVenue(content, "en");
    expect(en.pool.adult).toBe(20);
    expect(en.pool.photos.main).toContain("fb_pool_01");
    expect(en.events.events).toHaveLength(7);
    expect(en.events.events[0].title).toBe("Garden & hall wedding");
    expect(en.events.events[0].cover).toBe("/events/01-wedding.webp");
    expect(en.events.events[0].gallery[0].caption).toBe(en.events.events[0].experience);
    expect(en.events.events[0].highlights).toHaveLength(3);
    expect(en.events.hero).toBe("/events/00-events-overview.webp");
    expect(en.events.spacePhotos).toHaveLength(5);
    expect(en.attractions[0]).toMatchObject({ id: "prometheus", minutes: 2, title: "Prometheus Cave" });
    expect(en.about.photos.detail2).toContain("fb_misc_01");
  });

  it("resolves the menu per language, hides unavailable dishes and falls back to category photos", () => {
    const content = resolveContent(DEFAULT_CONTENT, {});
    const ar = resolveVenue(content, "ar");
    expect(ar.menu.categories).toHaveLength(9);
    expect(ar.menu.itemCount).toBe(68);
    expect(ar.menu.categories[0].name).toBe("الأطباق الباردة والمقبلات");
    expect(ar.menu.categories[0].items[0].searchText).toContain("pickled assortment");
    expect(ar.menu.categories[0].items[0].photo).toContain("menu-card-01");

    const [first, ...rest] = DEFAULT_CONTENT.menu.categories;
    const edited = {
      categories: [
        { ...first, items: first.items.map((item, index) => (index === 0 ? { ...item, hidden: true } : index === 1 ? { ...item, photo: undefined, price: 15.5 } : item)) },
        { ...rest[0], items: rest[0].items.map(item => ({ ...item, hidden: true })) },
        ...rest.slice(1),
      ],
    };
    const en = resolveVenue(resolveContent(DEFAULT_CONTENT, { menu: edited }), "en");
    expect(en.menu.categories).toHaveLength(8);
    expect(en.menu.categories.map(category => category.id)).not.toContain("salads");
    expect(en.menu.itemCount).toBe(68 - 1 - rest[0].items.length);
    expect(en.menu.categories[0].items[0].id).toBe(2);
    expect(en.menu.categories[0].items[0].price).toBe(15.5);
    expect(en.menu.categories[0].items[0].photo).toContain("dish_cheese");
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
