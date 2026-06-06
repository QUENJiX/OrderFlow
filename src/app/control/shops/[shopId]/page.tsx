import { notFound } from "next/navigation";
import Link from "next/link";
import { ControlBillingQueue } from "@/components/control-billing-queue";
import { ControlShopTable } from "@/components/control-shop-table";
import { MetricCard } from "@/components/metric-card";
import { buildPlatformOverview } from "@/lib/domain/analytics";
import { formatBdt } from "@/lib/domain/money";
import { requirePlatformAdmin } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ControlShopPage({
  params
}: {
  params: Promise<{ shopId: string }>;
}) {
  const { shopId } = await params;
  const { repo } = await requirePlatformAdmin();
  const shop = await repo.getShopById(shopId);
  if (!shop) {
    notFound();
  }

  const [orders, products, billing, events] = await Promise.all([
    repo.listOrders(shop.id),
    repo.listProducts(shop.id),
    repo.listBillingRecords(shop.id),
    repo.listWebhookEvents(shop.id)
  ]);
  const overview = buildPlatformOverview({
    billingRecords: billing,
    orders,
    shops: [shop]
  });

  return (
    <main className="control-page">
      <header className="control-header">
        <Link className="brand" href="/control">
          <span className="brand-mark">OF</span>
          <span>
            <strong>{shop.name}</strong>
            <small>Merchant drilldown</small>
          </span>
        </Link>
        <Link className="secondary-button" href="/control">
          Back to control
        </Link>
      </header>

      <section className="page-header control-title">
        <div>
          <p className="section-label">Merchant</p>
          <h1>{shop.name}</h1>
          <p>{shop.slug} · {shop.plan} · {shop.status}</p>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Orders" value={orders.length} detail="Captured order links" />
        <MetricCard
          label="Order value"
          value={formatBdt(orders.reduce((sum, order) => sum + order.total, 0))}
          detail="Gross order value"
        />
        <MetricCard label="Products" value={products.length} detail="Catalog items" />
        <MetricCard label="Events" value={events.length} detail="Webhook/test signals" />
      </section>

      <div className="control-grid">
        <ControlShopTable rows={overview.merchantRows} />
        <ControlBillingQueue records={billing} />
      </div>

      <section className="panel control-panel">
        <div className="panel-heading">
          <div>
            <h2>Recent orders</h2>
            <p>Latest customer orders for this merchant.</p>
          </div>
        </div>
        <div className="stack-list">
          {orders.slice(0, 8).map((order) => (
            <article className="compact-row" key={order.id}>
              <div>
                <strong>{order.customer.name}</strong>
                <span>
                  {order.customer.phone} · {formatBdt(order.total)} · {order.status}
                </span>
              </div>
              <span className="badge badge-info">{order.paymentStatus}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
