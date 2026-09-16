import type { IncomingMessage } from "node:http";
import { assertMutationAllowed, getAdminSession } from "../adminAuth.js";
import { isRecord, methodNotAllowed, parseBody, type ApiRequest, type ApiResponse } from "../http.js";

/** Owner uploads live under one prefix, one folder per year, ASCII slug names only. */
export const UPLOAD_PATHNAME = /^sweet-village\/uploads\/\d{4}\/[a-z0-9][a-z0-9-]{0,79}\.(webp|jpg|jpeg|png)$/;
export const UPLOAD_MAX_BYTES = 8 * 1024 * 1024;
export const UPLOAD_CONTENT_TYPES = ["image/webp", "image/jpeg", "image/png"];

/**
 * Token endpoint for Vercel Blob client uploads. The browser asks for a
 * scoped upload token (cookie + CSRF header required), uploads straight to
 * Blob (so the 4.5 MB function body limit never applies), and stores the
 * returned public URL in the content it is editing.
 */
export async function upload(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }
  const body = parseBody(req.body);
  if (!isRecord(body) || body.type !== "blob.generate-client-token") {
    res.status(400).json({ error: "unsupported_event" });
    return;
  }
  const csrf = assertMutationAllowed(req);
  if (!csrf.ok) {
    res.status(403).json({ error: csrf.error });
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    res.status(503).json({ error: "blob_not_configured" });
    return;
  }

  try {
    const { handleUpload } = await import("@vercel/blob/client");
    const result = await handleUpload({
      token,
      request: req as unknown as IncomingMessage,
      body: body as unknown as Parameters<typeof handleUpload>[0]["body"],
      onBeforeGenerateToken: async pathname => {
        if (!UPLOAD_PATHNAME.test(pathname)) throw new Error("invalid_pathname");
        return {
          allowedContentTypes: UPLOAD_CONTENT_TYPES,
          maximumSizeInBytes: UPLOAD_MAX_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
          tokenPayload: JSON.stringify({ by: "owner", session: session.jti }),
        };
      },
    });
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "invalid_pathname") {
      res.status(422).json({ error: "invalid_pathname" });
      return;
    }
    console.error("[admin:upload] token generation failed", error);
    res.status(502).json({ error: "upload_unavailable" });
  }
}
