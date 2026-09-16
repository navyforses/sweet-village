import { useCallback } from "react";
import { Link } from "wouter";
import { ArrowDown, ArrowUp, ArrowUpRight, EyeOff, Plus, Trash2 } from "lucide-react";
import { FormProvider, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import type { MenuSection } from "@shared/content";
import { menuSectionSchema } from "@shared/contentSchema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConflictDialog } from "../components/ConflictDialog";
import { LoadFailed } from "../components/Field";
import { MultiLangField } from "../components/MultiLangField";
import { SaveBar } from "../components/SaveBar";
import { S } from "../strings";
import { useSectionForm } from "../useSectionForm";

const EMPTY_TEXT = { ka: "", en: "", ru: "", ar: "", fr: "", es: "" };

/** Ids must match the schema's `^[a-z][a-z0-9-]{1,40}$`; base-36 time keeps them short and unique enough for one owner. */
const newCategoryId = () => `cat-${Date.now().toString(36)}`;

/** Category list: names, order, add/remove. Dishes are edited per category. */
export default function MenuCategories() {
  const toForm = useCallback((section: MenuSection) => section, []);
  const fromForm = useCallback((values: MenuSection) => values, []);
  const state = useSectionForm<"menu", MenuSection>({ key: "menu", schema: menuSectionSchema as never, toForm, fromForm });
  const { form } = state;
  const { fields, append, remove, move } = useFieldArray({ control: form.control, name: "categories" });

  if (state.loading) return <Skeleton className="h-96 w-full" />;
  if (state.loadError || !state.section) return <LoadFailed error={state.loadError} reload={state.reload} />;

  const removeCategory = (index: number) => {
    const items = form.getValues(`categories.${index}.items`) ?? [];
    if (items.length > 0) {
      toast.error(S.menu.removeCategoryBlocked);
      return;
    }
    if (fields.length <= 1) {
      toast.error(S.menu.minCategories);
      return;
    }
    remove(index);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={event => event.preventDefault()} className="space-y-6">
        <h2 className="text-[1.35rem] text-ink">{S.menu.title}</h2>
        <p className="text-[0.875rem] text-muted-foreground">{S.menu.intro}</p>
        <Link href="/admin/texts/menu" className="inline-flex min-h-10 items-center gap-1 text-[0.8125rem] text-turquoise hover:text-deep">
          {S.menu.textsLink}
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </Link>

        <ol className="space-y-3">
          {fields.map((field, index) => {
            // `field.id` is react-hook-form's row key; the category id lives in the form values.
            const categoryId = form.watch(`categories.${index}.id`);
            const nameKa = form.watch(`categories.${index}.name.ka`);
            const items = form.watch(`categories.${index}.items`) ?? [];
            const hiddenCount = items.filter(item => item.hidden).length;
            const isNew = !state.section?.categories.some(category => category.id === categoryId);
            return (
              <li key={field.id} className="border border-line bg-white">
                <details open={isNew}>
                  <summary className="flex cursor-pointer flex-wrap items-center gap-3 px-4 py-3">
                    <span className="font-serif text-[0.8125rem] text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 truncate text-[0.9375rem] text-ink">{nameKa || S.menu.newCategory}</span>
                    <span className="text-[0.75rem] text-muted-foreground">
                      {S.menu.items(items.length)}
                      {hiddenCount > 0 && (
                        <span className="ms-2 inline-flex items-center gap-1">
                          <EyeOff className="size-3" /> {S.menu.hiddenCount(hiddenCount)}
                        </span>
                      )}
                    </span>
                    <span className="flex gap-1" onClick={event => event.preventDefault()}>
                      <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={S.menu.up}>
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)} aria-label={S.menu.down}>
                        <ArrowDown className="size-4" />
                      </Button>
                    </span>
                  </summary>
                  <div className="space-y-5 border-t border-line p-4 md:p-5">
                    <MultiLangField name={`categories.${index}.name`} label={S.menu.categoryName} kind="title" maxLength={80} context="Restaurant menu category at a Georgian guesthouse" />
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/admin/menu/${categoryId}`} className="inline-flex min-h-10 items-center gap-1.5 border border-turquoise px-4 text-[0.8125rem] text-turquoise hover:bg-turquoise hover:text-white">
                        {S.menu.openItems}
                        <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                      </Link>
                      <Button type="button" variant="outline" size="sm" className="ms-auto h-9 text-[0.75rem] text-destructive hover:text-destructive" onClick={() => removeCategory(index)}>
                        <Trash2 className="size-3.5" /> {S.menu.removeCategory}
                      </Button>
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>

        <Button type="button" variant="outline" disabled={fields.length >= 20} onClick={() => append({ id: newCategoryId(), name: { ...EMPTY_TEXT }, items: [] })}>
          <Plus className="size-4" /> {S.menu.addCategory}
        </Button>

        <SaveBar onSave={state.save} saving={state.saving} updatedAt={state.updatedAt} />
        <ConflictDialog open={state.conflict} onResolve={state.resolveConflict} />
      </form>
    </FormProvider>
  );
}
