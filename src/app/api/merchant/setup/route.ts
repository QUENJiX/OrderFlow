import { fail, ok } from "@/lib/api/responses";
import { getCurrentUser } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type SetupInput = {
  defaultDistrict?: string;
  ownerName?: string;
  shopName?: string;
  supportPhone?: string;
};

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return fail("Login is required", { status: 401 });
  }

  const input = (await request.json().catch(() => ({}))) as SetupInput;
  if (!input.shopName || input.shopName.trim().length < 2) {
    return fail("Shop name is required", { status: 422 });
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("create_merchant_shop", {
    default_district: input.defaultDistrict || "Dhaka",
    owner_name: input.ownerName || "",
    shop_name: input.shopName,
    support_phone: input.supportPhone || ""
  });

  if (error) {
    return fail(error.message, { status: 400 });
  }

  return ok({ shopId: data }, { status: 201 });
}
