import { fail, ok } from "@/lib/api/responses";
import { getActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

const defaultVerifyToken = "orderflow-local-verify-token";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expectedToken = process.env.META_VERIFY_TOKEN || defaultVerifyToken;

  if (mode === "subscribe" && token === expectedToken && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }

  return fail("Meta webhook verification failed", { status: 403 });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const repo = getRepository();
  const shop = await getActiveShop(repo);
  const products = await repo.listProducts(shop.id);
  const firstProduct = products[0];
  const event = await repo.recordWebhookEvent({
    provider: "meta",
    eventType: "test",
    sourceId: "local-webhook",
    matchedProductId: firstProduct?.id,
    message: JSON.stringify(payload).slice(0, 500),
    reply: "Local demo webhook event recorded. Real Meta replies are not connected.",
    status: "simulated"
  });

  return ok(event, { status: 202 });
}
