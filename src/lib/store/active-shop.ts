import { demoShop } from "../domain/seed";
import type { Shop } from "../domain/types";

type ShopResolver = {
  getShopBySlug(slug: string): Promise<Shop | undefined>;
};

export async function getActiveShop(repo: ShopResolver) {
  const shop = await repo.getShopBySlug(demoShop.slug);
  if (!shop) {
    throw new Error("Active shop was not found");
  }

  return shop;
}
