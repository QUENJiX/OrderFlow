import { notFound } from "next/navigation";
import { PublicOrderForm } from "@/components/public-order-form";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    shopSlug: string;
    productSlug: string;
  }>;
};

export default async function OrderPage({ params }: PageProps) {
  const { shopSlug, productSlug } = await params;
  const repo = getRepository();
  const [shop, product] = await Promise.all([
    repo.getShopBySlug(shopSlug),
    repo.getProductBySlug(shopSlug, productSlug)
  ]);

  if (!shop || !product || !product.active) {
    notFound();
  }

  return <PublicOrderForm product={product} shop={shop} />;
}
