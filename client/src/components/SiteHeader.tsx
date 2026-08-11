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
      <div className="container flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={t.brand.name}>
          <Borjgali size={20} />
          <span className="font-serif text-[1.0625rem] tracking-[0.1em] text-ink">
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

        <div className="flex items-center gap-2.5">
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
            className="flex size-11 items-center justify-center border border-line bg-white text-ink lg:hidden">
            {open ? (
              <X className="size-4" strokeWidth={1.5} />
            ) : (
              <Menu className="size-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper lg:hidden">
          <div className="container flex flex-col py-2">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`min-h-13 flex items-center border-b border-line/70 text-[0.9375rem] ${
                  location === l.href ? "text-turquoise" : "text-ink"
                }`}>
                {l.label}
              </Link>
            ))}
            <Link
              href="/booking"
              data-press
              className="mt-4 mb-3 flex min-h-13 items-center justify-center bg-turquoise text-[0.9375rem] text-white">
              {t.nav.book}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
