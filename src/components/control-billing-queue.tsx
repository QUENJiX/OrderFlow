"use client";

import { useState } from "react";
import { formatBdt } from "@/lib/domain/money";
import type { BillingRecord } from "@/lib/domain/types";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const statuses: BillingRecord["status"][] = ["trial", "due", "paid", "overdue"];

export function ControlBillingQueue({
  records
}: {
  records: BillingRecord[];
}) {
  const [billingRecords, setBillingRecords] = useState(records);
  const [message, setMessage] = useState("");

  async function patchBilling(
    billingId: string,
    patch: Partial<Pick<BillingRecord, "notes" | "status">>
  ) {
    const response = await fetch(`/api/control/billing/${billingId}`, {
      body: JSON.stringify(patch),
      headers: { "Content-Type": "application/json" },
      method: "PATCH"
    });
    const result = (await response.json()) as ApiResult<BillingRecord>;

    if (!result.ok) {
      setMessage(result.error);
      return;
    }

    setBillingRecords((current) =>
      current.map((record) => (record.id === billingId ? result.data : record))
    );
    setMessage("Billing updated");
  }

  return (
    <section className="panel control-panel">
      <div className="panel-heading">
        <div>
          <h2>Billing queue</h2>
          <p>Manual founder-led billing follow-up for pilot merchants.</p>
        </div>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
      <div className="stack-list">
        {billingRecords.length === 0 ? (
          <article className="compact-row">
            <div>
              <strong>No billing records yet</strong>
              <span>Billing records appear after merchants are added to plans.</span>
            </div>
          </article>
        ) : (
          billingRecords.map((record) => (
            <article className="billing-row" key={record.id}>
              <div>
                <strong>{record.period}</strong>
                <span>{record.plan} · {formatBdt(record.amount)}</span>
              </div>
              <select
                value={record.status}
                onChange={(event) =>
                  patchBilling(record.id, {
                    status: event.target.value as BillingRecord["status"]
                  })
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <input
                defaultValue={record.notes}
                onBlur={(event) =>
                  patchBilling(record.id, { notes: event.target.value })
                }
                placeholder="Billing note"
              />
            </article>
          ))
        )}
      </div>
    </section>
  );
}
