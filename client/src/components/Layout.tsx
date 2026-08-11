import { useEffect } from "react";
import { useLocation } from "wouter";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingContact from "./FloatingContact";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  // Every route change starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return (
    <div className="sv-paper-texture flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
