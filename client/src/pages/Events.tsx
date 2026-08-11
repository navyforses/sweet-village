import { Link } from "wouter";
import { Info, Phone, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { PHOTOS } from "@/lib/assets";
import { CONTACT, EVENT_TYPES, VENUE_SPACE } from "@shared/venue";
import { useI18n } from "@/i18n";

export default function Events() {
  const { t } = useI18n();

  return (
    <div>
      {/* Editorial banner — image with the heading sitting beneath it */}
      <div className="relative h-[52vh] min-h-[20rem] overflow-hidden">
        <img
          src={PHOTOS.eventSpace}
          alt={t.events.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/25" />
        <div className="relative flex size-full items-end pb-12">
          <div className="container">
            <p className="sv-eyebrow mb-4 w-fit text-white/90">{t.events.eyebrow}</p>
            <h1 className="max-w-[26ch] text-[clamp(1.75rem,4.4vw,2.9rem)] text-white">
              {t.events.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <p className="max-w-[62ch] text-[0.975rem] text-muted-foreground">{t.events.intro}</p>
          <dl className="space-y-5 border-s-2 border-gold/40 ps-6">
            <div>
              <dt className="sv-eyebrow mb-1.5">{t.events.capacityLabel}</dt>
              <dd className="font-serif text-[1.5rem] text-turquoise">
                {t.common.upTo} {VENUE_SPACE.coveredSeats}
              </dd>
            </div>
            <div>
              <dt className="sv-eyebrow mb-1.5">{t.restaurant.eyebrow}</dt>
              <dd className="font-serif text-[1.5rem] text-turquoise">
                {VENUE_SPACE.restaurantSeats}
              </dd>
            </div>
          </dl>
        </div>

        <div className="sv-stagger mt-16 grid gap-6 sm:grid-cols-2">
          {EVENT_TYPES.map(ev => {
            const info = t.events.types[ev.id as keyof typeof t.events.types];
            return (
              <article key={ev.id} className="sv-card group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={ev.photo}
                    alt={info.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7">
                  <h2 className="text-[1.25rem] text-ink">{info.title}</h2>
                  <p className="mt-3 text-[0.875rem] text-muted-foreground">{info.body}</p>
                  <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[0.8125rem] text-turquoise">
                    <Users className="size-3.5" strokeWidth={1.5} />
                    {ev.minGuests}–{ev.maxGuests} {t.events.capacityLabel}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* The buyout rule — stated plainly, because it prevents bad reviews. */}
        <aside className="mt-16 border border-gold/40 bg-gold/[0.06] p-7 md:p-9">
          <h2 className="flex items-center gap-2.5 text-[1.125rem] text-ink">
            <Info className="size-4 text-gold" strokeWidth={1.5} />
            {t.events.policy.title}
          </h2>
          <p className="mt-4 max-w-[68ch] text-[0.9375rem] text-muted-foreground">
            {t.events.policy.body}
          </p>
        </aside>

        <div className="mt-14 flex flex-wrap items-center gap-3.5">
          <Link
            href="/booking"
            data-press
            className="flex min-h-12 items-center bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
            {t.events.cta}
          </Link>
          <a
            href={`tel:${CONTACT.phone}`}
            dir="ltr"
            data-press
            className="flex min-h-12 items-center gap-2.5 border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio">
            <Phone className="size-4 text-turquoise" strokeWidth={1.5} />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <ShareButton className="mt-16 justify-center" />
      </div>
    </div>
  );
}
