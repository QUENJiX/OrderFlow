import { activeShopMissing } from "@/lib/api/responses";
import { getMerchantContext } from "@/lib/auth/session";
import { buildCourierCsv } from "@/lib/domain/csv";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const { repo, shop, user } = await getMerchantContext();
  if (!user) return activeShopMissing();
  if (!shop) return activeShopMissing();
  const orders = await repo.listOrders(shop.id);
  const products = await repo.listProducts(shop.id);
  const exportOrders = status
    ? orders.filter((order) => order.status === status)
    : orders;
  const csv = buildCourierCsv(exportOrders, products);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="orderflow-courier-export.csv"'
    }
  });
}
