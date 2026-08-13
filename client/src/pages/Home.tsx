import { Link } from "wouter";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Dot, SectionDivider } from "@/components/Ornaments";
import { HOME_PHOTOS, HOME_GALLERY } from "@/lib/assets";
import { ATTRACTIONS, CAPACITY, CONTACT, POOL, UNITS, VENUE_SPACE } from "@shared/venue";
import { MENU_ITEM_COUNT } from "@shared/menuData";
import { isLocalSegment, useI18n } from "@/i18n";

function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative bg-background pb-10 md:pb-20">
      <div className="relative h-[52svh] min-h-[21rem] max-h-[31rem] w-full overflow-hidden md:h-[70vh] md:min-h-[27rem] md:max-h-none">
        <img
          src={HOME_PHOTOS.hero}
          alt={t.brand.name}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-center"
        />
        {/* Keep the hospitality photograph unobstructed; only a light vignette shapes the frame. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/16 via-transparent to-ink/6" />
      </div>

      {/* Editorial hospitality pattern: copy receives its own floating surface instead of covering a cottage. */}
      <div className="container relative z-10 -mt-7 md:-mt-14">
        <div className="border border-ink/8 bg-background/97 px-5 py-6 shadow-[0_18px_50px_rgba(26,42,35,0.14)] backdrop-blur-md sm:px-8 md:px-10 md:py-9">
          <div className="grid items-center gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <p className="sv-eyebrow mb-3 flex w-fit items-center gap-2.5 text-turquoise md:mb-4">
                <Dot />
                {t.hero.eyebrow}
              </p>
              <h1 className="max-w-[27ch] text-[clamp(1.65rem,7.5vw,2.9rem)] leading-[1.1] text-ink">
                {t.hero.title}
              </h1>
            </div>

            <div className="border-t border-ink/10 pt-5 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
              <p className="max-w-[48ch] text-[0.925rem] text-muted-foreground md:text-[1rem]">
                {t.hero.subtitle}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-press
                  className="flex min-h-12 items-center justify-center gap-2 bg-turquoise px-4 text-center text-[0.8125rem] text-white transition-colors hover:bg-deep sm:px-7 sm:text-[0.875rem]">
                  <Phone className="size-4" strokeWidth={1.5} />
                  {t.hero.ctaPrimary}
                </a>
                <Link
                  href="/menu"
                  data-press
                  className="flex min-h-12 items-center justify-center border border-ink/20 px-4 text-center text-[0.8125rem] text-ink transition-colors hover:border-turquoise hover:text-turquoise sm:px-7 sm:text-[0.875rem]">
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const { t } = useI18n();
  return (
    <section className="container py-14 md:py-28">
      <SectionHeading title={t.highlights.title} align="center" />
      <div className="sv-stagger mt-9 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-14 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4">
        {t.highlights.items.map((item, i) => (
          <article key={i}>
            <span className="font-serif text-[0.8125rem] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="my-4 h-px w-9 bg-gold/40" />
            <h3 className="text-[1.0625rem] text-ink">{item.title}</h3>
            <p className="mt-2.5 text-[0.8125rem] text-muted-foreground sm:mt-3 sm:text-[0.875rem]">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Cube grid of the four business lines, ordered by audience segment. */
function Services() {
  const { t, lang } = useI18n();

  const cards = [
    {
      key: "events",
      href: "/events",
      photo: HOME_PHOTOS.events,
      title: t.services.events.title,
      body: t.services.events.body,
      meta: `${VENUE_SPACE.coveredSeats} ${t.events.capacityLabel}`,
    },
    {
      key: "pool",
      href: "/pool",
      photo: HOME_PHOTOS.pool,
      title: t.services.pool.title,
      body: t.services.pool.body,
      meta: `${POOL.adult} ${t.common.lari} · ${t.pool.adultLabel}`,
    },
    {
      key: "restaurant",
      href: "/menu",
      photo: HOME_PHOTOS.restaurant,
      title: t.services.restaurant.title,
      body: t.services.restaurant.body,
      meta: t.restaurant.itemsCount,
    },
    {
      key: "stay",
      href: "/stay",
      photo: HOME_PHOTOS.stay,
      title: t.services.stay.title,
      body: t.services.stay.body,
      meta: `${CAPACITY.units} · ${CAPACITY.maxGuests} ${t.common.guests}`,
    },
  ];

  // Locals: events + pool lead. Travellers: stay + restaurant lead.
  const order = isLocalSegment(lang)
    ? ["events", "pool", "restaurant", "stay"]
    : ["stay", "restaurant", "pool", "events"];
  const ordered = order.map(k => cards.find(c => c.key === k)!);

  return (
    <section className="border-t border-line bg-white">
      <div className="container py-14 md:py-28">
        <SectionHeading eyebrow={t.services.subtitle} title={t.services.title} />
        <div className="sv-stagger mt-9 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {ordered.map(c => (
            <Link key={c.key} href={c.href} className="sv-card group block">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={c.photo}
                  alt={c.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5 sm:p-7 md:p-8">
                <p className="sv-eyebrow mb-3">{c.meta}</p>
                <h3 className="text-[1.25rem] text-ink">{c.title}</h3>
                <p className="mt-3 text-[0.875rem] text-muted-foreground">{c.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-turquoise">
                  {t.common.learnMore}
                  <ArrowRight className="rtl-flip size-3.5" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayTeaser() {
  const { t } = useI18n();
  const cheapest = Math.min(...UNITS.map(u => u.nightlyPrice));

  return (
    <section className="container py-14 md:py-28">
      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow={t.stay.eyebrow} title={t.stay.title} intro={t.stay.intro} />
          <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-line py-6 sm:mt-10 sm:gap-6 sm:py-7">
            <div>
              <dt className="sv-eyebrow mb-2">{t.about.stats.units}</dt>
              <dd className="font-serif text-[1.75rem] text-turquoise">{CAPACITY.units}</dd>
            </div>
            <div>
              <dt className="sv-eyebrow mb-2">{t.common.beds}</dt>
              <dd className="font-serif text-[1.75rem] text-turquoise">{CAPACITY.beds}</dd>
            </div>
            <div>
              <dt className="sv-eyebrow mb-2">{t.about.stats.guests}</dt>
              <dd className="font-serif text-[1.75rem] text-turquoise">{CAPACITY.maxGuests}</dd>
            </div>
          </dl>
          <p className="mt-7 text-[0.875rem] text-muted-foreground">
            {t.common.from} {cheapest} {t.common.lari} / {t.common.perNight}
          </p>
          <Link
            href="/stay"
            data-press
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2.5 bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep sm:w-auto">
            {t.common.viewAll}
            <ArrowRight className="rtl-flip size-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="order-1 grid grid-cols-2 gap-2.5 sm:gap-4 lg:order-2">
          <img
            src={HOME_PHOTOS.cottageExterior}
            alt=""
            loading="lazy"
            className="col-span-2 aspect-[16/10] w-full object-cover"
          />
          <img
            src={HOME_PHOTOS.cottageBedroom}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <img
            src={HOME_PHOTOS.cottageStudio}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function LocationTeaser() {
  const { t } = useI18n();
  const top = ATTRACTIONS.slice(0, 5);

  return (
    <section className="border-y border-line bg-white">
      <div className="container py-14 md:py-28">
        <SectionHeading
          eyebrow={t.location.eyebrow}
          title={t.location.title}
          intro={t.location.intro}
        />
        <ul className="mt-9 divide-y divide-line border-y border-line md:mt-12">
          {top.map(a => {
            const info = t.location.attractions[a.id as keyof typeof t.location.attractions];
            return (
              <li
                key={a.id}
                className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 py-4 md:flex md:flex-wrap md:items-baseline md:justify-between md:gap-x-6 md:py-5">
                <div className="min-w-0">
                  <h3 className="text-[1.0625rem] text-ink">{info.title}</h3>
                  <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">{info.note}</p>
                </div>
                <p className="flex shrink-0 items-center gap-2 font-serif text-[0.9375rem] text-turquoise">
                  <Clock className="size-3.5" strokeWidth={1.5} />
                  {a.minutes} {t.common.minutes}
                </p>
              </li>
            );
          })}
        </ul>
        <Link
          href="/location"
          data-press
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio sm:mt-9 sm:w-auto">
          <MapPin className="size-4 text-turquoise" strokeWidth={1.5} />
          {t.common.viewAll}
        </Link>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useI18n();
  return (
    <section className="container py-14 md:py-28">
      <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} align="center" />
      <div className="mt-9 grid grid-cols-2 gap-2 md:mt-14 md:grid-cols-4 md:gap-3">
        {HOME_GALLERY.map((src, i) => (
          <figure
            key={i}
            className={`overflow-hidden ${i % 5 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}>
            <img
              src={src}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

function BookingBand() {
  const { t } = useI18n();
  return (
    <section className="border-t border-line bg-pistachio/12">
      <div className="container py-12 text-center md:py-20">
        <SectionDivider motif="vine" className="mx-auto max-w-xs" />
        <h2 className="mt-8 text-[clamp(1.5rem,3.2vw,2.15rem)] text-ink">{t.booking.title}</h2>
        <p className="mx-auto mt-5 max-w-[54ch] text-[0.9375rem] text-muted-foreground">
          {t.booking.intro}
        </p>
        <div className="mt-8 grid gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5">
          <Link
            href="/booking"
            data-press
            className="flex min-h-12 items-center bg-turquoise px-8 text-[0.875rem] text-white transition-colors hover:bg-deep">
            {t.nav.book}
          </Link>
          <a
            href={`tel:${CONTACT.phone}`}
            data-press
            dir="ltr"
            className="flex min-h-12 items-center gap-2.5 border border-ink/20 px-8 text-[0.875rem] text-ink transition-colors hover:border-ink/45">
            <Phone className="size-4 text-turquoise" strokeWidth={1.5} />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { lang } = useI18n();
  const local = isLocalSegment(lang);

  return (
    <>
      <Hero />
      <Highlights />
      <Services />
      {/* Locals already know the region; travellers need the map first. */}
      {local ? (
        <>
          <StayTeaser />
          <LocationTeaser />
        </>
      ) : (
        <>
          <LocationTeaser />
          <StayTeaser />
        </>
      )}
      <Gallery />
      <BookingBand />
      <span className="hidden">{MENU_ITEM_COUNT}</span>
    </>
  );
}
