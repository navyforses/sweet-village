import { CalendarDays, MessageCircle, Phone, RefreshCw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookings, useSection } from "../api";
import { LoadFailed } from "../components/Field";
import { formatDateTime } from "../lib/timestamps";
import { S } from "../strings";

const LANG_LABELS: Record<string, string> = { ka: "ქართული", en: "English", ru: "Русский", ar: "العربية", fr: "Français", es: "Español" };

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

/** Read-only enquiry list; the owner answers by phone or WhatsApp, nothing is edited here. */
export default function Bookings() {
  const query = useBookings();
  const units = useSection("units");
  const unitName = (id: string | null) => (id ? (units.data?.value.units.find(unit => unit.id === id)?.name.ka ?? id) : null);

  if (query.isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }
  if (query.isError) return <LoadFailed error={query.error} reload={() => void query.refetch()} />;

  const rows = query.data.bookings;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[1.35rem] text-ink">{S.bookings.title}</h2>
          <p className="mt-2 max-w-[70ch] text-[0.875rem] text-muted-foreground">{S.bookings.intro}</p>
        </div>
        <Button type="button" variant="outline" size="sm" disabled={query.isFetching} onClick={() => void query.refetch()}>
          <RefreshCw className={`size-4 ${query.isFetching ? "animate-spin" : ""}`} /> {S.bookings.refresh}
        </Button>
      </div>
      <p className="text-[0.75rem] text-muted-foreground">{S.bookings.count(rows.length)}</p>

      {rows.length === 0 ? (
        <p className="border border-line bg-white p-6 text-center text-[0.875rem] text-muted-foreground">{S.bookings.empty}</p>
      ) : (
        <ul className="space-y-3">
          {rows.map(row => {
            const wa = whatsappHref(row.phone);
            const unit = unitName(row.unit);
            return (
              <li key={row.id} className="sv-card bg-white p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] text-ink">{row.name}</h3>
                    <p dir="ltr" className="mt-0.5 text-[0.8125rem] text-muted-foreground">
                      {formatDateTime(row.createdAt)} · #{row.id}
                    </p>
                  </div>
                  <span className="border border-gold/50 px-2 py-0.5 text-[0.75rem] text-ink">{S.bookings.interest[row.interest] ?? row.interest}</span>
                </div>
                <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-[0.8125rem] sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="size-3.5" strokeWidth={1.5} />
                    </dt>
                    <dd dir="ltr" className="text-ink">
                      {row.phone}
                    </dd>
                  </div>
                  {(row.checkIn || row.checkOut) && (
                    <div className="flex gap-2">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="size-3.5" strokeWidth={1.5} /> {S.bookings.dates}:
                      </dt>
                      <dd dir="ltr" className="text-ink">
                        {row.checkIn ?? "—"} → {row.checkOut ?? "—"}
                      </dd>
                    </div>
                  )}
                  {row.guests !== null && (
                    <div className="flex gap-2">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <Users className="size-3.5" strokeWidth={1.5} /> {S.bookings.guests}:
                      </dt>
                      <dd className="text-ink">{row.guests}</dd>
                    </div>
                  )}
                  {unit && (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">{S.bookings.unit}:</dt>
                      <dd className="text-ink">{unit}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">{S.bookings.lang}:</dt>
                    <dd className="text-ink">{LANG_LABELS[row.lang] ?? row.lang}</dd>
                  </div>
                </dl>
                {row.notes && (
                  <p className="mt-3 whitespace-pre-wrap border-s-2 border-line ps-3 text-[0.8125rem] text-ink">
                    <span className="me-1 text-muted-foreground">{S.bookings.notes}:</span>
                    {row.notes}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={`tel:${row.phone.replace(/[^+\d]/g, "")}`}>
                      <Phone className="size-4" /> {S.bookings.call}
                    </a>
                  </Button>
                  {wa && (
                    <Button asChild size="sm" className="bg-turquoise text-white hover:bg-deep">
                      <a href={wa} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-4" /> {S.bookings.whatsapp}
                      </a>
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
