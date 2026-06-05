import { describe, expect, it } from "vitest";
import { calculateOrderTotals, formatBdt } from "./money";

describe("calculateOrderTotals", () => {
  it("calculates subtotal and total from product price, quantity, and delivery charge", () => {
    expect(
      calculateOrderTotals({
        price: 1450,
        deliveryCharge: 80,
        quantity: 2
      })
    ).toEqual({
      subtotal: 2900,
      deliveryCharge: 80,
      total: 2980
    });
  });
});

describe("formatBdt", () => {
  it("formats BDT amounts with thousands separators", () => {
    expect(formatBdt(2980)).toBe("BDT 2,980");
  });
});
