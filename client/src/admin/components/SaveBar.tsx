import { Loader2, Save, Undo2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "../lib/timestamps";
import { S } from "../strings";

/**
 * Sticky bar at the bottom of every form: dirty state, save and discard.
 * Reads the form from context so pages do not have to thread props through.
 */
export function SaveBar({ onSave, saving, updatedAt }: { onSave: () => void; saving: boolean; updatedAt: string | null }) {
  const { formState, reset } = useFormContext();
  const dirtyCount = Object.keys(formState.dirtyFields).length;
  const dirty = formState.isDirty;
  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-8 border-t border-line bg-white/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <div className="text-[0.8125rem] text-muted-foreground">
          {dirty ? <span className="text-ink">{S.form.unsaved(Math.max(dirtyCount, 1))}</span> : S.form.noChanges}
          {updatedAt && (
            <span className="ms-3 hidden sm:inline">
              {S.form.lastSavedAt}: {formatDateTime(updatedAt)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" disabled={!dirty || saving} onClick={() => reset()}>
            <Undo2 className="size-4" />
            {S.form.discard}
          </Button>
          <Button type="button" size="sm" disabled={!dirty || saving} onClick={onSave} className="bg-turquoise text-white hover:bg-deep">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {saving ? S.form.saving : S.form.save}
          </Button>
        </div>
      </div>
    </div>
  );
}
