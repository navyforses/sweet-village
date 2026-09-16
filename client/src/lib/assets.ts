import { assetUrl } from "./assetUrl";
import {
  HOME_GALLERY_REFS,
  HOME_PHOTO_REFS,
  RAW_DISHES,
  RAW_MENU_ITEM_PHOTOS,
  RAW_PHOTOS,
} from "@shared/venuePhotos";

/**
 * Central asset registry. Every image is served from Blob/webdev storage —
 * nothing heavy lives in the repo. The raw references live in
 * `shared/venuePhotos.ts` (so the owner-editable content model can reuse them
 * as defaults); this module resolves them to browser URLs.
 */

function resolveAssetRecord<T extends Record<string | number, string>>(record: T): T {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, assetUrl(value)])) as T;
}

export const PHOTOS = resolveAssetRecord(RAW_PHOTOS);

// The homepage uses only real venue photography and cottage images that were
// explicitly approved for publication. Owner edits override these through the
// content provider; the static values remain the day-one defaults.
export const HOME_PHOTOS = resolveAssetRecord(HOME_PHOTO_REFS);

export const HOME_GALLERY = HOME_GALLERY_REFS.map(assetUrl);
export const DISHES = resolveAssetRecord(RAW_DISHES);
export const MENU_ITEM_PHOTOS = resolveAssetRecord(RAW_MENU_ITEM_PHOTOS);

export function menuItemPhoto(itemId: number, categoryId: string): string {
  return MENU_ITEM_PHOTOS[itemId] ?? DISHES[categoryId] ?? PHOTOS.restaurant;
}

export const GALLERY: string[] = [
  PHOTOS.poolReal,
  PHOTOS.terrace,
  PHOTOS.bedroomTwin,
  PHOTOS.roomSitting,
  PHOTOS.eventSpace,
  PHOTOS.bedroomLoft,
  PHOTOS.roomDetail,
  PHOTOS.banquet,
];
