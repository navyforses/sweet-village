import { describe, expect, it } from "vitest";
import { contentForEmbedding, DEFAULT_CONTENT, guideAvailableIn, guideLangs, type GuidePost } from "./content";
import { GUIDE_SEEDS as STUB_SEEDS } from "./guideCopy.stub";
import { GUIDE_BODY_PENDING } from "./guideMeta";
import { guidesSectionSchema, sectionIssues } from "./contentSchema";
import { LANGS } from "./langs";
import { isSlug } from "./slug";

describe("guides section", () => {
  const post = DEFAULT_CONTENT.guides.posts[0];

  it("ships six seed articles with unique, valid slugs written in Georgian and English", () => {
    const posts = DEFAULT_CONTENT.guides.posts;
    expect(posts).toHaveLength(6);
    expect(new Set(posts.map(item => item.slug)).size).toBe(6);
    expect(posts.every(item => isSlug(item.slug))).toBe(true);
    expect(posts.every(item => guideLangs(item, LANGS).join() === "ka,en")).toBe(true);
    expect(posts.every(item => item.body.ka.length > 1500 && item.body.en.length > 1500)).toBe(true);
    expect(posts.every(item => item.body.ka.length <= 12_000 && item.body.en.length <= 12_000)).toBe(true);
    expect(sectionIssues("guides", DEFAULT_CONTENT.guides)).toBeNull();
  });

  it("only counts a language when both title and body are written", () => {
    expect(guideAvailableIn(post, "ka")).toBe(true);
    expect(guideAvailableIn(post, "ru")).toBe(false);
    expect(guideAvailableIn({ ...post, title: { ...post.title, ru: "x" } }, "ru")).toBe(false);
    expect(guideAvailableIn({ ...post, title: { ...post.title, ru: "x" }, body: { ...post.body, ru: "y" } }, "ru")).toBe(true);
  });

  it("validates slugs, dates, sizes and duplicate slugs", () => {
    const valid = { posts: [post] };
    expect(guidesSectionSchema.safeParse(valid).success).toBe(true);
    expect(guidesSectionSchema.safeParse({ posts: [post, post] }).success).toBe(false);
    expect(guidesSectionSchema.safeParse({ posts: [{ ...post, slug: "Bad Slug" }] }).success).toBe(false);
    expect(guidesSectionSchema.safeParse({ posts: [{ ...post, publishedAt: "16.09.2026" }] }).success).toBe(false);
    expect(guidesSectionSchema.safeParse({ posts: [{ ...post, body: { ...post.body, ka: "" } }] }).success).toBe(false);
    expect(guidesSectionSchema.safeParse({ posts: [{ ...post, cover: { url: "javascript:alert(1)" } }] }).success).toBe(false);
    expect(guidesSectionSchema.safeParse({ posts: [{ ...post, faq: Array(13).fill(post.faq[0]) }] }).success).toBe(false);
  });

  it("embeds the full guides section on article pages and strips bodies elsewhere", () => {
    const sparse = { guides: { posts: [post] } };
    const slim = contentForEmbedding(sparse, DEFAULT_CONTENT, false)!;
    const slimPost = slim.guides!.posts[0] as Partial<GuidePost>;
    expect(slimPost.body).toBeUndefined();
    expect(slimPost.faq).toBeUndefined();
    expect(slimPost.excerpt).toEqual(post.excerpt);
    expect(contentForEmbedding(sparse, DEFAULT_CONTENT, true)).toEqual({ guides: DEFAULT_CONTENT.guides });
    expect(contentForEmbedding(null, DEFAULT_CONTENT, true)).toEqual({ guides: DEFAULT_CONTENT.guides });
    expect(contentForEmbedding(null, DEFAULT_CONTENT, false)).toBeNull();
    expect(contentForEmbedding({ contact: DEFAULT_CONTENT.contact }, DEFAULT_CONTENT, false)).toEqual({ contact: DEFAULT_CONTENT.contact });
  });

  it("keeps the browser stub in step with the full seeds", () => {
    expect(STUB_SEEDS.map(seed => seed.slug)).toEqual(DEFAULT_CONTENT.guides.posts.map(item => item.slug));
    for (const [index, stub] of STUB_SEEDS.entries()) {
      const full = DEFAULT_CONTENT.guides.posts[index];
      expect(stub.title).toEqual(full.title);
      expect(stub.excerpt).toEqual(full.excerpt);
      expect(guideLangs(stub, LANGS)).toEqual(guideLangs(full, LANGS));
      expect(stub.body.ka).toBe(GUIDE_BODY_PENDING);
      expect(stub.faq).toEqual([]);
    }
  });
});
