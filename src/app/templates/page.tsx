import { AppShell } from "@/components/app-shell";
import { TemplatesWorkspace } from "@/components/templates-workspace";
import { getActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const repo = getRepository();
  const activeShop = await getActiveShop(repo);
  const [templates, products, shop] = await Promise.all([
    repo.listReplyTemplates(activeShop.id),
    repo.listProducts(activeShop.id),
    repo.getShopById(activeShop.id)
  ]);

  return (
    <AppShell
      title="Reply templates"
      description="Bangla and English snippets for repetitive price, stock, COD, and delivery replies."
    >
      {shop ? (
        <TemplatesWorkspace
          products={products}
          shop={shop}
          templates={templates}
        />
      ) : null}
    </AppShell>
  );
}
