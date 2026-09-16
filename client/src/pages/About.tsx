import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { SectionDivider } from "@/components/Ornaments";
import { useVenue } from "@/content/hooks";
import { useI18n } from "@/i18n";
import { JsonLd, Seo } from "@/seo/Seo";
import { breadcrumbs, lodgingBusiness } from "@/seo/jsonld";

export default function About() {
  const { t, lang } = useI18n();
  const venue = useVenue();
  const { capacity, attractions, about, menu } = venue;
  const prometheus = attractions[0]?.minutes ?? 0;

  const stats = [
    { value: capacity.units, label: t.about.stats.units },
    { value: capacity.maxGuests, label: t.about.stats.guests },
    { value: menu.itemCount, label: t.about.stats.dishes },
    { value: prometheus, label: t.about.stats.minutes },
  ];

  return (
    <div className="container py-10 md:py-20">
      <Seo path="/about" title={t.meta.pages.about.title} description={t.meta.pages.about.description} image={about.photos.main} />
      <JsonLd
        data={[
          lodgingBusiness({ lang, name: t.brand.name, description: t.meta.pages.about.description, venue }),
          breadcrumbs(lang, [{ name: t.nav.home, path: "/" }, { name: t.nav.about, path: "/about" }]),
        ]}
      />
      <SectionHeading as="h1" eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className="mt-9 grid gap-9 md:mt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-6 text-[0.975rem] text-muted-foreground">
          <p className="first-letter:float-start first-letter:me-2 first-letter:font-serif first-letter:text-[3.25rem] first-letter:leading-[0.82] first-letter:text-turquoise">
            {t.about.body1}
          </p>
          <p>{t.about.body2}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          <img
            src={about.photos.main}
            alt=""
            className="col-span-2 aspect-[16/10] w-full object-cover"
          />
          <img
            src={about.photos.detail1}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <img
            src={about.photos.detail2}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>

      <SectionDivider motif="borjgali" className="mt-12 md:mt-16" />

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-14 md:grid-cols-4 md:gap-x-8 md:gap-y-10">
        {stats.map((s, i) => (
          <div key={i}>
            <dd className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] leading-none text-turquoise">
              {s.value}
            </dd>
            <dt className="sv-eyebrow mt-3">{s.label}</dt>
          </div>
        ))}
      </dl>

      <ShareButton className="mt-12 justify-center md:mt-16" />
    </div>
  );
}

