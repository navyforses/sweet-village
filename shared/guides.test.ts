import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT, guideAvailableIn, guideLangs, slimContentForEmbedding, type GuidePost } from "./content";
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

  it("drops bodies and FAQs from the embedded copy except on article pages", () => {
    const sparse = { guides: { posts: [post] } };
    const slim = slimContentForEmbedding(sparse, false)!;
    const slimPost = slim.guides!.posts[0] as Partial<GuidePost>;
    expect(slimPost.body).toBeUndefined();
    expect(slimPost.faq).toBeUndefined();
    expect(slimPost.excerpt).toEqual(post.excerpt);
    expect(slimContentForEmbedding(sparse, true)).toBe(sparse);
    expect(slimContentForEmbedding(null, false)).toBeNull();
    expect(slimContentForEmbedding({ contact: DEFAULT_CONTENT.contact }, false)).toEqual({ contact: DEFAULT_CONTENT.contact });
  });
});
