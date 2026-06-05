import { AppShell } from "@/components/app-shell";
import { ProductManager } from "@/components/product-manager";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantProductsPage() {
  const { repo, shop } = await requireMerchantShop();
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
