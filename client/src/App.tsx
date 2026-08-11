import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./i18n";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Stay from "./pages/Stay";
import AccommodationDetail from "./pages/AccommodationDetail";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import Pool from "./pages/Pool";
import Location from "./pages/Location";
import About from "./pages/About";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/stay/:unitId" component={AccommodationDetail} />
      <Route path="/stay" component={Stay} />
      {/* /menu must always resolve to this live page, never a static file. */}
      <Route path="/menu" component={Menu} />
      <Route path="/events" component={Events} />
      <Route path="/pool" component={Pool} />
      <Route path="/location" component={Location} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
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
              <Router />
            </Layout>
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
