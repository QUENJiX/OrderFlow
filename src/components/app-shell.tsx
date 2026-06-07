import type { ReactNode } from "react";
import { getRuntimeConfig } from "@/lib/config/env";
import type { Shop } from "@/lib/domain/types";
import type { AuthenticatedUser } from "@/lib/auth/session";
import { AccountMenu } from "./account-menu";
import { CommandPalette, CommandTrigger } from "./command-palette";
import { MerchantNav } from "./merchant-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "./ui/badge";
import { Kbd } from "./ui/kbd";

function BrandMark() {
  return (
    <span className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-xs font-bold text-primary-foreground shadow-sm">
      OF
    </span>
  );
}

export function AppShell({
  title,
  description,
  children,
  actions,
  shop,
  user
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  shop: Shop;
  user: AuthenticatedUser;
}) {
  const config = getRuntimeConfig();

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2.5 px-4 py-4">
          <BrandMark />
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight">OrderFlow BD</div>
            <div className="text-xs text-muted-foreground">Merchant order desk</div>
          </div>
        </div>

        <div className="px-3">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/50 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{shop.name}</div>
                <div className="text-xs capitalize text-muted-foreground">
                  {shop.plan} plan
                </div>
              </div>
              <Badge tone="success" dot className="capitalize">
                {shop.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto px-3">
          <MerchantNav />
        </div>

        <div className="border-t border-sidebar-border px-4 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Quick command</span>
            <Kbd>⌘K</Kbd>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur-md lg:px-6">
          <MobileNav plan={shop.plan} shopName={shop.name} />
          <h1 className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight">
            {title}
          </h1>
          <CommandTrigger />
          {actions}
          <ThemeToggle />
          <AccountMenu
            email={user.email ?? "Merchant"}
            isSupabaseConfigured={config.supabase.isConfigured}
            redirectPath="/merchant/login"
            settingsHref="/merchant/settings"
            supabasePublishableKey={config.supabase.publishableKey}
            supabaseUrl={config.supabase.url}
          />
        </header>

        <main className="flex-1 px-4 py-6 lg:px-6">
          {description ? (
            <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
