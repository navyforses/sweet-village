import { describe, expect, it } from "vitest";
import { headings, isSafeHref, markdownToText, parseInline, parseMarkdown, wordCount } from "./markdown";

describe("markdown subset", () => {
  it("parses headings, paragraphs, lists and quotes", () => {
    const blocks = parseMarkdown("# Title\n\nFirst line\nsecond line\n\n## Section\n- one\n- two\n\n1. a\n2. b\n\n> tip here\n");
    expect(blocks.map(block => block.type)).toEqual(["heading", "paragraph", "heading", "list", "list", "quote"]);
    expect(blocks[0]).toMatchObject({ type: "heading", level: 2 });
    expect(blocks[1]).toEqual({ type: "paragraph", children: [{ type: "text", text: "First line second line" }] });
    expect(blocks[3]).toMatchObject({ type: "list", ordered: false });
    expect(blocks[4]).toMatchObject({ type: "list", ordered: true, items: [[{ type: "text", text: "a" }], [{ type: "text", text: "b" }]] });
    expect(blocks[5]).toEqual({ type: "quote", children: [{ type: "text", text: "tip here" }] });
  });

  it("parses bold, italic and links, keeping unmatched markers literal", () => {
    expect(parseInline("a **b** *c* [d](/stay) e")).toEqual([
      { type: "text", text: "a " },
      { type: "strong", children: [{ type: "text", text: "b" }] },
      { type: "text", text: " " },
      { type: "em", children: [{ type: "text", text: "c" }] },
      { type: "text", text: " " },
      { type: "link", href: "/stay", children: [{ type: "text", text: "d" }] },
      { type: "text", text: " e" },
    ]);
    expect(parseInline("2 * 3 = 6 and **loud")).toEqual([{ type: "text", text: "2 * 3 = 6 and **loud" }]);
    expect(parseInline("**[bold link](https://example.com)**")).toEqual([{ type: "strong", children: [{ type: "link", href: "https://example.com", children: [{ type: "text", text: "bold link" }] }] }]);
  });

  it("never emits a link with an unsafe target", () => {
    expect(isSafeHref("/guides/prometheus-cave")).toBe(true);
    expect(isSafeHref("https://apa.gov.ge")).toBe(true);
    expect(isSafeHref("tel:+995599639614")).toBe(true);
    expect(isSafeHref("javascript:alert(1)")).toBe(false);
    expect(isSafeHref("//evil.example")).toBe(false);
    expect(isSafeHref("data:text/html,hi")).toBe(false);
    expect(parseInline("[x](javascript:alert(1))")).toEqual([{ type: "text", text: "x" }]);
    expect(parseInline("[map](https://maps.google.com/?q=(42.37,42.60))")).toEqual([{ type: "link", href: "https://maps.google.com/?q=(42.37,42.60)", children: [{ type: "text", text: "map" }] }]);
  });

  it("produces no HTML: angle brackets survive as text", () => {
    const blocks = parseMarkdown("<script>alert(1)</script> & co");
    expect(blocks).toEqual([{ type: "paragraph", children: [{ type: "text", text: "<script>alert(1)</script> & co" }] }]);
  });

  it("extracts plain text, word counts and section headings", () => {
    const source = "## პრომეთეს მღვიმე\n\nბილეთი **23 ₾**, [დაჯავშნა](/booking).\n\n- ერთი\n- ორი\n\n### ქვესათაური\n";
    expect(markdownToText(source)).toBe("პრომეთეს მღვიმე ბილეთი 23 ₾, დაჯავშნა. ერთი ორი ქვესათაური");
    expect(wordCount(source)).toBe(9);
    expect(headings(source)).toEqual(["პრომეთეს მღვიმე"]);
    expect(wordCount("")).toBe(0);
  });
});
