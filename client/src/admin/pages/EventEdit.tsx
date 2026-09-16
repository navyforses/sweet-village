import { useCallback } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { FormProvider } from "react-hook-form";
import type { z } from "zod";
import type { EventContent, EventsSection } from "@shared/content";
import { eventSchema } from "@shared/contentSchema";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { GalleryEditor } from "../components/GalleryEditor";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

type EventForm = z.infer<typeof eventSchema>;

const EMPTY: EventForm = {
  id: "wedding",
  minGuests: 1,
  maxGuests: 1,
  title: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" },
  body: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" },
  experience: { ka: "", en: "", ru: "", ar: "", fr: "", es: "" },
  highlights: [],
  gallery: [],
};

export default function EventEdit() {
  const { eventId } = useParams<{ eventId: string }>();

  const toForm = useCallback(
    (section: EventsSection): EventForm => (section.events.find(event => event.id === eventId) as EventForm | undefined) ?? EMPTY,
    [eventId],
  );
  const fromForm = useCallback(
    (values: EventForm, section: EventsSection): EventsSection => ({
      ...section,
      events: section.events.map(event => (event.id === eventId ? ({ ...values, id: event.id } as EventContent) : event)),
    }),
    [eventId],
  );

  const state = useSectionForm<"events", EventForm>({ key: "events", schema: eventSchema, toForm, fromForm });
  const { form } = state;
  const errors = form.formState.errors;
  const exists = state.section?.events.some(event => event.id === eventId) ?? false;
  const title = form.watch("title.ka");

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;
  if (!exists) {
    return (
      <div className="border border-line bg-white p-6 text-center">
        <p className="text-[0.9375rem] text-ink">{S.events.notFound}</p>
        <Link href="/admin/events" className="mt-4 inline-flex text-[0.875rem] text-turquoise">
          {S.events.back}
        </Link>
      </div>
    );
  }

  const context = `Sweet Village guesthouse; event format: ${title || eventId}`;

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <Link href="/admin/events" className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {S.events.back}
        </Link>
        <h2 className="text-[1.35rem] text-ink">{title || eventId}</h2>

        <FormCard title={S.events.name}>
          <MultiLangField name="title" label={S.events.name} kind="title" maxLength={80} context={context} />
          <MultiLangField name="body" label={S.events.body} kind="body" multiline rows={4} maxLength={600} context={context} />
          <MultiLangField name="experience" label={S.events.experience} kind="title" maxLength={160} context={context} />
        </FormCard>

        <FormCard title={S.events.highlights}>
          {[0, 1, 2].map(index => (
            <MultiLangField key={index} name={`highlights.${index}`} label={S.events.highlight(index + 1)} kind="label" maxLength={120} context={context} />
          ))}
        </FormCard>

        <FormCard title={S.events.facts}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={S.events.minGuests} error={errors.minGuests?.message}>
              <Input type="number" inputMode="numeric" min={1} max={500} dir="ltr" className="bg-white" aria-invalid={Boolean(errors.minGuests)} {...form.register("minGuests", { valueAsNumber: true })} />
            </Field>
            <Field label={S.events.maxGuests} error={errors.maxGuests?.message}>
              <Input type="number" inputMode="numeric" min={1} max={500} dir="ltr" className="bg-white" aria-invalid={Boolean(errors.maxGuests)} {...form.register("maxGuests", { valueAsNumber: true })} />
            </Field>
          </div>
        </FormCard>

        <FormCard title={S.events.gallery} intro={S.events.galleryHint}>
          <GalleryEditor name="gallery" min={1} max={20} captions context={context} />
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
