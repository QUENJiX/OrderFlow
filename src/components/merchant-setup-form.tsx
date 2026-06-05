"use client";

import { Store } from "lucide-react";
import { useState } from "react";
import { Field } from "./forms";

export function MerchantSetupForm() {
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [defaultDistrict, setDefaultDistrict] = useState("Dhaka");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/merchant/setup", {
        body: JSON.stringify({
          defaultDistrict,
          ownerName,
          shopName,
          supportPhone
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
      const payload = (await response.json()) as {
        error?: string;
        ok: boolean;
      };

      if (!response.ok || !payload.ok) {
        setMessage(payload.error ?? "Shop setup failed");
        return;
      }

      window.location.href = "/merchant/dashboard";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Shop setup failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="panel form-panel login-panel" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <h2>Create your shop</h2>
          <p>This workspace becomes your merchant dashboard.</p>
        </div>
      </div>
      <Field label="Shop name">
        <input
          minLength={2}
          required
          value={shopName}
          onChange={(event) => setShopName(event.target.value)}
        />
      </Field>
      <Field label="Owner name">
        <input
          value={ownerName}
          onChange={(event) => setOwnerName(event.target.value)}
        />
      </Field>
      <Field label="Support phone">
        <input
          value={supportPhone}
          onChange={(event) => setSupportPhone(event.target.value)}
        />
      </Field>
      <Field label="Default district">
        <input
          value={defaultDistrict}
          onChange={(event) => setDefaultDistrict(event.target.value)}
        />
      </Field>
      {message ? <p className="form-message">{message}</p> : null}
      <button className="primary-button" disabled={isSubmitting} type="submit">
        <Store size={16} />
        {isSubmitting ? "Creating shop" : "Create shop"}
      </button>
    </form>
  );
}
