import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import type { ContactSection, LocationSection } from "@shared/content";
import { contactSectionSchema, locationSectionSchema } from "@shared/contentSchema";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

function ContactForm() {
  const toForm = useCallback((section: ContactSection) => section, []);
  const fromForm = useCallback((values: ContactSection) => values, []);
  const state = useSectionForm<"contact", ContactSection>({ key: "contact", schema: contactSectionSchema as never, toForm, fromForm });
  const { form } = state;
  const errors = form.formState.errors;

  if (state.loading) return <Skeleton className="h-64 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const text = (name: keyof ContactSection, label: string, extra: Partial<React.ComponentProps<typeof Input>> = {}) => (
    <Field label={label} error={errors[name]?.message}>
      <Input dir="ltr" aria-invalid={Boolean(errors[name])} className="bg-white" {...extra} {...form.register(name)} />
    </Field>
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()}>
        <FormCard title={S.contact.contactCard}>
          <div className="grid gap-5 sm:grid-cols-2">
            {text("phone", S.contact.phone, { type: "tel", inputMode: "tel" })}
            {text("phoneDisplay", S.contact.phoneDisplay, { type: "tel" })}
            {text("whatsapp", S.contact.whatsapp, { inputMode: "numeric" })}
            {text("email", S.contact.email, { type: "email", inputMode: "email" })}
            {text("instagram", S.contact.instagram)}
            {text("instagramUrl", S.contact.instagramUrl, { type: "url", inputMode: "url" })}
            {text("facebookUrl", S.contact.facebookUrl, { type: "url", inputMode: "url" })}
          </div>
        </FormCard>
        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}

function LocationForm() {
  const toForm = useCallback((section: LocationSection) => section, []);
  const fromForm = useCallback((values: LocationSection) => values, []);
  const state = useSectionForm<"location", LocationSection>({ key: "location", schema: locationSectionSchema as never, toForm, fromForm });
  const { form } = state;
  const errors = form.formState.errors;

  if (state.loading) return <Skeleton className="h-64 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()}>
        <FormCard title={S.contact.locationCard} intro={S.contact.coordsHint}>
          <MultiLangField name="address" label={S.contact.address} kind="label" maxLength={200} context="Sweet Village postal address line" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={S.contact.lat} error={errors.lat?.message}>
              <Input type="number" step="0.0001" min={41} max={44} dir="ltr" className="bg-white" aria-invalid={Boolean(errors.lat)} {...form.register("lat", { valueAsNumber: true })} />
            </Field>
            <Field label={S.contact.lng} error={errors.lng?.message}>
              <Input type="number" step="0.0001" min={40} max={47} dir="ltr" className="bg-white" aria-invalid={Boolean(errors.lng)} {...form.register("lng", { valueAsNumber: true })} />
            </Field>
          </div>
        </FormCard>
        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}

export default function Contact() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-[1.35rem] text-ink">{S.contact.title}</h2>
        <p className="mt-2 text-[0.875rem] text-muted-foreground">{S.contact.intro}</p>
      </div>
      <ContactForm />
      <LocationForm />
    </div>
  );
}
