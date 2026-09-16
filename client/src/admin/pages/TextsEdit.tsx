import { useCallback, useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import type { TextsSection } from "@shared/content";
import { LANGS } from "@shared/langs";
import { DICTS } from "@/i18n";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { FormCard, LoadFailed } from "../components/Field";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { collectLeaves, fromTextForm, toTextForm, type TextFormValues } from "../lib/textPatch";
import { S } from "../strings";
import { isTextSection, leafLabel, leafPresentation, textSectionLabel } from "../textSections";
import { useSectionForm } from "../useSectionForm";

const localized = z.object(Object.fromEntries(LANGS.map(lang => [lang, z.string().max(3000).default("")])));
const formSchema = z.object({ fields: z.record(z.string(), localized) });

/** Edits one dictionary section; empty fields mean "keep the compiled default". */
export default function TextsEdit() {
  const { section = "" } = useParams<{ section: string }>();
  const valid = isTextSection(section);
  const leaves = useMemo(() => (valid ? collectLeaves(DICTS, section) : []), [section, valid]);

  const toForm = useCallback((texts: TextsSection) => toTextForm(texts, section, leaves), [section, leaves]);
  const fromForm = useCallback((values: TextFormValues, texts: TextsSection) => fromTextForm(texts, DICTS, section, leaves, values), [section, leaves]);
  const state = useSectionForm<"texts", TextFormValues>({ key: "texts", schema: formSchema as never, toForm, fromForm });
  const { form } = state;

  if (!valid) {
    return (
      <div className="border border-line bg-white p-6 text-center">
        <Link href="/admin/texts" className="text-[0.875rem] text-turquoise">
          {S.texts.title}
        </Link>
      </div>
    );
  }
  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <Link href="/admin/texts" className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {S.texts.title}
        </Link>
        <h2 className="text-[1.35rem] text-ink">{textSectionLabel(section)}</h2>
        <p className="max-w-[70ch] text-[0.875rem] text-muted-foreground">{S.texts.sectionIntro}</p>

        <FormCard title={S.texts.fields(leaves.length)}>
          {leaves.map(leaf => {
            const { kind, multiline, maxLength } = leafPresentation(leaf.path, leaf.defaults.ka);
            return (
              <MultiLangField
                key={leaf.key}
                name={`fields.${leaf.key}`}
                label={leafLabel(leaf.path)}
                kind={kind}
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                maxLength={maxLength}
                required={false}
                placeholders={leaf.defaults}
                context={`Sweet Village website, section "${section}", field "${leaf.path}"`}
              />
            );
          })}
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
