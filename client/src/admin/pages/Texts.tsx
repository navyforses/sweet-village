import { Link } from "wouter";
import { ArrowUpRight, Type } from "lucide-react";
import { DICTS } from "@/i18n";
import { LANGS } from "@shared/langs";
import { useSection } from "../api";
import { collectLeaves } from "../lib/textPatch";
import { S } from "../strings";
import { TEXT_SECTIONS, textSectionLabel } from "../textSections";

/** Section picker for the page-text editor, with a count of owner overrides per section. */
export default function Texts() {
  const query = useSection("texts");
  const texts = query.data?.value ?? {};

  return (
    <div>
      <h2 className="text-[1.35rem] text-ink">{S.texts.title}</h2>
      <p className="mt-2 max-w-[70ch] text-[0.875rem] text-muted-foreground">{S.texts.intro}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {TEXT_SECTIONS.map(section => {
          const leaves = collectLeaves(DICTS, section);
          const overridden = LANGS.some(lang => texts[lang]?.[section] !== undefined);
          return (
            <li key={section}>
              <Link href={`/admin/texts/${section}`} className="sv-card flex items-start gap-3 bg-white p-4">
                <Type className="mt-0.5 size-4 shrink-0 text-turquoise" strokeWidth={1.5} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] text-ink">{textSectionLabel(section)}</span>
                  <span className="mt-1 block text-[0.75rem] text-muted-foreground">
                    {S.texts.fields(leaves.length)}
                    {overridden && <span className="ms-2 inline-block size-1.5 rounded-full bg-pistachio align-middle" />}
                  </span>
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 text-turquoise" strokeWidth={1.5} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
