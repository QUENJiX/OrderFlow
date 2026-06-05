import { Building2, ClipboardList, WalletCards } from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/metric-card";
import { formatBdt } from "@/lib/domain/money";
import { requirePlatformAdmin } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ControlPage() {
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
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const paidBilling = billing
    .filter((record) => record.status === "paid")
    .reduce((sum, record) => sum + record.amount, 0);

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
        <span>{user.email}</span>
      </header>

      <section className="page-header control-title">
        <div>
          <p className="section-label">Control</p>
          <h1>Platform overview</h1>
          <p>Developer/admin view across merchants, orders, and billing.</p>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard
          detail="Merchant workspaces"
          icon={<Building2 size={18} />}
          label="Shops"
          value={shops.length}
        />
        <MetricCard
          detail="All merchant orders"
          icon={<ClipboardList size={18} />}
          label="Orders"
          value={orders.length}
        />
        <MetricCard
          detail="Gross order value"
          icon={<WalletCards size={18} />}
          label="Order value"
          value={formatBdt(revenue)}
        />
        <MetricCard
          detail="Manual billing records"
          icon={<WalletCards size={18} />}
          label="Paid billing"
          value={formatBdt(paidBilling)}
        />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Merchant shops</h2>
            <p>Current workspaces visible to platform admins.</p>
          </div>
        </div>
        <div className="stack-list">
          {shops.map((shop) => (
            <article className="compact-row" key={shop.id}>
              <div>
                <strong>{shop.name}</strong>
                <span>
                  {shop.slug} · {shop.supportPhone || "No support phone"}
                </span>
              </div>
              <span className="badge badge-info">{shop.status}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
