/**
 * Default owner-editable copy for the five accommodation units: marketing
 * name, description, "best for" line and gallery captions in all six
 * languages. These strings used to live in the locale dictionaries,
 * `client/src/lib/stayExperience.ts` and `client/src/lib/accommodationDetailCopy.ts`;
 * they now seed `DEFAULT_CONTENT.units` so the owner can change them from the
 * admin panel without touching translations by hand.
 */
import { localized, type LocalizedText } from "./langs";
import type { UnitId } from "./venue";

export interface UnitCopy {
  name: LocalizedText;
  description: LocalizedText;
  bestFor: LocalizedText;
}

export const UNIT_COPY: Record<UnitId, UnitCopy> = {
  "small-a": {
    name: localized("ბაღის კოტეჯი 1", "Garden Cottage 1", "Садовый коттедж 1", "كوخ الحديقة 1", "Chalet du Jardin 1", "Cabaña del Jardín 1"),
    description: localized(
      "დამოუკიდებელი ხის კოტეჯი მწვანე ბაღში — ნათელი სტუდიო ორადგილიანი საწოლით, დივნით, პატარა სამზარეულოთი და კერძო ვერანდით. განკუთვნილია მხოლოდ ორი სტუმრისთვის.",
      "A private wooden cottage in the green garden, with a bright studio interior, double bed, sofa, compact kitchenette, and its own covered porch. This cottage is for a maximum of two guests.",
      "Отдельный деревянный коттедж в зелёном саду: светлая студия с двуспальной кроватью, диваном, компактной кухней и собственной крытой верандой. Коттедж рассчитан максимум на двух гостей.",
      "كوخ خشبي مستقل وسط الحديقة الخضراء، يضم استوديو مشرقاً بسرير مزدوج وأريكة ومطبخ صغير وشرفة خاصة مغطاة. يتسع هذا الكوخ لضيوف اثنين كحد أقصى.",
      "Un chalet en bois indépendant au cœur du jardin, avec un studio lumineux, un lit double, un canapé, une kitchenette et une véranda privée couverte. Ce chalet accueille au maximum deux personnes.",
      "Una cabaña de madera independiente en el jardín, con un estudio luminoso, cama doble, sofá, cocina compacta y porche privado cubierto. Esta cabaña admite un máximo de dos huéspedes.",
    ),
    bestFor: localized("მაქსიმუმ ორი სტუმრისთვის", "up to two guests", "максимум для двух гостей", "ضيفين كحد أقصى", "deux voyageurs maximum", "un máximo de dos huéspedes"),
  },
  "small-b": {
    name: localized("ბაღის კოტეჯი 2", "Garden Cottage 2", "Садовый коттедж 2", "كوخ الحديقة 2", "Chalet du Jardin 2", "Cabaña del Jardín 2"),
    description: localized(
      "პირველის იდენტური კოტეჯი — ხშირად ერთად ჯავშნიან ორი წყვილი ან მეგობრების ჯგუფი, რომელსაც ცალკე შესასვლელი სჭირდება.",
      "Identical to the first cottage — often booked together by two couples or a group of friends who need separate entrances.",
      "Точный аналог первого коттеджа. Часто их бронируют вдвоем две пары или компания друзей, которым нужны раздельные входы.",
      "كوخ مطابق للأول — كثيرًا ما يحجزه زوجان معًا أو مجموعة أصدقاء تحتاج إلى مدخل منفصل.",
      "Le même cottage que I — souvent réservé ensemble par deux couples ou un groupe d'amis, nécessitant une entrée séparée.",
      "Cabaña idéntica a la primera — a menudo reservada junto con la otra por dos parejas o un grupo de amigos que necesitan entradas separadas.",
    ),
    bestFor: localized("მაქსიმუმ ორი სტუმრისთვის", "up to two guests", "максимум для двух гостей", "ضيفين كحد أقصى", "deux voyageurs maximum", "un máximo de dos huéspedes"),
  },
  "large-a": {
    name: localized("საოჯახო დუპლექსი A", "Family Duplex A", "Семейный дуплекс A", "دوبلكس عائلي A", "Duplex Familial A", "Dúplex Familiar A"),
    description: localized(
      "ორსართულიანი ნომერი დიდ კოტეჯში, ცალკე შესასვლელით. ორი საწოლი პირველ სართულზე და ორი სხვენში — ოთხი სტუმარი კომფორტულად.",
      "A two-story room in the large cottage with a separate entrance. Two beds on the ground floor and two in the attic — comfortably sleeps four guests.",
      "Двухуровневый номер в большом коттедже с отдельным входом. Две кровати на первом этаже и две на мансарде — комфортно для четырех гостей.",
      "غرفة من طابقين داخل الكوخ الكبير بمدخل منفصل. سريران في الطابق الأرضي وسريران في العلّيّة — أربعة ضيوف براحة.",
      "Niveau deux dans le grand cottage, avec entrée indépendante. Deux lits au rez-de-chaussée et deux lits dans le grenier — quatre invités confortablement.",
      "Habitación de dos pisos en la cabaña grande, con entrada independiente. Dos camas en la planta baja y dos en el ático — cuatro huéspedes cómodamente.",
    ),
    bestFor: localized("ოთხკაციანი ოჯახისთვის ან მეგობრებისთვის", "a family of four or friends", "семьи из четырёх человек или друзей", "عائلة من أربعة أو أصدقاء", "une famille de quatre ou des amis", "una familia de cuatro o amigos"),
  },
  "large-b": {
    name: localized("საოჯახო დუპლექსი B", "Family Duplex B", "Семейный дуплекс B", "دوبلكس عائلي B", "Duplex Familial B", "Dúplex Familiar B"),
    description: localized(
      "დიდი კოტეჯის მეორე ნახევარი, ასევე ორსართულიანი და დამოუკიდებელი. ორი ნომრის ერთად დაჯავშნით რვა სტუმარი ერთ სახლში თავსდება.",
      "The other half of the large cottage, also two-story and independent. Booking both rooms together accommodates eight guests in one house.",
      "Вторая половина большого коттеджа, также двухэтажная и автономная. Если забронировать оба номера вместе, в одном доме с комфортом разместятся восемь человек.",
      "النصف الآخر من الكوخ الكبير، أيضًا بطابقين ومستقل. بحجز الغرفتين معًا تتسع لثمانية ضيوف في بيت واحد.",
      "Deuxième moitié du grand cottage, également à deux étages et indépendante. Deux chambres; ensemble, huit invités peuvent loger dans une seule habitation.",
      "La segunda mitad de la cabaña grande, también de dos pisos e independiente. Reservando ambas habitaciones juntas, ocho huéspedes pueden alojarse en una sola casa.",
    ),
    bestFor: localized("ოთხკაციანი ჯგუფისთვის ან მეორე ოჯახისთვის", "a group of four or a second family", "группы из четырёх или второй семьи", "مجموعة من أربعة أو عائلة ثانية", "un groupe de quatre ou une seconde famille", "un grupo de cuatro o una segunda familia"),
  },
  grand: {
    name: localized("აუზისპირა სახლი", "Pool View House", "Дом у бассейна", "بيت بإطلالة على المسبح", "Maison avec vue sur la piscine", "Casa con vistas a la piscina"),
    description: localized(
      "ორსართულიანი ხის სახლი თეთრი აივნით პირდაპირ აუზის ხედზე. ქვედა სართულზეა ორადგილიანი საწოლი, მცირე სამზარეულო და მოსასვენებელი სივრცე, ზედა სართულზე — სამი ერთადგილიანი საწოლი; გასაშლელი დივნით ეტევა 6 სტუმარი.",
      "A two-level wooden suite with a white balcony directly overlooking the pool. The lower floor has a double bed, compact kitchen and lounge; the loft has three single beds, with space for 6 guests using the sofa bed.",
      "Двухуровневый деревянный номер с белым балконом прямо над бассейном. Внизу — двуспальная кровать, компактная кухня и зона отдыха; в лофте — три односпальные кровати. С диваном размещаются до 6 гостей.",
      "جناح خشبي من مستويين مع شرفة بيضاء تطل مباشرة على المسبح. في الطابق السفلي سرير مزدوج ومطبخ صغير ومنطقة جلوس، وفي العلية ثلاثة أسرّة مفردة، ويتسع المكان حتى 6 ضيوف باستخدام سرير الأريكة.",
      "Un hébergement en bois sur deux niveaux, avec balcon blanc donnant directement sur la piscine. En bas : lit double, kitchenette et coin salon ; dans le loft : trois lits simples. Jusqu’à 6 personnes avec le canapé-lit.",
      "Alojamiento de madera de dos niveles con balcón blanco directamente sobre la piscina. Abajo hay una cama doble, cocina compacta y sala de estar; el altillo tiene tres camas individuales. Con el sofá cama admite hasta 6 huéspedes.",
    ),
    bestFor: localized("5–6 მეგობრისთვის ან დიდი ოჯახისთვის", "5–6 friends or a large family", "5–6 друзей или большой семьи", "5–6 أصدقاء أو عائلة كبيرة", "5–6 amis ou une grande famille", "5–6 amigos o una familia grande"),
  },
};

