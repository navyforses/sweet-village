export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Visible question/answer list. Pages that render it also emit the matching
 * FAQPage JSON-LD (see seo/jsonld.ts) so the answers stay on the page as
 * text search engines can read without opening anything.
 */
export default function Faq({ title, items, className = "" }: { title: string; items: FaqItem[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <section className={className} aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-[clamp(1.35rem,3vw,1.75rem)] leading-tight text-ink">
        {title}
      </h2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {items.map(item => (
          <div key={item.question} className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 md:py-6">
            <dt className="text-[1rem] text-ink">{item.question}</dt>
            <dd className="text-[0.9375rem] leading-7 text-muted-foreground">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
