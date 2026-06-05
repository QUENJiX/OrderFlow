import { AppShell } from "@/components/app-shell";
import { TemplatesWorkspace } from "@/components/templates-workspace";
import { demoShop } from "@/lib/domain/seed";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const repo = getRepository();
  const [templates, products, shop] = await Promise.all([
    repo.listReplyTemplates(demoShop.id),
    repo.listProducts(demoShop.id),
    repo.getShopById(demoShop.id)
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
