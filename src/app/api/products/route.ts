import { activeShopMissing, handleApiError, ok } from "@/lib/api/responses";
import { getMerchantContext } from "@/lib/auth/session";
import type { ProductInput } from "@/lib/domain/types";

export async function GET() {
  const { repo, shop, user } = await getMerchantContext();
  if (!user) return activeShopMissing();
  if (!shop) return activeShopMissing();
  const products = await repo.listProducts(shop.id);
  return ok(products);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ProductInput;
    const { repo, shop, user } = await getMerchantContext();
    if (!user) return activeShopMissing();
    if (!shop) return activeShopMissing();
    const product = await repo.createProduct(shop.id, input);
    return ok(product, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
