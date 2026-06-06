import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createServerSupabaseClient,
  createWritableServerSupabaseClient
} from "./server";

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn((_url, _key, options) => options)
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn()
}));

const mockedCookies = vi.mocked(cookies);
const mockedCreateServerClient = vi.mocked(createServerClient);

describe("createServerSupabaseClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
  });

  it("does not write cookies while rendering server components", async () => {
    const cookieStore = {
      getAll: vi.fn(() => []),
      set: vi.fn()
    };
    mockedCookies.mockResolvedValue(cookieStore as never);

    await createServerSupabaseClient();
    const options = mockedCreateServerClient.mock.results[0].value;

    options.cookies.setAll([
      { name: "sb-test", value: "value", options: { path: "/" } }
    ]);

    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  it("writes cookies for route handlers that exchange auth sessions", async () => {
    const cookieStore = {
      getAll: vi.fn(() => []),
      set: vi.fn()
    };
    mockedCookies.mockResolvedValue(cookieStore as never);

    await createWritableServerSupabaseClient();
    const options = mockedCreateServerClient.mock.results[0].value;

    options.cookies.setAll([
      { name: "sb-test", value: "value", options: { path: "/" } }
    ]);

    expect(cookieStore.set).toHaveBeenCalledWith("sb-test", "value", {
      path: "/"
    });
  });
});
