import { activeShopMissing, fail, handleApiError, ok } from "@/lib/api/responses";
import { getMerchantContext } from "@/lib/auth/session";
import type { ProductInput } from "@/lib/domain/types";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { productId } = await context.params;
    const input = (await request.json()) as Partial<ProductInput>;
    const { repo, shop, user } = await getMerchantContext();
    if (!user) return fail("Login is required", { status: 401 });
    if (!shop) return activeShopMissing();
    const existing = await repo.getProductById(productId);
    if (!existing || existing.shopId !== shop.id) {
      return fail("Product not found", { status: 404 });
    }
    const product = await repo.updateProduct(productId, input);
    return ok(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { productId } = await context.params;
    const { repo, shop, user } = await getMerchantContext();
    if (!user) return fail("Login is required", { status: 401 });
    if (!shop) return activeShopMissing();
    const existing = await repo.getProductById(productId);
    if (!existing || existing.shopId !== shop.id) {
      return fail("Product not found", { status: 404 });
    }
    const product = await repo.deactivateProduct(productId);
    return ok(product);
  } catch (error) {
    return handleApiError(error);
  }
}
