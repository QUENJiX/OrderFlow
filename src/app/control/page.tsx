import { Activity, Building2, ClipboardList, WalletCards } from "lucide-react";
import Link from "next/link";
import { AccountMenu } from "@/components/account-menu";
import { ControlBillingQueue } from "@/components/control-billing-queue";
import { ControlShopTable } from "@/components/control-shop-table";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { buildPlatformOverview } from "@/lib/domain/analytics";
import { formatBdt } from "@/lib/domain/money";
import { requirePlatformAdmin } from "@/lib/auth/session";
import { getRuntimeConfig } from "@/lib/config/env";

export const dynamic = "force-dynamic";

export default async function ControlPage() {
  const config = getRuntimeConfig();
  const { repo, user } = await requirePlatformAdmin();
  const shops = await repo.listShops();
  const orderGroups = await Promise.all(
    shops.map((shop) => repo.listOrders(shop.id))
  );
  const billingGroups = await Promise.all(
    shops.map((shop) => repo.listBillingRecords(shop.id))
  );
  const orders = orderGroups.flat();
  const billing = billingGroups.flat();
  const overview = buildPlatformOverview({ billingRecords: billing, orders, shops });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2.5 lg:px-6">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-xs font-bold text-primary-foreground shadow-sm">
              OF
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">OrderFlow BD</div>
              <div className="text-xs text-muted-foreground">Platform control</div>
            </div>
          </Link>
          <Badge className="ml-1" tone="info">
            Control
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <AccountMenu
              email={user.email ?? "Admin"}
              isSupabaseConfigured={config.supabase.isConfigured}
              redirectPath="/control/login"
              supabasePublishableKey={config.supabase.publishableKey}
              supabaseUrl={config.supabase.url}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Control
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Founder control room
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor merchants, revenue, billing follow-up, and operational risk.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            detail="Merchant workspaces"
            icon={<Building2 />}
            label="Shops"
            value={overview.metrics.merchants}
          />
          <Stat
            detail="All merchant orders"
            icon={<ClipboardList />}
            label="Orders"
            value={overview.metrics.orders}
          />
          <Stat
            detail="Gross order value"
            icon={<WalletCards />}
            label="Order value"
            value={formatBdt(overview.metrics.orderValue)}
          />
          <Stat
            detail="Trial, due, and overdue"
            icon={<Activity />}
            label="Billing queue"
            value={formatBdt(overview.metrics.billingDue)}
          />
        </div>

        <div className="mt-3">
          <ControlShopTable rows={overview.merchantRows} />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <ControlBillingQueue records={overview.billingQueue} />
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Recent platform activity</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Newest order signals across merchant workspaces.
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {overview.recentOrders.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  No platform activity yet.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {overview.recentOrders.slice(0, 7).map((order) => {
                    const shop = shops.find((item) => item.id === order.shopId);
                    return (
                      <li key={order.id}>
                        <Link
                          className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                          href={`/control/shops/${order.shopId}`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium">
                                {order.customer.name}
                              </div>
                              <div className="truncate text-xs text-muted-foreground">
                                {shop?.name ?? "Unknown shop"} · {order.status}
                              </div>
                            </div>
                          </div>
                          <span className="shrink-0 font-mono text-sm tabular-nums">
                            {formatBdt(order.total)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
