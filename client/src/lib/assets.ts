import { assetUrl } from "./assetUrl";

/**
 * Central asset registry. Every image is served from webdev storage — nothing
 * heavy lives in the repo. `fb_*` are real photographs from the venue's own
 * Facebook page; `gen_*` and `dish_*` are generated to match the real place
 * (pine interiors, dark green metal roof, rectangular turquoise pool).
 */

const RAW_PHOTOS = {
  /* Generated scenery */
  hero: "/manus-storage/gen_hero_f355fb4f.jpg",
  cottageExterior: "/manus-storage/gen_cottage_ext_325bdf81.jpg",
  interiorRoom: "/manus-storage/gen_interior_room_17b6f3da.jpg",
  restaurant: "/manus-storage/gen_restaurant_909d8ee9.jpg",
  eventSpace: "/manus-storage/gen_event_space_e4096ec3.jpg",
  poolDay: "/manus-storage/gen_pool_day_12150ec4.jpg",
  wedding: "/manus-storage/gen_wedding_84acff3e.jpg",

  /* Real photographs of the property */
  poolReal: "/manus-storage/fb_pool_01_5aa92615.jpg",
  terrace: "/manus-storage/fb_outdoor_01_baca0a76.jpg",
  bedroomTwin: "/manus-storage/fb_bedroom_01_29b3a4a3.jpg",
  bedroomLoft: "/manus-storage/fb_bedroom_02_3d703364.jpg",
  roomSitting: "/manus-storage/fb_interior_01_9d6ab60a.jpg",
  roomDetail: "/manus-storage/fb_interior_02_3d67dace.jpg",
  banquet: "/manus-storage/fb_misc_01_b442e776.jpg",
} as const;

/** Per-category menu imagery, keyed by menu category id. */
const RAW_DISHES: Record<string, string> = {
  cold: "/manus-storage/dish_cheese_47be18c8.jpg",
  salads: "/manus-storage/dish_salad_f4c2a94c.jpg",
  baked: "/manus-storage/dish_khachapuri_489c82a9.jpg",
  soups: "/manus-storage/dish_soup_1ef76b00.jpg",
  gourmet: "/manus-storage/dish_ojakhuri_5c2089ca.jpg",
  hot: "/manus-storage/dish_khinkali_2985e0b4.jpg",
  bbq: "/manus-storage/dish_mtsvadi_2fb842be.jpg",
  soft: "/manus-storage/dish_drinks_cfe616a9.jpg",
  hotdrinks: "/manus-storage/dish_drinks_cfe616a9.jpg",
};

