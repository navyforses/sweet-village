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
```
