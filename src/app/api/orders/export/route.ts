import { buildCourierCsv } from "@/lib/domain/csv";
import { demoShop } from "@/lib/domain/seed";
import { getRepository } from "@/lib/store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const repo = getRepository();
  const orders = await repo.listOrders(demoShop.id);
  const products = await repo.listProducts(demoShop.id);
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
