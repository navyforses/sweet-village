import { describe, expect, it } from "vitest";
import { deepMerge, isRecord, isSafeKey } from "./deepMerge";

describe("deepMerge", () => {
  it("merges nested objects and replaces arrays as leaves", () => {
    const base = { hero: { title: "a", subtitle: "b" }, items: ["x", "y"], keep: 1 };
    const patch = { hero: { title: "A" }, items: ["z"] };
    expect(deepMerge(base, patch)).toEqual({ hero: { title: "A", subtitle: "b" }, items: ["z"], keep: 1 });
  });

  it("does not mutate its inputs", () => {
    const base = { nested: { value: 1 } };
    const patch = { nested: { value: 2 } };
    const merged = deepMerge(base, patch);
    expect(base.nested.value).toBe(1);
    expect(merged.nested.value).toBe(2);
    expect(merged.nested).not.toBe(base.nested);
  });

  it("ignores prototype-polluting keys", () => {
    const patch = JSON.parse('{"__proto__": {"polluted": true}, "constructor": {"x": 1}, "safe": "ok"}');
    const merged = deepMerge({ safe: "no" }, patch);
    expect(merged.safe).toBe("ok");
    expect((merged as Record<string, unknown>).polluted).toBeUndefined();
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(isSafeKey("__proto__")).toBe(false);
    expect(isSafeKey("title")).toBe(true);
  });

  it("recognises plain records only", () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord([])).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isRecord("x")).toBe(false);
  });
});
