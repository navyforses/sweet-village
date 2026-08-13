type LocaleCode = "ka" | "en" | "ru" | "ar" | "fr" | "es";
type LocalePatch = Record<string, unknown>;

export const AUTHENTIC_COPY: Record<LocaleCode, LocalePatch> = {
  ka: {
    meta: { description: "კოტეჯები, აუზი, ოჯახურად მომზადებული ქართული სუფრა და ლამაზი საღამოს სივრცე ქვილიშორში, პრომეთეს მღვიმის გზაზე." },
    brand: { tagline: "შუაგული იმერეთი · ქვილიშორი · წყალტუბო" },
    nav: { stay: "კოტეჯები და ნომრები" },
    hero: { title: "მწვანე, მშვიდი და ოჯახური ადგილი შუაგულ იმერეთში", subtitle: "კოტეჯები, აუზი და ოჯახურად მომზადებული ქართული სუფრა — დღე მეგობრებთან, საღამო ახლობლებთან და დასვენება პრომეთეს მღვიმის გზაზე." },
    highlights: { title: "ჩვენს ტკბილ სოფელში", items: [
      { title: "პრომეთეს მღვიმის გზაზე", body: "წყალტუბოსთან ახლოს, იმ მოგზაურობისთვის, რომელიც მღვიმით იწყება და მშვიდი საღამოთი გრძელდება." },
      { title: "ეზოდან სუფრამდე", body: "ჩვენივე ეზოში მოყვანილი ბოსტნეული და ოჯახურად მომზადებული ქართული კერძები." },
      { title: "იმერული სუფრა", body: "კეცის ჭადი, ქოთნის ლობიო, ხაჭაპური და ისეთი კერძები, რომლებიც სუფრასთან აჩერებს ადამიანს." },
      { title: "ლამაზი საღამოსთვის", body: "ბაღი, გადახურული სივრცე, სუფრა და ადგილი ახლო წრის შეკრებისთვის." },
    ] },
    services: { title: "ჩვენთან რა გელით", subtitle: "დასვენება, სუფრა და დღე, რომელიც მოგონებად რჩება", events: { body: "დაბადების დღე, ხელის მოწერა, ქორწილი ან უბრალოდ ლამაზი საღამო — სუფრით, ბაღითა და გადახურული სივრცით." }, pool: { body: "ზაფხულის დღე აუზთან, სიმწვანეში და მშვიდ გარემოში — ოჯახთან, მეგობრებთან ან უბრალოდ თქვენთვის." }, restaurant: { body: "ოჯახურად მომზადებული ქართული კერძები, იმერული სუფრა, კეცი და ქოთანი." }, stay: { title: "კოტეჯები და ნომრები", body: "ხუთი საცხოვრებელი ერთეული მწვანე ეზოში — წყვილისთვის, ოჯახისა და მეგობრების ჯგუფისთვის." } },
    stay: { eyebrow: "კოტეჯები და ნომრები", title: "აირჩიეთ თქვენი კოტეჯი ან ნომერი", intro: "ხუთი საცხოვრებელი ერთეული მწვანე ეზოში. აქ რჩებიან წყვილები, ოჯახები და მეგობრები, რომლებიც წყალტუბოსა და იმერეთის გარშემო მოგზაურობენ. მფლობელის მიერ დადასტურებული საერთო ტევადობა 18 სტუმარია." },
    events: { title: "ლამაზი საღამოსთვის შექმნილი სივრცე", intro: "ბაღი, გადახურული სივრცე და ქართული სუფრა — ადგილი, სადაც ახლო წრე იკრიბება, დღე კი მოგონებად რჩება. სტუმრებს, რომლებსაც ღამით დარჩენა სურთ, კოტეჯებსა და ნომრებში ვათავსებთ." },
    pool: { title: "ზაფხულის დღე აუზთან", intro: "ღია აუზი მწვანე ეზოში. ჩამოდით დღით ან დარჩით ღამით — აუზთან დრო ოჯახთან და მეგობრებთან ერთად უკეთესად გადის." },
    restaurant: { title: "იმერული სუფრა ჩვენს ეზოში", intro: "ოჯახურად მომზადებული ქართული კერძები, კეცის ჭადი, ქოთნის ლობიო, ხაჭაპური და დიდი სუფრა, რომელსაც ერთად ყოფნა უხდება." },
    location: { title: "შუაგულ იმერეთში, პრომეთეს მღვიმის გზაზე", intro: "ქვილიშორი წყალტუბოსთან ახლოსაა. აქედან იწყება გზა პრომეთეს მღვიმისკენ, სათაფლიისკენ, მარტვილისკენ და ხვამლისკენ — ხოლო საღამოს ისევ მწვანე ეზო და სუფრა გელით." },
    about: { title: "სიყვარულით შექმნილი ადგილი", body1: "ტკბილი სოფელი არის ოჯახური, სუფთა და მშვიდი გარემო ქვილიშორში. აქ ერთმანეთს ხვდება მწვანე ეზო, კოტეჯები, აუზი და ოჯახურად მომზადებული ქართული სუფრა.", body2: "აქ მოდიან ერთი დღის გასატარებლად, მეგობრებთან ერთად დასასვენებლად, დაბადების დღის აღსანიშნავად ან პრომეთეს მღვიმის შემდეგ დასარჩენად. ჩვენი სურვილია, სტუმარმა აქედან თან წაიღოს კარგი მოგონება." },
    booking: { intro: "მოგვწერეთ თქვენთვის სასურველი დღის, კოტეჯის, სუფრის, აუზის ან ღონისძიების შესახებ. თავისუფალ ადგილსა და ზუსტ ფასს სწრაფად დაგიზუსტებთ." },
  },
  en: {
    meta: { description: "Cottages, a pool, home-cooked Georgian feasts, and a beautiful evening space in Kvilishori, on the way to Prometheus Cave." },
    brand: { tagline: "Heart of Imereti · Kvilishori · Tskaltubo" },
    nav: { stay: "Cottages & rooms" },
    hero: { title: "A green, peaceful, family-friendly place in the heart of Imereti", subtitle: "Cottages, a pool, and home-cooked Georgian feasts — a day with friends, an evening with loved ones, and relaxation on the way to Prometheus Cave." },
    highlights: { title: "In our Sweet Village", items: [
      { title: "On the way to Prometheus Cave", body: "Near Tskaltubo, for a journey that begins with the cave and continues into a peaceful evening." },
      { title: "From garden to table", body: "Vegetables grown in our own yard and home-cooked Georgian dishes." },
      { title: "Imeretian feast", body: "Mchadi on a ketsi, clay-pot lobio, khachapuri, and dishes that make you linger at the table." },
      { title: "For a beautiful evening", body: "A garden, a covered space, a feast, and a place to gather with your close circle." },
    ] },
    services: { title: "What awaits you here", subtitle: "Relaxation, a feast, and a day that turns into a memory", events: { body: "A birthday, civil ceremony, wedding, or simply a beautiful evening — complete with a feast, garden, and covered space." }, pool: { body: "A summer day by the pool, surrounded by greenery and peace — with family, friends, or just for yourself." }, restaurant: { body: "Home-cooked Georgian dishes, an Imeretian feast, ketsi, and clay pots." }, stay: { title: "Cottages & rooms", body: "Five accommodation units in a green yard — for couples, families, and groups of friends." } },
    stay: { eyebrow: "Cottages & rooms", title: "Choose your cottage or room", intro: "Five accommodation units in a green yard. Couples, families, and friends travelling around Tskaltubo and Imereti stay here. The owner-confirmed total capacity is 18 guests." },
    events: { title: "A space created for a beautiful evening", intro: "A garden, covered space, and Georgian feast — a place where a close circle gathers and the day becomes a memory. Guests wishing to stay overnight can be accommodated in cottages and rooms." },
    pool: { title: "A summer day by the pool", intro: "An outdoor pool in a green yard. Drop by for the day or stay overnight — time by the pool is best spent with family and friends." },
    restaurant: { title: "Imeretian feast in our yard", intro: "Home-cooked Georgian dishes, mchadi on a ketsi, clay-pot lobio, khachapuri, and a generous table made for being together." },
    location: { title: "In the heart of Imereti, on the way to Prometheus Cave", intro: "Kvilishori is close to Tskaltubo. From here, the road leads to Prometheus Cave, Sataplia, Martvili, and Khvamli — and in the evening, a green yard and a feast await you again." },
    about: { title: "A place created with love", body1: "Sweet Village is a family-oriented, clean, and peaceful place in Kvilishori. Here, a green yard, cottages, a pool, and home-cooked Georgian feasts come together.", body2: "People come here to spend a day, relax with friends, celebrate a birthday, or stay after visiting Prometheus Cave. Our wish is that every guest leaves with a good memory." },
    booking: { intro: "Write to us about your preferred date, cottage, feast, pool, or event. We will quickly confirm availability and the exact price." },
  },
  ru: {
    meta: { description: "Коттеджи, бассейн, домашние грузинские блюда и красивое место для вечера в Квилишори, по дороге к пещере Прометея." },
    brand: { tagline: "Сердце Имеретии · Квилишори · Цхалтубо" },
    nav: { stay: "Коттеджи и номера" },
    hero: { title: "Зелёное, тихое и семейное место в самом сердце Имеретии", subtitle: "Коттеджи, бассейн и домашнее грузинское застолье — день с друзьями, вечер с близкими и отдых по дороге к пещере Прометея." },
    highlights: { title: "В нашей сладкой деревне", items: [
      { title: "По дороге к пещере Прометея", body: "Недалеко от Цхалтубо, для путешествия, которое начинается с пещеры и продолжается тихим вечером." },
      { title: "Из сада к столу", body: "Овощи, выращенные в нашем собственном саду, и домашние грузинские блюда." },
      { title: "Имеретинское застолье", body: "Мчади на кеци, лобио в глиняном горшочке, хачапури и блюда, за которыми хочется задержаться подольше." },
      { title: "Для прекрасного вечера", body: "Сад, крытая площадка, стол и место для встреч в узком кругу." },
    ] },
    services: { title: "Что вас ждёт у нас", subtitle: "Отдых, застолье и день, который остаётся в памяти", events: { body: "День рождения, роспись, свадьба или просто прекрасный вечер — с застольем, садом и крытой площадкой." }, pool: { body: "Летний день у бассейна, в зелени и тишине — с семьёй, друзьями или просто для себя." }, restaurant: { body: "Домашние грузинские блюда, имеретинское застолье, кеци и глиняные горшочки." }, stay: { title: "Коттеджи и номера", body: "Пять вариантов размещения в зелёном дворе — для пары, семьи и компании друзей." } },
    stay: { eyebrow: "Коттеджи и номера", title: "Выберите свой коттедж или номер", intro: "Пять вариантов размещения в зелёном дворе. Здесь останавливаются пары, семьи и друзья, путешествующие по Цхалтубо и Имеретии. Подтверждённая общая вместимость — 18 гостей." },
    events: { title: "Пространство для прекрасного вечера", intro: "Сад, крытая площадка и грузинское застолье — место, где собирается близкий круг, а день остаётся в памяти. Гостей, желающих остаться на ночь, мы размещаем в коттеджах и номерах." },
    pool: { title: "Летний день у бассейна", intro: "Открытый бассейн в зелёном дворе. Приезжайте на день или оставайтесь на ночь — у бассейна время с семьёй и друзьями проходит особенно хорошо." },
    restaurant: { title: "Имеретинское застолье в нашем дворе", intro: "Домашние грузинские блюда, мчади на кеци, лобио в горшочке, хачапури и большой стол для совместного времени." },
    location: { title: "В сердце Имеретии, по дороге к пещере Прометея", intro: "Квилишори находится недалеко от Цхалтубо. Отсюда ведёт путь к пещере Прометея, Сатаплия, Мартвили и горе Хвамли, а вечером вас снова ждут зелёный двор и застолье." },
    about: { title: "Место, созданное с любовью", body1: "«Сладкая деревня» — семейное, чистое и тихое место в Квилишори. Здесь встречаются зелёный двор, коттеджи, бассейн и домашнее грузинское застолье.", body2: "Сюда приезжают провести день, отдохнуть с друзьями, отметить день рождения или остаться на ночлег после посещения пещеры Прометея. Мы хотим, чтобы каждый гость увёз отсюда доброе воспоминание." },
    booking: { intro: "Напишите нам о желаемом дне, коттедже, застолье, бассейне или мероприятии. Мы быстро уточним наличие свободных мест и точную стоимость." },
  },
  ar: {
    meta: { description: "أكواخ، مسبح، مائدة جورجية محضرة بعناية عائلية، ومساحة جميلة للأمسيات في كفيليشوري، على طريق مغارة بروميثيوس." },
    brand: { tagline: "قلب إيميريتي · كفيليشوري · تسكالتوبو" },
    nav: { stay: "الأكواخ والغرف" },
    hero: { title: "مكان أخضر هادئ وعائلي في قلب إيميريتي", subtitle: "أكواخ، ومسبح، ومائدة جورجية محضرة عائلياً — يوم مع الأصدقاء، وأمسية مع المقربين، واسترخاء على طريق مغارة بروميثيوس." },
    highlights: { title: "في قريتنا الجميلة", items: [
      { title: "على طريق مغارة بروميثيوس", body: "بالقرب من تسكالتوبو، لرحلة تبدأ بالمغارة وتستمر بأمسية هادئة." },
      { title: "من الحديقة إلى المائدة", body: "خضروات مزروعة في حديقتنا وأطباق جورجية محضرة على الطريقة العائلية." },
      { title: "مائدة إيميريتي", body: "متشادي على الكيتسي، فاصوليا في إناء فخاري، خاتشابوري وأطباق تجعل الناس يطيلون الجلوس حول المائدة." },
      { title: "لأمسية جميلة", body: "حديقة، ومساحة مغطاة، ومائدة، ومكان لتجمع المقربين." },
    ] },
    services: { title: "ما ينتظركم معنا", subtitle: "استرخاء، ومائدة، ويوم يبقى في الذاكرة", events: { body: "عيد ميلاد، حفل زفاف، أو ببساطة أمسية جميلة — مع مائدة، وحديقة، ومساحة مغطاة." }, pool: { body: "يوم صيفي بجانب المسبح، وسط الخضرة والهدوء — مع العائلة، الأصدقاء، أو بمفردكم للاسترخاء." }, restaurant: { body: "أطباق جورجية محضرة عائلياً، مائدة إيميريتي، كيتسي وأوانٍ فخارية." }, stay: { title: "الأكواخ والغرف", body: "خمس وحدات سكنية في حديقة خضراء — للأزواج، والعائلات، ومجموعات الأصدقاء." } },
    stay: { eyebrow: "الأكواخ والغرف", title: "اختر الكوخ أو الغرفة المناسبة لك", intro: "خمس وحدات سكنية في حديقة خضراء. يقيم هنا الأزواج والعائلات والأصدقاء الذين يستكشفون تسكالتوبو ومنطقة إيميريتي. السعة الإجمالية المؤكدة هي 18 ضيفاً." },
    events: { title: "مساحة لأمسية جميلة", intro: "حديقة ومساحة مغطاة ومائدة جورجية — مكان يجتمع فيه المقربون ويصبح اليوم ذكرى. نرحب بالضيوف الذين يرغبون في قضاء الليل في أكواخنا وغرفنا." },
    pool: { title: "يوم صيفي بجانب المسبح", intro: "مسبح مكشوف في حديقة خضراء. انضموا إلينا نهاراً أو ابقوا طوال الليل — فالوقت بجانب المسبح يصبح أجمل رفقة العائلة والأصدقاء." },
    restaurant: { title: "مائدة إيميريتي في حديقتنا", intro: "أطباق جورجية محضرة عائلياً، متشادي على الكيتسي، فاصوليا في الفخار، خاتشابوري، ومائدة كبيرة تجمع الناس معاً." },
    location: { title: "في قلب إيميريتي، على طريق مغارة بروميثيوس", intro: "تقع كفيليشوري بالقرب من تسكالتوبو. من هنا يبدأ الطريق نحو مغارة بروميثيوس، ساتابليا، مارتفيلي وخفاملي — وفي المساء تنتظركم الحديقة الخضراء والمائدة." },
    about: { title: "مكان أُسس بحب", body1: "تكبيلي سوبِلي مكان عائلي ونظيف وهادئ في كفيليشوري. تجتمع هنا الحديقة الخضراء والأكواخ والمسبح والمائدة الجورجية المحضرة عائلياً.", body2: "يأتي الضيوف لقضاء يوم ممتع، أو الاسترخاء مع الأصدقاء، أو الاحتفال بعيد ميلاد، أو الإقامة بعد زيارة مغارة بروميثيوس. رغبتنا أن يحمل كل ضيف معه ذكرى جميلة." },
    booking: { intro: "راسلونا بخصوص اليوم، أو الكوخ، أو المائدة، أو المسبح، أو الفعالية التي تفضلونها. سنؤكد لكم الشواغر والأسعار بدقة وسرعة." },
  },
  fr: {
    meta: { description: "Chalets, piscine, table géorgienne préparée en famille et bel espace pour les soirées à Kvilishori, sur la route de la grotte de Prométhée." },
    brand: { tagline: "Iméréthie centrale · Kvilishori · Tskaltubo" },
    nav: { stay: "Chalets & chambres" },
    hero: { title: "Un lieu verdoyant, paisible et familial au cœur de l'Iméréthie", subtitle: "Chalets, piscine et table géorgienne préparée en famille — une journée entre amis, une soirée entre proches et une pause sur la route de la grotte de Prométhée." },
    highlights: { title: "Dans notre doux village", items: [
      { title: "Sur la route de la grotte de Prométhée", body: "Près de Tskaltubo, pour un voyage qui commence par la grotte et se poursuit par une soirée paisible." },
      { title: "Du jardin à la table", body: "Des légumes cultivés dans notre propre jardin et des plats géorgiens préparés en famille." },
      { title: "La table iméréthienne", body: "Mchadi cuit sur le ketsi, lobio en pot, khachapuri et des plats qui donnent envie de prolonger le repas." },
      { title: "Pour de belles soirées", body: "Un jardin, un espace couvert, une grande tablée et un endroit pour se réunir en cercle intime." },
    ] },
    services: { title: "Ce qui vous attend chez nous", subtitle: "Détente, bonne table et une journée qui reste dans les mémoires", events: { body: "Anniversaire, cérémonie civile, mariage ou simple belle soirée — avec table gourmande, jardin et espace couvert." }, pool: { body: "Une journée d'été au bord de la piscine, dans la verdure et le calme — en famille, entre amis ou rien que pour vous." }, restaurant: { body: "Plats géorgiens faits maison, table iméréthienne, ketsi et pot de terre." }, stay: { title: "Chalets & chambres", body: "Cinq unités d'hébergement dans une cour verdoyante — pour les couples, les familles et les groupes d'amis." } },
    stay: { eyebrow: "Chalets & chambres", title: "Choisissez votre chalet ou votre chambre", intro: "Cinq hébergements dans une cour verdoyante. Couples, familles et amis en voyage autour de Tskaltubo et de l'Iméréthie y trouvent refuge. La capacité totale confirmée est de 18 personnes." },
    events: { title: "Un espace conçu pour de belles soirées", intro: "Un jardin, un espace couvert et une table géorgienne — un lieu où les proches se rassemblent et où la journée devient un beau souvenir. Nous accueillons les clients souhaitant passer la nuit dans nos chalets et chambres." },
    pool: { title: "Une journée d'été au bord de la piscine", intro: "Piscine extérieure dans une cour verdoyante. Venez pour la journée ou restez pour la nuit — le temps au bord de l'eau passe encore mieux en famille et entre amis." },
    restaurant: { title: "La table iméréthienne dans notre cour", intro: "Plats géorgiens préparés en famille, mchadi sur ketsi, lobio en pot, khachapuri et une grande tablée faite pour être ensemble." },
    location: { title: "Au cœur de l'Iméréthie, sur la route de la grotte de Prométhée", intro: "Kvilishori est proche de Tskaltubo. De là, la route mène vers la grotte de Prométhée, Sataplia, Martvili et Khvamli — et le soir, une cour verdoyante et une bonne table vous attendent à nouveau." },
    about: { title: "Un lieu façonné avec amour", body1: "Notre village est un lieu familial, propre et paisible à Kvilishori. C'est la rencontre d'une cour verdoyante, de chalets, d'une piscine et d'une table géorgienne préparée en famille.", body2: "On vient ici pour passer une journée, se détendre entre amis, fêter un anniversaire ou séjourner après la visite de la grotte de Prométhée. Notre souhait est que chaque invité reparte avec un beau souvenir." },
    booking: { intro: "Écrivez-nous concernant la date, le chalet, la table, la piscine ou l'événement de votre choix. Nous vous confirmerons rapidement la disponibilité et le tarif exact." },
  },
  es: {
    meta: { description: "Cabañas, piscina, una mesa georgiana preparada en familia y un hermoso espacio para la tarde en Kvilishori, en el camino hacia la Cueva de Prometeo." },
    brand: { tagline: "Corazón de Imereti · Kvilishori · Tskaltubo" },
    nav: { stay: "Cabañas y habitaciones" },
    hero: { title: "Un lugar verde, tranquilo y familiar en el corazón de Imereti", subtitle: "Cabañas, piscina y una mesa georgiana preparada en familia: un día con amigos, una tarde con seres queridos y descanso en el camino a la Cueva de Prometeo." },
    highlights: { title: "En nuestro dulce pueblo", items: [
      { title: "En el camino a la Cueva de Prometeo", body: "Cerca de Tskaltubo, para ese viaje que comienza con una cueva y continúa con una tarde tranquila." },
      { title: "De la huerta a la mesa", body: "Verduras cultivadas en nuestro propio jardín y platos georgianos preparados en familia." },
      { title: "Mesa de Imereti", body: "Mchadi en ketsi, lobio en olla, khachapuri y platos que invitan a disfrutar la sobremesa." },
      { title: "Para una hermosa tarde", body: "Un jardín, un espacio cubierto, una mesa y un lugar para reuniones íntimas." },
    ] },
    services: { title: "Qué te espera con nosotros", subtitle: "Descanso, comida y un día que queda en el recuerdo", events: { body: "Cumpleaños, ceremonia civil, boda o simplemente una hermosa tarde — con comida, jardín y espacio cubierto." }, pool: { body: "Un día de verano junto a la piscina, entre verdor y en un entorno tranquilo — con la familia, amigos o simplemente para ti." }, restaurant: { body: "Platos georgianos preparados en familia, mesa de Imereti, ketsi y olla de arcilla." }, stay: { title: "Cabañas y habitaciones", body: "Cinco unidades de alojamiento en un patio verde — para parejas, familias y grupos de amigos." } },
    stay: { eyebrow: "Cabañas y habitaciones", title: "Elige tu cabaña o habitación", intro: "Cinco alojamientos en un patio verde. Aquí se hospedan parejas, familias y amigos que viajan por Tskaltubo e Imereti. La capacidad total confirmada es de 18 huéspedes." },
    events: { title: "Un espacio creado para una hermosa tarde", intro: "Un jardín, un espacio cubierto y una mesa georgiana — un lugar donde se reúne el círculo íntimo y el día se convierte en un recuerdo. A los huéspedes que deseen pasar la noche, los alojamos en cabañas y habitaciones." },
    pool: { title: "Un día de verano junto a la piscina", intro: "Piscina al aire libre en un patio verde. Ven a pasar el día o quédate por la noche — el tiempo junto a la piscina pasa mejor con la familia y los amigos." },
    restaurant: { title: "Mesa de Imereti en nuestro patio", intro: "Platos georgianos preparados en familia, mchadi en ketsi, lobio en olla, khachapuri y una gran mesa hecha para estar juntos." },
    location: { title: "En el corazón de Imereti, en el camino a la Cueva de Prometeo", intro: "Kvilishori está cerca de Tskaltubo. Desde aquí, el camino lleva hacia la Cueva de Prometeo, Sataplia, Martvili y Khvamli, y por la tarde te esperan de nuevo el patio verde y la mesa." },
    about: { title: "Un lugar creado con amor", body1: "Nuestro pueblo es un lugar familiar, limpio y tranquilo en Kvilishori. Aquí se encuentran un patio verde, cabañas, piscina y una mesa georgiana preparada en familia.", body2: "Aquí vienen a pasar el día, a descansar con amigos, a celebrar un cumpleaños o a quedarse después de la Cueva de Prometeo. Nuestro deseo es que cada huésped se lleve un buen recuerdo de aquí." },
    booking: { intro: "Escríbenos sobre el día, la cabaña, la mesa, la piscina o el evento que desees. Te confirmaremos rápidamente la disponibilidad y el precio exacto." },
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function merge<T extends Record<string, unknown>>(base: T, patch: LocalePatch): T {
  const next: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    next[key] = isRecord(value) && isRecord(next[key]) ? merge(next[key], value) : value;
  }
  return next as T;
}

export function applyAuthenticCopy<T extends Record<string, unknown>>(locale: T, code: LocaleCode): T {
  return merge(locale, AUTHENTIC_COPY[code]);
}
