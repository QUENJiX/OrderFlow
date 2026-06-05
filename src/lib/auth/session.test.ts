import { describe, expect, it } from "vitest";
import { getControlDestination, getMerchantDestination } from "./session";

describe("merchant auth routing", () => {
  it("sends anonymous merchants to login", () => {
    expect(
      getMerchantDestination({ hasShop: false, isAuthenticated: false })
    ).toBe("/merchant/login");
  });

  it("sends authenticated merchants without a shop to setup", () => {
    expect(
      getMerchantDestination({ hasShop: false, isAuthenticated: true })
    ).toBe("/merchant/setup");
  });

  it("sends authenticated merchants with a shop to dashboard", () => {
    expect(
      getMerchantDestination({ hasShop: true, isAuthenticated: true })
    ).toBe("/merchant/dashboard");
  });
});

describe("control auth routing", () => {
  it("sends anonymous control users to hidden login", () => {
    expect(
      getControlDestination({ isAuthenticated: false, isPlatformAdmin: false })
    ).toBe("/control/login");
  });

  it("does not admit authenticated non-admin users to control", () => {
    expect(
      getControlDestination({ isAuthenticated: true, isPlatformAdmin: false })
    ).toBe("/control/login?error=not-admin");
  });

  it("admits platform admins to control", () => {
    expect(
      getControlDestination({ isAuthenticated: true, isPlatformAdmin: true })
    ).toBe("/control");
  });
});
