export type Id = string;

export type ShopStatus = "pilot" | "active" | "paused";
export type ShopPlan = "pilot" | "starter" | "assisted";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "packed"
  | "courier_ready"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentMethod = "cod" | "manual_bkash" | "manual_nagad";

export type PaymentStatus =
  | "unpaid"
  | "awaiting_verification"
  | "verified"
  | "failed"
  | "refunded";

export type CourierProvider =
  | "steadfast"
  | "pathao"
  | "redx"
  | "ecourier"
  | "paperfly"
  | "manual";

export type ReplyLanguage = "bn" | "en";

export type Shop = {
  id: Id;
  slug: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  logoUrl?: string;
  supportPhone: string;
  defaultDistrict: string;
  defaultCourier: CourierProvider;
  plan: ShopPlan;
  status: ShopStatus;
  billingNotes: string;
  supportNotes: string;
  createdAt: string;
  updatedAt: string;
};

export type ShopPatch = Partial<
  Pick<
    Shop,
    | "billingNotes"
    | "defaultCourier"
    | "defaultDistrict"
    | "email"
    | "logoUrl"
    | "ownerName"
    | "phone"
    | "plan"
    | "status"
    | "supportNotes"
    | "supportPhone"
  >
>;

export type ProductVariant = {
  name: string;
  stock: number;
};

export type Product = {
  id: Id;
  shopId: Id;
  slug: string;
  name: string;
  nameBn: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  deliveryCharge: number;
  stock: number;
  variants: ProductVariant[];
  keywords: string[];
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Customer = {
  name: string;
  phone: string;
  alternatePhone?: string;
  district: string;
  area: string;
  address: string;
};

export type Order = {
  id: Id;
  shopId: Id;
  productId: Id;
  customer: Customer;
  quantity: number;
  variant?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  status: OrderStatus;
  courierProvider: CourierProvider;
  trackingId?: string;
  merchantNotes?: string;
  customerNotes?: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  slaDeadline: string;
  createdAt: string;
  updatedAt: string;
};

export type ReplyTemplate = {
  id: Id;
  shopId: Id;
  language: ReplyLanguage;
  title: string;
  trigger: string;
  body: string;
  active: boolean;
};

export type WebhookEvent = {
  id: Id;
  provider: "meta";
  eventType: "comment" | "message" | "test";
  sourceId: string;
  matchedProductId?: Id;
  message: string;
  reply: string;
  status: "simulated" | "matched" | "fallback" | "failed";
  createdAt: string;
};

export type BillingRecord = {
  id: Id;
  shopId: Id;
  plan: ShopPlan;
  amount: number;
  period: string;
  status: "trial" | "due" | "paid" | "overdue";
  notes: string;
  createdAt: string;
};

export type BillingRecordPatch = Partial<Pick<BillingRecord, "notes" | "status">>;

export type FieldErrors = Record<string, string>;

export type OrderInput = {
  shopSlug: string;
  productSlug: string;
  customer: Customer;
  quantity: number;
  variant?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  customerNotes?: string;
};

export type ProductInput = {
  name: string;
  nameBn: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  deliveryCharge: number;
  stock: number;
  variants: ProductVariant[];
  keywords: string[];
  imageUrl: string;
  active: boolean;
};

export type OrderPatch = {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentReference?: string;
  courierProvider?: CourierProvider;
  trackingId?: string;
  merchantNotes?: string;
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  packed: "Packed",
  courier_ready: "Courier ready",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned"
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  manual_bkash: "Manual bKash",
  manual_nagad: "Manual Nagad"
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: "Unpaid",
  awaiting_verification: "Awaiting verification",
  verified: "Verified",
  failed: "Failed",
  refunded: "Refunded"
};

export const COURIER_LABELS: Record<CourierProvider, string> = {
  steadfast: "Steadfast",
  pathao: "Pathao",
  redx: "RedX",
  ecourier: "eCourier",
  paperfly: "Paperfly",
  manual: "Manual"
};

export const ORDER_STATUSES = Object.keys(
  ORDER_STATUS_LABELS
) as OrderStatus[];
export const PAYMENT_STATUSES = Object.keys(
  PAYMENT_STATUS_LABELS
) as PaymentStatus[];
export const PAYMENT_METHODS = Object.keys(
  PAYMENT_METHOD_LABELS
) as PaymentMethod[];
export const COURIERS = Object.keys(COURIER_LABELS) as CourierProvider[];
