"use client";

import { Phone, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { calculateOrderTotals, formatBdt } from "@/lib/domain/money";
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  type PaymentMethod,
  type Order,
  type Product,
  type Shop
} from "@/lib/domain/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Textarea } from "./ui/textarea";

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
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
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
    setSubmitting(false);

    if (!result.ok) {
      setFieldErrors(result.fieldErrors ?? {});
      toast.error(result.error);
      return;
    }

    router.push(
      `/order/${shop.slug}/${product.slug}/success?orderId=${result.data.id}`
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 lg:grid-cols-2 lg:py-12">
        {/* Product */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="relative aspect-square bg-muted">
              <Image
                alt={product.name}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                src={product.imageUrl}
              />
            </div>
          </div>
          <div className="mt-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              {shop.name}
            </span>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-1 text-base font-medium text-[var(--accent-dark)]">
              {product.nameBn}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-semibold tabular-nums">
                {formatBdt(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-sm text-muted-foreground line-through">
                  {formatBdt(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip icon={<ShieldCheck className="size-3.5" />}>
                COD available
              </Chip>
              <Chip icon={<Truck className="size-3.5" />}>
                Delivery {formatBdt(product.deliveryCharge)}
              </Chip>
              <Chip icon={<Phone className="size-3.5" />}>
                {shop.supportPhone}
              </Chip>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
          onSubmit={submit}
        >
          <h2 className="text-lg font-semibold tracking-tight">Confirm order</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            অর্ডার কনফার্ম করতে নিচের তথ্য দিন।
          </p>

          <div className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <OrderField error={fieldErrors.name} label="Name">
                <Input
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  value={form.name}
                />
              </OrderField>
              <OrderField error={fieldErrors.phone} label="Phone">
                <Input
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  value={form.phone}
                />
              </OrderField>
              <OrderField error={fieldErrors.district} label="District">
                <Input
                  onChange={(event) =>
                    setForm({ ...form, district: event.target.value })
                  }
                  value={form.district}
                />
              </OrderField>
              <OrderField error={fieldErrors.area} label="Area">
                <Input
                  onChange={(event) => setForm({ ...form, area: event.target.value })}
                  value={form.area}
                />
              </OrderField>
            </div>
            <OrderField error={fieldErrors.address} label="Full address">
              <Textarea
                onChange={(event) =>
                  setForm({ ...form, address: event.target.value })
                }
                rows={2}
                value={form.address}
              />
            </OrderField>
            <div className="grid gap-4 sm:grid-cols-2">
              <OrderField error={fieldErrors.quantity} label="Quantity">
                <Input
                  min="1"
                  onChange={(event) =>
                    setForm({ ...form, quantity: event.target.value })
                  }
                  type="number"
                  value={form.quantity}
                />
              </OrderField>
              <OrderField error={fieldErrors.variant} label="Variant">
                <Select
                  onValueChange={(value) => setForm({ ...form, variant: value })}
                  value={form.variant}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.name} value={variant.name}>
                        {variant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </OrderField>
              <OrderField label="Payment method">
                <Select
                  onValueChange={(value) =>
                    setForm({ ...form, paymentMethod: value as PaymentMethod })
                  }
                  value={form.paymentMethod}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((method) => (
                      <SelectItem key={method} value={method}>
                        {PAYMENT_METHOD_LABELS[method]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </OrderField>
              <OrderField label="Payment reference">
                <Input
                  onChange={(event) =>
                    setForm({ ...form, paymentReference: event.target.value })
                  }
                  placeholder="Optional for bKash/Nagad"
                  value={form.paymentReference}
                />
              </OrderField>
            </div>
            <OrderField label="Note">
              <Textarea
                onChange={(event) =>
                  setForm({ ...form, customerNotes: event.target.value })
                }
                rows={2}
                value={form.customerNotes}
              />
            </OrderField>

            <div className="grid gap-1.5 rounded-lg border border-border bg-muted/40 p-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Product total</span>
                <span className="font-mono tabular-nums">
                  {formatBdt(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="font-mono tabular-nums">
                  {formatBdt(totals.deliveryCharge)}
                </span>
              </div>
              <div className="mt-1 flex justify-between border-t border-border pt-2 font-medium">
                <span>Total</span>
                <span className="font-mono tabular-nums">
                  {formatBdt(totals.total)}
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={submitting}
              size="lg"
              type="submit"
            >
              <ShoppingBag />
              {submitting ? "Placing order…" : "Confirm order"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Chip({
  icon,
  children
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent-dark)]">
      {icon}
      {children}
    </span>
  );
}

function OrderField({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? (
        <span className="text-xs text-[var(--danger)]">{error}</span>
      ) : null}
    </div>
  );
}
