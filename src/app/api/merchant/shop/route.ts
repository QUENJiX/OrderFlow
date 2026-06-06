import { fail, handleApiError, ok } from "@/lib/api/responses";
import { requireMerchantShop } from "@/lib/auth/session";
import type { ShopPatch } from "@/lib/domain/types";

type MerchantShopInput = {
  defaultCourier?: ShopPatch["defaultCourier"];
  defaultDistrict?: string;
  email?: string;
  ownerName?: string;
  phone?: string;
  supportPhone?: string;
};

export async function PATCH(request: Request) {
  try {
    const { repo, shop } = await requireMerchantShop();
    const input = (await request.json().catch(() => ({}))) as MerchantShopInput;

    if (input.defaultDistrict !== undefined && input.defaultDistrict.trim() === "") {
      return fail("Default district is required", { status: 422 });
    }

    const updated = await repo.updateShop(shop.id, {
      defaultCourier: input.defaultCourier,
      defaultDistrict: input.defaultDistrict,
      email: input.email,
      ownerName: input.ownerName,
      phone: input.phone,
      supportPhone: input.supportPhone
    });

    return ok(updated);
  } catch (error) {
    return handleApiError(error);
  }
}
