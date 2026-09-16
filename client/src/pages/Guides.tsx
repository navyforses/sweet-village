import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { useVenue } from "@/content/hooks";
import { useI18n } from "@/i18n";
import { localePath } from "@/i18n/paths";
import { JsonLd, Seo } from "@/seo/Seo";
import { breadcrumbs, guideList } from "@/seo/jsonld";
import { GuideDate } from "./GuideDetail";

/** Guides written in the current language; the others are reachable through the language switcher on their own pages. */
export default function Guides() {
  const { t, lang } = useI18n();
  const { guides } = useVenue();
  const visible = guides.filter(guide => guide.available);

  return (
    <div className="container py-10 md:py-20">
      <Seo path="/guides" title={t.meta.pages.guides.title} description={t.meta.pages.guides.description} image={visible[0]?.cover} />
      <JsonLd data={[breadcrumbs(lang, [{ name: t.nav.home, path: "/" }, { name: t.nav.guides, path: "/guides" }]), guideList(lang, visible, t.guides.title)]} />
      <SectionHeading as="h1" eyebrow={t.guides.eyebrow} title={t.guides.title} intro={t.guides.intro} />

      {visible.length === 0 ? (
        <div className="mt-10 border border-line bg-white p-6 text-[0.9375rem] text-muted-foreground md:mt-14 md:p-9">
          <p>{t.guides.empty}</p>
          {lang !== "en" && (
            <a href={localePath("en", "/guides")} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-turquoise hover:text-deep">
              {t.guides.viewEnglish}
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </a>
          )}
        </div>
      ) : (
        <div className="sv-stagger mt-10 grid gap-x-6 gap-y-10 md:mt-14 md:grid-cols-2 lg:gap-x-8 lg:gap-y-14">
          {visible.map((guide, index) => (
            <article key={guide.slug} className="group border-b border-line pb-8">
              <Link href={`/guides/${guide.slug}`} className="block overflow-hidden bg-pistachio/10" aria-label={guide.title}>
                <img src={guide.cover} alt={guide.title} loading={index < 2 ? "eager" : "lazy"} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
              </Link>
              <p className="sv-eyebrow mt-5">
                <GuideDate value={guide.updatedAt} lang={lang} />
              </p>
              <h2 className="mt-2 text-[clamp(1.2rem,2.2vw,1.55rem)] leading-snug text-ink">
                <Link href={`/guides/${guide.slug}`} className="hover:text-turquoise">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[62ch] text-[0.875rem] leading-6 text-muted-foreground">{guide.excerpt}</p>
              <Link href={`/guides/${guide.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.8125rem] text-turquoise hover:text-deep">
                {t.guides.readGuide}
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </article>
          ))}
        </div>
      )}

      <ShareButton className="mt-12 justify-center md:mt-16" />
    </div>
  );
}
