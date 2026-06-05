import clsx from "clsx";
import {
  COURIER_LABELS,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  type CourierProvider,
  type OrderStatus,
  type PaymentStatus
} from "@/lib/domain/types";

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
    <span className={clsx("badge", `badge-${orderTone[status]}`)}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={clsx("badge", `badge-${paymentTone[status]}`)}>
      {PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}

export function CourierBadge({ courier }: { courier: CourierProvider }) {
  return <span className="badge badge-neutral">{COURIER_LABELS[courier]}</span>;
}
