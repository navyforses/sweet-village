import { useCallback } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { FormProvider } from "react-hook-form";
import type { z } from "zod";
import type { UnitContent, UnitsSection } from "@shared/content";
import { unitSchema } from "@shared/contentSchema";
import type { UnitId } from "@shared/venue";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { GalleryEditor } from "../components/GalleryEditor";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

type UnitForm = z.infer<typeof unitSchema>;

const EMPTY_UNIT: UnitForm = {
  id: "small-a",
  name: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" },
  description: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" },
  bestFor: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" },
  beds: 1,
  maxGuests: 1,
  floors: 1,
  nightlyPrice: 1,
  gallery: [],
};

function NumberInput({ name, register, error, min, max }: { name: string; register: ReturnType<typeof import("react-hook-form").useForm<UnitForm>>["register"]; error?: string; min: number; max: number }) {
  return (
    <Input
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      step={1}
      dir="ltr"
      aria-invalid={Boolean(error)}
      className="bg-white"
      {...register(name as keyof UnitForm, { valueAsNumber: true })}
    />
  );
}

export default function UnitEdit() {
  const { unitId } = useParams<{ unitId: string }>();

  const toForm = useCallback(
    (section: UnitsSection): UnitForm => (section.units.find(unit => unit.id === unitId) as UnitForm | undefined) ?? EMPTY_UNIT,
    [unitId],
  );
  const fromForm = useCallback(
    (values: UnitForm, section: UnitsSection): UnitsSection => ({
      units: section.units.map(unit => (unit.id === unitId ? ({ ...values, id: unit.id } as UnitContent) : unit)),
    }),
    [unitId],
  );

  const state = useSectionForm<"units", UnitForm>({ key: "units", schema: unitSchema, toForm, fromForm });
  const { form } = state;
  const errors = form.formState.errors;
  const exists = state.section?.units.some(unit => unit.id === (unitId as UnitId)) ?? false;
  const unitName = form.watch("name.ka");

  if (state.loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;
  if (!exists) {
    return (
      <div className="border border-line bg-white p-6 text-center">
        <p className="text-[0.9375rem] text-ink">{S.unit.notFound}</p>
        <Link href="/admin/units" className="mt-4 inline-flex text-[0.875rem] text-turquoise">
          {S.unit.back}
        </Link>
      </div>
    );
  }

  const context = `Sweet Village guesthouse; accommodation unit: ${unitName || unitId}`;

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <Link href="/admin/units" className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {S.unit.back}
        </Link>
        <h2 className="text-[1.35rem] text-ink">{unitName || unitId}</h2>

        <FormCard title={S.unit.name}>
          <MultiLangField name="name" label={S.unit.name} kind="title" maxLength={80} context={context} />
          <MultiLangField name="description" label={S.unit.description} kind="body" multiline rows={5} maxLength={700} context={context} />
          <MultiLangField name="bestFor" label={S.unit.bestFor} kind="label" maxLength={120} context={context} />
        </FormCard>

        <FormCard title={S.unit.facts}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={S.unit.price} error={errors.nightlyPrice?.message}>
              <NumberInput name="nightlyPrice" register={form.register} error={errors.nightlyPrice?.message} min={1} max={100000} />
            </Field>
            <Field label={S.unit.beds} error={errors.beds?.message}>
              <NumberInput name="beds" register={form.register} error={errors.beds?.message} min={1} max={20} />
            </Field>
            <Field label={S.unit.maxGuests} error={errors.maxGuests?.message}>
              <NumberInput name="maxGuests" register={form.register} error={errors.maxGuests?.message} min={1} max={30} />
            </Field>
            <Field label={S.unit.floors} error={errors.floors?.message}>
              <NumberInput name="floors" register={form.register} error={errors.floors?.message} min={1} max={3} />
            </Field>
          </div>
        </FormCard>

        <FormCard title={S.unit.gallery} intro={S.unit.galleryHint}>
          <GalleryEditor name="gallery" min={1} max={30} captions context={context} />
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
