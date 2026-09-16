import { describe, expect, it } from "vitest";
import { batchChunks, splitForTranslation } from "./translateChunks";

describe("translation chunking", () => {
  it("keeps short text as one chunk and splits long text on blank lines", () => {
    expect(splitForTranslation("## Title\n\nOne paragraph.")).toEqual(["## Title\n\nOne paragraph."]);
    const paragraphs = Array.from({ length: 8 }, (_, i) => `Paragraph ${i} ${"x".repeat(600)}`);
    const chunks = splitForTranslation(paragraphs.join("\n\n"), 2500);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.every(chunk => chunk.length <= 2500)).toBe(true);
    expect(chunks.join("\n\n")).toBe(paragraphs.join("\n\n"));
  });

  it("cuts a single oversized paragraph at sentence ends", () => {
    const sentence = "This is a sentence that goes on for a while. ";
    const long = sentence.repeat(80).trim();
    const chunks = splitForTranslation(long, 500);
    expect(chunks.every(chunk => chunk.length <= 500)).toBe(true);
    expect(chunks.every(chunk => chunk.endsWith("."))).toBe(true);
    expect(chunks.join(" ")).toBe(long);
  });

  it("groups chunks into requests under the size limit, preserving order", () => {
    const chunks = ["a".repeat(4000), "b".repeat(4000), "c".repeat(4000), "d".repeat(100)];
    expect(batchChunks(chunks, 11_000)).toEqual([[chunks[0], chunks[1]], [chunks[2], chunks[3]]]);
    expect(batchChunks([], 11_000)).toEqual([]);
  });
});
