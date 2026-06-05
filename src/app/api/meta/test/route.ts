import { ok } from "@/lib/api/responses";
import { demoShop } from "@/lib/domain/seed";
import { getRepository } from "@/lib/store";

export async function POST() {
  const repo = getRepository();
  const products = await repo.listProducts(demoShop.id);
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
      ? `Matched ${product.name}. Suggested order link: /order/${demoShop.slug}/${product.slug}`
      : "Fallback reply: A team member will reply soon.",
    status: product ? "matched" : "fallback"
  });

  return ok(event, { status: 201 });
}
