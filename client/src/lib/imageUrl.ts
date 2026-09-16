/**
 * Responsive image URLs through Vercel Image Optimization
 * (`/_vercel/image?url=…&w=…&q=…`). The widths must match `images.sizes` in
 * vercel.json. Optimization is switched on at build time (see vite.config.ts)
 * so local builds and the static QA server keep plain image URLs.
 */
export const IMAGE_WIDTHS = [384, 640, 960, 1280, 1920] as const;
export const IMAGE_QUALITY = 75;

export const imageOptimizationEnabled = (): boolean => import.meta.env.VITE_IMAGE_OPTIMIZATION === "1";

/** Only site files and https images can be optimized; API-proxied previews, data URLs and SVGs are served as-is. */
export function canOptimize(src: string): boolean {
  if (!src || src.startsWith("data:") || src.startsWith("blob:") || src.startsWith("/api/") || src.startsWith("/_vercel/")) return false;
  if (/\.svg(\?|$)/i.test(src)) return false;
  return src.startsWith("/") || src.startsWith("https://");
}

export function optimizedSrc(src: string, width: number, quality = IMAGE_QUALITY): string {
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** Widths no larger than needed: everything up to the first width that covers `maxWidth`. */
export function widthsUpTo(maxWidth: number, widths: readonly number[] = IMAGE_WIDTHS): number[] {
  const out: number[] = [];
  for (const width of widths) {
    out.push(width);
    if (width >= maxWidth) break;
  }
  return out;
}

export function srcSetFor(src: string, widths: readonly number[], quality = IMAGE_QUALITY): string {
  return widths.map(width => `${optimizedSrc(src, width, quality)} ${width}w`).join(", ");
}

export interface ResponsiveSource {
  src: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * Attributes for an <img>: the largest candidate as `src` (old browsers),
 * a `srcset` of the smaller widths and the caller's `sizes`. Falls back to
 * the plain URL when optimization is off or the source cannot be optimized.
 */
export function responsiveSource(src: string, sizes: string, maxWidth = 1920, enabled = imageOptimizationEnabled()): ResponsiveSource {
  if (!enabled || !canOptimize(src)) return { src };
  const widths = widthsUpTo(maxWidth);
  return { src: optimizedSrc(src, widths[widths.length - 1]), srcSet: srcSetFor(src, widths), sizes };
}
