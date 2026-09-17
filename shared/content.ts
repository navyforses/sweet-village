/**
 * Owner-editable site content: types, section keys and the compile-time
 * defaults. The public site renders `DEFAULT_CONTENT` on first paint and
 * overlays whatever the owner saved through the admin panel (`GET
 * /api/content` returns only the saved sections). Keep this module free of
 * zod and client-only imports: it is bundled into the public site and loaded
 * by every Vercel function. Validation lives in `./contentSchema.ts`.
 */
import { ATTRACTION_COPY } from "./attractionCopy.js";
import { EVENT_CAPTION_CONCEPT, EVENT_CAPTION_REAL, EVENT_COPY } from "./eventCopy.js";
import { GUIDE_SEEDS } from "./guideCopy.js";
import { GUIDE_BODY_PENDING } from "./guideMeta.js";
import { MENU } from "./menuData.js";
import { EN_RU_DESCRIPTIONS } from "./menuDescriptions.js";
import { CATEGORY_TRANSLATIONS, ITEM_TRANSLATIONS } from "./menuTranslations.js";
import { ADDRESS_COPY, UNIT_COPY, defaultUnitCaptions } from "./unitCopy.js";
import { ATTRACTIONS, CONTACT, EVENT_TYPES, LOCATION, POOL, UNITS, type EventId, type UnitId } from "./venue.js";
import { EVENTS_PAGE_HERO, EVENTS_SPACE_PHOTO_REFS, HOME_GALLERY_REFS, HOME_PHOTO_REFS, RAW_MENU_ITEM_PHOTOS, RAW_PHOTOS } from "./venuePhotos.js";
import type { Lang, LocalizedText } from "./langs.js";

export type { Lang, LocalizedText } from "./langs.js";
export { GUIDE_BODY_PENDING } from "./guideMeta.js";
export { pickLang } from "./langs.js";

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

export interface MenuItemContent {
  /** Stable numeric id; new dishes get the next free number. */
  id: number;
  name: LocalizedText;
  /** Short card description; every language may be empty. */
  description: LocalizedText;
  /** Price in GEL, up to two decimals. */
  price: number;
  /** Volume note such as "0.5 L"; "" when not applicable. */
  volume: string;
  /** Dish photo; when missing the category's stock photo is shown. */
  photo?: Photo;
  /** Temporarily unavailable: kept in the admin, hidden on the public menu. */
  hidden: boolean;
}

export interface MenuCategoryContent {
  id: string;
  name: LocalizedText;
  items: MenuItemContent[];
}

export interface MenuSection {
  categories: MenuCategoryContent[];
}

export interface GuideFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

/** One article of the "Guides" section (/guides/:slug). */
export interface GuidePost {
  /** URL segment; fixed once published so links and search results keep working. */
  slug: string;
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD, bumped on every save. */
  updatedAt: string;
  cover: Photo;
  title: LocalizedText;
  /** One or two sentences shown on the list page and used as the meta description. */
  excerpt: LocalizedText;
  /** Markdown subset (see shared/markdown.ts). A language without a body is not published in that language. */
  body: LocalizedText;
  faq: GuideFaq[];
  /** Ids of the attractions section this article covers; the Location page links to it. */
  attractionIds: string[];
  /** Kept in the admin, absent from the public site, the sitemap and the prerender. */
  hidden: boolean;
}

export interface GuidesSection {
  posts: GuidePost[];
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
  menu: MenuSection;
  guides: GuidesSection;
  texts: TextsSection;
}

export type SectionKey = keyof SiteContent;
export const SECTION_KEYS = ["units", "home", "contact", "location", "pool", "events", "attractions", "about", "menu", "guides", "texts"] as const satisfies readonly SectionKey[];

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

/** The printed menu (ka/en/ru) plus the translation and description layers, folded into one object per dish. */
function defaultMenu(): MenuCategoryContent[] {
  return MENU.map(category => {
    const extra = CATEGORY_TRANSLATIONS[category.id];
    return {
      id: category.id,
      name: { ka: category.ka, en: category.en, ru: category.ru, ar: extra?.ar ?? "", fr: extra?.fr ?? "", es: extra?.es ?? "" },
      items: category.items.map(item => {
        const translated = ITEM_TRANSLATIONS[item.id];
        const enRu = EN_RU_DESCRIPTIONS[item.id];
        const url = RAW_MENU_ITEM_PHOTOS[item.id];
        return {
          id: item.id,
          name: { ka: item.ka, en: item.en, ru: item.ru, ar: translated?.ar.name ?? "", fr: translated?.fr.name ?? "", es: translated?.es.name ?? "" },
          description: {
            ka: item.descKa ?? "",
            en: enRu?.en ?? "",
            ru: enRu?.ru ?? "",
            ar: translated?.ar.desc ?? "",
            fr: translated?.fr.desc ?? "",
            es: translated?.es.desc ?? "",
          },
          price: item.price,
          volume: item.volume ?? "",
          ...(url ? { photo: photo(url) } : {}),
          hidden: false,
        };
      }),
    };
  });
}

function defaultGuides(): GuidePost[] {
  return GUIDE_SEEDS.map(seed => ({
    slug: seed.slug,
    publishedAt: seed.publishedAt,
    updatedAt: seed.publishedAt,
    cover: photo(RAW_PHOTOS[seed.cover]),
    title: seed.title,
    excerpt: seed.excerpt,
    body: seed.body,
    faq: seed.faq.map(item => ({ question: item.question, answer: item.answer })),
    attractionIds: [...seed.attractionIds],
    hidden: false,
  }));
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
  menu: { categories: defaultMenu() },
  guides: { posts: defaultGuides() },
  texts: {},
};

/** A guide exists in a language only when both its title and its body are written in it. */
export function guideAvailableIn(post: Pick<GuidePost, "title" | "body">, lang: Lang): boolean {
  return Boolean(post.title[lang]?.trim() && post.body?.[lang]?.trim());
}

/** Languages a guide is published in, in the site's language order. */
export function guideLangs(post: Pick<GuidePost, "title" | "body">, langs: readonly Lang[]): Lang[] {
  return langs.filter(lang => guideAvailableIn(post, lang));
}

/** True for a body the browser bundle has not loaded yet (see shared/guideCopy.stub.ts). */
export function isGuideBodyPending(text: string | undefined): boolean {
  return text === GUIDE_BODY_PENDING;
}

/**
 * The JSON embedded in a prerendered page for hydration. An article page
 * embeds the whole resolved guides section (the browser bundle only carries
 * placeholders for the seed bodies); every other page drops article bodies
 * and FAQs so the home page does not carry every guide in six languages.
 */
export function contentForEmbedding(sparse: SparseContent | null, resolved: SiteContent, isGuidePage: boolean): SparseContent | null {
  if (isGuidePage) return { ...(sparse ?? {}), guides: resolved.guides };
  if (!sparse?.guides) return sparse;
  const posts = sparse.guides.posts.map(post => {
    const { body: _body, faq: _faq, ...rest } = post;
    return rest as GuidePost;
  });
  return { ...sparse, guides: { posts } };
}

/** Dishes the public menu shows (not marked hidden). */
export function visibleMenuItemCount(menu: MenuSection): number {
  return menu.categories.reduce((count, category) => count + category.items.filter(item => !item.hidden).length, 0);
}

/** Next free dish id across every category. */
export function nextMenuItemId(menu: MenuSection): number {
  return menu.categories.reduce((max, category) => category.items.reduce((inner, item) => Math.max(inner, item.id), max), 0) + 1;
}

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
