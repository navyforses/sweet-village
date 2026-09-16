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
import { S } from "../strings";

export function ConflictDialog({ open, onResolve }: { open: boolean; onResolve: (choice: "reload" | "overwrite" | "cancel") => void }) {
  return (
    <AlertDialog open={open} onOpenChange={next => !next && onResolve("cancel")}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{S.form.conflictTitle}</AlertDialogTitle>
          <AlertDialogDescription>{S.form.conflictBody}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onResolve("cancel")}>{S.form.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={() => onResolve("reload")}>{S.form.conflictReload}</AlertDialogAction>
          <AlertDialogAction onClick={() => onResolve("overwrite")} className="bg-turquoise text-white hover:bg-deep">
            {S.form.conflictOverwrite}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
