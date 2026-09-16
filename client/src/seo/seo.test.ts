import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT } from "@shared/content";
import { resolveContent, resolveVenue } from "@/content/resolve";
import { accommodationUnit, breadcrumbs, eventVenue, lodgingBusiness, restaurantWithMenu, webSite } from "./jsonld";
import { absoluteUrl, pageMeta, truncate } from "./meta";

const venue = resolveVenue(resolveContent(DEFAULT_CONTENT, {}), "en");

describe("page meta", () => {
  it("emits canonical, six hreflang alternates plus x-default and Open Graph fields", () => {
    const meta = pageMeta({ lang: "en", path: "/stay", title: "Stay", description: "Five units." });
    expect(meta.canonical).toBe("https://www.sweet-village.com/en/stay");
    expect(meta.alternates.map(item => item.hrefLang)).toEqual(["ka", "en", "ru", "ar", "fr", "es", "x-default"]);
    expect(meta.alternates.find(item => item.hrefLang === "x-default")?.href).toBe("https://www.sweet-village.com/stay");
    expect(meta.alternates.find(item => item.hrefLang === "ar")?.href).toBe("https://www.sweet-village.com/ar/stay");
    expect(meta.image).toBe("https://www.sweet-village.com/og/default.png");
    expect(meta.locale).toBe("en_US");
    expect(meta.alternateLocales).not.toContain("en_US");
    expect(meta.robots).toBeNull();
    expect(pageMeta({ lang: "ka", path: "/404", title: "x", description: "y", noindex: true }).robots).toBe("noindex, nofollow");
  });

  it("resolves images to absolute URLs and shortens long descriptions", () => {
    expect(absoluteUrl("/manus-storage/a.jpg")).toBe("https://www.sweet-village.com/manus-storage/a.jpg");
    expect(absoluteUrl("https://x.public.blob.vercel-storage.com/a.jpg")).toBe("https://x.public.blob.vercel-storage.com/a.jpg");
    const long = "First sentence of the description. ".repeat(10);
    const short = truncate(long);
    expect(short.length).toBeLessThanOrEqual(156);
    expect(short.endsWith("…")).toBe(true);
    expect(truncate("  short   text ")).toBe("short text");
  });
});

describe("structured data", () => {
  it("describes the guesthouse with address, geo and contact details", () => {
    const data = lodgingBusiness({ lang: "en", name: "Sweet Village", description: "Cottages", venue });
    expect(data["@type"]).toBe("LodgingBusiness");
    expect(data.url).toBe("https://www.sweet-village.com/en");
    expect(data.address).toMatchObject({ "@type": "PostalAddress", addressCountry: "GE", addressRegion: "Imereti" });
    expect(data.geo).toMatchObject({ latitude: venue.location.lat, longitude: venue.location.lng });
    expect(data.telephone).toBe(venue.contact.phone);
    expect((data.image as string[])[0]).toMatch(/^https:\/\//);
    expect(data.sameAs).toEqual(expect.arrayContaining([venue.contact.instagramUrl]));
    expect(webSite("ka", "ტკბილი სოფელი")).toMatchObject({ "@type": "WebSite", url: "https://www.sweet-village.com/" });
  });

  it("publishes the whole menu with GEL prices", () => {
    const data = restaurantWithMenu({ lang: "ka", name: "R", description: "D", venue, menu: venue.menu, menuName: "მენიუ" });
    const sections = (data.hasMenu as { hasMenuSection: { hasMenuItem: { offers: { price: number; priceCurrency: string } }[] }[] }).hasMenuSection;
    expect(sections).toHaveLength(9);
    expect(sections.flatMap(section => section.hasMenuItem)).toHaveLength(68);
    expect(sections[0].hasMenuItem[0].offers).toEqual({ "@type": "Offer", price: 8, priceCurrency: "GEL" });
  });

  it("describes units, the event venue and breadcrumbs per language", () => {
    const unit = accommodationUnit("fr", venue.units[4], "150 ₾ / nuit");
    expect(unit.url).toBe("https://www.sweet-village.com/fr/stay/grand");
    expect(unit.occupancy).toMatchObject({ maxValue: venue.units[4].maxGuests });
    expect(unit.offers).toMatchObject({ priceCurrency: "GEL", price: venue.units[4].nightlyPrice });

    const events = eventVenue({ lang: "ru", name: "E", description: "D", venue, maxGuests: 120, events: venue.events.events });
    expect(events.maximumAttendeeCapacity).toBe(120);
    expect((events.makesOffer as { url: string }[])[0].url).toBe("https://www.sweet-village.com/ru/events/wedding");

    const crumbs = breadcrumbs("es", [{ name: "Inicio", path: "/" }, { name: "Piscina", path: "/pool" }]);
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.sweet-village.com/es" },
      { "@type": "ListItem", position: 2, name: "Piscina", item: "https://www.sweet-village.com/es/pool" },
    ]);
  });
});
