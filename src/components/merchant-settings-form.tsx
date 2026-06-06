"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import {
  COURIER_LABELS,
  COURIERS,
  type CourierProvider,
  type Shop
} from "@/lib/domain/types";
import { Field } from "./forms";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function MerchantSettingsForm({ shop }: { shop: Shop }) {
  const [form, setForm] = useState({
    defaultCourier: shop.defaultCourier,
    defaultDistrict: shop.defaultDistrict,
    email: shop.email,
    ownerName: shop.ownerName,
    phone: shop.phone,
    supportPhone: shop.supportPhone
  });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/merchant/shop", {
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
        method: "PATCH"
      });
      const result = (await response.json()) as ApiResult<Shop>;
      setMessage(result.ok ? "Shop settings saved" : result.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Settings update failed");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <h2>Shop profile</h2>
          <p>These details appear in merchant operations and order handling.</p>
        </div>
      </div>
      <div className="form-grid">
        <Field label="Owner name">
          <input
            value={form.ownerName}
            onChange={(event) =>
              setForm({ ...form, ownerName: event.target.value })
            }
          />
        </Field>
        <Field label="Support phone">
          <input
            value={form.supportPhone}
            onChange={(event) =>
              setForm({ ...form, supportPhone: event.target.value })
            }
          />
        </Field>
        <Field label="Business phone">
          <input
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </Field>
        <Field label="Business email">
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </Field>
        <Field label="Default district">
          <input
            value={form.defaultDistrict}
            onChange={(event) =>
              setForm({ ...form, defaultDistrict: event.target.value })
            }
          />
        </Field>
        <Field label="Default courier">
          <select
            value={form.defaultCourier}
            onChange={(event) =>
              setForm({
                ...form,
                defaultCourier: event.target.value as CourierProvider
              })
            }
          >
            {COURIERS.map((courier) => (
              <option key={courier} value={courier}>
                {COURIER_LABELS[courier]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
      <button className="primary-button" disabled={isSaving} type="submit">
        <Save size={16} aria-hidden />
        {isSaving ? "Saving" : "Save settings"}
      </button>
    </form>
  );
}
