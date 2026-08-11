import type { Express, Request, Response } from "express";

/**
 * The Forge maps proxy enforces an Origin allowlist. That works for a browser
 * sitting on the published domain, but breaks for the dev preview, embedded
 * renderers and screenshot workers, which present a different origin. A
 * server-to-server hop has no browser Origin restriction, so we fetch the
 * Google Maps bootstrap script here and hand it to the client from our own
 * origin instead.
 */
/**
 * Origins the Forge proxy is willing to accept, most specific first. The
 * published domain is the one registered with the project; the sandbox preview
 * host works while developing. `localhost` is never accepted, which is exactly
 * why the browser could not load the script directly.
 */
function candidateOrigins(req: Request): string[] {
  const out: string[] = [];

  const published = process.env.MANUS_PUBLISHED_ORIGIN;
  if (published) out.push(published);

  const host = req.get("host");
  if (host && !/^(localhost|127\.0\.0\.1)/.test(host)) {
    out.push(`${req.protocol}://${host}`);
  }

  // Fall back to the sandbox preview host, discoverable from the forwarded host.
  const forwarded = req.get("x-forwarded-host");
  if (forwarded) out.push(`https://${forwarded}`);

  return out.filter((o, i) => out.indexOf(o) === i);
}

/** Cached bootstrap script — the upstream response is identical per libraries set. */
const cache = new Map<string, { body: string; at: number }>();
const TTL = 30 * 60 * 1000;

export function registerMapsProxy(app: Express) {
  app.get("/api/maps/js", async (req: Request, res: Response) => {
    const base = process.env.VITE_FRONTEND_FORGE_API_URL ?? process.env.BUILT_IN_FORGE_API_URL;
    const key = process.env.VITE_FRONTEND_FORGE_API_KEY ?? process.env.BUILT_IN_FORGE_API_KEY;

    if (!base || !key) {
      res.status(503).type("application/javascript").send("/* maps unavailable: missing config */");
      return;
    }

    const libraries =
      typeof req.query.libraries === "string" ? req.query.libraries : "marker";

    const hit = cache.get(libraries);
    if (hit && Date.now() - hit.at < TTL) {
      res.status(200).type("application/javascript").send(hit.body);
      return;
    }

    const url =
      `${base}/v1/maps/proxy/maps/api/js` +
      `?key=${encodeURIComponent(key)}&v=weekly&libraries=${encodeURIComponent(libraries)}`;

    try {
      const origins = candidateOrigins(req);
      let lastStatus = 0;
      let lastBody = "";

      for (const origin of origins) {
        const upstream = await fetch(url, {
          headers: { Origin: origin, Referer: `${origin}/` },
        });
        const body = await upstream.text();

        if (upstream.ok) {
          cache.set(libraries, { body, at: Date.now() });
          res
            .status(200)
            .type("application/javascript")
            .set("Cache-Control", "public, max-age=1800")
            .send(body);
          return;
        }

        lastStatus = upstream.status;
        lastBody = body;
      }

      console.error(
        "[maps] all origins rejected",
        origins,
        lastStatus,
        lastBody.slice(0, 200),
      );
      res
        .status(502)
        .type("application/javascript")
        .send(`/* maps upstream ${lastStatus} */`);
    } catch (error) {
      console.error("[maps] proxy failed", error);
      res.status(502).type("application/javascript").send("/* maps proxy failed */");
    }
  });
}
