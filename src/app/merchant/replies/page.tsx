import { AppShell } from "@/components/app-shell";
import { TemplatesWorkspace } from "@/components/templates-workspace";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantRepliesPage() {
  const { repo, shop, user } = await requireMerchantShop();
  const [templates, products] = await Promise.all([
    repo.listReplyTemplates(shop.id),
    repo.listProducts(shop.id)
  ]);

  return (
    <AppShell
      title="Replies"
      description="Bangla and English snippets for price, stock, COD, delivery, and order links."
      shop={shop}
      user={user}
    >
      <TemplatesWorkspace products={products} shop={shop} templates={templates} />
    </AppShell>
  );
}
