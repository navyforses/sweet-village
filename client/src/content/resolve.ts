/**
 * Pure helpers that turn the sparse API payload into render-ready data. Kept
 * free of React so they can be unit-tested in node.
 */
import {
  capacityOf,
  pickLang,
  SECTION_KEYS,
  type ContactSection,
  type Lang,
  type Photo,
  type SiteContent,
  type SparseContent,
  type TextsSection,
  type UnitContent,
} from "@shared/content";
import { deepMerge, isRecord } from "@shared/deepMerge";
import type { UnitId } from "@shared/venue";
import { assetUrl } from "@/lib/assetUrl";

const isPhoto = (value: unknown): value is Photo => isRecord(value) && typeof value.url === "string" && value.url.length > 0;

/**
 * Drops sections whose shape is not what this build expects (an older
 * localStorage snapshot, a hand-edited row). This is a structural guard, not
 * validation — the API validates with zod before anything is stored.
 */
export function sanitizeSparse(input: unknown): SparseContent {
  if (!isRecord(input)) return {};
  const out: Record<string, unknown> = {};
  const units = input.units;
  if (
    isRecord(units) &&
    Array.isArray(units.units) &&
    units.units.length > 0 &&
    units.units.every(
      unit =>
        isRecord(unit) &&
        typeof unit.id === "string" &&
        isRecord(unit.name) &&
        typeof unit.nightlyPrice === "number" &&
        Array.isArray(unit.gallery) &&
        unit.gallery.length > 0 &&
        unit.gallery.every(isPhoto),
    )
  ) {
    out.units = units;
  }
  const home = input.home;
  if (
    isRecord(home) &&
    isPhoto(home.hero) &&
    isRecord(home.services) &&
    ["events", "pool", "restaurant", "stay"].every(key => isPhoto((home.services as Record<string, unknown>)[key])) &&
    isRecord(home.stayTeaser) &&
    ["exterior", "bedroom", "studio"].every(key => isPhoto((home.stayTeaser as Record<string, unknown>)[key])) &&
    Array.isArray(home.gallery) &&
    home.gallery.length > 0 &&
    home.gallery.every(isPhoto)
  ) {
    out.home = home;
  }
  const contact = input.contact;
  if (isRecord(contact) && typeof contact.phone === "string" && typeof contact.whatsapp === "string" && typeof contact.email === "string") {
    out.contact = contact;
  }
  const location = input.location;
  if (isRecord(location) && typeof location.lat === "number" && typeof location.lng === "number" && isRecord(location.address)) {
    out.location = location;
  }
  const texts = input.texts;
  if (isRecord(texts)) out.texts = texts;
  return out as SparseContent;
}

/** Saved sections replace the defaults wholesale; only `texts` is merged per language. */
export function resolveContent(defaults: SiteContent, sparse: SparseContent): SiteContent {
  const texts: TextsSection = { ...defaults.texts };
  for (const [lang, patch] of Object.entries(sparse.texts ?? {})) {
    if (!isRecord(patch)) continue;
    const base = texts[lang as Lang];
    texts[lang as Lang] = base ? deepMerge(base, patch) : patch;
  }
  const resolved: SiteContent = {
    units: sparse.units ?? defaults.units,
    home: sparse.home ?? defaults.home,
    contact: sparse.contact ?? defaults.contact,
    location: sparse.location ?? defaults.location,
    texts,
  };
  for (const key of SECTION_KEYS) {
    if (!(key in resolved)) throw new Error(`Unresolved content section ${key}`);
  }
  return resolved;
}

export interface VenuePhoto {
  url: string;
  /** Resolved for the current language; "" when the owner left it empty. */
  caption: string;
}

export interface VenueUnit {
  id: UnitId;
  title: string;
  body: string;
  bestFor: string;
  beds: number;
  maxGuests: number;
  floors: number;
  nightlyPrice: number;
  cover: string;
  gallery: VenuePhoto[];
}

export interface Venue {
  lang: Lang;
  units: VenueUnit[];
  capacity: { units: number; beds: number; maxGuests: number };
  contact: ContactSection;
  location: { lat: number; lng: number; address: string };
  home: {
    hero: string;
    services: { events: string; pool: string; restaurant: string; stay: string };
    stayTeaser: { exterior: string; bedroom: string; studio: string };
    gallery: string[];
  };
}

const resolvePhoto = (photo: Photo, lang: Lang): VenuePhoto => ({ url: assetUrl(photo.url), caption: pickLang(photo.caption, lang) });

function resolveUnit(unit: UnitContent, lang: Lang): VenueUnit {
  const gallery = unit.gallery.map(photo => resolvePhoto(photo, lang));
  return {
    id: unit.id,
    title: pickLang(unit.name, lang),
    body: pickLang(unit.description, lang),
    bestFor: pickLang(unit.bestFor, lang),
    beds: unit.beds,
    maxGuests: unit.maxGuests,
    floors: unit.floors,
    nightlyPrice: unit.nightlyPrice,
    cover: gallery[0]?.url ?? "",
    gallery,
  };
}

/** Language-resolved view of the content, with every image ref turned into a browser URL. */
export function resolveVenue(content: SiteContent, lang: Lang): Venue {
  const units = content.units.units.map(unit => resolveUnit(unit, lang));
  const { home, location } = content;
  return {
    lang,
    units,
    capacity: capacityOf(units),
    contact: content.contact,
    location: { lat: location.lat, lng: location.lng, address: pickLang(location.address, lang) },
    home: {
      hero: assetUrl(home.hero.url),
      services: {
        events: assetUrl(home.services.events.url),
        pool: assetUrl(home.services.pool.url),
        restaurant: assetUrl(home.services.restaurant.url),
        stay: assetUrl(home.services.stay.url),
      },
      stayTeaser: {
        exterior: assetUrl(home.stayTeaser.exterior.url),
        bedroom: assetUrl(home.stayTeaser.bedroom.url),
        studio: assetUrl(home.stayTeaser.studio.url),
      },
      gallery: home.gallery.map(photo => assetUrl(photo.url)),
    },
  };
}
