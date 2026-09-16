import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Router, Switch, useLocation } from "wouter";
import type { SparseContent } from "@shared/content";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContentProvider } from "./content/ContentProvider";
import { I18nProvider, useI18n } from "./i18n";
import { localeBase } from "./i18n/paths";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const Stay = lazy(() => import("./pages/Stay"));
const AccommodationDetail = lazy(() => import("./pages/AccommodationDetail"));
const Menu = lazy(() => import("./pages/Menu"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Pool = lazy(() => import("./pages/Pool"));
const Location = lazy(() => import("./pages/Location"));
const About = lazy(() => import("./pages/About"));
const Booking = lazy(() => import("./pages/Booking"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideDetail = lazy(() => import("./pages/GuideDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

function PageFallback() {
  return (
    <div
      className="container flex min-h-[55svh] items-center justify-center py-16"
      role="status"
      aria-live="polite">
      <span className="size-8 animate-pulse rounded-full border-2 border-turquoise border-t-transparent" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/stay/:unitId" component={AccommodationDetail} />
      <Route path="/stay" component={Stay} />
      {/* /menu must always resolve to this live page, never a static file. */}
      <Route path="/menu" component={Menu} />
      <Route path="/events/:eventId" component={EventDetail} />
      <Route path="/events" component={Events} />
      <Route path="/pool" component={Pool} />
      <Route path="/location" component={Location} />
      <Route path="/about" component={About} />
      <Route path="/guides/:slug" component={GuideDetail} />
      <Route path="/guides" component={Guides} />
      <Route path="/booking" component={Booking} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

/** Routes and links are language-relative; wouter prefixes them with the language base (/en, /ru, …). */
function LocalizedRouter() {
  const { lang } = useI18n();
  return (
    <Router base={localeBase(lang)}>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <PublicRoutes />
        </Suspense>
      </Layout>
    </Router>
  );
}

/** The public site: owner content + six languages + shared chrome. */
function PublicSite({ initialContent }: { initialContent?: SparseContent | null }) {
  return (
    <ContentProvider initial={initialContent}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster position="top-center" />
          <LocalizedRouter />
        </TooltipProvider>
      </I18nProvider>
    </ContentProvider>
  );
}

/**
 * `/admin` is the owner's panel: Georgian-only, no public header/footer, no
 * public content provider (it edits the content, it does not render it).
 */
function Shell({ initialContent }: { initialContent?: SparseContent | null }) {
  const [location] = useLocation();
  const isAdmin = location === "/admin" || location.startsWith("/admin/");
  if (isAdmin) {
    return (
      <Suspense fallback={<PageFallback />}>
        <AdminApp />
      </Suspense>
    );
  }
  return <PublicSite initialContent={initialContent} />;
}

/** `initialContent` is only passed by the prerender entry; in the browser the provider reads the embedded JSON itself. */
function App({ initialContent }: { initialContent?: SparseContent | null }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Shell initialContent={initialContent} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
