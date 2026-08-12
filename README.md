# Sweet Village / ტკბილი სოფელი — AI Project Map

> **Read this first.** This is the root documentation file for the Sweet Village website. It is written for AI agents and developers who need to understand the entire project before making a change. Treat the codebase as a multilingual hospitality product, not as a generic template.

## 1. Product definition

**Sweet Village / ტკბილი სოფელი** is a six-language hospitality website for a countryside property in **Kvilishori, near Tskaltubo, Georgia**. The property offers cottages and rooms, a pool, a restaurant/café-bar, a covered outdoor event space, and a digital restaurant menu. The website has two intentionally distinct audience priorities: Georgian visitors commonly plan celebrations, pool visits, and dining; international visitors commonly search for accommodation, location, and nearby destinations.

| Product attribute | Current implementation |
|---|---|
| Public pages | Home, Stay, accommodation details, Menu, Events, Pool, Location, About, Booking, Not Found |
| Core inventory | 5 accommodation units; 17 beds; up to 22 guests across the property |
| Menu | 68 dishes across 9 categories, with photos, descriptions, translations, search, share link, and QR code |
| Languages | Georgian `ka`, English `en`, Russian `ru`, Arabic `ar` with RTL, French `fr`, Spanish `es` |
| Contact behavior | Booking request + WhatsApp fallback + owner email target |
| Owner booking address | `iobidzeioseb@gmail.com` |
| Current production website | `https://www.sweet-village.com/` on Vercel |
| Legacy managed deployment | `https://sweetvillage-pdzcphmy.manus.space` |
| GitHub source repository | `navyforses/sweet-village`, branch `main` |

## 2. Non-negotiable product rules

The following rules are business and UX constraints, not optional implementation details.

1. **Never remove the six-language architecture.** The language switcher uses native language names and no flags. Arabic must retain full `dir="rtl"` support.
2. **Keep the home-page segmentation.** Georgian content prioritizes events, pool, and restaurant experiences. The other five languages prioritize accommodation and location.
3. **Never invent reviews, ratings, testimonials, availability, booking confirmations, or guest content.** A booking is a request, not a real-time confirmed reservation.
4. **Keep the visual identity.** Use pistachio `#93A889`, turquoise `#5C8D89`, warm off-white `#F9F8F6`, and gold `#D4AF37`; Noto fonts; square cards; editorial grids; and restrained Imeretian/French ornament influences.
5. **Preserve desktop and mobile quality equally.** Neither platform is secondary.
6. **Keep `/menu` as a live shareable page.** The QR code must point to the page route, not a static PDF or image.
7. **Do not put large images inside the repository.** Images live outside the project during Manus development and are represented by URLs in code.

## 3. Primary route map

`client/src/App.tsx` is the authoritative public route registry. All routes render inside `Layout`, under `I18nProvider`, `ThemeProvider`, error handling, tooltips, and toasts.

| Route | Component | Main purpose | Key supporting files |
|---|---|---|---|
| `/` | `client/src/pages/Home.tsx` | Language-sensitive landing page and main conversion paths | `shared/venue.ts`, `client/src/i18n/*`, `client/src/lib/assets.ts` |
| `/stay` | `client/src/pages/Stay.tsx` | Inventory overview, guest filters, prices, and booking entry points | `shared/venue.ts` |
| `/stay/:unitId` | `client/src/pages/AccommodationDetail.tsx` | Individual cottage/room gallery and preselected booking path | `shared/venue.ts` |
| `/menu` | `client/src/pages/Menu.tsx` | 68-item menu, category navigation, search, share, QR | `shared/menuData.ts`, `shared/menuDescriptions.ts`, `shared/menuTranslations.ts` |
| `/events` | `client/src/pages/Events.tsx` | Weddings, engagements, birthdays, and corporate events | `shared/venue.ts` |
| `/pool` | `client/src/pages/Pool.tsx` | Day-use pool information and visitor rules | `shared/venue.ts` |
| `/location` | `client/src/pages/Location.tsx` | Map, nearby places, and distance table | `client/src/components/Map.tsx`, `client/src/lib/loadMaps.ts` |
| `/about` | `client/src/pages/About.tsx` | Property story and positioning | `client/src/i18n/authenticCopy.ts` |
| `/booking` | `client/src/pages/Booking.tsx` | Booking request form and WhatsApp fallback | `shared/booking.ts`, `server/booking.ts`, `api/booking.ts` |
| `/404` | `client/src/pages/NotFound.tsx` | Not-found page | `client/src/components/Ornaments.tsx` |
| `/migration` | `client/src/pages/BlobMigration.tsx` | **Temporary Vercel Blob migration utility. Do not expose as a customer feature.** | `api/migrate-assets.ts` |

