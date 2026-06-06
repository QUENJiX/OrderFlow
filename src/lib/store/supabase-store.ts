import type { SupabaseClient } from "@supabase/supabase-js";
import { getRuntimeConfig, type RuntimeConfig } from "../config/env";
import { calculateOrderTotals } from "../domain/money";
import type {
  BillingRecord,
  BillingRecordPatch,
  CourierProvider,
  Customer,
  Order,
  OrderInput,
  OrderPatch,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  ProductInput,
  ProductVariant,
  ReplyLanguage,
  ReplyTemplate,
  Shop,
  ShopPatch,
  ShopPlan,
  ShopStatus,
  WebhookEvent
} from "../domain/types";
import { validateOrderInput, validateProductInput } from "../domain/validation";
import type { Database, Json } from "../supabase/types";
import { createServerSupabaseClient } from "../supabase/server";
import { RepositoryValidationError, slugify } from "./local-store";
import type { OrderFlowRepository, WebhookEventInput } from "./repository";

type Supabase = SupabaseClient<Database>;
type ShopRow = Database["public"]["Tables"]["shops"]["Row"];
type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type TemplateRow = Database["public"]["Tables"]["reply_templates"]["Row"];
type WebhookEventRow = Database["public"]["Tables"]["webhook_events"]["Row"];
type BillingRow = Database["public"]["Tables"]["billing_records"]["Row"];

export function selectRepositoryKind(config: RuntimeConfig = getRuntimeConfig()) {
  return config.supabase.isConfigured ? "supabase" : "local";
}

function asVariants(value: Json): ProductVariant[] {
  return Array.isArray(value)
    ? value
        .filter((item): item is { name: string; stock: number } => {
          return (
            typeof item === "object" &&
            item !== null &&
            "name" in item &&
            "stock" in item &&
            typeof item.name === "string" &&
            typeof item.stock === "number"
          );
        })
        .map((item) => ({ name: item.name, stock: item.stock }))
    : [];
}

function asCustomer(value: Json): Customer {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid customer payload");
  }

  const customer = value as Record<string, Json | undefined>;

  return {
    name: String(customer.name ?? ""),
    phone: String(customer.phone ?? ""),
    alternatePhone:
      customer.alternatePhone || customer.alternate_phone
        ? String(customer.alternatePhone ?? customer.alternate_phone)
        : undefined,
    district: String(customer.district ?? ""),
    area: String(customer.area ?? ""),
    address: String(customer.address ?? "")
  };
}

