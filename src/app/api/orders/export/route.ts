import { buildCourierCsv } from "@/lib/domain/csv";
import { getActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const repo = getRepository();
  const shop = await getActiveShop(repo);
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
