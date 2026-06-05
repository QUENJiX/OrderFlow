import { describe, expect, it } from "vitest";
import { getRuntimeConfig } from "./env";

describe("getRuntimeConfig", () => {
  it("uses local mode when Supabase public config is absent", () => {
    expect(getRuntimeConfig({})).toMatchObject({
      mode: "local",
      supabase: {
        isConfigured: false,
        missing: [
          "NEXT_PUBLIC_SUPABASE_URL",
          "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
        ]
      }
    });
  });

  it("uses Supabase mode when public Supabase config is present", () => {
    expect(
      getRuntimeConfig({
        NEXT_PUBLIC_APP_URL: "https://orderflowbd.example",
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test"
      })
    ).toMatchObject({
      appUrl: "https://orderflowbd.example",
      mode: "supabase",
      supabase: {
        isConfigured: true,
        url: "https://project.supabase.co",
        publishableKey: "sb_publishable_test",
        missing: []
      }
    });
  });

  it("accepts the legacy anon key env name as a public key alias", () => {
    expect(
      getRuntimeConfig({
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "legacy-anon"
      })
    ).toMatchObject({
      mode: "supabase",
      supabase: {
        publishableKey: "legacy-anon"
      }
    });
  });

  it("reports partial Supabase config without enabling Supabase mode", () => {
    expect(
      getRuntimeConfig({
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co"
      })
    ).toMatchObject({
      mode: "local",
      supabase: {
        isConfigured: false,
        missing: ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]
      }
    });
  });
});
