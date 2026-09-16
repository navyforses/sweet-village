import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { History as HistoryIcon, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_CONTENT, isSectionKey, SECTION_KEYS, type SectionKey } from "@shared/content";
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
import { Skeleton } from "@/components/ui/skeleton";
import { AdminApiError, useRestore, useRevision, useRevisions, useSection, type RevisionSummary } from "../api";
import { LoadFailed } from "../components/Field";
import { describePath, diffLeaves, formatLeaf, type LeafChange } from "../lib/diff";
import { formatDateTime } from "../lib/timestamps";
import { S } from "../strings";

const SECTION_LABELS: Record<SectionKey, string> = {
  units: S.nav.units,
  home: S.nav.home,
  contact: S.nav.contact,
  location: S.nav.contact,
  pool: S.nav.pool,
  events: S.nav.events,
  attractions: S.nav.attractions,
  about: S.nav.about,
  menu: S.nav.menu,
  texts: S.nav.texts,
};

const PREVIEW_LIMIT = 40;

function noteLabel(note: string | null): string {
  const restored = note?.match(/^restore:(\d+)$/);
  if (restored) return S.history.restored(Number(restored[1]));
  return note || S.history.manual;
}

/** Change list; long lists collapse behind a "more" button so a menu-wide save stays readable. */
function ChangeList({ changes, before, after }: { changes: LeafChange[]; before: unknown; after: unknown }) {
  const [expanded, setExpanded] = useState(false);
  if (changes.length === 0) return <p className="text-[0.8125rem] text-muted-foreground">{S.history.noChanges}</p>;
  const shown = expanded ? changes : changes.slice(0, PREVIEW_LIMIT);
  return (
    <div className="space-y-2">
      <p className="text-[0.75rem] text-muted-foreground">{S.history.changeCount(changes.length)}</p>
      <ul className="divide-y divide-line border border-line bg-white">
        {shown.map(change => (
          <li key={change.path} className="grid gap-1 px-3 py-2 text-[0.8125rem] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
            <span className="min-w-0 break-words text-ink">{describePath(change.path, after, before)}</span>
            <span className="min-w-0 break-words text-muted-foreground line-through decoration-destructive/60">
              <span className="me-1 text-[0.65rem] uppercase no-underline sm:hidden">{S.history.before}:</span>
              {formatLeaf(change.before)}
            </span>
            <span className="min-w-0 break-words text-turquoise">
              <span className="me-1 text-[0.65rem] uppercase text-muted-foreground sm:hidden">{S.history.after}:</span>
              {formatLeaf(change.after)}
            </span>
          </li>
        ))}
      </ul>
      {!expanded && changes.length > PREVIEW_LIMIT && (
        <Button type="button" variant="outline" size="sm" onClick={() => setExpanded(true)}>
          {S.history.more(changes.length - PREVIEW_LIMIT)}
        </Button>
      )}
    </div>
  );
}

