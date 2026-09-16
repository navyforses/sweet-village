import { useCallback } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FormProvider, useFieldArray } from "react-hook-form";
import type { AttractionsSection } from "@shared/content";
import { attractionsSectionSchema } from "@shared/contentSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, LoadFailed } from "../components/Field";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

export default function Attractions() {
  const toForm = useCallback((section: AttractionsSection) => section, []);
  const fromForm = useCallback((values: AttractionsSection) => values, []);
  const state = useSectionForm<"attractions", AttractionsSection>({ key: "attractions", schema: attractionsSectionSchema as never, toForm, fromForm });
  const { form } = state;
  const { fields, move } = useFieldArray({ control: form.control, name: "attractions" });
  const errors = form.formState.errors.attractions;

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const number = (index: number, key: "minutes" | "km" | "lat" | "lng", label: string, step: string, min: number, max: number) => {
    const error = errors?.[index]?.[key]?.message;
    return (
      <Field label={label} error={error}>
        <Input type="number" inputMode="decimal" step={step} min={min} max={max} dir="ltr" className="bg-white" aria-invalid={Boolean(error)} {...form.register(`attractions.${index}.${key}`, { valueAsNumber: true })} />
      </Field>
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.attractions.title}</h2>
        <p className="text-[0.875rem] text-muted-foreground">{S.attractions.intro}</p>

        <ol className="space-y-4">
          {fields.map((field, index) => {
            const titleKa = form.watch(`attractions.${index}.title.ka`);
            return (
              <li key={field.id} className="border border-line bg-white">
                <details open={index === 0}>
                  <summary className="flex cursor-pointer items-center gap-3 px-4 py-3">
                    <span className="font-serif text-[0.8125rem] text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 truncate text-[0.9375rem] text-ink">{titleKa || field.id}</span>
                    <span className="text-[0.75rem] text-muted-foreground">{form.watch(`attractions.${index}.minutes`)} წთ</span>
                    <span className="flex gap-1" onClick={event => event.preventDefault()}>
                      <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={S.attractions.up}>
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)} aria-label={S.attractions.down}>
                        <ArrowDown className="size-4" />
                      </Button>
                    </span>
                  </summary>
                  <div className="space-y-5 border-t border-line p-4 md:p-5">
                    <MultiLangField name={`attractions.${index}.title`} label={S.attractions.name} kind="title" maxLength={80} context="Nearby attraction near Tskaltubo, Georgia" />
                    <MultiLangField name={`attractions.${index}.note`} label={S.attractions.note} kind="body" multiline rows={2} maxLength={200} context="One-line note about a nearby attraction" />
                    <div className="grid gap-4 sm:grid-cols-4">
                      {number(index, "minutes", S.attractions.minutes, "1", 1, 600)}
                      {number(index, "km", S.attractions.km, "0.5", 0, 1000)}
                      {number(index, "lat", S.attractions.lat, "0.0001", 41, 44)}
                      {number(index, "lng", S.attractions.lng, "0.0001", 40, 47)}
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
