/**
 * Keeps published image references portable between Manus and Vercel Blob.
 *
 * Until VITE_SWEET_VILLAGE_ASSET_ORIGIN is defined, existing /manus-storage
 * paths are kept untouched. After the Vercel Blob migration, set the variable
 * to the public Blob origin recorded by scripts/migrate-assets-to-vercel-blob.mjs.
 */
const BLOB_ORIGIN = (import.meta.env.VITE_SWEET_VILLAGE_ASSET_ORIGIN ?? "").replace(/\/$/, "");

export function resolveAssetUrl(assetRef: string, blobOrigin = BLOB_ORIGIN): string {
  if (!blobOrigin || !assetRef.startsWith("/manus-storage/")) return assetRef;
  return `${blobOrigin.replace(/\/$/, "")}/${assetRef.slice("/manus-storage/".length).replace(/_[a-f0-9]{8}(?=\.[a-z0-9]+$)/i, "")}`;
}

export const assetUrl = (assetRef: string) => resolveAssetUrl(assetRef);
