/**
 * Recursive object merge used for locale patches: authentic copy overlays at
 * build time and owner-edited texts at runtime. Arrays are treated as leaves
 * (replaced, never concatenated) so a patched list keeps its exact length.
 * Prototype-polluting keys are ignored because patches can come from the
 * database.
 */

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isSafeKey(key: string): boolean {
  return !UNSAFE_KEYS.has(key);
}

export function deepMerge<T extends Record<string, unknown>>(base: T, patch: Record<string, unknown>): T {
  const next: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (!isSafeKey(key)) continue;
    const current = next[key];
    next[key] = isRecord(value) && isRecord(current) ? deepMerge(current, value) : value;
  }
  return next as T;
}
