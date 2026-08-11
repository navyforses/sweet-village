/**
 * Uploads the Sweet Village photo archive to a public Vercel Blob store.
 *
 * Prerequisites:
 *   1. Create a Blob store in the Sweet Village Vercel project.
 *   2. Export its BLOB_READ_WRITE_TOKEN in the current shell.
 *   3. Run: pnpm assets:migrate:vercel-blob
 *
 * The script preserves a stable, suffix-free pathname for each image and
 * writes a URL manifest that records the deployed public Blob origin.
 */
import { put } from "@vercel/blob";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const assetDirectory = process.env.SWEET_VILLAGE_ASSET_DIR ?? "/home/ubuntu/webdev-static-assets/sweet-village";
const manifestPath = process.env.SWEET_VILLAGE_BLOB_MANIFEST ?? path.join(projectRoot, "scripts", "vercel-blob-manifest.json");
const dryRun = process.argv.includes("--dry-run");

const MIME_TYPES = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function contentTypeFor(filename) {
  return MIME_TYPES[path.extname(filename).toLowerCase()] ?? "application/octet-stream";
}

function blobPathname(filename) {
  return `sweet-village/${filename}`;
}

function publicOrigin(url) {
  const parsed = new URL(url);
  return `${parsed.protocol}//${parsed.host}/sweet-village`;
}

async function getPhotoFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!MIME_TYPES[ext]) continue;
    files.push(entry.name);
  }
  return files.sort((a, b) => a.localeCompare(b));
}

async function main() {
  const files = await getPhotoFiles(assetDirectory);
  if (files.length === 0) throw new Error(`No supported image files found in ${assetDirectory}`);
  if (!dryRun && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required. Create a Vercel Blob store, then add its read/write token before retrying.");
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    sourceDirectory: assetDirectory,
    access: "public",
    files: [],
  };

  for (const [index, filename] of files.entries()) {
    const source = path.join(assetDirectory, filename);
    const contents = await readFile(source);
    const fileStat = await stat(source);
    const pathname = blobPathname(filename);
    const sha256 = createHash("sha256").update(contents).digest("hex");
    const prefix = `[${String(index + 1).padStart(3, "0")}/${files.length}]`;

    if (dryRun) {
      console.log(`${prefix} planned ${pathname}`);
      manifest.files.push({ filename, pathname, size: fileStat.size, sha256, url: null });
      continue;
    }

    const blob = await put(pathname, contents, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentTypeFor(filename),
      multipart: fileStat.size >= 10 * 1024 * 1024,
    });
    console.log(`${prefix} uploaded ${blob.url}`);
    manifest.files.push({ filename, pathname, size: fileStat.size, sha256, url: blob.url });
  }

  if (!dryRun && manifest.files[0]?.url) manifest.publicOrigin = publicOrigin(manifest.files[0].url);
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\n${dryRun ? "Plan" : "Manifest"} written to ${manifestPath}`);
  if (!dryRun) console.log(`Set VITE_SWEET_VILLAGE_ASSET_ORIGIN=${manifest.publicOrigin}`);
}

main().catch(error => {
  console.error("Vercel Blob migration failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
