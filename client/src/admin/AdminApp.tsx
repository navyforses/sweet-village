import { useEffect, type ComponentType, type ReactNode } from "react";
import { Redirect, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminShell } from "./AdminShell";
import { isUnauthorized, useAdminSession } from "./api";
import { S } from "./strings";
import AboutEdit from "./pages/AboutEdit";
import Attractions from "./pages/Attractions";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import EventEdit from "./pages/EventEdit";
import Events from "./pages/Events";
import HomeEdit from "./pages/HomeEdit";
import Login from "./pages/Login";
import PoolEdit from "./pages/PoolEdit";
import Texts from "./pages/Texts";
import TextsEdit from "./pages/TextsEdit";
import UnitEdit from "./pages/UnitEdit";
import Units from "./pages/Units";

/** Session gate: skeleton while checking, redirect to login on 401, shell otherwise. */
function Guarded({ title, children }: { title: string; children: ReactNode }) {
  const session = useAdminSession();
  if (session.isPending) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 p-6" role="status" aria-live="polite">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <span className="sr-only">{S.session.checking}</span>
      </div>
    );
  }
  if (session.isError) {
    if (isUnauthorized(session.error)) return <Redirect to="/admin/login" replace />;
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <p className="text-[0.9375rem] text-ink">{S.form.loadFailed}</p>
        <Button type="button" variant="outline" className="mt-4" onClick={() => session.refetch()}>
          {S.form.retry}
        </Button>
      </div>
    );
  }
  return <AdminShell title={title}>{children}</AdminShell>;
}

const page = (title: string, Component: ComponentType) => () => (
  <Guarded title={title}>
    <Component />
  </Guarded>
);

const DashboardPage = page(S.nav.dashboard, Dashboard);
const UnitsPage = page(S.nav.units, Units);
const UnitEditPage = page(S.nav.units, UnitEdit);
const HomePage = page(S.nav.home, HomeEdit);
const ContactPage = page(S.nav.contact, Contact);
const PoolPage = page(S.nav.pool, PoolEdit);
const EventsPage = page(S.nav.events, Events);
const EventEditPage = page(S.nav.events, EventEdit);
const AttractionsPage = page(S.nav.attractions, Attractions);
const AboutPage = page(S.nav.about, AboutEdit);
const TextsPage = page(S.nav.texts, Texts);
const TextsEditPage = page(S.nav.texts, TextsEdit);

/**
 * Owner admin panel. Georgian-only, left-to-right, never indexed. Rendered
 * outside the public providers (see App.tsx) so it does not inherit the
 * public language switching or the cached public content.
 */
export default function AdminApp() {
  useEffect(() => {
    const html = document.documentElement;
    const previous = { lang: html.lang, dir: html.dir, title: document.title };
    html.lang = "ka";
    html.dir = "ltr";
    document.title = S.appTitle;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => {
      html.lang = previous.lang;
      html.dir = previous.dir;
      document.title = previous.title;
      robots.remove();
    };
  }, []);

  return (
    <TooltipProvider>
      <Toaster position="top-center" />
      <Switch>
        <Route path="/admin/login" component={Login} />
        <Route path="/admin" component={DashboardPage} />
        <Route path="/admin/units" component={UnitsPage} />
        <Route path="/admin/units/:unitId" component={UnitEditPage} />
        <Route path="/admin/home" component={HomePage} />
        <Route path="/admin/contact" component={ContactPage} />
        <Route path="/admin/pool" component={PoolPage} />
        <Route path="/admin/events" component={EventsPage} />
        <Route path="/admin/events/:eventId" component={EventEditPage} />
        <Route path="/admin/attractions" component={AttractionsPage} />
        <Route path="/admin/about" component={AboutPage} />
        <Route path="/admin/texts" component={TextsPage} />
        <Route path="/admin/texts/:section" component={TextsEditPage} />
        <Route>
          <Redirect to="/admin" replace />
        </Route>
      </Switch>
    </TooltipProvider>
  );
}
