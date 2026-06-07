import { ArrowLeft, Boxes, ClipboardList, Radio, WalletCards } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ControlBillingQueue } from "@/components/control-billing-queue";
import { ControlShopTable } from "@/components/control-shop-table";
import { PaymentStatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2.5 lg:px-6">
          <Button asChild size="icon-sm" variant="ghost">
            <Link href="/control" title="Back to control">
              <ArrowLeft />
            </Link>
          </Button>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{shop.name}</div>
            <div className="font-mono text-xs text-muted-foreground">
              {shop.slug}
            </div>
          </div>
          <Badge className="ml-1 capitalize" tone="info">
            {shop.plan}
          </Badge>
          <Badge className="capitalize" tone="neutral">
            {shop.status}
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Merchant
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {shop.name}
          </h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            detail="Captured order links"
            icon={<ClipboardList />}
            label="Orders"
            value={orders.length}
          />
          <Stat
            detail="Gross order value"
            icon={<WalletCards />}
            label="Order value"
            value={formatBdt(
              orders.reduce((sum, order) => sum + order.total, 0)
            )}
          />
          <Stat
            detail="Catalog items"
            icon={<Boxes />}
            label="Products"
            value={products.length}
          />
          <Stat
            detail="Webhook/test signals"
            icon={<Radio />}
            label="Events"
            value={events.length}
          />
        </div>

        <div className="mt-3">
          <ControlShopTable rows={overview.merchantRows} />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <ControlBillingQueue records={billing} />
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Recent orders</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Latest customer orders for this merchant.
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {orders.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  No orders yet.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {orders.slice(0, 8).map((order) => (
                    <li
                      className="flex items-center justify-between gap-3 px-4 py-3"
                      key={order.id}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {order.customer.name}
                        </div>
                        <div className="truncate font-mono text-xs text-muted-foreground">
                          {order.customer.phone} · {formatBdt(order.total)}
                        </div>
                      </div>
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
