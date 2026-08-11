/**
 * One-off content build script.
 *
 * Uses the sandbox LLM proxy to translate the Georgian printed-menu
 * descriptions into brief English and Russian card copy. It validates the
 * entire 68-item result before writing a source-controlled TypeScript map.
 * Run: pnpm exec tsx scripts/generate_menu_descriptions.ts
 */
import { writeFile } from "node:fs/promises";
import { MENU } from "../shared/menuData";

type Description = { id: number; en: string; ru: string };
type Output = { items: Description[] };

const base = process.env.OPENAI_API_BASE;
const key = process.env.OPENAI_API_KEY;

if (!base || !key) {
  throw new Error("OPENAI_API_BASE and OPENAI_API_KEY must be available");
}

const dishes = MENU.flatMap(category =>
  category.items.map(item => ({
    id: item.id,
    englishName: item.en,
    russianName: item.ru,
    georgianDescription: item.descKa ?? "",
  })),
);

const prompt = `You are a meticulous menu translator for a Georgian countryside restaurant.
Write one short factual description in English and one in Russian for each of the 68 dishes below.
Use the Georgian description as source when present; otherwise infer only a neutral factual description from the dish name. Do not invent ingredients, origin claims, awards, health claims or promises. Preserve cuisine terms (for example khachapuri, tkemali, khinkali). Each description must be 6–16 words and no more than 110 characters in each language.

Return JSON only, exactly shaped as {"items":[{"id":1,"en":"...","ru":"..."}]}. Include every id exactly once, in ascending order.

DISHES:
${JSON.stringify(dishes)}`;

const response = await fetch(`${base}/chat/completions`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You output strict, valid JSON and are an expert culinary translator." },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 10000,
  }),
});

if (!response.ok) {
  throw new Error(`LLM request failed: ${response.status} ${await response.text()}`);
}

const body = (await response.json()) as {
  choices?: Array<{ message?: { content?: string } }>;
};
const content = body.choices?.[0]?.message?.content;
if (!content) throw new Error("LLM returned no text");

const output = JSON.parse(content) as Output;
const expectedIds = dishes.map(item => item.id);
const actualIds = output.items?.map(item => item.id) ?? [];
if (
  actualIds.length !== expectedIds.length ||
  actualIds.some((id, index) => id !== expectedIds[index])
) {
  throw new Error("Generated descriptions are missing, duplicated or reordered");
}

for (const item of output.items) {
  if (!item.en?.trim() || !item.ru?.trim() || item.en.length > 120 || item.ru.length > 120) {
    throw new Error(`Invalid description for item ${item.id}`);
  }
}

const descriptionMap = Object.fromEntries(
  output.items.map(item => [item.id, { en: item.en.trim(), ru: item.ru.trim() }]),
);

const source = `/** Short menu-card copy in English and Russian. Generated from the printed Georgian menu; reviewed structurally at build time. */\nexport const EN_RU_DESCRIPTIONS: Record<number, { en: string; ru: string }> = ${JSON.stringify(descriptionMap, null, 2)};\n`;
await writeFile(new URL("../shared/menuDescriptions.ts", import.meta.url), source, "utf8");
console.log(`Wrote ${output.items.length} English/Russian menu descriptions.`);
