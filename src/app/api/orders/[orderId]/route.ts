import { activeShopMissing, fail, handleApiError, ok } from "@/lib/api/responses";
import { getMerchantContext } from "@/lib/auth/session";
import type { OrderPatch } from "@/lib/domain/types";

type RouteContext = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { orderId } = await context.params;
    const patch = (await request.json()) as OrderPatch;
    const { repo, shop, user } = await getMerchantContext();
    if (!user) return fail("Login is required", { status: 401 });
    if (!shop) return activeShopMissing();
    const existing = await repo.getOrderById(orderId);
    if (!existing || existing.shopId !== shop.id) {
      return fail("Order not found", { status: 404 });
    }
    const order = await repo.updateOrder(orderId, patch);
    return ok(order);
  } catch (error) {
    return handleApiError(error);
  }
}
