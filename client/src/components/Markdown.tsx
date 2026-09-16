import { Fragment } from "react";
import { Link } from "wouter";
import { parseMarkdown, type Block, type Inline } from "@shared/markdown";

/** Site-relative links stay inside the language router; external ones open in a new tab. */
function InlineNodes({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "text") return <Fragment key={index}>{node.text}</Fragment>;
        if (node.type === "strong")
          return (
            <strong key={index} className="font-medium text-ink">
              <InlineNodes nodes={node.children} />
            </strong>
          );
        if (node.type === "em")
          return (
            <em key={index}>
              <InlineNodes nodes={node.children} />
            </em>
          );
        if (node.href.startsWith("/"))
          return (
            <Link key={index} href={node.href} className="sv-link-underline text-turquoise hover:text-deep">
              <InlineNodes nodes={node.children} />
            </Link>
          );
        return (
          <a key={index} href={node.href} target="_blank" rel="noopener noreferrer" className="sv-link-underline text-turquoise hover:text-deep">
            <InlineNodes nodes={node.children} />
          </a>
        );
      })}
    </>
  );
}

function BlockNode({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="mt-10 text-[clamp(1.35rem,3vw,1.75rem)] leading-tight text-ink first:mt-0">
          <InlineNodes nodes={block.children} />
        </h2>
      ) : (
        <h3 className="mt-7 text-[1.125rem] text-ink">
          <InlineNodes nodes={block.children} />
        </h3>
      );
    case "paragraph":
      return (
        <p className="mt-4 text-[0.9375rem] leading-7 text-muted-foreground md:text-[1rem] md:leading-8">
          <InlineNodes nodes={block.children} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="mt-5 border-s-2 border-gold/60 bg-gold/[0.06] px-5 py-4 text-[0.9375rem] leading-7 text-ink">
          <InlineNodes nodes={block.children} />
        </blockquote>
      );
    case "list": {
      const items = block.items.map((item, index) => (
        <li key={index} className="ps-1.5">
          <InlineNodes nodes={item} />
        </li>
      ));
      return block.ordered ? (
        <ol className="mt-4 list-decimal space-y-2 ps-6 text-[0.9375rem] leading-7 text-muted-foreground marker:font-serif marker:text-turquoise md:text-[1rem]">{items}</ol>
      ) : (
        <ul className="mt-4 list-disc space-y-2 ps-6 text-[0.9375rem] leading-7 text-muted-foreground marker:text-pistachio md:text-[1rem]">{items}</ul>
      );
    }
  }
}

/** Renders the owner's Markdown subset as React elements: everything is escaped, links are allow-listed by the parser. */
export default function Markdown({ source, className = "" }: { source: string; className?: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <BlockNode key={index} block={block} />
      ))}
    </div>
  );
}
