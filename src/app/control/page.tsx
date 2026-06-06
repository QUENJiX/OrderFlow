import { Activity, Building2, ClipboardList, WalletCards } from "lucide-react";
import Link from "next/link";
import { ControlBillingQueue } from "@/components/control-billing-queue";
import { ControlShopTable } from "@/components/control-shop-table";
import { MetricCard } from "@/components/metric-card";
import { SignOutButton } from "@/components/sign-out-button";
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
    <main className="control-page">
      <header className="control-header">
        <Link className="brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Platform control</small>
          </span>
        </Link>
        <div className="control-account">
          <span>{user.email}</span>
          <SignOutButton
            isSupabaseConfigured={config.supabase.isConfigured}
            redirectPath="/control/login"
            supabasePublishableKey={config.supabase.publishableKey}
            supabaseUrl={config.supabase.url}
          />
        </div>
      </header>

      <section className="page-header control-title">
        <div>
          <p className="section-label">Control</p>
          <h1>Founder control room</h1>
          <p>Monitor merchants, revenue, billing follow-up, and operational risk.</p>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard
          detail="Merchant workspaces"
          icon={<Building2 size={18} />}
          label="Shops"
          value={overview.metrics.merchants}
        />
        <MetricCard
          detail="All merchant orders"
          icon={<ClipboardList size={18} />}
          label="Orders"
          value={overview.metrics.orders}
        />
        <MetricCard
          detail="Gross order value"
          icon={<WalletCards size={18} />}
          label="Order value"
          value={formatBdt(overview.metrics.orderValue)}
        />
        <MetricCard
          detail="Trial, due, and overdue"
          icon={<Activity size={18} />}
          label="Billing queue"
          value={formatBdt(overview.metrics.billingDue)}
        />
      </section>

      <div className="control-grid">
        <ControlShopTable rows={overview.merchantRows} />
        <ControlBillingQueue records={overview.billingQueue} />
      </div>

      <section className="panel control-panel">
        <div className="panel-heading">
          <div>
            <h2>Recent platform activity</h2>
            <p>Newest order signals across merchant workspaces.</p>
          </div>
        </div>
        <div className="stack-list">
          {overview.recentOrders.slice(0, 6).map((order) => {
            const shop = shops.find((item) => item.id === order.shopId);
            return (
              <article className="compact-row" key={order.id}>
                <div>
                  <strong>{order.customer.name}</strong>
                  <span>
                    {shop?.name ?? "Unknown shop"} · {formatBdt(order.total)} · {order.status}
                  </span>
                </div>
                <Link className="secondary-button" href={`/control/shops/${order.shopId}`}>
                  Open merchant
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
