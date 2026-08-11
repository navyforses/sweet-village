import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS, LANG_NAMES, isRtl, useI18n, type Lang } from "@/i18n";

/**
 * No flags: a flag denotes a country, not a language. Spanish has no single
 * flag, Arabic has twenty-two. Each language is written in its own script.
 */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t.common.langLabel}
        className="flex min-h-11 items-center gap-2 border border-line bg-white px-3.5 text-[0.8125rem] text-ink transition-colors hover:border-pistachio focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
        <Globe className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
        <span className={compact ? "sr-only sm:not-sr-only" : ""}>{LANG_NAMES[lang]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11rem] border-line p-0">
        {LANGS.map((l: Lang) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => setLang(l)}
            dir={isRtl(l) ? "rtl" : "ltr"}
            className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-none border-b border-line/70 px-4 text-[0.875rem] last:border-b-0 focus:bg-muted">
            <span className={l === lang ? "text-turquoise" : ""}>{LANG_NAMES[l]}</span>
            {l === lang && <Check className="size-3.5 text-turquoise" strokeWidth={1.5} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
