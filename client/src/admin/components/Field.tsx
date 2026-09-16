import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AdminApiError } from "../api";
import { S } from "../strings";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={htmlFor} className="text-[0.8125rem] text-ink">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-[0.75rem] text-destructive" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[0.75rem] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

/** Section card used by every admin form. */
export function FormCard({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="border border-line bg-white p-5 md:p-7">
      <h2 className="text-[1.125rem] text-ink">{title}</h2>
      {intro && <p className="mt-2 text-[0.8125rem] text-muted-foreground">{intro}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

/** Error state for a section that could not be loaded; explains a missing database instead of a generic failure. */
export function LoadFailed({ error, reload }: { error: unknown; reload: () => void }) {
  const dbMissing = error instanceof AdminApiError && error.status === 503;
  return (
    <div className="border border-line bg-white p-6 text-center">
      <p className="text-[0.9375rem] text-ink">{dbMissing ? S.dashboard.dbMissing : S.form.loadFailed}</p>
      {!dbMissing && (
        <Button type="button" variant="outline" className="mt-4" onClick={reload}>
          {S.form.retry}
        </Button>
      )}
    </div>
  );
}
