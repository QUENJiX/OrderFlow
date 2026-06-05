import { handleApiError, ok } from "@/lib/api/responses";
import type { ProductInput } from "@/lib/domain/types";
import { getRepository } from "@/lib/store";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { productId } = await context.params;
    const input = (await request.json()) as Partial<ProductInput>;
    const repo = getRepository();
    const product = await repo.updateProduct(productId, input);
    return ok(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { productId } = await context.params;
    const repo = getRepository();
    const product = await repo.deactivateProduct(productId);
    return ok(product);
  } catch (error) {
    return handleApiError(error);
  }
}
