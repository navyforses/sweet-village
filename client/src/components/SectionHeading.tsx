import { Dot } from "./Ornaments";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Editorial default is left-aligned; centre only for full-width moments. */
  align?: "start" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  className = "",
}: Props) {
  const isCenter = align === "center";
  return (
    <header
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <p
          className={`sv-eyebrow mb-4 flex items-center gap-2.5 ${isCenter ? "justify-center" : ""}`}>
          <Dot />
          {eyebrow}
        </p>
      )}
      <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink">{title}</h2>
      {intro && (
        <p className="mt-5 max-w-[62ch] text-[0.975rem] text-muted-foreground">{intro}</p>
      )}
    </header>
  );
}

