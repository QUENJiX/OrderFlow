import {
  COURIER_LABELS,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  type CourierProvider,
  type OrderStatus,
  type PaymentStatus
} from "@/lib/domain/types";
import { Badge } from "./ui/badge";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const orderTone: Record<OrderStatus, BadgeTone> = {
  new: "info",
  confirmed: "info",
  packed: "warning",
  courier_ready: "warning",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
  returned: "danger"
};

const paymentTone: Record<PaymentStatus, BadgeTone> = {
  unpaid: "neutral",
  awaiting_verification: "warning",
  verified: "success",
  failed: "danger",
  refunded: "danger"
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge dot tone={orderTone[status]}>
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge dot tone={paymentTone[status]}>
      {PAYMENT_STATUS_LABELS[status]}
    </Badge>
  );
}

export function CourierBadge({ courier }: { courier: CourierProvider }) {
  return <Badge tone="neutral">{COURIER_LABELS[courier]}</Badge>;
}
