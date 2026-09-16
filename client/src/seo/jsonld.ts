import type { Lang } from "@shared/langs";
import { canonicalUrl, SITE_ORIGIN } from "@/i18n/paths";
import type { Venue, VenueEvent, VenueMenu, VenueUnit } from "@/content/resolve";
import { absoluteUrl } from "./meta";

type JsonLd = Record<string, unknown>;

const CONTEXT = "https://schema.org";
const LODGING_ID = `${SITE_ORIGIN}/#lodging`;
const RESTAURANT_ID = `${SITE_ORIGIN}/#restaurant`;

/** Third-party profiles that describe the same business (helps search engines connect the entity). */
export const SAME_AS = [
  "https://www.booking.com/hotel/ge/sweet-village.html",
  "https://www.tripadvisor.com/Restaurant_Review-g12569143-d23563325-Reviews-Sweet_Village-Tskaltubo_Kutaisi_Imereti_Region.html",
];

export interface BusinessInput {
  lang: Lang;
  name: string;
  description: string;
  venue: Venue;
}

function postalAddress(venue: Venue) {
  return {
    "@type": "PostalAddress",
    streetAddress: venue.location.address,
    addressLocality: "Kvilishori",
    addressRegion: "Imereti",
    addressCountry: "GE",
  };
}

function geo(venue: Venue) {
  return { "@type": "GeoCoordinates", latitude: venue.location.lat, longitude: venue.location.lng };
}

function socialLinks(venue: Venue) {
  return [venue.contact.instagramUrl, venue.contact.facebookUrl, ...SAME_AS].filter(Boolean);
}

/** The guesthouse itself: rendered on the home and about pages. */
export function lodgingBusiness({ lang, name, description, venue }: BusinessInput): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "LodgingBusiness",
    "@id": LODGING_ID,
    name,
    description,
    url: canonicalUrl(lang, "/"),
    image: [venue.home.hero, venue.home.services.stay, venue.home.services.pool].map(absoluteUrl),
    telephone: venue.contact.phone,
    email: venue.contact.email,
    address: postalAddress(venue),
    geo: geo(venue),
    hasMap: `https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}`,
    priceRange: "₾₾",
    currenciesAccepted: "GEL",
    numberOfRooms: venue.capacity.units,
    amenityFeature: ["Outdoor swimming pool", "Restaurant", "Free parking", "Free Wi-Fi", "Garden", "Event space"].map(value => ({
      "@type": "LocationFeatureSpecification",
      name: value,
      value: true,
    })),
    sameAs: socialLinks(venue),
  };
}

/** The site entity with its language editions (home page only). */
export function webSite(lang: Lang, name: string): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name,
    url: canonicalUrl(lang, "/"),
    inLanguage: ["ka", "en", "ru", "ar", "fr", "es"],
    publisher: { "@id": LODGING_ID },
  };
}

/** The restaurant with its full menu (menu page). */
export function restaurantWithMenu(input: BusinessInput & { menu: VenueMenu; menuName: string }): JsonLd {
  const { lang, name, description, venue, menu, menuName } = input;
  return {
    "@context": CONTEXT,
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name,
    description,
    url: canonicalUrl(lang, "/menu"),
    image: [absoluteUrl(venue.home.services.restaurant)],
    telephone: venue.contact.phone,
    address: postalAddress(venue),
    geo: geo(venue),
    servesCuisine: "Georgian",
    priceRange: "₾",
    currenciesAccepted: "GEL",
    parentOrganization: { "@id": LODGING_ID },
    hasMenu: {
      "@type": "Menu",
      name: menuName,
      url: canonicalUrl(lang, "/menu"),
      hasMenuSection: menu.categories.map(category => ({
        "@type": "MenuSection",
        name: category.name,
        hasMenuItem: category.items.map(item => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          image: absoluteUrl(item.photo),
          offers: { "@type": "Offer", price: item.price, priceCurrency: "GEL" },
        })),
      })),
    },
  };
}

/** One cottage or room (accommodation detail page). */
export function accommodationUnit(lang: Lang, unit: VenueUnit, perNightLabel: string): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "Accommodation",
    "@id": `${canonicalUrl(lang, `/stay/${unit.id}`)}#unit`,
    name: unit.title,
    description: unit.body,
    url: canonicalUrl(lang, `/stay/${unit.id}`),
    image: unit.gallery.map(photo => absoluteUrl(photo.url)),
    occupancy: { "@type": "QuantitativeValue", maxValue: unit.maxGuests, unitText: "guests" },
    numberOfBedrooms: unit.beds,
    floorLevel: String(unit.floors),
    containedInPlace: { "@id": LODGING_ID },
    offers: {
      "@type": "Offer",
      price: unit.nightlyPrice,
      priceCurrency: "GEL",
      description: perNightLabel,
      availability: "https://schema.org/InStock",
      url: canonicalUrl(lang, `/booking?interest=cottage&unit=${unit.id}`),
    },
  };
}

/** The covered garden venue (events pages). */
export function eventVenue(input: BusinessInput & { maxGuests: number; events: VenueEvent[] }): JsonLd {
  const { lang, name, description, venue, maxGuests, events } = input;
  return {
    "@context": CONTEXT,
    "@type": "EventVenue",
    "@id": `${SITE_ORIGIN}/#venue`,
    name,
    description,
    url: canonicalUrl(lang, "/events"),
    image: [absoluteUrl(venue.events.hero), ...venue.events.spacePhotos.slice(0, 3).map(absoluteUrl)],
    telephone: venue.contact.phone,
    address: postalAddress(venue),
    geo: geo(venue),
    maximumAttendeeCapacity: maxGuests,
    containedInPlace: { "@id": LODGING_ID },
    makesOffer: events.map(event => ({
      "@type": "Offer",
      name: event.title,
      description: event.experience,
      url: canonicalUrl(lang, `/events/${event.id}`),
      eligibleQuantity: { "@type": "QuantitativeValue", minValue: event.minGuests, maxValue: event.maxGuests, unitText: "guests" },
    })),
  };
}

export function breadcrumbs(lang: Lang, items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(lang, item.path),
    })),
  };
}

export function faqPage(items: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
