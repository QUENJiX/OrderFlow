import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getRuntimeConfig } from "../config/env";
import type { Database } from "./types";

async function createServerClientWithCookieMode({
  canWriteCookies
}: {
  canWriteCookies: boolean;
}) {
  const config = getRuntimeConfig();
  if (!config.supabase.url || !config.supabase.publishableKey) {
    throw new Error("Supabase public configuration is missing");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    config.supabase.url,
    config.supabase.publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          if (!canWriteCookies) return;
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        }
      }
    }
  );
}

export async function createServerSupabaseClient() {
  return createServerClientWithCookieMode({ canWriteCookies: false });
}

export async function createWritableServerSupabaseClient() {
  return createServerClientWithCookieMode({ canWriteCookies: true });
}
