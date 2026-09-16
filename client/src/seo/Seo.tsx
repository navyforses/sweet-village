import { useI18n } from "@/i18n";
import { pageMeta, type PageMetaInput } from "./meta";

type SeoProps = Omit<PageMetaInput, "lang">;

/**
 * Per-page head tags. React 19 hoists <title>, <meta> and <link> into
 * <head> wherever they are rendered, on the server and in the browser, so
 * the prerendered HTML and the hydrated page carry the same metadata.
 */
export function Seo(props: SeoProps) {
  const { lang, t } = useI18n();
  const meta = pageMeta({ ...props, lang });
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.robots && <meta name="robots" content={meta.robots} />}
      <link rel="canonical" href={meta.canonical} />
      {meta.alternates.map(alternate => (
        <link key={alternate.hrefLang} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
      ))}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={t.brand.name} />
      <meta property="og:locale" content={meta.locale} />
      {meta.alternateLocales.map(locale => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </>
  );
}

/** Structured data block. Rendered in place; search engines read JSON-LD anywhere in the document. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-danger
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
