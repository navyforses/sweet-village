/**
 * Bodies (Markdown subset) and FAQs of the seed guide articles, keyed by
 * slug. Georgian and English are written; the other languages are filled
 * from the admin panel. Prices change, so texts give ranges and point to
 * the official sources.
 */
import type { LocalizedText } from "./langs.js";

export interface GuideSeedBody {
  body: LocalizedText;
  faq: { question: LocalizedText; answer: LocalizedText }[];
}

const text = (ka: string, en: string): LocalizedText => ({ ka, en, ru: "", ar: "", fr: "", es: "" });

export const GUIDE_BODIES: Record<string, GuideSeedBody> = {
  "prometheus-cave": {
    body: text(
      `პრომეთეს მღვიმე (ადგილობრივად — ყუმისთავის მღვიმე) იმერეთის ყველაზე ცნობილი ბუნებრივი ძეგლია და ჩვენი ეზოდან სულ **1.5 კილომეტრშია**. ვინც ჩვენთან რჩება, დილით პირველი შედის და ხალხმრავლობას ასწრებს.

## რას ნახავთ შიგნით

მღვიმის საერთო სიგრძე 11 კილომეტრზე მეტია, ვიზიტორებისთვის კი დაახლოებით **1 კილომეტრიანი** განათებული ბილიკია მოწყობილი, რომელიც ექვს დარბაზზე გადის. სტალაქტიტები, სტალაგმიტები, ქვის „ფარდები“ და მიწისქვეშა მდინარე — ყველაფერი ფერადი განათებითა და ფონური მუსიკითაა წარმოდგენილი. ტური გიდთან ერთად დაახლოებით **45–60 წუთი** გრძელდება.

ბილიკის ბოლოს, როცა წყლის დონე ამის საშუალებას იძლევა, შესაძლებელია **ნავით გასეირნება** მიწისქვეშა მდინარეზე (დაახლოებით 280 მეტრი). ეს ცალკე ბილეთია და ყოველთვის არ მუშაობს — ადგილზე ჰკითხეთ.

## სამუშაო საათები და ბილეთები

- მღვიმე ღიაა **სამშაბათიდან კვირამდე, დაახლოებით 10:00-დან 17:30-მდე**; ორშაბათი დასვენების დღეა. ზაფხულში ბოლო ჯგუფი ხშირად 17:00-ზე შედის.
- მოზრდილის ბილეთი ბოლო წლებში **20–25 ₾-ის** ფარგლებში იყო; მოსწავლეებს, სტუდენტებსა და 6 წლამდე ბავშვებს ფასდაკლება აქვთ. ნავით გასეირნება ცალკე იყიდება.
- ბილეთები ადგილზე იყიდება; ზაფხულის შაბათ-კვირას რიგები დგება, ამიტომ 10:00-ზე ან 15:00-ის შემდეგ მისვლა ჯობია.

ფასები და საათები დაცული ტერიტორიების სააგენტოს (apa.gov.ge) მიხედვით იცვლება — ვიზიტამდე შეამოწმეთ ან ჩვენ გვკითხეთ, ყოველთვის ვიცით მიმდინარე მდგომარეობა.

## რა ჩაიცვათ

მღვიმეში მთელი წლის განმავლობაში **14 °C**-ია და ნესტიანია. ზაფხულის სიცხეშიც კი თხელი ქურთუკი ან სვიტერი დაგჭირდებათ. ფეხსაცმელი — დახურული, არამოლიპულ ძირზე: ბილიკი ბეტონისაა, მაგრამ ზოგან სველია. ეტლი და საბავშვო ეტლი ბილიკის ნაწილზე გადის, კიბეები კი მაინც არის.

## როგორ მოხვდეთ

- **ტკბილი სოფლიდან:** მანქანით 2 წუთი, ფეხით 20 წუთი მშვიდი სოფლის გზით. ჩვენი სტუმრებისთვის ტაქსსაც ვუკვეთავთ.
- **ქუთაისიდან:** დაახლოებით 25 კილომეტრი, მანქანით 35–40 წუთი წყალტუბოს გავლით. ტაქსი ორივე მიმართულებით ლოდინით ჩვეულებრივ 40–60 ₾ ღირს.
- **წყალტუბოდან:** 8 კილომეტრი. სამარშრუტო ტაქსი ყუმისთავისკენ იშვიათად დადის, ამიტომ ტაქსი უფრო საიმედოა (15–20 ₾).

## ერთი დღე მღვიმის გარშემო

დილით — მღვიმე, სადილად — [იმერული სუფრა ჩვენს რესტორანში](/menu), ნაშუადღევს — [აუზი](/pool) ან [სათაფლიის ნაკრძალი](/guides/sataplia-dinosaur-footprints) 18 წუთში. ვინც ღამით რჩება, მეორე დღეს [ოკაცისა და მარტვილის კანიონებს](/guides/okatse-martvili-day-trip) უთმობს.

> **რჩევა:** მღვიმეში ფოტოების გადაღება შეიძლება, მაგრამ ბლიცის გარეშე — ფერადი განათება ისედაც კარგად ჩანს.

[კოტეჯების ნახვა და დაჯავშნა](/stay) — მღვიმიდან 2 წუთში.`,
      `Prometheus Cave (locally also Kumistavi Cave) is the best-known natural monument in Imereti and sits just **1.5 km** from our garden. Guests who stay with us are first in line in the morning, before the tour buses arrive.

## What you will see inside

The cave system is over 11 km long; the visitor route is a lit path of about **1 km** through six halls. Stalactites, stalagmites, stone "curtains" and an underground river are shown with coloured lighting and background music. The guided walk takes roughly **45–60 minutes**.

At the end of the route, when the water level allows, there is an optional **boat ride** on the underground river (about 280 m). It is a separate ticket and does not run every day, so ask at the entrance.

## Opening hours and tickets

- The cave is open **Tuesday to Sunday, roughly 10:00 to 17:30**; Monday is the closing day. In summer the last group often enters at 17:00.
- An adult ticket has been in the **20–25 GEL** range in recent years, with discounts for pupils, students and children under 6. The boat ride is sold separately.
- Tickets are sold on site. Summer weekends bring queues, so aim for 10:00 or after 15:00.

Prices and hours are set by the Agency of Protected Areas (apa.gov.ge) and change from season to season. Check before you go, or simply ask us: we always know the current situation.

## What to wear

It is **14 °C** inside all year round and humid. Even in the summer heat you will want a light jacket or a sweater. Wear closed shoes with grip: the path is concrete but wet in places. Part of the route is accessible with a pushchair or wheelchair, but there are stairs.

## Getting there

- **From Sweet Village:** 2 minutes by car or a 20-minute walk along a quiet village road. We can also call a taxi for our guests.
- **From Kutaisi:** about 25 km, 35–40 minutes by car via Tskaltubo. A return taxi with waiting time usually costs 40–60 GEL.
- **From Tskaltubo:** 8 km. Minibuses towards Kumistavi are rare, so a taxi is the reliable option (15–20 GEL).

## A day around the cave

The cave in the morning, an [Imeretian lunch in our restaurant](/menu), then the [pool](/pool) or the [Sataplia reserve](/guides/sataplia-dinosaur-footprints) 18 minutes away. If you stay the night, give the next day to the [Okatse and Martvili canyons](/guides/okatse-martvili-day-trip).

> **Tip:** photos are allowed inside, but without flash. The coloured lighting shows up well as it is.

[See the cottages and book](/stay), two minutes from the cave.`,
    ),
    faq: [
      {
        question: text("რამდენ ხანს გრძელდება ვიზიტი პრომეთეს მღვიმეში?", "How long does a visit to Prometheus Cave take?"),
        answer: text("ბილიკზე გიდთან ერთად 45–60 წუთი, ნავით გასეირნებით — კიდევ 15 წუთი. ბილეთის ყიდვასა და ლოდინს ზაფხულში დაამატეთ ნახევარი საათი.", "About 45–60 minutes on the path with a guide, plus around 15 minutes if you take the boat. In summer allow another half hour for tickets and waiting."),
      },
      {
        question: text("შეიძლება ბავშვებთან ერთად?", "Is the cave suitable for children?"),
        answer: text("დიახ, ბილიკი უსაფრთხო და განათებულია. პატარებს თბილად ჩააცვით — შიგნით 14 გრადუსია — და ეტლი ყველა მონაკვეთზე ვერ გაივლის.", "Yes, the path is safe and lit. Dress little ones warmly, as it is 14 °C inside, and note that a pushchair cannot pass every section."),
      },
      {
        question: text("რა მანძილია ტკბილი სოფლიდან მღვიმემდე?", "How far is Sweet Village from the cave?"),
        answer: text("1.5 კილომეტრი — მანქანით 2 წუთი, ფეხით დაახლოებით 20 წუთი.", "1.5 km: two minutes by car or about a 20-minute walk."),
      },
    ],
  },
  "tskaltubo-things-to-do": {
    body: text(
      `წყალტუბო ჩვენგან **12 წუთშია** და საქართველოში ყველაზე უჩვეულო ქალაქებიდან ერთ-ერთია: საბჭოთა პერიოდის უზარმაზარი კურორტი, სადაც წელიწადში ასი ათასობით ადამიანი მკურნალობდა, დღეს ნახევრად მიტოვებული და ნახევრად აღდგენილი, მაგრამ მაინც ცოცხალია.

## თერმული წყლები

წყალტუბოს წყალი **რადონულ-კარბონატულია, 33–35 °C** ტემპერატურით — ბუნებრივად თბილი, ამიტომ ადგილობრივები „უკვდავების წყალს“ ეძახდნენ. სამკურნალო აბაზანები დღესაც მუშაობს: **№6 აბანო** (იგივე „სტალინის აბანო“) ცენტრალურ პარკშია, ინდივიდუალური აბაზანებითა და აუზით, და რამდენიმე თანამედროვე სპა-სასტუმროც იღებს დღის ვიზიტორებს. პროცედურა ჩვეულებრივ 15–20 წუთია და საბჭოთა ინტერიერი თავისთავად სანახავია.

## სანატორიუმები

პარკის გარშემო 1950-იანი წლების სანატორიუმებია — **„მედეა“, „მეტალურგი“, „ივერია“, „თბილისი“** და სხვები: კოლონადები, მოზაიკები, სპირალური კიბეები. 1990-იანებიდან ბევრ მათგანში აფხაზეთიდან დევნილი ოჯახები ცხოვრობდნენ; ნაწილი დღეს ცარიელია, ნაწილი კერძო ინვესტორებმა შეიძინა და მიმდინარეობს რეკონსტრუქცია.

რამდენიმე წესი: შენობებში მხოლოდ იქ შედით, სადაც ეს ღიად ნებადართულია, არ შეაწუხოთ მაცხოვრებლები და ფოტოსთვის ნებართვა ჰკითხეთ. კიბეები და იატაკები ზოგ შენობაში დაზიანებულია.

## ცენტრალური პარკი და ქალაქი

**ცენტრალური პარკი** 70 ჰექტარია — ჭადრები, შადრევნები, აბანოებისკენ მიმავალი ხეივნები. სასეირნოდ საუკეთესოა დილით ან მზის ჩასვლისას. პარკის ირგვლივ რამდენიმე კაფე და ბაზარია, სადაც ადგილობრივი ყველი, თაფლი და ხილი იყიდება.

## როგორ დაგეგმოთ

1. დილით — პარკი და აბანო №6 (2 საათი).
2. სადილი — ჩვენთან ან წყალტუბოს ერთ-ერთ კაფეში.
3. ნაშუადღევს — [პრომეთეს მღვიმე](/guides/prometheus-cave) (წყალტუბოდან 8 კმ) ან [აუზი ჩვენს ეზოში](/pool).

წყალტუბოში ტაქსით მისვლა ჩვენგან 10–15 ₾ ღირს; ქუთაისიდან — სამარშრუტო ტაქსით 30 წუთი.

> წყალტუბოს ყოფილი კურორტი ფოტოგრაფებისთვის განსაკუთრებით მიმზიდველია, მაგრამ ეს ცოცხალი ქალაქია და არა მუზეუმი. მადლობა, რომ ამას გაითვალისწინებთ.

[კოტეჯები და ნომრები წყალტუბოსთან](/stay) · [დაჯავშნის მოთხოვნა](/booking)`,
      `Tskaltubo is **12 minutes** from us and one of the most unusual towns in Georgia: an enormous Soviet-era spa resort that once treated hundreds of thousands of patients a year, today half abandoned, half revived, and very much alive.

## The thermal waters

Tskaltubo's water is **radon-carbonate at 33–35 °C**, naturally warm, which is why locals called it "the water of immortality". The therapeutic baths still operate: **Bathhouse No. 6** (known as Stalin's bathhouse) stands in the central park with individual tubs and a pool, and a few modern spa hotels take day visitors too. A session is usually 15–20 minutes, and the Soviet interiors are a sight in themselves.

## The sanatoriums

Around the park stand the sanatoriums of the 1950s: **Medea, Metallurgist, Iveria, Tbilisi** and others, with colonnades, mosaics and spiral staircases. From the 1990s many housed families displaced from Abkhazia; some are empty today, others have been bought by investors and are being rebuilt.

A few rules: enter only where it is clearly allowed, do not disturb residents, and ask before photographing people. Stairs and floors are damaged in some buildings.

## The central park and the town

The **central park** covers 70 hectares: plane trees, fountains and alleys leading to the bathhouses. It is best early in the morning or at sunset. Around the park are a few cafés and a market with local cheese, honey and fruit.

## How to plan it

1. Morning: the park and Bathhouse No. 6 (2 hours).
2. Lunch: with us or in one of Tskaltubo's cafés.
3. Afternoon: [Prometheus Cave](/guides/prometheus-cave) (8 km from Tskaltubo) or the [pool in our garden](/pool).

A taxi from Sweet Village to Tskaltubo costs 10–15 GEL; from Kutaisi it is a 30-minute minibus ride.

> The former resort is a magnet for photographers, but it is a living town, not a museum. Thank you for keeping that in mind.

[Cottages and rooms near Tskaltubo](/stay) · [Booking request](/booking)`,
    ),
    faq: [
      {
        question: text("შეიძლება წყალტუბოს სანატორიუმებში შესვლა?", "Can you go inside the Tskaltubo sanatoriums?"),
        answer: text("ზოგიერთში — დიახ, სადაც ღიად ნებადართულია ან გიდი მიგყავთ. ბევრი შენობა კერძო საკუთრებაა ან საცხოვრებელი; ჩაკეტილ ან დაცულ შენობაში არ შეხვიდეთ.", "In some, yes, where it is openly allowed or a guide takes you. Many buildings are private property or homes; do not enter locked or guarded ones."),
      },
      {
        question: text("რა ღირს აბანო წყალტუბოში?", "How much does a thermal bath cost in Tskaltubo?"),
        answer: text("ინდივიდუალური აბაზანა №6 აბანოში ბოლო წლებში 20–40 ₾ ღირდა, სპა-სასტუმროებში მეტი. მიმდინარე ფასი ადგილზე დააზუსტეთ.", "An individual bath at Bathhouse No. 6 has cost 20–40 GEL in recent years, more at the spa hotels. Check the current price on site."),
      },
    ],
  },
  "okatse-martvili-day-trip": {
    body: text(
      `იმერეთისა და სამეგრელოს ორი ყველაზე ლამაზი კანიონი ერთმანეთისგან ნახევარ საათშია და ჩვენგან ორივე **ერთი დღის** მარშრუტში ჯდება. ადრე გამგზავრება მთავარია: ორივე ადგილას ზაფხულის შუადღეს ბევრი ხალხია.

## ოკაცის კანიონი — 55 წუთი ჩვენგან

ოკაცის მთავარი ატრაქციონი **780 მეტრიანი ლითონის ბილიკია**, რომელიც კლდის კიდეზეა დაკიდული — ზოგ ადგილას ხეობის ფსკერიდან 140 მეტრზე. ბოლოს პანორამული ბაქანია, საიდანაც მთელი კანიონი ჩანს.

ვიზიტორთა ცენტრიდან ბილიკამდე **2 კილომეტრი** დადიანების ტყეში უნდა გაიაროთ (30–40 წუთი ფეხით, ან ადგილობრივი 4×4-ით საფასურად). ბილეთი ბოლო წლებში დაახლოებით **17–20 ₾** იყო. ღიაა სამშაბათიდან კვირამდე, 10:00–18:00 (ბოლო შესვლა 17:00), ორშაბათი — დასვენება. ძლიერი წვიმისა და ქარის დროს ბილიკი იკეტება.

ოკაციდან 15 წუთში **ქინჩხის ჩანჩქერია** — 70 მეტრი, თანამედროვე ბაქნებით და მოკლე მარშრუტით. ღირს გაჩერება.

## მარტვილის კანიონი — 60 წუთი ჩვენგან

მარტვილში (სამეგრელო) მდინარე აბაშა ფირუზისფერ კირქვის ხეობაშია ჩაჭრილი. ორი ნაწილია: ზედა — **ბილიკი ხიდებით** ხეობის კიდეზე, და ქვედა — **ნავით გასეირნება** (დაახლოებით 15 წუთი, ცალკე ბილეთი). ბანაობა აკრძალულია. მთელი ვიზიტი 1–1.5 საათია. ბილეთი ბილიკზე დაახლოებით 17–20 ₾, ნავი — დამატებით.

## რიგითობა და დრო

- 08:30 გასვლა ჩვენგან → 09:30 ოკაცე (2 საათი ბილიკით) → 12:00 ქინჩხა (40 წუთი) → 13:00 სადილი მარტვილში ან გორდში → 14:30 მარტვილის კანიონი (1.5 საათი) → 17:00 უკან ჩვენთან [აუზზე](/pool) ან სუფრაზე.
- საერთო მანძილი დაახლოებით **150 კილომეტრი** მანქანით. მძღოლიანი მანქანა ქუთაისიდან მთელი დღით ჩვეულებრივ 120–180 ₾ ღირს; ჩვენ სანდო მძღოლებს გირჩევთ.
- ორივე ადგილას სამშაბათი–კვირა მუშაობს; ორშაბათს ალტერნატივად [პრომეთეს მღვიმე](/guides/prometheus-cave) დაგეგმეთ, ის ორშაბათსაც დაკეტილია — მაშინ [სათაფლია](/guides/sataplia-dinosaur-footprints) ან წყალტუბო.

## რჩევები

- ფეხსაცმელი — სპორტული; ოკაცის ბილიკი სველ ამინდში მოლიპულია.
- წყალი და ქუდი: ტყის მონაკვეთის შემდეგ ბილიკი ღიაა და ჩრდილი არ არის.
- სიმაღლის შიშის მქონეთათვის ოკაცის ბილიკი რთულია; მარტვილი უფრო მშვიდი ვარიანტია.

> ორივე ატრაქციონი დაცული ტერიტორიების სააგენტოს (apa.gov.ge) მართვაშია — მიმდინარე საათები და ფასები იქ შეამოწმეთ.

ღამის დარჩენა კანიონების შემდეგ — [კოტეჯები და ნომრები](/stay), [დაჯავშნის მოთხოვნა](/booking).`,
      `Two of the most beautiful canyons in western Georgia are half an hour apart, and both fit into **one day** from Sweet Village. Leave early: both sites get crowded on summer afternoons.

## Okatse Canyon, 55 minutes from us

Okatse's main attraction is a **780-metre metal walkway** bolted to the cliff edge, in places 140 m above the canyon floor. It ends at a panoramic platform with the whole gorge below you.

From the visitor centre you walk **2 km** through the Dadiani forest to reach the walkway (30–40 minutes, or a local 4×4 for a fee). A ticket has been around **17–20 GEL** in recent years. Open Tuesday to Sunday, 10:00–18:00 (last entry 17:00), closed on Monday. The walkway closes in heavy rain and strong wind.

Fifteen minutes from Okatse is **Kinchkha waterfall**, 70 m high, with modern platforms and a short trail. Worth the stop.

## Martvili Canyon, 60 minutes from us

In Martvili (Samegrelo) the Abasha river has cut a turquoise limestone gorge. There are two parts: the upper **walkway with bridges** along the rim, and the lower **boat ride** (about 15 minutes, separate ticket). Swimming is not allowed. The whole visit takes 1–1.5 hours. The walkway ticket is around 17–20 GEL; the boat is extra.

## Order and timing

- 08:30 leave Sweet Village → 09:30 Okatse (2 hours including the walkway) → 12:00 Kinchkha (40 minutes) → 13:00 lunch in Martvili or Gordi → 14:30 Martvili canyon (1.5 hours) → 17:00 back with us for the [pool](/pool) or dinner.
- Total driving distance about **150 km**. A car with driver from Kutaisi for the day usually costs 120–180 GEL; we can recommend trusted drivers.
- Both sites run Tuesday to Sunday. On Mondays plan [Sataplia](/guides/sataplia-dinosaur-footprints) or Tskaltubo instead; [Prometheus Cave](/guides/prometheus-cave) is closed on Mondays too.

## Tips

- Wear trainers or hiking shoes; the Okatse walkway is slippery when wet.
- Bring water and a hat: after the forest section the walkway is exposed with no shade.
- If you are afraid of heights, Okatse is demanding; Martvili is the calmer option.

> Both sites are run by the Agency of Protected Areas (apa.gov.ge); check current hours and prices there.

Staying the night after the canyons: [cottages and rooms](/stay), [booking request](/booking).`,
    ),
    faq: [
      {
        question: text("რომელი ჯობია — ოკაცე თუ მარტვილი?", "Which is better, Okatse or Martvili?"),
        answer: text("ოკაცე — ხედებისა და ადრენალინისთვის, მარტვილი — ფირუზისფერი წყლისა და ნავისთვის. ერთ დღეში ორივე ხერხდება, თუ დილით 8:30-ზე გახვალთ.", "Okatse for the views and the adrenaline, Martvili for the turquoise water and the boat. Both fit into one day if you leave by 8:30."),
      },
      {
        question: text("შეიძლება საზოგადოებრივი ტრანსპორტით?", "Can I do it by public transport?"),
        answer: text("რთულია: სამარშრუტო ტაქსი ხონამდე ან მარტვილამდე დადის, იქიდან კი ტაქსი გჭირდებათ. მძღოლიანი მანქანა მთელი დღით მარტივი და ხშირად იაფი გამოსავალია ჯგუფისთვის.", "It is hard: minibuses go to Khoni or Martvili, and from there you need a taxi. A car with driver for the day is simpler and often cheaper for a group."),
      },
    ],
  },
  "sataplia-dinosaur-footprints": {
    body: text(
      `სათაფლიის სახელმწიფო ნაკრძალი ქუთაისის ჩრდილო-დასავლეთით, ჩვენგან **14 კილომეტრზეა**. სახელი „თაფლის ადგილს“ ნიშნავს — ველური ფუტკრის გამო, რომელიც აქაურ კლდეებში ბუდობდა. დღეს ეს კომპაქტური, კარგად მოწყობილი პარკია, სადაც ერთ ბილიკზე ოთხი სხვადასხვა რამ ინახება.

## რას ნახავთ

1. **დინოზავრების ნაკვალევი.** 1933 წელს აღმოჩენილი ბალახისმჭამელი და მტაცებელი დინოზავრების კვალი კირქვის ფენაზე — ცარცული პერიოდიდან, დაახლოებით 120 მილიონი წლისა. ნაკვალევი პავილიონით არის დაცული.
2. **სათაფლიის მღვიმე.** დაახლოებით 300 მეტრიანი განათებული ბილიკი სტალაქტიტებით; ცნობილია „ქვის გულის“ სახელით ცნობილი წარმონაქმნით. მღვიმეში მუდმივად 14 °C-ია.
3. **კოლხური ტყე.** ბილიკი მარადმწვანე რელიქტურ ტყეზე გადის — ბზა, წაბლი, სურო; გაზაფხულზე და შემოდგომაზე განსაკუთრებით ლამაზია.
4. **შუშის ბაქანი.** მარშრუტის ბოლოს კლდეზე გამოშვერილი პანორამული ბაქანია, საიდანაც ქუთაისი, რიონის ველი და კავკასიონის მთები ჩანს.

მთელი წრე დაახლოებით **1.5–2 საათია** მშვიდი ტემპით. ბილიკი მოასფალტებულია და საბავშვო ეტლისთვის ძირითადად გამოსადეგია.

## საათები და ბილეთები

ნაკრძალი ღიაა **სამშაბათიდან კვირამდე, 10:00–18:00** (ბოლო შესვლა 17:00); ორშაბათს დაკეტილია. ბილეთი ბოლო წლებში დაახლოებით **15–20 ₾** იყო მოზრდილისთვის, გიდის მომსახურების ჩათვლით, ბავშვებისთვის ფასდაკლებით. ფასები apa.gov.ge-ზე მოწმდება.

## როგორ მოხვდეთ

- **ტკბილი სოფლიდან:** მანქანით 18 წუთი. ტაქსი ორივე მიმართულებით ლოდინით 30–40 ₾.
- **ქუთაისიდან:** 10 კილომეტრი, სამარშრუტო ტაქსი ცენტრიდან სათაფლიისკენ დადის, ტაქსი 15–20 ₾.

## რასთან შეაერთოთ

სათაფლია და [პრომეთეს მღვიმე](/guides/prometheus-cave) ერთ დღეში იოლად თავსდება: დილით სათაფლია, სადილი ჩვენთან, ნაშუადღევს პრომეთე. ვინც ორივე მღვიმეს ნახავს, დაინახავს, რომ ისინი ძალიან განსხვავებულია — სათაფლია პატარა და უფრო „ბუნებრივი“, პრომეთე — დიდი და თეატრალური.

[ღამის დარჩენა სათაფლიასა და პრომეთეს შორის](/stay) · [ლოკაცია და მანძილები](/location)`,
      `Sataplia State Reserve lies north-west of Kutaisi, **14 km** from us. The name means "the place of honey", after the wild bees that nested in the cliffs here. Today it is a compact, well-organised park where one trail holds four different things.

## What you will see

1. **Dinosaur footprints.** Discovered in 1933, the tracks of herbivorous and predatory dinosaurs are pressed into a limestone layer from the Cretaceous period, about 120 million years old. A pavilion protects them.
2. **Sataplia Cave.** A lit path of about 300 m with stalactites, famous for the formation known as the "stone heart". It is a constant 14 °C inside.
3. **Colchic forest.** The trail runs through relict evergreen forest of box, chestnut and ivy, particularly beautiful in spring and autumn.
4. **The glass platform.** At the end of the route a panoramic platform juts out over the cliff, with Kutaisi, the Rioni valley and the Caucasus mountains in view.

The full loop takes about **1.5–2 hours** at an easy pace. The path is paved and mostly fine with a pushchair.

## Hours and tickets

The reserve is open **Tuesday to Sunday, 10:00–18:00** (last entry 17:00) and closed on Monday. An adult ticket has been around **15–20 GEL** in recent years, guide included, with a discount for children. Prices are published on apa.gov.ge.

## Getting there

- **From Sweet Village:** 18 minutes by car. A return taxi with waiting time is 30–40 GEL.
- **From Kutaisi:** 10 km; minibuses run from the centre towards Sataplia, a taxi is 15–20 GEL.

## What to combine it with

Sataplia and [Prometheus Cave](/guides/prometheus-cave) fit easily into one day: Sataplia in the morning, lunch with us, Prometheus in the afternoon. If you see both caves you will notice how different they are: Sataplia small and natural, Prometheus vast and theatrical.

[Stay the night between Sataplia and Prometheus](/stay) · [Location and distances](/location)`,
    ),
    faq: [
      {
        question: text("სათაფლია ბავშვებისთვის საინტერესოა?", "Is Sataplia good for children?"),
        answer: text("დიახ — დინოზავრების ნაკვალევი, მოკლე მღვიმე და შუშის ბაქანი 5–12 წლის ბავშვებისთვის ერთ-ერთი საუკეთესო ვიზიტია რეგიონში. ბილიკი მოკლე და უსაფრთხოა.", "Yes. The dinosaur footprints, the short cave and the glass platform make it one of the best visits in the region for children aged 5–12. The trail is short and safe."),
      },
    ],
  },
  "garden-wedding-imereti": {
    body: text(
      `ბუნებაში ქორწილი იმერეთში ორ რამეს ნიშნავს: მწვანე ეზოს, სადაც სტუმრები საღამომდე რჩებიან, და **სუფრას**, რომელიც თავად დღესასწაულია. ეს გზამკვლევი იმ კითხვებს პასუხობს, რომლებსაც წყვილები ჩვენთან [ღონისძიების გვერდზე](/events/wedding) მოსვლამდე გვისვამენ.

## რამდენი სტუმარი

ჩვენი **გადახურული ბაღის სივრცე 120-მდე სტუმარს** იტევს მჯდომარე სუფრასთან, რესტორნის დარბაზი — 60-ს. ღამით დარჩენა **18 სტუმარს** შეუძლია ხუთ კოტეჯსა და ნომერში, ამიტომ ახლო წრე — მშობლები, ძმები და დები, შორიდან ჩამოსული მეგობრები — იმავე ეზოში იძინებს.

20 სტუმარზე მეტი ჯგუფისთვის მთელ კომპლექსს ერთ დღესასწაულს ვუთმობთ — სხვა სტუმრები იმ დღეს არ არიან. ეს ხმაურის, მუსიკისა და დროის თავისუფლებას ნიშნავს.

## იმერული სუფრა

სუფრა ერთი მენიუ არ არის — ეს კერძების თანმიმდევრობაა, რომელიც საათობით იშლება: ხაჭაპური და მჭადი, ფხალი და ლობიო, კეცის კერძები, მწვადი, შემდეგ ტკბილეული და ხილი. ჩვენ [ეზოში მოყვანილ ბოსტნეულსა და სახლურ რეცეპტებს](/menu) ვიყენებთ. ღვინო — იმერული, ამბობენ, თამადა — თქვენი ან ჩვენი რეკომენდაციით.

ფასი სუფრაზე ერთ სტუმარზე ითვლება და კერძების შემადგენლობაზეა დამოკიდებული; ზუსტ შეთავაზებას სტუმრების რაოდენობისა და თარიღის მიხედვით ვწერთ.

## როდის დაიწყოთ

- **6–4 თვით ადრე:** თარიღი და სივრცე. ივნისი, სექტემბერი და ოქტომბერი ყველაზე მოთხოვნადია.
- **3 თვით ადრე:** სტუმრების სავარაუდო რაოდენობა, მენიუს სტილი, მუსიკა და ფოტოგრაფი.
- **1 თვით ადრე:** საბოლოო რაოდენობა, დაჯდომის გეგმა, ღამის დარჩენა ახლობლებისთვის.
- **1 კვირით ადრე:** ამინდის გეგმა (გადახურული სივრცე ამას ისედაც წყვეტს), დროის განრიგი.

## რა ჰკითხოთ სივრცეს

1. რა შედის ფასში — მაგიდები, სკამები, თეთრეული, მომსახურე პერსონალი?
2. რომელ საათამდე შეიძლება მუსიკა?
3. სად რჩებიან სტუმრები და როგორ ბრუნდებიან ქუთაისში?
4. არის თუ არა ცვლილება ამინდის შემთხვევაში?
5. ვინ არის საკონტაქტო პირი დღესასწაულის დღეს?

ჩვენი პასუხები: სუფრის ფასში მაგიდები, სკამები, თეთრეული და მომსახურება შედის; მუსიკა ეზოში გვიან საღამომდე შეიძლება, როცა მთელი კომპლექსი თქვენია; ქუთაისი 25 წუთშია და მძღოლებს ვუკვეთავთ; გადახურული სივრცე წვიმას აგვარებს; დღესასწაულის დღეს მფლობელი ადგილზეა.

## ნიშნობა, დაბადების დღე, პატარა ქორწილი

იგივე ეზო 20–40 სტუმრისთვისაც მუშაობს: [ნიშნობა](/events/engagement) ერთ გრძელ მაგიდასთან ტერასაზე, [დაბადების დღე](/events/birthday) აუზთან, ან ქორწილი მხოლოდ ოჯახისთვის. ფოტოებისთვის — ბაღი, ხის კოტეჯების ფონი და საღამოს განათებული ტერასა.

[ღონისძიების მოთხოვნა](/booking?interest=whole) · [ყველა ფორმატი](/events)`,
      `A garden wedding in Imereti means two things: a green courtyard where guests linger until nightfall, and the **supra**, the Georgian feast that is a celebration in itself. This guide answers the questions couples ask us before they reach our [wedding page](/events/wedding).

## How many guests

Our **covered garden space seats up to 120 guests** at a feast table, and the restaurant hall seats 60. **Eighteen guests** can stay overnight in the five cottages and rooms, so the closest circle, parents, siblings, friends from abroad, sleeps in the same garden.

For parties above 20 guests we give the whole property to one celebration: no other guests that day. That means freedom with noise, music and timing.

## The Imeretian feast

A supra is not a single menu but a sequence of dishes that unfolds over hours: khachapuri and mchadi, pkhali and lobio, ketsi dishes, mtsvadi, then sweets and fruit. We cook with [vegetables from our own garden and family recipes](/menu). The wine is Imeretian; the tamada, the toastmaster, is yours or one we recommend.

The feast is priced per guest and depends on the dishes chosen; we write an exact offer for your guest count and date.

## When to start

- **6–4 months ahead:** date and venue. June, September and October are the most requested.
- **3 months ahead:** approximate guest count, menu style, music and photographer.
- **1 month ahead:** final numbers, seating plan, overnight rooms for family.
- **1 week ahead:** weather plan (the covered space settles this anyway) and the timeline.

## What to ask a venue

1. What is included: tables, chairs, linen, service staff?
2. Until what time can music play?
3. Where do guests sleep and how do they get back to Kutaisi?
4. Is there a plan for rain?
5. Who is the contact person on the day?

Our answers: tables, chairs, linen and service are included in the feast price; music can run late into the evening when the whole property is yours; Kutaisi is 25 minutes away and we arrange drivers; the covered space handles rain; the owner is on site on the day.

## Engagements, birthdays, small weddings

The same garden works for 20–40 guests: an [engagement](/events/engagement) at one long table on the terrace, a [birthday](/events/birthday) by the pool, or a family-only wedding. For photos: the garden, the wooden cottages as a backdrop and the terrace lit up in the evening.

[Event request](/booking?interest=whole) · [All event formats](/events)`,
    ),
    faq: [
      {
        question: text("რამდენი სტუმარი ეტევა ქორწილზე?", "How many wedding guests can you host?"),
        answer: text("გადახურულ ბაღის სივრცეში 120-მდე მჯდომარე სტუმარი, რესტორნის დარბაზში 60. ღამით 18 სტუმარი რჩება კოტეჯებსა და ნომრებში.", "Up to 120 seated guests in the covered garden space and 60 in the restaurant hall. Eighteen guests can stay overnight in the cottages and rooms."),
      },
      {
        question: text("რა ღირს ქორწილი ტკბილ სოფელში?", "How much does a wedding at Sweet Village cost?"),
        answer: text("ფასი სუფრაზე ერთ სტუმარზე ითვლება და მენიუზეა დამოკიდებული; მაგიდები, სკამები, თეთრეული და მომსახურება შედის. მოგვწერეთ თარიღი და რაოდენობა — ზუსტ შეთავაზებას გამოგიგზავნით.", "The feast is priced per guest and depends on the menu; tables, chairs, linen and service are included. Send us the date and guest count and we will reply with an exact offer."),
      },
      {
        question: text("რა ხდება წვიმის შემთხვევაში?", "What happens if it rains?"),
        answer: text("სუფრა გადახურულ სივრცეშია — წვიმა დღესასწაულს არ ცვლის. ცერემონია და ფოტოები ტერასაზე ან ბაღში გადაიწევს, ამინდის მიხედვით.", "The feast is under the covered space, so rain does not change the celebration. The ceremony and photos move between the terrace and the garden depending on the weather."),
      },
    ],
  },
  "kutaisi-airport-to-sweet-village": {
    body: text(
      `ქუთაისის საერთაშორისო აეროპორტი (KUT) კოპიტნარშია, ჩვენგან **დაახლოებით 30 კილომეტრზე** — მანქანით 35–45 წუთი. ბევრი ევროპული რეისი გვიან ღამით ან დილით ადრე ჩამოდის, ამიტომ ეს გზამკვლევი სწორედ იმ საათებზეა გათვლილი.

## ვარიანტი 1: ტაქსი პირდაპირ (ყველაზე მარტივი)

აეროპორტის გასასვლელთან ტაქსები ყოველთვის დგანან, ღამის რეისებზეც. ქვილიშორამდე (წყალტუბოს რაიონი, პრომეთეს მღვიმის გზა) ფასი ბოლო წლებში **50–80 ₾** იყო; ფასი წასვლამდე შეათანხმეთ. ბარათით გადახდა იშვიათია — ლარი წინასწარ მოამზადეთ, აეროპორტში ბანკომატია.

**Bolt** აპლიკაცია ქუთაისში მუშაობს და აეროპორტიდანაც იძახება; ფასი ჩვეულებრივ ტაქსების ბაზრობაზე ცოტა დაბალია. მძღოლს მისამართად „ტკბილი სოფელი, ქვილიშორი“ და [რუკის ბმული](/location) გაუზიარეთ.

## ვარიანტი 2: წინასწარი ტრანსფერი

დაგვიწერეთ WhatsApp-ზე რეისის ნომერი და ჩამოსვლის დრო — სანდო მძღოლს დაგახვედრებთ ტაბლოთი. ფასი ტაქსის ფასის ტოლია, უპირატესობა კი ის არის, რომ ღამის 2 საათზე არავის ელოდებით და მძღოლმა ზუსტად იცის, სად ვართ. რეისის დაგვიანება პრობლემა არ არის — მძღოლი ტაბლოს ადევნებს თვალს.

## ვარიანტი 3: ავტობუსი ქუთაისამდე + ტაქსი

აეროპორტიდან ქუთაისის ცენტრამდე **Omnibus / Georgian Bus** ავტობუსები რეისების მიხედვით დადის (დაახლოებით 30 წუთი, ბილეთი რამდენიმე ლარი). ცენტრიდან ქვილიშორამდე ტაქსი **30–40 ₾**, დრო 30 წუთი. ეს ვარიანტი დღისით მოსახერხებელია; ღამით ცენტრში ტაქსის ძებნა ზედმეტი ნაბიჯია.

## ღამის ჩამოსვლა

ჩვენი მიღება **24 საათი** მუშაობს: წინასწარ გვითხარით ჩამოსვლის დრო, და ღამის 3 საათზეც დაგხვდებით, კოტეჯი გათბობით ან გრილი, ჩაი და პური. დილით საუზმე ჩვეულ დროს არის.

## მანქანის დაქირავება

აეროპორტში რამდენიმე საერთაშორისო და ადგილობრივი გამქირავებელია. ჩვენამდე გზა მარტივია: ქუთაისი → წყალტუბო → ყუმისთავის (პრომეთეს მღვიმის) გზა → ქვილიშორი; ბოლო 2 კილომეტრი სოფლის მოასფალტებული გზაა. პარკინგი ეზოში უფასოა.

## შემდეგ

პირველი დღე ჩამოსვლის შემდეგ — [პრომეთეს მღვიმე 2 წუთში](/guides/prometheus-cave) და [აუზი](/pool); მეორე — [ოკაცე და მარტვილი](/guides/okatse-martvili-day-trip). გამგზავრების დღეს აეროპორტამდე ტრანსფერს იმავე მძღოლთან ვგეგმავთ.

[კოტეჯები და ნომრები](/stay) · [დაჯავშნის მოთხოვნა](/booking)`,
      `Kutaisi International Airport (KUT) is at Kopitnari, **about 30 km** from us: 35–45 minutes by car. Many European flights land late at night or early in the morning, so this guide is written with those hours in mind.

## Option 1: a taxi straight to us (simplest)

Taxis wait outside the terminal for every flight, night arrivals included. To Kvilishori (Tskaltubo district, on the Prometheus Cave road) the fare has been **50–80 GEL** in recent years; agree the price before you set off. Card payment is rare, so have lari ready; there is an ATM in the terminal.

The **Bolt** app works in Kutaisi and can be called from the airport, usually a little cheaper than the taxi rank. Give the driver "Sweet Village, Kvilishori" and our [map link](/location).

## Option 2: a pre-arranged transfer

Send us your flight number and arrival time on WhatsApp and a trusted driver will meet you with a name board. The price matches a taxi; the advantage is that at 2 a.m. nobody is negotiating and the driver knows exactly where we are. A delayed flight is no problem: the driver follows the arrivals board.

## Option 3: bus to Kutaisi, then a taxi

**Omnibus / Georgian Bus** coaches connect the airport with central Kutaisi around each flight (about 30 minutes, a few lari). From the centre a taxi to Kvilishori is **30–40 GEL** and 30 minutes. This works well by day; at night, finding a taxi in the centre is an extra step you do not need.

## Arriving at night

Our reception runs **24 hours**: tell us your arrival time in advance and we will meet you even at 3 a.m., with the cottage heated or cooled, tea and bread waiting. Breakfast is served at the usual time in the morning.

## Renting a car

Several international and local rental desks operate at the airport. The route to us is simple: Kutaisi → Tskaltubo → the Kumistavi (Prometheus Cave) road → Kvilishori; the last 2 km are a paved village road. Parking in the garden is free.

## What next

Day one after landing: [Prometheus Cave, two minutes away](/guides/prometheus-cave) and the [pool](/pool); day two: [Okatse and Martvili](/guides/okatse-martvili-day-trip). On departure day we plan the airport transfer with the same driver.

[Cottages and rooms](/stay) · [Booking request](/booking)`,
    ),
    faq: [
      {
        question: text("რა ღირს ტაქსი ქუთაისის აეროპორტიდან ტკბილ სოფლამდე?", "How much is a taxi from Kutaisi airport to Sweet Village?"),
        answer: text("ბოლო წლებში 50–80 ₾, მარშრუტი 30 კილომეტრი და 35–45 წუთია. ფასი წასვლამდე შეათანხმეთ ან წინასწარ ტრანსფერი მოგვთხოვეთ.", "50–80 GEL in recent years for the 30 km, 35–45 minute drive. Agree the price before leaving, or ask us for a pre-arranged transfer."),
      },
      {
        question: text("ღამით ჩამოსვლა შესაძლებელია?", "Can I arrive at night?"),
        answer: text("დიახ, მიღება 24 საათი მუშაობს. მთავარია, ჩამოსვლის დრო წინასწარ გვითხრათ.", "Yes, our reception works 24 hours. Just tell us your arrival time in advance."),
      },
    ],
  },
};
