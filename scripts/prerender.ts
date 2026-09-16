/**
 * Build step: renders every public page in every language to static HTML so
 * search engines and link previews get the full document without running
 * JavaScript. Runs after `vite build` (client) and `vite build --ssr`.
 *
 * Content: when NEON_DATABASE_URL is available at build time the owner's
 * saved sections are baked in (and embedded for hydration); otherwise the
 * compile-time defaults are used. Either way the browser still refreshes
 * from /api/content after hydration.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DEFAULT_CONTENT, type SparseContent } from "../shared/content";
import { readAllSections } from "../api/_lib/content";
import { getSql } from "../api/_lib/db";
import { resolveContent } from "../client/src/content/resolve";
import { EMBEDDED_CONTENT_ID } from "../client/src/content/ContentProvider";
import { assembleDocument, listPublicPages, outputFileFor, sitemapXml, type PageEntry } from "../client/src/seo/prerender";
import type { RenderResult } from "../client/src/entry-server";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist", "public");
const serverEntry = path.join(root, "dist", "server", "entry-server.js");

async function loadContent(): Promise<{ sparse: SparseContent | null; updatedAt: string | null }> {
  const sql = await getSql();
  if (!sql) {
    console.log("[prerender] NEON_DATABASE_URL not set — rendering compile-time defaults");
    return { sparse: null, updatedAt: null };
  }
  try {
    const stored = await readAllSections(sql);
    console.log(`[prerender] baked ${Object.keys(stored.sections).length} saved section(s) from the database`);
    return { sparse: stored.sections, updatedAt: stored.updatedAt };
  } catch (error) {
    console.warn("[prerender] database read failed — rendering compile-time defaults", error);
    return { sparse: null, updatedAt: null };
  }
}

async function main() {
  const template = await readFile(path.join(outDir, "index.html"), "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error("[prerender] dist/public/index.html is not the SPA shell");
  const { render } = (await import(pathToFileURL(serverEntry).href)) as { render: (url: string, content: SparseContent | null) => Promise<RenderResult> };

  const { sparse, updatedAt } = await loadContent();
  const content = resolveContent(DEFAULT_CONTENT, sparse ?? {});
  const pages = listPublicPages(content);

  // The admin panel keeps the empty shell: it renders client-side only.
  await mkdir(path.join(outDir, "admin"), { recursive: true });
  await writeFile(path.join(outDir, "admin", "index.html"), template);

  const started = Date.now();
  for (const page of pages) {
    const url = page.lang === "ka" ? page.path : `/${page.lang}${page.path === "/" ? "" : page.path}`;
    const { head, body } = await render(url, sparse);
    if (!head.includes("<title>")) throw new Error(`[prerender] ${url} rendered without a <title>`);
    const file = path.join(outDir, outputFileFor(page));
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, assembleDocument({ template, lang: page.lang, head, body, content: sparse, embeddedId: EMBEDDED_CONTENT_ID }));
  }

  // Not-found page (Georgian, noindex) for any path that has no static file.
  const notFound = await render("/404", sparse);
  await writeFile(path.join(outDir, "404.html"), assembleDocument({ template, lang: "ka", head: notFound.head, body: notFound.body, content: sparse, embeddedId: EMBEDDED_CONTENT_ID }));

  const lastmod = (updatedAt ? new Date(updatedAt.replace(" ", "T")) : new Date()).toISOString().slice(0, 10);
  const publicPages: PageEntry[] = pages.filter(page => page.path !== "/booking");
  await writeFile(path.join(outDir, "sitemap.xml"), sitemapXml(publicPages, lastmod));

  console.log(`[prerender] wrote ${pages.length} pages + 404 + sitemap in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
