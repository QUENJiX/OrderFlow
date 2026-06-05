import { AppShell } from "@/components/app-shell";
import { OrdersWorkspace } from "@/components/orders-workspace";
import { demoShop } from "@/lib/domain/seed";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const repo = getRepository();
  const [orders, products] = await Promise.all([
    repo.listOrders(demoShop.id),
    repo.listProducts(demoShop.id)
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
