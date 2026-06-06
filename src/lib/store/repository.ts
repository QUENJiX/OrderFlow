import type {
  BillingRecord,
  BillingRecordPatch,
  Id,
  Order,
  OrderInput,
  OrderPatch,
  Product,
  ProductInput,
  ReplyTemplate,
  Shop,
  ShopPatch,
  WebhookEvent
} from "../domain/types";

export type WebhookEventInput = Omit<WebhookEvent, "id" | "createdAt">;

export type OrderFlowRepository = {
  getShopBySlug(slug: string): Promise<Shop | undefined>;
  getShopById(id: Id): Promise<Shop | undefined>;
  listShops(): Promise<Shop[]>;
  updateShop(shopId: Id, patch: ShopPatch): Promise<Shop>;
  listProducts(shopId: Id): Promise<Product[]>;
  getProductBySlug(shopSlug: string, productSlug: string): Promise<Product | undefined>;
  getProductById(productId: Id): Promise<Product | undefined>;
  createProduct(shopId: Id, input: ProductInput): Promise<Product>;
  updateProduct(productId: Id, input: Partial<ProductInput>): Promise<Product>;
  deactivateProduct(productId: Id): Promise<Product>;
  listOrders(shopId: Id): Promise<Order[]>;
  getOrderById(orderId: Id): Promise<Order | undefined>;
  createOrder(input: OrderInput): Promise<Order>;
  updateOrder(orderId: Id, patch: OrderPatch): Promise<Order>;
  listReplyTemplates(shopId: Id): Promise<ReplyTemplate[]>;
  listWebhookEvents(shopId: Id): Promise<WebhookEvent[]>;
  recordWebhookEvent(input: WebhookEventInput): Promise<WebhookEvent>;
  listBillingRecords(shopId: Id): Promise<BillingRecord[]>;
  updateBillingRecord(billingId: Id, patch: BillingRecordPatch): Promise<BillingRecord>;
};
