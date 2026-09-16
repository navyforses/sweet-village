/**
 * Pure helpers behind the "page texts" editor. The owner edits one locale
 * dictionary section at a time; only the leaves that differ from the
 * compiled defaults are stored, as a deep-partial patch that
 * `I18nProvider` merges on top of the static dictionary.
 *
 * Arrays are merge leaves (see shared/deepMerge.ts), so whenever anything
 * inside an array changes the whole array is emitted.
 */
import { LANGS, type Lang, type LocalizedText } from "@shared/langs";
import type { LocalePatch, TextsSection } from "@shared/content";
import { isRecord } from "@shared/deepMerge";

export type Dictionary = Record<string, unknown>;

export interface TextLeaf {
  /** Dotted path inside the section, e.g. "items.0.title". */
  path: string;
  /** Form-safe key (no dots). */
  key: string;
  /** Compiled default per language. */
  defaults: LocalizedText;
}

export const leafKey = (path: string) => path.replace(/\./g, "__");

function walk(value: unknown, prefix: string, out: string[]) {
  if (typeof value === "string") {
    out.push(prefix);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, prefix ? `${prefix}.${index}` : String(index), out));
  } else if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) walk(child, prefix ? `${prefix}.${key}` : key, out);
  }
}

export function getPath(value: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (Array.isArray(current)) return current[Number(segment)];
    return isRecord(current) ? current[segment] : undefined;
  }, value);
}

/** Every string leaf of `section` in the Georgian dictionary, with defaults from all six dictionaries. */
export function collectLeaves(dicts: Record<Lang, Dictionary>, section: string): TextLeaf[] {
  const paths: string[] = [];
  walk(dicts.ka[section], "", paths);
  return paths.map(path => ({
    path,
    key: leafKey(path),
    defaults: Object.fromEntries(LANGS.map(lang => [lang, String(getPath(dicts[lang][section], path) ?? "")])) as LocalizedText,
  }));
}

export type TextFormValues = { fields: Record<string, LocalizedText> };

/** Current owner overrides per leaf ("" when the default is in use). */
export function toTextForm(texts: TextsSection, section: string, leaves: TextLeaf[]): TextFormValues {
  const fields: Record<string, LocalizedText> = {};
  for (const leaf of leaves) {
    fields[leaf.key] = Object.fromEntries(
      LANGS.map(lang => {
        const current = getPath(texts[lang]?.[section], leaf.path);
        return [lang, typeof current === "string" ? current : ""];
      }),
    ) as LocalizedText;
  }
  return { fields };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function setPath(target: unknown, path: string[], value: string) {
  let current = target;
  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index];
    current = Array.isArray(current) ? current[Number(segment)] : isRecord(current) ? current[segment] : undefined;
    if (current === undefined) return;
  }
  const last = path[path.length - 1];
  if (Array.isArray(current)) current[Number(last)] = value;
  else if (isRecord(current)) current[last] = value;
}

/** Minimal patch turning `base` into `edited`; arrays are emitted whole when anything inside changed. */
export function diffPatch(base: unknown, edited: unknown): unknown {
  if (typeof base === "string" || typeof edited === "string") return base === edited ? undefined : edited;
  if (Array.isArray(base) && Array.isArray(edited)) {
    return JSON.stringify(base) === JSON.stringify(edited) ? undefined : edited;
  }
  if (isRecord(base) && isRecord(edited)) {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(edited)) {
      const child = diffPatch(base[key], edited[key]);
      if (child !== undefined) out[key] = child;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return undefined;
}

/**
 * Writes the edited leaves of one section back into the full `texts` value,
 * leaving every other section untouched. Empty fields fall back to the
 * compiled default and therefore disappear from the patch.
 */
export function fromTextForm(
  texts: TextsSection,
  dicts: Record<Lang, Dictionary>,
  section: string,
  leaves: TextLeaf[],
  values: TextFormValues,
): TextsSection {
  const next: TextsSection = {};
  for (const lang of LANGS) {
    const base = dicts[lang][section];
    const edited = clone(base);
    for (const leaf of leaves) {
      const value = values.fields[leaf.key]?.[lang]?.trim();
      if (value) setPath(edited, leaf.path.split("."), value);
    }
    const sectionPatch = diffPatch(base, edited);
    const rest: LocalePatch = { ...(texts[lang] ?? {}) };
    delete rest[section];
    if (sectionPatch !== undefined) rest[section] = sectionPatch as LocalePatch;
    if (Object.keys(rest).length) next[lang] = rest;
  }
  return next;
}

/** Counts leaves the owner has overridden in any language. */
export function countOverrides(values: TextFormValues): number {
  return Object.values(values.fields).filter(field => LANGS.some(lang => field[lang]?.trim())).length;
}
