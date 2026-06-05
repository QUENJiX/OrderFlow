import { getRuntimeConfig } from "../config/env";
import { getLocalRepository } from "./local-store";
import { createSupabaseRepository, selectRepositoryKind } from "./supabase-store";

export function getRepository() {
  const config = getRuntimeConfig();
  return selectRepositoryKind(config) === "supabase"
    ? createSupabaseRepository()
    : getLocalRepository();
}

export type { OrderFlowRepository, WebhookEventInput } from "./repository";
export { RepositoryValidationError } from "./local-store";
