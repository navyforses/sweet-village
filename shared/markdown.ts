/**
 * A deliberately small Markdown subset for the owner's guide articles:
 * headings (## / ###), paragraphs, bullet and numbered lists, quotes, and
 * inline **bold**, *italic* and [links](/stay). It produces a tree, never
 * HTML, so the React renderer escapes everything and only allows safe link
 * targets. No dependencies: it runs in the public bundle, the admin and the
 * prerender step.
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "heading"; level: 2 | 3; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "quote"; children: Inline[] };

/** Site-relative paths plus https/http, mailto and tel; anything else is rendered as plain text. */
export function isSafeHref(href: string): boolean {
  const value = href.trim();
  if (value.startsWith("/")) return !value.startsWith("//") && !/[\s<>"']/.test(value);
  return /^(https?:\/\/[^\s<>"']+|mailto:[^\s<>"']+|tel:\+?[\d\s()-]+)$/i.test(value);
}

const INLINE = /(\*\*(?=\S)([\s\S]+?)(?<=\S)\*\*|\*(?=\S)([^*\n]+?)(?<=\S)\*|\[([^\]\n]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\))/;

/** Splits a line into text, bold, italic and link nodes. Unmatched markers stay literal. */
export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let rest = text;
  while (rest.length > 0) {
    const match = INLINE.exec(rest);
    if (!match || match.index === undefined) {
      out.push({ type: "text", text: rest });
      break;
    }
    if (match.index > 0) out.push({ type: "text", text: rest.slice(0, match.index) });
    const [whole, , strong, em, label, href] = match;
    if (strong !== undefined) out.push({ type: "strong", children: parseInline(strong) });
    else if (em !== undefined) out.push({ type: "em", children: parseInline(em) });
    else if (label !== undefined && href !== undefined) {
      if (isSafeHref(href)) out.push({ type: "link", href: href.trim(), children: parseInline(label) });
      else out.push({ type: "text", text: label });
    }
    rest = rest.slice(match.index + whole.length);
  }
  return mergeText(out);
}

function mergeText(nodes: Inline[]): Inline[] {
  const merged: Inline[] = [];
  for (const node of nodes) {
    const last = merged[merged.length - 1];
    if (node.type === "text" && last?.type === "text") last.text += node.text;
    else merged.push(node);
  }
  return merged;
}

const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const BULLET = /^[-*+]\s+(.*)$/;
const NUMBERED = /^\d{1,3}[.)]\s+(.*)$/;
const QUOTE = /^>\s?(.*)$/;

/** Parses the subset into blocks. Unknown constructs degrade to paragraphs. */
export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", children: parseInline(paragraph.join(" ")) });
    paragraph = [];
  };
  const flushList = () => {
    if (list) blocks.push({ type: "list", ordered: list.ordered, items: list.items.map(parseInline) });
    list = null;
  };
  const flushQuote = () => {
    if (quote.length) blocks.push({ type: "quote", children: parseInline(quote.join(" ")) });
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      flushAll();
      // Articles already have an <h1>; "# " and "## " both become <h2>, deeper levels <h3>.
      const level: 2 | 3 = heading[1].length <= 2 ? 2 : 3;
      blocks.push({ type: "heading", level, children: parseInline(heading[2]) });
      continue;
    }
    const bullet = BULLET.exec(line) ?? NUMBERED.exec(line);
    if (bullet) {
      flushParagraph();
      flushQuote();
      const ordered = NUMBERED.test(line);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }
    const quoted = QUOTE.exec(line);
    if (quoted) {
      flushParagraph();
      flushList();
      quote.push(quoted[1]);
      continue;
    }
    if (list && /^\s{2,}/.test(raw)) {
      // Indented continuation of the previous list item.
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }
  flushAll();
  return blocks;
}

function inlineText(nodes: Inline[]): string {
  return nodes.map(node => (node.type === "text" ? node.text : inlineText(node.children))).join("");
}

/** Plain text of the article (for word counts and search snippets). */
export function markdownToText(source: string): string {
  return parseMarkdown(source)
    .map(block => (block.type === "list" ? block.items.map(inlineText).join(" ") : inlineText(block.children)))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Approximate word count that also works for scripts without spaces between every word (Arabic is fine, Georgian too). */
export function wordCount(source: string): number {
  const text = markdownToText(source);
  return text ? text.split(/\s+/).length : 0;
}

/** Second-level headings, for a table of contents. */
export function headings(source: string): string[] {
  return parseMarkdown(source)
    .filter((block): block is Extract<Block, { type: "heading" }> => block.type === "heading" && block.level === 2)
    .map(block => inlineText(block.children));
}
