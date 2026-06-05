import { AppShell } from "@/components/app-shell";
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { TemplatesWorkspace } from "@/components/templates-workspace";
import { findActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const repo = getRepository();
  const activeShop = await findActiveShop(repo);
  if (!activeShop) {
    return (
      <AppShell
        title="Reply templates"
        description="Bangla and English snippets for repetitive price, stock, COD, and delivery replies."
      >
        <SupabaseSetupNotice />
      </AppShell>
    );
  }

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
