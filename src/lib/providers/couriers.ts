import type { CourierProvider, Order } from "../domain/types";

export type ShipmentRequest = {
  order: Order;
  provider: CourierProvider;
};

export type ShipmentResult = {
  ok: boolean;
  mode: "local-demo" | "steadfast" | "pathao" | "redx" | "ecourier";
  trackingId?: string;
  error?: string;
};

export type CourierAdapter = {
  createShipment(request: ShipmentRequest): Promise<ShipmentResult>;
};

export const localCourierAdapter: CourierAdapter = {
  async createShipment({ order }) {
    return {
      ok: true,
      mode: "local-demo",
      trackingId: order.trackingId ?? `LOCAL-${order.id.toUpperCase()}`
    };
  }
};
