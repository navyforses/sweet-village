import { useCallback, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Controller, FormProvider, useFieldArray } from "react-hook-form";
import type { z } from "zod";
import { DEFAULT_CONTENT, type GuidePost, type GuidesSection } from "@shared/content";
import { GUIDE_BODY_MAX, guidePostSchema } from "@shared/contentSchema";
import { pickLang } from "@shared/langs";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useSection } from "../api";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { ImageUploader } from "../components/ImageUploader";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";
import { todayIso } from "./Guides";

type GuideForm = z.infer<typeof guidePostSchema>;

const EMPTY_TEXT = { ka: "", en: "", ru: "", ar: "", fr: "", es: "" };
const EMPTY: GuideForm = {
  slug: "draft",
  publishedAt: "2026-01-01",
  updatedAt: "2026-01-01",
  cover: { url: DEFAULT_CONTENT.home.hero.url },
  title: { ...EMPTY_TEXT },
  excerpt: { ...EMPTY_TEXT },
  body: { ...EMPTY_TEXT },
  faq: [],
  attractionIds: [],
  hidden: true,
};

export default function GuideEdit() {
  const { slug } = useParams<{ slug: string }>();
  const [preview, setPreview] = useState(false);
  const attractionsQuery = useSection("attractions");
  const attractions = attractionsQuery.data?.value.attractions ?? DEFAULT_CONTENT.attractions.attractions;

  const toForm = useCallback((section: GuidesSection): GuideForm => (section.posts.find(post => post.slug === slug) as GuideForm | undefined) ?? EMPTY, [slug]);
  const fromForm = useCallback(
    (values: GuideForm, section: GuidesSection): GuidesSection => ({
      posts: section.posts.map(post => (post.slug === slug ? ({ ...values, slug: post.slug, updatedAt: todayIso() } as GuidePost) : post)),
    }),
    [slug],
  );

  const state = useSectionForm<"guides", GuideForm>({ key: "guides", schema: guidePostSchema as never, toForm, fromForm });
  const { form } = state;
  const errors = form.formState.errors;
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control: form.control, name: "faq" });
  const exists = state.section?.posts.some(post => post.slug === slug) ?? false;
  const titleKa = form.watch("title.ka");
  const bodyKa = form.watch("body.ka");
  const coverUrl = form.watch("cover.url");

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;
  if (!exists) {
    return (
      <div className="border border-line bg-white p-6 text-center">
        <p className="text-[0.9375rem] text-ink">{S.guides.notFound}</p>
        <Link href="/admin/guides" className="mt-4 inline-flex text-[0.875rem] text-turquoise">
          {S.guides.back}
        </Link>
      </div>
    );
  }

  const context = `Travel guide article on the Sweet Village website; topic: ${titleKa || slug}. Keep Markdown markers (##, -, **, links) exactly.`;

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <Link href="/admin/guides" className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {S.guides.back}
        </Link>
        <div>
          <h2 className="text-[1.35rem] text-ink">{titleKa || slug}</h2>
          <p dir="ltr" className="mt-1 text-[0.8125rem] text-muted-foreground">
            /guides/{slug}
          </p>
        </div>

        <FormCard title={S.guides.textCard}>
          <MultiLangField name="title" label={S.guides.titleField} kind="title" maxLength={120} context={context} />
          <MultiLangField name="excerpt" label={S.guides.excerpt} kind="body" multiline rows={3} maxLength={300} context={context} />
        </FormCard>

        <FormCard title={S.guides.bodyCard} intro={S.guides.bodyHint}>
          <MultiLangField name="body" label={S.guides.body} kind="body" multiline rows={22} maxLength={GUIDE_BODY_MAX} context={context} />
          <Button type="button" variant="outline" size="sm" onClick={() => setPreview(value => !value)}>
            {preview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {preview ? S.guides.previewOff : S.guides.preview}
          </Button>
          {preview && (
            // Links inside the preview must not navigate the admin away.
            <div className="border border-line bg-paper p-5 md:p-7" onClickCapture={event => event.preventDefault()}>
              <Markdown source={bodyKa ?? ""} />
            </div>
          )}
        </FormCard>

        <FormCard title={S.guides.faq} intro={S.guides.faqHint}>
          {faqFields.map((field, index) => (
            <div key={field.id} className="space-y-4 border border-line p-4">
              <MultiLangField name={`faq.${index}.question`} label={`${S.guides.question} ${index + 1}`} kind="title" maxLength={200} context={context} />
              <MultiLangField name={`faq.${index}.answer`} label={S.guides.answer} kind="body" multiline rows={3} maxLength={1200} context={context} />
              <Button type="button" variant="outline" size="sm" className="h-9 text-[0.75rem] text-destructive hover:text-destructive" onClick={() => removeFaq(index)}>
                <Trash2 className="size-3.5" /> {S.guides.removeFaq}
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" disabled={faqFields.length >= 12} onClick={() => appendFaq({ question: { ...EMPTY_TEXT }, answer: { ...EMPTY_TEXT } })}>
            <Plus className="size-4" /> {S.guides.addFaq}
          </Button>
        </FormCard>

        <div className="grid gap-6 md:grid-cols-2">
          <FormCard title={S.guides.cover} intro={S.guides.coverHint}>
            <ImageUploader value={coverUrl} aspect="wide" onChange={url => form.setValue("cover", { url }, { shouldDirty: true, shouldValidate: true })} />
            {errors.cover?.url?.message && <p className="text-[0.75rem] text-destructive">{errors.cover.url.message}</p>}
          </FormCard>

          <FormCard title={S.guides.dates} intro={S.guides.updatedAtHint}>
            <Field label={S.guides.publishedAt} error={errors.publishedAt?.message}>
              <Input type="date" dir="ltr" className="bg-white" aria-invalid={Boolean(errors.publishedAt)} {...form.register("publishedAt")} />
            </Field>
            <Controller
              control={form.control}
              name="hidden"
              render={({ field }) => (
                <label className="flex min-h-11 items-center justify-between gap-4 border border-line bg-white px-4 text-[0.8125rem] text-ink">
                  {S.guides.hidden}
                  <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
                </label>
              )}
            />
            <Controller
              control={form.control}
              name="attractionIds"
              render={({ field }) => (
                <Field label={S.guides.attractions} hint={S.guides.attractionsHint}>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {attractions.map(attraction => {
                      const checked = (field.value ?? []).includes(attraction.id);
                      return (
                        <li key={attraction.id}>
                          <label className="flex min-h-10 items-center gap-2.5 text-[0.8125rem] text-ink">
                            <input
                              type="checkbox"
                              className="size-4 accent-turquoise"
                              checked={checked}
                              onChange={event => {
                                const current = field.value ?? [];
                                field.onChange(event.target.checked ? [...current, attraction.id] : current.filter(id => id !== attraction.id));
                              }}
                            />
                            {pickLang(attraction.title, "ka")}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Field>
              )}
            />
          </FormCard>
        </div>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
