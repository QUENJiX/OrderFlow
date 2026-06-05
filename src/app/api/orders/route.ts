import { handleApiError, ok } from "@/lib/api/responses";
import type { OrderInput } from "@/lib/domain/types";
import { getActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export async function GET() {
  const repo = getRepository();
  const shop = await getActiveShop(repo);
  const orders = await repo.listOrders(shop.id);
  return ok(orders);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as OrderInput;
    const repo = getRepository();
    const order = await repo.createOrder(input);
    return ok(order, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
