import Link from "next/link";
import type { ReactNode } from "react";
import { getRuntimeConfig } from "@/lib/config/env";
import type { Shop } from "@/lib/domain/types";
import type { AuthenticatedUser } from "@/lib/auth/session";
import { MerchantNav } from "./merchant-nav";
import { SignOutButton } from "./sign-out-button";

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
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/merchant/dashboard">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Merchant order desk</small>
          </span>
        </Link>
        <MerchantNav />
        <div className="shop-card">
          <span>Active shop</span>
          <strong>{shop.name}</strong>
          <small>{shop.plan} · {shop.status}</small>
        </div>
      </aside>
      <main className="main-panel">
        <header className="ops-topbar">
          <div className="topbar-title">
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>
          <div className="topbar-actions">
            {actions}
            <div className="account-chip">
              <span>{user.email ?? "Merchant"}</span>
              <SignOutButton
                isSupabaseConfigured={config.supabase.isConfigured}
                redirectPath="/merchant/login"
                supabasePublishableKey={config.supabase.publishableKey}
                supabaseUrl={config.supabase.url}
              />
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
