import { Link } from "wouter";
import { ArrowUpRight, ChefHat, Info, Phone, Users } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { getEventPageCopy } from "@/lib/eventDetailCopy";
import { CONTACT, EVENT_TYPES, VENUE_SPACE } from "@shared/venue";
import { useI18n } from "@/i18n";

const REAL_SPACE_PHOTOS = [
  "/events/real-11.jpg",
  "/events/real-10.jpg",
  "/events/real-07.jpg",
  "/events/real-15.jpg",
  "/events/real-09.jpg",
] as const;

export default function Events() {
  const { lang, t } = useI18n();
  const copy = getEventPageCopy(lang);

  return (
    <div>
      <div className="relative h-[58vh] min-h-[24rem] max-h-[44rem] overflow-hidden">
        <img
          src="/events/00-events-overview.webp"
          alt={t.events.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="relative flex size-full items-end pb-10 md:pb-14 [text-shadow:0_1px_14px_rgba(20,28,24,0.58)]">
          <div className="container">
            <p className="sv-eyebrow mb-4 w-fit text-white">
              {t.events.eyebrow}
            </p>
            <h1 className="max-w-[24ch] text-[clamp(2rem,5vw,3.4rem)] text-white">
              {t.events.title}
            </h1>
            <p className="mt-5 max-w-[58ch] text-[0.94rem] leading-7 text-white/90">
              {t.events.intro}
            </p>
          </div>
        </div>
      </div>

      <main className="container py-14 md:py-20">
        <section className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="sv-eyebrow">{copy.explore}</p>
            <h2 className="mt-4 max-w-[24ch] text-[clamp(1.55rem,3vw,2.25rem)] text-ink">
              {copy.overviewTitle}
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-8 border-s-2 border-gold/40 ps-6 md:ps-8">
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
        </section>

        <section className="sv-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map(event => {
            const info = copy.events[event.id];
            return (
              <article
                key={event.id}
                className="sv-card group flex flex-col overflow-hidden"
              >
                <Link
                  href={`/events/${event.id}?lang=${lang}`}
                  className="block aspect-[4/3] overflow-hidden bg-pistachio/10"
                >
                  <img
                    src={event.photo}
                    alt={info.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-[1.2rem] text-ink">{info.title}</h3>
                  <p className="mt-3 flex-1 text-[0.84rem] leading-6 text-muted-foreground">
                    {info.body}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span className="flex items-center gap-2 text-[0.76rem] text-turquoise">
                      <Users className="size-3.5" strokeWidth={1.5} />
                      {event.minGuests}–{event.maxGuests} {copy.guests}
                    </span>
                    <Link
                      href={`/events/${event.id}?lang=${lang}`}
                      aria-label={info.title}
                      className="inline-flex size-9 items-center justify-center border border-line text-turquoise transition-colors hover:border-turquoise hover:bg-turquoise hover:text-white"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-20">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="sv-eyebrow">{copy.gallery}</p>
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] text-ink">
                {copy.galleryIntro}
              </h2>
              <p className="mt-5 flex items-center gap-2 text-[0.82rem] text-turquoise">
                <ChefHat className="size-4" strokeWidth={1.5} />
                {copy.events.masterclass.title}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
              {REAL_SPACE_PHOTOS.map((photo, index) => (
                <img
                  key={photo}
                  src={photo}
                  alt={`${copy.gallery} ${index + 1}`}
                  loading="lazy"
                  className="aspect-[4/5] size-full object-cover"
                />
              ))}
            </div>
          </div>
        </section>

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
            href={`/booking?interest=whole&lang=${lang}`}
            data-press
            className="flex min-h-12 items-center bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep"
          >
            {t.events.cta}
          </Link>
          <a
            href={`tel:${CONTACT.phone}`}
            dir="ltr"
            data-press
            className="flex min-h-12 items-center gap-2.5 border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio"
          >
            <Phone className="size-4 text-turquoise" strokeWidth={1.5} />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <ShareButton className="mt-16 justify-center" />
      </main>
    </div>
  );
}
