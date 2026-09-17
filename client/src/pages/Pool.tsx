import { Link } from "wouter";
import { Clock, Info, Sun, Users } from "lucide-react";
import Faq from "@/components/Faq";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { useVenue } from "@/content/hooks";
import { useI18n } from "@/i18n";
import { JsonLd, Seo } from "@/seo/Seo";
import { breadcrumbs, faqPage } from "@/seo/jsonld";
import Img from "@/components/Img";

export default function Pool() {
  const { t, lang } = useI18n();
  const { pool } = useVenue();

  return (
    <div className="container py-10 md:py-20">
      <Seo path="/pool" title={t.meta.pages.pool.title} description={t.meta.pages.pool.description} image={pool.photos.main} />
      <JsonLd data={[breadcrumbs(lang, [{ name: t.nav.home, path: "/" }, { name: t.nav.pool, path: "/pool" }]), faqPage(t.pool.faq.items)]} />
      <SectionHeading as="h1" eyebrow={t.pool.eyebrow} title={t.pool.title} intro={t.pool.intro} />

      <div className="mt-9 grid gap-8 md:mt-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div className="space-y-4">
          <Img
            src={pool.photos.main}
            alt={t.pool.title}
            sizes="(min-width: 1024px) 56vw, 100vw"
            maxWidth={1280}
            priority
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            <Img
              src={pool.photos.side1}
              alt=""
              sizes="(min-width: 1024px) 28vw, 50vw"
              maxWidth={640}
              className="aspect-[4/3] w-full object-cover"
            />
            <Img
              src={pool.photos.side2}
              alt=""
              sizes="(min-width: 1024px) 28vw, 50vw"
              maxWidth={640}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        {/* Price table: rectangular, ruled, no card chrome. */}
        <div>
          <table className="w-full border-collapse text-start">
            <tbody className="divide-y divide-line border-y border-line">
              <tr>
                <th scope="row" className="py-5 text-start text-[0.9375rem] font-normal text-ink">
                  {t.pool.adultLabel}
                </th>
                <td className="py-5 text-end font-serif text-[1.35rem] text-turquoise">
                  {pool.adult} {t.common.lari}
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-5 text-start text-[0.9375rem] font-normal text-ink">
                  {t.pool.childLabel}
                  <span className="ms-2 text-[0.75rem] text-muted-foreground">
                    {t.pool.childNote}
                  </span>
                </th>
                <td className="py-5 text-end font-serif text-[1.35rem] text-turquoise">
                  {pool.child} {t.common.lari}
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-5 text-start text-[0.9375rem] font-normal text-ink">
                  {t.nav.stay}
                </th>
                <td className="py-5 text-end font-serif text-[1.0625rem] text-pistachio">
                  {t.pool.guestNote}
                </td>
              </tr>
            </tbody>
          </table>

          <dl className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-turquoise" strokeWidth={1.5} />
              <div>
                <dt className="sv-eyebrow mb-1">{t.pool.hours}</dt>
                <dd className="text-[0.9375rem] text-ink" dir="ltr">
                  {pool.openFrom} — {pool.openTo}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sun className="mt-0.5 size-4 shrink-0 text-turquoise" strokeWidth={1.5} />
              <div>
                <dt className="sv-eyebrow mb-1">{t.pool.season}</dt>
                <dd className="text-[0.9375rem] text-ink">{t.pool.seasonValue}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-4 shrink-0 text-turquoise" strokeWidth={1.5} />
              <div>
                <dt className="sv-eyebrow mb-1">{t.pool.limitTitle}</dt>
                <dd className="font-serif text-[1.35rem] text-turquoise">{pool.dailyLimit}</dd>
              </div>
            </div>
          </dl>

          {pool.provisional && <p className="mt-3 text-[0.75rem] text-muted-foreground">{t.common.provisional}</p>}

          <Link
            href="/booking"
            data-press
            className="mt-8 flex min-h-12 w-full items-center justify-center bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
            {t.pool.cta}
          </Link>
        </div>
      </div>

      <aside className="mt-10 border border-gold/40 bg-gold/[0.06] p-5 sm:p-7 md:mt-14 md:p-9">
        <h2 className="flex items-center gap-2.5 text-[1.125rem] text-ink">
          <Info className="size-4 text-gold" strokeWidth={1.5} />
          {t.pool.limitTitle}
        </h2>
        <p className="mt-4 max-w-[68ch] text-[0.9375rem] text-muted-foreground">
          {t.pool.limitBody}
        </p>
      </aside>

      <Faq title={t.pool.faq.title} items={t.pool.faq.items} className="mt-12 md:mt-16" />

      <ShareButton className="mt-12 justify-center md:mt-16" />
    </div>
  );
}