export function mapShopRow(row: ShopRow): Shop {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    ownerName: row.owner_name,
    phone: row.phone,
    email: row.email,
    logoUrl: row.logo_url ?? undefined,
    supportPhone: row.support_phone,
    defaultDistrict: row.default_district,
    defaultCourier: row.default_courier as CourierProvider,
    plan: row.plan as ShopPlan,
    status: row.status as ShopStatus,
    billingNotes: row.billing_notes,
    supportNotes: row.support_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    shopId: row.shop_id,
    slug: row.slug,
    name: row.name,
    nameBn: row.name_bn,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    deliveryCharge: row.delivery_charge,
    stock: row.stock,
    variants: asVariants(row.variants),
    keywords: row.keywords,
    imageUrl: row.image_url,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function mapOrderRow(row: OrderRow): Order {
  return {
    id: row.id,
    shopId: row.shop_id,
    productId: row.product_id,
    customer: asCustomer(row.customer),
    quantity: row.quantity,
    variant: row.variant ?? undefined,
    paymentMethod: row.payment_method as PaymentMethod,
    paymentStatus: row.payment_status as PaymentStatus,
    paymentReference: row.payment_reference ?? undefined,
    status: row.status as OrderStatus,
    courierProvider: row.courier_provider as CourierProvider,
    trackingId: row.tracking_id ?? undefined,
    merchantNotes: row.merchant_notes ?? undefined,
    customerNotes: row.customer_notes ?? undefined,
    subtotal: row.subtotal,
    deliveryCharge: row.delivery_charge,
    total: row.total,
    slaDeadline: row.sla_deadline,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapTemplateRow(row: TemplateRow): ReplyTemplate {
  return {
    id: row.id,
    shopId: row.shop_id,
    language: row.language as ReplyLanguage,
    title: row.title,
    trigger: row.trigger,
    body: row.body,
    active: row.active
  };
}

function mapWebhookEventRow(row: WebhookEventRow): WebhookEvent {
  return {
    id: row.id,
    provider: "meta",
    eventType: row.event_type as WebhookEvent["eventType"],
    sourceId: row.source_id,
    matchedProductId: row.matched_product_id ?? undefined,
    message: row.message,
    reply: row.reply,
    status: row.status as WebhookEvent["status"],
    createdAt: row.created_at
  };
}

function mapBillingRow(row: BillingRow): BillingRecord {
  return {
    id: row.id,
    shopId: row.shop_id,
    plan: row.plan as ShopPlan,
    amount: row.amount,
    period: row.period,
    status: row.status as BillingRecord["status"],
    notes: row.notes,
    createdAt: row.created_at
  };
}

function productInputToRow(input: ProductInput) {
  return {
    slug: slugify(input.name),
    name: input.name,
    name_bn: input.nameBn,
    description: input.description,
    price: input.price,
    compare_at_price: input.compareAtPrice ?? null,
    delivery_charge: input.deliveryCharge,
    stock: input.stock,
    variants: input.variants as unknown as Json,
    keywords: input.keywords,
    image_url: input.imageUrl,
    active: input.active
  };
}

function shopPatchToRow(patch: ShopPatch) {
  return {
    billing_notes: patch.billingNotes,
    default_courier: patch.defaultCourier,
    default_district: patch.defaultDistrict,
    email: patch.email,
    logo_url: patch.logoUrl,
    owner_name: patch.ownerName,
    phone: patch.phone,
    plan: patch.plan,
    status: patch.status,
    support_notes: patch.supportNotes,
    support_phone: patch.supportPhone
  };
}

function billingPatchToRow(patch: BillingRecordPatch) {
  return {
    notes: patch.notes,
    status: patch.status
  };
}

function orderPatchToRow(patch: OrderPatch) {
  return {
    status: patch.status,
    payment_status: patch.paymentStatus,
    payment_reference: patch.paymentReference,
    courier_provider: patch.courierProvider,
    tracking_id: patch.trackingId,
    merchant_notes: patch.merchantNotes
  };
}

async function unwrapSingle<T>(query: PromiseLike<{ data: T | null; error: { message: string } | null }>) {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Supabase row was not found");
  return data;
}

async function unwrapList<T>(query: PromiseLike<{ data: T[] | null; error: { message: string } | null }>) {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export function createSupabaseRepository(
  getClient: () => Promise<Supabase> = createServerSupabaseClient
): OrderFlowRepository {
  return {
    async getShopBySlug(slug) {
      const supabase = await getClient();
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapShopRow(data) : undefined;
    },

    async getShopById(id) {
      const supabase = await getClient();
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapShopRow(data) : undefined;
    },

    async listShops() {
      const supabase = await getClient();
      const rows = await unwrapList(supabase.from("shops").select("*").order("created_at"));
      return rows.map(mapShopRow);
    },

    async updateShop(shopId, patch) {
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("shops")
          .update(shopPatchToRow(patch))
          .eq("id", shopId)
          .select("*")
          .single()
      );
      return mapShopRow(row);
    },

    async listProducts(shopId) {
      const supabase = await getClient();
      const rows = await unwrapList(
        supabase
          .from("products")
          .select("*")
          .eq("shop_id", shopId)
          .order("created_at", { ascending: false })
      );
      return rows.map(mapProductRow);
    },

    async getProductBySlug(shopSlug, productSlug) {
      const shop = await this.getShopBySlug(shopSlug);
      if (!shop) return undefined;
      const supabase = await getClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("shop_id", shop.id)
        .eq("slug", productSlug)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapProductRow(data) : undefined;
    },

    async getProductById(productId) {
      const supabase = await getClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapProductRow(data) : undefined;
    },

    async createProduct(shopId, input) {
      const errors = validateProductInput(input);
      if (Object.keys(errors).length > 0) {
        throw new RepositoryValidationError(errors);
      }
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("products")
          .insert({ shop_id: shopId, ...productInputToRow(input) })
          .select("*")
          .single()
      );
      return mapProductRow(row);
    },

    async updateProduct(productId, input) {
      const existing = await this.getProductById(productId);
      if (!existing) throw new Error("Product not found");
      const nextInput: ProductInput = {
        name: input.name ?? existing.name,
        nameBn: input.nameBn ?? existing.nameBn,
        description: input.description ?? existing.description,
        price: input.price ?? existing.price,
        compareAtPrice: input.compareAtPrice ?? existing.compareAtPrice,
        deliveryCharge: input.deliveryCharge ?? existing.deliveryCharge,
        stock: input.stock ?? existing.stock,
        variants: input.variants ?? existing.variants,
        keywords: input.keywords ?? existing.keywords,
        imageUrl: input.imageUrl ?? existing.imageUrl,
        active: input.active ?? existing.active
      };
      const errors = validateProductInput(nextInput);
      if (Object.keys(errors).length > 0) {
        throw new RepositoryValidationError(errors);
      }
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("products")
          .update(productInputToRow(nextInput))
          .eq("id", productId)
          .select("*")
          .single()
      );
      return mapProductRow(row);
    },

    async deactivateProduct(productId) {
      return this.updateProduct(productId, { active: false });
    },

    async listOrders(shopId) {
      const supabase = await getClient();
      const rows = await unwrapList(
        supabase
          .from("orders")
          .select("*")
          .eq("shop_id", shopId)
          .order("created_at", { ascending: false })
      );
      return rows.map(mapOrderRow);
    },

    async getOrderById(orderId) {
      const supabase = await getClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapOrderRow(data) : undefined;
    },

    async createOrder(input: OrderInput) {
      const shop = await this.getShopBySlug(input.shopSlug);
      const product = shop
        ? await this.getProductBySlug(input.shopSlug, input.productSlug)
        : undefined;
      const errors = validateOrderInput(input, product);
      if (!shop) errors.shop = "Shop was not found";
      if (Object.keys(errors).length > 0) {
        throw new RepositoryValidationError(errors);
      }
      const totals = calculateOrderTotals({
        price: product!.price,
        deliveryCharge: product!.deliveryCharge,
        quantity: input.quantity
      });
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("orders")
          .insert({
            shop_id: shop!.id,
            product_id: product!.id,
            customer: input.customer as unknown as Json,
            quantity: input.quantity,
            variant: input.variant ?? null,
            payment_method: input.paymentMethod,
            payment_status:
              input.paymentMethod === "cod" ? "unpaid" : "awaiting_verification",
            payment_reference: input.paymentReference ?? null,
            status: "new",
            courier_provider: shop!.defaultCourier,
            customer_notes: input.customerNotes ?? null,
            subtotal: totals.subtotal,
            delivery_charge: totals.deliveryCharge,
            total: totals.total,
            sla_deadline: new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toISOString()
          })
          .select("*")
          .single()
      );
      return mapOrderRow(row);
    },

    async updateOrder(orderId, patch) {
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("orders")
          .update(orderPatchToRow(patch))
          .eq("id", orderId)
          .select("*")
          .single()
      );
      return mapOrderRow(row);
    },

    async listReplyTemplates(shopId) {
      const supabase = await getClient();
      const rows = await unwrapList(
        supabase
          .from("reply_templates")
          .select("*")
          .eq("shop_id", shopId)
          .order("title")
      );
      return rows.map(mapTemplateRow);
    },

    async listWebhookEvents() {
      const supabase = await getClient();
      const rows = await unwrapList(
        supabase
          .from("webhook_events")
          .select("*")
          .order("created_at", { ascending: false })
      );
      return rows.map(mapWebhookEventRow);
    },

    async recordWebhookEvent(input: WebhookEventInput) {
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("webhook_events")
          .insert({
            provider: input.provider,
            event_type: input.eventType,
            source_id: input.sourceId,
            matched_product_id: input.matchedProductId ?? null,
            message: input.message,
            reply: input.reply,
            status: input.status
          })
          .select("*")
          .single()
      );
      return mapWebhookEventRow(row);
    },

    async listBillingRecords(shopId) {
      const supabase = await getClient();
      const rows = await unwrapList(
        supabase
          .from("billing_records")
          .select("*")
          .eq("shop_id", shopId)
          .order("created_at", { ascending: false })
      );
      return rows.map(mapBillingRow);
    },

    async updateBillingRecord(billingId, patch) {
      const supabase = await getClient();
      const row = await unwrapSingle(
        supabase
          .from("billing_records")
          .update(billingPatchToRow(patch))
          .eq("id", billingId)
          .select("*")
          .single()
      );
      return mapBillingRow(row);
    }
  };
}
