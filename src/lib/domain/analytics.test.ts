import { describe, expect, it } from "vitest";
import {
  buildCustomerSummaries,
  buildMerchantDashboardSummary,
  buildPlatformOverview
} from "./analytics";
import { demoBillingRecords, demoOrders, demoProducts, demoShop } from "./seed";

describe("buildMerchantDashboardSummary", () => {
  it("counts the merchant action queues from orders and products", () => {
    const summary = buildMerchantDashboardSummary({
      now: new Date(demoOrders[0].createdAt),
      orders: demoOrders,
      products: [
        ...demoProducts,
        { ...demoProducts[0], id: "prod_low", stock: 2 }
      ]
    });

    expect(summary.ordersToday).toBe(1);
    expect(summary.pendingPayments).toBe(1);
    expect(summary.courierReady).toBe(1);
    expect(summary.lowStockProducts).toBe(1);
    expect(summary.orderValue).toBe(7840);
  });
});

describe("buildCustomerSummaries", () => {
  it("groups customers by phone and sorts by latest order", () => {
    const repeatedOrder = {
      ...demoOrders[0],
      id: "ord_repeat",
      customer: {
        ...demoOrders[0].customer,
        name: "Tasmia R.",
        district: "Dhaka"
      },
      total: 2200,
      createdAt: "2099-01-01T00:00:00.000Z"
    };

    const customers = buildCustomerSummaries([...demoOrders, repeatedOrder]);

    expect(customers[0]).toMatchObject({
      name: "Tasmia R.",
      phone: demoOrders[0].customer.phone,
      district: "Dhaka",
      orderCount: 2,
      totalSpent: demoOrders[0].total + repeatedOrder.total
    });
    expect(customers).toHaveLength(3);
  });
});

describe("buildPlatformOverview", () => {
  it("builds global metrics and per-merchant health rows", () => {
    const overview = buildPlatformOverview({
      billingRecords: demoBillingRecords,
      orders: demoOrders,
      shops: [demoShop]
    });

    expect(overview.metrics).toMatchObject({
      billingDue: 0,
      merchants: 1,
      orders: 3,
      orderValue: 7840
    });
    expect(overview.merchantRows[0]).toMatchObject({
      shopId: demoShop.id,
      shopName: demoShop.name,
      orders: 3,
      orderValue: 7840,
      plan: "pilot",
      status: "pilot"
    });
  });
});
