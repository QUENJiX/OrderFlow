import { AppShell } from "@/components/app-shell";
import { CustomersWorkspace } from "@/components/customers-workspace";
import { requireMerchantShop } from "@/lib/auth/session";
import { buildCustomerSummaries } from "@/lib/domain/analytics";

export const dynamic = "force-dynamic";

export default async function MerchantCustomersPage() {
  const { repo, shop, user } = await requireMerchantShop();
  const orders = await repo.listOrders(shop.id);
  const customers = buildCustomerSummaries(orders);

  return (
    <AppShell
      title="Customers"
      description="Repeat buyers and support contacts derived from your order history."
      shop={shop}
      user={user}
    >
      <CustomersWorkspace customers={customers} />
    </AppShell>
  );
}
