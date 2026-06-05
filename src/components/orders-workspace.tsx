"use client";

import {
  Download,
  RefreshCw,
  Truck,
  WalletCards
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatBdt } from "@/lib/domain/money";
import {
  COURIER_LABELS,
  COURIERS,
  ORDER_STATUS_LABELS,
  ORDER_STATUSES,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUSES,
  type CourierProvider,
  type Order,
  type OrderPatch,
  type OrderStatus,
  type PaymentStatus,
  type Product
} from "@/lib/domain/types";
import { CopyButton } from "./copy-button";
import {
  CourierBadge,
  OrderStatusBadge,
  PaymentStatusBadge
} from "./status-badge";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function OrdersWorkspace({
  initialOrders,
  products
}: {
  initialOrders: Order[];
  products: Product[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [message, setMessage] = useState("");
  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  const visibleOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  async function patchOrder(orderId: string, patch: OrderPatch) {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    const result = (await response.json()) as ApiResult<Order>;
    if (result.ok) {
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? result.data : order))
      );
      setMessage("Order updated");
    } else {
      setMessage(result.error);
    }
  }

  function copyDetails(order: Order) {
    const product = productById.get(order.productId);
    return [
      `Order: ${order.id}`,
      `Customer: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Address: ${order.customer.address}, ${order.customer.area}, ${order.customer.district}`,
      `Product: ${product?.name ?? "Unknown product"}`,
      `Variant: ${order.variant ?? "-"}`,
      `Quantity: ${order.quantity}`,
      `COD amount: ${formatBdt(order.total)}`
    ].join("\n");
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Orders workspace</h2>
          <p>Confirm orders, prepare courier work, and keep payment state clear.</p>
        </div>
        <div className="header-actions">
          <Link
            className="secondary-button"
            href={`/api/orders/export${filter !== "all" ? `?status=${filter}` : ""}`}
            prefetch={false}
          >
            <Download size={16} />
            Export CSV
          </Link>
        </div>
      </div>

      <div className="filter-bar">
        <button
          className={filter === "all" ? "filter active" : "filter"}
          onClick={() => setFilter("all")}
          type="button"
        >
          All
        </button>
        {ORDER_STATUSES.map((status) => (
          <button
            className={filter === status ? "filter active" : "filter"}
            key={status}
            onClick={() => setFilter(status)}
            type="button"
          >
            {ORDER_STATUS_LABELS[status]}
          </button>
        ))}
      </div>
      {message ? <p className="form-message">{message}</p> : null}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Courier</th>
              <th>Tracking</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => {
              const product = productById.get(order.productId);
              return (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                    <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                  </td>
                  <td>
                    <strong>{order.customer.name}</strong>
                    <small>{order.customer.phone}</small>
                  </td>
                  <td>
                    <strong>{product?.name ?? "Unknown product"}</strong>
                    <small>
                      {order.variant ?? "No variant"} · Qty {order.quantity}
                    </small>
                  </td>
                  <td>{formatBdt(order.total)}</td>
                  <td>
                    <OrderStatusBadge status={order.status} />
                    <select
                      value={order.status}
                      onChange={(event) =>
                        patchOrder(order.id, {
                          status: event.target.value as OrderStatus
                        })
                      }
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {ORDER_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <PaymentStatusBadge status={order.paymentStatus} />
                    <select
                      value={order.paymentStatus}
                      onChange={(event) =>
                        patchOrder(order.id, {
                          paymentStatus: event.target.value as PaymentStatus
                        })
                      }
                    >
                      {PAYMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {PAYMENT_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <CourierBadge courier={order.courierProvider} />
                    <select
                      value={order.courierProvider}
                      onChange={(event) =>
                        patchOrder(order.id, {
                          courierProvider: event.target.value as CourierProvider
                        })
                      }
                    >
                      {COURIERS.map((courier) => (
                        <option key={courier} value={courier}>
                          {COURIER_LABELS[courier]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      defaultValue={order.trackingId ?? ""}
                      onBlur={(event) =>
                        patchOrder(order.id, {
                          trackingId: event.target.value
                        })
                      }
                      placeholder="Tracking ID"
                    />
                  </td>
                  <td>
                    <div className="row-actions">
                      <CopyButton
                        compact
                        label="Copy order details"
                        value={copyDetails(order)}
                      />
                      <button
                        className="icon-button"
                        onClick={() =>
                          patchOrder(order.id, { status: "courier_ready" })
                        }
                        title="Mark courier ready"
                        type="button"
                      >
                        <Truck size={16} />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() =>
                          patchOrder(order.id, { paymentStatus: "verified" })
                        }
                        title="Mark payment verified"
                        type="button"
                      >
                        <WalletCards size={16} />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() => patchOrder(order.id, {})}
                        title="Refresh order"
                        type="button"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
