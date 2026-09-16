import { Link } from "wouter";
import { ArrowUpRight, BedDouble, Images, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { assetUrl } from "@/lib/assetUrl";
import { useSection } from "../api";
import { LoadFailed } from "../components/Field";
import { S } from "../strings";

export default function Units() {
  const query = useSection("units");

  if (query.isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }
  if (query.isError) return <LoadFailed error={query.error} reload={() => query.refetch()} />;

  return (
    <div>
      <h2 className="text-[1.35rem] text-ink">{S.units.title}</h2>
      <p className="mt-2 text-[0.875rem] text-muted-foreground">{S.units.intro}</p>
      <ul className="mt-6 space-y-3">
        {query.data.value.units.map(unit => (
          <li key={unit.id}>
            <Link href={`/admin/units/${unit.id}`} className="sv-card flex gap-4 bg-white p-3 md:p-4">
              <img src={assetUrl(unit.gallery[0]?.url ?? "")} alt="" className="size-24 shrink-0 object-cover md:size-28" loading="lazy" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[1.0625rem] text-ink">{unit.name.ka}</h3>
                <p dir="ltr" className="mt-1 font-serif text-[1.125rem] text-turquoise">
                  {unit.nightlyPrice} {S.units.perNight}
                </p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5" strokeWidth={1.5} /> {unit.maxGuests} {S.units.guests}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="size-3.5" strokeWidth={1.5} /> {unit.beds} {S.units.beds}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Images className="size-3.5" strokeWidth={1.5} /> {unit.gallery.length} {S.units.photos}
                  </span>
                </p>
              </div>
              <span className="hidden items-center gap-1 self-center text-[0.8125rem] text-turquoise sm:inline-flex">
                {S.units.edit}
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
