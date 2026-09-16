# Vercel გარემო ცვლადები

Vercel პროექტში დაამატეთ ეს მნიშვნელობები **Production**, **Preview** და **Development** გარემოებისთვის. არცერთი secret არ შეინახოთ Git-ში ან ჩატში.

| ცვლადი | დანიშნულება | სად მიიღება |
|---|---|---|
| `NEON_DATABASE_URL` | Neon PostgreSQL-ის connection string. Runtime-ში გამოიყენეთ pooled URL; migrations-ისას — direct URL. | Neon → Project → Connect |
| `RESEND_API_KEY` | Resend-ის *Sending access* API key. | Resend → API Keys |
| `RESEND_FROM_EMAIL` | დადასტურებული გამომგზავნი, მაგალითად `Sweet Village <bookings@updates.your-domain>` | Resend-ში domain verification-ის შემდეგ |
| `BLOB_READ_WRITE_TOKEN` | public Blob `sweetvillage`-ში 133 აქტივის ატვირთვის ერთჯერადი/ადმინისტრაციული token. | Vercel Blob store → Connect to Project |
| `VITE_SWEET_VILLAGE_ASSET_ORIGIN` | Blob manifest-ის `publicOrigin`; browser-ს უთითებს სადაა ფოტოები. | ატვირთვის სკრიპტის დასრულების შემდეგ |
| `VITE_GOOGLE_MAPS_API_KEY` | Browser key მხოლოდ Maps JavaScript API-სთვის. | Google Cloud Console |
| `ADMIN_PASSWORD_HASH` | მფლობელის ადმინპანელის (`/admin`) პაროლის scrypt ჰეში. თავად პაროლი არსად ინახება. | `pnpm admin:hash-password` (პაროლს ტერმინალში ფარულად ითხოვს) |
| `ADMIN_SESSION_SECRET` | ადმინის სესიის (JWT cookie) ხელმოწერის საიდუმლო, მინიმუმ 32 სიმბოლო. შეცვლა ყველა აქტიურ სესიას აუქმებს. | `openssl rand -base64 48` |
| `VERCEL_DEPLOY_HOOK_URL` | Deploy Hook-ის URL: ადმინში შენახვის შემდეგ საიტი ხელახლა იწყობა, რომ Google-ისთვის სტატიკური გვერდები (title, აღწერა, ტექსტი, sitemap) მფლობელის ბოლო ცვლილებებს ასახავდეს. მის გარეშე სტატიკური ვერსია მხოლოდ შემდეგ deploy-ზე განახლდება. | Vercel → Project → Settings → Git → Deploy Hooks → Create Hook (ბრენჩი `main`) |
| `CRON_SECRET` | ღამის 03:00 UTC cron (`/api/cron-publish`) ამ საიდუმლოთი ავთენტიფიცირდება და, თუ შენახული კონტენტი ბოლო build-ზე ახალია, deploy hook-ს იძახებს. | `openssl rand -base64 32` (Vercel ავტომატურადაც ქმნის cron-ის ჩართვისას) |
| `ANTHROPIC_API_KEY` | ადმინპანელის „თარგმნე ყველა ენაზე“ ღილაკი — Claude API-ით ავტომატური თარგმანი 5 ენაზე. | console.anthropic.com → API Keys (დააყენეთ თვიური ხარჯის ლიმიტი) |

## ადმინპანელი

`/admin` არის მფლობელის მართვის პანელი (ფასები, ფოტოები, სახელები, კონტაქტი). ის მუშაობს მხოლოდ მაშინ, როცა `NEON_DATABASE_URL`, `ADMIN_PASSWORD_HASH` და `ADMIN_SESSION_SECRET` სამივე დაყენებულია და Neon-ში მიგრაცია გაშვებულია (`pnpm db:neon:migrate`). სანამ ბაზა არ არის, საიტი კოდში ჩაწერილ default მნიშვნელობებს აჩვენებს და ადმინი შესვლისას „ბაზა არ არის კონფიგურირებული“ შეტყობინებას აჩვენებს.

`ADMIN_PASSWORD_HASH` `$` სიმბოლოებს შეიცავს — Vercel-ის UI-ში პირდაპირ ჩასვით; CLI-ში (`vercel env add`) ერთმაგ ბრჭყალებში მოაქციეთ.

## აუცილებელი შეზღუდვები

Neon-ის runtime URL-ს უნდა ჰქონდეს pooler host; მიგრაციებისთვის გამოიყენება პირდაპირი URL. `RESEND_FROM_EMAIL` იმუშავებს მხოლოდ Resend-ში დადასტურებული domain/subdomain-იდან. `VITE_GOOGLE_MAPS_API_KEY` ტექნიკურად ხილულია browser-ში, ამიტომ Google Cloud Console-ში შეზღუდეთ მხოლოდ HTTP referrer-ებით: საბოლოო domain, მისი `www` ვარიანტი და Vercel preview domain-ები; API restriction-ში ჩართეთ მხოლოდ **Maps JavaScript API**.

## ბრძანებები

```bash
# წინასწარ მხოლოდ თქვენს უსაფრთხო shell გარემოში:
export NEON_DATABASE_URL='postgresql://...'
pnpm db:neon:generate
pnpm db:neon:migrate

# Blob store-ის დაკავშირებისა და token-ის უსაფრთხოდ მიწოდების შემდეგ:
pnpm assets:migrate:vercel-blob

# ადმინის პაროლის ჰეში (პაროლს ფარულად ითხოვს, ბრძანების ხაზში არასდროს წეროთ):
pnpm admin:hash-password

# ლოკალურად ადმინისა და API-ს გასაშვებად (.env.local-ში იგივე ცვლადებით):
pnpm dev:api
```
