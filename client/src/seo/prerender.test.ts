import { describe, expect, it } from "vitest";
import { DEFAULT_CONTENT } from "@shared/content";
import { assembleDocument, embedJson, listPublicPages, outputFileFor, sitemapLastmod, sitemapXml } from "./prerender";

describe("prerender helpers", () => {
  it("lists every static and dynamic page in every language", () => {
    const pages = listPublicPages(DEFAULT_CONTENT);
    // 9 static routes + 5 units + 7 events + 6 guides, times 6 languages; guides are only indexable in Georgian and English.
    expect(pages).toHaveLength((9 + 5 + 7 + 6) * 6);
    expect(pages.filter(page => page.lang === "ka")).toHaveLength(21 + 6);
    expect(pages.some(page => page.lang === "ar" && page.path === "/events/wedding")).toBe(true);
    expect(pages.some(page => page.lang === "ar" && page.path === "/guides")).toBe(true);
    const cave = pages.filter(page => page.path === "/guides/prometheus-cave");
    expect(cave.filter(page => !page.noindex).map(page => page.lang)).toEqual(["ka", "en"]);
    expect(cave.filter(page => page.noindex).map(page => page.lang)).toEqual(["ru", "ar", "fr", "es"]);
    expect(cave[0].lastmod).toBe("2026-09-16");
  });

  it("maps pages to directory index files", () => {
    expect(outputFileFor({ lang: "ka", path: "/" })).toBe("index.html");
    expect(outputFileFor({ lang: "ka", path: "/stay/grand" })).toBe("stay/grand/index.html");
    expect(outputFileFor({ lang: "en", path: "/" })).toBe("en/index.html");
    expect(outputFileFor({ lang: "fr", path: "/menu" })).toBe("fr/menu/index.html");
  });

  it("derives lastmod from the Postgres text timestamp and never throws", () => {
    const build = new Date("2026-09-16T12:00:00Z");
    expect(sitemapLastmod("2026-09-01 19:00:00.123456+00", build)).toBe("2026-09-01");
    expect(sitemapLastmod("2026-09-01 23:30:00+00", build)).toBe("2026-09-01");
    expect(sitemapLastmod(null, build)).toBe("2026-09-16");
    expect(sitemapLastmod("not a date", build)).toBe("2026-09-16");
  });

  it("skips hidden guides and guides without a body in that language", () => {
    const content = {
      ...DEFAULT_CONTENT,
      guides: {
        posts: [
          { ...DEFAULT_CONTENT.guides.posts[0], hidden: true },
          { ...DEFAULT_CONTENT.guides.posts[1], body: { ...DEFAULT_CONTENT.guides.posts[1].body, en: "" } },
        ],
      },
    };
    const guidePages = listPublicPages(content).filter(page => page.path.startsWith("/guides/"));
    expect(guidePages).toHaveLength(6);
    expect(guidePages.filter(page => !page.noindex)).toEqual([{ lang: "ka", path: `/guides/${DEFAULT_CONTENT.guides.posts[1].slug}`, lastmod: "2026-09-16" }]);
  });

  it("uses the page's own lastmod and the first available language as x-default", () => {
    const xml = sitemapXml([{ lang: "en", path: "/guides/only-english", lastmod: "2026-01-02" }], "2026-09-16");
    expect(xml).toContain("<lastmod>2026-01-02</lastmod>");
    expect(xml).toContain('hreflang="x-default" href="https://www.sweet-village.com/en/guides/only-english"');
    expect(xml).not.toContain('hreflang="ka"');
  });

  it("writes a sitemap with hreflang alternates for each URL", () => {
    const xml = sitemapXml(
      [
        { lang: "ka", path: "/pool" },
        { lang: "en", path: "/pool" },
      ],
      "2026-09-16",
    );
    expect(xml).toContain("<loc>https://www.sweet-village.com/pool</loc>");
    expect(xml).toContain("<loc>https://www.sweet-village.com/en/pool</loc>");
    expect(xml.match(/<url>/g)).toHaveLength(2);
    expect(xml.match(/hreflang="x-default"/g)).toHaveLength(2);
    expect(xml).toContain('hreflang="en" href="https://www.sweet-village.com/en/pool"');
    expect(xml).toContain("<lastmod>2026-09-16</lastmod>");
  });

  it("assembles the shell with language, head tags, markup and embedded content", () => {
    const template = '<!doctype html>\n<html lang="ka">\n<head>\n<meta charset="UTF-8" />\n</head>\n<body>\n<div id="root"></div>\n</body>\n</html>';
    const html = assembleDocument({
      template,
      lang: "ar",
      head: "<title>عنوان</title><meta name=\"description\" content=\"x\"/>",
      body: "<div><h1>Hi</h1></div>",
      content: { contact: { note: "</script><b>" } },
      embeddedId: "sv-content",
    });
    expect(html).toContain('<html lang="ar" dir="rtl"');
    expect(html).toContain("<title>عنوان</title><meta name=\"description\" content=\"x\"/>\n  </head>");
    expect(assembleDocument({ template, lang: "en", head: '<link rel="alternate" hrefLang="en" href="/en"/>', body: "", content: null, embeddedId: "x" })).toContain('hreflang="en"');
    expect(html).toContain('<div id="root"><div><h1>Hi</h1></div></div><script id="sv-content" type="application/json">');
    expect(html).not.toContain("</script><b>");
    expect(html).toContain("\\u003c/script>\\u003cb>");
    expect(assembleDocument({ template, lang: "en", head: "", body: "", content: null, embeddedId: "x" })).not.toContain("application/json");
    expect(embedJson({ a: "\u2028" })).toBe('{"a":"\\u2028"}');
  });
});
