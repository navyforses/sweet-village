/**
 * Central asset registry. Every image is served from webdev storage — nothing
 * heavy lives in the repo. `fb_*` are real photographs from the venue's own
 * Facebook page; `gen_*` and `dish_*` are generated to match the real place
 * (pine interiors, dark green metal roof, rectangular turquoise pool).
 */

export const PHOTOS = {
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
export const DISHES: Record<string, string> = {
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
