import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { LANGS, type Lang } from "@shared/langs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminApiError, useTranslate, type TranslateKind } from "../api";
import { S } from "../strings";

interface MultiLangFieldProps {
  /** Form path of the localized object, e.g. "name" or "gallery.2.caption". */
  name: string;
  label: string;
  kind: TranslateKind;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  /** Georgian is required unless the field is optional (captions). */
  required?: boolean;
  /** Short hint passed to the translator, e.g. the unit's name. */
  context?: string;
  hint?: string;
}

/**
 * One value per language behind tabs. Georgian is the source; the button on
 * the Georgian tab fills the other five languages through /api/admin/translate.
 * Nothing is saved until the form's Save button is pressed.
 */
export function MultiLangField({ name, label, kind, multiline, rows = 4, maxLength, required = true, context, hint }: MultiLangFieldProps) {
  const { register, getValues, setValue, watch, getFieldState, formState } = useFormContext();
  const translate = useTranslate();
  const [freshlyTranslated, setFreshlyTranslated] = useState(false);
  const values = (watch(name) ?? {}) as Partial<Record<Lang, string>>;

  const runTranslate = async () => {
    const source = (getValues(`${name}.ka`) as string | undefined)?.trim();
    if (!source) {
      toast.error(S.lang.translateEmptyKa);
      return;
    }
    try {
      const result = await translate.mutateAsync({
        items: [{ id: name, text: source, kind, maxChars: maxLength }],
        context,
      });
      const translations = result.items.find(item => item.id === name)?.translations ?? {};
      for (const lang of LANGS) {
        if (lang === "ka") continue;
        const value = translations[lang];
        if (value) setValue(`${name}.${lang}`, value, { shouldDirty: true, shouldValidate: true });
      }
      setFreshlyTranslated(true);
      toast.success(S.lang.translated);
    } catch (error) {
      if (error instanceof AdminApiError && error.status === 503) toast.error(S.lang.translateNotConfigured);
      else if (error instanceof AdminApiError && error.status === 429) toast.error(S.lang.translateRateLimited);
      else toast.error(S.lang.translateFailed);
    }
  };

  const errorFor = (lang: Lang) => {
    const state = getFieldState(`${name}.${lang}`, formState);
    if (!state.error) return null;
    return values[lang]?.trim() ? state.error.message ?? S.form.invalid : S.form.required;
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[0.8125rem] text-ink">
          {label}
          {required && <span className="ms-1 text-destructive">*</span>}
        </span>
        <Button type="button" variant="outline" size="sm" onClick={runTranslate} disabled={translate.isPending} className="h-8 text-[0.75rem]">
          {translate.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Languages className="size-3.5" />}
          {translate.isPending ? S.lang.translating : S.lang.translate}
        </Button>
      </div>
      <Tabs defaultValue="ka">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {LANGS.map(lang => {
            const empty = !values[lang]?.trim();
            const error = errorFor(lang);
            return (
              <TabsTrigger
                key={lang}
                value={lang}
                className={`h-8 border border-line bg-white px-3 text-[0.75rem] data-[state=active]:border-turquoise data-[state=active]:bg-turquoise data-[state=active]:text-white ${error ? "border-destructive" : ""}`}>
                {S.lang.labels[lang]}
                {empty && lang !== "ka" && <span className="ms-1.5 inline-block size-1.5 rounded-full bg-gold" title={S.lang.untranslated} />}
                {!empty && freshlyTranslated && lang !== "ka" && <span className="ms-1.5 inline-block size-1.5 rounded-full bg-pistachio" />}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {LANGS.map(lang => {
          const id = `${name}.${lang}`.replace(/\./g, "-");
          const error = errorFor(lang);
          const dir = lang === "ar" ? "rtl" : "ltr";
          return (
            <TabsContent key={lang} value={lang} className="mt-2">
              {multiline ? (
                <Textarea id={id} dir={dir} rows={rows} maxLength={maxLength} {...register(`${name}.${lang}`)} aria-invalid={Boolean(error)} className="bg-white" />
              ) : (
                <Input id={id} dir={dir} maxLength={maxLength} {...register(`${name}.${lang}`)} aria-invalid={Boolean(error)} className="bg-white" />
              )}
              {error ? (
                <p className="mt-1.5 text-[0.75rem] text-destructive" role="alert">
                  {error}
                </p>
              ) : hint && lang === "ka" ? (
                <p className="mt-1.5 text-[0.75rem] text-muted-foreground">{hint}</p>
              ) : null}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
