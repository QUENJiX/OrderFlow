"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getRuntimeConfig } from "../config/env";
import type { Database } from "./types";

export function createBrowserSupabaseClient() {
  const config = getRuntimeConfig();
  if (!config.supabase.url || !config.supabase.publishableKey) {
    throw new Error("Supabase public configuration is missing");
  }

  return createBrowserClient<Database>(
    config.supabase.url,
    config.supabase.publishableKey
  );
}
