/**
 * Local development harness for the Vercel deployment: serves the Vite client
 * and mounts the serverless functions from `api/` on an Express app, the way
 * Vercel routes them in production. `pnpm dev` still starts the legacy Manus
 * server; use `pnpm dev:api` when working on the admin panel or booking API.
 *
 * Reads `.env.local` (git-ignored) for NEON_DATABASE_URL, ADMIN_PASSWORD_HASH,
 * ADMIN_SESSION_SECRET, ANTHROPIC_API_KEY and BLOB_READ_WRITE_TOKEN.
 */
import { config as loadEnv } from "dotenv";
import express, { type Request, type Response } from "express";
import { createServer } from "node:http";
import path from "node:path";
import type { ApiRequest, ApiResponse } from "../api/_lib/http";
import adminHandler from "../api/admin/[action]";
import blobImageHandler from "../api/blob-image";
import bookingHandler from "../api/booking";
import contentHandler from "../api/content";
import { setupVite } from "../server/_core/vite";

loadEnv({ path: path.resolve(import.meta.dirname, "..", ".env.local") });
loadEnv({ path: path.resolve(import.meta.dirname, "..", ".env") });

type Handler = (req: ApiRequest, res: ApiResponse) => Promise<void>;

/** Mirrors the request shape Vercel hands to a Node function, including dynamic segments in `query`. */
function toApiRequest(req: Request, extraQuery: Record<string, string> = {}): ApiRequest {
  return {
    method: req.method,
    url: req.originalUrl,
    query: { ...(req.query as Record<string, string | string[] | undefined>), ...extraQuery },
    headers: req.headers as Record<string, string | string[] | undefined>,
    body: req.body,
    socket: { remoteAddress: req.socket.remoteAddress },
  };
}

function mount(handler: Handler, extraQuery?: (req: Request) => Record<string, string>) {
  return async (req: Request, res: Response) => {
    try {
      await handler(toApiRequest(req, extraQuery?.(req)), res as unknown as ApiResponse);
    } catch (error) {
      console.error("[dev-api] handler failed", error);
      if (!res.headersSent) res.status(500).json({ error: "Handler failed" });
    }
  };
}

async function start() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "6mb" }));

  app.all("/api/content", mount(contentHandler));
  app.all("/api/booking", mount(bookingHandler));
  app.all("/api/blob-image", mount(blobImageHandler as unknown as Handler));
  app.all("/api/admin/:action", mount(adminHandler, req => ({ action: String(req.params.action) })));

  await setupVite(app, server);

  const port = Number(process.env.PORT ?? 3000);
  server.listen(port, () => {
    console.log(`Sweet Village dev server: http://localhost:${port}/  (admin: /admin)`);
  });
}

start().catch(error => {
  console.error(error);
  process.exit(1);
});
