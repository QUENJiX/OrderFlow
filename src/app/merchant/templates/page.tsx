import { AppShell } from "@/components/app-shell";
import { TemplatesWorkspace } from "@/components/templates-workspace";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantTemplatesPage() {
  const { repo, shop } = await requireMerchantShop();
  const [templates, products] = await Promise.all([
    repo.listReplyTemplates(shop.id),
    repo.listProducts(shop.id)
  ]);

  return (
    <AppShell
      title="Reply templates"
      description="Bangla and English snippets for repetitive price, stock, COD, and delivery replies."
    >
      <TemplatesWorkspace products={products} shop={shop} templates={templates} />
    </AppShell>
  );
}
