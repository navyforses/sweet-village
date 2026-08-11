/**
 * Micro-ornaments: Georgian motifs drawn at French scale.
 * Everything is hairline (stroke-width 1), gold, and small — the tradition is
 * present as punctuation, never as wallpaper.
 */

const GOLD = "var(--sv-gold)";

/** Borjgali — the Georgian solar symbol, reduced to a spare radial mark. */
export function Borjgali({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={GOLD}
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true">
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 2.4v4M12 17.6v4M2.4 12h4M17.6 12h4" />
      <path d="M5.2 5.2 8 8M16 16l2.8 2.8M18.8 5.2 16 8M8 16l-2.8 2.8" />
    </svg>
  );
}

/** A grapevine tendril — Imereti is wine country. */
export function Vine({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={GOLD}
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true">
      <path d="M12 22V8" />
      <path d="M12 20c0-5 3.4-7.6 7.6-7.6-.8 4.2-3.4 6.8-7.6 7.6z" />
      <path d="M12 20c0-5-3.4-7.6-7.6-7.6.8 4.2 3.4 6.8 7.6 7.6z" />
      <path d="M12 9c0-2.6 1.7-4.3 3.4-5.1-.8 2.6-1.7 4.3-3.4 5.1z" />
    </svg>
  );
}

/** Horizontal rule with a centred motif. Used between major sections. */
export function SectionDivider({
  motif = "vine",
  className = "",
}: {
  motif?: "vine" | "borjgali";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-[var(--sv-gold)] opacity-25" />
      {motif === "vine" ? <Vine size={18} /> : <Borjgali size={18} />}
      <span className="h-px flex-1 bg-[var(--sv-gold)] opacity-25" />
    </div>
  );
}

/** Small gold dot used as an eyebrow marker before section labels. */
export function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[5px] w-[5px] shrink-0 bg-[var(--sv-gold)] ${className}`}
    />
  );
}
