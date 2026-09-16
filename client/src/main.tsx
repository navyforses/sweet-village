import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { upgradeLegacyLangUrl } from "./i18n/paths";
import "./index.css";

const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    console.error("[API Query Error]", event.query.state.error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    console.error("[API Mutation Error]", event.mutation.state.error);
  }
});

// Legacy `?lang=xx` links (old QR codes, shares) load the prerendered page of that
// language instead: a hard replace keeps the server-rendered head tags consistent.
const legacy = upgradeLegacyLangUrl(window.location.pathname, window.location.search);
if (legacy) window.location.replace(legacy);

const root = document.getElementById("root")!;
const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Public pages arrive prerendered (see scripts/prerender.ts) and hydrate; the admin shell is empty and renders from scratch.
if (legacy) {
  /* navigating away */
} else if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
