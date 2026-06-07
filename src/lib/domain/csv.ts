import type { Order, Product } from "./types";

const headers = [
  "customer_name",
  "phone",
  "address",
  "district",
  "area",
  "product_name",
  "quantity",
  "cod_amount",
  "delivery_charge",
  "merchant_invoice_id",
  "note"
];

function sanitizeCell(value: string | number | undefined) {
  const raw = String(value ?? "").replace(/\r?\n/g, " ");
  const safe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  if (/[",\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }

  return safe;
}

export function buildCourierCsv(orders: Order[], products: Product[]) {
  const productById = new Map(products.map((product) => [product.id, product]));
  const rows = orders.map((order) => {
    const product = productById.get(order.productId);
    return [
      order.customer.name,
      order.customer.phone,
      order.customer.address,
      order.customer.district,
      order.customer.area,
      product?.name ?? "Unknown product",
      order.quantity,
      order.total,
      order.deliveryCharge,
      order.id,
      order.customerNotes ?? order.merchantNotes ?? ""
    ]
      .map(sanitizeCell)
      .join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
