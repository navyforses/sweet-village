/**
 * Browser-side photo preparation. Owners upload straight from a phone, so a
 * 6 MB HEIC/JPEG is normal; the public site wants ~200-500 KB WebP. Resizing
 * on the client also keeps uploads far below Blob limits and saves bandwidth.
 */

export const MAX_EDGE_PX = 2400;
export const WEBP_QUALITY = 0.82;
export const JPEG_QUALITY = 0.85;

export interface PreparedImage {
  blob: Blob;
  contentType: "image/webp" | "image/jpeg";
  extension: "webp" | "jpg";
  width: number;
  height: number;
}

/** ASCII-only, URL-safe stem derived from the original file name (Georgian names become "photo"). */
export function slugifyFilename(name: string): string {
  const stem = name.replace(/\.[^.]+$/, "").toLowerCase();
  const slug = stem
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "photo";
}

const ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export function shortId(length = 6): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => ID_ALPHABET[byte % ID_ALPHABET.length]).join("");
}

/** Must satisfy UPLOAD_PATHNAME in api/_lib/admin/upload.ts. */
export function uploadPathname(originalName: string, extension: "webp" | "jpg" | "png", now = new Date()): string {
  return `sweet-village/uploads/${now.getUTCFullYear()}/${slugifyFilename(originalName)}-${shortId()}.${extension}`;
}

async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      /* fall through to <img> decoding (older Safari, unsupported formats) */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(resolve, type, quality));
}

export async function prepareImage(file: File, maxEdge = MAX_EDGE_PX): Promise<PreparedImage> {
  const source = await decode(file);
  const sourceWidth = "naturalWidth" in source ? source.naturalWidth : source.width;
  const sourceHeight = "naturalHeight" in source ? source.naturalHeight : source.height;
  if (!sourceWidth || !sourceHeight) throw new Error("undecodable_image");

  const scale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas_unavailable");
  context.drawImage(source, 0, 0, width, height);
  if ("close" in source) source.close();

  const webp = await toBlob(canvas, "image/webp", WEBP_QUALITY);
  if (webp && webp.type === "image/webp") {
    return { blob: webp, contentType: "image/webp", extension: "webp", width, height };
  }
  // Safari cannot encode WebP; JPEG keeps the size reasonable.
  const jpeg = await toBlob(canvas, "image/jpeg", JPEG_QUALITY);
  if (!jpeg) throw new Error("encode_failed");
  return { blob: jpeg, contentType: "image/jpeg", extension: "jpg", width, height };
}

export function looksLikeImage(file: File): boolean {
  return file.type.startsWith("image/") || /\.(heic|heif|jpe?g|png|webp|gif|avif)$/i.test(file.name);
}
