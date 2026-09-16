import type { Lang } from "@/i18n";
import { POOL_VIEW_HOUSE_CAPTIONS } from "@shared/unitCopy";

/**
 * Page chrome for the accommodation detail page. Unit names, descriptions and
 * per-photo captions are owner-editable content (see shared/content.ts), so
 * they no longer live here.
 */
type DetailCopy = {
  back: string;
  gallery: string;
  facts: string;
  sleeps: string;
  beds: string;
  floors: string;
  seasonal: string;
  book: string;
  close: string;
  showAll: string;
  photos: string;
  swipeHint: string;
  previousPhoto: string;
  nextPhoto: string;
};

const copy: Record<Lang, DetailCopy> = {
  ka: { back: "ყველა კოტეჯი და ნომერი", gallery: "ფოტო გალერეა", facts: "მოკლედ ამ ერთეულის შესახებ", sleeps: "ეტევა", beds: "საწოლი", floors: "სართული", seasonal: "დადასტურებული ფასი ერთ ღამეზე", book: "ამ ერთეულის შესახებ კითხვა", close: "დახურვა", showAll: "ყველა ფოტო", photos: "ფოტო", swipeHint: "გადაასრიალეთ სანახავად", previousPhoto: "წინა ფოტო", nextPhoto: "შემდეგი ფოტო" },
  en: { back: "All cottages & rooms", gallery: "Photo gallery", facts: "At a glance", sleeps: "Sleeps", beds: "beds", floors: "floor", seasonal: "Confirmed price per night", book: "Ask about this unit", close: "Close", showAll: "All photos", photos: "photos", swipeHint: "Swipe to explore", previousPhoto: "Previous photo", nextPhoto: "Next photo" },
  ru: { back: "Все коттеджи и номера", gallery: "Фотогалерея", facts: "Коротко о варианте", sleeps: "Вмещает", beds: "спальных мест", floors: "этаж", seasonal: "Подтверждённая цена за ночь", book: "Узнать об этом варианте", close: "Закрыть", showAll: "Все фото", photos: "фото", swipeHint: "Проведите, чтобы посмотреть", previousPhoto: "Предыдущее фото", nextPhoto: "Следующее фото" },
  ar: { back: "كل الأكواخ والغرف", gallery: "معرض الصور", facts: "لمحة سريعة", sleeps: "تتسع لـ", beds: "أسرة", floors: "طابق", seasonal: "سعر مؤكد لليلة الواحدة", book: "اسأل عن هذه الوحدة", close: "إغلاق", showAll: "كل الصور", photos: "صور", swipeHint: "اسحب للاستكشاف", previousPhoto: "الصورة السابقة", nextPhoto: "الصورة التالية" },
  fr: { back: "Tous les chalets & chambres", gallery: "Galerie photo", facts: "En un coup d'œil", sleeps: "Capacité", beds: "lits", floors: "étage", seasonal: "Prix confirmé par nuit", book: "Demander cette unité", close: "Fermer", showAll: "Toutes les photos", photos: "photos", swipeHint: "Balayez pour explorer", previousPhoto: "Photo précédente", nextPhoto: "Photo suivante" },
  es: { back: "Todas las cabañas y habitaciones", gallery: "Galería de fotos", facts: "De un vistazo", sleeps: "Capacidad", beds: "camas", floors: "planta", seasonal: "Precio confirmado por noche", book: "Consultar esta unidad", close: "Cerrar", showAll: "Todas las fotos", photos: "fotos", swipeHint: "Desliza para explorar", previousPhoto: "Foto anterior", nextPhoto: "Foto siguiente" },
};

export function getAccommodationDetailCopy(lang: Lang) {
  return copy[lang];
}

/** Default captions of the ten Pool View House photos (seeded into the content model). */
export function getPoolViewHouseCaptions(lang: Lang): readonly string[] {
  return POOL_VIEW_HOUSE_CAPTIONS.map(caption => caption[lang]);
}