/** One researched, dish-specific menu visual for each of the 68 live items. */
const RAW_MENU_ITEM_PHOTOS: Record<number, string> = {
  1: "/manus-storage/menu-card-01-pickled-assortment_97f57b46.jpg",
  2: "/manus-storage/menu-card-02-pkhali-assortment_45eb2d41.jpg",
  3: "/manus-storage/menu-card-03-fresh-herbs_bd35db46.jpg",
  4: "/manus-storage/menu-card-04-cheese-assortment_b244f202.jpg",
  5: "/manus-storage/menu-card-05-eggplant-walnuts_9da03cec.jpg",
  6: "/manus-storage/menu-card-06-sulguni_c5912268.jpg",
  7: "/manus-storage/menu-card-07-imeretian-cheese_d92d6ce2.jpg",
  8: "/manus-storage/menu-card-08-green-salad_67cc7fcd.jpg",
  9: "/manus-storage/menu-card-09-tomato-cucumber-salad_06c3fb6f.jpg",
  10: "/manus-storage/menu-card-10-tomato-cucumber-walnuts_7ca83629.jpg",
  11: "/manus-storage/menu-card-11-greek-salad_548bd1e1.jpg",
  12: "/manus-storage/menu-card-12-caesar-salad_599cfb95.jpg",
  13: "/manus-storage/menu-card-13-atsetsili-salad_a6fd1c5d.jpg",
  14: "/manus-storage/menu-card-14-chefs-salad_9092fa75.jpg",
  15: "/manus-storage/menu-card-15-mexican-chicken-salad_909b41b7.jpg",
  16: "/manus-storage/menu-card-16-mushroom-salad_a0786dba.jpg",
  17: "/manus-storage/menu-card-17-imeruli-khachapuri_f9070db9.jpg",
  18: "/manus-storage/menu-card-18-megruli-khachapuri_c6010154.jpg",
  19: "/manus-storage/menu-card-19-acharuli-khachapuri-replacement_957e0a91.jpg",
  20: "/manus-storage/menu-card-20-lobiani-replacement_97758214.jpg",
  21: "/manus-storage/menu-card-21-chvishtari_35d6a774.jpg",
  22: "/manus-storage/menu-card-22-mchadi_5c758644.jpg",
  23: "/manus-storage/menu-card-23-pepperoni-pizza_75c22581.jpg",
  24: "/manus-storage/menu-card-24-margherita-pizza-replacement_e08c7c25.jpg",
  25: "/manus-storage/menu-card-25-mushroom-soup_52d1bce6.jpg",
  26: "/manus-storage/menu-card-26-chakhokhbili_bb8f45c3.jpg",
  27: "/manus-storage/menu-card-27-chicken-broth_50592493.jpg",
  28: "/manus-storage/menu-card-28-kharcho_18428c51.jpg",
  29: "/manus-storage/menu-card-29-khashlama_0d94f558.jpg",
  30: "/manus-storage/menu-card-30-mushroom-cream-soup_a0d75c82.jpg",
  31: "/manus-storage/menu-card-31-mushrooms-ketsi-replacement_1a5a228c.jpg",
  32: "/manus-storage/menu-card-32-mushrooms-ketsi-cheese-replacement_f490252e.jpg",
  33: "/manus-storage/menu-card-33-french-fries_17ac8461.jpg",
  34: "/manus-storage/menu-card-34-fried-potatoes-replacement_82e09496.jpg",
  35: "/manus-storage/menu-card-35-mexican-potato-wedges-replacement_4178653a.jpg",
  36: "/manus-storage/menu-card-36-mashed-potatoes_80e78d7f.jpg",
  37: "/manus-storage/menu-card-37-lobio-clay-pot-replacement_b3085a9c.jpg",
  38: "/manus-storage/menu-card-38-tkemali_9dc61623.jpg",
  39: "/manus-storage/menu-card-39-satsebeli_2eba6219.jpg",
  40: "/manus-storage/menu-card-40-ostri-replacement_c8250fb0.jpg",
  41: "/manus-storage/menu-card-41-chakapuli_746fce38.jpg",
  42: "/manus-storage/menu-card-42-ojakhuri-pork_1379e22e.jpg",
  43: "/manus-storage/menu-card-43-ojakhuri-beef_b4f53d96.jpg",
  44: "/manus-storage/menu-card-44-shkmeruli_4b34c517.jpg",
  45: "/manus-storage/menu-card-45-chicken-tabaka_fbdc2072.jpg",
  46: "/manus-storage/menu-card-46-grilled-trout-replacement_e9f5e900.jpg",
  47: "/manus-storage/menu-card-47-adjapsandali_f668dd33.jpg",
  48: "/manus-storage/menu-card-48-veal-chef-recipe-replacement_622c571e.jpg",
  49: "/manus-storage/menu-card-49-madame-bovary_2e536877.jpg",
  50: "/manus-storage/menu-card-50-veal-ribs-ajika_72741931.jpg",
  51: "/manus-storage/menu-card-51-veal-ribs-kindzmari_763e86ab.jpg",
  52: "/manus-storage/menu-card-52-kuchmachi_4f5783c6.jpg",
  53: "/manus-storage/menu-card-53-ojakhuri-mushrooms_a6236f7c.jpg",
  54: "/manus-storage/menu-card-54-ojakhuri-chicken_b126e834.jpg",
  55: "/manus-storage/menu-card-55-beef-tongue_bab8d481.jpg",
  56: "/manus-storage/menu-card-56-khinkali-replacement_f410922e.jpg",
  57: "/manus-storage/menu-card-57-pork-bbq-replacement_595f9042.jpg",
  58: "/manus-storage/menu-card-58-veal-bbq-replacement_0b01b433.jpg",
  59: "/manus-storage/menu-card-59-chicken-bbq-replacement_46298d28.jpg",
  60: "/manus-storage/menu-card-60-kupati-replacement_bc05bdb9.jpg",
  61: "/manus-storage/menu-card-61-lemonade-replacement_981f524c.jpg",
  62: "/manus-storage/menu-card-62-borjomi_be241ba8.jpg",
  63: "/manus-storage/menu-card-63-nabeghlavi-replacement_a7357de8.jpg",
  64: "/manus-storage/menu-card-64-mtsi-water-half_0ef3c9fa.jpg",
  65: "/manus-storage/menu-card-65-mtsi-water-one-liter_11ebc1e0.jpg",
  66: "/manus-storage/menu-card-66-loose-tea_dfb3f4ae.jpg",
  67: "/manus-storage/menu-card-67-teabag-tea_5a74e601.jpg",
  68: "/manus-storage/menu-card-68-turkish-coffee-replacement_29cf559b.jpg",
};

function resolveAssetRecord<T extends Record<string | number, string>>(record: T): T {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, assetUrl(value)])) as T;
}

export const PHOTOS = resolveAssetRecord(RAW_PHOTOS);

// The homepage uses only real venue photography and cottage images that were
// explicitly approved for publication. Older generated assets stay available
// to legacy inner pages until those pages are refreshed separately.
export const HOME_PHOTOS = resolveAssetRecord({
  hero: "/pool-view-house/homepage-cover-pool-cottage-approved.webp",
  events: "/events/real-07.jpg",
  pool: "/events/poolside-real-01.webp",
  restaurant: "/events/real-06.jpg",
  stay: "/manus-storage/large-cottage-exterior-approved.webp",
  cottageExterior: "/manus-storage/garden-cottage-exterior.webp",
  cottageBedroom:
    "/manus-storage/large-cottage-ground-floor-bedroom-approved.webp",
  cottageStudio: "/manus-storage/garden-cottage-studio.webp",
});

export const HOME_GALLERY = [
  "/events/real-12.jpg",
  "/events/real-10.jpg",
  "/events/poolside-real-02.webp",
  "/manus-storage/large-cottage-exterior-approved.webp",
  "/events/real-11.jpg",
  "/events/real-04.jpg",
  "/manus-storage/garden-cottage-exterior.webp",
  "/events/real-14.jpg",
].map(assetUrl);
export const DISHES = resolveAssetRecord(RAW_DISHES);
export const MENU_ITEM_PHOTOS = resolveAssetRecord(RAW_MENU_ITEM_PHOTOS);

export function menuItemPhoto(itemId: number, categoryId: string): string {
  return MENU_ITEM_PHOTOS[itemId] ?? DISHES[categoryId] ?? PHOTOS.restaurant;
}

export const GALLERY: string[] = [
  PHOTOS.poolReal,
  PHOTOS.terrace,
  PHOTOS.bedroomTwin,
  PHOTOS.roomSitting,
  PHOTOS.eventSpace,
  PHOTOS.bedroomLoft,
  PHOTOS.roomDetail,
  PHOTOS.banquet,
];
