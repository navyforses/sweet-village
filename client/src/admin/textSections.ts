import type { TranslateKind } from "./api";
import { S } from "./strings";

/** Dictionary sections the owner may edit, in display order. UI chrome (nav, common, footer, notFound) stays in code. */
export const TEXT_SECTIONS = ["hero", "highlights", "services", "stay", "events", "pool", "restaurant", "menu", "location", "about", "booking", "gallery", "brand", "meta"] as const;
export type TextSectionKey = (typeof TEXT_SECTIONS)[number];

export const isTextSection = (value: string): value is TextSectionKey => (TEXT_SECTIONS as readonly string[]).includes(value);

export const textSectionLabel = (section: string) => S.texts.sections[section] ?? section;

/** Picks a translator register and input size from the leaf name and its default length. */
export function leafPresentation(path: string, sample: string): { kind: TranslateKind; multiline: boolean; maxLength: number } {
  const last = path.split(".").pop() ?? "";
  const multiline = sample.length > 90 || /^(body\d*|intro|description|subtitle|limitBody|qrBody|noAlcoholNote|successBody|fallbackBody|errorBody)$/.test(last);
  const kind: TranslateKind = /^(title|eyebrow|name|tagline|cta|ctaPrimary|ctaSecondary)$/.test(last) ? "title" : multiline ? "body" : "label";
  return { kind, multiline, maxLength: multiline ? 1200 : 200 };
}

/** Human-readable label for a leaf path: "items › 1 › title". */
export function leafLabel(path: string): string {
  return path
    .split(".")
    .map(segment => (/^\d+$/.test(segment) ? String(Number(segment) + 1) : segment))
    .join(" › ");
}
