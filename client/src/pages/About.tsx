import SectionHeading from "@/components/SectionHeading";
import ShareButton from "@/components/ShareButton";
import { SectionDivider } from "@/components/Ornaments";
import { PHOTOS } from "@/lib/assets";
import { ATTRACTIONS, CAPACITY } from "@shared/venue";
import { MENU_ITEM_COUNT } from "@shared/menuData";
import { useI18n } from "@/i18n";

export default function About() {
  const { t } = useI18n();
  const prometheus = ATTRACTIONS[0].minutes;

  const stats = [
    { value: CAPACITY.units, label: t.about.stats.units },
    { value: CAPACITY.maxGuests, label: t.about.stats.guests },
    { value: MENU_ITEM_COUNT, label: t.about.stats.dishes },
    { value: prometheus, label: t.about.stats.minutes },
  ];

  return (
    <div className="container py-10 md:py-20">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className="mt-9 grid gap-9 md:mt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-6 text-[0.975rem] text-muted-foreground">
          <p className="first-letter:float-start first-letter:me-2 first-letter:font-serif first-letter:text-[3.25rem] first-letter:leading-[0.82] first-letter:text-turquoise">
            {t.about.body1}
          </p>
          <p>{t.about.body2}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          <img
            src={PHOTOS.terrace}
            alt=""
            className="col-span-2 aspect-[16/10] w-full object-cover"
          />
          <img
            src={PHOTOS.roomDetail}
            alt=""
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <img
            src={PHOTOS.banquet}
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

