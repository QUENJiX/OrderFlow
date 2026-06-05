import {
  demoBillingRecords,
  demoOrders,
  demoProducts,
  demoShop,
  demoTemplates,
  demoWebhookEvents
} from "../domain/seed";
import { calculateOrderTotals } from "../domain/money";
import type {
  BillingRecord,
  Order,
  Product,
  ReplyTemplate,
  Shop,
  WebhookEvent
} from "../domain/types";
import { validateOrderInput, validateProductInput } from "../domain/validation";
import type { OrderFlowRepository, WebhookEventInput } from "./repository";

type LocalState = {
  shops: Shop[];
  products: Product[];
  orders: Order[];
  templates: ReplyTemplate[];
  webhookEvents: WebhookEvent[];
  billingRecords: BillingRecord[];
};

export class RepositoryValidationError extends Error {
  fieldErrors: Record<string, string>;

  constructor(fieldErrors: Record<string, string>) {
    super("Validation failed");
    this.fieldErrors = fieldErrors;
  }
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defaultState(): LocalState {
  return {
    shops: clone([demoShop]),
    products: clone(demoProducts),
    orders: clone(demoOrders),
    templates: clone(demoTemplates),
    webhookEvents: clone(demoWebhookEvents),
    billingRecords: clone(demoBillingRecords)
  };
}

function sortNewest<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createLocalRepository(
  initialState: LocalState = defaultState()
): OrderFlowRepository {
  const state = initialState;

  return {
    async getShopBySlug(slug) {
      return clone(state.shops.find((shop) => shop.slug === slug));
    },

    async getShopById(id) {
      return clone(state.shops.find((shop) => shop.id === id));
    },

    async listShops() {
      return clone(state.shops);
    },

    async listProducts(shopId) {
      return clone(
        state.products.filter((product) => product.shopId === shopId)
      );
    },

    async getProductBySlug(shopSlug, productSlug) {
      const shop = state.shops.find((item) => item.slug === shopSlug);
      if (!shop) return undefined;
      return clone(
        state.products.find(
          (product) =>
            product.shopId === shop.id && product.slug === productSlug
        )
      );
    },

    async getProductById(productId) {
      return clone(state.products.find((product) => product.id === productId));
    },

    async createProduct(shopId, input) {
      const errors = validateProductInput(input);
      if (Object.keys(errors).length > 0) {
        throw new RepositoryValidationError(errors);
      }

      const timestamp = new Date().toISOString();
      const product: Product = {
        id: newId("prod"),
        shopId,
        slug: slugify(input.name),
        createdAt: timestamp,
        updatedAt: timestamp,
        ...input
      };
      state.products.unshift(product);
      return clone(product);
    },

    async updateProduct(productId, input) {
      const index = state.products.findIndex((product) => product.id === productId);
      if (index === -1) {
        throw new Error("Product not found");
      }

      const next = {
        ...state.products[index],
        ...input,
        slug: input.name ? slugify(input.name) : state.products[index].slug,
        updatedAt: new Date().toISOString()
      };
      const errors = validateProductInput(next);
      if (Object.keys(errors).length > 0) {
        throw new RepositoryValidationError(errors);
      }

      state.products[index] = next;
      return clone(next);
    },

    async deactivateProduct(productId) {
      return this.updateProduct(productId, { active: false });
    },

    async listOrders(shopId) {
      return clone(sortNewest(state.orders.filter((order) => order.shopId === shopId)));
    },

    async getOrderById(orderId) {
      return clone(state.orders.find((order) => order.id === orderId));
    },

    async createOrder(input) {
      const shop = state.shops.find((item) => item.slug === input.shopSlug);
      const product = shop
        ? state.products.find(
            (item) => item.shopId === shop.id && item.slug === input.productSlug
          )
        : undefined;
      const errors = validateOrderInput(input, product);
      if (!shop) {
        errors.shop = "Shop was not found";
      }
      if (Object.keys(errors).length > 0) {
        throw new RepositoryValidationError(errors);
      }

      const timestamp = new Date().toISOString();
      const totals = calculateOrderTotals({
        price: product!.price,
        deliveryCharge: product!.deliveryCharge,
        quantity: input.quantity
      });
      const order: Order = {
        id: newId("ord"),
        shopId: shop!.id,
        productId: product!.id,
        customer: input.customer,
        quantity: input.quantity,
        variant: input.variant,
        paymentMethod: input.paymentMethod,
        paymentStatus:
          input.paymentMethod === "cod" ? "unpaid" : "awaiting_verification",
        paymentReference: input.paymentReference,
        status: "new",
        courierProvider: shop!.defaultCourier,
        customerNotes: input.customerNotes,
        subtotal: totals.subtotal,
        deliveryCharge: totals.deliveryCharge,
        total: totals.total,
        slaDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: timestamp,
        updatedAt: timestamp
      };

      state.orders.unshift(order);
      return clone(order);
    },

    async updateOrder(orderId, patch) {
      const index = state.orders.findIndex((order) => order.id === orderId);
      if (index === -1) {
        throw new Error("Order not found");
      }

      state.orders[index] = {
        ...state.orders[index],
        ...patch,
        updatedAt: new Date().toISOString()
      };
      return clone(state.orders[index]);
    },

    async listReplyTemplates(shopId) {
      return clone(
        state.templates.filter((template) => template.shopId === shopId)
      );
    },

    async listWebhookEvents(shopId) {
      const productIds = new Set(
        state.products
          .filter((product) => product.shopId === shopId)
          .map((product) => product.id)
      );
      return clone(
        sortNewest(
          state.webhookEvents.filter(
            (event) =>
              !event.matchedProductId || productIds.has(event.matchedProductId)
          )
        )
      );
    },

    async recordWebhookEvent(input: WebhookEventInput) {
      const event: WebhookEvent = {
        id: newId("evt"),
        createdAt: new Date().toISOString(),
        ...input
      };
      state.webhookEvents.unshift(event);
      return clone(event);
    },

    async listBillingRecords(shopId) {
      return clone(
        state.billingRecords.filter((record) => record.shopId === shopId)
      );
    }
  };
}

declare global {
  var orderFlowLocalRepository: OrderFlowRepository | undefined;
}

export function getLocalRepository() {
  if (!globalThis.orderFlowLocalRepository) {
    globalThis.orderFlowLocalRepository = createLocalRepository();
  }

  return globalThis.orderFlowLocalRepository;
}
