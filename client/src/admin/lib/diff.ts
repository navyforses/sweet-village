import { isRecord } from "@shared/deepMerge";

export type Leaf = string | number | boolean | null;

/** Flattens nested content into dotted leaf paths; arrays use numeric segments. */
export function flattenLeaves(value: unknown, prefix = "", out: Map<string, Leaf> = new Map()): Map<string, Leaf> {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenLeaves(item, prefix ? `${prefix}.${index}` : String(index), out));
    return out;
  }
  if (isRecord(value)) {
    for (const [key, item] of Object.entries(value)) flattenLeaves(item, prefix ? `${prefix}.${key}` : key, out);
    return out;
  }
  if (value === undefined) return out;
  out.set(prefix, value as Leaf);
  return out;
}

export interface LeafChange {
  path: string;
  before: Leaf | undefined;
  after: Leaf | undefined;
}

/** Leaves that differ between two values, in the order they appear in `after` (removed ones last). */
export function diffLeaves(before: unknown, after: unknown): LeafChange[] {
  const a = flattenLeaves(before);
  const b = flattenLeaves(after);
  const changes: LeafChange[] = [];
  b.forEach((value, path) => {
    if (!a.has(path)) changes.push({ path, before: undefined, after: value });
    else if (a.get(path) !== value) changes.push({ path, before: a.get(path), after: value });
  });
  a.forEach((value, path) => {
    if (!b.has(path)) changes.push({ path, before: value, after: undefined });
  });
  return changes;
}

const SEGMENT_LABELS: Record<string, string> = {
  units: "ერთეული",
  categories: "კატეგორია",
  items: "კერძი",
  events: "ღონისძიება",
  attractions: "ღირსშესანიშნაობა",
  gallery: "გალერეა",
  spacePhotos: "სივრცის ფოტო",
  photos: "ფოტოები",
  photo: "ფოტო",
  hero: "ქავერი",
  services: "სექციების ფოტოები",
  stayTeaser: "კოტეჯების ბლოკი",
  name: "სახელი",
  title: "სათაური",
  description: "აღწერა",
  body: "აღწერა",
  bestFor: "ვისთვისაა",
  experience: "ერთი წინადადება",
  highlights: "უპირატესობა",
  note: "მოკლე აღწერა",
  caption: "წარწერა",
  url: "ფოტო",
  nightlyPrice: "ფასი ღამეზე",
  price: "ფასი",
  volume: "მოცულობა",
  hidden: "დროებით არ არის",
  beds: "საწოლი",
  maxGuests: "მაქს. სტუმარი",
  minGuests: "მინ. სტუმარი",
  floors: "სართული",
  adult: "მოზრდილი",
  child: "ბავშვი",
  childMaxAge: "ბავშვის ასაკი",
  guestFree: "სტუმრებისთვის უფასო",
  dailyLimit: "დღიური ლიმიტი",
  openFrom: "იხსნება",
  openTo: "იკეტება",
  seasonFrom: "სეზონის დასაწყისი",
  seasonTo: "სეზონის დასასრული",
  provisional: "ფასები საორიენტაციოა",
  main: "დიდი ფოტო",
  side1: "პატარა ფოტო 1",
  side2: "პატარა ფოტო 2",
  detail1: "პატარა ფოტო 1",
  detail2: "პატარა ფოტო 2",
  phone: "ტელეფონი",
  phoneDisplay: "ტელეფონი (ჩვენება)",
  whatsapp: "WhatsApp",
  email: "ელფოსტა",
  instagram: "Instagram",
  instagramUrl: "Instagram ბმული",
  facebookUrl: "Facebook ბმული",
  address: "მისამართი",
  lat: "განედი",
  lng: "გრძედი",
  minutes: "წუთი",
  km: "კმ",
  ka: "ქართ.",
  en: "ინგლ.",
  ru: "რუს.",
  ar: "არაბ.",
  fr: "ფრანგ.",
  es: "ესპ.",
};

/** Georgian name of an entry in an object array, used instead of its index in change labels. */
function entryName(value: unknown): string | null {
  if (!isRecord(value)) return null;
  for (const key of ["name", "title"]) {
    const text = value[key];
    if (isRecord(text) && typeof text.ka === "string" && text.ka) return text.ka;
  }
  return typeof value.id === "string" ? value.id : null;
}

/**
 * Turns "units.2.nightlyPrice" into "ერთეული «ბაღის კოტეჯი 3» › ფასი ღამეზე",
 * looking entry names up in either version of the content.
 */
export function describePath(path: string, ...sources: unknown[]): string {
  const segments = path.split(".");
  const parts: string[] = [];
  const cursors: unknown[] = sources;
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const next = cursors.map(cursor => (Array.isArray(cursor) ? cursor[Number(segment)] : isRecord(cursor) ? cursor[segment] : undefined));
    if (/^\d+$/.test(segment)) {
      const named = next.map(entryName).find(Boolean);
      parts.push(named ? `«${named}»` : `#${Number(segment) + 1}`);
    } else {
      parts.push(SEGMENT_LABELS[segment] ?? segment);
    }
    cursors.splice(0, cursors.length, ...next);
  }
  return parts.join(" › ");
}

export function formatLeaf(value: Leaf | undefined): string {
  if (value === undefined) return "—";
  if (value === null) return "—";
  if (typeof value === "boolean") return value ? "კი" : "არა";
  if (typeof value === "string") return value === "" ? "(ცარიელი)" : value;
  return String(value);
}
