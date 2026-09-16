import { Link } from "wouter";
import { ArrowUpRight, ChefHat, History, Home, Images, Inbox, Info, MapPin, PartyPopper, Phone, Type, Waves, BookOpen } from "lucide-react";
import type { SectionKey } from "@shared/content";
import { AdminApiError, useSection } from "../api";
import { formatDateTime } from "../lib/timestamps";
import { S } from "../strings";

const CARDS: { key: SectionKey; href: string; icon: typeof Home; title: string; body: string }[] = [
  { key: "units", href: "/admin/units", icon: Images, ...S.dashboard.sections.units },
  { key: "home", href: "/admin/home", icon: Home, ...S.dashboard.sections.home },
  { key: "contact", href: "/admin/contact", icon: Phone, ...S.dashboard.sections.contact },
  { key: "pool", href: "/admin/pool", icon: Waves, ...S.dashboard.sections.pool },
  { key: "events", href: "/admin/events", icon: PartyPopper, ...S.dashboard.sections.events },
  { key: "attractions", href: "/admin/attractions", icon: MapPin, ...S.dashboard.sections.attractions },
  { key: "about", href: "/admin/about", icon: Info, ...S.dashboard.sections.about },
  { key: "menu", href: "/admin/menu", icon: ChefHat, ...S.dashboard.sections.menu },
  { key: "guides", href: "/admin/guides", icon: BookOpen, ...S.dashboard.sections.guides },
  { key: "texts", href: "/admin/texts", icon: Type, ...S.dashboard.sections.texts },
];

const TOOLS = [
  { href: "/admin/history", icon: History, ...S.dashboard.tools.history },
  { href: "/admin/bookings", icon: Inbox, ...S.dashboard.tools.bookings },
];

function ToolCard({ card }: { card: (typeof TOOLS)[number] }) {
  return (
    <Link href={card.href} className="sv-card group block bg-white p-5 md:p-6">
      <card.icon className="size-5 text-gold" strokeWidth={1.5} />
      <h2 className="mt-4 text-[1.125rem] text-ink">{card.title}</h2>
      <p className="mt-2 text-[0.8125rem] text-muted-foreground">{card.body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] text-turquoise">
        {S.dashboard.open}
        <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
      </span>
    </Link>
  );
}

function SectionCard({ card }: { card: (typeof CARDS)[number] }) {
  const query = useSection(card.key);
  const dbMissing = query.error instanceof AdminApiError && query.error.status === 503;
  return (
    <Link href={card.href} className="sv-card group block bg-white p-5 md:p-6">
      <card.icon className="size-5 text-turquoise" strokeWidth={1.5} />
      <h2 className="mt-4 text-[1.125rem] text-ink">{card.title}</h2>
      <p className="mt-2 text-[0.8125rem] text-muted-foreground">{card.body}</p>
      <p className="mt-4 text-[0.72rem] text-muted-foreground">
        {dbMissing
          ? S.dashboard.dbMissing
          : query.data?.updatedAt
            ? `${S.dashboard.lastSaved}: ${formatDateTime(query.data.updatedAt)}`
            : query.data
              ? S.dashboard.neverSaved
              : ""}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] text-turquoise">
        {S.dashboard.open}
        <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
      </span>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-[1.35rem] text-ink">{S.dashboard.title}</h2>
      <p className="mt-2 max-w-[60ch] text-[0.875rem] text-muted-foreground">{S.dashboard.intro}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {CARDS.map(card => (
          <SectionCard key={card.key} card={card} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {TOOLS.map(card => (
          <ToolCard key={card.href} card={card} />
        ))}
      </div>
    </div>
  );
}
