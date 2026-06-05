import { handleApiError, ok } from "@/lib/api/responses";
import { demoShop } from "@/lib/domain/seed";
import type { ProductInput } from "@/lib/domain/types";
import { getRepository } from "@/lib/store";

export async function GET() {
  const repo = getRepository();
  const products = await repo.listProducts(demoShop.id);
  return ok(products);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ProductInput;
    const repo = getRepository();
    const product = await repo.createProduct(demoShop.id, input);
    return ok(product, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
