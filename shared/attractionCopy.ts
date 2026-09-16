/**
 * Default owner-editable names and notes for the nearby attractions, in all
 * six languages. Seeds DEFAULT_CONTENT.attractions; formerly lived under
 * `location.attractions` in the locale dictionaries.
 */
import { localized, type LocalizedText } from "./langs";

export interface AttractionCopy {
  title: LocalizedText;
  note: LocalizedText;
}

export const ATTRACTION_COPY: Record<string, AttractionCopy> = {
  prometheus: {
    title: localized("პრომეთეს მღვიმე", "Prometheus Cave", "Пещера Прометея", "مغارة بروميثيوس", "Grotte de Prométhée", "Cueva de Prometeo"),
    note: localized("სტალაქტიტები, მიწისქვეშა მდინარე და ნავით მოგზაურობა.", "Stalactites, an underground river, and a boat trip.", "Сталактиты, подземная река и прогулка на лодке.", "هوابط ونهر تحت الأرض ورحلة بالقارب.", "Stalactites, rivière souterraine et promenade en barque.", "Estalactitas, un río subterráneo y un viaje en bote."),
  },
  tskaltubo: {
    title: localized("წყალტუბოს კურორტი", "Tskaltubo Resort", "Курорт Цхалтубо", "منتجع تسقالتوبو", "Station thermale de Tskaltoubo", "Balneario de Tskaltubo"),
    note: localized("სამკურნალო წყლები და მიტოვებული საბჭოთა სანატორიუმები.", "Healing waters and abandoned Soviet sanatoriums.", "Целебные воды и заброшенные советские санатории.", "ينابيع علاجية ومصحات سوفيتية مهجورة.", "Eaux curatives et sanatoriums soviétiques abandonnés.", "Aguas curativas y sanatorios soviéticos abandonados."),
  },
  sataplia: {
    title: localized("სათაფლიის ნაკრძალი", "Sataplia Nature Reserve", "Заповедник Сатаплия", "محمية ساتابليا", "Réserve Sataplia", "Reserva de Sataplia"),
    note: localized("დინოზავრის ნამდვილი ნაკვალევი და მინის ხედვის ბაქანი.", "Real dinosaur footprints and a glass viewing platform.", "Настоящие следы динозавров и смотровая площадка со стеклянным полом.", "آثار حقيقية لأقدام ديناصور ومنصة زجاجية للمشاهدة.", "Vélocité des dinosaures et belvédère de verre.", "Huellas de dinosaurios reales y una plataforma de observación de cristal."),
  },
  kutaisi: {
    title: localized("ქუთაისი", "Kutaisi", "Кутаиси", "كوتايسي", "Koutaïssi", "Kutaisi"),
    note: localized("იმერეთის დედაქალაქი, ბაგრატის ტაძარი და საერთაშორისო აეროპორტი.", "The capital of Imereti, Bagrati Cathedral, and the international airport.", "Столица Имеретии, храм Баграта и международный аэропорт.", "عاصمة إيميريتي، كاتدرائية باغراتي ومطار دولي.", "La capitale de l’Imérétie, la cathédrale Bagrat et l’aéroport international.", "La capital de Imereti, la catedral de Bagrati y el aeropuerto internacional."),
  },
  gelati: {
    title: localized("გელათის მონასტერი", "Gelati Monastery", "Гелатский монастырь", "دير غيلاتي", "Monastère de Gélati", "Monasterio de Gelati"),
    note: localized("UNESCO-ს ძეგლი, XII საუკუნის მოზაიკები.", "UNESCO World Heritage site, 12th-century mosaics.", "Памятник ЮНЕСКО, мозаики XII века.", "موقع مدرج لدى اليونسكو، فسيفساء من القرن الثاني عشر.", "Site UNESCO, mosaïques du XIIe siècle.", "Sitio de la UNESCO, mosaicos del siglo XII."),
  },
  martvili: {
    title: localized("მარტვილის კანიონი", "Martvili Canyon", "Мартвильский каньон", "وادي مارتفيلي", "Canyon de Martvili", "Cañón de Martvili"),
    note: localized("ზურმუხტისფერი წყალი და ნავით სრიალი კლდეებს შორის.", "Emerald water and gliding on a boat between cliffs.", "Изумрудная вода и сплав на лодках между скалами.", "مياه فيروزية وجولة بالقارب بين الصخور.", "Eaux émeraude et navigation entre les rochers.", "Agua esmeralda y paseos en bote entre las rocas."),
  },
  khvamli: {
    title: localized("ხვამლის მთა", "Mount Khvamli", "Гора Хвамли", "جبل خفاملي", "Mont Khvamli", "Montaña Khvamli"),
    note: localized("ლეგენდარული მაგიდისებრი მთა ლეჩხუმში — ამირანის მითის სამშობლო.", "The legendary table mountain in Lechkhumi — home of the Amirani myth.", "Легендарная столообразная гора в Лечхуми — родина мифа об Амиране.", "جبل أسطوري مسطّح القمة في ليتشخومي — مهد أسطورة أميران.", "Mont plat légendaire du Léchkhoum — berceau du mythe d'Amiran.", "La legendaria montaña en forma de mesa en Lechkhumi — hogar del mito de Amirani."),
  },
  okatse: {
    title: localized("ოკაცეს კანიონი", "Okatse Canyon", "Каньон Окаце", "وادي أوكاتسي", "Canyon d’Okatse", "Cañón de Okatse"),
    note: localized("დაკიდებული ბილიკი კანიონის თავზე და კინჩხის ჩანჩქერი.", "A suspended trail over the canyon and Kinchkha Waterfall.", "Подвесная тропа над каньоном и водопад Кинчха.", "ممر معلّق فوق الوادي وشلال كينتشخا.", "Ponton suspendu au-dessus du canyon et cascade de Kinchi.", "Un sendero suspendido sobre el cañón y la cascada de Kinchkha."),
  },
};
