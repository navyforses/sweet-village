import { useCallback } from "react";
import { Controller, FormProvider } from "react-hook-form";
import type { HomeSection } from "@shared/content";
import { homeSectionSchema } from "@shared/contentSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { GalleryEditor } from "../components/GalleryEditor";
import { ImageUploader } from "../components/ImageUploader";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

type PhotoPath = "hero.url" | "services.events.url" | "services.pool.url" | "services.restaurant.url" | "services.stay.url" | "stayTeaser.exterior.url" | "stayTeaser.bedroom.url" | "stayTeaser.studio.url";

export default function HomeEdit() {
  const toForm = useCallback((section: HomeSection) => section, []);
  const fromForm = useCallback((values: HomeSection) => values, []);
  const state = useSectionForm<"home", HomeSection>({ key: "home", schema: homeSectionSchema as never, toForm, fromForm });
  const { form } = state;

  if (state.loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const photoField = (name: PhotoPath, label: string, aspect: "wide" | "square" = "wide", hint?: string) => (
    <Field label={label} hint={hint}>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => <ImageUploader value={field.value} onChange={url => field.onChange(url)} aspect={aspect} />}
      />
    </Field>
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.home.title}</h2>
        <p className="text-[0.875rem] text-muted-foreground">{S.home.intro}</p>

        <FormCard title={S.home.hero}>{photoField("hero.url", S.home.hero, "wide", S.home.heroHint)}</FormCard>

        <FormCard title={S.home.services}>
          <div className="grid gap-5 sm:grid-cols-2">
            {photoField("services.events.url", S.home.servicesEvents)}
            {photoField("services.pool.url", S.home.servicesPool)}
            {photoField("services.restaurant.url", S.home.servicesRestaurant)}
            {photoField("services.stay.url", S.home.servicesStay)}
          </div>
        </FormCard>

        <FormCard title={S.home.stayTeaser}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">{photoField("stayTeaser.exterior.url", S.home.stayExterior)}</div>
            {photoField("stayTeaser.bedroom.url", S.home.stayBedroom, "square")}
            {photoField("stayTeaser.studio.url", S.home.stayStudio, "square")}
          </div>
        </FormCard>

        <FormCard title={S.home.gallery} intro={S.home.galleryHint}>
          <GalleryEditor name="gallery" min={4} max={16} />
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
