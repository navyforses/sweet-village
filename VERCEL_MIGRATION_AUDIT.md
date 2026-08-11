# Sweet Village → Vercel — მიგრაციის ტექნიკური აუდიტი

## მიმდინარე მდგომარეობა

Vercel გუნდი ხელმისაწვდომია (`shako's projects`), თუმცა ჯერ არ არსებობს Vercel პროექტი. კოდის GitHub რეპოზიტორი უკვე სინქრონიზებულია: `navyforses/sweet-village`. სრული ფოტო წყარო კი გამოყოფილია 133-აქტივიან, 572 MB GitHub Release არქივად.

## რატომ არ უნდა მოხდეს არსებული კოდის პირდაპირი deployment

საიტი არის React + Vite + Express + tRPC + Drizzle/MySQL პროექტი. მხოლოდ frontend-ის Vercel-ზე ატვირთვა გამოტოვებს დაჯავშნის შენახვასა და შეტყობინებებს; ხოლო backend-ის უცვლელად ატვირთვა ვერ გამოიყენებს Manus-ის შიდა გარემო ცვლადებსა და API-ებს.

| მიმდინარე კომპონენტი | Manus დამოკიდებულება | Vercel-ზე საჭირო ჩანაცვლება |
|---|---|---|
| ფოტოები | `/manus-storage/...` 133 აქტივი | **Vercel Blob** ან S3/Cloudinary; შემდეგ URL-ების ერთიანად ჩანაცვლება |
| დაჯავშნის ბაზა | `DATABASE_URL` MySQL/TiDB + Drizzle `mysql-core` | დამოუკიდებელი MySQL ან PostgreSQL (Neon/Supabase) და შესაბამისი Drizzle adapter/migration |
| owner email | `BUILT_IN_FORGE_API_URL` email endpoint | Resend, Postmark ან სხვა email API + `RESEND_API_KEY` |
| owner notification | Manus notification API | email + WhatsApp fallback; სურვილის შემთხვევაში Telegram/SMS webhook |
| რუკა | Forge Maps Proxy + Forge key | Google Maps JavaScript API key, შეზღუდული Vercel დომენით; ან Leaflet/OpenStreetMap |
| ავტორიზაცია | Manus OAuth | საჯარო საიტისთვის მოსახსნელია; სამომავლო ადმინისტრირებისათვის ცალკე Auth.js/Clerk/Supabase Auth |

## რეკომენდებული Vercel არქიტექტურა

1. **Frontend:** არსებული React/Vite დიზაინი, Vercel-ზე სტატიკური build.
2. **API:** `/api/booking` Vercel Node Function; ის შეამოწმებს ფორმას, შეინახავს მოთხოვნას დამოუკიდებელ ბაზაში და გაგზავნის წერილს `iobidzeioseb@gmail.com`-ზე.
3. **ფოტოები:** ერთი Vercel Blob store; 133 აქტივის ატვირთვა ZIP არქივიდან; `VITE_ASSET_BASE_URL` იცვლის ყველა `/manus-storage` ბმულის ბაზას.
4. **რუკა:** Google Maps key მხოლოდ Vercel production/preview დომენებისთვის შეზღუდული, ან არაკომერციული Leaflet fallback.

## აუცილებელი გადაწყვეტილებები Vercel Deployment-მდე

| გადაწყვეტილება | რეკომენდაცია | რატომ არის საჭირო |
|---|---|---|
| ფოტო საცავი | Vercel Blob | ფოტოების საჯარო და CDN-ით სწრაფი მიწოდება |
| ბაზა | Neon PostgreSQL ან არსებული დამოუკიდებელი MySQL | დაჯავშნის მოთხოვნები არ უნდა დაიკარგოს |
| email provider | Resend | Vercel serverless API-დან `iobidzeioseb@gmail.com`-ზე პირდაპირი გაგზავნა |
| რუკა | Google Maps key ან Leaflet | არსებული Forge proxy ვერ გადადის Vercel-ზე |
| დომენი | ჯერ არჩევა და ხელმისაწვდომობის შემოწმება | შესყიდვამდე საჭიროა ზუსტი სახელი და ფასი |

## დომენის პროცესის სტატუსი

Vercel კონექტორი ჩართულია. დომენის შეძენამდე საჭიროა ზუსტი დასახელება; შემდეგ შევამოწმებ ხელმისაწვდომობასა და ფასს. **შესყიდვა არ შესრულდება თქვენი ცალკე, პირდაპირი თანხმობის გარეშე** — Vercel წინასწარ აჩვენებს ფასს, გადასახადებსა და რეგისტრაციის პირობებს.

## წყაროები

- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
