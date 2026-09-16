import { LANGS, type Lang } from "@shared/langs";
import { guideAvailableIn, type SiteContent } from "@shared/content";
import { isRtl } from "@shared/langsRtl";
import { canonicalUrl, localePath, PUBLIC_ROUTES } from "@/i18n/paths";

export interface PageEntry {
  lang: Lang;
  /** Language-relative path ("/stay/grand"). */
  path: string;
  /** YYYY-MM-DD override for the sitemap; guides carry their own date. */
  lastmod?: string;
  /** Rendered (so the language switcher never lands on a 404) but kept out of the sitemap: a guide in a language it is not written in. */
  noindex?: boolean;
}

/**
 * Every public page in every language: the static routes plus the content's
 * units and events exist in all six languages. Guides are rendered in every
 * language too, but only the languages they are written in are indexable;
 * the rest show the fallback text with a notice and `noindex`.
 */
export function listPublicPages(content: SiteContent): PageEntry[] {
  const paths: string[] = [
    ...PUBLIC_ROUTES,
    ...content.units.units.map(unit => `/stay/${unit.id}`),
    ...content.events.events.map(event => `/events/${event.id}`),
  ];
  const pages: PageEntry[] = LANGS.flatMap(lang => paths.map(path => ({ lang, path })));
  for (const post of content.guides.posts) {
    if (post.hidden) continue;
    for (const lang of LANGS) {
      const path = `/guides/${post.slug}`;
      pages.push(guideAvailableIn(post, lang) ? { lang, path, lastmod: post.updatedAt } : { lang, path, lastmod: post.updatedAt, noindex: true });
    }
  }
  return pages;
}

/** True for article pages, whose embedded content must keep the article bodies. */
export function isGuidePage(path: string): boolean {
  return path.startsWith("/guides/");
}

/** File the page is written to, relative to the output directory ("en/stay/index.html"). */
export function outputFileFor(entry: PageEntry): string {
  const site = localePath(entry.lang, entry.path).replace(/^\//, "");
  return site ? `${site}/index.html` : "index.html";
}

/**
 * `<lastmod>` date (YYYY-MM-DD) from the newest `site_content.updated_at`,
 * which arrives as Postgres text ("2026-09-16 19:00:00.123456+00"). Anything
 * unparseable falls back to the build date rather than failing the build.
 */
export function sitemapLastmod(updatedAt: string | null | undefined, now = new Date()): string {
  const parsed = updatedAt ? new Date(updatedAt) : now;
  return (Number.isNaN(parsed.getTime()) ? now : parsed).toISOString().slice(0, 10);
}

export function sitemapXml(pages: PageEntry[], lastmod: string): string {
  const byPath = new Map<string, PageEntry[]>();
  for (const page of pages) byPath.set(page.path, [...(byPath.get(page.path) ?? []), page]);
  const urls = pages.map(page => {
    const siblings = byPath.get(page.path) ?? [page];
    // x-default is Georgian when the page exists in Georgian, otherwise the first language it exists in.
    const fallback = siblings.find(alt => alt.lang === "ka") ?? siblings[0];
    const alternates = siblings
      .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${canonicalUrl(alt.lang, alt.path)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(fallback.lang, page.path)}"/>`)
      .join("\n");
    return `  <url>\n    <loc>${canonicalUrl(page.lang, page.path)}</loc>\n    <lastmod>${page.lastmod ?? lastmod}</lastmod>\n${alternates}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

/** JSON that is safe inside a <script> element. */
export function embedJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export interface AssembleInput {
  template: string;
  lang: Lang;
  head: string;
  body: string;
  /** Sparse saved sections embedded for hydration; null when nothing is saved. */
  content: unknown;
  embeddedId: string;
}

/** Puts a rendered page into the Vite-built index.html shell. */
export function assembleDocument({ template, lang, head, body, content, embeddedId }: AssembleInput): string {
  const dir = isRtl(lang) ? "rtl" : "ltr";
  const embedded = content ? `<script id="${embeddedId}" type="application/json">${embedJson(content)}</script>` : "";
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}" dir="${dir}"`)
    .replace("</head>", `${lowercaseAttributes(head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${lowercaseAttributes(body)}</div>${embedded}`);
}

/** React writes a few attributes camel-cased in static markup; browsers accept either, validators prefer lowercase. */
export function lowercaseAttributes(html: string): string {
  return html.replace(/ (hrefLang|imageSrcSet|imageSizes|fetchPriority)=/g, (_, name: string) => ` ${name.toLowerCase()}=`);
}
