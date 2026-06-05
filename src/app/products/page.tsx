import { AppShell } from "@/components/app-shell";
import { ProductManager } from "@/components/product-manager";
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { findActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const repo = getRepository();
  const shop = await findActiveShop(repo);
  if (!shop) {
    return (
      <AppShell
        title="Product catalog"
        description="Create public order links sellers can send manually to customers."
      >
        <SupabaseSetupNotice />
      </AppShell>
    );
  }

  const products = await repo.listProducts(shop.id);

  return (
    <AppShell
      title="Product catalog"
      description="Create public order links sellers can send manually to customers."
    >
      <ProductManager initialProducts={products} shopSlug={shop.slug} />
    </AppShell>
  );
}
