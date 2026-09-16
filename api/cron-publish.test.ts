import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeSql, responseRecorder, type FakeQueryHandler } from "./_lib/testing/fakeNeon";
import handler from "./cron-publish";

const neonState = vi.hoisted(() => ({ handler: null as null | FakeQueryHandler }));

vi.mock("@neondatabase/serverless", () => ({
  neon: () => createFakeSql((query, values) => (neonState.handler ? neonState.handler(query, values) : [])).sql,
}));

const fetchMock = vi.fn();

function store(options: { contentAt: string | null; publishedAt: string | null; claimed?: boolean }): FakeQueryHandler {
  return query => {
    if (query.includes("AS content_at")) return [{ content_at: options.contentAt, published_at: options.publishedAt }];
    if (query.includes("INSERT INTO site_content (key, value, updated_by)")) return options.claimed === false ? [] : [{ key: "_publish" }];
    return [];
  };
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("CRON_SECRET", "cron-secret");
  vi.stubEnv("NEON_DATABASE_URL", "postgres://fake");
  vi.stubEnv("VERCEL_DEPLOY_HOOK_URL", "https://api.vercel.com/v1/integrations/deploy/prj_x/abc");
});

afterEach(() => vi.unstubAllEnvs());

describe("GET /api/cron-publish", () => {
  it("rejects callers without the cron secret", async () => {
    let { record, response } = responseRecorder();
    await handler({ method: "GET", headers: {} }, response);
    expect(record.statusCode).toBe(401);
    vi.stubEnv("CRON_SECRET", "");
    ({ record, response } = responseRecorder());
    await handler({ method: "GET", headers: { authorization: "Bearer x" } }, response);
    expect(record.statusCode).toBe(503);
  });

  it("only rebuilds when content changed after the last publish", async () => {
    const auth = { authorization: "Bearer cron-secret" };
    neonState.handler = store({ contentAt: "2026-09-16 10:00:00+00", publishedAt: "2026-09-16 11:00:00+00" });
    let { record, response } = responseRecorder();
    await handler({ method: "GET", headers: auth }, response);
    expect(record.body).toEqual({ triggered: false, reason: "up_to_date" });
    expect(fetchMock).not.toHaveBeenCalled();

    neonState.handler = store({ contentAt: "2026-09-16 12:00:00+00", publishedAt: "2026-09-16 11:00:00+00" });
    fetchMock.mockResolvedValue({ ok: true, status: 201 });
    ({ record, response } = responseRecorder());
    await handler({ method: "GET", headers: auth }, response);
    expect(record.body).toEqual({ triggered: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    neonState.handler = store({ contentAt: "2026-09-16 12:00:00+00", publishedAt: null });
    fetchMock.mockClear();
    fetchMock.mockResolvedValue({ ok: true, status: 201 });
    ({ record, response } = responseRecorder());
    await handler({ method: "GET", headers: auth }, response);
    expect(record.body).toEqual({ triggered: true });

    neonState.handler = store({ contentAt: null, publishedAt: null });
    fetchMock.mockClear();
    ({ record, response } = responseRecorder());
    await handler({ method: "GET", headers: auth }, response);
    expect(record.body).toEqual({ triggered: false, reason: "up_to_date" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
