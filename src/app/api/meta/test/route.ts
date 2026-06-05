import { activeShopMissing, ok } from "@/lib/api/responses";
import { getMerchantContext } from "@/lib/auth/session";

export async function POST() {
  const { repo, shop, user } = await getMerchantContext();
  if (!user) return activeShopMissing();
  if (!shop) return activeShopMissing();
  const products = await repo.listProducts(shop.id);
  const product = products[0];
  const event = await repo.recordWebhookEvent({
    provider: "meta",
    eventType: "comment",
    sourceId: `comment-${Date.now()}`,
    matchedProductId: product?.id,
    message: product
      ? `Test comment asking about ${product.name}`
      : "Test comment asking about product availability",
    reply: product
      ? `Matched ${product.name}. Suggested order link: /order/${shop.slug}/${product.slug}`
      : "Fallback reply: add products before testing Meta reply matching.",
    status: product ? "matched" : "fallback"
  });

  return ok(event, { status: 201 });
}
