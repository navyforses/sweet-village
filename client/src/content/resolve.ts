/**
 * Pure helpers that turn the sparse API payload into render-ready data. Kept
 * free of React so they can be unit-tested in node.
 */
import {
  capacityOf,
  guideAvailableIn,
  guideLangs,
  isGuideBodyPending,
  pickLang,
  SECTION_KEYS,
  type AboutSection,
  type AttractionContent,
  type ContactSection,
  type EventContent,
  type GuidePost,
  type Lang,
  type MenuCategoryContent,
  type MenuItemContent,
  type MenuSection,
  type Photo,
  type PoolSection,
  type SiteContent,
  type SparseContent,
  type TextsSection,
  type UnitContent,
} from "@shared/content";
import { deepMerge, isRecord } from "@shared/deepMerge";
import { LANGS } from "@shared/langs";
import type { EventId, UnitId } from "@shared/venue";
import { RAW_DISHES, RAW_PHOTOS } from "@shared/venuePhotos";
import { assetUrl } from "@/lib/assetUrl";

const isPhoto = (value: unknown): value is Photo => isRecord(value) && typeof value.url === "string" && value.url.length > 0;
const hasPhotos = (value: unknown, keys: string[]) => isRecord(value) && keys.every(key => isPhoto(value[key]));
const isPhotoList = (value: unknown): value is Photo[] => Array.isArray(value) && value.length > 0 && value.every(isPhoto);

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
      unit => isRecord(unit) && typeof unit.id === "string" && isRecord(unit.name) && typeof unit.nightlyPrice === "number" && isPhotoList(unit.gallery),
    )
  ) {
    out.units = units;
  }
  const home = input.home;
  if (
    isRecord(home) &&
    isPhoto(home.hero) &&
    hasPhotos(home.services, ["events", "pool", "restaurant", "stay"]) &&
    hasPhotos(home.stayTeaser, ["exterior", "bedroom", "studio"]) &&
    isPhotoList(home.gallery)
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
  const pool = input.pool;
  if (
    isRecord(pool) &&
    typeof pool.adult === "number" &&
    typeof pool.child === "number" &&
    typeof pool.dailyLimit === "number" &&
    typeof pool.openFrom === "string" &&
    hasPhotos(pool.photos, ["main", "side1", "side2"])
  ) {
    out.pool = pool;
  }
  const events = input.events;
  if (
    isRecord(events) &&
    isPhoto(events.hero) &&
    isPhotoList(events.spacePhotos) &&
    Array.isArray(events.events) &&
    events.events.length > 0 &&
    events.events.every(
      event =>
        isRecord(event) &&
        typeof event.id === "string" &&
        isRecord(event.title) &&
        typeof event.minGuests === "number" &&
        Array.isArray(event.highlights) &&
        isPhotoList(event.gallery),
    )
  ) {
    out.events = events;
  }
  const attractions = input.attractions;
  if (
    isRecord(attractions) &&
    Array.isArray(attractions.attractions) &&
    attractions.attractions.length > 0 &&
    attractions.attractions.every(
      item => isRecord(item) && typeof item.id === "string" && typeof item.minutes === "number" && typeof item.lat === "number" && isRecord(item.title),
    )
  ) {
    out.attractions = attractions;
  }
  const about = input.about;
  if (isRecord(about) && hasPhotos(about.photos, ["main", "detail1", "detail2"])) out.about = about;
  const menu = input.menu;
  if (
    isRecord(menu) &&
    Array.isArray(menu.categories) &&
    menu.categories.length > 0 &&
    menu.categories.every(
      category =>
        isRecord(category) &&
        typeof category.id === "string" &&
        isRecord(category.name) &&
        Array.isArray(category.items) &&
        category.items.every(item => isRecord(item) && typeof item.id === "number" && isRecord(item.name) && typeof item.price === "number"),
    )
  ) {
    out.menu = menu;
  }
  const guides = input.guides;
  if (
    isRecord(guides) &&
    Array.isArray(guides.posts) &&
    guides.posts.every(post => isRecord(post) && typeof post.slug === "string" && isRecord(post.title) && isPhoto(post.cover) && typeof post.publishedAt === "string")
  ) {
    out.guides = guides;
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
    pool: sparse.pool ?? defaults.pool,
    events: sparse.events ?? defaults.events,
    attractions: sparse.attractions ?? defaults.attractions,
    about: sparse.about ?? defaults.about,
    menu: sparse.menu ?? defaults.menu,
    guides: sparse.guides ?? defaults.guides,
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

export interface VenueEvent {
  id: EventId;
  minGuests: number;
  maxGuests: number;
  title: string;
  body: string;
  experience: string;
  highlights: string[];
  cover: string;
  gallery: VenuePhoto[];
}

export interface VenueAttraction {
  id: string;
  minutes: number;
  km: number;
  lat: number;
  lng: number;
  title: string;
  note: string;
}

export type VenuePool = Omit<PoolSection, "photos"> & { photos: { main: string; side1: string; side2: string } };

export interface VenueMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  volume: string;
  /** Browser URL of the dish photo, or the category's stock photo. */
  photo: string;
  /** Lower-cased names in every language, for the menu search box. */
  searchText: string;
}

export interface VenueMenuCategory {
  id: string;
  name: string;
  /** Visible dishes only; categories whose dishes are all hidden are dropped. */
  items: VenueMenuItem[];
}

export interface VenueMenu {
  categories: VenueMenuCategory[];
  /** Number of visible dishes across every category. */
  itemCount: number;
}

export interface VenueGuideFaq {
  question: string;
  answer: string;
}

export interface VenueGuide {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  cover: string;
  title: string;
  excerpt: string;
  /** Markdown; "" while the body is not loaded (see `bodyPending`) or on pages whose embedded content omits bodies. */
  body: string;
  /** The seed body exists but the browser bundle has not loaded it yet (shared/guideBodies.ts is fetched on demand). */
  bodyPending: boolean;
  faq: VenueGuideFaq[];
  attractionIds: string[];
  /** Written in the current language (title and body), as opposed to shown with a fallback. */
  available: boolean;
  /** Languages this article is published in. */
  langs: Lang[];
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
  pool: VenuePool;
  events: { hero: string; spacePhotos: string[]; events: VenueEvent[] };
  attractions: VenueAttraction[];
  about: { photos: { main: string; detail1: string; detail2: string } };
  menu: VenueMenu;
  /** Visible guides, newest first, in every language they exist in (see `available`). */
  guides: VenueGuide[];
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

function resolveEvent(event: EventContent, lang: Lang): VenueEvent {
  const gallery = event.gallery.map(photo => resolvePhoto(photo, lang));
  return {
    id: event.id,
    minGuests: event.minGuests,
    maxGuests: event.maxGuests,
    title: pickLang(event.title, lang),
    body: pickLang(event.body, lang),
    experience: pickLang(event.experience, lang),
    highlights: event.highlights.map(item => pickLang(item, lang)).filter(Boolean),
    cover: gallery[0]?.url ?? "",
    gallery,
  };
}

function resolveAttraction(item: AttractionContent, lang: Lang): VenueAttraction {
  return { id: item.id, minutes: item.minutes, km: item.km, lat: item.lat, lng: item.lng, title: pickLang(item.title, lang), note: pickLang(item.note, lang) };
}

function resolvePool(pool: PoolSection): VenuePool {
  return { ...pool, photos: { main: assetUrl(pool.photos.main.url), side1: assetUrl(pool.photos.side1.url), side2: assetUrl(pool.photos.side2.url) } };
}

function resolveMenuItem(item: MenuItemContent, categoryId: string, lang: Lang): VenueMenuItem {
  return {
    id: item.id,
    name: pickLang(item.name, lang),
    description: pickLang(item.description, lang),
    price: item.price,
    volume: item.volume,
    photo: assetUrl(item.photo?.url || RAW_DISHES[categoryId] || RAW_PHOTOS.restaurant),
    searchText: Object.values(item.name).join(" ").toLowerCase(),
  };
}

function resolveMenuCategory(category: MenuCategoryContent, lang: Lang): VenueMenuCategory {
  return {
    id: category.id,
    name: pickLang(category.name, lang),
    items: category.items.filter(item => !item.hidden).map(item => resolveMenuItem(item, category.id, lang)),
  };
}

function resolveMenu(menu: MenuSection, lang: Lang): VenueMenu {
  const categories = menu.categories.map(category => resolveMenuCategory(category, lang)).filter(category => category.items.length > 0);
  return { categories, itemCount: categories.reduce((count, category) => count + category.items.length, 0) };
}

function resolveGuide(post: GuidePost, lang: Lang): VenueGuide {
  const body = post.body ?? {};
  const faq = post.faq ?? [];
  const text = pickLang(body, lang);
  return {
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    cover: assetUrl(post.cover.url),
    title: pickLang(post.title, lang),
    excerpt: pickLang(post.excerpt, lang),
    body: isGuideBodyPending(text) ? "" : text,
    bodyPending: isGuideBodyPending(text),
    faq: faq.map(item => ({ question: pickLang(item.question, lang), answer: pickLang(item.answer, lang) })).filter(item => item.question && item.answer),
    attractionIds: post.attractionIds ?? [],
    available: guideAvailableIn({ title: post.title, body: body as GuidePost["body"] }, lang),
    langs: guideLangs({ title: post.title, body: body as GuidePost["body"] }, LANGS),
  };
}

function resolveAbout(about: AboutSection) {
  return { photos: { main: assetUrl(about.photos.main.url), detail1: assetUrl(about.photos.detail1.url), detail2: assetUrl(about.photos.detail2.url) } };
}

/** Language-resolved view of the content, with every image ref turned into a browser URL. */
export function resolveVenue(content: SiteContent, lang: Lang): Venue {
  const units = content.units.units.map(unit => resolveUnit(unit, lang));
  const { home, location, events } = content;
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
    pool: resolvePool(content.pool),
    events: {
      hero: assetUrl(events.hero.url),
      spacePhotos: events.spacePhotos.map(photo => assetUrl(photo.url)),
      events: events.events.map(event => resolveEvent(event, lang)),
    },
    attractions: content.attractions.attractions.map(item => resolveAttraction(item, lang)),
    about: resolveAbout(content.about),
    menu: resolveMenu(content.menu, lang),
    guides: content.guides.posts
      .filter(post => !post.hidden)
      .map(post => resolveGuide(post, lang))
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0)),
  };
}
