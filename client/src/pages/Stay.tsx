import { Link } from "wouter";
import { BedDouble, Check, Layers, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { SectionDivider } from "@/components/Ornaments";
import { CAPACITY, CONTACT, UNITS, type UnitId } from "@shared/venue";
import { useI18n } from "@/i18n";

export default function Stay() {
  const { t } = useI18n();

  return (
    <div className="pb-4">
      <div className="container pt-16 md:pt-20">
        <SectionHeading eyebrow={t.stay.eyebrow} title={t.stay.title} intro={t.stay.intro} />

        <dl className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-7 sm:gap-6">
          <div>
            <dd className="font-serif text-[1.75rem] leading-none text-turquoise">
              {CAPACITY.units}
            </dd>
            <dt className="sv-eyebrow mt-2.5">{t.about.stats.units}</dt>
          </div>
          <div>
            <dd className="font-serif text-[1.75rem] leading-none text-turquoise">
              {CAPACITY.beds}
            </dd>
            <dt className="sv-eyebrow mt-2.5">{t.common.beds}</dt>
          </div>
          <div>
            <dd className="font-serif text-[1.75rem] leading-none text-turquoise">
              {CAPACITY.maxGuests}
            </dd>
            <dt className="sv-eyebrow mt-2.5">{t.about.stats.guests}</dt>
          </div>
        </dl>
      </div>

      {/* Alternating editorial rows — photo and copy swap sides each unit. */}
      <div className="container mt-16 space-y-16 md:mt-20 md:space-y-24">
        {UNITS.map((u, i) => {
          const info = t.stay.units[u.id as UnitId];
          const flip = i % 2 === 1;
          return (
            <article
              key={u.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={flip ? "lg:order-2" : ""}>
                <img
                  src={u.photo}
                  alt={info.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className={flip ? "lg:order-1" : ""}>
                <p className="sv-eyebrow mb-4">
                  {String(i + 1).padStart(2, "0")} / {CAPACITY.units}
                </p>
                <h2 className="text-[clamp(1.35rem,2.6vw,1.85rem)] text-ink">{info.title}</h2>
                <p className="mt-4 max-w-[54ch] text-[0.9375rem] text-muted-foreground">
                  {info.body}
                </p>

                <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-y border-line py-5 text-[0.8125rem] text-ink">
                  <li className="flex items-center gap-2">
                    <BedDouble className="size-4 text-turquoise" strokeWidth={1.5} />
                    {u.beds} {t.common.beds}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="size-4 text-turquoise" strokeWidth={1.5} />
                    {t.common.upTo} {u.maxGuests} {t.common.guests}
                  </li>
                  {u.floors > 1 && (
                    <li className="flex items-center gap-2">
                      <Layers className="size-4 text-turquoise" strokeWidth={1.5} />
                      {u.floors}
                    </li>
                  )}
                </ul>

                <p className="mt-6 font-serif text-[1.25rem] text-ink">
                  {u.priceLow}–{u.priceHigh} {t.common.lari}
                  <span className="ms-2 font-sans text-[0.75rem] text-muted-foreground">
                    / {t.common.perNight}
                  </span>
                </p>
                <p className="mt-2 text-[0.75rem] text-muted-foreground">
                  {t.common.provisional}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    data-press
                    className="flex min-h-12 items-center bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
                    {t.common.bookNow}
                  </Link>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    data-press
                    className="flex min-h-12 items-center border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio">
                    {t.common.askPrice}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="container mt-20">
        <SectionDivider motif="vine" />
        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <h2 className="text-[1.5rem] text-ink">{t.stay.facilities.title}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.stay.facilities.items.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                <Check className="mt-1 size-4 shrink-0 text-pistachio" strokeWidth={1.5} />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <ShareButton className="mt-16 justify-center" />
      </div>
    </div>
  );
}
