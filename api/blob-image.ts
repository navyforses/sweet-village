import { list } from "@vercel/blob";

type ApiRequest = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  redirect(code: number, url: string): void;
  json(body: unknown): void;
};

function assetPath(query: ApiRequest["query"]) {
  const raw = query?.path;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.startsWith("sweet-village/") ? value : null;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const pathname = assetPath(req.query);
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!pathname || !token) {
    res.status(404).json({ error: "Asset unavailable" });
    return;
  }

  try {
    const result = await list({ token, prefix: pathname, limit: 2 });
    const blob = result.blobs.find(candidate => candidate.pathname === pathname);
    if (!blob) {
      res.status(404).json({ error: "Asset unavailable" });
      return;
    }
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.redirect(307, blob.url);
  } catch (error) {
    console.error("[blob-image] lookup failed", error);
    res.status(502).json({ error: "Asset lookup failed" });
  }
}
