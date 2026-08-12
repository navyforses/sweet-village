import { useState } from "react";

type MigrationProgress = { completed: number; total: number; nextOffset: number | null; complete: boolean; error?: string; status?: number };

export default function BlobMigration() {
  const [progress, setProgress] = useState<MigrationProgress | null>(null);
  const [running, setRunning] = useState(false);

  const start = async () => {
    setRunning(true);
    let offset = 0;
    try {
      while (true) {
        const response = await fetch(`/api/migrate-assets?offset=${offset}`, { method: "POST", credentials: "same-origin" });
        const raw = await response.text();
        let result: MigrationProgress;
        try {
          result = JSON.parse(raw) as MigrationProgress;
        } catch {
          throw new Error(`Vercel API-მ JSON-ის ნაცვლად სხვა პასუხი დააბრუნა (HTTP ${response.status})`);
        }
        if (!response.ok) throw new Error(result.error ?? `Migration request failed (HTTP ${response.status})`);
        setProgress(result);
        if (result.complete || result.nextOffset === null) break;
        offset = result.nextOffset;
      }
    } catch (error) {
      setProgress(current => ({ ...(current ?? { completed: 0, total: 0, nextOffset: null, complete: false }), error: error instanceof Error ? error.message : "Migration failed" }));
    } finally {
      setRunning(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
      <section className="w-full border border-line bg-white p-8 text-center">
        <p className="sv-eyebrow">Vercel Blob</p>
        <h1 className="mt-3 font-serif text-3xl text-ink">აქტიური ფოტოების გადატანა</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">ეს დროებითი, Vercel Authentication-ით დაცული გვერდი გადასცემს საიტზე გამოყენებულ ფოტოებს Blob store-ში. token ბრაუზერში არ ჩანს.</p>
        <button type="button" onClick={start} disabled={running || progress?.complete} className="mt-8 min-h-12 bg-turquoise px-6 text-sm text-white disabled:opacity-60">
          {running ? "ფოტოების გადატანა მიმდინარეობს…" : progress?.complete ? "ფოტოები გადატანილია" : "გადაიტანე აქტიური ფოტოები"}
        </button>
        {progress && (
          <div className={`mt-5 border p-4 text-sm ${progress.error ? "border-destructive bg-destructive/5 text-destructive" : "border-pistachio/40 text-ink"}`} role="status" aria-live="polite">
            {progress.error ? `შეცდომა: ${progress.error}` : `${progress.completed} / ${progress.total} ფოტო`}
          </div>
        )}
      </section>
    </main>
  );
}
