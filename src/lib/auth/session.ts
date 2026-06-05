import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { Shop } from "../domain/types";
import { getRepository, type OrderFlowRepository } from "../store";
import { createServerSupabaseClient } from "../supabase/server";
import { getRuntimeConfig } from "../config/env";

export type MerchantRouteState = {
  hasShop: boolean;
  isAuthenticated: boolean;
};

export type ControlRouteState = {
  isAuthenticated: boolean;
  isPlatformAdmin: boolean;
};

export type AuthenticatedUser = Pick<User, "email" | "id">;

export function getMerchantDestination(state: MerchantRouteState) {
  if (!state.isAuthenticated) return "/merchant/login";
  return state.hasShop ? "/merchant/dashboard" : "/merchant/setup";
}

export function getControlDestination(state: ControlRouteState) {
  if (!state.isAuthenticated) return "/control/login";
  return state.isPlatformAdmin ? "/control" : "/control/login?error=not-admin";
}

export async function getCurrentUser(): Promise<AuthenticatedUser | undefined> {
  const config = getRuntimeConfig();
  if (!config.supabase.isConfigured) {
    return undefined;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return undefined;
  return data.user ? { email: data.user.email, id: data.user.id } : undefined;
}

export async function getMerchantShopForUser(
  userId: string,
  repo: OrderFlowRepository = getRepository()
): Promise<Shop | undefined> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("shop_members")
    .select("shop_id")
    .eq("user_id", userId)
    .order("created_at")
    .limit(1)
    .maybeSingle();

  if (error || !data?.shop_id) return undefined;
  return repo.getShopById(data.shop_id);
}

export async function getMerchantContext() {
  const repo = getRepository();
  const user = await getCurrentUser();
  const shop = user ? await getMerchantShopForUser(user.id, repo) : undefined;

  return { repo, shop, user };
}

export async function isPlatformAdmin(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("platform_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(!error && data?.user_id);
}

export async function requireMerchantShop() {
  const repo = getRepository();
  const user = await getCurrentUser();
  if (!user) {
    redirect("/merchant/login");
  }

  const shop = await getMerchantShopForUser(user.id, repo);
  if (!shop) {
    redirect("/merchant/setup");
  }

  return { repo, shop, user };
}

export async function requirePlatformAdmin() {
  const repo = getRepository();
  const user = await getCurrentUser();
  if (!user) {
    redirect("/control/login");
  }

  const allowed = await isPlatformAdmin(user.id);
  if (!allowed) {
    redirect("/control/login?error=not-admin");
  }

  return { repo, user };
}
