import { handleApiError, ok } from "@/lib/api/responses";
import { demoShop } from "@/lib/domain/seed";
import type { OrderInput } from "@/lib/domain/types";
import { getRepository } from "@/lib/store";

export async function GET() {
  const repo = getRepository();
  const orders = await repo.listOrders(demoShop.id);
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
