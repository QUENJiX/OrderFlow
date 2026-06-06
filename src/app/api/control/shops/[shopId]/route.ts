import { handleApiError, ok } from "@/lib/api/responses";
import { requirePlatformAdmin } from "@/lib/auth/session";
import type { ShopPatch } from "@/lib/domain/types";

type ControlShopInput = {
  billingNotes?: string;
  plan?: ShopPatch["plan"];
  status?: ShopPatch["status"];
  supportNotes?: string;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ shopId: string }> }
) {
  try {
    const { shopId } = await context.params;
    const { repo } = await requirePlatformAdmin();
    const input = (await request.json().catch(() => ({}))) as ControlShopInput;
    const shop = await repo.updateShop(shopId, {
      billingNotes: input.billingNotes,
      plan: input.plan,
      status: input.status,
      supportNotes: input.supportNotes
    });

    return ok(shop);
  } catch (error) {
    return handleApiError(error);
  }
}
