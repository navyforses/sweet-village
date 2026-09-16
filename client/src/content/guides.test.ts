import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT } from "@shared/content";
import { resolveContent, resolveVenue, sanitizeSparse } from "./resolve";

describe("guides in the venue view", () => {
  it("resolves every seed guide in Georgian and English, newest first, hidden ones dropped", () => {
    const en = resolveVenue(resolveContent(DEFAULT_CONTENT, {}), "en");
    expect(en.guides).toHaveLength(6);
    expect(en.guides.every(guide => guide.available && guide.langs.join() === "ka,en")).toBe(true);
    expect(en.guides[0].body).toContain("## ");
    expect(en.guides.find(guide => guide.slug === "prometheus-cave")?.faq).toHaveLength(3);

    const hidden = { guides: { posts: DEFAULT_CONTENT.guides.posts.map((post, i) => (i === 0 ? { ...post, hidden: true } : post)) } };
    expect(resolveVenue(resolveContent(DEFAULT_CONTENT, hidden), "ka").guides).toHaveLength(5);
  });

  it("falls back to English for untranslated languages and marks them unavailable", () => {
    const ru = resolveVenue(resolveContent(DEFAULT_CONTENT, {}), "ru");
    const guide = ru.guides.find(item => item.slug === "prometheus-cave")!;
    expect(guide.available).toBe(false);
    expect(guide.title).toBe(DEFAULT_CONTENT.guides.posts[0].title.en);
    expect(guide.body).toBe(DEFAULT_CONTENT.guides.posts[0].body.en);
  });

  it("tolerates embedded content whose guides carry no bodies", () => {
    const posts = DEFAULT_CONTENT.guides.posts.map(({ body: _body, faq: _faq, ...rest }) => rest);
    const sparse = sanitizeSparse({ guides: { posts } });
    expect(sparse.guides?.posts).toHaveLength(6);
    const venue = resolveVenue(resolveContent(DEFAULT_CONTENT, sparse), "en");
    expect(venue.guides[0].body).toBe("");
    expect(venue.guides[0].faq).toEqual([]);
    expect(venue.guides[0].available).toBe(false);
    expect(venue.guides[0].excerpt.length).toBeGreaterThan(10);
  });

  it("rejects malformed guide sections structurally", () => {
    expect(sanitizeSparse({ guides: { posts: [{ slug: 1 }] } }).guides).toBeUndefined();
    expect(sanitizeSparse({ guides: { posts: "nope" } }).guides).toBeUndefined();
  });
});
