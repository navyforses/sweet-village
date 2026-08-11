import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { ChevronDown, Link2, Search, X } from "lucide-react";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";
import { SectionDivider } from "@/components/Ornaments";
import { DISHES } from "@/lib/assets";
import { MENU, categoryName, itemDesc, itemName, searchMenu } from "@/lib/menu";
import { useI18n } from "@/i18n";

/**
 * The live menu. This route is always a rendered page — never a PDF or an
 * image — so the QR code printed on a table never goes stale.
 */
export default function Menu() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([MENU[0].id]);
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

  // While searching, reveal every matching category.
  const effectiveOpen = query.trim() ? results.map(c => c.id) : open;

  const toggle = (id: string) =>
    setOpen(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      toast.success(t.menu.copied);
    } catch {
      toast.error(t.booking.errorBody);
    }
  };

  return (
    <div className="container py-16 md:py-20">
      <SectionHeading eyebrow={t.menu.eyebrow} title={t.menu.title} intro={t.menu.intro} />

      {/* Search — the fastest path through 68 items on a phone. */}
      <div className="relative mt-10 max-w-md">
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

      {results.length === 0 && (
        <p className="mt-12 text-[0.9375rem] text-muted-foreground">{t.menu.noResults}</p>
      )}

      {/* Accordion: one section per category, photo banner inside. */}
      <div className="mt-12 border-t border-line">
        {results.map(cat => {
          const isOpen = effectiveOpen.includes(cat.id);
          return (
            <section key={cat.id} className="border-b border-line">
              <h2>
                <button
                  type="button"
                  onClick={() => toggle(cat.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-16 w-full items-center justify-between gap-4 py-5 text-start">
                  <span className="flex items-baseline gap-3">
                    <span className="font-serif text-[1.125rem] text-ink md:text-[1.3125rem]">
                      {categoryName(cat, lang)}
                    </span>
                    <span className="text-[0.75rem] text-muted-foreground">
                      {cat.items.length}
                    </span>
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-turquoise transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                  />
                </button>
              </h2>

              {isOpen && (
                <div className="pb-8">
                  {DISHES[cat.id] && (
                    <img
                      src={DISHES[cat.id]}
                      alt={categoryName(cat, lang)}
                      loading="lazy"
                      className="mb-8 aspect-[21/9] w-full object-cover"
                    />
                  )}
                  <ul className="divide-y divide-line/70">
                    {cat.items.map(item => {
                      const desc = itemDesc(item, lang);
                      return (
                        <li
                          key={item.id}
                          className="flex items-baseline justify-between gap-5 py-4">
                          <div className="min-w-0">
                            <p className="text-[0.9375rem] text-ink">
                              {itemName(item, lang)}
                              {item.volume && (
                                <span
                                  dir="ltr"
                                  className="ms-2 text-[0.75rem] text-muted-foreground">
                                  {item.volume}
                                </span>
                              )}
                            </p>
                            {desc && (
                              <p className="mt-1.5 max-w-[62ch] text-[0.8125rem] text-muted-foreground">
                                {desc}
                              </p>
                            )}
                          </div>
                          {/* Dotted leader keeps the price legible across the row */}
                          <span className="flex shrink-0 items-baseline gap-3">
                            <span
                              aria-hidden="true"
                              className="hidden w-16 border-b border-dotted border-line sm:block"
                            />
                            <span className="font-serif text-[1rem] whitespace-nowrap text-ink">
                              {item.price} {t.common.lari}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
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
