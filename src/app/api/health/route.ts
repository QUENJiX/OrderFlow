import { ok } from "@/lib/api/responses";
import { getRuntimeConfig } from "@/lib/config/env";

export async function GET() {
  const config = getRuntimeConfig();
  return ok({
    status: "ok",
    app: "OrderFlow BD",
    mode: config.mode,
    persistence: config.mode === "supabase" ? "supabase" : "in-memory",
    supabaseConfigured: config.supabase.isConfigured,
    missingSupabaseEnv: config.supabase.missing,
    timestamp: new Date().toISOString()
  });
}
