import { z } from "zod";
import { LANGS, type Lang } from "../../../shared/langs";
import { assertMutationAllowed, getAdminSession } from "../adminAuth";
import { isRecord, methodNotAllowed, parseBody, type ApiRequest, type ApiResponse } from "../http";

export const TRANSLATE_MODEL = "claude-opus-5";
const MAX_ITEMS = 40;
const MAX_TOTAL_CHARS = 12_000;
const REQUEST_TIMEOUT_MS = 50_000;

const TARGET_LANGS = LANGS.filter((lang): lang is Exclude<Lang, "ka"> => lang !== "ka");

const requestSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(64),
        text: z.string().trim().min(1).max(3000),
        kind: z.enum(["title", "body", "caption", "label"]).default("body"),
        maxChars: z.number().int().min(10).max(3000).optional(),
      }),
    )
    .min(1)
    .max(MAX_ITEMS),
  targets: z.array(z.enum(TARGET_LANGS as [string, ...string[]])).min(1).optional(),
  context: z.string().trim().max(300).optional(),
});

export type TranslateRequest = z.infer<typeof requestSchema>;

const translationsSchema = z.object({
  en: z.string(),
  ru: z.string(),
  ar: z.string(),
  fr: z.string(),
  es: z.string(),
});

export const translateOutputSchema = z.object({
  items: z.array(z.object({ id: z.string(), translations: translationsSchema })),
});

const LANGUAGE_NAMES: Record<Exclude<Lang, "ka">, string> = {
  en: "English",
  ru: "Russian",
  ar: "Modern Standard Arabic",
  fr: "French",
  es: "Spanish",
};

export const SYSTEM_PROMPT = `You translate website copy for "Sweet Village" (ტკბილი სოფელი), a family-run countryside guesthouse in the village of Kvilishori near Tskaltubo, Imereti, Georgia. The property has wooden cottages and rooms, an outdoor pool, a restaurant serving Imeretian home cooking, and a covered garden space for celebrations.

Rules:
- Source texts are Georgian. Produce natural, warm, concise hospitality copy in each requested language; do not translate word by word and do not add facts, prices or promises that are not in the source.
- Keep every number, price, time, unit id and proper noun exactly. Transliterations: ქვილიშორი = Kvilishori, წყალტუბო = Tskaltubo, იმერეთი = Imereti, ქუთაისი = Kutaisi, პრომეთეს მღვიმე = Prometheus Cave, სათაფლია = Sataplia, გელათი = Gelati, მარტვილი = Martvili, ოკაცე = Okatse, ხვამლი = Khvamli. Georgian dish names stay recognisable (khachapuri, khinkali, mtsvadi, lobio, mchadi, shkmeruli, ojakhuri, ketsi, tone).
- "kind" tells you the register: title = short heading (no trailing period), caption = a few words under a photo, label = UI label, body = one or more sentences. Respect maxChars when given.
- Arabic must read naturally for Gulf and Levantine guests; use Modern Standard Arabic and keep Latin proper nouns only where an established Arabic form does not exist.
- Return one entry per input id, with all five languages filled.`;

type AnthropicModule = typeof import("@anthropic-ai/sdk");

export async function translate(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }
  const csrf = assertMutationAllowed(req);
  if (!csrf.ok) {
    res.status(403).json({ error: csrf.error });
    return;
  }
  const session = await getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const body = parseBody(req.body);
  const parsed = requestSchema.safeParse(isRecord(body) ? body : {});
  if (!parsed.success) {
    res.status(422).json({ error: "invalid_request", issues: z.flattenError(parsed.error) });
    return;
  }
  const request = parsed.data;
  const totalChars = request.items.reduce((sum, item) => sum + item.text.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    res.status(422).json({ error: "too_much_text", maxChars: MAX_TOTAL_CHARS });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "translation_not_configured" });
    return;
  }

  const targets = (request.targets ?? TARGET_LANGS) as Exclude<Lang, "ka">[];
  const userMessage = JSON.stringify(
    {
      context: request.context ?? "",
      targetLanguages: targets.map(lang => `${lang} (${LANGUAGE_NAMES[lang]})`),
      items: request.items,
    },
    null,
    1,
  );

  let Anthropic: AnthropicModule["default"];
  try {
    Anthropic = (await import("@anthropic-ai/sdk")).default;
    const { zodOutputFormat } = await import("@anthropic-ai/sdk/helpers/zod");
    const client = new Anthropic({ apiKey, maxRetries: 1 });
    const message = await client.messages.parse(
      {
        model: TRANSLATE_MODEL,
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        output_config: { effort: "low", format: zodOutputFormat(translateOutputSchema) },
        messages: [{ role: "user", content: userMessage }],
      },
      { timeout: REQUEST_TIMEOUT_MS },
    );
    if (message.stop_reason === "refusal") {
      res.status(502).json({ error: "translation_refused" });
      return;
    }
    const output = message.parsed_output;
    if (!output) {
      res.status(502).json({ error: "translation_unparseable" });
      return;
    }
    const byId = new Map(output.items.map(item => [item.id, item.translations]));
    const items = request.items.map(item => {
      const translations = byId.get(item.id);
      const picked: Partial<Record<Exclude<Lang, "ka">, string>> = {};
      for (const lang of targets) {
        const value = translations?.[lang]?.trim();
        if (value) picked[lang] = item.maxChars ? value.slice(0, item.maxChars) : value;
      }
      return { id: item.id, translations: picked };
    });
    res.status(200).json({
      items,
      usage: { inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens },
    });
  } catch (error) {
    if (Anthropic! && error instanceof Anthropic.RateLimitError) {
      res.setHeader("Retry-After", "30");
      res.status(429).json({ error: "translation_rate_limited" });
      return;
    }
    console.error("[admin:translate] request failed", error);
    res.status(502).json({ error: "translation_failed" });
  }
}
