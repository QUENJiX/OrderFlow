import { handleApiError, ok } from "@/lib/api/responses";
import type { ProductInput } from "@/lib/domain/types";
import { getActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export async function GET() {
  const repo = getRepository();
  const shop = await getActiveShop(repo);
  const products = await repo.listProducts(shop.id);
  return ok(products);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ProductInput;
    const repo = getRepository();
    const shop = await getActiveShop(repo);
    const product = await repo.createProduct(shop.id, input);
    return ok(product, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
