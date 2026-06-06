import {
  Boxes,
  ClipboardList,
  Download,
  Timer,
  WalletCards
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { CopyButton } from "@/components/copy-button";
import { MetricCard } from "@/components/metric-card";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/status-badge";
import { buildMerchantDashboardSummary } from "@/lib/domain/analytics";
import { formatBdt } from "@/lib/domain/money";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantDashboardPage() {
  const { repo, shop, user } = await requireMerchantShop();
  const [orders, products, templates] = await Promise.all([
    repo.listOrders(shop.id),
    repo.listProducts(shop.id),
    repo.listReplyTemplates(shop.id)
  ]);
  const summary = buildMerchantDashboardSummary({ orders, products });
  const courierReady = orders.filter((order) => order.status === "courier_ready");
  const pendingPayments = orders.filter((order) =>
    ["awaiting_verification", "failed"].includes(order.paymentStatus)
  );
  const productById = new Map(products.map((product) => [product.id, product]));
  const firstProduct = products[0];
  const firstTemplate = templates[0];
  const orderLink = firstProduct
    ? `/order/${shop.slug}/${firstProduct.slug}`
    : "/";

  return (
    <AppShell
      title="Today’s order desk"
      description="Prioritize payment checks, courier prep, and reply links from one operating screen."
      shop={shop}
      user={user}
      actions={
        <Link className="secondary-button" href="/api/orders/export" prefetch={false}>
          <Download size={16} />
          Export courier CSV
        </Link>
      }
    >
      <section className="metrics-grid">
        <MetricCard
          detail="New customer submissions"
          icon={<ClipboardList size={18} />}
          label="Orders today"
          value={summary.ordersToday}
        />
        <MetricCard
          detail="All captured orders"
          icon={<WalletCards size={18} />}
          label="Order value"
          value={formatBdt(summary.orderValue)}
        />
        <MetricCard
          detail="Needs courier action"
          icon={<Timer size={18} />}
          label="Courier ready"
          value={summary.courierReady}
        />
        <MetricCard
          detail="Manual bKash/Nagad"
          icon={<Boxes size={18} />}
          label="Pending payment"
          value={summary.pendingPayments}
        />
      </section>

      <section className="action-strip">
        <div>
          <span>Next best actions</span>
          <strong>{pendingPayments.length} payment checks</strong>
          <small>Verify bKash/Nagad references before packing.</small>
        </div>
        <div>
          <span>Courier queue</span>
          <strong>{courierReady.length} ready</strong>
          <small>Export CSV when the batch is packed.</small>
        </div>
        <div>
          <span>Catalog attention</span>
          <strong>{summary.lowStockProducts} low stock</strong>
          <small>Update inventory before sending more links.</small>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Live order queue</h2>
              <p>Newest orders and the state that needs merchant action.</p>
            </div>
          </div>
          <div className="stack-list">
            {orders.slice(0, 5).map((order) => {
              const product = productById.get(order.productId);
              return (
                <article className="compact-row" key={order.id}>
                  <div>
                    <strong>{order.customer.name}</strong>
                    <span>
                      {product?.name ?? "Unknown product"} · Qty {order.quantity}
                    </span>
                  </div>
                  <div className="compact-status">
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Reply launcher</h2>
              <p>Copy the fastest order link or reply for today’s comments.</p>
            </div>
          </div>
          <div className="shortcut-list">
            {firstProduct ? (
              <div className="shortcut-row">
                <div>
                  <strong>{firstProduct.name} order link</strong>
                  <span>{orderLink}</span>
                </div>
                <CopyButton label="Copy link" value={orderLink} />
              </div>
            ) : null}
            {firstTemplate && firstProduct ? (
              <div className="shortcut-row">
                <div>
                  <strong>{firstTemplate.title}</strong>
                  <span>
                    {firstTemplate.body
                      .replaceAll("{price}", String(firstProduct.price))
                      .replaceAll("{order_link}", orderLink)
                      .replaceAll(
                        "{delivery_charge}",
                        String(firstProduct.deliveryCharge)
                      )}
                  </span>
                </div>
                <CopyButton
                  label="Copy reply"
                  value={firstTemplate.body
                    .replaceAll("{price}", String(firstProduct.price))
                    .replaceAll("{order_link}", orderLink)
                    .replaceAll(
                      "{delivery_charge}",
                      String(firstProduct.deliveryCharge)
                    )}
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
