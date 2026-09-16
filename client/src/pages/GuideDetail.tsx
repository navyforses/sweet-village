import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import Faq from "@/components/Faq";
import Markdown from "@/components/Markdown";
import ShareButton from "@/components/ShareButton";
import { SectionDivider } from "@/components/Ornaments";
import { useContent, useVenue } from "@/content/hooks";
import { LANG_NAMES, useI18n, type Lang } from "@/i18n";
import { localePath } from "@/i18n/paths";
import { JsonLd, Seo } from "@/seo/Seo";
import { breadcrumbs, faqPage, guideArticle } from "@/seo/jsonld";
import { wordCount } from "@shared/markdown";
import NotFound from "./NotFound";

const DATE_LOCALES: Record<Lang, string> = { ka: "ka-GE", en: "en-GB", ru: "ru-RU", ar: "ar-EG", fr: "fr-FR", es: "es-ES" };

/** "16 September 2026" in the page language; the ISO date stays in `dateTime` for machines. */
export function GuideDate({ value, lang }: { value: string; lang: Lang }) {
  let label = value;
  try {
    label = new Intl.DateTimeFormat(DATE_LOCALES[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00Z`));
  } catch {
    /* keep the ISO date */
  }
  // ICU tables can differ slightly between the build machine and the browser; the ISO attribute is what matters.
  return (
    <time dateTime={value} suppressHydrationWarning>
      {label}
    </time>
  );
}

function PageFallback() {
  return (
    <div className="container flex min-h-[55svh] items-center justify-center py-16" role="status" aria-live="polite">
      <span className="size-8 animate-pulse rounded-full border-2 border-turquoise border-t-transparent" />
    </div>
  );
}

export default function GuideDetail() {
  const [, params] = useRoute("/guides/:slug");
  const { t, lang } = useI18n();
  const { guides, attractions } = useVenue();
  const { isLive } = useContent();
  const guide = guides.find(candidate => candidate.slug === params?.slug);

  if (!guide) return <NotFound />;
  // Pages other than this one embed the guides without their bodies; wait for /api/content when we arrived by client-side navigation.
  if (!guide.body && !isLive) return <PageFallback />;
  if (!guide.body) return <NotFound />;

  const others = guides.filter(other => other.slug !== guide.slug && other.available).slice(0, 3);
  const places = attractions.filter(attraction => guide.attractionIds.includes(attraction.id));
  const minutes = Math.max(1, Math.round(wordCount(guide.body) / 200));
  // Visitors reading an untranslated language are pointed to English when it exists, otherwise to the first language written.
  const fallbackLang = guide.langs.includes("en") ? "en" : guide.langs[0];

  return (
    <article className="pb-6">
      <Seo
        path={`/guides/${guide.slug}`}
        title={`${guide.title} | ${t.brand.name}`}
        description={guide.excerpt}
        image={guide.cover}
        type="article"
        langs={guide.langs}
        noindex={!guide.available}
      />
      <JsonLd
        data={[
          guideArticle(lang, guide, t.brand.name),
          breadcrumbs(lang, [{ name: t.nav.home, path: "/" }, { name: t.nav.guides, path: "/guides" }, { name: guide.title, path: `/guides/${guide.slug}` }]),
          ...(guide.faq.length ? [faqPage(guide.faq)] : []),
        ]}
      />

      <div className="container pt-6 md:pt-14">
        <Link href="/guides" className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={1.5} />
          {t.guides.back}
        </Link>
        <header className="mt-5 max-w-3xl lg:mt-7">
          <p className="sv-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{t.guides.eyebrow}</span>
            <span aria-hidden="true">·</span>
            <span>
              {t.guides.updated} <GuideDate value={guide.updatedAt} lang={lang} />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {minutes} {t.guides.readingTime}
            </span>
          </p>
          <h1 className="mt-4 text-[clamp(1.75rem,6vw,2.75rem)] leading-[1.14] text-ink">{guide.title}</h1>
          <p className="mt-5 max-w-[64ch] text-[1rem] leading-7 text-muted-foreground md:text-[1.0625rem] md:leading-8">{guide.excerpt}</p>
        </header>
        {!guide.available && fallbackLang && (
          <p className="mt-6 max-w-3xl border border-gold/40 bg-gold/[0.06] px-5 py-4 text-[0.875rem] text-ink">
            {t.guides.notInLanguage}{" "}
            <a href={localePath(fallbackLang, `/guides/${guide.slug}`)} className="text-turquoise hover:text-deep" hrefLang={fallbackLang}>
              {fallbackLang === "en" ? t.guides.viewEnglish : LANG_NAMES[fallbackLang]}
            </a>
          </p>
        )}
      </div>

      <div className="mt-8 md:container md:mt-12">
        <img src={guide.cover} alt={guide.title} className="aspect-[16/9] w-full object-cover md:aspect-[21/9]" fetchPriority="high" />
      </div>

      <div className="container mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="max-w-[68ch]">
          <Markdown source={guide.body} />
          {guide.faq.length > 0 && <Faq title={t.guides.faqTitle} items={guide.faq} className="mt-12 md:mt-16" />}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-deep p-6 text-white md:p-7">
            <p className="sv-eyebrow text-gold">{t.brand.name}</p>
            <h2 className="mt-3 text-[1.25rem] leading-snug">{t.guides.planTitle}</h2>
            <p className="mt-3 text-[0.875rem] leading-6 text-white/80">{t.guides.planBody}</p>
            <div className="mt-5 grid gap-2">
              <Link href="/stay" data-press className="inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-4 text-[0.8125rem] text-ink transition-colors hover:bg-white">
                {t.guides.ctaStay}
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
              <Link href="/booking" data-press className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/40 px-4 text-[0.8125rem] text-white transition-colors hover:border-white">
                {t.guides.ctaBook}
              </Link>
            </div>
          </div>

          {places.length > 0 && (
            <div>
              <p className="sv-eyebrow">{t.guides.onMap}</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {places.map(place => (
                  <li key={place.id} className="flex items-start gap-2.5 py-3 text-[0.875rem]">
                    <MapPin className="mt-1 size-3.5 shrink-0 text-turquoise" strokeWidth={1.5} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-ink">{place.title}</span>
                      <span className="text-[0.75rem] text-muted-foreground">
                        {place.minutes} {t.common.minutes} · {place.km} {t.common.km}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/location" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-[0.8125rem] text-turquoise hover:text-deep">
                {t.nav.location}
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="container mt-14 md:mt-20">
          <SectionDivider motif="vine" />
          <h2 className="mt-9 text-[1.45rem] text-ink md:mt-12">{t.guides.moreTitle}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map(other => (
              <Link key={other.slug} href={`/guides/${other.slug}`} className="group block border-b border-line pb-5">
                <img src={other.cover} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <p className="mt-4 text-[1rem] leading-snug text-ink group-hover:text-turquoise">{other.title}</p>
                <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-6 text-muted-foreground">{other.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="container">
        <ShareButton className="mt-14 justify-center" />
      </div>
    </article>
  );
}
