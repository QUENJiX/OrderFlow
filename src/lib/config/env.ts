export type RuntimeMode = "local" | "supabase";

export type RuntimeConfig = {
  appUrl: string;
  mode: RuntimeMode;
  supabase: {
    isConfigured: boolean;
    url?: string;
    publishableKey?: string;
    serviceRoleKey?: string;
    missing: string[];
  };
};

type EnvLike = Record<string, string | undefined>;

function readPublicSupabaseKey(env: EnvLike) {
  return (
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getRuntimeConfig(env: EnvLike = process.env): RuntimeConfig {
  const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = readPublicSupabaseKey(env);
  const missing: string[] = [];

  if (!supabaseUrl) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!publishableKey) {
    missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  const isConfigured = missing.length === 0;

  return {
    appUrl,
    mode: isConfigured ? "supabase" : "local",
    supabase: {
      isConfigured,
      url: supabaseUrl,
      publishableKey,
      serviceRoleKey:
        env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY,
      missing
    }
  };
}

export function isSupabaseMode(config: RuntimeConfig = getRuntimeConfig()) {
  return config.mode === "supabase";
}
