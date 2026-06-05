import { ok } from "@/lib/api/responses";
import { getActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export async function POST() {
  const repo = getRepository();
  const shop = await getActiveShop(repo);
  const products = await repo.listProducts(shop.id);
  const product = products.find((item) =>
    item.keywords.some((keyword) => keyword.toLowerCase().includes("kurti"))
  );
  const event = await repo.recordWebhookEvent({
    provider: "meta",
    eventType: "comment",
    sourceId: `comment-${Date.now()}`,
    matchedProductId: product?.id,
    message: "linen kurti price koto? COD hobe?",
    reply: product
      ? `Matched ${product.name}. Suggested order link: /order/${shop.slug}/${product.slug}`
      : "Fallback reply: A team member will reply soon.",
    status: product ? "matched" : "fallback"
  });

  return ok(event, { status: 201 });
}
