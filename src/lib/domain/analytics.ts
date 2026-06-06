import type {
  BillingRecord,
  Order,
  PaymentStatus,
  Product,
  Shop,
  ShopPlan,
  ShopStatus
} from "./types";

export type MerchantDashboardSummary = {
  courierReady: number;
  lowStockProducts: number;
  orderValue: number;
  ordersToday: number;
  pendingPayments: number;
};

export type CustomerSummary = {
  district: string;
  lastOrderAt: string;
  name: string;
  orderCount: number;
  phone: string;
  totalSpent: number;
};

export type PlatformMerchantRow = {
  billingStatus: BillingRecord["status"] | "none";
  lastOrderAt?: string;
  orderValue: number;
  orders: number;
  plan: ShopPlan;
  shopId: string;
  shopName: string;
  slug: string;
  status: ShopStatus;
  supportNotes: string;
};

export type PlatformOverview = {
  billingQueue: BillingRecord[];
  merchantRows: PlatformMerchantRow[];
  metrics: {
    billingDue: number;
    merchants: number;
    orders: number;
    orderValue: number;
  };
  recentOrders: Order[];
};

function isSameDate(left: Date, right: Date) {
  return left.toDateString() === right.toDateString();
}

export function buildMerchantDashboardSummary({
  lowStockThreshold = 5,
  now = new Date(),
  orders,
  products
}: {
  lowStockThreshold?: number;
  now?: Date;
  orders: Order[];
  products: Product[];
}): MerchantDashboardSummary {
  const paymentNeedsAction = new Set<PaymentStatus>([
    "awaiting_verification",
    "failed"
  ]);

  return {
    courierReady: orders.filter((order) => order.status === "courier_ready").length,
    lowStockProducts: products.filter(
      (product) => product.active && product.stock <= lowStockThreshold
    ).length,
    orderValue: orders.reduce((sum, order) => sum + order.total, 0),
    ordersToday: orders.filter((order) =>
      isSameDate(new Date(order.createdAt), now)
    ).length,
    pendingPayments: orders.filter((order) =>
      paymentNeedsAction.has(order.paymentStatus)
    ).length
  };
}

export function buildCustomerSummaries(orders: Order[]): CustomerSummary[] {
  const customers = new Map<string, CustomerSummary>();

  for (const order of orders) {
    const key = order.customer.phone.trim();
    const existing = customers.get(key);
    if (!existing || new Date(order.createdAt) > new Date(existing.lastOrderAt)) {
      customers.set(key, {
        district: order.customer.district,
        lastOrderAt: order.createdAt,
        name: order.customer.name,
        orderCount: (existing?.orderCount ?? 0) + 1,
        phone: order.customer.phone,
        totalSpent: (existing?.totalSpent ?? 0) + order.total
      });
      continue;
    }

    customers.set(key, {
      ...existing,
      orderCount: existing.orderCount + 1,
      totalSpent: existing.totalSpent + order.total
    });
  }

  return [...customers.values()].sort(
    (a, b) => new Date(b.lastOrderAt).getTime() - new Date(a.lastOrderAt).getTime()
  );
}

export function buildPlatformOverview({
  billingRecords,
  orders,
  shops
}: {
  billingRecords: BillingRecord[];
  orders: Order[];
  shops: Shop[];
}): PlatformOverview {
  const billingQueue = billingRecords.filter((record) =>
    ["due", "overdue", "trial"].includes(record.status)
  );
  const orderValue = orders.reduce((sum, order) => sum + order.total, 0);

  return {
    billingQueue,
    merchantRows: shops.map((shop) => {
      const shopOrders = orders.filter((order) => order.shopId === shop.id);
      const latestOrder = shopOrders.toSorted(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      const latestBilling = billingRecords
        .filter((record) => record.shopId === shop.id)
        .toSorted(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

      return {
        billingStatus: latestBilling?.status ?? "none",
        lastOrderAt: latestOrder?.createdAt,
        orderValue: shopOrders.reduce((sum, order) => sum + order.total, 0),
        orders: shopOrders.length,
        plan: shop.plan,
        shopId: shop.id,
        shopName: shop.name,
        slug: shop.slug,
        status: shop.status,
        supportNotes: shop.supportNotes
      };
    }),
    metrics: {
      billingDue: billingQueue.reduce((sum, record) => sum + record.amount, 0),
      merchants: shops.length,
      orders: orders.length,
      orderValue
    },
    recentOrders: orders.toSorted(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  };
}
