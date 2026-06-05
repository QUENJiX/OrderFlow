import { describe, expect, it } from "vitest";
import { getRuntimeConfig } from "../config/env";
import {
  mapOrderRow,
  mapProductRow,
  mapShopRow,
  selectRepositoryKind
} from "./supabase-store";

describe("Supabase row mapping", () => {
  it("maps shop rows to domain shops", () => {
    expect(
      mapShopRow({
        id: "shop-1",
        slug: "nur-fashion",
        name: "Nur Fashion",
        owner_name: "Nusrat",
        phone: "+8801711122233",
        email: "owner@example.com",
        logo_url: null,
        support_phone: "+8801711122233",
        default_district: "Dhaka",
        default_courier: "steadfast",
        plan: "pilot",
        status: "pilot",
        billing_notes: "Trial",
        support_notes: "Needs setup",
        created_at: "2026-06-05T00:00:00.000Z",
        updated_at: "2026-06-05T00:00:00.000Z"
      })
    ).toMatchObject({
      id: "shop-1",
      slug: "nur-fashion",
      ownerName: "Nusrat",
      defaultCourier: "steadfast",
      billingNotes: "Trial"
    });
  });

  it("maps product rows to domain products", () => {
    expect(
      mapProductRow({
        id: "prod-1",
        shop_id: "shop-1",
        slug: "linen-kurti",
        name: "Linen Kurti",
        name_bn: "লিনেন কুর্তি",
        description: "Daily wear",
        price: 1450,
        compare_at_price: 1750,
        delivery_charge: 80,
        stock: 36,
        variants: [{ name: "M", stock: 14 }],
        keywords: ["kurti", "dam"],
        image_url: "https://example.com/image.jpg",
        active: true,
        created_at: "2026-06-05T00:00:00.000Z",
        updated_at: "2026-06-05T00:00:00.000Z"
      })
    ).toMatchObject({
      shopId: "shop-1",
      nameBn: "লিনেন কুর্তি",
      compareAtPrice: 1750,
      deliveryCharge: 80,
      variants: [{ name: "M", stock: 14 }]
    });
  });

  it("maps order rows to domain orders", () => {
    expect(
      mapOrderRow({
        id: "ord-1",
        shop_id: "shop-1",
        product_id: "prod-1",
        customer: {
          name: "Farhana",
          phone: "01755667788",
          district: "Dhaka",
          area: "Dhanmondi",
          address: "Road 7"
        },
        quantity: 2,
        variant: "M",
        payment_method: "cod",
        payment_status: "unpaid",
        payment_reference: null,
        status: "new",
        courier_provider: "steadfast",
        tracking_id: null,
        merchant_notes: null,
        customer_notes: "Call first",
        subtotal: 2900,
        delivery_charge: 80,
        total: 2980,
        sla_deadline: "2026-06-10T00:00:00.000Z",
        created_at: "2026-06-05T00:00:00.000Z",
        updated_at: "2026-06-05T00:00:00.000Z"
      })
    ).toMatchObject({
      shopId: "shop-1",
      productId: "prod-1",
      paymentMethod: "cod",
      courierProvider: "steadfast",
      customerNotes: "Call first",
      total: 2980
    });
  });
});

describe("selectRepositoryKind", () => {
  it("uses local repository when Supabase is not configured", () => {
    expect(selectRepositoryKind(getRuntimeConfig({}))).toBe("local");
  });

  it("uses Supabase repository when Supabase is configured", () => {
    expect(
      selectRepositoryKind(
        getRuntimeConfig({
          NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test"
        })
      )
    ).toBe("supabase");
  });
});
