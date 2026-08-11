import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Link2, Search, X } from "lucide-react";
import { toast } from "sonner";
import { SectionDivider } from "@/components/Ornaments";
import { menuItemPhoto } from "@/lib/assets";
import { MENU, categoryName, itemDesc, itemName, searchMenu } from "@/lib/menu";
import { useI18n } from "@/i18n";

/**
 * The live menu. This route is always a rendered page — never a PDF or an
 * image — so the QR code printed on a table never goes stale.
 */
export default function Menu() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(MENU[0].id);
  const [qr, setQr] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const menuUrl = useMemo(() => {
    if (typeof window === "undefined") return "/menu";
    return `${window.location.origin}/menu`;
  }, []);

  useEffect(() => {
    QRCode.toDataURL(menuUrl, {
      width: 320,
      margin: 1,
      color: { dark: "#2C3531", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, [menuUrl]);

  const results = useMemo(() => searchMenu(query, lang), [query, lang]);
  const isSearching = Boolean(query.trim());
  const visibleCategories = isSearching
    ? results
    : results.filter(category => category.id === activeCategory);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      toast.success(t.menu.copied);
    } catch {
      toast.error(t.booking.errorBody);
    }
  };

  return (
    <div className="container py-12 md:py-16">
      {/* Compact heading: the food is the primary visual, not a page-sized cover. */}
      <header className="max-w-[56rem] border-s-2 border-gold/70 ps-5 md:ps-7">
        <p className="sv-eyebrow">{t.menu.eyebrow}</p>
        <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[0.98] text-ink">
          {t.menu.title}
        </h1>
        <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-7 text-muted-foreground">
          {t.menu.intro}
        </p>
      </header>

      <div className="mt-9 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <p className="order-2 text-[0.75rem] leading-5 text-muted-foreground lg:order-1">
          {MENU.reduce((sum, category) => sum + category.items.length, 0)} {t.menu.title.toLowerCase()}
        </p>
        {/* Search — the fastest path through 68 items on a phone. */}
        <div className="relative order-1 lg:order-2">
        <Search
          className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-4 rtl:right-4"
          strokeWidth={1.5}
        />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.menu.searchPlaceholder}
          className="min-h-12 w-full border border-line bg-white text-[0.9375rem] text-ink placeholder:text-muted-foreground focus:border-pistachio focus:outline-none ltr:pe-4 ltr:ps-11 rtl:pe-11 rtl:ps-4"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t.common.close}
            className="absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground ltr:right-2 rtl:left-2">
            <X className="size-4" strokeWidth={1.5} />
          </button>
        )}
        </div>
      </div>

      {/* Persistent local navigation: categories stay immediately available. */}
      <nav
        aria-label={t.menu.title}
        className="mt-8 -mx-4 border-y border-line bg-paper px-4 py-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible" role="tablist">
          {MENU.map(category => {
            const selected = !isSearching && activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setQuery("");
                  setActiveCategory(category.id);
                }}
                className={`min-h-10 shrink-0 border px-4 text-[0.8125rem] transition-colors ${
                  selected
                    ? "border-turquoise bg-turquoise text-white"
                    : "border-line bg-white text-ink hover:border-pistachio"
                }`}>
                {categoryName(category, lang)}
                <span className="ms-2 text-[0.6875rem] opacity-70">{category.items.length}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {results.length === 0 && (
        <p className="mt-12 text-[0.9375rem] text-muted-foreground">{t.menu.noResults}</p>
      )}

      {/* Cards replace the long accordion: several dishes are visible at once. */}
      <div className="mt-10 space-y-12 md:mt-12">
        {visibleCategories.map(category => (
          <section key={category.id} aria-labelledby={`menu-category-${category.id}`}>
            <div className="mb-5 flex items-baseline justify-between border-b border-ink/15 pb-3">
              <h2 id={`menu-category-${category.id}`} className="font-serif text-[1.5rem] text-ink md:text-[1.75rem]">
                {categoryName(category, lang)}
              </h2>
              <span className="sv-eyebrow text-[0.625rem]">{category.items.length}</span>
            </div>

            <ul className="sv-stagger grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {category.items.map(item => {
                const desc = itemDesc(item, lang);
                const title = itemName(item, lang);
                return (
                  <li key={item.id} className="sv-card flex min-w-0 flex-col overflow-hidden">
                    <img
                      src={menuItemPhoto(item.id, category.id)}
                      alt={title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="flex min-h-[8.25rem] flex-1 flex-col p-3 sm:min-h-[9.5rem] sm:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-[0.9375rem] leading-[1.15] text-ink sm:text-[1.0625rem]">
                          {title}
                        </h3>
                        <span className="shrink-0 border border-gold/45 px-1.5 py-0.5 font-serif text-[0.875rem] leading-none text-ink">
                          {item.price} <span className="font-sans text-[0.625rem]">{t.common.lari}</span>
                        </span>
                      </div>
                      {item.volume && (
                        <p dir="ltr" className="mt-1 text-[0.6875rem] text-muted-foreground">
                          {item.volume}
                        </p>
                      )}
                      {desc && (
                        <p className="mt-2 line-clamp-2 text-[0.6875rem] leading-[1.45] text-muted-foreground sm:text-[0.75rem]">
                          {desc}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 text-[0.8125rem] text-muted-foreground">{t.menu.noAlcoholNote}</p>

      <SectionDivider motif="vine" className="mt-16" />

      {/* QR block — both the code and the copied link resolve to /menu. */}
      <section className="mt-14 grid items-center gap-10 border border-line bg-white p-8 md:grid-cols-[auto_1fr] md:p-12">
        <div className="mx-auto">
          {qr ? (
            <img
              src={qr}
              alt={t.menu.qrTitle}
              width={176}
              height={176}
              className="border border-line"
            />
          ) : (
            <div className="size-44 border border-line bg-muted" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div>
          <h2 className="text-[1.25rem] text-ink">{t.menu.qrTitle}</h2>
          <p className="mt-3 max-w-[54ch] text-[0.9375rem] text-muted-foreground">
            {t.menu.qrBody}
          </p>
          <p
            dir="ltr"
            className="mt-5 border border-line bg-paper px-4 py-3 font-mono text-[0.8125rem] break-all text-ink">
            {menuUrl}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyLink}
              data-press
              className="flex min-h-12 items-center gap-2.5 bg-turquoise px-6 text-[0.875rem] text-white transition-colors hover:bg-deep">
              <Link2 className="size-4" strokeWidth={1.5} />
              {t.menu.copyLink}
            </button>
            {qr && (
              <a
                href={qr}
                download="sweet-village-menu-qr.png"
                data-press
                className="flex min-h-12 items-center border border-line px-6 text-[0.875rem] text-ink transition-colors hover:border-pistachio">
                QR · PNG
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
