/**
 * Seed articles for the "Guides" section: metadata plus bodies and FAQs.
 * Used by the API, the prerender step and the admin panel; the browser
 * bundle gets ./guideCopy.stub.ts instead (vite.config.ts alias) and loads
 * ./guideBodies.ts only on an article page.
 */
import { GUIDE_BODIES, type GuideSeedBody } from "./guideBodies.js";
import { GUIDE_META, type GuideSeedMeta } from "./guideMeta.js";

export type GuideSeed = GuideSeedMeta & GuideSeedBody;

export const GUIDE_SEEDS: GuideSeed[] = GUIDE_META.map(meta => {
  const content = GUIDE_BODIES[meta.slug];
  if (!content) throw new Error(`[guides] no body for seed guide ${meta.slug}`);
  return { ...meta, ...content };
});
