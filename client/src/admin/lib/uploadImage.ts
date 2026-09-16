import { upload } from "@vercel/blob/client";
import { CSRF_HEADER, CSRF_VALUE } from "../api";
import { prepareImage, uploadPathname, looksLikeImage } from "./imageCompress";

export const UPLOAD_MAX_BYTES = 8 * 1024 * 1024;

export type UploadPhase = "preparing" | "uploading";

export class UploadError extends Error {
  constructor(public readonly code: "not_image" | "too_large" | "blob_missing" | "unauthorized" | "failed") {
    super(code);
    this.name = "UploadError";
  }
}

/**
 * Downscales the photo in the browser, then uploads it straight to Vercel
 * Blob using a token minted by /api/admin/upload (cookie + CSRF protected).
 * Resolves with the public URL to store in the content model.
 */
export async function uploadImage(
  file: File,
  onProgress?: (phase: UploadPhase, percentage: number) => void,
): Promise<string> {
  if (!looksLikeImage(file)) throw new UploadError("not_image");
  onProgress?.("preparing", 0);
  const prepared = await prepareImage(file).catch(() => {
    throw new UploadError("not_image");
  });
  if (prepared.blob.size > UPLOAD_MAX_BYTES) throw new UploadError("too_large");

  onProgress?.("uploading", 0);
  try {
    const result = await upload(uploadPathname(file.name, prepared.extension), prepared.blob, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
      contentType: prepared.contentType,
      headers: { [CSRF_HEADER]: CSRF_VALUE },
      onUploadProgress: progress => onProgress?.("uploading", Math.round(progress.percentage)),
    });
    return result.url;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/401|unauthorized/i.test(message)) throw new UploadError("unauthorized");
    if (/503|blob_not_configured/i.test(message)) throw new UploadError("blob_missing");
    console.error("[admin] upload failed", error);
    throw new UploadError("failed");
  }
}