/** Captions for the five approved Garden Cottage photos, in gallery order. */
export const GARDEN_COTTAGE_CAPTIONS: readonly LocalizedText[] = [
  localized("კოტეჯის ექსტერიერი და ბაღი", "Cottage exterior & garden", "Экстерьер коттеджа и сад", "واجهة الكوخ والحديقة", "Extérieur du chalet et jardin", "Exterior de la cabaña y jardín"),
  localized("კერძო გადახურული ვერანდა", "Private covered porch", "Крытая частная веранда", "شرفة خاصة مغطاة", "Véranda privée couverte", "Porche privado cubierto"),
  localized("სტუდიოს სრული ინტერიერი", "Full studio interior", "Полный интерьер студии", "التصميم الداخلي الكامل للاستوديو", "Vue complète du studio", "Interior completo del estudio"),
  localized("საძინებელი და მოსასვენებელი ზონა", "Sleeping & sitting area", "Спальная зона и зона отдыха", "منطقة النوم والجلوس", "Coin nuit et espace détente", "Zona de descanso y dormitorio"),
  localized("ხედვა ნომრიდან ბაღისკენ", "View from the room to the garden", "Вид из номера в сад", "إطلالة من الغرفة نحو الحديقة", "Vue de la chambre vers le jardin", "Vista de la habitación al jardín"),
];

