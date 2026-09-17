import { describe, expect, it } from "vitest";
import { canOptimize, optimizedSrc, responsiveSource, srcSetFor, widthsUpTo } from "./imageUrl";

describe("responsive image URLs", () => {
  it("builds Vercel image optimizer URLs and srcsets", () => {
    expect(optimizedSrc("/events/real-07.jpg", 640)).toBe("/_vercel/image?url=%2Fevents%2Freal-07.jpg&w=640&q=75");
    expect(srcSetFor("https://x.public.blob.vercel-storage.com/a.jpg", [384, 640])).toBe(
      "/_vercel/image?url=https%3A%2F%2Fx.public.blob.vercel-storage.com%2Fa.jpg&w=384&q=75 384w, /_vercel/image?url=https%3A%2F%2Fx.public.blob.vercel-storage.com%2Fa.jpg&w=640&q=75 640w",
    );
    expect(widthsUpTo(700)).toEqual([384, 640, 960]);
    expect(widthsUpTo(5000)).toEqual([384, 640, 960, 1280, 1920]);
  });

  it("skips sources the optimizer cannot serve", () => {
    expect(canOptimize("/favicon.svg")).toBe(false);
    expect(canOptimize("data:image/png;base64,xx")).toBe(false);
    expect(canOptimize("/api/blob-image?path=x")).toBe(false);
    expect(canOptimize("http://insecure.example/a.jpg")).toBe(false);
    expect(canOptimize("/pool-view-house/homepage-cover-wide-2026.webp")).toBe(true);
  });

  it("returns plain URLs when optimization is off and full attributes when on", () => {
    expect(responsiveSource("/a.jpg", "100vw", 1920, false)).toEqual({ src: "/a.jpg" });
    const on = responsiveSource("/a.jpg", "(min-width: 768px) 50vw, 100vw", 960, true);
    expect(on.src).toBe("/_vercel/image?url=%2Fa.jpg&w=960&q=75");
    expect(on.srcSet?.split(", ")).toHaveLength(3);
    expect(on.sizes).toBe("(min-width: 768px) 50vw, 100vw");
    expect(responsiveSource("/x.svg", "100vw", 960, true)).toEqual({ src: "/x.svg" });
  });
});
