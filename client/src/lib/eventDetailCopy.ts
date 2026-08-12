import type { Lang } from "@/i18n";
import type { EventId } from "@shared/venue";

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
  realPhotoNote: string;
  events: Record<EventId, EventText>;
};

const copy: Record<Lang, EventPageCopy> = {
  ka: {
    back: "ყველა ღონისძიება",
    explore: "აირჩიეთ ფორმატი",
    overviewTitle: "თქვენს ამბავზე მორგებული დღე ბაღში",
    details: "რას მოიცავს",
    gallery: "სივრცე და ატმოსფერო",
    galleryIntro:
      "პროფესიონალური მთავარი კადრი და ამავე სივრცის რეალური ფოტოები — დააჭირეთ ნებისმიერ ფოტოს გასადიდებლად.",
    guests: "სტუმარი",
    ask: "ღონისძიების განხილვა",
    close: "დახურვა",
    previous: "წინა ფოტო",
    next: "შემდეგი ფოტო",
    viewAll: "ყველა ფოტო",
    realPhotoNote: "ღონისძიება თითოეული ჯგუფისთვის ინდივიდუალურად იგეგმება.",
    events: {
      wedding: {
        title: "ქორწილი ბაღსა და დარბაზში",
        body: "ინტიმური ცერემონია მწვანე ეზოში, ქართული სუფრა გადახურულ ან შიდა სივრცეში და სურვილის შემთხვევაში ღამისთევა კოტეჯებში.",
        experience: "დღე ერთ ტერიტორიაზე — მიღებიდან გვიან სუფრამდე",
        highlights: [
          "ბაღის ან ტერასის ცერემონია",
          "იმერული მენიუ და სუფრის გაფორმება",
          "კოტეჯები ახლობლებისთვის",
        ],
      },
      engagement: {
        title: "ნიშნობა და წლისთავი",
        body: "მცირე წრისთვის შექმნილი თბილი საღამო — ყვავილები, ბაღის განათება და სუფრა, რომელიც თქვენს ისტორიას ერგება.",
        experience: "მყუდრო ფორმატი სადღესასწაულო სადილისთვის",
        highlights: [
          "ტერასა მზის ჩასვლისას",
          "პერსონალური სუფრის გაფორმება",
          "ინდივიდუალურად შეთანხმებული მენიუ",
        ],
      },
      birthday: {
        title: "დაბადების დღე ბაღში",
        body: "დღის ან საღამოს დღესასწაული ოჯახისა და მეგობრებისთვის, გადახურული ტერასით, ბაღით და ქართული კერძებით.",
        experience: "თავისუფალი, ოჯახური და ფერადი გარემო",
        highlights: [
          "გადახურული გარე მაგიდები",
          "სადღესასწაულო ტორტისა და დეკორის ადგილი",
          "საბავშვო და საოჯახო ფორმატი",
        ],
      },
      corporate: {
        title: "გუნდის გასვლითი დღე",
        body: "შეხვედრა, პრეზენტაცია, სადილი და მშვიდი დრო ბაღში — ქუთაისთან ახლოს, ქალაქის ხმაურის გარეშე.",
        experience: "საქმიანი ნაწილი და დასვენება ერთ სივრცეში",
        highlights: [
          "შეხვედრის მოქნილი განლაგება",
          "ეკრანი და სამუშაო მაგიდები",
          "ყავის შესვენება და ქართული სადილი",
        ],
      },
      feast: {
        title: "ქართული სუფრა და კერძო ვახშამი",
        body: "სუფრა, რომლის ცენტრში იმერული სტუმარმასპინძლობაა — ადგილობრივი კერძები, სეზონური მწვანილი და მშვიდი ბაღის გარემო.",
        experience: "ნამდვილი გემოები ახლო წრისთვის",
        highlights: [
          "ოჯახური სტილის საერთო კერძები",
          "დარბაზი ან ბაღის ტერასა",
          "მცირე და საშუალო ჯგუფები",
        ],
      },
      masterclass: {
        title: "კულინარიული მასტერკლასი",
        body: "ხელით მომზადებული ცომეული და ტრადიციული ტკბილეული მასპინძელთან ერთად — პრაქტიკული, გემრიელი გამოცდილება ბაღში.",
        experience: "მოამზადეთ, დააგემოვნეთ და წაიღეთ საკუთარი ნამუშევარი",
        highlights: [
          "მცირე ჯგუფი და პირადი ინსტრუქტაჟი",
          "ცომი, თხილი, ჩირი და სანელებლები",
          "სეზონზე მორგებული გარე ან შიდა ფორმატი",
        ],
      },
    },
  },
  en: {
    back: "All events",
    explore: "Choose your format",
    overviewTitle: "A garden day shaped around your story",
    details: "What is included",
    gallery: "Space & atmosphere",
    galleryIntro:
      "A professionally styled hero image followed by real photographs of the same venue — select any image to enlarge it.",
    guests: "guests",
    ask: "Discuss your event",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    viewAll: "All photos",
    realPhotoNote: "Every event is planned individually for your group.",
    events: {
      wedding: {
        title: "Garden & hall wedding",
        body: "An intimate garden ceremony, Georgian feast on the covered terrace or indoors, and optional cottage stays for those closest to you.",
        experience: "One place from welcome to late supper",
        highlights: [
          "Garden or terrace ceremony",
          "Imeretian menu and table styling",
          "Cottages for close guests",
        ],
      },
      engagement: {
        title: "Engagement & anniversary",
        body: "A warm evening for your closest circle, with flowers, garden lights and a table shaped around your story.",
        experience: "An intimate celebratory dinner",
        highlights: [
          "Terrace at sunset",
          "Personal table styling",
          "Menu agreed for your group",
        ],
      },
      birthday: {
        title: "Birthday in the garden",
        body: "A daytime or evening celebration for family and friends, with a covered terrace, garden and Georgian food.",
        experience: "Relaxed, family-friendly and colourful",
        highlights: [
          "Covered outdoor tables",
          "Space for cake and simple décor",
          "Family and children-friendly format",
        ],
      },
      corporate: {
        title: "Team away day",
        body: "A meeting, presentation, lunch and garden break close to Kutaisi, away from city noise.",
        experience: "Focused work and unhurried hospitality",
        highlights: [
          "Flexible meeting layout",
          "Screen and work tables",
          "Coffee break and Georgian lunch",
        ],
      },
      feast: {
        title: "Georgian feast & private dinner",
        body: "A table centred on Imeretian hospitality, local dishes, seasonal herbs and a quiet garden setting.",
        experience: "Authentic flavours for a close circle",
        highlights: [
          "Family-style shared dishes",
          "Indoor hall or garden terrace",
          "Small and medium groups",
        ],
      },
      masterclass: {
        title: "Culinary masterclass",
        body: "Make pastry and traditional sweets by hand with your host — a practical and delicious garden experience.",
        experience: "Cook, taste and take home what you make",
        highlights: [
          "Small group and personal guidance",
          "Dough, nuts, dried fruit and spices",
          "Seasonal indoor or outdoor setup",
        ],
      },
    },
  },
  ru: {
    back: "Все мероприятия",
    explore: "Выберите формат",
    overviewTitle: "День в саду, созданный для вашей истории",
    details: "Что включено",
    gallery: "Пространство и атмосфера",
    galleryIntro:
      "Профессиональный главный кадр и реальные фотографии того же пространства — нажмите на фото, чтобы увеличить.",
    guests: "гостей",
    ask: "Обсудить мероприятие",
    close: "Закрыть",
    previous: "Предыдущее фото",
    next: "Следующее фото",
    viewAll: "Все фото",
    realPhotoNote: "Каждое мероприятие планируется индивидуально.",
    events: {
      wedding: {
        title: "Свадьба в саду и зале",
        body: "Камерная церемония в саду, грузинское застолье на крытой террасе или в зале и проживание близких в коттеджах.",
        experience: "Весь день в одном месте",
        highlights: [
          "Церемония в саду или на террасе",
          "Имеретинское меню и оформление",
          "Коттеджи для близких",
        ],
      },
      engagement: {
        title: "Помолвка и годовщина",
        body: "Тёплый вечер для близкого круга: цветы, садовые огни и персонально оформленный стол.",
        experience: "Камерный праздничный ужин",
        highlights: [
          "Терраса на закате",
          "Персональное оформление",
          "Согласованное меню",
        ],
      },
      birthday: {
        title: "День рождения в саду",
        body: "Дневной или вечерний праздник для семьи и друзей с крытой террасой, садом и грузинской кухней.",
        experience: "Свободная семейная атмосфера",
        highlights: [
          "Крытые столы на улице",
          "Место для торта и декора",
          "Семейный формат",
        ],
      },
      corporate: {
        title: "Выездной день команды",
        body: "Встреча, презентация, обед и отдых в саду недалеко от Кутаиси.",
        experience: "Работа и отдых в одном месте",
        highlights: [
          "Гибкая рассадка",
          "Экран и рабочие столы",
          "Кофе-брейк и грузинский обед",
        ],
      },
      feast: {
        title: "Грузинское застолье",
        body: "Имеретинское гостеприимство, местные блюда, сезонная зелень и тихий сад.",
        experience: "Настоящие вкусы для близкого круга",
        highlights: [
          "Общие блюда по-семейному",
          "Зал или терраса",
          "Малые и средние группы",
        ],
      },
      masterclass: {
        title: "Кулинарный мастер-класс",
        body: "Готовьте выпечку и традиционные сладости вместе с хозяйкой — практичный и вкусный опыт в саду.",
        experience: "Приготовьте, попробуйте и заберите с собой",
        highlights: [
          "Малая группа",
          "Тесто, орехи, сухофрукты и специи",
          "Сезонный формат",
        ],
      },
    },
  },
  ar: {
    back: "كل الفعاليات",
    explore: "اختر التجربة",
    overviewTitle: "يوم في الحديقة مصمم حول قصتكم",
    details: "ما تتضمنه",
    gallery: "المكان والأجواء",
    galleryIntro:
      "صورة رئيسية احترافية تليها صور حقيقية للمكان نفسه — اضغط على أي صورة لتكبيرها.",
    guests: "ضيوف",
    ask: "ناقش فعاليتك",
    close: "إغلاق",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
    viewAll: "كل الصور",
    realPhotoNote: "يتم تخطيط كل فعالية بما يناسب مجموعتك.",
    events: {
      wedding: {
        title: "زفاف في الحديقة والقاعة",
        body: "حفل حميم في الحديقة ومائدة جورجية في التراس المغطى أو القاعة مع إمكانية المبيت في الأكواخ.",
        experience: "يوم كامل في مكان واحد",
        highlights: [
          "حفل في الحديقة أو التراس",
          "قائمة إيميريتية وتنسيق الطاولة",
          "أكواخ للمقربين",
        ],
      },
      engagement: {
        title: "خطوبة وذكرى سنوية",
        body: "أمسية دافئة للمقربين مع الزهور وإضاءة الحديقة ومائدة مصممة لكم.",
        experience: "عشاء احتفالي حميم",
        highlights: ["التراس عند الغروب", "تنسيق شخصي", "قائمة متفق عليها"],
      },
      birthday: {
        title: "عيد ميلاد في الحديقة",
        body: "احتفال نهاري أو مسائي للعائلة والأصدقاء مع تراس مغطى وحديقة وطعام جورجي.",
        experience: "أجواء عائلية مريحة",
        highlights: [
          "طاولات خارجية مغطاة",
          "مكان للكعكة والزينة",
          "مناسب للعائلات",
        ],
      },
      corporate: {
        title: "يوم فريق خارج المكتب",
        body: "اجتماع وعرض وغداء واستراحة في الحديقة بالقرب من كوتايسي.",
        experience: "عمل وضيافة في مكان واحد",
        highlights: [
          "ترتيب مرن",
          "شاشة وطاولات عمل",
          "استراحة قهوة وغداء جورجي",
        ],
      },
      feast: {
        title: "وليمة جورجية خاصة",
        body: "ضيافة إيميريتية وأطباق محلية وأعشاب موسمية في أجواء الحديقة الهادئة.",
        experience: "نكهات أصيلة للمقربين",
        highlights: ["أطباق مشتركة", "قاعة أو تراس", "مجموعات صغيرة ومتوسطة"],
      },
      masterclass: {
        title: "ورشة طبخ",
        body: "حضّر المعجنات والحلويات التقليدية يدوياً مع المضيفة في تجربة عملية ولذيذة.",
        experience: "اطبخ وتذوق وخذ ما صنعته",
        highlights: [
          "مجموعة صغيرة",
          "عجين ومكسرات وفواكه مجففة",
          "تنظيم موسمي داخلي أو خارجي",
        ],
      },
    },
  },
  fr: {
    back: "Tous les événements",
    explore: "Choisissez votre format",
    overviewTitle: "Une journée au jardin conçue autour de votre histoire",
    details: "Ce qui est inclus",
    gallery: "Lieu et ambiance",
    galleryIntro:
      "Une image principale professionnelle suivie de vraies photos du même lieu — cliquez pour agrandir.",
    guests: "invités",
    ask: "Parler de votre événement",
    close: "Fermer",
    previous: "Photo précédente",
    next: "Photo suivante",
    viewAll: "Toutes les photos",
    realPhotoNote: "Chaque événement est organisé sur mesure.",
    events: {
      wedding: {
        title: "Mariage au jardin et en salle",
        body: "Cérémonie intime au jardin, table géorgienne sous la terrasse couverte ou en salle et nuit en chalet pour les proches.",
        experience: "Toute la journée au même endroit",
        highlights: [
          "Cérémonie au jardin ou en terrasse",
          "Menu d'Iméréthie et décoration",
          "Chalets pour les proches",
        ],
      },
      engagement: {
        title: "Fiançailles et anniversaire",
        body: "Une soirée chaleureuse pour vos proches, avec fleurs, lumières du jardin et table personnalisée.",
        experience: "Un dîner intime",
        highlights: [
          "Terrasse au coucher du soleil",
          "Décoration personnalisée",
          "Menu convenu ensemble",
        ],
      },
      birthday: {
        title: "Anniversaire au jardin",
        body: "Une fête en journée ou en soirée avec terrasse couverte, jardin et cuisine géorgienne.",
        experience: "Ambiance familiale et détendue",
        highlights: [
          "Tables extérieures couvertes",
          "Espace gâteau et décoration",
          "Format familial",
        ],
      },
      corporate: {
        title: "Journée d'équipe",
        body: "Réunion, présentation, déjeuner et pause au jardin près de Koutaïssi.",
        experience: "Travail et détente sur place",
        highlights: [
          "Disposition flexible",
          "Écran et tables de travail",
          "Pause-café et déjeuner géorgien",
        ],
      },
      feast: {
        title: "Table géorgienne privée",
        body: "Hospitalité d'Iméréthie, plats locaux et herbes de saison dans un jardin paisible.",
        experience: "Saveurs authentiques entre proches",
        highlights: [
          "Plats à partager",
          "Salle ou terrasse",
          "Petits et moyens groupes",
        ],
      },
      masterclass: {
        title: "Atelier culinaire",
        body: "Préparez pâtisseries et douceurs traditionnelles à la main avec votre hôte.",
        experience: "Cuisinez, goûtez et emportez vos créations",
        highlights: [
          "Petit groupe",
          "Pâte, noix, fruits secs et épices",
          "Format saisonnier intérieur ou extérieur",
        ],
      },
    },
  },
  es: {
    back: "Todos los eventos",
    explore: "Elige el formato",
    overviewTitle: "Un día en el jardín creado para vuestra historia",
    details: "Qué incluye",
    gallery: "Espacio y ambiente",
    galleryIntro:
      "Una imagen principal profesional seguida de fotos reales del mismo lugar — pulsa para ampliar.",
    guests: "invitados",
    ask: "Hablar de tu evento",
    close: "Cerrar",
    previous: "Foto anterior",
    next: "Foto siguiente",
    viewAll: "Todas las fotos",
    realPhotoNote: "Cada evento se planifica a medida.",
    events: {
      wedding: {
        title: "Boda en jardín y salón",
        body: "Ceremonia íntima en el jardín, mesa georgiana en la terraza cubierta o el salón y alojamiento en cabañas para los más cercanos.",
        experience: "Todo el día en un solo lugar",
        highlights: [
          "Ceremonia en jardín o terraza",
          "Menú de Imereti y decoración",
          "Cabañas para allegados",
        ],
      },
      engagement: {
        title: "Compromiso y aniversario",
        body: "Una velada cálida para los más cercanos, con flores, luces de jardín y una mesa personalizada.",
        experience: "Una cena íntima",
        highlights: [
          "Terraza al atardecer",
          "Decoración personal",
          "Menú acordado",
        ],
      },
      birthday: {
        title: "Cumpleaños en el jardín",
        body: "Fiesta de día o de noche con terraza cubierta, jardín y cocina georgiana.",
        experience: "Ambiente familiar y relajado",
        highlights: [
          "Mesas exteriores cubiertas",
          "Espacio para tarta y decoración",
          "Formato familiar",
        ],
      },
      corporate: {
        title: "Jornada de equipo",
        body: "Reunión, presentación, almuerzo y descanso en el jardín cerca de Kutaisi.",
        experience: "Trabajo y descanso en un lugar",
        highlights: [
          "Distribución flexible",
          "Pantalla y mesas de trabajo",
          "Café y almuerzo georgiano",
        ],
      },
      feast: {
        title: "Banquete georgiano privado",
        body: "Hospitalidad de Imereti, platos locales y hierbas de temporada en un jardín tranquilo.",
        experience: "Sabores auténticos entre amigos",
        highlights: [
          "Platos para compartir",
          "Salón o terraza",
          "Grupos pequeños y medianos",
        ],
      },
      masterclass: {
        title: "Taller culinario",
        body: "Prepara repostería y dulces tradicionales a mano junto a tu anfitriona.",
        experience: "Cocina, prueba y llévate tu creación",
        highlights: [
          "Grupo pequeño",
          "Masa, frutos secos y especias",
          "Formato de temporada",
        ],
      },
    },
  },
};

export function getEventPageCopy(lang: Lang) {
  return copy[lang];
}
