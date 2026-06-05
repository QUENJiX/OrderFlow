import { AppShell } from "@/components/app-shell";
import { OrdersWorkspace } from "@/components/orders-workspace";
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { findActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const repo = getRepository();
  const shop = await findActiveShop(repo);
  if (!shop) {
    return (
      <AppShell
        title="Orders"
        description="Process COD/manual MFS orders into courier-ready shipments."
      >
        <SupabaseSetupNotice />
      </AppShell>
    );
  }

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
