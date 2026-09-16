/**
 * zod validation for every owner-editable content section. Imported by the
 * Vercel functions (on write and when parsing stored rows) and by the admin
 * bundle (form resolvers). The public site never imports this module.
 */
import { z } from "zod";
import { LANGS, type Lang } from "./langs.js";
import { EVENT_TYPES, UNITS } from "./venue.js";
import { isSafeKey } from "./deepMerge.js";
import { SLUG_MAX, SLUG_PATTERN } from "./slug.js";
import type { SectionKey, SiteContent } from "./content.js";

export const UNIT_IDS = UNITS.map(unit => unit.id) as [string, ...string[]];
export const EVENT_IDS = EVENT_TYPES.map(event => event.id) as [string, ...string[]];

/** Public Blob stores expose this host suffix; owner uploads always land there. */
const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

export function isAllowedImageRef(value: string): boolean {
  if (value.startsWith("/")) {
    return !value.startsWith("//") && !value.includes("..") && !/[\s<>"']/.test(value);
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

const imageUrl = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine(isAllowedImageRef, { message: "invalid_image_ref" });

const localizedText = (max: number) =>
  z.object({
    ka: z.string().trim().min(1).max(max),
    en: z.string().trim().max(max).default(""),
    ru: z.string().trim().max(max).default(""),
    ar: z.string().trim().max(max).default(""),
    fr: z.string().trim().max(max).default(""),
    es: z.string().trim().max(max).default(""),
  });

const localizedCaption = z.object({
  ka: z.string().trim().max(120).default(""),
  en: z.string().trim().max(120).default(""),
  ru: z.string().trim().max(120).default(""),
  ar: z.string().trim().max(120).default(""),
  fr: z.string().trim().max(120).default(""),
  es: z.string().trim().max(120).default(""),
});

export const photoSchema = z.object({
  url: imageUrl,
  caption: localizedCaption.partial().optional(),
});

export const unitSchema = z
  .object({
    id: z.enum(UNIT_IDS),
    name: localizedText(80),
    description: localizedText(700),
    bestFor: localizedText(120),
    beds: z.number().int().min(1).max(20),
    maxGuests: z.number().int().min(1).max(30),
    floors: z.number().int().min(1).max(3),
    nightlyPrice: z.number().int().min(1).max(100_000),
    gallery: z.array(photoSchema).min(1).max(30),
  })
  .refine(unit => unit.maxGuests >= unit.beds, { message: "max_guests_below_beds", path: ["maxGuests"] });

export const unitsSectionSchema = z
  .object({ units: z.array(unitSchema).min(1).max(12) })
  .refine(section => new Set(section.units.map(unit => unit.id)).size === section.units.length, {
    message: "duplicate_unit_id",
    path: ["units"],
  });

export const homeSectionSchema = z.object({
  hero: photoSchema,
  services: z.object({ events: photoSchema, pool: photoSchema, restaurant: photoSchema, stay: photoSchema }),
  stayTeaser: z.object({ exterior: photoSchema, bedroom: photoSchema, studio: photoSchema }),
  gallery: z.array(photoSchema).min(4).max(16),
});

const optionalUrl = z.union([z.url().max(200), z.literal("")]);

export const contactSectionSchema = z.object({
  phone: z.string().trim().regex(/^\+\d{9,15}$/, "invalid_phone"),
  phoneDisplay: z.string().trim().min(6).max(32),
  whatsapp: z.string().trim().regex(/^\d{9,15}$/, "invalid_whatsapp"),
  email: z.email().max(120),
  instagram: z.string().trim().max(64).default(""),
  instagramUrl: optionalUrl,
  facebookUrl: optionalUrl,
});

export const locationSectionSchema = z.object({
  lat: z.number().min(41).max(44),
  lng: z.number().min(40).max(47),
  address: localizedText(200),
});

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "invalid_time");
const month = z.number().int().min(1).max(12);

export const poolSectionSchema = z
  .object({
    adult: z.number().int().min(0).max(10_000),
    child: z.number().int().min(0).max(10_000),
    childMaxAge: z.number().int().min(1).max(17),
    guestFree: z.boolean(),
    dailyLimit: z.number().int().min(1).max(1000),
    openFrom: hhmm,
    openTo: hhmm,
    seasonFrom: month,
    seasonTo: month,
    provisional: z.boolean(),
    photos: z.object({ main: photoSchema, side1: photoSchema, side2: photoSchema }),
  })
  .refine(pool => pool.adult >= pool.child, { message: "child_price_above_adult", path: ["child"] });

export const eventSchema = z
  .object({
    id: z.enum(EVENT_IDS),
    minGuests: z.number().int().min(1).max(500),
    maxGuests: z.number().int().min(1).max(500),
    title: localizedText(80),
    body: localizedText(600),
    experience: localizedText(160),
    highlights: z.array(localizedText(120)).length(3),
    gallery: z.array(photoSchema).min(1).max(20),
  })
  .refine(event => event.maxGuests >= event.minGuests, { message: "max_guests_below_min", path: ["maxGuests"] });

export const eventsSectionSchema = z
  .object({
    hero: photoSchema,
    spacePhotos: z.array(photoSchema).min(1).max(12),
    events: z.array(eventSchema).min(1).max(12),
  })
  .refine(section => new Set(section.events.map(event => event.id)).size === section.events.length, {
    message: "duplicate_event_id",
    path: ["events"],
  });

export const attractionSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]{1,40}$/, "invalid_id"),
  minutes: z.number().int().min(1).max(600),
  km: z.number().min(0).max(1000),
  lat: z.number().min(41).max(44),
  lng: z.number().min(40).max(47),
  title: localizedText(80),
  note: localizedText(200),
});

