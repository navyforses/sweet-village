/**
 * Default owner-editable copy for the seven event formats (title, body,
 * experience line, three highlights) plus the gallery caption labels, in all
 * six languages. Seeds DEFAULT_CONTENT.events; formerly lived in
 * client/src/lib/eventDetailCopy.ts.
 */
import { localized, type LocalizedText } from "./langs";
import type { EventId } from "./venue";

export interface EventCopy {
  title: LocalizedText;
  body: LocalizedText;
  experience: LocalizedText;
  highlights: readonly [LocalizedText, LocalizedText, LocalizedText];
}

export const EVENT_COPY: Record<EventId, EventCopy> = {
  "wedding": {
    title: localized("ქორწილი ბაღსა და დარბაზში", "Garden & hall wedding", "Свадьба в саду и зале", "زفاف في الحديقة والقاعة", "Mariage au jardin et en salle", "Boda en jardín y salón"),
    body: localized("ინტიმური ცერემონია მწვანე ეზოში, ქართული სუფრა გადახურულ ან შიდა სივრცეში და სურვილის შემთხვევაში ღამისთევა კოტეჯებში.", "An intimate garden ceremony, Georgian feast on the covered terrace or indoors, and optional cottage stays for those closest to you.", "Камерная церемония в саду, грузинское застолье на крытой террасе или в зале и проживание близких в коттеджах.", "حفل حميم في الحديقة ومائدة جورجية في التراس المغطى أو القاعة مع إمكانية المبيت في الأكواخ.", "Cérémonie intime au jardin, table géorgienne sous la terrasse couverte ou en salle et nuit en chalet pour les proches.", "Ceremonia íntima en el jardín, mesa georgiana en la terraza cubierta o el salón y alojamiento en cabañas para los más cercanos."),
    experience: localized("დღე ერთ ტერიტორიაზე — მიღებიდან გვიან სუფრამდე", "One place from welcome to late supper", "Весь день в одном месте", "يوم كامل في مكان واحد", "Toute la journée au même endroit", "Todo el día en un solo lugar"),
    highlights: [
      localized("ბაღის ან ტერასის ცერემონია", "Garden or terrace ceremony", "Церемония в саду или на террасе", "حفل في الحديقة أو التراس", "Cérémonie au jardin ou en terrasse", "Ceremonia en jardín o terraza"),
      localized("იმერული მენიუ და სუფრის გაფორმება", "Imeretian menu and table styling", "Имеретинское меню и оформление", "قائمة إيميريتية وتنسيق الطاولة", "Menu d'Iméréthie et décoration", "Menú de Imereti y decoración"),
      localized("კოტეჯები ახლობლებისთვის", "Cottages for close guests", "Коттеджи для близких", "أكواخ للمقربين", "Chalets pour les proches", "Cabañas para allegados"),
    ],
  },
  "engagement": {
    title: localized("ნიშნობა და წლისთავი", "Engagement & anniversary", "Помолвка и годовщина", "خطوبة وذكرى سنوية", "Fiançailles et anniversaire", "Compromiso y aniversario"),
    body: localized("მცირე წრისთვის შექმნილი თბილი საღამო — ყვავილები, ბაღის განათება და სუფრა, რომელიც თქვენს ისტორიას ერგება.", "A warm evening for your closest circle, with flowers, garden lights and a table shaped around your story.", "Тёплый вечер для близкого круга: цветы, садовые огни и персонально оформленный стол.", "أمسية دافئة للمقربين مع الزهور وإضاءة الحديقة ومائدة مصممة لكم.", "Une soirée chaleureuse pour vos proches, avec fleurs, lumières du jardin et table personnalisée.", "Una velada cálida para los más cercanos, con flores, luces de jardín y una mesa personalizada."),
    experience: localized("მყუდრო ფორმატი სადღესასწაულო სადილისთვის", "An intimate celebratory dinner", "Камерный праздничный ужин", "عشاء احتفالي حميم", "Un dîner intime", "Una cena íntima"),
    highlights: [
      localized("ტერასა მზის ჩასვლისას", "Terrace at sunset", "Терраса на закате", "التراس عند الغروب", "Terrasse au coucher du soleil", "Terraza al atardecer"),
      localized("პერსონალური სუფრის გაფორმება", "Personal table styling", "Персональное оформление", "تنسيق شخصي", "Décoration personnalisée", "Decoración personal"),
      localized("ინდივიდუალურად შეთანხმებული მენიუ", "Menu agreed for your group", "Согласованное меню", "قائمة متفق عليها", "Menu convenu ensemble", "Menú acordado"),
    ],
  },
  "birthday": {
    title: localized("დაბადების დღე ბაღში", "Birthday in the garden", "День рождения в саду", "عيد ميلاد في الحديقة", "Anniversaire au jardin", "Cumpleaños en el jardín"),
    body: localized("დღის ან საღამოს დღესასწაული ოჯახისა და მეგობრებისთვის, გადახურული ტერასით, ბაღით და ქართული კერძებით.", "A daytime or evening celebration for family and friends, with a covered terrace, garden and Georgian food.", "Дневной или вечерний праздник для семьи и друзей с крытой террасой, садом и грузинской кухней.", "احتفال نهاري أو مسائي للعائلة والأصدقاء مع تراس مغطى وحديقة وطعام جورجي.", "Une fête en journée ou en soirée avec terrasse couverte, jardin et cuisine géorgienne.", "Fiesta de día o de noche con terraza cubierta, jardín y cocina georgiana."),
    experience: localized("თავისუფალი, ოჯახური და ფერადი გარემო", "Relaxed, family-friendly and colourful", "Свободная семейная атмосфера", "أجواء عائلية مريحة", "Ambiance familiale et détendue", "Ambiente familiar y relajado"),
    highlights: [
      localized("გადახურული გარე მაგიდები", "Covered outdoor tables", "Крытые столы на улице", "طاولات خارجية مغطاة", "Tables extérieures couvertes", "Mesas exteriores cubiertas"),
      localized("სადღესასწაულო ტორტისა და დეკორის ადგილი", "Space for cake and simple décor", "Место для торта и декора", "مكان للكعكة والزينة", "Espace gâteau et décoration", "Espacio para tarta y decoración"),
      localized("საბავშვო და საოჯახო ფორმატი", "Family and children-friendly format", "Семейный формат", "مناسب للعائلات", "Format familial", "Formato familiar"),
    ],
  },
  "corporate": {
    title: localized("გუნდის გასვლითი დღე", "Team away day", "Выездной день команды", "يوم فريق خارج المكتب", "Journée d'équipe", "Jornada de equipo"),
    body: localized("შეხვედრა, პრეზენტაცია, სადილი და მშვიდი დრო ბაღში — ქუთაისთან ახლოს, ქალაქის ხმაურის გარეშე.", "A meeting, presentation, lunch and garden break close to Kutaisi, away from city noise.", "Встреча, презентация, обед и отдых в саду недалеко от Кутаиси.", "اجتماع وعرض وغداء واستراحة في الحديقة بالقرب من كوتايسي.", "Réunion, présentation, déjeuner et pause au jardin près de Koutaïssi.", "Reunión, presentación, almuerzo y descanso en el jardín cerca de Kutaisi."),
    experience: localized("საქმიანი ნაწილი და დასვენება ერთ სივრცეში", "Focused work and unhurried hospitality", "Работа и отдых в одном месте", "عمل وضيافة في مكان واحد", "Travail et détente sur place", "Trabajo y descanso en un lugar"),
    highlights: [
      localized("შეხვედრის მოქნილი განლაგება", "Flexible meeting layout", "Гибкая рассадка", "ترتيب مرن", "Disposition flexible", "Distribución flexible"),
      localized("ეკრანი და სამუშაო მაგიდები", "Screen and work tables", "Экран и рабочие столы", "شاشة وطاولات عمل", "Écran et tables de travail", "Pantalla y mesas de trabajo"),
      localized("ყავის შესვენება და ქართული სადილი", "Coffee break and Georgian lunch", "Кофе-брейк и грузинский обед", "استراحة قهوة وغداء جورجي", "Pause-café et déjeuner géorgien", "Café y almuerzo georgiano"),
    ],
  },
  "feast": {
    title: localized("ქართული სუფრა და კერძო ვახშამი", "Georgian feast & private dinner", "Грузинское застолье", "وليمة جورجية خاصة", "Table géorgienne privée", "Banquete georgiano privado"),
    body: localized("სუფრა, რომლის ცენტრში იმერული სტუმარმასპინძლობაა — ადგილობრივი კერძები, სეზონური მწვანილი და მშვიდი ბაღის გარემო.", "A table centred on Imeretian hospitality, local dishes, seasonal herbs and a quiet garden setting.", "Имеретинское гостеприимство, местные блюда, сезонная зелень и тихий сад.", "ضيافة إيميريتية وأطباق محلية وأعشاب موسمية في أجواء الحديقة الهادئة.", "Hospitalité d'Iméréthie, plats locaux et herbes de saison dans un jardin paisible.", "Hospitalidad de Imereti, platos locales y hierbas de temporada en un jardín tranquilo."),
    experience: localized("ნამდვილი გემოები ახლო წრისთვის", "Authentic flavours for a close circle", "Настоящие вкусы для близкого круга", "نكهات أصيلة للمقربين", "Saveurs authentiques entre proches", "Sabores auténticos entre amigos"),
    highlights: [
      localized("ოჯახური სტილის საერთო კერძები", "Family-style shared dishes", "Общие блюда по-семейному", "أطباق مشتركة", "Plats à partager", "Platos para compartir"),
      localized("დარბაზი ან ბაღის ტერასა", "Indoor hall or garden terrace", "Зал или терраса", "قاعة أو تراس", "Salle ou terrasse", "Salón o terraza"),
      localized("მცირე და საშუალო ჯგუფები", "Small and medium groups", "Малые и средние группы", "مجموعات صغيرة ومتوسطة", "Petits et moyens groupes", "Grupos pequeños y medianos"),
    ],
  },
  "masterclass": {
    title: localized("კულინარიული მასტერკლასი", "Culinary masterclass", "Кулинарный мастер-класс", "ورشة طبخ", "Atelier culinaire", "Taller culinario"),
    body: localized("ხელით მომზადებული ცომეული და ტრადიციული ტკბილეული მასპინძელთან ერთად — პრაქტიკული, გემრიელი გამოცდილება ბაღში.", "Make pastry and traditional sweets by hand with your host — a practical and delicious garden experience.", "Готовьте выпечку и традиционные сладости вместе с хозяйкой — практичный и вкусный опыт в саду.", "حضّر المعجنات والحلويات التقليدية يدوياً مع المضيفة في تجربة عملية ولذيذة.", "Préparez pâtisseries et douceurs traditionnelles à la main avec votre hôte.", "Prepara repostería y dulces tradicionales a mano junto a tu anfitriona."),
    experience: localized("მოამზადეთ, დააგემოვნეთ და წაიღეთ საკუთარი ნამუშევარი", "Cook, taste and take home what you make", "Приготовьте, попробуйте и заберите с собой", "اطبخ وتذوق وخذ ما صنعته", "Cuisinez, goûtez et emportez vos créations", "Cocina, prueba y llévate tu creación"),
    highlights: [
      localized("მცირე ჯგუფი და პირადი ინსტრუქტაჟი", "Small group and personal guidance", "Малая группа", "مجموعة صغيرة", "Petit groupe", "Grupo pequeño"),
      localized("ცომი, თხილი, ჩირი და სანელებლები", "Dough, nuts, dried fruit and spices", "Тесто, орехи, сухофрукты и специи", "عجين ومكسرات وفواكه مجففة", "Pâte, noix, fruits secs et épices", "Masa, frutos secos y especias"),
      localized("სეზონზე მორგებული გარე ან შიდა ფორმატი", "Seasonal indoor or outdoor setup", "Сезонный формат", "تنظيم موسمي داخلي أو خارجي", "Format saisonnier intérieur ou extérieur", "Formato de temporada"),
    ],
  },
  "poolside": {
    title: localized("აუზისპირა პავილიონი", "Poolside pavilion", "Павильон у бассейна", "جناح بجانب المسبح", "Pavillon au bord de la piscine", "Pabellón junto a la piscina"),
    body: localized("აუზის გვერდით მდებარე ღია, გადახურული სივრცე მცირე ღონისძიებებისთვის — საღამოს სუფრიდან დაბადების დღემდე, გუნდის შეხვედრამდე და კულინარიულ მასტერკლასამდე.", "An open covered pavilion beside the pool for intimate celebrations, birthdays, team sessions and hands-on culinary workshops.", "Открытый крытый павильон рядом с бассейном для камерных праздников, дней рождения, командных встреч и кулинарных мастер-классов.", "جناح مفتوح ومغطى بجانب المسبح للاحتفالات الصغيرة وأعياد الميلاد واجتماعات الفرق وورش الطبخ العملية.", "Un pavillon ouvert et couvert près de la piscine pour célébrations intimes, anniversaires, réunions d'équipe et ateliers culinaires.", "Un pabellón abierto y cubierto junto a la piscina para celebraciones íntimas, cumpleaños, reuniones de equipo y talleres culinarios."),
    experience: localized("ოთხი განსხვავებული ფორმატი ერთ რეალურ აუზისპირა სივრცეში", "Four versatile formats in one real poolside space", "Четыре формата в одном реальном пространстве у бассейна", "أربعة استخدامات مرنة في مساحة حقيقية بجانب المسبح", "Quatre formats dans un véritable espace au bord de la piscine", "Cuatro formatos en un espacio real junto a la piscina"),
    highlights: [
      localized("მცირე ქორწილი, ნიშნობა ან დაბადების დღე", "Intimate wedding, engagement or birthday", "Камерная свадьба, помолвка или день рождения", "زفاف صغير أو خطوبة أو عيد ميلاد", "Mariage intime, fiançailles ou anniversaire", "Boda íntima, compromiso o cumpleaños"),
      localized("გუნდის შეხვედრა და ყავის შესვენება", "Team session with a coffee break", "Командная встреча и кофе-брейк", "اجتماع فريق واستراحة قهوة", "Réunion d'équipe et pause-café", "Reunión de equipo y pausa para café"),
      localized("კულინარიული მასტერკლასი აუზის გვერდით", "Culinary masterclass beside the pool", "Кулинарный мастер-класс у бассейна", "ورشة طبخ بجانب المسبح", "Atelier culinaire près de la piscine", "Taller culinario junto a la piscina"),
    ],
  },
};

/** Caption labels used for the default event galleries. */
export const EVENT_CAPTION_CONCEPT: LocalizedText = localized("რეალურ სივრცეზე დაფუძნებული პროფესიონალური ხედვა", "Professional concept based on the real venue", "Профессиональная концепция на основе реального пространства", "تصور احترافي مبني على المكان الحقيقي", "Concept professionnel basé sur le lieu réel", "Concepto profesional basado en el lugar real");
export const EVENT_CAPTION_REAL: LocalizedText = localized("რეალური სივრცის ფოტო", "Real venue photograph", "Реальная фотография пространства", "صورة حقيقية للمكان", "Photo réelle du lieu", "Foto real del lugar");
