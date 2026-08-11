/**
 * Arabic / French / Spanish translations for the menu.
 * Generated from parallel professional-translation passes over the printed
 * menu; ka/en/ru live in menuData.ts because they are printed on the menu
 * itself. Do not hand-edit: regenerate instead.
 */

export interface LocalizedText {
  name: string;
  desc: string;
}

export type ExtraLang = "ar" | "fr" | "es";

export const CATEGORY_TRANSLATIONS: Record<string, Record<ExtraLang, string>> = {
  cold: {
    ar: "الأطباق الباردة والمقبلات",
    fr: "Plats froids et entrées",
    es: "Platos fríos y entrantes",
  },
  salads: {
    ar: "سلطات",
    fr: "Salades",
    es: "Ensaladas",
  },
  baked: {
    ar: "المخبوزات والبيتزا",
    fr: "Produits de boulangerie et pizzas",
    es: "Productos horneados y pizzas",
  },
  soups: {
    ar: "الشوربات",
    fr: "Soupes",
    es: "Sopas",
  },
  gourmet: {
    ar: "للذواقة والأطباق الجانبية",
    fr: "Pour les gourmets et accompagnements",
    es: "Para gourmets y guarniciones",
  },
  hot: {
    ar: "الأطباق الساخنة",
    fr: "Plats chauds",
    es: "Platos calientes",
  },
  bbq: {
    ar: "مشاوي",
    fr: "Barbecue",
    es: "Barbacoa",
  },
  soft: {
    ar: "مشروبات غازية",
    fr: "Boissons gazeuses",
    es: "Bebidas gaseosas",
  },
  hotdrinks: {
    ar: "مشروبات ساخنة",
    fr: "Boissons chaudes",
    es: "Bebidas calientes",
  },
};