function RevisionDetailPanel({ sectionKey, revision, previous, isCurrent }: { sectionKey: SectionKey; revision: RevisionSummary; previous: RevisionSummary | null; isCurrent: boolean }) {
  const current = useSection(sectionKey);
  const selected = useRevision(sectionKey, revision.id);
  const before = useRevision(sectionKey, previous?.id ?? null);
  const restore = useRestore(sectionKey);
  const [confirming, setConfirming] = useState(false);

  const selectedValue = selected.data?.revision.value;
  const currentValue = current.data?.value;
  // With no earlier revision the compiled defaults are what this save replaced.
  const previousValue: unknown = previous ? before.data?.revision.value : DEFAULT_CONTENT[sectionKey];

  const changedInThis = useMemo(() => (selectedValue !== undefined && previousValue !== undefined ? diffLeaves(previousValue, selectedValue) : null), [previousValue, selectedValue]);
  const vsCurrent = useMemo(() => (selectedValue !== undefined && currentValue !== undefined ? diffLeaves(currentValue, selectedValue) : null), [currentValue, selectedValue]);

  if (selected.isPending || current.isPending || (previous && before.isPending)) return <Skeleton className="h-48 w-full" />;
  if (selected.isError || current.isError) return <LoadFailed error={selected.error ?? current.error} reload={() => void selected.refetch()} />;

  const runRestore = async () => {
    setConfirming(false);
    try {
      await restore.mutateAsync({ id: revision.id, ifUpdatedAt: current.data?.updatedAt ?? null });
      toast.success(S.history.restoredToast);
    } catch (error) {
      if (error instanceof AdminApiError && error.status === 409) toast.error(S.history.restoreConflict);
      else toast.error(S.history.restoreFailed);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-[1.0625rem] text-ink">{S.history.version(revision.id)}</h3>
          <p className="text-[0.75rem] text-muted-foreground">
            {formatDateTime(revision.savedAt)} · {noteLabel(revision.note)}
          </p>
        </div>
        <Button type="button" size="sm" disabled={isCurrent || restore.isPending} onClick={() => setConfirming(true)} className="bg-turquoise text-white hover:bg-deep">
          <RotateCcw className="size-4" /> {S.history.restore}
        </Button>
      </div>

      <section className="space-y-2">
        <h4 className="text-[0.9375rem] text-ink">{S.history.changedInThis}</h4>
        <p className="text-[0.75rem] text-muted-foreground">{previous ? S.history.changedInThisHint : S.history.firstVersion}</p>
        {changedInThis ? <ChangeList changes={changedInThis} before={previousValue} after={selectedValue} /> : <Skeleton className="h-16 w-full" />}
      </section>

      {!isCurrent && (
        <section className="space-y-2">
          <h4 className="text-[0.9375rem] text-ink">{S.history.vsCurrent}</h4>
          <p className="text-[0.75rem] text-muted-foreground">{S.history.vsCurrentHint}</p>
          {vsCurrent ? <ChangeList changes={vsCurrent} before={currentValue} after={selectedValue} /> : <Skeleton className="h-16 w-full" />}
        </section>
      )}

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{S.history.restoreTitle}</AlertDialogTitle>
            <AlertDialogDescription>{S.history.restoreBody}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{S.form.cancel}</AlertDialogCancel>
            <AlertDialogAction className="bg-turquoise text-white hover:bg-deep" onClick={() => void runRestore()}>
              {S.history.restoreConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SectionHistory({ sectionKey }: { sectionKey: SectionKey }) {
  const revisions = useRevisions(sectionKey);
  const current = useSection(sectionKey);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (revisions.isPending) return <Skeleton className="h-64 w-full" />;
  if (revisions.isError) return <LoadFailed error={revisions.error} reload={() => void revisions.refetch()} />;

  const list = revisions.data.revisions;
  if (list.length === 0) return <p className="border border-line bg-white p-6 text-center text-[0.875rem] text-muted-foreground">{S.history.noRevisions}</p>;

  const currentAt = current.data?.updatedAt ?? null;
  const selected = list.find(item => item.id === selectedId) ?? null;
  const previous = selected ? (list[list.indexOf(selected) + 1] ?? null) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <ol className="space-y-2">
        {list.map(item => {
          const isCurrent = item.savedAt === currentAt;
          const active = item.id === selectedId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`flex w-full flex-col items-start gap-1 border px-3 py-2 text-start ${active ? "border-turquoise bg-turquoise/5" : "border-line bg-white hover:border-pistachio"}`}>
                <span className="flex w-full items-center justify-between gap-2 text-[0.8125rem] text-ink">
                  <span dir="ltr">{formatDateTime(item.savedAt)}</span>
                  {isCurrent && <Badge className="rounded-none bg-gold text-ink">{S.history.current}</Badge>}
                </span>
                <span className="text-[0.72rem] text-muted-foreground">
                  {S.history.version(item.id)} · {noteLabel(item.note)}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="min-w-0">
        {selected ? (
          <RevisionDetailPanel key={selected.id} sectionKey={sectionKey} revision={selected} previous={previous} isCurrent={selected.savedAt === currentAt} />
        ) : (
          <p className="border border-line bg-white p-6 text-center text-[0.875rem] text-muted-foreground">{S.history.selectHint}</p>
        )}
      </div>
    </div>
  );
}

export default function History() {
  const { section } = useParams<{ section?: string }>();
  const sectionKey: SectionKey = isSectionKey(section) ? section : "units";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-[1.35rem] text-ink">
          <HistoryIcon className="size-5 text-gold" strokeWidth={1.5} />
          {S.history.title}
        </h2>
        <p className="mt-2 max-w-[70ch] text-[0.875rem] text-muted-foreground">{S.history.intro}</p>
      </div>
      <nav aria-label={S.history.pickSection} className="flex flex-wrap gap-2">
        {SECTION_KEYS.filter(key => key !== "location").map(key => (
          <Link
            key={key}
            href={`/admin/history/${key}`}
            className={`min-h-9 border px-3 text-[0.8125rem] leading-9 ${key === sectionKey ? "border-turquoise bg-turquoise text-white" : "border-line bg-white text-ink hover:border-pistachio"}`}>
            {SECTION_LABELS[key]}
          </Link>
        ))}
      </nav>
      <SectionHistory key={sectionKey} sectionKey={sectionKey} />
    </div>
  );
}
