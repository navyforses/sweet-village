import type { Lang } from "@/i18n";

type DetailCopy = {
  back: string;
  gallery: string;
  captions: readonly [string, string, string];
  largeCottageCaptions: readonly [string, string, string, string, string, string];
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
  ka: { back: "ყველა კოტეჯი და ნომერი", gallery: "ფოტო გალერეა", captions: ["ექსტერიერი და ეზო", "შიდა ინტერიერი", "სივრცის დეტალი"], largeCottageCaptions: ["კოტეჯის ექსტერიერი და ეზო", "პირველი სართულის საძინებელი და აივანი", "მეორე სართულის ორადგილიანი საძინებელი", "პირველი სართული და შიდა კიბე", "საერთო სამზარეულო · გარე შესასვლელი", "სააბაზანო"], facts: "მოკლედ ამ ერთეულის შესახებ", sleeps: "ეტევა", beds: "საწოლი", floors: "სართული", seasonal: "სეზონური ფასი · ზუსტდება თარიღით", book: "ამ ერთეულის შესახებ კითხვა", close: "დახურვა", showAll: "ყველა ფოტო", photos: "ფოტო", swipeHint: "გადაასრიალეთ სანახავად", previousPhoto: "წინა ფოტო", nextPhoto: "შემდეგი ფოტო" },
  en: { back: "All cottages & rooms", gallery: "Photo gallery", captions: ["Exterior & garden", "Interior", "Space detail"], largeCottageCaptions: ["Cottage exterior & garden", "Ground-floor bedroom & balcony", "Second-floor twin bedroom", "Ground floor & internal staircase", "Shared kitchen · exterior access", "Bathroom"], facts: "At a glance", sleeps: "Sleeps", beds: "beds", floors: "floor", seasonal: "Seasonal rate · confirmed by date", book: "Ask about this unit", close: "Close", showAll: "All photos", photos: "photos", swipeHint: "Swipe to explore", previousPhoto: "Previous photo", nextPhoto: "Next photo" },
  ru: { back: "Все коттеджи и номера", gallery: "Фотогалерея", captions: ["Экстерьер и сад", "Интерьер", "Деталь пространства"], largeCottageCaptions: ["Экстерьер коттеджа и сад", "Спальня на первом этаже и балкон", "Спальня с двумя кроватями на втором этаже", "Первый этаж и внутренняя лестница", "Общая кухня · отдельный вход", "Ванная комната"], facts: "Коротко о варианте", sleeps: "Вмещает", beds: "спальных мест", floors: "этаж", seasonal: "Сезонная цена · уточняется по датам", book: "Узнать об этом варианте", close: "Закрыть", showAll: "Все фото", photos: "фото", swipeHint: "Проведите, чтобы посмотреть", previousPhoto: "Предыдущее фото", nextPhoto: "Следующее фото" },
  ar: { back: "كل الأكواخ والغرف", gallery: "معرض الصور", captions: ["الخارج والحديقة", "الداخل", "تفاصيل المساحة"], largeCottageCaptions: ["واجهة الكوخ والحديقة", "غرفة نوم الطابق الأرضي والشرفة", "غرفة نوم بسريرين في الطابق الثاني", "الطابق الأرضي والدرج الداخلي", "مطبخ مشترك · مدخل خارجي", "الحمام"], facts: "لمحة سريعة", sleeps: "تتسع لـ", beds: "أسرة", floors: "طابق", seasonal: "سعر موسمي · يؤكد حسب التاريخ", book: "اسأل عن هذه الوحدة", close: "إغلاق", showAll: "كل الصور", photos: "صور", swipeHint: "اسحب للاستكشاف", previousPhoto: "الصورة السابقة", nextPhoto: "الصورة التالية" },
  fr: { back: "Tous les chalets & chambres", gallery: "Galerie photo", captions: ["Extérieur et jardin", "Intérieur", "Détail de l'espace"], largeCottageCaptions: ["Extérieur du chalet et jardin", "Chambre du rez-de-chaussée et balcon", "Chambre à deux lits au premier étage", "Rez-de-chaussée et escalier intérieur", "Cuisine commune · accès extérieur", "Salle de bain"], facts: "En un coup d'œil", sleeps: "Capacité", beds: "lits", floors: "étage", seasonal: "Tarif saisonnier · confirmé selon les dates", book: "Demander cette unité", close: "Fermer", showAll: "Toutes les photos", photos: "photos", swipeHint: "Balayez pour explorer", previousPhoto: "Photo précédente", nextPhoto: "Photo suivante" },
  es: { back: "Todas las cabañas y habitaciones", gallery: "Galería de fotos", captions: ["Exterior y jardín", "Interior", "Detalle del espacio"], largeCottageCaptions: ["Exterior de la cabaña y jardín", "Dormitorio de planta baja y balcón", "Dormitorio doble de la segunda planta", "Planta baja y escalera interior", "Cocina compartida · acceso exterior", "Baño"], facts: "De un vistazo", sleeps: "Capacidad", beds: "camas", floors: "planta", seasonal: "Tarifa de temporada · se confirma por fecha", book: "Consultar esta unidad", close: "Cerrar", showAll: "Todas las fotos", photos: "fotos", swipeHint: "Desliza para explorar", previousPhoto: "Foto anterior", nextPhoto: "Foto siguiente" },
};

export function getAccommodationDetailCopy(lang: Lang) {
  return copy[lang];
}
