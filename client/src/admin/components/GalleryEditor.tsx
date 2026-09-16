import { useState } from "react";
import { ArrowDown, ArrowUp, Star, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
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
import { assetUrl } from "@/lib/assetUrl";
import { UploadButton } from "./ImageUploader";
import { MultiLangField } from "./MultiLangField";
import { S } from "../strings";

interface GalleryEditorProps {
  /** Form path of the Photo[] field. */
  name: string;
  min: number;
  max: number;
  /** Show per-photo caption editors (unit galleries) or not (homepage strip). */
  captions?: boolean;
  hint?: string;
  context?: string;
}

/**
 * Ordered photo list with cover, move and delete controls. Buttons instead
 * of drag-and-drop: they work with a thumb on a phone and need no extra
 * dependency. Photos are uploaded first, then appended to the form array.
 */
export function GalleryEditor({ name, min, max, captions = false, hint, context }: GalleryEditorProps) {
  const { control, getFieldState, formState } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ control, name });
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);
  const arrayError = getFieldState(name, formState).error?.message;

  const photos = fields as unknown as ({ id: string; url: string } & Record<string, unknown>)[];

  return (
    <div className="space-y-4">
      {hint && <p className="text-[0.75rem] text-muted-foreground">{hint}</p>}
      <ul className="grid gap-4 sm:grid-cols-2">
        {photos.map((photo, index) => (
          <li key={photo.id} className="border border-line bg-white">
            <div className="relative aspect-[4/3] overflow-hidden bg-pistachio/10">
              <img src={assetUrl(photo.url)} alt="" loading="lazy" className="size-full object-cover" />
              {index === 0 && (
                <Badge className="absolute start-2 top-2 rounded-none bg-gold text-ink">
                  <Star className="size-3" /> {S.gallery.cover}
                </Badge>
              )}
              <span className="absolute end-2 top-2 bg-ink/70 px-2 py-0.5 text-[0.7rem] text-white">
                {index + 1} / {photos.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-2">
              <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={S.gallery.up}>
                <ArrowUp className="size-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 px-2" disabled={index === photos.length - 1} onClick={() => move(index, index + 1)} aria-label={S.gallery.down}>
                <ArrowDown className="size-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 text-[0.75rem]" disabled={index === 0} onClick={() => move(index, 0)}>
                <Star className="size-3.5" /> {S.gallery.makeCover}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ms-auto h-8 text-[0.75rem] text-destructive hover:text-destructive"
                onClick={() => {
                  if (photos.length <= min) toast.error(S.gallery.minPhotos(min));
                  else setPendingRemove(index);
                }}>
                <Trash2 className="size-3.5" /> {S.gallery.remove}
              </Button>
            </div>
            {captions && (
              <details className="border-t border-line px-3 py-2">
                <summary className="cursor-pointer text-[0.75rem] text-muted-foreground">{S.gallery.caption}</summary>
                <div className="pb-2 pt-3">
                  <MultiLangField name={`${name}.${index}.caption`} label={S.gallery.caption} kind="caption" maxLength={120} required={false} context={context} />
                </div>
              </details>
            )}
          </li>
        ))}
      </ul>
      {arrayError && (
        <p className="text-[0.75rem] text-destructive" role="alert">
          {arrayError}
        </p>
      )}
      <UploadButton disabled={photos.length >= max} onUploaded={url => append({ url, caption: {} })} />

      <AlertDialog open={pendingRemove !== null} onOpenChange={open => !open && setPendingRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{S.gallery.removeTitle}</AlertDialogTitle>
            <AlertDialogDescription>{S.gallery.removeBody}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{S.form.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (pendingRemove !== null) remove(pendingRemove);
                setPendingRemove(null);
              }}>
              {S.gallery.remove}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
