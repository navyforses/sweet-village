/**
 * Owner-editable site content: types, section keys and the compile-time
 * defaults. The public site renders `DEFAULT_CONTENT` on first paint and
 * overlays whatever the owner saved through the admin panel (`GET
 * /api/content` returns only the saved sections). Keep this module free of
 * zod and client-only imports: it is bundled into the public site and loaded
 * by every Vercel function. Validation lives in `./contentSchema.ts`.
 */
import { ATTRACTION_COPY } from "./attractionCopy";
import { EVENT_CAPTION_CONCEPT, EVENT_CAPTION_REAL, EVENT_COPY } from "./eventCopy";
import { ADDRESS_COPY, UNIT_COPY, defaultUnitCaptions } from "./unitCopy";
import { ATTRACTIONS, CONTACT, EVENT_TYPES, LOCATION, POOL, UNITS, type EventId, type UnitId } from "./venue";
import { EVENTS_PAGE_HERO, EVENTS_SPACE_PHOTO_REFS, HOME_GALLERY_REFS, HOME_PHOTO_REFS, RAW_PHOTOS } from "./venuePhotos";
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

export interface PoolSection {
  /** Day-visit prices in GEL. */
  adult: number;
  child: number;
  childMaxAge: number;
  guestFree: boolean;
  dailyLimit: number;
  /** "HH:MM" */
  openFrom: string;
  openTo: string;
  /** Month numbers 1-12. */
  seasonFrom: number;
  seasonTo: number;
  provisional: boolean;
  photos: { main: Photo; side1: Photo; side2: Photo };
}

export interface EventContent {
  id: EventId;
  minGuests: number;
  maxGuests: number;
  title: LocalizedText;
  body: LocalizedText;
  /** One-line summary shown next to the guest range and on the cover photo. */
  experience: LocalizedText;
  highlights: LocalizedText[];
  /** `gallery[0]` is the card photo. */
  gallery: Photo[];
}

export interface EventsSection {
  /** Hero of the events overview page. */
  hero: Photo;
  /** "Real space" strip on the overview page. */
  spacePhotos: Photo[];
  events: EventContent[];
}

export interface AttractionContent {
  id: string;
  minutes: number;
  km: number;
  lat: number;
  lng: number;
  title: LocalizedText;
  note: LocalizedText;
}

export interface AttractionsSection {
  /** Ordered by driving time; the first entry is highlighted on the About page. */
  attractions: AttractionContent[];
}

export interface AboutSection {
  photos: { main: Photo; detail1: Photo; detail2: Photo };
}

/** Deep-partial patch over a locale dictionary (string leaves, arrays, nested objects). */
export type LocalePatch = { [key: string]: string | LocalePatch | Array<string | LocalePatch> };

export type TextsSection = Partial<Record<Lang, LocalePatch>>;

export interface SiteContent {
  units: UnitsSection;
  home: HomeSection;
  contact: ContactSection;
  location: LocationSection;
  pool: PoolSection;
  events: EventsSection;
  attractions: AttractionsSection;
  about: AboutSection;
  texts: TextsSection;
}

export type SectionKey = keyof SiteContent;
export const SECTION_KEYS = ["units", "home", "contact", "location", "pool", "events", "attractions", "about", "texts"] as const satisfies readonly SectionKey[];

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

/** Default galleries mix a few generated concept renders with real venue photos; captions say which is which. */
function defaultEventGallery(id: EventId, gallery: readonly string[]): Photo[] {
  const conceptCount = id === "poolside" ? 4 : 2;
  const experience = EVENT_COPY[id].experience;
  return gallery.map((url, index) => {
    if (index === 0) return photo(url, experience);
    const label = index < conceptCount ? EVENT_CAPTION_CONCEPT : EVENT_CAPTION_REAL;
    const caption = Object.fromEntries(Object.entries(label).map(([lang, text]) => [lang, `${text} · ${index + 1}`])) as LocalizedText;
    return photo(url, caption);
  });
}

function defaultEvents(): EventContent[] {
  return EVENT_TYPES.map(event => {
    const copy = EVENT_COPY[event.id];
    return {
      id: event.id,
      minGuests: event.minGuests,
      maxGuests: event.maxGuests,
      title: copy.title,
      body: copy.body,
      experience: copy.experience,
      highlights: [...copy.highlights],
      gallery: defaultEventGallery(event.id, event.gallery),
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
  pool: {
    adult: POOL.adult,
    child: POOL.child,
    childMaxAge: POOL.childMaxAge,
    guestFree: POOL.guestFree,
    dailyLimit: POOL.dailyLimit,
    openFrom: POOL.openFrom,
    openTo: POOL.openTo,
    seasonFrom: POOL.seasonFrom,
    seasonTo: POOL.seasonTo,
    provisional: POOL.provisional,
    photos: { main: photo(RAW_PHOTOS.poolReal), side1: photo(RAW_PHOTOS.poolDay), side2: photo(RAW_PHOTOS.terrace) },
  },
  events: {
    hero: photo(EVENTS_PAGE_HERO),
    spacePhotos: EVENTS_SPACE_PHOTO_REFS.map(url => photo(url)),
    events: defaultEvents(),
  },
  attractions: {
    attractions: ATTRACTIONS.map(attraction => ({
      id: attraction.id,
      minutes: attraction.minutes,
      km: attraction.km,
      lat: attraction.lat,
      lng: attraction.lng,
      title: ATTRACTION_COPY[attraction.id].title,
      note: ATTRACTION_COPY[attraction.id].note,
    })),
  },
  about: {
    photos: { main: photo(RAW_PHOTOS.terrace), detail1: photo(RAW_PHOTOS.roomDetail), detail2: photo(RAW_PHOTOS.banquet) },
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
