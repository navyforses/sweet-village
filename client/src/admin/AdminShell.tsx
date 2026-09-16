import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ChefHat, ExternalLink, Home, Images, Info, LayoutDashboard, LogOut, MapPin, PartyPopper, Phone, Type, Waves } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Borjgali } from "@/components/Ornaments";
import { useLogout } from "./api";
import { S } from "./strings";

const NAV = [
  { href: "/admin", label: S.nav.dashboard, icon: LayoutDashboard, exact: true },
  { href: "/admin/units", label: S.nav.units, icon: Images, exact: false },
  { href: "/admin/home", label: S.nav.home, icon: Home, exact: true },
  { href: "/admin/contact", label: S.nav.contact, icon: Phone, exact: true },
  { href: "/admin/pool", label: S.nav.pool, icon: Waves, exact: true },
  { href: "/admin/events", label: S.nav.events, icon: PartyPopper, exact: false },
  { href: "/admin/attractions", label: S.nav.attractions, icon: MapPin, exact: true },
  { href: "/admin/about", label: S.nav.about, icon: Info, exact: true },
  { href: "/admin/menu", label: S.nav.menu, icon: ChefHat, exact: false },
  { href: "/admin/texts", label: S.nav.texts, icon: Type, exact: false },
];

/** Sidebar + content frame for every authenticated admin page. */
export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const [location, navigate] = useLocation();
  const logout = useLogout();

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" className="border-e border-line">
        <SidebarHeader className="h-16 justify-center border-b border-line px-4">
          <div className="flex items-center gap-3">
            <Borjgali size={18} />
            <div className="min-w-0">
              <p className="truncate font-serif text-[0.9375rem] tracking-[0.08em] text-ink">{S.brand}</p>
              <p className="sv-eyebrow text-[0.6rem]">{S.panel}</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV.map(item => {
                  const active = item.exact ? location === item.href : location === item.href || location.startsWith(`${item.href}/`);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={active} className="h-10">
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-line p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10">
                <a href={`/?fresh=${Date.now()}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  <span>{S.nav.viewSite}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="h-10 text-destructive hover:text-destructive"
                disabled={logout.isPending}
                onClick={() => logout.mutate(undefined, { onSettled: () => navigate("/admin/login") })}>
                <LogOut className="size-4" />
                <span>{S.nav.logout}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur md:px-8">
          <SidebarTrigger className="size-9" />
          <h1 className="truncate text-[1rem] text-ink">{title}</h1>
        </header>
        <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-8 md:py-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