export const attractionsSectionSchema = z
  .object({ attractions: z.array(attractionSchema).min(1).max(20) })
  .refine(section => new Set(section.attractions.map(item => item.id)).size === section.attractions.length, {
    message: "duplicate_attraction_id",
    path: ["attractions"],
  });

export const aboutSectionSchema = z.object({
  photos: z.object({ main: photoSchema, detail1: photoSchema, detail2: photoSchema }),
});

/** Same shape as `localizedText` but Georgian may be empty too (menu descriptions). */
const localizedOptional = (max: number) =>
  z.object({
    ka: z.string().trim().max(max).default(""),
    en: z.string().trim().max(max).default(""),
    ru: z.string().trim().max(max).default(""),
    ar: z.string().trim().max(max).default(""),
    fr: z.string().trim().max(max).default(""),
    es: z.string().trim().max(max).default(""),
  });

const gelPrice = z
  .number()
  .min(0)
  .max(10_000)
  .refine(value => Math.round(value * 100) / 100 === value, { message: "price_precision" });

export const menuItemSchema = z.object({
  id: z.number().int().min(1).max(100_000),
  name: localizedText(120),
  description: localizedOptional(300),
  price: gelPrice,
  volume: z.string().trim().max(24).default(""),
  photo: photoSchema.optional(),
  hidden: z.boolean().default(false),
});

export const menuCategorySchema = z
  .object({
    id: z.string().regex(/^[a-z][a-z0-9-]{1,40}$/, "invalid_id"),
    name: localizedText(80),
    items: z.array(menuItemSchema).max(80),
  })
  .refine(category => new Set(category.items.map(item => item.id)).size === category.items.length, {
    message: "duplicate_item_id",
    path: ["items"],
  });

export const menuSectionSchema = z
  .object({ categories: z.array(menuCategorySchema).min(1).max(20) })
  .refine(section => new Set(section.categories.map(category => category.id)).size === section.categories.length, {
    message: "duplicate_category_id",
    path: ["categories"],
  })
  .refine(
    section => {
      const ids = section.categories.flatMap(category => category.items.map(item => item.id));
      return new Set(ids).size === ids.length;
    },
    { message: "duplicate_item_id", path: ["categories"] },
  );