/** Captions for the six Family Duplex photos, in gallery order. */
export const LARGE_COTTAGE_CAPTIONS: readonly LocalizedText[] = [
  localized("კოტეჯის ექსტერიერი და ეზო", "Cottage exterior & garden", "Экстерьер коттеджа и сад", "واجهة الكوخ والحديقة", "Extérieur du chalet et jardin", "Exterior de la cabaña y jardín"),
  localized("პირველი სართულის საძინებელი და აივანი", "Ground-floor bedroom & balcony", "Спальня на первом этаже и балкон", "غرفة نوم الطابق الأرضي والشرفة", "Chambre du rez-de-chaussée et balcon", "Dormitorio de planta baja y balcón"),
  localized("მეორე სართულის ორადგილიანი საძინებელი", "Second-floor twin bedroom", "Спальня с двумя кроватями на втором этаже", "غرفة نوم بسريرين في الطابق الثاني", "Chambre à deux lits au premier étage", "Dormitorio doble de la segunda planta"),
  localized("პირველი სართული და შიდა კიბე", "Ground floor & internal staircase", "Первый этаж и внутренняя лестница", "الطابق الأرضي والدرج الداخلي", "Rez-de-chaussée et escalier intérieur", "Planta baja y escalera interior"),
  localized("საერთო სამზარეულო · გარე შესასვლელი", "Shared kitchen · exterior access", "Общая кухня · отдельный вход", "مطبخ مشترك · مدخل خارجي", "Cuisine commune · accès extérieur", "Cocina compartida · acceso exterior"),
  localized("სააბაზანო", "Bathroom", "Ванная комната", "الحمام", "Salle de bain", "Baño"),
];