### Global layout and reusable UI

| File or area | Responsibility |
|---|---|
| `client/src/components/Layout.tsx` | Shared page frame and public-site composition |
| `client/src/components/SiteHeader.tsx` | Primary navigation and desktop header |
| `client/src/components/SiteFooter.tsx` | Shared footer and location/contact context |
| `client/src/components/LanguageSwitcher.tsx` | Six-language selection in native scripts |
| `client/src/components/FloatingContact.tsx` | Persistent phone and WhatsApp buttons |
| `client/src/components/Map.tsx` | Existing Manus-compatible map component/fallback support |
| `client/src/components/ShareButton.tsx` | Share/copy behavior for menu and public links |
| `client/src/components/Ornaments.tsx` | Decorative SVG motifs; keep them subtle and non-blocking |
| `client/src/index.css` | Design tokens, typography, responsive behavior, RTL-related styling |

## 4. Internationalization system

The i18n provider is `client/src/i18n/index.tsx`. It imports the six locale modules and exposes `useI18n()` to UI code.

```text
Priority of language detection:
1. ?lang=<supported-language> in the URL
2. localStorage key "sv-lang"
3. Browser language list
4. Georgian fallback (ka)
```

Changing language updates `document.documentElement.lang`, `document.documentElement.dir`, document title, and meta description. Arabic is identified as RTL in `client/src/i18n/types.ts`; do not replace logical CSS properties with hard-coded left/right styling.

| Location | Content |
|---|---|
| `client/src/i18n/locales/ka.ts` | Georgian source dictionary |
| `client/src/i18n/locales/en.ts` | English dictionary |
| `client/src/i18n/locales/ru.ts` | Russian dictionary |
| `client/src/i18n/locales/ar.ts` | Arabic dictionary and RTL content |
| `client/src/i18n/locales/fr.ts` | French dictionary |
| `client/src/i18n/locales/es.ts` | Spanish dictionary |
| `client/src/i18n/authenticCopy.ts` | Facebook-researched authentic message overlays and key copy |
| `client/src/i18n/types.ts` | Supported language constants, language labels, RTL and local-segment helpers |

## 5. Canonical content and data sources

Do not duplicate business facts in components. The following files are the project’s source of truth.

| Domain | Canonical files | Notes for AI edits |
|---|---|---|
| Accommodation, event, pool, location facts | `shared/venue.ts` | Includes units, capacities, galleries, prices, event types, pool rules, and destination distances. Confirm business facts before changing. |
| Menu item identity and pricing | `shared/menuData.ts` | Keep all 68 IDs stable; UI and translations depend on them. |
| Menu descriptions | `shared/menuDescriptions.ts` | Used for compact, card-oriented menu UX. |
| Menu translations | `shared/menuTranslations.ts` | Preserve all six language entries when editing an item. |
| Booking validation and message formatting | `shared/booking.ts` | Shared by the UI and Vercel booking API. Update tests if validation changes. |
| Legacy/Manus booking persistence | `server/booking.ts`, `server/db.ts`, `server/routers.ts` | Current managed-runtime flow. |
| Vercel/Neon/Resend booking flow | `api/booking.ts`, `drizzle/neonSchema.ts`, `drizzle.neon.config.ts` | Prepared code; requires environment variables and a real Neon migration. |

### Accommodation model

The property has **five bookable units**. The exact IDs, display text, galleries, capacity logic, and indicative price data live in `shared/venue.ts`.

| Unit group | Customer-facing summary |
|---|---|
| Two small cottages | Two guests each; up to four with sofa use |
| Large Cottage — Room A | Four guests across two levels |
| Large Cottage — Room B | Four guests across two levels |
| Grand room | Five beds; up to six with sofa use |

Do not present the property as six cottages. The current, confirmed product model is **five units**.

## 6. Media and asset system

`client/src/lib/assets.ts` is the frontend photo registry. `client/src/lib/assetUrl.ts` resolves legacy `/manus-storage/...` paths and has scaffolding for a Vercel Blob origin. Asset file names are intentionally stable after the random Manus suffix is removed.

