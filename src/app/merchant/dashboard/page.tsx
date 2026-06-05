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
import { formatBdt } from "@/lib/domain/money";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantDashboardPage() {
  const { repo, shop } = await requireMerchantShop();
  const [orders, products, templates] = await Promise.all([
    repo.listOrders(shop.id),
    repo.listProducts(shop.id),
    repo.listReplyTemplates(shop.id)
  ]);
  const today = new Date().toDateString();
  const ordersToday = orders.filter(
    (order) => new Date(order.createdAt).toDateString() === today
  );
  const courierReady = orders.filter((order) => order.status === "courier_ready");
  const pendingPayments = orders.filter(
    (order) => order.paymentStatus === "awaiting_verification"
  );
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const productById = new Map(products.map((product) => [product.id, product]));
  const firstProduct = products[0];
  const firstTemplate = templates[0];
  const orderLink = firstProduct
    ? `/order/${shop.slug}/${firstProduct.slug}`
    : "/";

  return (
    <AppShell
      title="Merchant dashboard"
      description="A practical order desk for manual Facebook inquiry to COD courier workflow."
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
          value={ordersToday.length}
        />
        <MetricCard
          detail="All captured orders"
          icon={<WalletCards size={18} />}
          label="Order value"
          value={formatBdt(revenue)}
        />
        <MetricCard
          detail="Needs courier action"
          icon={<Timer size={18} />}
          label="Courier ready"
          value={courierReady.length}
        />
        <MetricCard
          detail="Manual bKash/Nagad"
          icon={<Boxes size={18} />}
          label="Pending payment"
          value={pendingPayments.length}
        />
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent orders</h2>
              <p>New customer submissions from public order links.</p>
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
              <h2>Daily shortcuts</h2>
              <p>Copy links and replies without hunting through the app.</p>
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
