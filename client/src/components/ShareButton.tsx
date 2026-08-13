import { Facebook, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/i18n";

/**
 * Facebook is where this venue's audience already lives, so every page gets a
 * share affordance plus a plain copy-link fallback.
 */
export default function ShareButton({ className = "" }: { className?: string }) {
  const { t } = useI18n();

  const url = typeof window === "undefined" ? "" : window.location.href;

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=640,height=560",
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t.menu.copied);
    } catch {
      toast.error(t.booking.errorBody);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className="sv-eyebrow">{t.footer.share}</span>
      <button
        type="button"
        onClick={shareFacebook}
        aria-label="Facebook"
        className="sv-touch-target flex items-center justify-center border border-line bg-white text-ink transition-colors hover:border-pistachio hover:text-turquoise">
        <Facebook className="size-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={copy}
        aria-label={t.menu.copyLink}
        className="sv-touch-target flex items-center justify-center border border-line bg-white text-ink transition-colors hover:border-pistachio hover:text-turquoise">
        <Link2 className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

