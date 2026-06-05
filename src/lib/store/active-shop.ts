import { demoShop } from "../domain/seed";
import type { Shop } from "../domain/types";

type ShopResolver = {
  getShopBySlug(slug: string): Promise<Shop | undefined>;
};

export async function findActiveShop(repo: ShopResolver) {
  return repo.getShopBySlug(demoShop.slug);
}

export async function getActiveShop(repo: ShopResolver) {
  const shop = await findActiveShop(repo);
  if (!shop) {
    throw new Error("Active shop was not found");
  }

  return shop;
}
