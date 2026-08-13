import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./i18n";
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
const BlobMigration = lazy(() => import("./pages/BlobMigration"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

function Router() {
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
      <Route path="/booking" component={Booking} />
      <Route path="/migration" component={BlobMigration} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <I18nProvider>
          <TooltipProvider>
            <Toaster position="top-center" />
            <Layout>
              <Suspense fallback={<PageFallback />}>
                <Router />
              </Suspense>
            </Layout>
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
