/**
 * Restaurant menu — transcribed verbatim from the venue's printed menu photos.
 * Prices are in Georgian lari (GEL). Names exist in ka/en/ru on the printed
 * menu; ar/fr/es are translations layered on top (see menuTranslations.ts).
 */

export type MenuLang = "ka" | "en" | "ru" | "ar" | "fr" | "es";

export interface MenuItem {
  id: number;
  /** Name in ka/en/ru as printed. Other languages come from translations. */
  ka: string;
  en: string;
  ru: string;
  price: number;
  /** Optional volume note, e.g. "0.5 L". */
  volume?: string;
  /** Georgian description as printed (only some items have one). */
  descKa?: string;
}

export interface MenuCategory {
  id: string;
  ka: string;
  en: string;
  ru: string;
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    id: "cold",
    ka: "ცივი კერძები",
    en: "Cold Dishes & Appetizers",
    ru: "Закуски и холодные блюда",
    items: [
      { id: 1, ka: "მწნილის ასორტი", en: "Pickled Assortment", ru: "Ассорти солений", price: 8, descKa: "მრავალფეროვანი მწნილები, მარინადში და მშრალ დამარილებაში." },
      { id: 2, ka: "ფხალის ასორტი", en: "Pkhali Assortment", ru: "Ассорти пхали", price: 15, descKa: "ქართული ნაციონალური სამზარეულოს კერძი — მოხარშული ბოსტნეული ნიგვზითა და სანელებლებით." },
      { id: 3, ka: "მწვანილის ასორტი", en: "Assorted Fresh Herbs", ru: "Ассорти из свежей зелени", price: 8, descKa: "ქართული სუფრის მთავარი ელემენტი — სუფთა და გემრიელი გარნირი." },
      { id: 4, ka: "ყველის ასორტი", en: "Cheese Assortment", ru: "Ассорти из разных видов сыра", price: 15, descKa: "მოხარშული და მარინირებული ყველის სხვადასხვა სახეობა." },
      { id: 5, ka: "ბადრიჯანი ნიგვზით", en: "Eggplant with Walnuts", ru: "Баклажаны с орехами", price: 12, descKa: "საქართველოს ერთ-ერთი ყველაზე პოპულარული კერძი — ბადრიჯანი ნიგვზის შიგთავსით." },
      { id: 6, ka: "სულგუნი", en: "Sulguni Cheese", ru: "Сыр сулугуни", price: 13, descKa: "საქართველოს ყველების დელიკატესი." },
      { id: 7, ka: "იმერული ყველი", en: "Imeretian Cheese", ru: "Имеретинский сыр", price: 12, descKa: "ტრადიციული იმერული ყველი — ხაჭაპურის მთავარი ინგრედიენტი." },
    ],
  },
  {
    id: "salads",
    ka: "სალათები",
    en: "Salads",
    ru: "Салаты",
    items: [
      { id: 8, ka: "მწვანე სალათი", en: "Green Salad", ru: "Салат по-домашнему", price: 8, descKa: "სალათის ფოთლები მსუბუქი შესაზავებლით." },
      { id: 9, ka: "კიტრი-პომიდვრის სალათი", en: "Tomato & Cucumber Salad", ru: "Салат из огурцов и помидоров", price: 8, descKa: "სეზონური პომიდორი და კიტრი მწვანილით." },
      { id: 10, ka: "კიტრი-პომიდვრის სალათი ნიგვზით", en: "Tomato & Cucumber Salad with Walnuts", ru: "Салат из помидоров и огурцов с орехами", price: 12, descKa: "ძალიან პოპულარული ქართული ვარიაცია ნიგვზის შესაზავებლით." },
      { id: 11, ka: "ბერძნული სალათი", en: "Greek Salad", ru: "Греческий салат", price: 15, descKa: "სიმსუბუქე და სიახლე — პომიდორი, კიტრი, ზეთისხილი და ბევრი ყველი." },
      { id: 12, ka: "სალათი „ცეზარი“", en: "Caesar Salad", ru: "Салат «Цезарь»", price: 17, descKa: "კლასიკური ცეზარი ქათმით." },
      { id: 13, ka: "სალათი „აცეცილი“", en: "Traditional Salad \"Atsetsili\"", ru: "Салат «Ацецили»", price: 15, descKa: "ტრადიციული სალათი მაწვნისა და მწვანილის საფუძველზე." },
      { id: 14, ka: "შეფის სალათი", en: "Chef's Salad", ru: "Салат «Фирменный»", price: 17, descKa: "შეფის ფირმენული სალათი — ხორცი და ბოსტნეული." },
      { id: 15, ka: "სალათი მექსიკური ქათამით", en: "Mexican Chicken Salad", ru: "Салат «Куриный по-мексикански»", price: 17, descKa: "ცხარე შესაზავებელი, ქათამი და სიმინდი." },
      { id: 16, ka: "სოკოს სალათი", en: "Mushroom Salad", ru: "Грибной салат", price: 15, descKa: "შამპინიონი, ბულგარული წიწაკა, ხახვი, ნიორი და მწვანილი." },
    ],
  },
  {
    id: "baked",
    ka: "ცომეული და პიცა",
    en: "Baked Goods & Pizza",
    ru: "Хачапури и пицца",
    items: [
      { id: 17, ka: "იმერული ხაჭაპური", en: "Imeruli Khachapuri", ru: "Хачапури «Имеретинское»", price: 14, descKa: "ხაჭაპური იმერულად — ბრტყელი, ყველით სავსე ცომეული." },
      { id: 18, ka: "მეგრული ხაჭაპური", en: "Megruli Khachapuri", ru: "Хачапури «Мегрельское»", price: 15, descKa: "ყველი შიგნით და ზემოდანაც — იმერული ყველის განსაკუთრებული გემო." },
      { id: 19, ka: "აჭარული ხაჭაპური", en: "Acharuli Khachapuri", ru: "Хачапури «Аджарское»", price: 15, descKa: "ნავის ფორმის, კვერცხითა და კარაქით — შესანიშნავია საუზმედ." },
      { id: 20, ka: "ლობიანი", en: "Lobiani", ru: "Хачапури «Лобиани»", price: 12, descKa: "ლობიოთი გამომცხვარი ცომეული სანელებლებით." },
      { id: 21, ka: "ჩვიშტარი (2 ცალი)", en: "Chvishtari (2 pcs)", ru: "Чвиштари (2 шт.)", price: 10, descKa: "სიმინდის ფქვილის ლეპიოშკა ყველით." },
      { id: 22, ka: "მჭადი", en: "Mchadi (Corn Bread)", ru: "Мчади", price: 3, descKa: "სიმინდის პური — ტრადიციული იმერული თანმხლები." },
      { id: 23, ka: "პიცა „პეპერონი“", en: "Pizza Pepperoni", ru: "Пицца «Пепперони»", price: 25, descKa: "ცხარე სალიამი, ბაზილიკი, ყველი და ქართული სანელებლები." },
      { id: 24, ka: "პიცა „მარგარიტა“", en: "Pizza Margherita", ru: "Пицца «Маргарита»", price: 23, descKa: "კლასიკური იტალიური რეცეპტი." },
    ],
  },
  {
    id: "soups",
    ka: "წვნიანი",
    en: "Soups",
    ru: "Супы",
    items: [
      { id: 25, ka: "სოკოს წვნიანი", en: "Mushroom Soup", ru: "Грибной суп", price: 12, descKa: "სოკოს დაუვიწყარი არომატი." },
      { id: 26, ka: "ჩახოხბილი", en: "Chakhokhbili", ru: "Чахохбили", price: 15, descKa: "ცნობილი ქართული კერძი — ქათამი ხახვით, პომიდორითა და ტკბილი წიწაკით." },
      { id: 27, ka: "ქათმის ბულიონი", en: "Chicken Broth", ru: "Куриный бульон", price: 12, descKa: "მსუბუქი, გამაძლიერებელი ბულიონი ქათმის ხორცით." },
      { id: 28, ka: "ხარჩო", en: "Kharcho Meat Soup", ru: "Суп харчо", price: 15, descKa: "ქართული სამზარეულოს ვიზიტკა — უჩვეულო და დაუვიწყარი გემო." },
      { id: 29, ka: "ხაშლამა", en: "Khashlama", ru: "Хашлама", price: 15, descKa: "მოხარშული საქონლის ხორცი სეზონური მწვანილითა და არომატული სანელებლებით." },
      { id: 30, ka: "სოკოს კრემ-სუპი", en: "Mushroom Cream Soup", ru: "Грибной крем-суп", price: 15, descKa: "უნიკალური სუპი ნიგვზით, სოკოს ბულიონითა და სანელებლებით." },
    ],
  },
  {
    id: "gourmet",
    ka: "გურმანებისთვის და გარნირი",
    en: "For Gourmets & Sides",
    ru: "Для гурманов и гарниры",
    items: [
      { id: 31, ka: "სოკო კეცზე", en: "Mushrooms Fried in Clay Dish", ru: "Грибы шампиньоны на кеце", price: 10, descKa: "შამპინიონის თავები კეცში მომზადებული." },
      { id: 32, ka: "სოკო კეცზე სულგუნით", en: "Mushrooms in Clay Dish with Cheese", ru: "Грибы шампиньоны с сыром на кеце", price: 13, descKa: "კეცში მომზადებული სოკო დადნობილი სულგუნით." },
      { id: 33, ka: "კარტოფილი ფრი", en: "French Fries", ru: "Картофель фри", price: 8, descKa: "ორიგინალური, უნიკალური კერძი — საყვარელი ბავშვებისა და მოზრდილებისთვის." },
      { id: 34, ka: "შემწვარი კარტოფილი", en: "Fried Potatoes", ru: "Жареный картофель", price: 8, descKa: "მიდის როგორც დამოუკიდებლად, ისე გარნირად." },
      { id: 35, ka: "კარტოფილი მექსიკურად", en: "Mexican Potato Wedges", ru: "Картофель по-мексикански", price: 10, descKa: "ცხარე კარტოფილი მექსიკურ სანელებლებში." },
      { id: 36, ka: "პიურე", en: "Mashed Potatoes", ru: "Пюре", price: 8, descKa: "შესანიშნავი გარნირი ნებისმიერ კერძთან." },
      { id: 37, ka: "ლობიო ქოთანში", en: "Lobio in Clay Pot", ru: "Фасоль в горшке", price: 10, descKa: "ტრადიციული ქართული კერძი — ლობიო თიხის ქოთანში." },
      { id: 38, ka: "ტყემალი (წითელი ან მწვანე)", en: "Tkemali Sauce (Red or Green)", ru: "Ткемали (красный или зелёный)", price: 2, descKa: "ქლიავის ტრადიციული მჟავე სოუსი." },
      { id: 39, ka: "საწებელა", en: "Satsebeli Sauce", ru: "Сацебели", price: 2, descKa: "ტრადიციული მწარე-ტკბილი სოუსი პომიდვრისა და სანელებლების საფუძველზე." },
    ],
  },
  {
    id: "hot",
    ka: "ცხელი კერძები",
    en: "Hot Dishes",
    ru: "Горячие блюда",
    items: [
      { id: 40, ka: "ოსტრი", en: "Ostri (Spicy Beef Stew)", ru: "«Острый»", price: 15, descKa: "ხორცი ტომატში ცხარე სოუსით, კეცში მომზადებული." },
      { id: 41, ka: "ჩაქაფული", en: "Chakapuli (Veal with Green Plums)", ru: "Чакапули из телятины", price: 20, descKa: "ხბოს ხორცი მწვანე ტყემლით, ტარხუნითა და მწვანე ღვინით." },
      { id: 42, ka: "ოჯახური ღორის ხორცით", en: "Ojakhuri with Pork", ru: "Жаркое из свинины по-домашнему", price: 15, descKa: "ძალიან პოპულარული კერძი — კეცში მომზადებული ხორცი და კარტოფილი." },
      { id: 43, ka: "ოჯახური საქონლის ხორცით", en: "Ojakhuri with Beef", ru: "Жаркое из говядины по-домашнему", price: 18, descKa: "ხორცი კარტოფილთან, პომიდორთან, ხახვთან და ქართულ სანელებლებთან ერთად." },
      { id: 44, ka: "შქმერული", en: "Shkmeruli (Chicken in Garlic Cream)", ru: "Цыплёнок «Шкмерули»", price: 35, descKa: "რაჭის სოფელ შქმერიდან წარმოშობილი კერძი — ქათამი ნაღებისა და ნივრის სოუსში." },
      { id: 45, ka: "წიწილა ტაბაკა", en: "Chicken Tabaka", ru: "Цыплёнок «Табака»", price: 35, descKa: "შემწვარი და ხრაშუნა წიწილა — ყველა შემწვარის მოყვარულისთვის." },
      { id: 46, ka: "კალმახი", en: "Grilled Trout", ru: "Форель", price: 25, descKa: "ნაზი კალმახი მდინარე რიონიდან, გრილზე მომზადებული." },
      { id: 47, ka: "აჯაფსანდალი", en: "Adjapsandali", ru: "«Аджапсандали»", price: 15, descKa: "ტრადიციული ქართული ბოსტნეულის კერძი." },
      { id: 48, ka: "ხბოს ხორცი შეფის რეცეპტით", en: "Veal, Chef's Recipe", ru: "Фирменное блюдо из телятины", price: 25, descKa: "ხბოს ხორცი განსაკუთრებული, ფირმენული წესით მომზადებული." },
      { id: 49, ka: "„მადამ ბოვარი“", en: "\"Madame Bovary\"", ru: "«Мадам Бовари»", price: 20, descKa: "კლასიკური კერძი ხორცისა და ყველის საფუძველზე." },
      { id: 50, ka: "ხბოს ნეკნი აჯიკაში", en: "Veal Ribs in Ajika Sauce", ru: "Телячьи ребрышки в соусе из аджики", price: 25, descKa: "ცხარე, პიკანტური ნეკნები აჯიკის სოუსში." },
      { id: 51, ka: "ხბოს ნეკნი კინძმარით", en: "Veal Ribs in Kindzmari", ru: "Телятина в грузинском соусе киндзмари", price: 25, descKa: "ფირმენული ნეკნები ორიგინალურ ქართულ სოუსში." },
      { id: 52, ka: "კუჭმაჭი", en: "Kuchmachi", ru: "«Кучмачи»", price: 20, descKa: "ქართული ტრადიციული ხორცის კერძი კავკასიური სანელებლებით." },
      { id: 53, ka: "ოჯახური სოკოთი", en: "Ojakhuri with Mushrooms", ru: "«Оджахури» с грибами", price: 15, descKa: "სოკო, კარტოფილი, ბულგარული წიწაკა და ხახვი." },
      { id: 54, ka: "ოჯახური ქათმით", en: "Ojakhuri with Chicken", ru: "«Оджахури» с курицей", price: 15, descKa: "ქათმის ხორცი, კარტოფილი და ბულგარული წიწაკა." },
      { id: 55, ka: "ხბოს ენა", en: "Beef Tongue", ru: "Говяжий язык", price: 20, descKa: "ძალიან ნაზი, განსაკუთრებულ სოუსში მოხარშული დელიკატესი." },
      { id: 56, ka: "ხინკალი — კლასიკური, ყველით, სოკოთი (1 ცალი)", en: "Khinkali — classic, cheese or mushroom (1 pc)", ru: "Хинкали — классические, с сыром, с грибами (1 шт.)", price: 2, descKa: "ყველაზე ცნობილი ქართული კერძი — ერთეულობით." },
    ],
  },
  {
    id: "bbq",
    ka: "მწვადები",
    en: "Barbeque",
    ru: "Шашлыки",
    items: [
      { id: 57, ka: "ღორის მწვადი", en: "Pork BBQ", ru: "Шашлык из свинины", price: 15, descKa: "საქართველოში საუკეთესო მწვადი ვენახის ნაფოტებზე მზადდება." },
      { id: 58, ka: "ხბოს მწვადი", en: "Veal BBQ", ru: "Шашлык из говядины", price: 25, descKa: "ხბოს ხორცის ნაზი ნაჭრები ნაკვერცხლებზე." },
      { id: 59, ka: "ქათმის მწვადი", en: "Chicken BBQ", ru: "Шашлык из курицы", price: 15, descKa: "ნაზი ქათმის მწვადი მარინადში." },
      { id: 60, ka: "კუპატი", en: "Kupati (Georgian Sausage)", ru: "Купаты", price: 15, descKa: "ქართული ტრადიციული ძეხვი სანელებლებით." },
    ],
  },
  {
    id: "soft",
    ka: "გაზიანი სასმელები",
    en: "Soft Drinks",
    ru: "Прохладительные напитки",
    items: [
      { id: 61, ka: "ლიმონათი „ნატახტარი“", en: "\"Natakhtari\" Lemonade", ru: "Лимонад «Натахтари»", price: 3, volume: "0.5 L", descKa: "ბუნებრივი ინგრედიენტების საფუძველზე დამზადებული ქართული ლიმონათი." },
      { id: 62, ka: "„ბორჯომი“", en: "\"Borjomi\" Mineral Water", ru: "«Боржоми»", price: 3, volume: "0.5 L", descKa: "მინერალური გაზიანი წყალი — საქართველოს სავიზიტო ბარათი." },
      { id: 63, ka: "„ნაბეღლავი“", en: "\"Nabeghlavi\" Mineral Water", ru: "«Набеглави»", price: 3, volume: "0.5 L", descKa: "მინერალური გაზიანი წყალი გურიის წყაროებიდან." },
      { id: 64, ka: "წყალი „მისი“", en: "\"Mtsi\" Water", ru: "Вода «Мтси»", price: 2, volume: "0.5 L", descKa: "სუფთა სასმელი წყალი." },
      { id: 65, ka: "წყალი „მისი“", en: "\"Mtsi\" Water", ru: "Вода «Мтси»", price: 3, volume: "1.0 L", descKa: "სუფთა სასმელი წყალი, დიდი ბოთლი." },
    ],
  },
  {
    id: "hotdrinks",
    ka: "ცხელი სასმელები",
    en: "Hot Drinks",
    ru: "Горячие напитки",
    items: [
      { id: 66, ka: "ჩაი ჩაიდანში", en: "Loose Tea in a Teapot", ru: "Чай заварной в чайнике", price: 5, descKa: "ქართული ჩაი — ნამდვილი არომატი და სითბო." },
      { id: 67, ka: "ჩაი პაკეტით", en: "Teabag Tea", ru: "Чай в пакетике", price: 2, descKa: "სწრაფი და მარტივი ვარიანტი." },
      { id: 68, ka: "ყავა თურქული", en: "Turkish Coffee", ru: "Кофе по-турецки", price: 3, descKa: "ნელა მოხარშული ყავა ოქროს მარცვლებისგან." },
    ],
  },
];

export const MENU_ITEM_COUNT = MENU.reduce((n, c) => n + c.items.length, 0);
