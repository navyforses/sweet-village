/**
 * URL slugs for guide articles. Georgian (and Cyrillic) titles are
 * transliterated to Latin so `/guides/prometeos-mghvime` is readable in the
 * address bar; the owner can always type an English slug instead.
 */

const GEORGIAN: Record<string, string> = {
  ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t", ი: "i", კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh", რ: "r",
  ს: "s", ტ: "t", უ: "u", ფ: "p", ქ: "k", ღ: "gh", ყ: "q", შ: "sh", ჩ: "ch", ც: "ts", ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h",
};

const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const SLUG_MAX = 80;

export function transliterate(text: string): string {
  return Array.from(text.toLowerCase(), char => GEORGIAN[char] ?? CYRILLIC[char] ?? char).join("");
}

/** "პრომეთეს მღვიმე: ბილეთი" → "prometes-mghvime-bileti"; "" when nothing usable remains. */
export function slugify(text: string, max = SLUG_MAX): string {
  return transliterate(text)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/g, "");
}

export function isSlug(value: unknown): value is string {
  return typeof value === "string" && value.length >= 3 && value.length <= SLUG_MAX && SLUG_PATTERN.test(value);
}
