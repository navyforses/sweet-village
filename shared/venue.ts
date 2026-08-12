/**
 * Factual data about the venue. Single source of truth for capacity, pricing
 * and distances — every page reads from here so numbers can never drift.
 *
 * NOTE ON PRICES: these are indicative launch prices benchmarked against
 * comparable Tskaltubo cottage listings. They are marked `provisional` so the
 * owner can confirm or override before the site goes public.
 */

export const CONTACT = {
  phone: "+995599639614",
  phoneDisplay: "+995 599 63 96 14",
  whatsapp: "995599639614",
  email: "iobidzeioseb@gmail.com",
  instagram: "swe_etvillage",
  instagramUrl: "https://www.instagram.com/swe_etvillage/",
  facebookUrl: "https://www.facebook.com/sweetvillagecafe",
} as const;

export const LOCATION = {
  village: "ქვილიშორი",
  municipality: "წყალტუბო",
  region: "იმერეთი",
  lat: 42.3639,
  lng: 42.6203,
} as const;

export type UnitId = "small-a" | "small-b" | "large-a" | "large-b" | "grand";

export interface Unit {
  id: UnitId;
  /** Sleeping capacity on real beds. */
  beds: number;
  /** Maximum with the sofa bed opened. */
  maxGuests: number;
  floors: number;
  /** Indicative price range in GEL per night, low → high season. */
  priceLow: number;
  priceHigh: number;
  photo: string;
  /** Exterior and interior visuals for the public accommodation detail page. */
  gallery: readonly string[];
  provisional: true;
}

const LARGE_COTTAGE_GALLERY = [
  "/manus-storage/large-cottage-exterior-approved.webp",
  "/manus-storage/large-cottage-ground-floor-bedroom-approved.webp",
  "/manus-storage/large-cottage-second-floor-twin-bedroom-approved.webp",
  "/manus-storage/large-cottage-ground-floor-staircase-approved.webp",
  "/manus-storage/large-cottage-shared-kitchen-approved.webp",
  "/manus-storage/large-cottage-bathroom-approved.webp",
] as const;

const FAMILY_DUPLEX_B_GALLERY = [
  "/manus-storage/family-duplex-b-exterior.webp",
  ...LARGE_COTTAGE_GALLERY.slice(1),
] as const;

const GARDEN_COTTAGE_GALLERY = [
  "/manus-storage/garden-cottage-exterior.webp",
  "/manus-storage/garden-cottage-porch.webp",
  "/manus-storage/garden-cottage-studio.webp",
  "/manus-storage/garden-cottage-sleeping-area.webp",
  "/manus-storage/garden-cottage-garden-view.webp",
] as const;

const GARDEN_COTTAGE_2_GALLERY = [
  "/manus-storage/garden-cottage-2-exterior.webp",
  ...GARDEN_COTTAGE_GALLERY.slice(1),
] as const;

const POOL_VIEW_HOUSE_GALLERY = [
  "/pool-view-house/01-pool-view-house-exterior.webp",
  "/pool-view-house/02-balcony-and-pool.webp",
  "/pool-view-house/03-balcony-coffee.webp",
  "/pool-view-house/04-living-dining-wide.webp",
  "/pool-view-house/05-lower-bedroom-balcony.webp",
  "/pool-view-house/06-kitchen-dining-lounge.webp",
  "/pool-view-house/07-bedroom-and-stairs.webp",
  "/pool-view-house/08-upper-floor-three-beds.webp",
  "/pool-view-house/09-upper-floor-bedroom.webp",
  "/pool-view-house/10-bathroom.webp",
] as const;

export const UNITS: Unit[] = [
  {
    id: "small-a",
    beds: 2,
    maxGuests: 4,
    floors: 1,
    priceLow: 120,
    priceHigh: 190,
    photo: GARDEN_COTTAGE_GALLERY[0],
    gallery: GARDEN_COTTAGE_GALLERY,
    provisional: true,
  },
  {
    id: "small-b",
    beds: 2,
    maxGuests: 4,
    floors: 1,
    priceLow: 120,
    priceHigh: 190,
    photo: GARDEN_COTTAGE_2_GALLERY[0],
    gallery: GARDEN_COTTAGE_2_GALLERY,
    provisional: true,
  },
  {
    id: "large-a",
    beds: 4,
    maxGuests: 4,
    floors: 2,
    priceLow: 180,
    priceHigh: 280,
    photo: LARGE_COTTAGE_GALLERY[0],
    gallery: LARGE_COTTAGE_GALLERY,
    provisional: true,
  },
  {
    id: "large-b",
    beds: 4,
    maxGuests: 4,
    floors: 2,
    priceLow: 180,
    priceHigh: 280,
    photo: FAMILY_DUPLEX_B_GALLERY[0],
    gallery: FAMILY_DUPLEX_B_GALLERY,
    provisional: true,
  },
  {
    id: "grand",
    beds: 5,
    maxGuests: 6,
    floors: 2,
    priceLow: 200,
    priceHigh: 320,
    photo: POOL_VIEW_HOUSE_GALLERY[0],
    gallery: POOL_VIEW_HOUSE_GALLERY,
    provisional: true,
  },
];

