import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Borjgali, SectionDivider } from "./Ornaments";
import { CONTACT } from "@shared/venue";
import { useI18n } from "@/i18n";

export default function SiteFooter() {
  const { t } = useI18n();

  const pages = [
    { href: "/stay", label: t.nav.stay },
    { href: "/menu", label: t.nav.menu },
    { href: "/events", label: t.nav.events },
    { href: "/pool", label: t.nav.pool },
    { href: "/location", label: t.nav.location },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <footer className="mt-16 border-t border-line bg-white pb-28 md:mt-24 md:pb-14">
      <div className="container pt-12 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Borjgali size={18} />
              <span className="font-serif text-[1.0625rem] tracking-[0.1em] text-ink">
                {t.brand.name}
              </span>
            </div>
            <p className="sv-eyebrow">{t.brand.tagline}</p>
            <p className="mt-5 max-w-[38ch] text-[0.875rem] text-muted-foreground">
              {t.location.addressValue}
            </p>
          </div>

          <div>
            <h3 className="sv-eyebrow mb-5">{t.footer.explore}</h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 md:block md:space-y-3">
              {pages.map(p => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="sv-link-underline flex min-h-11 items-center text-[0.875rem] text-ink hover:text-wine">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="sv-eyebrow mb-5">{t.footer.contact}</h3>
            <ul className="space-y-3.5 text-[0.875rem]">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex min-h-11 items-center gap-2.5 text-ink hover:text-wine">
                  <Phone className="size-3.5 shrink-0 text-turquoise" strokeWidth={1.5} />
                  <span dir="ltr">{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex min-h-11 items-center gap-2.5 break-all text-ink hover:text-wine">
                  <Mail className="size-3.5 shrink-0 text-turquoise" strokeWidth={1.5} />
                  <span dir="ltr">{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-turquoise" strokeWidth={1.5} />
                {t.location.openValue}
              </li>
            </ul>

            <h3 className="sv-eyebrow mt-8 mb-4">{t.footer.follow}</h3>
            <div className="flex gap-2.5">
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="sv-touch-target flex items-center justify-center border border-line text-ink transition-colors hover:border-pistachio hover:text-turquoise">
                <Facebook className="size-4" strokeWidth={1.5} />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="sv-touch-target flex items-center justify-center border border-line text-ink transition-colors hover:border-pistachio hover:text-turquoise">
                <Instagram className="size-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <SectionDivider motif="borjgali" className="mt-14" />
        <p className="mt-6 text-center text-[0.75rem] text-muted-foreground">
          © {new Date().getFullYear()} {t.brand.name} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

