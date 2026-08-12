import { list } from "@vercel/blob";
import { describe, expect, it } from "vitest";

describe("Vercel Blob credentials", () => {
  const runLiveCredentialValidation = process.env.VALIDATE_VERCEL_BLOB_TOKEN === "1";

  it.runIf(runLiveCredentialValidation)("can read the connected Blob store with the configured write token", async () => {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    expect(token).toBeTruthy();

    const result = await list({ token, limit: 1 });
    expect(Array.isArray(result.blobs)).toBe(true);
  });
});
