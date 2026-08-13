import type { Lang } from "@/i18n";
import type { UnitId } from "@shared/venue";

export type GuestFilter = "all" | "couple" | "four" | "six" | "whole";

type StayExperienceCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  inventory: { units: string; beds: string; capacity: string };
  chooseTitle: string;
  filters: Record<GuestFilter, string>;
  card: { sleeps: string; bestFor: string; floors: string; askAbout: string; seasonal: string };
  suitability: Record<UnitId, string>;
  allUnits: string;
  whole: { eyebrow: string; title: string; body: string; cta: string };
  facilitiesTitle: string;
};

export const STAY_FILTER_UNITS: Record<Exclude<GuestFilter, "all" | "whole">, UnitId[]> = {
  couple: ["small-a", "small-b"],
  four: ["large-a", "large-b"],
  six: ["grand"],
};

const copy: Record<Lang, StayExperienceCopy> = {
  ka: {
    eyebrow: "კოტეჯები და ნომრები",
    title: "აირჩიეთ თქვენი კოტეჯი ან ნომერი",
    intro: "აქ 5 საცხოვრებელი ერთეულია: ორი პატარა კოტეჯი, ორი დამოუკიდებელი ნომერი დიდ კოტეჯში და ერთი დიდი ნომერი. წყვილიდან მეგობრების დიდ ჯგუფამდე — წინასწარ ნახეთ, რა გიხდებათ.",
    inventory: { units: "საცხოვრებელი ერთეული", beds: "რეალური საწოლი", capacity: "მაქსიმუმ სტუმარი" },
    chooseTitle: "რამდენი სტუმარი ხართ?",
    filters: { all: "ყველა 5 ერთეული", couple: "1–2 სტუმარი", four: "3–4 სტუმარი", six: "5–6 სტუმარი", whole: "მთელი კომპლექსი · 18" },
    card: { sleeps: "ეტევა", bestFor: "საუკეთესოა", floors: "სართული", askAbout: "ამ ერთეულის შესახებ კითხვა", seasonal: "დადასტურებული ფასი ერთ ღამეზე" },
    suitability: {
      "small-a": "მაქსიმუმ ორი სტუმრისთვის",
      "small-b": "მაქსიმუმ ორი სტუმრისთვის",
      "large-a": "ოთხკაციანი ოჯახისთვის ან მეგობრებისთვის",
      "large-b": "ოთხკაციანი ჯგუფისთვის ან მეორე ოჯახისთვის",
      grand: "5–6 მეგობრისთვის ან დიდი ოჯახისთვის",
    },
    allUnits: "ყველა 5 ერთეულის ნახვა",
    whole: { eyebrow: "დიდი ჯგუფისთვის", title: "მთელი კომპლექსი თქვენი ჯგუფისთვის", body: "5 ერთეული ერთად · მაქსიმუმ 18 სტუმარი. მთელი კომპლექსის თარიღი და ფასი წინასწარ დაგვიზუსტეთ.", cta: "მთელი კომპლექსის შესახებ კითხვა" },
    facilitiesTitle: "ყველა ღამის სტუმრისთვის",
  },
  en: {
    eyebrow: "Cottages & rooms",
    title: "Choose your cottage or room",
    intro: "There are 5 accommodation units here: two small cottages, two independent rooms in the large cottage, and one grand room. From a couple to a larger group of friends, see what fits before you enquire.",
    inventory: { units: "accommodation units", beds: "real beds", capacity: "guests maximum" },
    chooseTitle: "How many guests are you?",
    filters: { all: "All 5 units", couple: "1–2 guests", four: "3–4 guests", six: "5–6 guests", whole: "Whole complex · 18" },
    card: { sleeps: "Sleeps", bestFor: "Best for", floors: "floor", askAbout: "Ask about this unit", seasonal: "Confirmed price per night" },
    suitability: { "small-a": "up to two guests", "small-b": "up to two guests", "large-a": "a family of four or friends", "large-b": "a group of four or a second family", grand: "5–6 friends or a large family" },
    allUnits: "Show all 5 units",
    whole: { eyebrow: "For larger groups", title: "The whole complex for your group", body: "All 5 units together · up to 18 guests. Please ask us to confirm dates and the whole-complex rate.", cta: "Ask about the whole complex" },
    facilitiesTitle: "For every overnight guest",
  },
  ru: {
    eyebrow: "Коттеджи и номера",
    title: "Выберите свой коттедж или номер",
    intro: "Здесь 5 вариантов размещения: два небольших коттеджа, два независимых номера в большом коттедже и один большой номер. Выберите подходящий вариант — от пары до большой компании друзей.",
    inventory: { units: "вариантов размещения", beds: "реальных спальных мест", capacity: "гостей максимум" },
    chooseTitle: "Сколько вас будет?",
    filters: { all: "Все 5 вариантов", couple: "1–2 гостя", four: "3–4 гостя", six: "5–6 гостей", whole: "Весь комплекс · 18" },
    card: { sleeps: "Вмещает", bestFor: "Подходит", floors: "этаж", askAbout: "Узнать об этом варианте", seasonal: "Подтверждённая цена за ночь" },
    suitability: { "small-a": "максимум для двух гостей", "small-b": "максимум для двух гостей", "large-a": "семьи из четырёх человек или друзей", "large-b": "группы из четырёх или второй семьи", grand: "5–6 друзей или большой семьи" },
    allUnits: "Показать все 5 вариантов",
    whole: { eyebrow: "Для большой группы", title: "Весь комплекс для вашей группы", body: "Все 5 вариантов вместе · до 18 гостей. Даты и цену всего комплекса уточняйте заранее.", cta: "Узнать о всём комплексе" },
    facilitiesTitle: "Для каждого гостя с ночёвкой",
  },
  ar: {
    eyebrow: "الأكواخ والغرف",
    title: "اختر الكوخ أو الغرفة المناسبة لك",
    intro: "لدينا 5 وحدات إقامة: كوخان صغيران، غرفتان مستقلتان في الكوخ الكبير، وغرفة كبيرة واحدة. تعرف على الخيار الأنسب لك، من زوجين إلى مجموعة كبيرة من الأصدقاء.",
    inventory: { units: "وحدات إقامة", beds: "أسرة فعلية", capacity: "ضيوف كحد أقصى" },
    chooseTitle: "كم عدد الضيوف؟",
    filters: { all: "كل الوحدات الخمس", couple: "1–2 ضيف", four: "3–4 ضيوف", six: "5–6 ضيوف", whole: "المجمع الكامل · 18" },
    card: { sleeps: "تتسع لـ", bestFor: "مناسبة لـ", floors: "طابق", askAbout: "اسأل عن هذه الوحدة", seasonal: "سعر مؤكد لليلة الواحدة" },
    suitability: { "small-a": "ضيفين كحد أقصى", "small-b": "ضيفين كحد أقصى", "large-a": "عائلة من أربعة أو أصدقاء", "large-b": "مجموعة من أربعة أو عائلة ثانية", grand: "5–6 أصدقاء أو عائلة كبيرة" },
    allUnits: "عرض الوحدات الخمس",
    whole: { eyebrow: "للمجموعات الكبيرة", title: "المجمع الكامل لمجموعتك", body: "كل الوحدات الخمس معاً · حتى 18 ضيفاً. يرجى الاستفسار مسبقاً عن تاريخ وسعر المجمع كاملاً.", cta: "اسأل عن المجمع الكامل" },
    facilitiesTitle: "لكل ضيف يقيم ليلاً",
  },
  fr: {
    eyebrow: "Chalets & chambres",
    title: "Choisissez votre chalet ou votre chambre",
    intro: "Nous proposons 5 unités : deux petits chalets, deux chambres indépendantes dans le grand chalet et une grande chambre. Du couple au groupe d'amis, voyez tout de suite ce qui vous convient.",
    inventory: { units: "unités d'hébergement", beds: "vrais lits", capacity: "voyageurs maximum" },
    chooseTitle: "Combien de voyageurs êtes-vous ?",
    filters: { all: "Les 5 unités", couple: "1–2 voyageurs", four: "3–4 voyageurs", six: "5–6 voyageurs", whole: "Complexe entier · 18" },
    card: { sleeps: "Capacité", bestFor: "Idéal pour", floors: "étage", askAbout: "Demander cette unité", seasonal: "Prix confirmé par nuit" },
    suitability: { "small-a": "deux voyageurs maximum", "small-b": "deux voyageurs maximum", "large-a": "une famille de quatre ou des amis", "large-b": "un groupe de quatre ou une seconde famille", grand: "5–6 amis ou une grande famille" },
    allUnits: "Voir les 5 unités",
    whole: { eyebrow: "Pour les grands groupes", title: "Le complexe entier pour votre groupe", body: "Les 5 unités ensemble · jusqu'à 18 voyageurs. Demandez-nous les dates et le tarif du complexe entier.", cta: "Demander le complexe entier" },
    facilitiesTitle: "Pour chaque hôte qui passe la nuit",
  },
  es: {
    eyebrow: "Cabañas y habitaciones",
    title: "Elige tu cabaña o habitación",
    intro: "Hay 5 unidades de alojamiento: dos cabañas pequeñas, dos habitaciones independientes en la cabaña grande y una habitación grande. Desde una pareja hasta un grupo grande de amigos, descubre cuál encaja contigo.",
    inventory: { units: "unidades de alojamiento", beds: "camas reales", capacity: "huéspedes máximo" },
    chooseTitle: "¿Cuántos huéspedes son?",
    filters: { all: "Las 5 unidades", couple: "1–2 huéspedes", four: "3–4 huéspedes", six: "5–6 huéspedes", whole: "Complejo completo · 18" },
    card: { sleeps: "Capacidad", bestFor: "Ideal para", floors: "planta", askAbout: "Consultar esta unidad", seasonal: "Precio confirmado por noche" },
    suitability: { "small-a": "un máximo de dos huéspedes", "small-b": "un máximo de dos huéspedes", "large-a": "una familia de cuatro o amigos", "large-b": "un grupo de cuatro o una segunda familia", grand: "5–6 amigos o una familia grande" },
    allUnits: "Ver las 5 unidades",
    whole: { eyebrow: "Para grupos grandes", title: "El complejo completo para tu grupo", body: "Las 5 unidades juntas · hasta 18 huéspedes. Consulta las fechas y el precio del complejo completo con antelación.", cta: "Consultar el complejo completo" },
    facilitiesTitle: "Para cada huésped que pasa la noche",
  },
};

export function getStayExperienceCopy(lang: Lang) {
  return copy[lang];
}
