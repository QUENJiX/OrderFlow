import type { PaymentMethod } from "../domain/types";

export type PaymentProvider = {
  mode: "local-demo" | "sslcommerz" | "bkash" | "nagad";
  supports(method: PaymentMethod): boolean;
};

export const localPaymentProvider: PaymentProvider = {
  mode: "local-demo",
  supports(method) {
    return ["cod", "manual_bkash", "manual_nagad"].includes(method);
  }
};
