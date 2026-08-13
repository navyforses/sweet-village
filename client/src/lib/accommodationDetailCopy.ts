import type { Lang } from "@/i18n";

type DetailCopy = {
  back: string;
  gallery: string;
  captions: readonly [string, string, string];
  gardenCottageCaptions: readonly [string, string, string, string, string];
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
  ka: { back: "ყველა კოტეჯი და ნომერი", gallery: "ფოტო გალერეა", captions: ["ექსტერიერი და ეზო", "შიდა ინტერიერი", "სივრცის დეტალი"], gardenCottageCaptions: ["კოტეჯის ექსტერიერი და ბაღი", "კერძო გადახურული ვერანდა", "სტუდიოს სრული ინტერიერი", "საძინებელი და მოსასვენებელი ზონა", "ხედვა ნომრიდან ბაღისკენ"], largeCottageCaptions: ["კოტეჯის ექსტერიერი და ეზო", "პირველი სართულის საძინებელი და აივანი", "მეორე სართულის ორადგილიანი საძინებელი", "პირველი სართული და შიდა კიბე", "საერთო სამზარეულო · გარე შესასვლელი", "სააბაზანო"], facts: "მოკლედ ამ ერთეულის შესახებ", sleeps: "ეტევა", beds: "საწოლი", floors: "სართული", seasonal: "დადასტურებული ფასი ერთ ღამეზე", book: "ამ ერთეულის შესახებ კითხვა", close: "დახურვა", showAll: "ყველა ფოტო", photos: "ფოტო", swipeHint: "გადაასრიალეთ სანახავად", previousPhoto: "წინა ფოტო", nextPhoto: "შემდეგი ფოტო" },
  en: { back: "All cottages & rooms", gallery: "Photo gallery", captions: ["Exterior & garden", "Interior", "Space detail"], gardenCottageCaptions: ["Cottage exterior & garden", "Private covered porch", "Full studio interior", "Sleeping & sitting area", "View from the room to the garden"], largeCottageCaptions: ["Cottage exterior & garden", "Ground-floor bedroom & balcony", "Second-floor twin bedroom", "Ground floor & internal staircase", "Shared kitchen · exterior access", "Bathroom"], facts: "At a glance", sleeps: "Sleeps", beds: "beds", floors: "floor", seasonal: "Confirmed price per night", book: "Ask about this unit", close: "Close", showAll: "All photos", photos: "photos", swipeHint: "Swipe to explore", previousPhoto: "Previous photo", nextPhoto: "Next photo" },
  ru: { back: "Все коттеджи и номера", gallery: "Фотогалерея", captions: ["Экстерьер и сад", "Интерьер", "Деталь пространства"], gardenCottageCaptions: ["Экстерьер коттеджа и сад", "Крытая частная веранда", "Полный интерьер студии", "Спальная зона и зона отдыха", "Вид из номера в сад"], largeCottageCaptions: ["Экстерьер коттеджа и сад", "Спальня на первом этаже и балкон", "Спальня с двумя кроватями на втором этаже", "Первый этаж и внутренняя лестница", "Общая кухня · отдельный вход", "Ванная комната"], facts: "Коротко о варианте", sleeps: "Вмещает", beds: "спальных мест", floors: "этаж", seasonal: "Подтверждённая цена за ночь", book: "Узнать об этом варианте", close: "Закрыть", showAll: "Все фото", photos: "фото", swipeHint: "Проведите, чтобы посмотреть", previousPhoto: "Предыдущее фото", nextPhoto: "Следующее фото" },
  ar: { back: "كل الأكواخ والغرف", gallery: "معرض الصور", captions: ["الخارج والحديقة", "الداخل", "تفاصيل المساحة"], gardenCottageCaptions: ["واجهة الكوخ والحديقة", "شرفة خاصة مغطاة", "التصميم الداخلي الكامل للاستوديو", "منطقة النوم والجلوس", "إطلالة من الغرفة نحو الحديقة"], largeCottageCaptions: ["واجهة الكوخ والحديقة", "غرفة نوم الطابق الأرضي والشرفة", "غرفة نوم بسريرين في الطابق الثاني", "الطابق الأرضي والدرج الداخلي", "مطبخ مشترك · مدخل خارجي", "الحمام"], facts: "لمحة سريعة", sleeps: "تتسع لـ", beds: "أسرة", floors: "طابق", seasonal: "سعر مؤكد لليلة الواحدة", book: "اسأل عن هذه الوحدة", close: "إغلاق", showAll: "كل الصور", photos: "صور", swipeHint: "اسحب للاستكشاف", previousPhoto: "الصورة السابقة", nextPhoto: "الصورة التالية" },
  fr: { back: "Tous les chalets & chambres", gallery: "Galerie photo", captions: ["Extérieur et jardin", "Intérieur", "Détail de l'espace"], gardenCottageCaptions: ["Extérieur du chalet et jardin", "Véranda privée couverte", "Vue complète du studio", "Coin nuit et espace détente", "Vue de la chambre vers le jardin"], largeCottageCaptions: ["Extérieur du chalet et jardin", "Chambre du rez-de-chaussée et balcon", "Chambre à deux lits au premier étage", "Rez-de-chaussée et escalier intérieur", "Cuisine commune · accès extérieur", "Salle de bain"], facts: "En un coup d'œil", sleeps: "Capacité", beds: "lits", floors: "étage", seasonal: "Prix confirmé par nuit", book: "Demander cette unité", close: "Fermer", showAll: "Toutes les photos", photos: "photos", swipeHint: "Balayez pour explorer", previousPhoto: "Photo précédente", nextPhoto: "Photo suivante" },
  es: { back: "Todas las cabañas y habitaciones", gallery: "Galería de fotos", captions: ["Exterior y jardín", "Interior", "Detalle del espacio"], gardenCottageCaptions: ["Exterior de la cabaña y jardín", "Porche privado cubierto", "Interior completo del estudio", "Zona de descanso y dormitorio", "Vista de la habitación al jardín"], largeCottageCaptions: ["Exterior de la cabaña y jardín", "Dormitorio de planta baja y balcón", "Dormitorio doble de la segunda planta", "Planta baja y escalera interior", "Cocina compartida · acceso exterior", "Baño"], facts: "De un vistazo", sleeps: "Capacidad", beds: "camas", floors: "planta", seasonal: "Precio confirmado por noche", book: "Consultar esta unidad", close: "Cerrar", showAll: "Todas las fotos", photos: "fotos", swipeHint: "Desliza para explorar", previousPhoto: "Foto anterior", nextPhoto: "Foto siguiente" },
};

