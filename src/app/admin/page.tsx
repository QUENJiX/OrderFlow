import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { formatBdt } from "@/lib/domain/money";
import { demoShop } from "@/lib/domain/seed";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const repo = getRepository();
  const [shops, orders, billing, events] = await Promise.all([
    repo.listShops(),
    repo.listOrders(demoShop.id),
    repo.listBillingRecords(demoShop.id),
    repo.listWebhookEvents(demoShop.id)
  ]);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <AppShell
      title="Pilot admin"
      description="Lightweight support view for founder-led onboarding and billing notes."
    >
      <section className="metrics-grid">
        <MetricCard label="Pilot shops" value={shops.length} />
        <MetricCard label="Orders captured" value={orders.length} />
        <MetricCard label="Order value" value={formatBdt(revenue)} />
        <MetricCard label="Webhook events" value={events.length} />
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Shops</h2>
              <p>Current local pilot workspaces.</p>
            </div>
          </div>
          <div className="stack-list">
            {shops.map((shop) => (
              <article className="compact-row" key={shop.id}>
                <div>
                  <strong>{shop.name}</strong>
                  <span>{shop.ownerName} · {shop.supportPhone}</span>
                </div>
                <span className="badge badge-info">{shop.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Billing and support</h2>
              <p>Manual billing records for early pilots.</p>
            </div>
          </div>
          <div className="stack-list">
            {billing.map((record) => (
              <article className="compact-row" key={record.id}>
                <div>
                  <strong>{record.period}</strong>
                  <span>{record.notes}</span>
                </div>
                <span className="badge badge-warning">{record.status}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Webhook events</h2>
            <p>Local Meta simulation events for App Review readiness later.</p>
          </div>
        </div>
        <div className="stack-list">
          {events.map((event) => (
            <article className="compact-row" key={event.id}>
              <div>
                <strong>{event.message}</strong>
                <span>{event.reply}</span>
              </div>
              <span className="badge badge-neutral">{event.status}</span>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
