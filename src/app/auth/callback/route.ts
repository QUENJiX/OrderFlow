import { NextResponse } from "next/server";
import { getRuntimeConfig } from "@/lib/config/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const config = getRuntimeConfig();

  if (code && config.supabase.isConfigured) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/merchant/setup?auth=callback", requestUrl));
}
