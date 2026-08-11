import { Phone } from "lucide-react";
import { CONTACT } from "@shared/venue";
import { useI18n } from "@/i18n";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.22-4.94-4.42-.14-.19-1.16-1.55-1.16-2.96 0-1.4.73-2.09 1-2.38.24-.29.53-.34.72-.34.19 0 .39 0 .55.01.19.01.44-.07.68.53.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.29 2.33 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.09 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.37z" />
    </svg>
  );
}

/**
 * Persistent contact affordance. Bottom bar on phones (thumb reach), floating
 * stack on desktop. Present on every page — most guests here book by phone.
 */
export default function FloatingContact() {
  const { t } = useI18n();

  const waHref = `https://wa.me/${CONTACT.whatsapp}`;
  const telHref = `tel:${CONTACT.phone}`;

  return (
    <>
      {/* Phones: fixed bottom bar, two equal targets */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-line bg-white/97 backdrop-blur md:hidden">
        <a
          href={telHref}
          data-press
          className="flex min-h-14 items-center justify-center gap-2.5 border-e border-line text-[0.875rem] text-ink">
          <Phone className="size-4 text-turquoise" strokeWidth={1.5} />
          {t.common.call}
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-press
          className="flex min-h-14 items-center justify-center gap-2.5 text-[0.875rem] text-ink">
          <WhatsAppIcon className="size-4 text-[#25D366]" />
          {t.common.whatsapp}
        </a>
      </div>

      {/* Desktop: vertical stack, inline-end so it mirrors correctly in RTL */}
      <div className="fixed bottom-8 z-50 hidden flex-col gap-2.5 md:flex ltr:right-8 rtl:left-8">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-press
          aria-label={t.common.whatsapp}
          title={t.common.whatsapp}
          className="flex size-12 items-center justify-center border border-line bg-white text-[#25D366] transition-colors hover:border-[#25D366]">
          <WhatsAppIcon className="size-5" />
        </a>
        <a
          href={telHref}
          data-press
          aria-label={t.common.call}
          title={CONTACT.phoneDisplay}
          className="flex size-12 items-center justify-center border border-line bg-turquoise text-white transition-colors hover:bg-deep">
          <Phone className="size-5" strokeWidth={1.5} />
        </a>
      </div>
    </>
  );
}

