import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Images,
  Users,
  X,
} from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { getEventPageCopy } from "@/lib/eventDetailCopy";
import { EVENT_TYPES, type EventId } from "@shared/venue";
import { useI18n } from "@/i18n";
import NotFound from "./NotFound";

export default function EventDetail() {
  const [, params] = useRoute("/events/:eventId");
  const { lang } = useI18n();
  const copy = getEventPageCopy(lang);
  const event = EVENT_TYPES.find(candidate => candidate.id === params?.eventId);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  useEffect(() => {
    if (activePhoto === null || !event) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Escape") setActivePhoto(null);
      if (keyEvent.key === "ArrowLeft")
        setActivePhoto(current =>
          current === null
            ? 0
            : (current - 1 + event.gallery.length) % event.gallery.length
        );
      if (keyEvent.key === "ArrowRight")
        setActivePhoto(current =>
          current === null ? 0 : (current + 1) % event.gallery.length
        );
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto, event]);

  if (!event) return <NotFound />;
  const info = copy.events[event.id as EventId];
  const generatedPhotoCount = event.id === "poolside" ? 4 : 2;
  const previous = () =>
    setActivePhoto(current =>
      current === null
        ? 0
        : (current - 1 + event.gallery.length) % event.gallery.length
    );
  const next = () =>
    setActivePhoto(current =>
      current === null ? 0 : (current + 1) % event.gallery.length
    );

  return (
    <div className="pb-12">
      <section className="container pt-9 md:pt-12">
        <Link
          href={`/events?lang=${lang}`}
          className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={1.5} />
          {copy.back}
        </Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="sv-eyebrow">{copy.explore}</p>
            <h1 className="mt-4 max-w-[24ch] text-[clamp(2rem,5vw,3.4rem)] text-ink">
              {info.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[0.95rem] leading-7 text-muted-foreground">
              {info.body}
            </p>
          </div>
          <div className="border-s-2 border-gold/40 ps-6 md:ps-8">
            <p className="sv-eyebrow">{copy.details}</p>
            <p className="mt-3 font-serif text-[1.35rem] text-turquoise">
              {info.experience}
            </p>
            <p className="mt-4 flex items-center gap-2 text-[0.8rem] text-muted-foreground">
              <Users className="size-4 text-turquoise" strokeWidth={1.5} />
              {event.minGuests}–{event.maxGuests} {copy.guests}
            </p>
          </div>
        </div>
      </section>

      <section className="container mt-10 md:mt-12">
        <div className="grid snap-x snap-mandatory grid-flow-col auto-cols-[86%] gap-2.5 overflow-x-auto pb-2 md:h-[clamp(300px,34vw,430px)] md:snap-none md:grid-flow-row md:auto-cols-auto md:grid-cols-4 md:grid-rows-2 md:gap-2 md:overflow-visible md:pb-0">
          {event.gallery.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setActivePhoto(index)}
              className={`group relative aspect-[4/3] snap-start overflow-hidden bg-pistachio/10 text-start md:aspect-auto md:h-full ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} ${index > 4 ? "md:hidden" : ""}`}
              aria-label={`${info.title} — ${copy.gallery} ${index + 1}`}
            >
              <img
                src={photo}
                alt={`${info.title} — ${copy.gallery} ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-4 py-2.5 text-[0.72rem] text-white">
                {index === 0
                  ? info.experience
                  : index < generatedPhotoCount
                    ? `${copy.professionalConcept} · ${index + 1}`
                    : `${copy.realVenuePhoto} · ${index + 1}`}
              </span>
              {index === 4 && event.gallery.length > 5 && (
                <span className="absolute end-3 top-3 hidden items-center gap-1.5 bg-white/95 px-3 py-2 text-[0.75rem] text-ink shadow-sm md:inline-flex">
                  <Images className="size-4" strokeWidth={1.5} />
                  {copy.viewAll} ({event.gallery.length})
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-3 max-w-[64ch] text-[0.75rem] text-muted-foreground">
          {copy.galleryIntro}
        </p>
      </section>

      <section className="container mt-14 md:mt-18">
        <div className="grid gap-8 border-y border-line py-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="sv-eyebrow">{copy.details}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {info.highlights.map(item => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[0.84rem] leading-6 text-ink"
                >
                  <Check
                    className="mt-1 size-4 shrink-0 text-turquoise"
                    strokeWidth={1.6}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.72rem] text-muted-foreground">
              {copy.realPhotoNote}
            </p>
          </div>
          <Link
            href={`/booking?interest=whole&guests=${event.minGuests}&lang=${lang}`}
            data-press
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep"
          >
            {copy.ask}
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
        <ShareButton className="mt-12 justify-center" />
      </section>

      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={copy.gallery}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative flex max-h-full w-full max-w-6xl items-center justify-center"
            onClick={clickEvent => clickEvent.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute end-3 top-3 z-10 inline-flex size-11 items-center justify-center bg-ink/80 text-white hover:bg-turquoise"
              aria-label={copy.close}
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={previous}
              className="absolute start-2 z-10 inline-flex size-11 items-center justify-center bg-ink/80 text-white hover:bg-turquoise sm:start-4"
              aria-label={copy.previous}
            >
              <ChevronLeft className="size-6 rtl:rotate-180" />
            </button>
            <figure className="flex max-h-[90vh] max-w-full flex-col items-center">
              <img
                src={event.gallery[activePhoto]}
                alt={`${info.title} — ${activePhoto + 1}`}
                className="max-h-[82vh] max-w-full object-contain"
              />
              <figcaption className="mt-3 bg-ink/80 px-4 py-2 text-[0.78rem] text-white">
                {activePhoto + 1} / {event.gallery.length} · {info.title}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={next}
              className="absolute end-2 z-10 inline-flex size-11 items-center justify-center bg-ink/80 text-white hover:bg-turquoise sm:end-4"
              aria-label={copy.next}
            >
              <ChevronRight className="size-6 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