/** Captions for the ten Pool View House photos, in gallery order. */
export const POOL_VIEW_HOUSE_CAPTIONS: readonly LocalizedText[] = [
  localized("აუზისპირა სახლის გარე ხედი", "Pool View House exterior", "Дом у бассейна · внешний вид", "المنظر الخارجي للبيت المطل على المسبح", "Extérieur de la maison avec vue sur la piscine", "Exterior de la casa con vistas a la piscina"),
  localized("თეთრი აივანი და აუზის ხედი", "White balcony and pool view", "Белый балкон и вид на бассейн", "الشرفة البيضاء وإطلالة المسبح", "Balcon blanc et vue sur la piscine", "Balcón blanco y vista a la piscina"),
  localized("დილის ყავა აივანზე", "Morning coffee on the balcony", "Утренний кофе на балконе", "قهوة الصباح على الشرفة", "Café matinal sur le balcon", "Café de la mañana en el balcón"),
  localized("მისაღები, სასადილო და სამზარეულო", "Living, dining and kitchen area", "Гостиная, столовая и кухня", "منطقة المعيشة والطعام والمطبخ", "Salon, salle à manger et cuisine", "Sala, comedor y cocina"),
  localized("ქვედა საძინებელი და აივანი", "Lower bedroom and balcony", "Нижняя спальня и балкон", "غرفة النوم السفلية والشرفة", "Chambre du bas et balcon", "Dormitorio inferior y balcón"),
  localized("სამზარეულო, სასადილო და მოსასვენებელი", "Kitchen, dining and lounge area", "Кухня, столовая и зона отдыха", "المطبخ والطعام ومنطقة الجلوس", "Cuisine, salle à manger et coin détente", "Cocina, comedor y zona de estar"),
  localized("ქვედა საძინებელი და ზედა სართულის კიბე", "Lower bedroom and stairs", "Нижняя спальня и лестница", "غرفة النوم السفلية والدرج", "Chambre du bas et escalier", "Dormitorio inferior y escalera"),
  localized("ზედა სართული · სამი საწოლი", "Upper floor · three beds", "Верхний этаж · три кровати", "الطابق العلوي · ثلاثة أسرّة", "Étage supérieur · trois lits", "Planta superior · tres camas"),
  localized("ზედა სართულის საძინებელი", "Upper-floor bedroom", "Спальня на верхнем этаже", "غرفة النوم في الطابق العلوي", "Chambre à l'étage", "Dormitorio de la planta superior"),
  localized("სააბაზანო და საშხაპე", "Bathroom and walk-in shower", "Ванная комната и душевая", "الحمام ومقصورة الدش", "Salle de bain et douche à l'italienne", "Baño y ducha a ras de suelo"),
];

/** Gallery captions for a unit, matched positionally to its default gallery. */
export function defaultUnitCaptions(unitId: UnitId): readonly LocalizedText[] {
  if (unitId === "grand") return POOL_VIEW_HOUSE_CAPTIONS;
  if (unitId === "large-a" || unitId === "large-b") return LARGE_COTTAGE_CAPTIONS;
  return GARDEN_COTTAGE_CAPTIONS;
}

/** Address line shown in the footer and on the location page. */
export const ADDRESS_COPY: LocalizedText = localized(
  "სოფელი ქვილიშორი, წყალტუბოს მუნიციპალიტეტი, იმერეთი, საქართველო",
  "Village Kvilishori, Tskaltubo Municipality, Imereti, Georgia",
  "село Квилишори, Цхалтубский муниципалитет, Имеретия, Грузия",
  "قرية كفيليشوري، بلدية تسقالتوبو، إيميريتي، جورجيا",
  "Village de Kvilishori, municipalité de Tskaltoubo, Imérétie, Géorgie",
  "Pueblo de Kvilishori, municipio de Tskaltubo, Imereti, Georgia",
);
