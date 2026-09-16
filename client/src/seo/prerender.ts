import { LANGS, type Lang } from "@shared/langs";
import type { SiteContent } from "@shared/content";
import { isRtl } from "@shared/langsRtl";
import { canonicalUrl, localePath, PUBLIC_ROUTES } from "@/i18n/paths";

export interface PageEntry {
  lang: Lang;
  /** Language-relative path ("/stay/grand"). */
  path: string;
}

/** Every public page in every language, from the static routes plus the content's units and events. */
export function listPublicPages(content: SiteContent): PageEntry[] {
  const paths: string[] = [
    ...PUBLIC_ROUTES,
    ...content.units.units.map(unit => `/stay/${unit.id}`),
    ...content.events.events.map(event => `/events/${event.id}`),
  ];
  return LANGS.flatMap(lang => paths.map(path => ({ lang, path })));
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
    const alternates = (byPath.get(page.path) ?? [])
      .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${canonicalUrl(alt.lang, alt.path)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl("ka", page.path)}"/>`)
      .join("\n");
    return `  <url>\n    <loc>${canonicalUrl(page.lang, page.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`;
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
    .replace("</head>", `${head.replace(/ hrefLang=/g, " hreflang=")}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>${embedded}`);
}
