import { describe, expect, it } from "vitest";
import { demoShop } from "../domain/seed";
import type { Shop } from "../domain/types";
import { getActiveShop } from "./active-shop";

describe("getActiveShop", () => {
  it("resolves the active shop from the repository by the demo slug", async () => {
    const shop: Shop = {
      ...demoShop,
      id: "database-shop-id"
    };

    const result = await getActiveShop({
      getShopBySlug: async (slug: string) =>
        slug === demoShop.slug ? shop : undefined
    });

    expect(result.id).toBe("database-shop-id");
  });

  it("throws when the active shop is missing", async () => {
    await expect(
      getActiveShop({
        getShopBySlug: async () => undefined
      })
    ).rejects.toThrow("Active shop was not found");
  });
});
