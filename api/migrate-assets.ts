import { put } from "@vercel/blob";
import { DISHES, MENU_ITEM_PHOTOS, PHOTOS } from "../client/src/lib/assets";
import { EVENT_TYPES, UNITS } from "../shared/venue";

const SOURCE_ORIGIN = "https://sweetvillage-pdzcphmy.manus.space";
const BATCH_SIZE = 5;

type ApiRequest = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

function stablePathname(legacyPath: string) {
  const filename = legacyPath.split("/").pop() ?? "asset";
  return `sweet-village/${filename.replace(/_[a-f0-9]{8}(?=\.[a-z0-9]+$)/i, "")}`;
}

export function activeBlobSources() {
  const legacy = [
    ...Object.values(PHOTOS),
    ...Object.values(DISHES),
    ...Object.values(MENU_ITEM_PHOTOS),
    ...UNITS.flatMap(unit => [unit.photo, ...unit.gallery]),
    ...EVENT_TYPES.map(event => event.photo),
  ].filter((value): value is string => value.startsWith("/manus-storage/"));

  return Array.from(new Set(legacy))
    .map(legacyPath => ({ pathname: stablePathname(legacyPath), source: `${SOURCE_ORIGIN}${legacyPath}` }))
    .sort((a, b) => a.pathname.localeCompare(b.pathname));
}

function requestedOffset(query: ApiRequest["query"]) {
  const raw = query?.offset;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number.parseInt(value ?? "0", 10);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : 0;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    res.status(503).json({ error: "Blob storage is not connected" });
    return;
  }

  const sources = activeBlobSources();
  const offset = requestedOffset(req.query);
  const batch = sources.slice(offset, offset + BATCH_SIZE);

  try {
    const uploaded = await Promise.all(
      batch.map(async ({ pathname, source }) => {
        const upstream = await fetch(source);
        if (!upstream.ok) throw new Error(`Could not fetch ${pathname}: ${upstream.status}`);
        const contents = await upstream.arrayBuffer();
        const blob = await put(pathname, contents, {
          access: "public",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: upstream.headers.get("content-type") ?? "application/octet-stream",
          token,
        });
        return blob.url;
      }),
    );

    const nextOffset = offset + batch.length;
    res.status(200).json({
      uploaded: uploaded.length,
      completed: nextOffset,
      total: sources.length,
      nextOffset: nextOffset < sources.length ? nextOffset : null,
      complete: nextOffset >= sources.length,
      publicOrigin: uploaded[0] ? new URL(uploaded[0]).origin : null,
    });
  } catch (error) {
    console.error("[blob-migration] batch failed", error);
    res.status(502).json({ error: "Photo batch could not be copied" });
  }
}
