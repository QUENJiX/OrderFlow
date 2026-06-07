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
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
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
  const productById = new Map(products.map((product) => [product.id, product]));
  const firstProduct = products[0];
  const firstTemplate = templates[0];
  const orderLink = firstProduct
    ? `/order/${shop.slug}/${firstProduct.slug}`
    : "/";

  // Real 7-day order-count series for the sparkline + today/yesterday delta.
  const now = new Date();
  const dayCounts = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (6 - index));
    const key = day.toDateString();
    return orders.filter(
      (order) => new Date(order.createdAt).toDateString() === key
    ).length;
  });
  const todayCount = dayCounts[6];
  const yesterdayCount = dayCounts[5];
  const orderDelta = todayCount - yesterdayCount;

  return (
    <AppShell
      title="Today’s order desk"
      description="Prioritize payment checks, courier prep, and reply links from one operating screen."
      shop={shop}
      user={user}
      actions={
        <Button asChild variant="secondary">
          <Link href="/api/orders/export" prefetch={false}>
            <Download />
            <span className="hidden sm:inline">Export courier CSV</span>
          </Link>
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          delta={{
            value: `${orderDelta >= 0 ? "+" : ""}${orderDelta} vs yesterday`,
            direction: orderDelta > 0 ? "up" : orderDelta < 0 ? "down" : "flat"
          }}
          icon={<ClipboardList />}
          label="Orders today"
          spark={dayCounts}
          value={summary.ordersToday}
        />
        <Stat
          detail="All captured orders"
          icon={<WalletCards />}
          label="Order value"
          value={formatBdt(summary.orderValue)}
        />
        <Stat
          detail="Needs courier action"
          icon={<Timer />}
          label="Courier ready"
          value={summary.courierReady}
        />
        <Stat
          detail="Manual bKash/Nagad"
          icon={<Boxes />}
          label="Pending payment"
          value={summary.pendingPayments}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Live order queue</CardTitle>
              <p className="text-sm text-muted-foreground">
                Newest orders and the state that needs action.
              </p>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/merchant/orders">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {orders.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">
                Orders will appear here as customers submit your links.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {orders.slice(0, 6).map((order) => {
                  const product = productById.get(order.productId);
                  return (
                    <li key={order.id}>
                      <Link
                        className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                        href="/merchant/orders"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">
                            {order.customer.name}
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {product?.name ?? "Unknown product"} · Qty{" "}
                            {order.quantity}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <OrderStatusBadge status={order.status} />
                          <PaymentStatusBadge status={order.paymentStatus} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Reply launcher</CardTitle>
              <p className="text-sm text-muted-foreground">
                Copy the fastest order link or reply.
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2.5">
            {firstProduct ? (
              <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/40 p-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium">Order link</div>
                  <div className="truncate font-mono text-xs text-muted-foreground">
                    {orderLink}
                  </div>
                </div>
                <CopyButton compact label="Copy link" value={orderLink} />
              </div>
            ) : null}
            {firstTemplate && firstProduct ? (
              <div className="flex items-start justify-between gap-3 rounded-md border border-border bg-muted/40 p-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium">{firstTemplate.title}</div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {firstTemplate.body
                      .replaceAll("{price}", String(firstProduct.price))
                      .replaceAll("{order_link}", orderLink)
                      .replaceAll(
                        "{delivery_charge}",
                        String(firstProduct.deliveryCharge)
                      )}
                  </p>
                </div>
                <CopyButton
                  compact
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
            {!firstProduct ? (
              <p className="text-sm text-muted-foreground">
                Add a product to generate shareable order links.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
