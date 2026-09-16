/**
 * Minimal structural request/response types shared by every Vercel function.
 * Declaring them locally (instead of depending on @vercel/node) keeps the
 * handlers trivially testable: tests call them with plain objects.
 */

export type ApiRequest = {
  method?: string;
  url?: string;
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
};

export type ApiResponse = {
  setHeader(name: string, value: string | string[]): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

/** Vercel parses JSON bodies, but a raw string can still arrive (tests, other content types). */
export function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return undefined;
  }
}

export function header(req: ApiRequest, name: string): string | undefined {
  const raw = req.headers?.[name.toLowerCase()];
  return Array.isArray(raw) ? raw[0] : raw;
}

export function queryParam(req: ApiRequest, name: string): string | undefined {
  const raw = req.query?.[name];
  return Array.isArray(raw) ? raw[0] : raw;
}

export function clientIp(req: ApiRequest): string {
  const forwarded = header(req, "x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || req.socket?.remoteAddress || "unknown";
}

/** Vercel always terminates TLS and sets x-forwarded-proto; the local harness does not. */
export function isSecureRequest(req: ApiRequest): boolean {
  return header(req, "x-forwarded-proto") === "https";
}

export function noStore(res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
}

export function methodNotAllowed(res: ApiResponse, allow: string) {
  res.setHeader("Allow", allow);
  res.status(405).json({ error: "Method not allowed" });
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
