import { useCallback } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Images, Users } from "lucide-react";
import { Controller, FormProvider } from "react-hook-form";
import type { EventsSection } from "@shared/content";
import { eventsSectionSchema } from "@shared/contentSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { assetUrl } from "@/lib/assetUrl";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { GalleryEditor } from "../components/GalleryEditor";
import { ImageUploader } from "../components/ImageUploader";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

/** Event list plus the overview page's own photos (hero + real-space strip). */
export default function Events() {
  const toForm = useCallback((section: EventsSection) => section, []);
  const fromForm = useCallback((values: EventsSection) => values, []);
  const state = useSectionForm<"events", EventsSection>({ key: "events", schema: eventsSectionSchema as never, toForm, fromForm });
  const { form } = state;

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.events.title}</h2>
        <p className="text-[0.875rem] text-muted-foreground">{S.events.intro}</p>

        <ul className="space-y-3">
          {state.section.events.map(event => (
            <li key={event.id}>
              <Link href={`/admin/events/${event.id}`} className="sv-card flex gap-4 bg-white p-3 md:p-4">
                <img src={assetUrl(event.gallery[0]?.url ?? "")} alt="" className="size-24 shrink-0 object-cover md:size-28" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[1.0625rem] text-ink">{event.title.ka}</h3>
                  <p className="mt-1 line-clamp-2 text-[0.8125rem] text-muted-foreground">{event.body.ka}</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" strokeWidth={1.5} /> {event.minGuests}–{event.maxGuests} {S.events.guests}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Images className="size-3.5" strokeWidth={1.5} /> {event.gallery.length} {S.events.photos}
                    </span>
                  </p>
                </div>
                <span className="hidden items-center gap-1 self-center text-[0.8125rem] text-turquoise sm:inline-flex">
                  {S.events.edit}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <FormCard title={S.events.pagePhotos}>
          <Field label={S.events.hero}>
            <Controller control={form.control} name="hero.url" render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} aspect="wide" />} />
          </Field>
          <Field label={S.events.spacePhotos}>
            <GalleryEditor name="spacePhotos" min={1} max={12} hint={S.events.spaceHint} />
          </Field>
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
