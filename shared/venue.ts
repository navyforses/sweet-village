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

export const UNITS: Unit[] = [
  {
    id: "small-a",
    beds: 2,
    maxGuests: 4,
    floors: 1,
    priceLow: 120,
    priceHigh: 190,
    photo: "/manus-storage/gen_cottage_ext_325bdf81.jpg",
    gallery: [
      "/manus-storage/stay-small-a-exterior_8e523eac.jpg",
      "/manus-storage/stay-small-a-interior_ad1e9258.jpg",
      "/manus-storage/stay-small-a-porch_04c3ec8b.jpg",
    ],
    provisional: true,
  },
  {
    id: "small-b",
    beds: 2,
    maxGuests: 4,
    floors: 1,
    priceLow: 120,
    priceHigh: 190,
    photo: "/manus-storage/fb_bedroom_01_29b3a4a3.jpg",
    gallery: [
      "/manus-storage/stay-small-b-exterior_0446954f.jpg",
      "/manus-storage/stay-small-b-interior_281e953e.jpg",
      "/manus-storage/fb_bedroom_01_29b3a4a3.jpg",
    ],
    provisional: true,
  },
  {
    id: "large-a",
    beds: 4,
    maxGuests: 4,
    floors: 2,
    priceLow: 180,
    priceHigh: 280,
    photo: "/manus-storage/fb_bedroom_02_3d703364.jpg",
    gallery: [
      "/manus-storage/stay-large-cottage-exterior_b2037ad0.jpg",
      "/manus-storage/stay-large-a-ground_4860b381.jpg",
      "/manus-storage/stay-large-a-loft_c8295f6f.jpg",
    ],
    provisional: true,
  },
  {
    id: "large-b",
    beds: 4,
    maxGuests: 4,
    floors: 2,
    priceLow: 180,
    priceHigh: 280,
    photo: "/manus-storage/fb_interior_02_3d67dace.jpg",
    gallery: [
      "/manus-storage/stay-large-cottage-exterior_b2037ad0.jpg",
      "/manus-storage/stay-large-b-ground_5a9d1783.jpg",
      "/manus-storage/stay-large-b-loft_991220e0.jpg",
    ],
    provisional: true,
  },
  {
    id: "grand",
    beds: 5,
    maxGuests: 6,
    floors: 1,
    priceLow: 200,
    priceHigh: 320,
    photo: "/manus-storage/gen_interior_room_17b6f3da.jpg",
    gallery: [
      "/manus-storage/stay-grand-exterior_c75a11d3.jpg",
      "/manus-storage/stay-grand-interior_4d0e93a9.jpg",
      "/manus-storage/gen_interior_room_17b6f3da.jpg",
    ],
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

export interface EventType {
  id: string;
  minGuests: number;
  maxGuests: number;
  photo: string;
}

export const EVENT_TYPES: EventType[] = [
  { id: "wedding", minGuests: 40, maxGuests: 120, photo: "/manus-storage/gen_wedding_84acff3e.jpg" },
  { id: "engagement", minGuests: 20, maxGuests: 80, photo: "/manus-storage/gen_event_space_e4096ec3.jpg" },
  { id: "birthday", minGuests: 10, maxGuests: 60, photo: "/manus-storage/fb_outdoor_01_baca0a76.jpg" },
  { id: "corporate", minGuests: 15, maxGuests: 100, photo: "/manus-storage/gen_restaurant_909d8ee9.jpg" },
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
