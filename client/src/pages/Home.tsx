import { Link } from "wouter";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Dot, SectionDivider } from "@/components/Ornaments";
import { PHOTOS, GALLERY } from "@/lib/assets";
import { ATTRACTIONS, CAPACITY, CONTACT, POOL, UNITS, VENUE_SPACE } from "@shared/venue";
import { MENU_ITEM_COUNT } from "@shared/menuData";
import { isLocalSegment, useI18n } from "@/i18n";

function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[30rem] w-full overflow-hidden">
        <img
          src={PHOTOS.hero}
          alt={t.brand.name}
          className="absolute inset-0 size-full object-cover"
        />
        {/* Legibility scrim, weighted to the text side */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/28 to-ink/10" />

        <div className="relative flex size-full items-end pb-16 md:pb-20">
          <div className="container">
            <p className="sv-eyebrow mb-5 flex w-fit items-center gap-2.5 text-white/85">
              <Dot />
              {t.hero.eyebrow}
            </p>
            <h1 className="max-w-[24ch] text-[clamp(1.9rem,5.2vw,3.5rem)] text-white">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[0.975rem] text-white/88 md:text-[1.0625rem]">
              {t.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href={`tel:${CONTACT.phone}`}
                data-press
                className="flex min-h-12 items-center gap-2.5 bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
                <Phone className="size-4" strokeWidth={1.5} />
                {t.hero.ctaPrimary}
              </a>
              <Link
                href="/menu"
                data-press
                className="flex min-h-12 items-center border border-white/45 px-7 text-[0.875rem] text-white transition-colors hover:border-white hover:bg-white/10">
                {t.hero.ctaSecondary}
              </Link>
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
    <section className="container py-20 md:py-28">
      <SectionHeading title={t.highlights.title} align="center" />
      <div className="sv-stagger mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {t.highlights.items.map((item, i) => (
          <article key={i}>
            <span className="font-serif text-[0.8125rem] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="my-4 h-px w-9 bg-gold/40" />
            <h3 className="text-[1.0625rem] text-ink">{item.title}</h3>
            <p className="mt-3 text-[0.875rem] text-muted-foreground">{item.body}</p>
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
      photo: PHOTOS.wedding,
      title: t.services.events.title,
      body: t.services.events.body,
      meta: `${VENUE_SPACE.coveredSeats} ${t.events.capacityLabel}`,
    },
    {
      key: "pool",
      href: "/pool",
      photo: PHOTOS.poolReal,
      title: t.services.pool.title,
      body: t.services.pool.body,
      meta: `${POOL.adult} ${t.common.lari} · ${t.pool.adultLabel}`,
    },
    {
      key: "restaurant",
      href: "/menu",
      photo: PHOTOS.restaurant,
      title: t.services.restaurant.title,
      body: t.services.restaurant.body,
      meta: t.restaurant.itemsCount,
    },
    {
      key: "stay",
      href: "/stay",
      photo: PHOTOS.bedroomTwin,
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
      <div className="container py-20 md:py-28">
        <SectionHeading eyebrow={t.services.subtitle} title={t.services.title} />
        <div className="sv-stagger mt-14 grid gap-6 sm:grid-cols-2">
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
              <div className="p-7 md:p-8">
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
  const cheapest = Math.min(...UNITS.map(u => u.priceLow));

  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow={t.stay.eyebrow} title={t.stay.title} intro={t.stay.intro} />
          <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-line py-7">
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
            className="mt-7 inline-flex min-h-12 items-center gap-2.5 bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
            {t.common.viewAll}
            <ArrowRight className="rtl-flip size-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
          <img
            src={PHOTOS.cottageExterior}
            alt=""
            loading="lazy"
            className="col-span-2 aspect-[16/10] w-full object-cover"
          />
          <img
            src={PHOTOS.bedroomLoft}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <img
            src={PHOTOS.roomSitting}
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
      <div className="container py-20 md:py-28">
        <SectionHeading
          eyebrow={t.location.eyebrow}
          title={t.location.title}
          intro={t.location.intro}
        />
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {top.map(a => {
            const info = t.location.attractions[a.id as keyof typeof t.location.attractions];
            return (
              <li
                key={a.id}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5">
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
          className="mt-9 inline-flex min-h-12 items-center gap-2.5 border border-line bg-white px-7 text-[0.875rem] text-ink transition-colors hover:border-pistachio">
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
    <section className="container py-20 md:py-28">
      <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} align="center" />
      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
        {GALLERY.map((src, i) => (
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
      <div className="container py-16 text-center md:py-20">
        <SectionDivider motif="vine" className="mx-auto max-w-xs" />
        <h2 className="mt-8 text-[clamp(1.5rem,3.2vw,2.15rem)] text-ink">{t.booking.title}</h2>
        <p className="mx-auto mt-5 max-w-[54ch] text-[0.9375rem] text-muted-foreground">
          {t.booking.intro}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
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
