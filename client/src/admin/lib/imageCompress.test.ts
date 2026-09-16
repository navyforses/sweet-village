import { describe, expect, it } from "vitest";
import { UPLOAD_PATHNAME } from "../../../../api/_lib/admin/upload";
import { shortId, slugifyFilename, uploadPathname } from "./imageCompress";

describe("upload file naming", () => {
  it("turns any file name into an ASCII slug", () => {
    expect(slugifyFilename("IMG_2048.HEIC")).toBe("img-2048");
    expect(slugifyFilename("აუზი საღამოს.jpg")).toBe("photo");
    expect(slugifyFilename("Pool View -- House (final).PNG")).toBe("pool-view-house-final");
    expect(slugifyFilename("x".repeat(100) + ".jpg")).toHaveLength(48);
  });

  it("produces pathnames the upload endpoint accepts", () => {
    const now = new Date("2026-09-16T12:00:00Z");
    for (const name of ["IMG_2048.HEIC", "კოტეჯი.jpg", "___.png", "a b c.webp"]) {
      const pathname = uploadPathname(name, "webp", now);
      expect(pathname.startsWith("sweet-village/uploads/2026/")).toBe(true);
      expect(pathname).toMatch(UPLOAD_PATHNAME);
    }
    expect(uploadPathname("x.jpg", "jpg", now)).toMatch(UPLOAD_PATHNAME);
  });

  it("generates distinct short ids", () => {
    const ids = new Set(Array.from({ length: 50 }, () => shortId()));
    expect(ids.size).toBe(50);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]{6}$/);
  });
});
