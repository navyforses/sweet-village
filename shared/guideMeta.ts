/**
 * Metadata of the seed guide articles: everything except the article bodies
 * and FAQs, which live in ./guideBodies.ts so the browser bundle can leave
 * them out (see ./guideCopy.stub.ts) and load them only on an article page.
 */
import type { Lang, LocalizedText } from "./langs.js";

export interface GuideSeedMeta {
  slug: string;
  publishedAt: string;
  /** Key of the default photo used as the cover (see shared/venuePhotos.ts). */
  cover: "hero" | "cottageExterior" | "terrace" | "poolReal" | "poolDay" | "wedding" | "banquet" | "eventSpace" | "restaurant";
  attractionIds: string[];
  /** Languages the body is written in. */
  bodyLangs: Lang[];
  title: LocalizedText;
  excerpt: LocalizedText;
}

/** Placeholder body in the browser bundle: "written, but not loaded yet". */
export const GUIDE_BODY_PENDING = "\u2026";

const text = (ka: string, en: string): LocalizedText => ({ ka, en, ru: "", ar: "", fr: "", es: "" });

export const GUIDE_META: GuideSeedMeta[] = [
  {
    slug: "prometheus-cave",
    publishedAt: "2026-09-16",
    cover: "hero",
    bodyLangs: ["ka", "en"],
    attractionIds: ["prometheus"],
    title: text("პრომეთეს მღვიმე: ბილეთი, საათები და როგორ მივიდეთ", "Prometheus Cave: Tickets, Opening Hours and How to Get There"),
    excerpt: text(
      "ყველაფერი, რაც ვიზიტამდე უნდა იცოდეთ: სამუშაო საათები, ბილეთის ფასი, ნავით გასეირნება, რა ჩაიცვათ და როგორ მოხვდეთ მღვიმეში ქუთაისიდან, წყალტუბოდან ან ტკბილი სოფლიდან — 2 წუთში.",
      "Everything to know before you go: opening hours, ticket prices, the boat ride, what to wear and how to reach the cave from Kutaisi, Tskaltubo or Sweet Village, which is two minutes away.",
    ),
  },
  {
    slug: "tskaltubo-things-to-do",
    publishedAt: "2026-09-16",
    cover: "terrace",
    bodyLangs: ["ka", "en"],
    attractionIds: ["tskaltubo"],
    title: text("წყალტუბოში რა ვნახოთ: სანატორიუმები, პარკი და თერმული წყლები", "Things to Do in Tskaltubo: Sanatoriums, the Park and the Thermal Waters"),
    excerpt: text(
      "საბჭოთა კურორტის დიდებული ნანგრევები, სტალინის აბანო, რადონული წყლები და ცენტრალური პარკი — როგორ დაათვალიეროთ წყალტუბო ერთ ნახევარ დღეში, ტკბილი სოფლიდან 12 წუთში.",
      "Grand Soviet-era spa ruins, Stalin's bathhouse, radon waters and the central park: how to see Tskaltubo in half a day, twelve minutes from Sweet Village.",
    ),
  },
  {
    slug: "okatse-martvili-day-trip",
    publishedAt: "2026-09-16",
    cover: "poolDay",
    bodyLangs: ["ka", "en"],
    attractionIds: ["okatse", "martvili"],
    title: text("ოკაცე და მარტვილის კანიონები ერთ დღეში", "Okatse and Martvili Canyons in One Day"),
    excerpt: text(
      "მარშრუტი ტკბილი სოფლიდან: ოკაცის დაკიდული ბილიკი, ქინჩხის ჩანჩქერი და მარტვილის კანიონი ნავით — დრო, ბილეთები, რიგითობა და რჩევები.",
      "A route from Sweet Village: Okatse's hanging walkway, Kinchkha waterfall and a boat ride through Martvili canyon, with timings, tickets, the best order and tips.",
    ),
  },
  {
    slug: "sataplia-dinosaur-footprints",
    publishedAt: "2026-09-16",
    cover: "cottageExterior",
    bodyLangs: ["ka", "en"],
    attractionIds: ["sataplia"],
    title: text("სათაფლია: დინოზავრების ნაკვალევი, მღვიმე და შუშის ბაქანი", "Sataplia: Dinosaur Footprints, the Cave and the Glass Platform"),
    excerpt: text(
      "ქუთაისთან ყველაზე მოსახერხებელი ნახევარდღიანი ვიზიტი: 120 მილიონი წლის ნაკვალევი, კოლხური ტყე, პატარა მღვიმე და შუშის ბაქანი — ტკბილი სოფლიდან 18 წუთში.",
      "The easiest half-day trip near Kutaisi: 120-million-year-old footprints, Colchic forest, a small cave and a glass viewing platform, 18 minutes from Sweet Village.",
    ),
  },
  {
    slug: "garden-wedding-imereti",
    publishedAt: "2026-09-16",
    cover: "wedding",
    bodyLangs: ["ka", "en"],
    attractionIds: [],
    title: text("ქორწილი ბუნებაში იმერეთში: სივრცე, სუფრა და როგორ დაგეგმოთ", "A Garden Wedding in Imereti: the Space, the Feast and How to Plan It"),
    excerpt: text(
      "რამდენი სტუმარი ეტევა, რას ნიშნავს იმერული სუფრა, როდის დაიწყოთ დაგეგმვა და რა ჰკითხოთ სივრცეს — პრაქტიკული გზამკვლევი ქორწილისა და ნიშნობისთვის ქუთაისთან.",
      "How many guests fit, what an Imeretian feast means, when to start planning and what to ask the venue: a practical guide to weddings and engagements near Kutaisi.",
    ),
  },
  {
    slug: "kutaisi-airport-to-sweet-village",
    publishedAt: "2026-09-16",
    cover: "restaurant",
    bodyLangs: ["ka", "en"],
    attractionIds: ["kutaisi"],
    title: text("ქუთაისის აეროპორტიდან ტკბილ სოფლამდე: ტაქსი, ავტობუსი, დრო და ფასი", "Kutaisi Airport to Sweet Village: Taxi, Bus, Time and Price"),
    excerpt: text(
      "ჩამოფრინდით ქუთაისში გვიან ღამით? როგორ მოხვდეთ ქვილიშორში 40 წუთში: ტაქსის ფასები, Bolt, ავტობუსი ქუთაისამდე, წინასწარი ტრანსფერი და 24-საათიანი მიღება.",
      "Landing in Kutaisi late at night? How to reach Kvilishori in 40 minutes: taxi prices, Bolt, the bus to Kutaisi, pre-arranged transfers and our 24-hour reception.",
    ),
  },
];
