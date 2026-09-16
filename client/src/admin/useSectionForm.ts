import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import type { SectionKey, SiteContent } from "@shared/content";
import { AdminApiError, useSaveSection, useSection } from "./api";
import { S } from "./strings";

export interface SectionFormOptions<K extends SectionKey, F extends FieldValues> {
  key: K;
  schema: z.ZodType<F, unknown>;
  /** Picks the form values out of the stored section. */
  toForm: (section: SiteContent[K]) => F;
  /** Writes the (validated) form values back into a copy of the stored section. */
  fromForm: (values: F, section: SiteContent[K]) => SiteContent[K];
}

export interface SectionFormState<K extends SectionKey, F extends FieldValues> {
  form: UseFormReturn<F>;
  loading: boolean;
  loadError: unknown;
  reload: () => void;
  section: SiteContent[K] | null;
  updatedAt: string | null;
  save: () => void;
  saving: boolean;
  conflict: boolean;
  resolveConflict: (choice: "reload" | "overwrite" | "cancel") => void;
}

/**
 * Loads a content section, binds it to a react-hook-form instance validated
 * by its zod schema and saves it back with optimistic concurrency. A 409 from
 * the API surfaces as `conflict`, which the page turns into a dialog.
 */
export function useSectionForm<K extends SectionKey, F extends FieldValues>(options: SectionFormOptions<K, F>): SectionFormState<K, F> {
  const { key, schema, toForm, fromForm } = options;
  const query = useSection(key);
  const mutation = useSaveSection(key);
  const [conflict, setConflict] = useState(false);
  const [pendingOverwrite, setPendingOverwrite] = useState<SiteContent[K] | null>(null);

  const section = query.data?.value ?? null;
  const values = useMemo(() => (section ? toForm(section) : undefined), [section, toForm]);

  const form = useForm<F>({
    resolver: zodResolver(schema as never) as never,
    values,
    mode: "onBlur",
  });

  const { isDirty } = form.formState;
  useEffect(() => {
    if (!isDirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  const persist = useCallback(
    async (next: SiteContent[K], ifUpdatedAt: string | null) => {
      try {
        await mutation.mutateAsync({ value: next, ifUpdatedAt });
        toast.success(S.form.saved);
        setPendingOverwrite(null);
      } catch (error) {
        if (error instanceof AdminApiError && error.status === 409) {
          setPendingOverwrite(next);
          setConflict(true);
          return;
        }
        if (error instanceof AdminApiError && error.status === 503) {
          toast.error(S.form.dbMissing);
          return;
        }
        if (error instanceof AdminApiError && error.status === 422) {
          console.error("[admin] server validation", error.payload);
          toast.error(S.form.invalid);
          return;
        }
        toast.error(S.form.saveFailed);
      }
    },
    [mutation],
  );

  const save = useCallback(() => {
    if (!section) return;
    void form.handleSubmit(
      valid => persist(fromForm(valid as F, section), query.data?.updatedAt ?? null),
      () => toast.error(S.form.invalid),
    )();
  }, [form, fromForm, persist, query.data?.updatedAt, section]);

  const resolveConflict = useCallback(
    (choice: "reload" | "overwrite" | "cancel") => {
      setConflict(false);
      if (choice === "reload") {
        setPendingOverwrite(null);
        void query.refetch();
      } else if (choice === "overwrite" && pendingOverwrite) {
        void persist(pendingOverwrite, null);
      }
    },
    [pendingOverwrite, persist, query],
  );

  return {
    form,
    loading: query.isPending,
    loadError: query.error,
    reload: () => void query.refetch(),
    section,
    updatedAt: query.data?.updatedAt ?? null,
    save,
    saving: mutation.isPending,
    conflict,
    resolveConflict,
  };
}
