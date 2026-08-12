import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, BedDouble, Layers, Users, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { getAccommodationDetailCopy } from "@/lib/accommodationDetailCopy";
import { CAPACITY, UNITS, type UnitId } from "@shared/venue";
import { useI18n } from "@/i18n";
import { assetUrl } from "@/lib/assetUrl";
import NotFound from "./NotFound";

export default function AccommodationDetail() {
  const [, params] = useRoute("/stay/:unitId");
  const { lang, t } = useI18n();
  const copy = getAccommodationDetailCopy(lang);
  const unit = UNITS.find(candidate => candidate.id === params?.unitId);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  if (!unit) return <NotFound />;

  const info = t.stay.units[unit.id as UnitId];
  const captions = unit.id === "large-a" || unit.id === "large-b" ? copy.largeCottageCaptions : copy.captions;
  const bookingHref = `/booking?interest=cottage&unit=${unit.id}&lang=${lang}`;

  return (
    <div className="pb-6">
      <section className="container pt-10 md:pt-14">
        <Link href={`/stay?lang=${lang}`} className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={1.5} />{copy.back}
        </Link>
        <div className="mt-7 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <SectionHeading eyebrow={copy.gallery} title={info.title} intro={info.body} />
          <div className="border-s border-line ps-6 sm:ps-8">
            <p className="sv-eyebrow">{copy.facts}</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-ink">
              <div><dd className="font-serif text-[1.5rem] text-turquoise">{unit.maxGuests}</dd><dt className="mt-1 text-[0.72rem] text-muted-foreground">{copy.sleeps}</dt></div>
              <div><dd className="font-serif text-[1.5rem] text-turquoise">{unit.beds}</dd><dt className="mt-1 text-[0.72rem] text-muted-foreground">{copy.beds}</dt></div>
              <div><dd className="font-serif text-[1.5rem] text-turquoise">{unit.floors}</dd><dt className="mt-1 text-[0.72rem] text-muted-foreground">{copy.floors}</dt></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="container mt-12 md:mt-16">
        <div className="grid gap-3 md:grid-cols-2">
          {unit.gallery.map((photo, index) => (
            <button key={photo} type="button" onClick={() => setActivePhoto(index)} className={`group relative overflow-hidden bg-pistachio/10 text-start ${index === 0 ? "md:col-span-2" : ""}`} aria-label={`${captions[index] ?? copy.gallery}: ${info.title}`}>
              <img src={assetUrl(photo)} alt={`${info.title} — ${captions[index] ?? copy.gallery}`} className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] ${index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`} />
              <span className="absolute inset-x-0 bottom-0 bg-ink/72 px-4 py-2.5 text-[0.75rem] text-white">{captions[index] ?? copy.gallery}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container mt-12 md:mt-16">
        <div className="grid gap-8 border-y border-line py-8 md:grid-cols-[1fr_auto] md:items-center md:py-10">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.875rem] text-ink">
            <span className="flex items-center gap-2"><BedDouble className="size-4 text-turquoise" strokeWidth={1.5} />{unit.beds} {copy.beds}</span>
            <span className="flex items-center gap-2"><Users className="size-4 text-turquoise" strokeWidth={1.5} />{copy.sleeps} {unit.maxGuests} {t.common.guests}</span>
            {unit.floors > 1 && <span className="flex items-center gap-2"><Layers className="size-4 text-turquoise" strokeWidth={1.5} />{unit.floors} {copy.floors}</span>}
          </div>
          <div className="flex flex-wrap items-center gap-5 md:justify-end">
            <div><p dir="ltr" className="font-serif text-[1.35rem] text-ink">{unit.priceLow}–{unit.priceHigh} {t.common.lari}<span className="ms-1 font-sans text-[0.75rem] text-muted-foreground">/ {t.common.perNight}</span></p><p className="mt-1 text-[0.7rem] text-muted-foreground">{copy.seasonal}</p></div>
            <Link href={bookingHref} data-press className="inline-flex min-h-12 items-center gap-2 bg-turquoise px-6 text-[0.875rem] text-white transition-colors hover:bg-deep">{copy.book}<ArrowUpRight className="size-4" strokeWidth={1.5} /></Link>
          </div>
        </div>
        <p className="mt-6 text-[0.75rem] text-muted-foreground">{CAPACITY.units} {t.about.stats.units} · {CAPACITY.beds} {t.common.beds} · {CAPACITY.maxGuests} {t.common.guests}</p>
        <ShareButton className="mt-14 justify-center" />
      </section>

      {activePhoto !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4" role="dialog" aria-modal="true" aria-label={copy.gallery} onClick={() => setActivePhoto(null)}>
          <div className="relative max-h-full max-w-6xl" onClick={event => event.stopPropagation()}>
            <button type="button" onClick={() => setActivePhoto(null)} className="absolute end-3 top-3 z-10 inline-flex size-11 items-center justify-center bg-ink/80 text-white hover:bg-turquoise" aria-label={copy.close}><X className="size-5" /></button>
            <img src={assetUrl(unit.gallery[activePhoto])} alt={`${info.title} — ${captions[activePhoto] ?? copy.gallery}`} className="max-h-[86vh] max-w-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