export const ITEM_TRANSLATIONS: Record<number, Record<ExtraLang, LocalizedText>> = {
  1: {
    ar: { name: "تشكيلة مخللات", desc: "أنواع متعددة من المخللات، منقوعة في تتبيلة أو مملحة جافة." },
    fr: { name: "Assortiment de pickles", desc: "Différentes variétés de légumes marinés et salés à sec." },
    es: { name: "Surtido de encurtidos", desc: "Diversas variedades de encurtidos, marinados y salados en seco." },
  },
  2: {
    ar: { name: "تشكيلة بخالي", desc: "طبق من المطبخ الوطني الجورجي — خضروات مسلوقة مع الجوز والبهارات." },
    fr: { name: "Assortiment de pkhali", desc: "Plat de la cuisine nationale géorgienne — légumes bouillis aux noix et aux épices." },
    es: { name: "Surtido de pkhali", desc: "Plato de la cocina nacional georgiana — verduras hervidas con nueces y especias." },
  },
  3: {
    ar: { name: "تشكيلة أعشاب طازجة", desc: "عنصر أساسي في المائدة الجورجية — زينة طازجة ولذيذة." },
    fr: { name: "Assortiment d'herbes fraîches", desc: "Élément principal de la table géorgienne — garniture fraîche et savoureuse." },
    es: { name: "Surtido de hierbas frescas", desc: "Elemento principal de la mesa georgiana — guarnición fresca y sabrosa." },
  },
  4: {
    ar: { name: "تشكيلة أجبان", desc: "أنواع مختلفة من الجبن المسلوق والمتبل." },
    fr: { name: "Assortiment de fromages", desc: "Différentes variétés de fromages bouillis et marinés." },
    es: { name: "Surtido de quesos", desc: "Diversas variedades de quesos hervidos y marinados." },
  },
  5: {
    ar: { name: "بادريجاني نيغفزيت", desc: "أحد أشهر الأطباق في جورجيا — باذنجان محشو بالجوز." },
    fr: { name: "Badridjani nigvzit", desc: "L'un des plats les plus populaires de Géorgie — aubergines farcies aux noix." },
    es: { name: "Badrijani nigvzit", desc: "Uno de los platos más populares de Georgia — berenjenas rellenas de nueces." },
  },
  6: {
    ar: { name: "سولغوني", desc: "طعام شهي من الأجبان الجورجية." },
    fr: { name: "Soulgouni", desc: "Un délice parmi les fromages géorgiens." },
    es: { name: "Sulguni", desc: "Una delicia entre los quesos georgianos." },
  },
  7: {
    ar: { name: "إيميرولي كفيلي", desc: "الجبن الإيميرولي التقليدي — المكون الرئيسي للخاتشابوري." },
    fr: { name: "Imérouli kveli", desc: "Fromage traditionnel d'Iméréthie — l'ingrédient principal du khatchapouri." },
    es: { name: "Imeruli kveli", desc: "Queso tradicional de Imericia — el ingrediente principal del jachapuri." },
  },
  8: {
    ar: { name: "سلطة خضراء", desc: "أوراق سلطة مع تتبيلة خفيفة." },
    fr: { name: "Salade verte", desc: "Feuilles de salade avec un assaisonnement léger." },
    es: { name: "Ensalada verde", desc: "Hojas de ensalada con un aderezo ligero." },
  },
  9: {
    ar: { name: "سلطة الطماطم والخيار", desc: "طماطم وخيار موسمي مع أعشاب." },
    fr: { name: "Salade de tomates et concombres", desc: "Tomates et concombres de saison aux herbes." },
    es: { name: "Ensalada de tomate y pepino", desc: "Tomates y pepinos de temporada con hierbas." },
  },
  10: {
    ar: { name: "سلطة الطماطم والخيار بالجوز", desc: "نسخة جورجية شهيرة جداً مع تتبيلة الجوز." },
    fr: { name: "Salade de tomates et concombres aux noix", desc: "Une variante géorgienne très populaire avec un assaisonnement aux noix." },
    es: { name: "Ensalada de tomate y pepino con nueces", desc: "Una variante georgiana muy popular con aderezo de nueces." },
  },
  11: {
    ar: { name: "سلطة يونانية", desc: "خفة وانتعاش — طماطم، خيار، زيتون والكثير من الجبن." },
    fr: { name: "Salade grecque", desc: "Légèreté et fraîcheur — tomates, concombres, olives et beaucoup de fromage." },
    es: { name: "Ensalada griega", desc: "Ligereza y frescura — tomates, pepinos, aceitunas y mucho queso." },
  },
  12: {
    ar: { name: "سلطة سيزر", desc: "سيزر كلاسيكي مع الدجاج." },
    fr: { name: "Salade César", desc: "César classique au poulet." },
    es: { name: "Ensalada César", desc: "César clásica con pollo." },
  },
  13: {
    ar: { name: "سلطة أتستسيلي", desc: "سلطة تقليدية تعتمد على الماتسوني والأعشاب." },
    fr: { name: "Salade Atsetsili", desc: "Salade traditionnelle à base de matsoni et d'herbes." },
    es: { name: "Ensalada Atsetsili", desc: "Ensalada tradicional a base de matsoni y hierbas." },
  },
  14: {
    ar: { name: "سلطة الشيف", desc: "سلطة الشيف المميزة — لحم وخضروات." },
    fr: { name: "Salade du Chef", desc: "La salade signature du chef — viande et légumes." },
    es: { name: "Ensalada del Chef", desc: "La ensalada de autor del chef — carne y verduras." },
  },
  15: {
    ar: { name: "سلطة الدجاج المكسيكية", desc: "تتبيلة حارة، دجاج وذرة." },
    fr: { name: "Salade de poulet mexicaine", desc: "Assaisonnement épicé, poulet et maïs." },
    es: { name: "Ensalada de pollo mexicana", desc: "Aderezo picante, pollo y maíz." },
  },
  16: {
    ar: { name: "سلطة الفطر", desc: "فطر، فلفل حلو، بصل، ثوم وأعشاب." },
    fr: { name: "Salade de champignons", desc: "Champignons, poivrons, oignons, ail et herbes." },
    es: { name: "Ensalada de champiñones", desc: "Champiñones, pimientos, cebolla, ajo y hierbas." },
  },
  17: {
    ar: { name: "خاتشابوري إيميرولي", desc: "معجنات مسطحة محشوة بالجبن." },
    fr: { name: "Khatchapouri imérouli", desc: "Pâte plate farcie au fromage." },
    es: { name: "Jachapuri imeruli", desc: "Masa plana rellena de queso." },
  },
  18: {
    ar: { name: "خاتشابوري ميغرولي", desc: "جبن في الداخل وعلى الوجه، مع المذاق الخاص للجبن الإيميرولي." },
    fr: { name: "Khatchapouri mégrouli", desc: "Fromage à l'intérieur et sur le dessus, avec le goût particulier du fromage imérouli." },
    es: { name: "Jachapuri megruli", desc: "Queso por dentro y por encima, con el sabor especial del queso imeruli." },
  },
  19: {
    ar: { name: "خاتشابوري أجارولي", desc: "على شكل قارب، مع البيض والزبدة، مثالي للإفطار." },
    fr: { name: "Khatchapouri adjarouli", desc: "En forme de bateau, avec un œuf et du beurre, parfait pour le petit-déjeuner." },
    es: { name: "Jachapuri acharuli", desc: "En forma de barco, con huevo y mantequilla, perfecto para el desayuno." },
  },
  20: {
    ar: { name: "لوبياني", desc: "معجنات مخبوزة محشوة بالفاصوليا والتوابل." },
    fr: { name: "Lobiani", desc: "Pâte cuite au four farcie aux haricots et aux épices." },
    es: { name: "Lobiani", desc: "Masa horneada rellena de frijoles y especias." },
  },
  21: {
    ar: { name: "تشفيشتاري (قطعتان)", desc: "خبز مسطح من دقيق الذرة مع الجبن." },
    fr: { name: "Tchvichtari (2 pcs)", desc: "Galette de farine de maïs au fromage." },
    es: { name: "Chvishtari (2 uds.)", desc: "Pan plano de harina de maíz con queso." },
  },
  22: {
    ar: { name: "متشادي (خبز الذرة)", desc: "خبز الذرة، طبق جانبي إيميرولي تقليدي." },
    fr: { name: "Mtchadi (Pain de maïs)", desc: "Pain de maïs, un accompagnement traditionnel imérouli." },
    es: { name: "Mchadi (Pan de maíz)", desc: "Pan de maíz, un acompañamiento tradicional imeruli." },
  },
  23: {
    ar: { name: "بيتزا بيبروني", desc: "سلامي حار، ريحان، جبن وتوابل جورجية." },
    fr: { name: "Pizza Pepperoni", desc: "Salami piquant, basilic, fromage et épices géorgiennes." },
    es: { name: "Pizza Pepperoni", desc: "Salami picante, albahaca, queso y especias georgianas." },
  },
  24: {
    ar: { name: "بيتزا مارغريتا", desc: "وصفة إيطالية كلاسيكية." },
    fr: { name: "Pizza Margherita", desc: "Recette italienne classique." },
    es: { name: "Pizza Margarita", desc: "Receta clásica italiana." },
  },
  25: {
    ar: { name: "شوربة الفطر", desc: "نكهة الفطر التي لا تُنسى." },
    fr: { name: "Soupe aux champignons", desc: "La saveur inoubliable des champignons." },
    es: { name: "Sopa de champiñones", desc: "El sabor inolvidable de los champiñones." },
  },
  26: {
    ar: { name: "تشاخوخبيلي", desc: "طبق جورجي شهير — دجاج مع البصل والطماطم والفلفل الحلو." },
    fr: { name: "Tchakhokhbili", desc: "Célèbre plat géorgien — poulet aux oignons, tomates et poivrons doux." },
    es: { name: "Chajojbili", desc: "Famoso plato georgiano — pollo con cebolla, tomate y pimiento dulce." },
  },
  27: {
    ar: { name: "مرق الدجاج", desc: "مرق خفيف ومقوي مع لحم الدجاج." },
    fr: { name: "Bouillon de poulet", desc: "Bouillon léger et revigorant à la viande de poulet." },
    es: { name: "Caldo de pollo", desc: "Caldo ligero y reconfortante con carne de pollo." },
  },
  28: {
    ar: { name: "خارتشو", desc: "بطاقة تعريف المطبخ الجورجي — طعم استثنائي لا يُنسى." },
    fr: { name: "Khartcho", desc: "La carte de visite de la cuisine géorgienne — un goût exceptionnel et inoubliable." },
    es: { name: "Jarcho", desc: "La tarjeta de visita de la cocina georgiana — un sabor excepcional e inolvidable." },
  },
  29: {
    ar: { name: "خاشلاما", desc: "لحم بقر مسلوق مع الأعشاب الموسمية والتوابل العطرية." },
    fr: { name: "Khachlama", desc: "Viande de bœuf bouillie aux herbes de saison et épices aromatiques." },
    es: { name: "Jashlama", desc: "Carne de res hervida con hierbas de temporada y especias aromáticas." },
  },
  30: {
    ar: { name: "شوربة كريمة الفطر", desc: "شوربة فريدة مع الجوز ومرق الفطر والتوابل." },
    fr: { name: "Velouté aux champignons", desc: "Soupe unique aux noix, bouillon de champignons et épices." },
    es: { name: "Crema de champiñones", desc: "Sopa única con nueces, caldo de champiñones y especias." },
  },
  31: {
    ar: { name: "سوكو كيتسزي", desc: "رؤوس فطر الشامبنيون المحضرة في وعاء فخاري." },
    fr: { name: "Soko ketszé", desc: "Têtes de champignons de Paris préparées dans un plat en terre cuite." },
    es: { name: "Soko ketsze", desc: "Cabezas de champiñones preparadas en una cazuela de barro." },
  },
  32: {
    ar: { name: "سوكو كيتسزي سولغونيت", desc: "فطر محضر في وعاء فخاري مع جبن السولغوني المذاب." },
    fr: { name: "Soko ketszé soulgounit", desc: "Champignons préparés dans un plat en terre cuite avec du fromage soulgouni fondu." },
    es: { name: "Soko ketsze sulgunit", desc: "Champiñones preparados en una cazuela de barro con queso sulguni derretido." },
  },
  33: {
    ar: { name: "بطاطس مقلية", desc: "طبق أصلي وفريد — مفضل لدى الأطفال والكبار." },
    fr: { name: "Frites", desc: "Un plat original et unique — le favori des enfants et des adultes." },
    es: { name: "Patatas fritas", desc: "Un plato original y único — el favorito de niños y adultos." },
  },
  34: {
    ar: { name: "بطاطس محمرة", desc: "تقدم كطبق مستقل أو كطبق جانبي." },
    fr: { name: "Pommes de terre sautées", desc: "Se déguste aussi bien seul qu'en accompagnement." },
    es: { name: "Patatas salteadas", desc: "Se disfruta tanto como plato independiente o como guarnición." },
  },
  35: {
    ar: { name: "بطاطس ودجز مكسيكية", desc: "بطاطس حارة متبلة بالبهارات المكسيكية." },
    fr: { name: "Potatoes mexicaines", desc: "Pommes de terre épicées aux épices mexicaines." },
    es: { name: "Patatas gajo mexicanas", desc: "Patatas picantes con especias mexicanas." },
  },
  36: {
    ar: { name: "بطاطس مهروسة", desc: "طبق جانبي ممتاز مع أي وجبة." },
    fr: { name: "Purée de pommes de terre", desc: "Un excellent accompagnement pour tout repas." },
    es: { name: "Puré de patatas", desc: "Una excelente guarnición para cualquier comida." },
  },
  37: {
    ar: { name: "لوبيو كوتانشي", desc: "طبق جورجي تقليدي — فاصوليا مطبوخة في وعاء فخاري." },
    fr: { name: "Lobio kotanchi", desc: "Plat traditionnel géorgien — haricots préparés dans un pot en terre cuite." },
    es: { name: "Lobio kotanshi", desc: "Plato tradicional georgiano — alubias preparadas en una olla de barro." },
  },
  38: {
    ar: { name: "تكيمالي (أحمر أو أخضر)", desc: "صلصة الخوخ الحامضة التقليدية." },
    fr: { name: "Tkémali (rouge ou vert)", desc: "Sauce traditionnelle acidulée à base de prunes." },
    es: { name: "Tkemali (rojo o verde)", desc: "Salsa tradicional ácida a base de ciruelas." },
  },
  39: {
    ar: { name: "ساتسيبيلي", desc: "صلصة تقليدية حارة وحلوة تعتمد على الطماطم والبهارات." },
    fr: { name: "Satsébéli", desc: "Sauce traditionnelle douce et épicée à base de tomates et d'épices." },
    es: { name: "Satsebeli", desc: "Salsa tradicional dulce y picante a base de tomates y especias." },
  },
  40: {
    ar: { name: "أوستري", desc: "يخنة لحم بقر حارة بصلصة الطماطم، مطبوخة في وعاء فخاري (كيتسي)." },
    fr: { name: "Ostri", desc: "Ragoût de bœuf épicé à la sauce tomate, cuit dans un poêlon en terre cuite (ketsi)." },
    es: { name: "Ostri", desc: "Estofado de ternera picante en salsa de tomate, cocinado en cazuela de barro (ketsi)." },
  },
  41: {
    ar: { name: "تشاكابولي", desc: "لحم عجل مع الخوخ الأخضر (تكمالي)، الطرخون، والنبيذ." },
    fr: { name: "Tchakapouli", desc: "Viande de veau aux prunes vertes (tkemali), à l'estragon et au vin." },
    es: { name: "Chakapuli", desc: "Carne de ternera con ciruelas verdes (tkemali), estragón y vino." },
  },
  42: {
    ar: { name: "أوجاخوري بلحم الخنزير", desc: "طبق شهير جداً — لحم خنزير وبطاطس مطبوخة في وعاء فخاري (كيتسي)." },
    fr: { name: "Odjakhouri au porc", desc: "Plat très populaire — viande de porc et pommes de terre cuites dans un poêlon en terre cuite (ketsi)." },
    es: { name: "Ojakhuri con cerdo", desc: "Plato muy popular — carne de cerdo y patatas cocinadas en cazuela de barro (ketsi)." },
  },
  43: {
    ar: { name: "أوجاخوري بلحم البقر", desc: "لحم بقر مع البطاطس، الطماطم، البصل، والتوابل الجورجية." },
    fr: { name: "Odjakhouri au bœuf", desc: "Viande de bœuf avec pommes de terre, tomates, oignons et épices géorgiennes." },
    es: { name: "Ojakhuri con ternera", desc: "Carne de ternera con patatas, tomates, cebollas y especias georgianas." },
  },
  44: {
    ar: { name: "شكميرولي", desc: "طبق من قرية شكميري في راتشا — دجاج في صلصة الكريمة والثوم." },
    fr: { name: "Chkmerouli", desc: "Plat originaire du village de Chkmeri en Ratcha — poulet à la crème et à la sauce à l'ail." },
    es: { name: "Shkmeruli", desc: "Plato originario del pueblo de Shkmeri en Racha — pollo en salsa de crema y ajo." },
  },
  45: {
    ar: { name: "دجاج تاباكا", desc: "دجاج مقلي ومقرمش — لكل محبي الدجاج المقلي." },
    fr: { name: "Poulet Tabaka", desc: "Poulet frit et croustillant — pour tous les amateurs de friture." },
    es: { name: "Pollo Tabaka", desc: "Pollo frito y crujiente — para todos los amantes de las frituras." },
  },
  46: {
    ar: { name: "تراوت مشوي", desc: "سمك تراوت طري من نهر ريوني، مطبوخ على الشواية." },
    fr: { name: "Truite grillée", desc: "Truite tendre de la rivière Rioni, cuite au gril." },
    es: { name: "Trucha a la parrilla", desc: "Tierna trucha del río Rioni, cocinada a la parrilla." },
  },
  47: {
    ar: { name: "أجابصندلي", desc: "طبق خضروات جورجي تقليدي." },
    fr: { name: "Adjapsandali", desc: "Plat traditionnel géorgien aux légumes." },
    es: { name: "Ajapsandali", desc: "Plato tradicional georgiano de verduras." },
  },
  48: {
    ar: { name: "لحم عجل على طريقة الشيف", desc: "لحم عجل مطبوخ بطريقة خاصة ومميزة." },
    fr: { name: "Veau, recette du chef", desc: "Viande de veau préparée selon une méthode spéciale et exclusive." },
    es: { name: "Ternera, receta del chef", desc: "Carne de ternera preparada con un método especial y exclusivo." },
  },
  49: {
    ar: { name: "مدام بوفاري", desc: "طبق كلاسيكي يعتمد على اللحم والجبن." },
    fr: { name: "Madame Bovary", desc: "Plat classique à base de viande et de fromage." },
    es: { name: "Madame Bovary", desc: "Plato clásico a base de carne y queso." },
  },
  50: {
    ar: { name: "أضلاع عجل بصلصة الأجيكا", desc: "أضلاع حارة ولاذعة بصلصة الأجيكا." },
    fr: { name: "Côtes de veau à l'adjika", desc: "Côtes épicées et piquantes à la sauce adjika." },
    es: { name: "Costillas de ternera en salsa ajika", desc: "Costillas picantes y sabrosas en salsa ajika." },
  },
  51: {
    ar: { name: "أضلاع عجل في كيندزماري", desc: "أضلاع مميزة بصلصة جورجية أصلية." },
    fr: { name: "Côtes de veau au kindzmari", desc: "Côtes de la maison dans une sauce géorgienne originale." },
    es: { name: "Costillas de ternera en kindzmari", desc: "Costillas de la casa en una original salsa georgiana." },
  },
  52: {
    ar: { name: "كوتشماتشي", desc: "طبق لحم جورجي تقليدي مع توابل قوقازية." },
    fr: { name: "Koutchmatchi", desc: "Plat de viande traditionnel géorgien aux épices caucasiennes." },
    es: { name: "Kuchmachi", desc: "Plato de carne tradicional georgiano con especias caucásicas." },
  },
  53: {
    ar: { name: "أوجاخوري بالفطر", desc: "فطر، بطاطس، فلفل حلو، وبصل." },
    fr: { name: "Odjakhouri aux champignons", desc: "Champignons, pommes de terre, poivrons et oignons." },
    es: { name: "Ojakhuri con champiñones", desc: "Champiñones, patatas, pimientos y cebollas." },
  },
  54: {
    ar: { name: "أوجاخوري بالدجاج", desc: "لحم دجاج، بطاطس، وفلفل حلو." },
    fr: { name: "Odjakhouri au poulet", desc: "Viande de poulet, pommes de terre et poivrons." },
    es: { name: "Ojakhuri con pollo", desc: "Carne de pollo, patatas y pimientos." },
  },
  55: {
    ar: { name: "لسان بقر", desc: "طعام شهي وطري جداً، مطبوخ بصلصة خاصة." },
    fr: { name: "Langue de bœuf", desc: "Un mets très tendre, cuit dans une sauce spéciale." },
    es: { name: "Lengua de ternera", desc: "Un manjar muy tierno, cocinado en una salsa especial." },
  },
  56: {
    ar: { name: "خينكالي — كلاسيكي، بالجبن، أو بالفطر (قطعة واحدة)", desc: "أشهر طبق جورجي — يقدم بالقطعة." },
    fr: { name: "Khinkali — classique, au fromage ou aux champignons (1 pièce)", desc: "Le plat géorgien le plus célèbre — servi à l'unité." },
    es: { name: "Jinkali — clásico, con queso o champiñones (1 ud.)", desc: "El plato georgiano más famoso — servido por unidad." },
  },
  57: {
    ar: { name: "متسفادي لحم الخنزير", desc: "أفضل مشاوي في جورجيا تُحضر على أغصان الكرمة." },
    fr: { name: "Mtsvadi de porc", desc: "Le meilleur barbecue de Géorgie est préparé sur des sarments de vigne." },
    es: { name: "Mtsvadi de cerdo", desc: "La mejor barbacoa de Georgia se prepara sobre sarmientos de vid." },
  },
  58: {
    ar: { name: "متسفادي العجل", desc: "قطع طرية من لحم العجل مشوية على الفحم." },
    fr: { name: "Mtsvadi de veau", desc: "Morceaux tendres de viande de veau grillés sur les braises." },
    es: { name: "Mtsvadi de ternera", desc: "Tiernos trozos de carne de ternera asados a las brasas." },
  },
  59: {
    ar: { name: "متسفادي الدجاج", desc: "مشاوي دجاج طرية متبلة." },
    fr: { name: "Mtsvadi de poulet", desc: "Barbecue de poulet tendre mariné." },
    es: { name: "Mtsvadi de pollo", desc: "Barbacoa de pollo tierno marinado." },
  },
  60: {
    ar: { name: "كوباتي", desc: "نقانق جورجية تقليدية مع التوابل." },
    fr: { name: "Koupati", desc: "Saucisse traditionnelle géorgienne aux épices." },
    es: { name: "Kupati", desc: "Salchicha tradicional georgiana con especias." },
  },
  61: {
    ar: { name: "ليموناضة ناتاختاري", desc: "ليموناضة جورجية مصنوعة من مكونات طبيعية." },
    fr: { name: "Limonade Natakhtari", desc: "Limonade géorgienne à base d'ingrédients naturels." },
    es: { name: "Limonada Natakhtari", desc: "Limonada georgiana elaborada con ingredientes naturales." },
  },
  62: {
    ar: { name: "مياه بورجومي المعدنية", desc: "مياه معدنية غازية — بطاقة تعريف جورجيا." },
    fr: { name: "Eau minérale Borjomi", desc: "Eau minérale gazeuse — la carte de visite de la Géorgie." },
    es: { name: "Agua mineral Borjomi", desc: "Agua mineral con gas — la tarjeta de visita de Georgia." },
  },
  63: {
    ar: { name: "مياه نابيغلافي المعدنية", desc: "مياه معدنية غازية من ينابيع غوريا." },
    fr: { name: "Eau minérale Nabeghlavi", desc: "Eau minérale gazeuse des sources de Gourie." },
    es: { name: "Agua mineral Nabeghlavi", desc: "Agua mineral con gas de los manantiales de Guria." },
  },
  64: {
    ar: { name: "مياه متسي", desc: "مياه شرب نقية." },
    fr: { name: "Eau Mtsi", desc: "Eau potable pure." },
    es: { name: "Agua Mtsi", desc: "Agua potable pura." },
  },
  65: {
    ar: { name: "مياه متسي (1 لتر)", desc: "مياه شرب نقية، زجاجة كبيرة." },
    fr: { name: "Eau Mtsi (1 L)", desc: "Eau potable pure, grande bouteille." },
    es: { name: "Agua Mtsi (1 L)", desc: "Agua potable pura, botella grande." },
  },
  66: {
    ar: { name: "شاي في إبريق", desc: "شاي جورجي — نكهة حقيقية ودفء." },
    fr: { name: "Thé en théière", desc: "Thé géorgien — arôme authentique et chaleur." },
    es: { name: "Té en tetera", desc: "Té georgiano — verdadero aroma y calidez." },
  },
  67: {
    ar: { name: "شاي أكياس", desc: "خيار سريع وبسيط." },
    fr: { name: "Thé en sachet", desc: "Option rapide et simple." },
    es: { name: "Té en bolsita", desc: "Opción rápida y sencilla." },
  },
  68: {
    ar: { name: "قهوة تركية", desc: "قهوة مطبوخة ببطء من حبوب ذهبية." },
    fr: { name: "Café turc", desc: "Café préparé lentement à partir de grains dorés." },
    es: { name: "Café turco", desc: "Café preparado lentamente a partir de granos dorados." },
  },
};
