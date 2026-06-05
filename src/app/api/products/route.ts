import { activeShopMissing, handleApiError, ok } from "@/lib/api/responses";
import type { ProductInput } from "@/lib/domain/types";
import { findActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export async function GET() {
  const repo = getRepository();
  const shop = await findActiveShop(repo);
  if (!shop) return activeShopMissing();
  const products = await repo.listProducts(shop.id);
  return ok(products);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ProductInput;
    const repo = getRepository();
    const shop = await findActiveShop(repo);
    if (!shop) return activeShopMissing();
    const product = await repo.createProduct(shop.id, input);
    return ok(product, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
