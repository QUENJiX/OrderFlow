import { AppShell } from "@/components/app-shell";
import { ProductManager } from "@/components/product-manager";
import { demoShop } from "@/lib/domain/seed";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const repo = getRepository();
  const products = await repo.listProducts(demoShop.id);

  return (
    <AppShell
      title="Product catalog"
      description="Create public order links sellers can send manually to customers."
    >
      <ProductManager initialProducts={products} shopSlug={demoShop.slug} />
    </AppShell>
  );
}
