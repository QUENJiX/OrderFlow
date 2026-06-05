"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createBrowserSupabaseClient({
  publishableKey,
  url
}: {
  publishableKey?: string;
  url?: string;
}) {
  if (!url || !publishableKey) {
    throw new Error("Supabase public configuration is missing");
  }

  return createBrowserClient<Database>(url, publishableKey);
}
