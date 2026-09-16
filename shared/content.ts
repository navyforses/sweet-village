/**
 * Owner-editable site content: types, section keys and the compile-time
 * defaults. The public site renders `DEFAULT_CONTENT` on first paint and
 * overlays whatever the owner saved through the admin panel (`GET
 * /api/content` returns only the saved sections). Keep this module free of
 * zod and client-only imports: it is bundled into the public site and loaded
 * by every Vercel function. Validation lives in `./contentSchema.ts`.
 */
import { ADDRESS_COPY, UNIT_COPY, defaultUnitCaptions } from "./unitCopy";
import { CONTACT, LOCATION, UNITS, type UnitId } from "./venue";
import { HOME_GALLERY_REFS, HOME_PHOTO_REFS } from "./venuePhotos";
import type { Lang, LocalizedText } from "./langs";

export type { Lang, LocalizedText } from "./langs";
export { pickLang } from "./langs";

/** A photo reference plus an optional caption per language. */
export interface Photo {
  url: string;
  caption?: Partial<LocalizedText>;
}

export interface UnitContent {
  id: UnitId;
  name: LocalizedText;
  description: LocalizedText;
  /** Short "best for" line shown on the stay cards. */
  bestFor: LocalizedText;
  beds: number;
  maxGuests: number;
  floors: number;
  /** Owner-confirmed price in GEL per night. */
  nightlyPrice: number;
  /** `gallery[0]` is the cover photo. */
  gallery: Photo[];
}

export interface UnitsSection {
  units: UnitContent[];
}

export interface HomeSection {
  hero: Photo;
  services: { events: Photo; pool: Photo; restaurant: Photo; stay: Photo };
  stayTeaser: { exterior: Photo; bedroom: Photo; studio: Photo };
  gallery: Photo[];
}

export interface ContactSection {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface LocationSection {
  lat: number;
  lng: number;
  address: LocalizedText;
}

/** Deep-partial patch over a locale dictionary (string leaves, arrays, nested objects). */
export type LocalePatch = { [key: string]: string | LocalePatch | Array<string | LocalePatch> };

export type TextsSection = Partial<Record<Lang, LocalePatch>>;

export interface SiteContent {
  units: UnitsSection;
  home: HomeSection;
  contact: ContactSection;
  location: LocationSection;
  texts: TextsSection;
}

export type SectionKey = keyof SiteContent;
export const SECTION_KEYS = ["units", "home", "contact", "location", "texts"] as const satisfies readonly SectionKey[];

export function isSectionKey(value: unknown): value is SectionKey {
  return typeof value === "string" && (SECTION_KEYS as readonly string[]).includes(value);
}

/** What `GET /api/content` returns: only the sections the owner has saved. */
export type SparseContent = Partial<SiteContent>;

export interface ContentResponse {
  updatedAt: string | null;
  sections: SparseContent;
}

const photo = (url: string, caption?: LocalizedText): Photo => (caption ? { url, caption } : { url });

function defaultUnits(): UnitContent[] {
  return UNITS.map(unit => {
    const copy = UNIT_COPY[unit.id];
    const captions = defaultUnitCaptions(unit.id);
    return {
      id: unit.id,
      name: copy.name,
      description: copy.description,
      bestFor: copy.bestFor,
      beds: unit.beds,
      maxGuests: unit.maxGuests,
      floors: unit.floors,
      nightlyPrice: unit.nightlyPrice,
      gallery: unit.gallery.map((url, index) => photo(url, captions[index])),
    };
  });
}

export const DEFAULT_CONTENT: SiteContent = {
  units: { units: defaultUnits() },
  home: {
    hero: photo(HOME_PHOTO_REFS.hero),
    services: {
      events: photo(HOME_PHOTO_REFS.events),
      pool: photo(HOME_PHOTO_REFS.pool),
      restaurant: photo(HOME_PHOTO_REFS.restaurant),
      stay: photo(HOME_PHOTO_REFS.stay),
    },
    stayTeaser: {
      exterior: photo(HOME_PHOTO_REFS.cottageExterior),
      bedroom: photo(HOME_PHOTO_REFS.cottageBedroom),
      studio: photo(HOME_PHOTO_REFS.cottageStudio),
    },
    gallery: HOME_GALLERY_REFS.map(url => photo(url)),
  },
  contact: {
    phone: CONTACT.phone,
    phoneDisplay: CONTACT.phoneDisplay,
    whatsapp: CONTACT.whatsapp,
    email: CONTACT.email,
    instagram: CONTACT.instagram,
    instagramUrl: CONTACT.instagramUrl,
    facebookUrl: CONTACT.facebookUrl,
  },
  location: {
    lat: LOCATION.lat,
    lng: LOCATION.lng,
    address: ADDRESS_COPY,
  },
  texts: {},
};

/** Capacity totals derived the same way as `CAPACITY` in shared/venue.ts. */
export function capacityOf(units: readonly Pick<UnitContent, "beds" | "maxGuests">[]) {
  return {
    units: units.length,
    beds: units.reduce((n, u) => n + u.beds, 0),
    maxGuests: units.reduce((n, u) => n + u.maxGuests, 0),
  };
}

/** Section keys plus the Phase 2/3 keys the client should tolerate without failing. */
export function pickKnownSections(sections: Record<string, unknown>): SparseContent {
  const known: Record<string, unknown> = {};
  for (const key of SECTION_KEYS) {
    if (key in sections && sections[key] !== undefined) known[key] = sections[key];
  }
  return known as SparseContent;
}
