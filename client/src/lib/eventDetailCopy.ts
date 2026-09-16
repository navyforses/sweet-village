import type { Lang } from "@/i18n";
import { EVENT_COPY } from "@shared/eventCopy";
import { EVENT_TYPES, type EventId } from "@shared/venue";

/**
 * Page chrome for the events pages. Event titles, descriptions, highlights
 * and gallery captions are owner-editable content (shared/content.ts); the
 * defaults are exposed here through `events` for compatibility.
 */

type EventText = {
  title: string;
  body: string;
  experience: string;
  highlights: readonly string[];
};

type EventPageCopy = {
  back: string;
  explore: string;
  overviewTitle: string;
  details: string;
  gallery: string;
  galleryIntro: string;
  guests: string;
  ask: string;
  close: string;
  previous: string;
  next: string;
  viewAll: string;
  professionalConcept: string;
  realVenuePhoto: string;
  realPhotoNote: string;
};

const copy: Record<Lang, EventPageCopy> = {
  ka: {
    back: "ყველა ღონისძიება",
    explore: "აირჩიეთ ფორმატი",
    overviewTitle: "თქვენს ამბავზე მორგებული დღე ბაღში",
    details: "რას მოიცავს",
    gallery: "სივრცე და ატმოსფერო",
    galleryIntro:
      "რეალურ სივრცეზე დაფუძნებული პროფესიონალური ხედვები და ამავე სივრცის რეალური ფოტოები — დააჭირეთ ნებისმიერ ფოტოს გასადიდებლად.",
    guests: "სტუმარი",
    ask: "ღონისძიების განხილვა",
    close: "დახურვა",
    previous: "წინა ფოტო",
    next: "შემდეგი ფოტო",
    viewAll: "ყველა ფოტო",
    professionalConcept: "რეალურ სივრცეზე დაფუძნებული პროფესიონალური ხედვა",
    realVenuePhoto: "რეალური სივრცის ფოტო",
    realPhotoNote: "ღონისძიება თითოეული ჯგუფისთვის ინდივიდუალურად იგეგმება.",
  },
  en: {
    back: "All events",
    explore: "Choose your format",
    overviewTitle: "A garden day shaped around your story",
    details: "What is included",
    gallery: "Space & atmosphere",
    galleryIntro:
      "Professional views based on the real venue, followed by real photographs of the same space — select any image to enlarge it.",
    guests: "guests",
    ask: "Discuss your event",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    viewAll: "All photos",
    professionalConcept: "Professional concept based on the real venue",
    realVenuePhoto: "Real venue photograph",
    realPhotoNote: "Every event is planned individually for your group.",
  },
  ru: {
    back: "Все мероприятия",
    explore: "Выберите формат",
    overviewTitle: "День в саду, созданный для вашей истории",
    details: "Что включено",
    gallery: "Пространство и атмосфера",
    galleryIntro:
      "Профессиональные виды, основанные на реальном пространстве, и реальные фотографии того же места — нажмите на фото, чтобы увеличить.",
    guests: "гостей",
    ask: "Обсудить мероприятие",
    close: "Закрыть",
    previous: "Предыдущее фото",
    next: "Следующее фото",
    viewAll: "Все фото",
    professionalConcept:
      "Профессиональная концепция на основе реального пространства",
    realVenuePhoto: "Реальная фотография пространства",
    realPhotoNote: "Каждое мероприятие планируется индивидуально.",
  },
  ar: {
    back: "كل الفعاليات",
    explore: "اختر التجربة",
    overviewTitle: "يوم في الحديقة مصمم حول قصتكم",
    details: "ما تتضمنه",
    gallery: "المكان والأجواء",
    galleryIntro:
      "مشاهد احترافية مبنية على المكان الحقيقي، تليها صور حقيقية للمساحة نفسها — اضغط على أي صورة لتكبيرها.",
    guests: "ضيوف",
    ask: "ناقش فعاليتك",
    close: "إغلاق",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
    viewAll: "كل الصور",
    professionalConcept: "تصور احترافي مبني على المكان الحقيقي",
    realVenuePhoto: "صورة حقيقية للمكان",
    realPhotoNote: "يتم تخطيط كل فعالية بما يناسب مجموعتك.",
  },
  fr: {
    back: "Tous les événements",
    explore: "Choisissez votre format",
    overviewTitle: "Une journée au jardin conçue autour de votre histoire",
    details: "Ce qui est inclus",
    gallery: "Lieu et ambiance",
    galleryIntro:
      "Des vues professionnelles fondées sur le lieu réel, suivies de vraies photos du même espace — cliquez pour agrandir.",
    guests: "invités",
    ask: "Parler de votre événement",
    close: "Fermer",
    previous: "Photo précédente",
    next: "Photo suivante",
    viewAll: "Toutes les photos",
    professionalConcept: "Concept professionnel basé sur le lieu réel",
    realVenuePhoto: "Photo réelle du lieu",
    realPhotoNote: "Chaque événement est organisé sur mesure.",
  },
  es: {
    back: "Todos los eventos",
    explore: "Elige el formato",
    overviewTitle: "Un día en el jardín creado para vuestra historia",
    details: "Qué incluye",
    gallery: "Espacio y ambiente",
    galleryIntro:
      "Vistas profesionales basadas en el lugar real, seguidas de fotos reales del mismo espacio — pulsa para ampliar.",
    guests: "invitados",
    ask: "Hablar de tu evento",
    close: "Cerrar",
    previous: "Foto anterior",
    next: "Foto siguiente",
    viewAll: "Todas las fotos",
    professionalConcept: "Concepto profesional basado en el lugar real",
    realVenuePhoto: "Foto real del lugar",
    realPhotoNote: "Cada evento se planifica a medida.",
  },
};

function defaultEvents(lang: Lang): Record<EventId, EventText> {
  return Object.fromEntries(
    EVENT_TYPES.map(event => {
      const text = EVENT_COPY[event.id];
      return [event.id, { title: text.title[lang], body: text.body[lang], experience: text.experience[lang], highlights: text.highlights.map(item => item[lang]) }];
    }),
  ) as unknown as Record<EventId, EventText>;
}

export function getEventPageCopy(lang: Lang): EventPageCopy & { events: Record<EventId, EventText> } {
  return { ...copy[lang], events: defaultEvents(lang) };
}