| Asset location | Meaning |
|---|---|
| `/home/ubuntu/webdev-static-assets/sweet-village/` | Local working archive for the 133 project image assets; not deployed from the Git repository |
| GitHub Release `sweet-village-assets-2026-08` | Archive of the 133 source images, approximately 572 MB |
| `/manus-storage/...` URLs | Legacy Manus asset URLs retained in source for legacy/runtime compatibility |
| Vercel Blob store `sweetvillage` | Production media store. Public assets are served from `ps7b45pmn65x45ur.public.blob.vercel-storage.com/sweet-village/...` |
| `scripts/migrate-assets-to-vercel-blob.mjs` | Manual CLI migration tool; requires a valid Blob token outside source control |
| `scripts/migrate-remote-assets-during-build.mjs` | Historical build-time migration helper; production assets are already available in Blob |
| `api/migrate-assets.ts`, `client/src/pages/BlobMigration.tsx` | Temporary migration experiment; not a customer-facing feature and should be removed in a later cleanup task |

> **Media safety rule.** Never hard-code a new image URL in a random page. Put it in the registry or the relevant shared data file first, then reference the canonical identifier.

## 7. Booking flow

### Current managed-runtime flow

The `/booking` form validates customer input, creates a WhatsApp message link, persists the booking lead in the managed database, and sends the owner notification through the current managed runtime. The existing logic is centered on `server/booking.ts` and `server/routers.ts`.

### Prepared Vercel flow

`api/booking.ts` is a Vercel serverless endpoint. It accepts only `POST`, validates through `shared/booking.ts`, inserts the request into Neon PostgreSQL, and sends an email through Resend to `iobidzeioseb@gmail.com`.

```text
Browser form
  -> POST /api/booking
  -> shared/booking.ts validation and text formatting
  -> Neon PostgreSQL: bookings table
  -> Resend email to property owner
  -> JSON response with WhatsApp fallback link
```

The Vercel handler is deployed and its public validation path has been verified with a controlled HTTP 422 response. Persistence and email delivery are **not yet operational** until Neon and Resend are configured and tested. Do not claim that Vercel booking emails are live before those steps complete.

## 8. Maps

The site must keep a useful location experience even if an interactive map fails. The existing managed runtime uses a proxy/fallback approach. For Vercel, `client/src/lib/loadMaps.ts` is designed to use `VITE_GOOGLE_MAPS_API_KEY` and retain fallback behavior. A public Google browser key must be restricted by HTTP referrer and limited to Maps JavaScript API.

## 9. Repository structure

```text
sweet-village/
├── client/
│   └── src/
│       ├── components/            # shared public UI, header/footer/contact/map
│       ├── i18n/                  # provider, six locale dictionaries, authentic copy
│       ├── lib/                   # assets, URLs, maps, tRPC helpers
│       ├── pages/                 # route-level screens
│       ├── App.tsx                # route registry
│       └── index.css              # design system and global CSS
├── shared/                         # business data and validation shared across runtimes
├── server/                         # current Manus/Express/tRPC implementation
│   └── _core/                      # managed platform integration layer; edit cautiously
├── api/                            # Vercel serverless endpoints and migration utilities
├── drizzle/                        # existing MySQL schema plus Neon schema
├── scripts/                        # media migration/QA scripts
├── VERCEL_ENVIRONMENT.md           # required Vercel variable checklist
├── HANDOVER.md                     # owner-oriented operational handover
├── todo.md                         # historical and current work ledger
├── vercel.json                     # Vercel SPA/function routing configuration
└── README.md                       # this AI-readable map
```

## 10. Environment variables and secrets

Never put real values in Git, source code, screenshots, or chat. `VERCEL_ENVIRONMENT.md` is the detailed setup checklist.

| Variable | Used by | Status / purpose |
|---|---|---|
| `DATABASE_URL` | Current Manus server | Existing MySQL/TiDB managed runtime |
| `NEON_DATABASE_URL` | `api/booking.ts`, Neon migrations | Required for Vercel booking persistence; not configured yet |
| `RESEND_API_KEY` | `api/booking.ts` | Required for Vercel booking email; not configured yet |
| `RESEND_FROM_EMAIL` | `api/booking.ts` | Verified sender identity required; not configured yet |
| `BLOB_READ_WRITE_TOKEN` | Blob scripts and Vercel build migration | Connected in Vercel; do not reveal or commit it |
| `VITE_SWEET_VILLAGE_ASSET_ORIGIN` | `client/src/lib/assetUrl.ts` | Blob public origin; production currently renders public Blob URLs successfully |
| `VITE_GOOGLE_MAPS_API_KEY` | `client/src/lib/loadMaps.ts` | Browser-visible but referrer-restricted Google Maps key |

