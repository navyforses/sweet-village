import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, BedDouble, Check, Layers, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { SectionDivider } from "@/components/Ornaments";
import { getStayExperienceCopy, STAY_FILTER_UNITS, type GuestFilter } from "@/lib/stayExperience";
import { CAPACITY, UNITS, type UnitId } from "@shared/venue";
import { useI18n } from "@/i18n";

const FILTERS: GuestFilter[] = ["all", "couple", "four", "six", "whole"];

export default function Stay() {
  const { t, lang } = useI18n();
  const copy = getStayExperienceCopy(lang);
  const [filter, setFilter] = useState<GuestFilter>("all");
  const visibleUnits = filter === "all" || filter === "whole" ? UNITS : UNITS.filter(unit => STAY_FILTER_UNITS[filter].includes(unit.id));
  const unitHref = (unit: UnitId) => `/booking?interest=cottage&unit=${unit}&lang=${lang}`;

  return (
    <div className="pb-4">
      <section className="container pt-16 md:pt-20">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

        <dl className="mt-10 grid grid-cols-3 gap-0 border-y border-line py-6 sm:mt-12">
          {[
            [CAPACITY.units, copy.inventory.units],
            [CAPACITY.beds, copy.inventory.beds],
            [CAPACITY.maxGuests, copy.inventory.capacity],
          ].map(([value, label], index) => (
            <div key={String(label)} className={index ? "border-s border-line ps-4 sm:ps-7" : ""}>
              <dd className="font-serif text-[clamp(1.75rem,4vw,2.55rem)] leading-none text-turquoise">{value}</dd>
              <dt className="sv-eyebrow mt-2.5 max-w-[12ch] leading-[1.4]">{label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-10 border-b border-line pb-8">
          <p className="sv-eyebrow mb-4">{copy.chooseTitle}</p>
          <div className="flex flex-wrap gap-2.5" role="group" aria-label={copy.chooseTitle}>
            {FILTERS.map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={`min-h-11 border px-4 text-[0.8125rem] transition-colors ${
                  filter === value ? "border-turquoise bg-turquoise text-white" : "border-line bg-white text-ink hover:border-pistachio"
                }`}>
                {copy.filters[value]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filter === "whole" ? (
        <section className="container mt-12 md:mt-16">
          <div className="grid gap-8 bg-deep px-6 py-8 text-white sm:px-9 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-12">
            <div>
              <p className="sv-eyebrow text-gold">{copy.whole.eyebrow}</p>
              <h2 className="mt-3 max-w-xl text-[clamp(1.65rem,3.3vw,2.65rem)] leading-tight">{copy.whole.title}</h2>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-7 text-white/80">{copy.whole.body}</p>
            </div>
            <Link href={`/booking?interest=whole&guests=${CAPACITY.maxGuests}&lang=${lang}`} data-press className="inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-6 text-[0.875rem] text-ink transition-colors hover:bg-white">
              {copy.whole.cta}<ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      ) : (
        <section className="container mt-12 md:mt-16">
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:gap-x-8 lg:gap-y-14">
            {visibleUnits.map(unit => {
              const info = t.stay.units[unit.id as UnitId];
              return (
                <article key={unit.id} className="group border-b border-line pb-8">
                  <Link href={`/stay/${unit.id}?lang=${lang}`} className="relative block overflow-hidden bg-pistachio/10" aria-label={`${info.title} — ${copy.card.askAbout}`}>
                    <img src={unit.gallery[0]} alt={info.title} loading={unit.id === "small-a" ? "eager" : "lazy"} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/78 px-4 py-2.5 text-[0.75rem] text-white">
                      <span>{copy.card.sleeps} {unit.maxGuests} {t.common.guests} · {unit.beds} {t.common.beds}</span><ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                  <div className="pt-5">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.65rem)] text-ink"><Link href={`/stay/${unit.id}?lang=${lang}`} className="hover:text-turquoise">{info.title}</Link></h2>
                    <p className="mt-2 text-[0.875rem] text-turquoise"><span className="font-medium text-ink">{copy.card.bestFor}: </span>{copy.suitability[unit.id]}</p>
                    <p className="mt-3 max-w-[62ch] text-[0.875rem] leading-6 text-muted-foreground">{info.body}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-4 text-[0.75rem] text-ink">
                      <span className="flex items-center gap-1.5"><BedDouble className="size-3.5 text-turquoise" strokeWidth={1.5} />{unit.beds} {t.common.beds}</span>
                      <span className="flex items-center gap-1.5"><Users className="size-3.5 text-turquoise" strokeWidth={1.5} />{copy.card.sleeps} {unit.maxGuests}</span>
                      {unit.floors > 1 && <span className="flex items-center gap-1.5"><Layers className="size-3.5 text-turquoise" strokeWidth={1.5} />{unit.floors} {copy.card.floors}</span>}
                    </div>
                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p dir="ltr" className="font-serif text-[1.25rem] text-ink">{unit.priceLow}–{unit.priceHigh} {t.common.lari}<span className="ms-1 font-sans text-[0.75rem] text-muted-foreground">/ {t.common.perNight}</span></p>
                        <p className="mt-1 text-[0.7rem] text-muted-foreground">{copy.card.seasonal}</p>
                      </div>
                      <Link href={unitHref(unit.id)} data-press className="inline-flex min-h-11 items-center gap-2 border border-turquoise px-4 text-[0.8125rem] text-turquoise transition-colors hover:bg-turquoise hover:text-white">
                        {copy.card.askAbout}<ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="container mt-16 md:mt-20">
        <SectionDivider motif="vine" />
        <div className="mt-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[1.45rem] text-ink">{copy.facilitiesTitle}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.stay.facilities.items.map((item, index) => <li key={index} className="flex items-start gap-3 text-[0.875rem] text-ink"><Check className="mt-1 size-4 shrink-0 text-pistachio" strokeWidth={1.5} />{item}</li>)}
          </ul>
        </div>
        <ShareButton className="mt-16 justify-center" />
      </section>
    </div>
  );
}
