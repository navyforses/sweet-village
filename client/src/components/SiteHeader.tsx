import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Borjgali } from "./Ornaments";
import { isLocalSegment, useI18n } from "@/i18n";

export default function SiteHeader() {
  const { t, lang } = useI18n();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** Locals want events and the pool first; travellers want a bed. */
  const links = isLocalSegment(lang)
    ? [
        { href: "/events", label: t.nav.events },
        { href: "/pool", label: t.nav.pool },
        { href: "/menu", label: t.nav.menu },
        { href: "/stay", label: t.nav.stay },
        { href: "/location", label: t.nav.location },
        { href: "/about", label: t.nav.about },
      ]
    : [
        { href: "/stay", label: t.nav.stay },
        { href: "/menu", label: t.nav.menu },
        { href: "/location", label: t.nav.location },
        { href: "/pool", label: t.nav.pool },
        { href: "/events", label: t.nav.events },
        { href: "/about", label: t.nav.about },
      ];

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-paper/96 backdrop-blur" : "border-transparent bg-paper"
      }`}>
      <div className="container flex h-16 items-center justify-between gap-2 md:h-[4.5rem] md:gap-4">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2.5 md:gap-3" aria-label={t.brand.name}>
          <Borjgali size={20} />
          <span className="truncate font-serif text-[0.9375rem] tracking-[0.075em] text-ink min-[390px]:text-[1rem] md:text-[1.0625rem] md:tracking-[0.1em]">
            {t.brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`sv-link-underline text-[0.8125rem] transition-colors ${
                location === l.href ? "text-turquoise" : "text-ink hover:text-wine"
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
          <LanguageSwitcher compact />
          <Link
            href="/booking"
            data-press
            className="hidden min-h-11 items-center bg-turquoise px-6 text-[0.8125rem] text-white transition-colors hover:bg-deep sm:flex">
            {t.nav.book}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? t.common.close : t.nav.home}
            aria-expanded={open}
            className="sv-touch-target flex items-center justify-center border border-line bg-white text-ink lg:hidden">
            {open ? (
              <X className="size-4" strokeWidth={1.5} />
            ) : (
              <Menu className="size-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-line bg-paper/98 backdrop-blur-md md:top-[4.5rem] lg:hidden">
          <div className="container flex min-h-full flex-col py-4 sv-safe-bottom">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex min-h-14 items-center justify-between border-b border-line/70 text-[1rem] ${
                  location === l.href ? "text-turquoise" : "text-ink"
                }`}>
                {l.label}
                <span aria-hidden="true" className="text-turquoise">→</span>
              </Link>
            ))}
            <Link
              href="/booking"
              data-press
              className="mt-auto flex min-h-14 items-center justify-center bg-turquoise px-6 text-[1rem] text-white">
              {t.nav.book}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
