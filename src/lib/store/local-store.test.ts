import { describe, expect, it } from "vitest";
import { demoProducts, demoShop } from "../domain/seed";
import type { OrderInput } from "../domain/types";
import { createLocalRepository } from "./local-store";

function validOrderInput(overrides: Partial<OrderInput> = {}): OrderInput {
  return {
    shopSlug: demoShop.slug,
    productSlug: demoProducts[0].slug,
    customer: {
      name: "Farhana Akter",
      phone: "01755667788",
      district: "Dhaka",
      area: "Dhanmondi",
      address: "Road 7, Dhanmondi, Dhaka"
    },
    quantity: 2,
    variant: "M",
    paymentMethod: "cod",
    customerNotes: "Deliver after 5 PM",
    ...overrides
  };
}

describe("createLocalRepository", () => {
  it("lists seeded products for the demo shop", async () => {
    const repo = createLocalRepository();
    const products = await repo.listProducts(demoShop.id);

    expect(products.length).toBeGreaterThanOrEqual(4);
    expect(products[0]).toMatchObject({
      shopId: demoShop.id,
      active: true
    });
  });

  it("creates an order from valid input and calculates totals", async () => {
    const repo = createLocalRepository();
    const order = await repo.createOrder(validOrderInput());

    expect(order).toMatchObject({
      productId: demoProducts[0].id,
      quantity: 2,
      subtotal: 2900,
      deliveryCharge: 80,
      total: 2980,
      status: "new"
    });

    const orders = await repo.listOrders(demoShop.id);
    expect(orders.some((item) => item.id === order.id)).toBe(true);
  });

  it("patches order operations fields", async () => {
    const repo = createLocalRepository();
    const order = await repo.createOrder(validOrderInput());
    const updated = await repo.updateOrder(order.id, {
      status: "courier_ready",
      paymentStatus: "verified",
      courierProvider: "steadfast",
      trackingId: "SF-123"
    });

    expect(updated).toMatchObject({
      status: "courier_ready",
      paymentStatus: "verified",
      courierProvider: "steadfast",
      trackingId: "SF-123"
    });
  });

  it("soft deactivates a product", async () => {
    const repo = createLocalRepository();
    const product = await repo.deactivateProduct(demoProducts[0].id);

    expect(product.active).toBe(false);
  });

  it("records webhook events", async () => {
    const repo = createLocalRepository();
    const event = await repo.recordWebhookEvent({
      provider: "meta",
      eventType: "comment",
      sourceId: "comment-1",
      matchedProductId: demoProducts[0].id,
      message: "price?",
      reply: "Order link ready",
      status: "matched"
    });

    const events = await repo.listWebhookEvents(demoShop.id);
    expect(events[0]).toMatchObject({
      id: event.id,
      status: "matched",
      message: "price?"
    });
  });
});
