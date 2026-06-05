import { handleApiError, ok } from "@/lib/api/responses";
import type { OrderPatch } from "@/lib/domain/types";
import { getRepository } from "@/lib/store";

type RouteContext = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { orderId } = await context.params;
    const patch = (await request.json()) as OrderPatch;
    const repo = getRepository();
    const order = await repo.updateOrder(orderId, patch);
    return ok(order);
  } catch (error) {
    return handleApiError(error);
  }
}
