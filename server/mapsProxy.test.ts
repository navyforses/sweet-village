import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { registerMapsProxy } from "./mapsProxy";

type Handler = (req: any, res: any) => Promise<void> | void;

/** Minimal Express stand-in: captures the single GET handler we register. */
function mountProxy() {
  let handler: Handler | null = null;
  const app = {
    get(path: string, h: Handler) {
      if (path === "/api/maps/js") handler = h;
    },
  };
  registerMapsProxy(app as never);
  if (!handler) throw new Error("handler not registered");
  return handler;
}

/**
 * The proxy caches per libraries key, so each test needs its own key to stay
 * independent of the ones before it.
 */
let libCounter = 0;

function mockReq(overrides: Record<string, string> = {}) {
  return {
    protocol: "https",
    query: { libraries: `marker-${++libCounter}` },
    get: (h: string) => overrides[h.toLowerCase()],
  };
}

function mockRes() {
  const state = { status: 0, body: "", type: "", headers: {} as Record<string, string> };
  const res = {
    status(code: number) {
      state.status = code;
      return res;
    },
    type(t: string) {
      state.type = t;
      return res;
    },
    set(k: string, v: string) {
      state.headers[k] = v;
      return res;
    },
    send(b: string) {
      state.body = b;
      return res;
    },
  };
  return { res, state };
}

describe("maps proxy", () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.VITE_FRONTEND_FORGE_API_URL;
  const originalKey = process.env.VITE_FRONTEND_FORGE_API_KEY;

  beforeEach(() => {
    process.env.VITE_FRONTEND_FORGE_API_URL = "https://forge.example";
    process.env.VITE_FRONTEND_FORGE_API_KEY = "test-key";
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env.VITE_FRONTEND_FORGE_API_URL = originalUrl;
    process.env.VITE_FRONTEND_FORGE_API_KEY = originalKey;
  });

  it("never presents localhost as the origin, since the proxy rejects it", async () => {
    const seen: string[] = [];
    globalThis.fetch = vi.fn(async (_url: never, init: never) => {
      const headers = (init as { headers: Record<string, string> }).headers;
      seen.push(headers.Origin);
      return { ok: true, status: 200, text: async () => "google.maps={}" } as never;
    }) as never;

    const handler = mountProxy();
    const { res, state } = mockRes();
    await handler(mockReq({ host: "localhost:3000", "x-forwarded-host": "site.manus.space" }), res);

    expect(seen).not.toContain("https://localhost:3000");
    expect(seen[0]).toBe("https://site.manus.space");
    expect(state.status).toBe(200);
  });

  it("serves javascript, not html, so the script tag can execute it", async () => {
    globalThis.fetch = vi.fn(
      async () => ({ ok: true, status: 200, text: async () => "google.maps={}" }) as never,
    ) as never;

    const handler = mountProxy();
    const { res, state } = mockRes();
    await handler(mockReq({ host: "site.manus.space" }), res);

    expect(state.type).toBe("application/javascript");
    expect(state.body).toContain("google.maps");
  });

  it("falls through to the next candidate origin when one is rejected", async () => {
    let call = 0;
    globalThis.fetch = vi.fn(async () => {
      call += 1;
      return call === 1
        ? ({ ok: false, status: 401, text: async () => "not matched" } as never)
        : ({ ok: true, status: 200, text: async () => "google.maps={}" } as never);
    }) as never;

    const handler = mountProxy();
    const { res, state } = mockRes();
    await handler(
      mockReq({ host: "preview.manus.computer", "x-forwarded-host": "site.manus.space" }),
      res,
    );

    expect(call).toBe(2);
    expect(state.status).toBe(200);
  });

  it("reports a 502 with a javascript body when every origin fails", async () => {
    globalThis.fetch = vi.fn(
      async () => ({ ok: false, status: 401, text: async () => "nope" }) as never,
    ) as never;

    const handler = mountProxy();
    const { res, state } = mockRes();
    await handler(mockReq({ host: "site.manus.space" }), res);

    expect(state.status).toBe(502);
    expect(state.type).toBe("application/javascript");
  });

  it("degrades to a stub instead of throwing when config is missing", async () => {
    delete process.env.VITE_FRONTEND_FORGE_API_URL;
    delete process.env.BUILT_IN_FORGE_API_URL;

    const handler = mountProxy();
    const { res, state } = mockRes();
    await handler(mockReq({ host: "site.manus.space" }), res);

    expect(state.status).toBe(503);
    expect(state.type).toBe("application/javascript");
  });
});
