import type { ImgHTMLAttributes } from "react";
import { responsiveSource } from "@/lib/imageUrl";

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> {
  src: string;
  /** How wide the image renders, in CSS `sizes` syntax (e.g. "(min-width: 768px) 50vw, 100vw"). */
  sizes: string;
  /** Largest width worth generating; defaults to the full 1920. */
  maxWidth?: number;
  /** Above-the-fold image: eager, high fetch priority (React also emits a preload for it during prerender). */
  priority?: boolean;
}

/**
 * Content photo with a responsive `srcset` served by Vercel Image
 * Optimization (AVIF/WebP, resized per device) when the build enables it,
 * and the plain URL otherwise. Layout is the caller's job: keep an
 * aspect-ratio class on the element so the page never shifts.
 */
export default function Img({ src, sizes, maxWidth = 1920, priority = false, loading, decoding = "async", ...rest }: ImgProps) {
  const source = responsiveSource(src, sizes, maxWidth);
  return (
    <img
      {...rest}
      src={source.src}
      srcSet={source.srcSet}
      sizes={source.srcSet ? source.sizes : undefined}
      loading={priority ? "eager" : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : rest.fetchPriority}
      decoding={decoding}
    />
  );
}
