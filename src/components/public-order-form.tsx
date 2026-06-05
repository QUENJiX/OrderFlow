"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { calculateOrderTotals, formatBdt } from "@/lib/domain/money";
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  type PaymentMethod,
  type Order,
  type Product,
  type Shop
} from "@/lib/domain/types";
import { Field } from "./forms";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function PublicOrderForm({
  product,
  shop
}: {
  product: Product;
  shop: Shop;
}) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    alternatePhone: "",
    district: shop.defaultDistrict,
    area: "",
    address: "",
    quantity: "1",
    variant: product.variants[0]?.name ?? "",
    paymentMethod: "cod" as PaymentMethod,
    paymentReference: "",
    customerNotes: ""
  });

  const totals = useMemo(
    () =>
      calculateOrderTotals({
        price: product.price,
        deliveryCharge: product.deliveryCharge,
        quantity: Number(form.quantity)
      }),
    [form.quantity, product.deliveryCharge, product.price]
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopSlug: shop.slug,
        productSlug: product.slug,
        customer: {
          name: form.name,
          phone: form.phone,
          alternatePhone: form.alternatePhone,
          district: form.district,
          area: form.area,
          address: form.address
        },
        quantity: Number(form.quantity),
        variant: form.variant,
        paymentMethod: form.paymentMethod,
        paymentReference: form.paymentReference,
        customerNotes: form.customerNotes
      })
    });
    const result = (await response.json()) as ApiResult<Order>;

    if (!result.ok) {
      setFieldErrors(result.fieldErrors ?? {});
      setMessage(result.error);
      return;
    }

    router.push(
      `/order/${shop.slug}/${product.slug}/success?orderId=${result.data.id}`
    );
  }

  return (
    <div className="public-order">
      <section className="public-product">
        <Image
          alt={product.name}
          className="public-product-image"
          height={640}
          priority
          src={product.imageUrl}
          width={720}
        />
        <div>
          <p className="section-label">{shop.name}</p>
          <h1>{product.name}</h1>
          <p className="bangla-name">{product.nameBn}</p>
          <p>{product.description}</p>
          <div className="price-line">
            <strong>{formatBdt(product.price)}</strong>
            {product.compareAtPrice ? (
              <span>{formatBdt(product.compareAtPrice)}</span>
            ) : null}
          </div>
          <div className="trust-list">
            <span>COD available</span>
            <span>Delivery {formatBdt(product.deliveryCharge)}</span>
            <span>Support {shop.supportPhone}</span>
          </div>
        </div>
      </section>

      <form className="public-form" onSubmit={submit}>
        <div className="panel-heading">
          <div>
            <h2>Confirm order</h2>
            <p>অর্ডার কনফার্ম করতে নিচের তথ্য দিন।</p>
          </div>
        </div>

        <div className="form-grid">
          <Field label="Name" error={fieldErrors.name}>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </Field>
          <Field label="Phone" error={fieldErrors.phone}>
            <input
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
            />
          </Field>
          <Field label="District" error={fieldErrors.district}>
            <input
              value={form.district}
              onChange={(event) =>
                setForm({ ...form, district: event.target.value })
              }
            />
          </Field>
          <Field label="Area" error={fieldErrors.area}>
            <input
              value={form.area}
              onChange={(event) => setForm({ ...form, area: event.target.value })}
            />
          </Field>
        </div>
        <Field label="Full address" error={fieldErrors.address}>
          <textarea
            rows={3}
            value={form.address}
            onChange={(event) =>
              setForm({ ...form, address: event.target.value })
            }
          />
        </Field>
        <div className="form-grid">
          <Field label="Quantity" error={fieldErrors.quantity}>
            <input
              min="1"
              type="number"
              value={form.quantity}
              onChange={(event) =>
                setForm({ ...form, quantity: event.target.value })
              }
            />
          </Field>
          <Field label="Variant" error={fieldErrors.variant}>
            <select
              value={form.variant}
              onChange={(event) =>
                setForm({ ...form, variant: event.target.value })
              }
            >
              {product.variants.map((variant) => (
                <option key={variant.name} value={variant.name}>
                  {variant.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Payment method">
            <select
              value={form.paymentMethod}
              onChange={(event) =>
                setForm({
                  ...form,
                  paymentMethod: event.target.value as PaymentMethod
                })
              }
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {PAYMENT_METHOD_LABELS[method]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Payment reference">
            <input
              placeholder="Optional for bKash/Nagad"
              value={form.paymentReference}
              onChange={(event) =>
                setForm({ ...form, paymentReference: event.target.value })
              }
            />
          </Field>
        </div>
        <Field label="Note">
          <textarea
            rows={2}
            value={form.customerNotes}
            onChange={(event) =>
              setForm({ ...form, customerNotes: event.target.value })
            }
          />
        </Field>
        <div className="order-summary">
          <span>Product total {formatBdt(totals.subtotal)}</span>
          <span>Delivery {formatBdt(totals.deliveryCharge)}</span>
          <strong>Total {formatBdt(totals.total)}</strong>
        </div>
        {message ? <p className="field-error">{message}</p> : null}
        <button className="primary-button wide" type="submit">
          <ShoppingBag size={18} />
          Confirm order
        </button>
      </form>
    </div>
  );
}
