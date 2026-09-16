import { useCallback, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, ArrowUp, ArrowUpRight, EyeOff, Plus, Trash2 } from "lucide-react";
import { FormProvider, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { DEFAULT_CONTENT, guideLangs, type GuidePost, type GuidesSection } from "@shared/content";
import { guidesSectionSchema } from "@shared/contentSchema";
import { LANGS } from "@shared/langs";
import { isSlug, slugify } from "@shared/slug";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { assetUrl } from "@/lib/assetUrl";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, FormCard, LoadFailed } from "../components/Field";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

const EMPTY_TEXT = { ka: "", en: "", ru: "", ar: "", fr: "", es: "" };

export const todayIso = () => new Date().toISOString().slice(0, 10);

/** Guide list: order, add (hidden draft), remove. The article itself is edited on its own page. */
export default function Guides() {
  const toForm = useCallback((section: GuidesSection) => section, []);
  const fromForm = useCallback((values: GuidesSection) => values, []);
  const state = useSectionForm<"guides", GuidesSection>({ key: "guides", schema: guidesSectionSchema as never, toForm, fromForm });
  const { form } = state;
  const { fields, append, remove, move } = useFieldArray({ control: form.control, name: "posts" });
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftSlug, setDraftSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const slug = slugTouched ? draftSlug : slugify(draftTitle);
  const slugExists = form.getValues("posts").some(post => post.slug === slug);
  const slugError = !draftTitle.trim() ? null : !isSlug(slug) ? S.guides.slugInvalid : slugExists ? S.guides.slugTaken : null;

  const create = () => {
    const title = draftTitle.trim();
    if (!title || slugError) return;
    const post: GuidePost = {
      slug,
      publishedAt: todayIso(),
      updatedAt: todayIso(),
      cover: { ...DEFAULT_CONTENT.home.hero },
      title: { ...EMPTY_TEXT, ka: title },
      excerpt: { ...EMPTY_TEXT, ka: title },
      body: { ...EMPTY_TEXT, ka: `## ${title}\n\n${S.guides.placeholderBody}` },
      faq: [],
      attractionIds: [],
      hidden: true,
    };
    append(post);
    setDraftTitle("");
    setDraftSlug("");
    setSlugTouched(false);
    toast.success(S.guides.created);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.guides.title}</h2>
        <p className="max-w-[70ch] text-[0.875rem] text-muted-foreground">{S.guides.intro}</p>
        <Link href="/admin/texts/guides" className="inline-flex min-h-10 items-center gap-1 text-[0.8125rem] text-turquoise hover:text-deep">
          {S.texts.sections.guides}
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </Link>

        {fields.length === 0 && <p className="border border-line bg-white p-6 text-center text-[0.875rem] text-muted-foreground">{S.guides.empty}</p>}

        <ol className="space-y-3">
          {fields.map((field, index) => {
            const post = form.watch(`posts.${index}`);
            const isNew = !state.section?.posts.some(saved => saved.slug === post.slug);
            const langs = guideLangs(post, LANGS).length;
            return (
              <li key={field.id} className={`border border-line bg-white ${post.hidden ? "opacity-80" : ""}`}>
                <div className="flex items-center gap-3 px-3 py-2.5 md:px-4">
                  <img src={assetUrl(post.cover.url)} alt="" className="size-12 shrink-0 object-cover" loading="lazy" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.9375rem] text-ink">{post.title.ka || post.slug}</span>
                    <span dir="ltr" className="mt-0.5 block truncate text-[0.75rem] text-muted-foreground">
                      /guides/{post.slug} · {post.updatedAt} · {S.guides.langs(langs)}
                    </span>
                  </span>
                  {post.hidden && (
                    <Badge variant="outline" className="hidden rounded-none text-[0.65rem] text-muted-foreground sm:inline-flex">
                      <EyeOff className="size-3" /> {S.guides.hiddenBadge}
                    </Badge>
                  )}
                  <span className="flex gap-1">
                    <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={S.guides.up}>
                      <ArrowUp className="size-4" />
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)} aria-label={S.guides.down}>
                      <ArrowDown className="size-4" />
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-destructive hover:text-destructive" onClick={() => setPendingRemove(index)} aria-label={S.guides.remove}>
                      <Trash2 className="size-4" />
                    </Button>
                  </span>
                  {isNew ? (
                    <span className="hidden text-[0.75rem] text-muted-foreground sm:inline">{S.guides.saveFirst}</span>
                  ) : (
                    <Link href={`/admin/guides/${post.slug}`} className="inline-flex min-h-9 items-center gap-1 border border-turquoise px-3 text-[0.8125rem] text-turquoise hover:bg-turquoise hover:text-white">
                      {S.guides.edit}
                      <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <FormCard title={S.guides.add} intro={S.guides.newIntro}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={S.guides.titleKa}>
              <Input value={draftTitle} maxLength={120} className="bg-white" onChange={event => setDraftTitle(event.target.value)} />
            </Field>
            <Field label={S.guides.slug} hint={S.guides.slugHint} error={slugError}>
              <Input
                value={slug}
                dir="ltr"
                maxLength={80}
                className="bg-white"
                aria-invalid={Boolean(slugError)}
                onChange={event => {
                  setSlugTouched(true);
                  setDraftSlug(event.target.value.toLowerCase());
                }}
              />
            </Field>
          </div>
          <Button type="button" variant="outline" disabled={!draftTitle.trim() || Boolean(slugError) || fields.length >= 40} onClick={create}>
            <Plus className="size-4" /> {S.guides.create}
          </Button>
        </FormCard>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />

        <AlertDialog open={pendingRemove !== null} onOpenChange={open => !open && setPendingRemove(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{S.guides.removeTitle}</AlertDialogTitle>
              <AlertDialogDescription>{S.guides.removeBody}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{S.form.cancel}</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={() => {
                  if (pendingRemove !== null) remove(pendingRemove);
                  setPendingRemove(null);
                }}>
                {S.guides.remove}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </FormProvider>
  );
}