export const CAPACITY = {
  units: UNITS.length,
  beds: UNITS.reduce((n, u) => n + u.beds, 0),
  maxGuests: UNITS.reduce((n, u) => n + u.maxGuests, 0),
} as const;

/** Day-visit / pool pricing (GEL). */
export const POOL = {
  adult: 20,
  child: 10,
  childMaxAge: 12,
  /** Free for overnight guests. */
  guestFree: true,
  dailyLimit: 40,
  openFrom: "11:00",
  openTo: "20:00",
  seasonFrom: 6,
  seasonTo: 9,
  provisional: true,
} as const;

export type EventId =
  | "wedding"
  | "engagement"
  | "birthday"
  | "corporate"
  | "feast"
  | "masterclass";

export interface EventType {
  id: EventId;
  minGuests: number;
  maxGuests: number;
  photo: string;
  gallery: readonly string[];
}

export const EVENT_TYPES: EventType[] = [
  {
    id: "wedding",
    minGuests: 20,
    maxGuests: 120,
    photo: "/events/01-wedding.png",
    gallery: [
      "/events/01-wedding.png",
      "/events/real-08.jpg",
      "/events/real-07.jpg",
      "/events/real-05.jpg",
      "/events/real-11.jpg",
      "/events/real-12.jpg",
    ],
  },
  {
    id: "engagement",
    minGuests: 10,
    maxGuests: 60,
    photo: "/events/02-engagement.png",
    gallery: [
      "/events/02-engagement.png",
      "/events/real-05.jpg",
      "/events/real-07.jpg",
      "/events/real-10.jpg",
      "/events/real-14.jpg",
      "/events/real-15.jpg",
    ],
  },
  {
    id: "birthday",
    minGuests: 10,
    maxGuests: 80,
    photo: "/events/03-birthday.png",
    gallery: [
      "/events/03-birthday.png",
      "/events/real-07.jpg",
      "/events/real-05.jpg",
      "/events/real-08.jpg",
      "/events/real-10.jpg",
      "/events/real-12.jpg",
    ],
  },
  {
    id: "corporate",
    minGuests: 10,
    maxGuests: 60,
    photo: "/events/04-corporate.png",
    gallery: [
      "/events/04-corporate.png",
      "/events/real-11.jpg",
      "/events/real-08.jpg",
      "/events/real-10.jpg",
      "/events/real-12.jpg",
      "/events/real-16.jpg",
    ],
  },
  {
    id: "feast",
    minGuests: 8,
    maxGuests: 60,
    photo: "/events/05-georgian-feast.png",
    gallery: [
      "/events/05-georgian-feast.png",
      "/events/real-06.jpg",
      "/events/real-08.jpg",
      "/events/real-11.jpg",
      "/events/real-05.jpg",
      "/events/real-07.jpg",
    ],
  },
  {
    id: "masterclass",
    minGuests: 4,
    maxGuests: 16,
    photo: "/events/06-culinary-masterclass.png",
    gallery: [
      "/events/06-culinary-masterclass.png",
      "/events/real-04.jpg",
      "/events/real-03.jpg",
      "/events/real-02.jpg",
      "/events/real-01.jpg",
    ],
  },
];

export const VENUE_SPACE = {
  coveredSeats: 120,
  restaurantSeats: 60,
  /** Whole-property buyout required above this headcount (noise policy). */
  buyoutThreshold: 20,
} as const;

export interface Attraction {
  id: string;
  minutes: number;
  km: number;
  lat: number;
  lng: number;
}

/** Nearby attractions, ordered by driving time. */
export const ATTRACTIONS: Attraction[] = [
  { id: "prometheus", minutes: 2, km: 1.5, lat: 42.3767, lng: 42.6017 },
  { id: "tskaltubo", minutes: 12, km: 8, lat: 42.3411, lng: 42.5953 },
  { id: "sataplia", minutes: 18, km: 14, lat: 42.3164, lng: 42.6647 },
  { id: "kutaisi", minutes: 25, km: 20, lat: 42.2679, lng: 42.7051 },
  { id: "gelati", minutes: 30, km: 22, lat: 42.2947, lng: 42.7681 },
  { id: "martvili", minutes: 60, km: 55, lat: 42.4247, lng: 42.3789 },
  { id: "khvamli", minutes: 75, km: 45, lat: 42.5031, lng: 42.7139 },
  { id: "okatse", minutes: 55, km: 40, lat: 42.4644, lng: 42.5222 },
];
