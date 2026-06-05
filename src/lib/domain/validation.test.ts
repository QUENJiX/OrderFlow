import { describe, expect, it } from "vitest";
import { demoProducts } from "./seed";
import type { OrderInput, ProductInput } from "./types";
import {
  isBangladeshPhone,
  validateOrderInput,
  validateProductInput
} from "./validation";

const activeProduct = demoProducts[0];

function validOrderInput(overrides: Partial<OrderInput> = {}): OrderInput {
  return {
    shopSlug: "nur-fashion",
    productSlug: activeProduct.slug,
    customer: {
      name: "Tasmia Rahman",
      phone: "01712345678",
      district: "Dhaka",
      area: "Mirpur",
      address: "House 22, Road 4, Mirpur"
    },
    quantity: 1,
    variant: "M",
    paymentMethod: "cod",
    ...overrides
  };
}

describe("isBangladeshPhone", () => {
  it("accepts common local and international Bangladesh phone formats", () => {
    expect(isBangladeshPhone("01712345678")).toBe(true);
    expect(isBangladeshPhone("+8801712345678")).toBe(true);
    expect(isBangladeshPhone("8801712345678")).toBe(true);
  });

  it("rejects invalid phone formats", () => {
    expect(isBangladeshPhone("12345")).toBe(false);
    expect(isBangladeshPhone("021712345678")).toBe(false);
    expect(isBangladeshPhone("01712-abc-678")).toBe(false);
  });
});

describe("validateOrderInput", () => {
  it("returns no field errors for a valid order", () => {
    expect(validateOrderInput(validOrderInput(), activeProduct)).toEqual({});
  });

  it("rejects missing address and invalid quantity", () => {
    const errors = validateOrderInput(
      validOrderInput({
        customer: {
          ...validOrderInput().customer,
          address: ""
        },
        quantity: 0
      }),
      activeProduct
    );

    expect(errors).toMatchObject({
      address: "Full address is required",
      quantity: "Quantity must be at least 1"
    });
  });

  it("rejects inactive products and stock lower than requested quantity", () => {
    const errors = validateOrderInput(
      validOrderInput({ quantity: 99 }),
      {
        ...activeProduct,
        active: false,
        stock: 2
      }
    );

    expect(errors).toMatchObject({
      product: "This product is not available for ordering",
      quantity: "Only 2 item(s) are in stock"
    });
  });
});

describe("validateProductInput", () => {
  it("rejects missing product name and invalid prices", () => {
    const input: ProductInput = {
      name: "",
      nameBn: "",
      description: "A product",
      price: 0,
      deliveryCharge: -1,
      stock: -2,
      variants: [],
      keywords: [],
      imageUrl: "",
      active: true
    };

    expect(validateProductInput(input)).toMatchObject({
      name: "Product name is required",
      price: "Price must be greater than 0",
      deliveryCharge: "Delivery charge cannot be negative",
      stock: "Stock cannot be negative"
    });
  });
});
