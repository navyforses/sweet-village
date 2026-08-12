import { list, put } from "@vercel/blob";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const token = process.env.BLOB_READ_WRITE_TOKEN;
const shouldMigrate = process.env.VERCEL === "1" && Boolean(token) && process.env.SWEET_VILLAGE_SKIP_BLOB_MIGRATION !== "1";

if (!shouldMigrate) {
  console.log("[blob-build] skipped outside a Vercel build or by explicit local QA flag");
  process.exit(0);
}

const sourceFile = await readFile(path.join(root, "api", "blobSources.ts"), "utf8");
const sources = [...sourceFile.matchAll(/\["([^"]+)", "([^"]+)"\]/g)].map(([, pathname, source]) => ({ pathname, source }));
if (sources.length < 100) throw new Error(`[blob-build] expected 100+ source records, found ${sources.length}`);

const current = await list({ token, prefix: "sweet-village/", limit: 1000 });
const existing = new Map(current.blobs.map(blob => [blob.pathname, blob.url]));
const urls = [];

for (const [index, asset] of sources.entries()) {
  const cached = existing.get(asset.pathname);
  if (cached) {
    urls.push(cached);
    console.log(`[blob-build] [${index + 1}/${sources.length}] reused ${asset.pathname}`);
    continue;
  }
  const response = await fetch(asset.source);
  if (!response.ok) throw new Error(`[blob-build] source failed ${response.status}: ${asset.pathname}`);
  const blob = await put(asset.pathname, await response.arrayBuffer(), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: response.headers.get("content-type") ?? "application/octet-stream",
    token,
  });
  urls.push(blob.url);
  console.log(`[blob-build] [${index + 1}/${sources.length}] uploaded ${asset.pathname}`);
}

const firstUrl = urls[0];
if (!firstUrl) throw new Error("[blob-build] no Blob URLs were produced");
const origin = `${new URL(firstUrl).origin}/sweet-village`;
await writeFile(path.join(root, ".env.production.local"), `VITE_SWEET_VILLAGE_ASSET_ORIGIN=${origin}\n`);
console.log(`[blob-build] complete: ${sources.length} active photos; Vite origin=${origin}`);
