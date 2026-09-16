import { Dot } from "./Ornaments";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Editorial default is left-aligned; centre only for full-width moments. */
  align?: "start" | "center";
  className?: string;
  /** Page titles render as the page's single <h1>; section titles stay <h2>. */
  as?: "h1" | "h2";
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  className = "",
  as: Heading = "h2",
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
      <Heading className="text-[clamp(1.5rem,6.8vw,2.4rem)] leading-[1.16] text-ink">{title}</Heading>
      {intro && (
        <p className="mt-4 max-w-[62ch] text-[0.9375rem] text-muted-foreground md:mt-5 md:text-[0.975rem]">{intro}</p>
      )}
    </header>
  );
}

