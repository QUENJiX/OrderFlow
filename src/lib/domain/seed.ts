import type {
  BillingRecord,
  Order,
  Product,
  ReplyTemplate,
  Shop,
  WebhookEvent
} from "./types";

const now = new Date().toISOString();
const oneDay = 24 * 60 * 60 * 1000;

function futureDate(days: number) {
  return new Date(Date.now() + days * oneDay).toISOString();
}

// Anchored to local noon so demo orders always land on distinct calendar
// days regardless of the time of day the seed module is evaluated.
function daysAgoAtNoon(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const demoShop: Shop = {
  id: "shop_nur_fashion",
  slug: "nur-fashion",
  name: "Nur Fashion",
  ownerName: "Nusrat Jahan",
  phone: "+8801711122233",
  email: "owner@nur-fashion.example",
  logoUrl: "",
  supportPhone: "+8801711122233",
  defaultDistrict: "Dhaka",
  defaultCourier: "steadfast",
  plan: "pilot",
  status: "pilot",
  billingNotes: "7-day assisted pilot. Founder pricing target BDT 1,500/month.",
  supportNotes:
    "Fashion pilot shop. Needs done-for-you product setup and courier CSV export.",
  createdAt: now,
  updatedAt: now
};

export const demoProducts: Product[] = [
  {
    id: "prod_linen_kurti",
    shopId: demoShop.id,
    slug: "linen-kurti",
    name: "Linen Kurti",
    nameBn: "লিনেন কুর্তি",
    description:
      "Lightweight linen kurti with breathable fabric, daily wear fit, and size options.",
    price: 1450,
    compareAtPrice: 1750,
    deliveryCharge: 80,
    stock: 36,
    variants: [
      { name: "S", stock: 8 },
      { name: "M", stock: 14 },
      { name: "L", stock: 10 },
      { name: "XL", stock: 4 }
    ],
    keywords: ["kurti", "linen", "কুর্তি", "price", "dam"],
    imageUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
    active: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "prod_cotton_three_piece",
    shopId: demoShop.id,
    slug: "cotton-three-piece",
    name: "Cotton Three Piece",
    nameBn: "কটন থ্রি-পিস",
    description:
      "Soft cotton three-piece set with printed dupatta and comfortable summer cut.",
    price: 2100,
    compareAtPrice: 2450,
    deliveryCharge: 100,
    stock: 24,
    variants: [
      { name: "Blue", stock: 8 },
      { name: "Rose", stock: 7 },
      { name: "Olive", stock: 9 }
    ],
    keywords: ["three piece", "cotton", "থ্রি", "delivery"],
    imageUrl:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80",
    active: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "prod_modest_abaya",
    shopId: demoShop.id,
    slug: "modest-abaya",
    name: "Modest Abaya",
    nameBn: "মডেস্ট আবায়া",
    description:
      "Everyday abaya with clean fall, hidden side pocket, and modest relaxed fit.",
    price: 2850,
    deliveryCharge: 120,
    stock: 18,
    variants: [
      { name: "Black", stock: 11 },
      { name: "Mocha", stock: 7 }
    ],
    keywords: ["abaya", "black", "আবায়া", "available"],
    imageUrl:
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=900&q=80",
    active: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "prod_embroidered_scarf",
    shopId: demoShop.id,
    slug: "embroidered-scarf",
    name: "Embroidered Scarf",
    nameBn: "এমব্রয়ডারি স্কার্ফ",
    description:
      "Soft scarf with subtle embroidery, easy to pair with kurti or abaya looks.",
    price: 650,
    deliveryCharge: 60,
    stock: 42,
    variants: [
      { name: "Cream", stock: 14 },
      { name: "Sage", stock: 12 },
      { name: "Navy", stock: 16 }
    ],
    keywords: ["scarf", "hijab", "স্কার্ফ", "cod"],
    imageUrl:
      "https://images.unsplash.com/photo-1603217040830-34473db521a3?auto=format&fit=crop&w=900&q=80",
    active: true,
    createdAt: now,
    updatedAt: now
  }
];

export const demoOrders: Order[] = [
  {
    id: "ord_1001",
    shopId: demoShop.id,
    productId: "prod_linen_kurti",
    customer: {
      name: "Tasmia Rahman",
      phone: "01712345678",
      district: "Dhaka",
      area: "Mirpur 10",
      address: "House 22, Road 4, Mirpur 10, Dhaka"
    },
    quantity: 1,
    variant: "M",
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    status: "new",
    courierProvider: "steadfast",
    subtotal: 1450,
    deliveryCharge: 80,
    total: 1530,
    slaDeadline: futureDate(5),
    customerNotes: "Please call before delivery.",
    createdAt: daysAgoAtNoon(0),
    updatedAt: daysAgoAtNoon(0)
  },
  {
    id: "ord_1002",
    shopId: demoShop.id,
    productId: "prod_cotton_three_piece",
    customer: {
      name: "Sadia Akter",
      phone: "01833445566",
      district: "Gazipur",
      area: "Tongi",
      address: "College Gate, Tongi, Gazipur"
    },
    quantity: 2,
    variant: "Rose",
    paymentMethod: "manual_bkash",
    paymentStatus: "awaiting_verification",
    paymentReference: "BK-884120",
    status: "confirmed",
    courierProvider: "pathao",
    subtotal: 4200,
    deliveryCharge: 100,
    total: 4300,
    slaDeadline: futureDate(7),
    merchantNotes: "Verify bKash before packing.",
    createdAt: daysAgoAtNoon(1),
    updatedAt: daysAgoAtNoon(1)
  },
  {
    id: "ord_1003",
    shopId: demoShop.id,
    productId: "prod_embroidered_scarf",
    customer: {
      name: "Nabila Islam",
      phone: "+8801912345678",
      district: "Chattogram",
      area: "Agrabad",
      address: "Block B, Agrabad, Chattogram"
    },
    quantity: 3,
    variant: "Sage",
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    status: "courier_ready",
    courierProvider: "redx",
    subtotal: 1950,
    deliveryCharge: 60,
    total: 2010,
    slaDeadline: futureDate(10),
    createdAt: daysAgoAtNoon(2),
    updatedAt: daysAgoAtNoon(2)
  }
];

export const demoTemplates: ReplyTemplate[] = [
  {
    id: "tpl_price_bn",
    shopId: demoShop.id,
    language: "bn",
    title: "Price reply",
    trigger: "price/dam",
    body:
      "আপু, দাম {price} টাকা। COD available আছে। Order করতে এই link ব্যবহার করুন: {order_link}",
    active: true
  },
  {
    id: "tpl_stock_bn",
    shopId: demoShop.id,
    language: "bn",
    title: "Availability reply",
    trigger: "available/stock",
    body:
      "জি আপু, এখন stock আছে। Size/color select করে order করতে পারেন: {order_link}",
    active: true
  },
  {
    id: "tpl_delivery_bn",
    shopId: demoShop.id,
    language: "bn",
    title: "Delivery charge",
    trigger: "delivery",
    body:
      "Dhaka delivery charge {delivery_charge} টাকা। Outside Dhaka courier অনুযায়ী confirm করা হবে।",
    active: true
  },
  {
    id: "tpl_order_en",
    shopId: demoShop.id,
    language: "en",
    title: "Order link reply",
    trigger: "order",
    body:
      "You can confirm the order here: {order_link}. Please add your phone, address, quantity, and COD preference.",
    active: true
  }
];

export const demoWebhookEvents: WebhookEvent[] = [
  {
    id: "evt_demo_1",
    provider: "meta",
    eventType: "test",
    sourceId: "local-demo",
    matchedProductId: "prod_linen_kurti",
    message: "linen kurti price koto?",
    reply:
      "Demo matched Linen Kurti. Manual order link is ready for the merchant to send.",
    status: "simulated",
    createdAt: now
  }
];

export const demoBillingRecords: BillingRecord[] = [
  {
    id: "bill_pilot_1",
    shopId: demoShop.id,
    plan: "pilot",
    amount: 0,
    period: "7-day pilot",
    status: "trial",
    notes: "Convert to Starter after live order-link usage.",
    createdAt: now
  }
];