## 11. Deployment and migration state

| Area | Current status | Safe next action |
|---|---|---|
| Production domain | `https://www.sweet-village.com/` | Live on Vercel; HTTP and apex domain both redirect permanently to this canonical HTTPS URL |
| GitHub sync | `main` is the deployment source | Use a checkpoint for project changes; it synchronizes GitHub |
| Vercel project | Live and connected to the purchased domain | Treat the Vercel deployment as the current production website |
| Vercel Blob store | `sweetvillage` is active | Home, Menu, and Stay verification confirms Blob-backed production assets |
| Vercel media migration | Completed for production-rendered assets | See `VERIFICATION_LOG.md`; remove temporary migration utilities only in a dedicated cleanup task |
| Neon + Resend | Architecture and code prepared | Create/configure services and run end-to-end booking QA before enabling production claims |
| Custom domain | Purchased and connected | Canonical production URL is `https://www.sweet-village.com/` |

## 12. QA and tests

Run the following before committing feature changes:

```bash
pnpm test
pnpm check
```

The current suite covers booking validation, booking API behavior, menu completeness, venue/inventory data, maps proxy behavior, authentic copy, asset URL resolution, Blob migration source integrity, and client-side map loading. The most recent local baseline is **61 passing tests and 1 opt-in live Blob credential test skipped** because it requires a real token outside the local sandbox.

Visual QA must cover desktop, mobile, and Arabic RTL for any touched public page. Text changes also require checking that each changed user-facing message exists in all six locale files or is intentionally language-specific.

### Latest production verification

The current public domain has been checked in a browser and through HTTP headers. The `www` HTTPS URL responds with HTTP 200 and HSTS; the HTTP URL and apex domain redirect with HTTP 308 to the canonical `https://www.sweet-village.com/`. Home hero/gallery, visible menu cards, and visible stay cards load from the public Vercel Blob origin. See `VERIFICATION_LOG.md` for the timestamped verification notes.

## 13. Safe change procedure for AI agents

1. Read this README, `todo.md`, and the relevant canonical data file before editing.
2. Add the requested change to `todo.md` as an unchecked item before implementation.
3. Change the smallest relevant source-of-truth file. Avoid copy-pasting values into page components.
4. Update all six locale variants if the copy is shared across languages.
5. Add or update a Vitest test for behavior/data changes.
6. Run `pnpm test` and `pnpm check`; inspect the relevant page at desktop and mobile widths.
7. Mark the `todo.md` item complete only after validation.
8. Before a checkpoint, reread `todo.md`. Save a checkpoint with a clear description; the project automatically synchronizes to GitHub `main`.
9. Do not disclose secrets. Ask for credentials only through the secure project-secret flow.

## 14. Where to edit common requests

| Request | First file to inspect | Usually also affects |
|---|---|---|
| Change a cottage price/capacity/gallery | `shared/venue.ts` | locales, Stay/Accommodation detail tests |
| Add or change a menu dish | `shared/menuData.ts` | descriptions, translations, photo registry, menu tests |
| Change page text | `client/src/i18n/locales/ka.ts` | five other locale files and possibly `authenticCopy.ts` |
| Change home priority/sections | `client/src/pages/Home.tsx` | i18n keys and responsive QA |
| Change navigation or language menu | `client/src/components/SiteHeader.tsx` | `LanguageSwitcher.tsx`, RTL QA |
| Change booking fields/validation | `shared/booking.ts` | `Booking.tsx`, `server/booking.ts`, `api/booking.ts`, tests |
| Change owner email | `api/booking.ts` and managed booking implementation | never expose address or API key unnecessarily |
| Replace a site image | `client/src/lib/assets.ts` or `shared/venue.ts` | Blob/media migration plan and visual QA |
| Change SEO title/description | relevant locale dictionaries | render and inspect each target language |
| Continue Vercel migration | `VERCEL_ENVIRONMENT.md`, `vercel.json`, `api/`, `scripts/` | verify live build logs before new code changes |

## 15. Owner-facing documents

`HANDOVER.md` remains the short, Georgian-language operational handover for the property owner. This `README.md` is the engineering and AI-operational map. Keep the two documents complementary: do not turn the handover into raw implementation documentation, and do not remove practical ownership notes from it.

---

**Last documentation update:** August 2026. The definitive current code state is always GitHub `main`; this README describes the structure and known operating state at the time of its latest commit.
