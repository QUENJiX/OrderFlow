import { activeShopMissing, handleApiError, ok } from "@/lib/api/responses";
import { getMerchantContext } from "@/lib/auth/session";
import type { OrderInput } from "@/lib/domain/types";

export async function GET() {
  const { repo, shop, user } = await getMerchantContext();
  if (!user) return activeShopMissing();
  if (!shop) return activeShopMissing();
  const orders = await repo.listOrders(shop.id);
  return ok(orders);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as OrderInput;
    const { repo } = await getMerchantContext();
    const order = await repo.createOrder(input);
    return ok(order, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
