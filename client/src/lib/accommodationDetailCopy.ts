import type { Lang } from "@/i18n";

type DetailCopy = {
  back: string;
  gallery: string;
  captions: readonly [string, string, string];
  facts: string;
  sleeps: string;
  beds: string;
  floors: string;
  seasonal: string;
  book: string;
  close: string;
};

const copy: Record<Lang, DetailCopy> = {
  ka: { back: "ყველა კოტეჯი და ნომერი", gallery: "ფოტო გალერეა", captions: ["ექსტერიერი და ეზო", "შიდა ინტერიერი", "სივრცის დეტალი"], facts: "მოკლედ ამ ერთეულის შესახებ", sleeps: "ეტევა", beds: "საწოლი", floors: "სართული", seasonal: "სეზონური ფასი · ზუსტდება თარიღით", book: "ამ ერთეულის შესახებ კითხვა", close: "დახურვა" },
  en: { back: "All cottages & rooms", gallery: "Photo gallery", captions: ["Exterior & garden", "Interior", "Space detail"], facts: "At a glance", sleeps: "Sleeps", beds: "beds", floors: "floor", seasonal: "Seasonal rate · confirmed by date", book: "Ask about this unit", close: "Close" },
  ru: { back: "Все коттеджи и номера", gallery: "Фотогалерея", captions: ["Экстерьер и сад", "Интерьер", "Деталь пространства"], facts: "Коротко о варианте", sleeps: "Вмещает", beds: "спальных мест", floors: "этаж", seasonal: "Сезонная цена · уточняется по датам", book: "Узнать об этом варианте", close: "Закрыть" },
  ar: { back: "كل الأكواخ والغرف", gallery: "معرض الصور", captions: ["الخارج والحديقة", "الداخل", "تفاصيل المساحة"], facts: "لمحة سريعة", sleeps: "تتسع لـ", beds: "أسرة", floors: "طابق", seasonal: "سعر موسمي · يؤكد حسب التاريخ", book: "اسأل عن هذه الوحدة", close: "إغلاق" },
  fr: { back: "Tous les chalets & chambres", gallery: "Galerie photo", captions: ["Extérieur et jardin", "Intérieur", "Détail de l'espace"], facts: "En un coup d'œil", sleeps: "Capacité", beds: "lits", floors: "étage", seasonal: "Tarif saisonnier · confirmé selon les dates", book: "Demander cette unité", close: "Fermer" },
  es: { back: "Todas las cabañas y habitaciones", gallery: "Galería de fotos", captions: ["Exterior y jardín", "Interior", "Detalle del espacio"], facts: "De un vistazo", sleeps: "Capacidad", beds: "camas", floors: "planta", seasonal: "Tarifa de temporada · se confirma por fecha", book: "Consultar esta unidad", close: "Cerrar" },
};

export function getAccommodationDetailCopy(lang: Lang) {
  return copy[lang];
}
