/**
 * The translate endpoint accepts at most 3000 characters per item and
 * 12 000 per request; guide articles are longer. These helpers cut Markdown
 * on blank lines (never inside a paragraph) and group the pieces into
 * requests, so a long body is translated in a few round trips and joined
 * back in order.
 */
export const CHUNK_CHARS = 2500;
export const REQUEST_CHARS = 11_000;

function splitLongParagraph(paragraph: string, max: number): string[] {
  const pieces: string[] = [];
  let rest = paragraph;
  while (rest.length > max) {
    const window = rest.slice(0, max);
    const sentence = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "));
    const space = window.lastIndexOf(" ");
    const stop = sentence > max / 4 ? sentence : space;
    const cut = stop > max / 4 ? stop + 1 : max;
    pieces.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) pieces.push(rest);
  return pieces;
}

/** Splits text on blank lines into chunks of at most `max` characters, keeping paragraphs whole where possible. */
export function splitForTranslation(source: string, max = CHUNK_CHARS): string[] {
  const chunks: string[] = [];
  let current = "";
  for (const paragraph of source.split(/\n{2,}/)) {
    for (const piece of paragraph.length > max ? splitLongParagraph(paragraph, max) : [paragraph]) {
      if (!piece.trim()) continue;
      const candidate = current ? `${current}\n\n${piece}` : piece;
      if (candidate.length > max && current) {
        chunks.push(current);
        current = piece;
      } else {
        current = candidate;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/** Groups chunks into requests whose total length stays under `max`. */
export function batchChunks(chunks: string[], max = REQUEST_CHARS): string[][] {
  const batches: string[][] = [];
  let batch: string[] = [];
  let size = 0;
  for (const chunk of chunks) {
    if (batch.length && size + chunk.length > max) {
      batches.push(batch);
      batch = [];
      size = 0;
    }
    batch.push(chunk);
    size += chunk.length;
  }
  if (batch.length) batches.push(batch);
  return batches;
}
