import { ok } from "@/lib/api/responses";
import { getCurrentUser, getMerchantShopForUser } from "@/lib/auth/session";
import { getRuntimeConfig } from "@/lib/config/env";

export async function GET() {
  const config = getRuntimeConfig();
  const user = await getCurrentUser();
  const merchantShop = user
    ? await getMerchantShopForUser(user.id).catch(() => undefined)
    : undefined;

  return ok({
    status: "ok",
    app: "OrderFlow BD",
    mode: config.mode,
    persistence: config.mode === "supabase" ? "supabase" : "in-memory",
    supabaseConfigured: config.supabase.isConfigured,
    missingSupabaseEnv: config.supabase.missing,
    merchantAuthenticated: Boolean(user),
    merchantShopVisible: Boolean(merchantShop),
    timestamp: new Date().toISOString()
  });
}