const isoDate = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "invalid_date");

export const guideFaqSchema = z.object({
  question: localizedText(200),
  answer: localizedText(1200),
});

export const GUIDE_BODY_MAX = 12_000;
/** Everything the admin can save for the section must fit the API's request limit with room to spare. */
const GUIDES_SECTION_MAX_BYTES = 450_000;

export const guidePostSchema = z.object({
  slug: z.string().min(3).max(SLUG_MAX).regex(SLUG_PATTERN, "invalid_slug"),
  publishedAt: isoDate,
  updatedAt: isoDate,
  cover: photoSchema,
  title: localizedText(120),
  excerpt: localizedText(300),
  body: localizedText(GUIDE_BODY_MAX),
  faq: z.array(guideFaqSchema).max(12).default([]),
  attractionIds: z.array(z.string().regex(/^[a-z][a-z0-9-]{1,40}$/, "invalid_id")).max(8).default([]),
  hidden: z.boolean().default(false),
});

export const guidesSectionSchema = z
  .object({ posts: z.array(guidePostSchema).max(40) })
  .refine(section => new Set(section.posts.map(post => post.slug)).size === section.posts.length, {
    message: "duplicate_slug",
    path: ["posts"],
  })
  .refine(section => JSON.stringify(section).length <= GUIDES_SECTION_MAX_BYTES, { message: "section_too_large", path: ["posts"] });

const MAX_PATCH_DEPTH = 7;
const MAX_PATCH_BYTES = 150_000;
const safeKey = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/).refine(isSafeKey);

const patchLeaf: z.ZodType<unknown> = z.lazy(() =>
  z.union([z.string().max(3000), z.array(patchLeaf).max(64), z.record(safeKey, patchLeaf)]),
);

function patchDepth(value: unknown, depth = 0): number {
  if (Array.isArray(value)) return value.reduce<number>((max, item) => Math.max(max, patchDepth(item, depth + 1)), depth);
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).reduce<number>(
      (max, item) => Math.max(max, patchDepth(item, depth + 1)),
      depth,
    );
  }
  return depth;
}

const langPatch = z.record(safeKey, patchLeaf);

export const textsSectionSchema = z
  .object(Object.fromEntries(LANGS.map(lang => [lang, langPatch.optional()])) as Record<Lang, z.ZodOptional<typeof langPatch>>)
  .strict()
  .superRefine((value, context) => {
    if (patchDepth(value) > MAX_PATCH_DEPTH + 1) {
      context.addIssue({ code: "custom", message: "patch_too_deep" });
    }
    if (JSON.stringify(value).length > MAX_PATCH_BYTES) {
      context.addIssue({ code: "custom", message: "patch_too_large" });
    }
  });

export const SECTION_SCHEMAS = {
  units: unitsSectionSchema,
  home: homeSectionSchema,
  contact: contactSectionSchema,
  location: locationSectionSchema,
  pool: poolSectionSchema,
  events: eventsSectionSchema,
  attractions: attractionsSectionSchema,
  about: aboutSectionSchema,
  menu: menuSectionSchema,
  guides: guidesSectionSchema,
  texts: textsSectionSchema,
} as const satisfies Record<SectionKey, z.ZodType>;

export type ParsedSection<K extends SectionKey> = SiteContent[K];

/** Validates a stored or submitted section; returns null when it is not usable. */
export function parseSection<K extends SectionKey>(key: K, value: unknown): ParsedSection<K> | null {
  const schema: z.ZodType = SECTION_SCHEMAS[key];
  const result = schema.safeParse(value);
  return result.success ? (result.data as ParsedSection<K>) : null;
}

export type SectionIssues = ReturnType<typeof z.flattenError<z.ZodType<unknown>>>;

export function sectionIssues<K extends SectionKey>(key: K, value: unknown): SectionIssues | null {
  const schema: z.ZodType = SECTION_SCHEMAS[key];
  const result = schema.safeParse(value);
  return result.success ? null : z.flattenError(result.error);
}
