# Verification Log

## 2026-08-12 — Vercel production domain and Blob assets

- `https://www.sweet-village.com/` returned **HTTP 200** over HTTPS with Vercel as the serving platform and HSTS enabled.
- `http://www.sweet-village.com/` returned a **308** redirect to `https://www.sweet-village.com/`.
- `https://sweet-village.com/` returned a **308** redirect to `https://www.sweet-village.com/`.
- The public home page rendered without an authentication wall. Browser verification confirmed the hero and gallery images load from `https://ps7b45pmn65x45ur.public.blob.vercel-storage.com/sweet-village/...`.
- The first visual capture occurred before the hero background image had finished loading; a subsequent browser view confirmed the rendered hero image and the visible Blob-backed card/gallery images.

## 2026-08-12 — Menu Blob asset verification

The public `/menu` page rendered all nine category controls, the 68-item menu count, search control, QR/share controls, and the visible cold-dishes grid. After image loading completed, the first displayed cards showed their dish images correctly. Their `src` values resolve to the same public Vercel Blob origin (`ps7b45pmn65x45ur.public.blob.vercel-storage.com/sweet-village/...`), confirming that the production menu is no longer dependent on `/manus-storage/` URLs for its rendered dish images.

## 2026-08-12 — Stay page Blob asset verification

The public `/stay` page returned the expected inventory summary of five units, 17 beds, and up to 22 guests. It displayed all five accommodation entries with their correct detail and booking links. Once image loading completed, visible cottage cards rendered their exterior images successfully from the same public Vercel Blob origin, including `stay-small-a-exterior.jpg`, `stay-small-b-exterior.jpg`, `stay-large-cottage-exterior.jpg`, and `stay-grand-exterior.jpg`.
