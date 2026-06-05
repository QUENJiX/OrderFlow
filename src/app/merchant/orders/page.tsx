import { AppShell } from "@/components/app-shell";
import { OrdersWorkspace } from "@/components/orders-workspace";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantOrdersPage() {
  const { repo, shop } = await requireMerchantShop();
  const [orders, products] = await Promise.all([
    repo.listOrders(shop.id),
    repo.listProducts(shop.id)
  ]);

  return (
    <AppShell
      title="Orders"
      description="Process COD/manual MFS orders into courier-ready shipments."
    >
      <OrdersWorkspace initialOrders={orders} products={products} />
    </AppShell>
  );
}
