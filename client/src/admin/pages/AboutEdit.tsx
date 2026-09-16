import { useCallback } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { Link } from "wouter";
import type { AboutSection } from "@shared/content";
import { aboutSectionSchema } from "@shared/contentSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { ImageUploader } from "../components/ImageUploader";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

type PhotoKey = "photos.main.url" | "photos.detail1.url" | "photos.detail2.url";

export default function AboutEdit() {
  const toForm = useCallback((section: AboutSection) => section, []);
  const fromForm = useCallback((values: AboutSection) => values, []);
  const state = useSectionForm<"about", AboutSection>({ key: "about", schema: aboutSectionSchema as never, toForm, fromForm });
  const { form } = state;

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const photo = (name: PhotoKey, label: string, aspect: "wide" | "square") => (
    <Field label={label}>
      <Controller control={form.control} name={name} render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} aspect={aspect} />} />
    </Field>
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.about.title}</h2>
        <p className="text-[0.875rem] text-muted-foreground">
          {S.about.intro}{" "}
          <Link href="/admin/texts/about" className="text-turquoise underline-offset-2 hover:underline">
            {S.nav.texts}
          </Link>
        </p>
        <FormCard title={S.pool.photos}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">{photo("photos.main.url", S.about.main, "wide")}</div>
            {photo("photos.detail1.url", S.about.detail1, "square")}
            {photo("photos.detail2.url", S.about.detail2, "square")}
          </div>
        </FormCard>
        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