export function getAccommodationDetailCopy(lang: Lang) {
  return copy[lang];
}

const poolViewHouseCaptions: Record<Lang, readonly string[]> = {
  ka: [
    "აუზისპირა სახლის გარე ხედი",
    "თეთრი აივანი და აუზის ხედი",
    "დილის ყავა აივანზე",
    "მისაღები, სასადილო და სამზარეულო",
    "ქვედა საძინებელი და აივანი",
    "სამზარეულო, სასადილო და მოსასვენებელი",
    "ქვედა საძინებელი და ზედა სართულის კიბე",
    "ზედა სართული · სამი საწოლი",
    "ზედა სართულის საძინებელი",
    "სააბაზანო და საშხაპე",
  ],
  en: [
    "Pool View House exterior",
    "White balcony and pool view",
    "Morning coffee on the balcony",
    "Living, dining and kitchen area",
    "Lower bedroom and balcony",
    "Kitchen, dining and lounge area",
    "Lower bedroom and stairs",
    "Upper floor · three beds",
    "Upper-floor bedroom",
    "Bathroom and walk-in shower",
  ],
  ru: [
    "Дом у бассейна · внешний вид",
    "Белый балкон и вид на бассейн",
    "Утренний кофе на балконе",
    "Гостиная, столовая и кухня",
    "Нижняя спальня и балкон",
    "Кухня, столовая и зона отдыха",
    "Нижняя спальня и лестница",
    "Верхний этаж · три кровати",
    "Спальня на верхнем этаже",
    "Ванная комната и душевая",
  ],
  ar: [
    "المنظر الخارجي للبيت المطل على المسبح",
    "الشرفة البيضاء وإطلالة المسبح",
    "قهوة الصباح على الشرفة",
    "منطقة المعيشة والطعام والمطبخ",
    "غرفة النوم السفلية والشرفة",
    "المطبخ والطعام ومنطقة الجلوس",
    "غرفة النوم السفلية والدرج",
    "الطابق العلوي · ثلاثة أسرّة",
    "غرفة النوم في الطابق العلوي",
    "الحمام ومقصورة الدش",
  ],
  fr: [
    "Extérieur de la maison avec vue sur la piscine",
    "Balcon blanc et vue sur la piscine",
    "Café matinal sur le balcon",
    "Salon, salle à manger et cuisine",
    "Chambre du bas et balcon",
    "Cuisine, salle à manger et coin détente",
    "Chambre du bas et escalier",
    "Étage supérieur · trois lits",
    "Chambre à l'étage",
    "Salle de bain et douche à l'italienne",
  ],
  es: [
    "Exterior de la casa con vistas a la piscina",
    "Balcón blanco y vista a la piscina",
    "Café de la mañana en el balcón",
    "Sala, comedor y cocina",
    "Dormitorio inferior y balcón",
    "Cocina, comedor y zona de estar",
    "Dormitorio inferior y escalera",
    "Planta superior · tres camas",
    "Dormitorio de la planta superior",
    "Baño y ducha a ras de suelo",
  ],
};

export function getPoolViewHouseCaptions(lang: Lang) {
  return poolViewHouseCaptions[lang];
}
