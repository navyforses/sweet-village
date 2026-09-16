import { useCallback } from "react";
import { Controller, FormProvider } from "react-hook-form";
import type { PoolSection } from "@shared/content";
import { poolSectionSchema } from "@shared/contentSchema";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { ImageUploader } from "../components/ImageUploader";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

type NumberKey = "adult" | "child" | "childMaxAge" | "dailyLimit" | "seasonFrom" | "seasonTo";
type TimeKey = "openFrom" | "openTo";
type BoolKey = "guestFree" | "provisional";
type PhotoKey = "photos.main.url" | "photos.side1.url" | "photos.side2.url";

export default function PoolEdit() {
  const toForm = useCallback((section: PoolSection) => section, []);
  const fromForm = useCallback((values: PoolSection) => values, []);
  const state = useSectionForm<"pool", PoolSection>({ key: "pool", schema: poolSectionSchema as never, toForm, fromForm });
  const { form } = state;
  const errors = form.formState.errors;

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const number = (name: NumberKey, label: string, min: number, max: number) => (
    <Field label={label} error={errors[name]?.message}>
      <Input type="number" inputMode="numeric" min={min} max={max} step={1} dir="ltr" className="bg-white" aria-invalid={Boolean(errors[name])} {...form.register(name, { valueAsNumber: true })} />
    </Field>
  );
  const time = (name: TimeKey, label: string) => (
    <Field label={label} error={errors[name]?.message}>
      <Input type="time" dir="ltr" className="bg-white" aria-invalid={Boolean(errors[name])} {...form.register(name)} />
    </Field>
  );
  const toggle = (name: BoolKey, label: string) => (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <label className="flex min-h-11 items-center justify-between gap-4 border border-line bg-white px-4 text-[0.8125rem] text-ink">
          {label}
          <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
        </label>
      )}
    />
  );
  const photo = (name: PhotoKey, label: string, aspect: "wide" | "square") => (
    <Field label={label}>
      <Controller control={form.control} name={name} render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} aspect={aspect} />} />
    </Field>
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.pool.title}</h2>
        <p className="text-[0.875rem] text-muted-foreground">{S.pool.intro}</p>

        <FormCard title={S.pool.prices}>
          <div className="grid gap-5 sm:grid-cols-3">
            {number("adult", S.pool.adult, 0, 10000)}
            {number("child", S.pool.child, 0, 10000)}
            {number("childMaxAge", S.pool.childMaxAge, 1, 17)}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {toggle("guestFree", S.pool.guestFree)}
            {toggle("provisional", S.pool.provisional)}
          </div>
        </FormCard>

        <FormCard title={S.pool.hours}>
          <div className="grid gap-5 sm:grid-cols-2">
            {time("openFrom", S.pool.openFrom)}
            {time("openTo", S.pool.openTo)}
            {number("seasonFrom", S.pool.seasonFrom, 1, 12)}
            {number("seasonTo", S.pool.seasonTo, 1, 12)}
            {number("dailyLimit", S.pool.dailyLimit, 1, 1000)}
          </div>
        </FormCard>

        <FormCard title={S.pool.photos}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">{photo("photos.main.url", S.pool.main, "wide")}</div>
            {photo("photos.side1.url", S.pool.side1, "square")}
            {photo("photos.side2.url", S.pool.side2, "square")}
          </div>
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
