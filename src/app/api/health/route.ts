import { ok } from "@/lib/api/responses";
import { getRuntimeConfig } from "@/lib/config/env";
import { findActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export async function GET() {
  const config = getRuntimeConfig();
  const repo = getRepository();
  const activeShop = await findActiveShop(repo).catch(() => undefined);

  return ok({
    status: "ok",
    app: "OrderFlow BD",
    mode: config.mode,
    persistence: config.mode === "supabase" ? "supabase" : "in-memory",
    supabaseConfigured: config.supabase.isConfigured,
    missingSupabaseEnv: config.supabase.missing,
    activeShopVisible: Boolean(activeShop),
    timestamp: new Date().toISOString()
  });
}
