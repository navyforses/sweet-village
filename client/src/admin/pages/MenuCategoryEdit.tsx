import { useCallback, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowDown, ArrowLeft, ArrowUp, EyeOff, Plus, Trash2 } from "lucide-react";
import { Controller, FormProvider, useFieldArray } from "react-hook-form";
import type { z } from "zod";
import { nextMenuItemId, type MenuCategoryContent, type MenuSection } from "@shared/content";
import { menuCategorySchema } from "@shared/contentSchema";
import { RAW_DISHES, RAW_PHOTOS } from "@shared/venuePhotos";
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
import { Switch } from "@/components/ui/switch";
import { assetUrl } from "@/lib/assetUrl";
import { ConflictDialog } from "../components/ConflictDialog";
import { Field, LoadFailed } from "../components/Field";
import { ImageUploader } from "../components/ImageUploader";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

type CategoryForm = z.infer<typeof menuCategorySchema>;

const EMPTY_TEXT = { ka: "", en: "", ru: "", ar: "", fr: "", es: "" };
const EMPTY_CATEGORY: CategoryForm = { id: "cold", name: { ...EMPTY_TEXT }, items: [] };

/** Dishes of one category: order, price, names, description, photo and availability. */
export default function MenuCategoryEdit() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);

  const toForm = useCallback(
    (section: MenuSection): CategoryForm => (section.categories.find(category => category.id === categoryId) as CategoryForm | undefined) ?? EMPTY_CATEGORY,
    [categoryId],
  );
  const fromForm = useCallback(
    (values: CategoryForm, section: MenuSection): MenuSection => ({
      categories: section.categories.map(category => (category.id === categoryId ? ({ ...values, id: category.id } as MenuCategoryContent) : category)),
    }),
    [categoryId],
  );

  const state = useSectionForm<"menu", CategoryForm>({ key: "menu", schema: menuCategorySchema as never, toForm, fromForm });
  const { form } = state;
  const { fields, append, remove, move } = useFieldArray({ control: form.control, name: "items" });
  const errors = form.formState.errors.items;
  const exists = state.section?.categories.some(category => category.id === categoryId) ?? false;
  const nameKa = form.watch("name.ka");

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
        <p className="text-[0.9375rem] text-ink">{S.menu.notFound}</p>
        <Link href="/admin/menu" className="mt-4 inline-flex text-[0.875rem] text-turquoise">
          {S.menu.back}
        </Link>
      </div>
    );
  }

  const section = state.section;
  const fallbackPhoto = RAW_DISHES[categoryId] ?? RAW_PHOTOS.restaurant;
  const context = `Restaurant menu at Sweet Village guesthouse near Tskaltubo; category: ${nameKa || categoryId}`;

  const addItem = () => {
    // Ids must stay unique across every category, including dishes added in this session but not yet saved.
    const localMax = form.getValues("items").reduce((max, item) => Math.max(max, item.id), 0);
    const id = Math.max(nextMenuItemId(section), localMax + 1);
    append({ id, name: { ...EMPTY_TEXT }, description: { ...EMPTY_TEXT }, price: 0, volume: "", hidden: false });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <Link href="/admin/menu" className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] text-turquoise hover:text-deep">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {S.menu.back}
        </Link>
        <h2 className="text-[1.35rem] text-ink">{nameKa || categoryId}</h2>
        <p className="text-[0.875rem] text-muted-foreground">{S.menu.itemsIntro}</p>

        {fields.length === 0 && <p className="border border-line bg-white p-6 text-center text-[0.875rem] text-muted-foreground">{S.menu.empty}</p>}

        <ol className="space-y-3">
          {fields.map((field, index) => {
            // `field.id` is react-hook-form's row key; the dish id lives in the form values.
            const itemId = form.watch(`items.${index}.id`);
            const itemNameKa = form.watch(`items.${index}.name.ka`);
            const price = form.watch(`items.${index}.price`);
            const hidden = form.watch(`items.${index}.hidden`);
            const photoUrl = form.watch(`items.${index}.photo.url`);
            const isNew = !section.categories.some(category => category.items.some(item => item.id === itemId));
            const priceError = errors?.[index]?.price?.message;
            const volumeError = errors?.[index]?.volume?.message;
            return (
              <li key={field.id} className={`border border-line bg-white ${hidden ? "opacity-80" : ""}`}>
                <details open={isNew}>
                  <summary className="flex cursor-pointer items-center gap-3 px-3 py-2.5 md:px-4">
                    <img src={assetUrl(photoUrl || fallbackPhoto)} alt="" className="size-12 shrink-0 object-cover" loading="lazy" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] text-ink">{itemNameKa || S.menu.newItem}</span>
                      <span dir="ltr" className="mt-0.5 block font-serif text-[0.875rem] text-turquoise">
                        {Number.isFinite(price) ? price : 0} ₾
                      </span>
                    </span>
                    {hidden && (
                      <Badge variant="outline" className="rounded-none text-[0.65rem] text-muted-foreground">
                        <EyeOff className="size-3" /> {S.menu.hiddenBadge}
                      </Badge>
                    )}
                    <span className="flex gap-1" onClick={event => event.preventDefault()}>
                      <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={S.menu.up}>
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)} aria-label={S.menu.down}>
                        <ArrowDown className="size-4" />
                      </Button>
                    </span>
                  </summary>
                  <div className="grid gap-5 border-t border-line p-4 md:grid-cols-[1fr_16rem] md:p-5">
                    <div className="space-y-5">
                      <MultiLangField name={`items.${index}.name`} label={S.menu.itemName} kind="title" maxLength={120} context={context} />
                      <MultiLangField name={`items.${index}.description`} label={S.menu.itemDescription} kind="body" multiline rows={2} maxLength={300} required={false} context={context} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={S.menu.price} hint={S.menu.priceHint} error={priceError}>
                          <Input type="number" inputMode="decimal" min={0} max={10000} step="0.01" dir="ltr" className="bg-white" aria-invalid={Boolean(priceError)} {...form.register(`items.${index}.price`, { valueAsNumber: true })} />
                        </Field>
                        <Field label={S.menu.volume} hint={S.menu.volumeHint} error={volumeError}>
                          <Input maxLength={24} dir="ltr" className="bg-white" aria-invalid={Boolean(volumeError)} {...form.register(`items.${index}.volume`)} />
                        </Field>
                      </div>
                      <Controller
                        control={form.control}
                        name={`items.${index}.hidden`}
                        render={({ field: hiddenField }) => (
                          <label className="flex min-h-11 items-center justify-between gap-4 border border-line bg-white px-4 text-[0.8125rem] text-ink">
                            {S.menu.hidden}
                            <Switch checked={hiddenField.value ?? false} onCheckedChange={hiddenField.onChange} />
                          </label>
                        )}
                      />
                      <Button type="button" variant="outline" size="sm" className="h-9 text-[0.75rem] text-destructive hover:text-destructive" onClick={() => setPendingRemove(index)}>
                        <Trash2 className="size-3.5" /> {S.menu.removeItem}
                      </Button>
                    </div>
                    <Field label={S.menu.photo} hint={S.menu.photoHint}>
                      <ImageUploader
                        value={photoUrl}
                        aspect="card"
                        onChange={url => form.setValue(`items.${index}.photo`, { url }, { shouldDirty: true, shouldValidate: true })}
                      />
                      {photoUrl && (
                        <Button type="button" variant="ghost" size="sm" className="h-8 text-[0.75rem] text-muted-foreground" onClick={() => form.setValue(`items.${index}.photo`, undefined, { shouldDirty: true })}>
                          {S.menu.removePhoto}
                        </Button>
                      )}
                    </Field>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>

        <Button type="button" variant="outline" disabled={fields.length >= 80} onClick={addItem}>
          <Plus className="size-4" /> {S.menu.addItem}
        </Button>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />

        <AlertDialog open={pendingRemove !== null} onOpenChange={open => !open && setPendingRemove(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{S.menu.removeItemTitle}</AlertDialogTitle>
              <AlertDialogDescription>{S.menu.removeItemBody}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{S.form.cancel}</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={() => {
                  if (pendingRemove !== null) remove(pendingRemove);
                  setPendingRemove(null);
                }}>
                {S.menu.removeItem}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </FormProvider>
  );
}
