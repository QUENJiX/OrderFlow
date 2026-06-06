"use client";

import Link from "next/link";
import { useState } from "react";
import type { PlatformMerchantRow } from "@/lib/domain/analytics";
import type { Shop, ShopPlan, ShopStatus } from "@/lib/domain/types";
import { formatBdt } from "@/lib/domain/money";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const plans: ShopPlan[] = ["pilot", "starter", "assisted"];
const statuses: ShopStatus[] = ["pilot", "active", "paused"];

export function ControlShopTable({ rows }: { rows: PlatformMerchantRow[] }) {
  const [merchantRows, setMerchantRows] = useState(rows);
  const [message, setMessage] = useState("");

  async function patchShop(shopId: string, patch: Partial<Shop>) {
    const response = await fetch(`/api/control/shops/${shopId}`, {
      body: JSON.stringify(patch),
      headers: { "Content-Type": "application/json" },
      method: "PATCH"
    });
    const result = (await response.json()) as ApiResult<Shop>;

    if (!result.ok) {
      setMessage(result.error);
      return;
    }

    setMerchantRows((current) =>
      current.map((row) =>
        row.shopId === shopId
          ? {
              ...row,
              plan: result.data.plan,
              status: result.data.status,
              supportNotes: result.data.supportNotes
            }
          : row
      )
    );
    setMessage("Merchant updated");
  }

  return (
    <section className="panel control-panel">
      <div className="panel-heading">
        <div>
          <h2>Merchant health</h2>
          <p>Plan, order volume, billing state, and support follow-up.</p>
        </div>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
      <div className="table-wrap">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Orders</th>
              <th>GMV</th>
              <th>Billing</th>
              <th>Support note</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {merchantRows.map((row) => (
              <tr key={row.shopId}>
                <td>
                  <strong>{row.shopName}</strong>
                  <small>{row.slug}</small>
                </td>
                <td>
                  <select
                    value={row.plan}
                    onChange={(event) =>
                      patchShop(row.shopId, { plan: event.target.value as ShopPlan })
                    }
                  >
                    {plans.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={row.status}
                    onChange={(event) =>
                      patchShop(row.shopId, {
                        status: event.target.value as ShopStatus
                      })
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{row.orders}</td>
                <td>{formatBdt(row.orderValue)}</td>
                <td><span className="badge badge-info">{row.billingStatus}</span></td>
                <td>
                  <input
                    defaultValue={row.supportNotes}
                    onBlur={(event) =>
                      patchShop(row.shopId, { supportNotes: event.target.value })
                    }
                    placeholder="Follow-up note"
                  />
                </td>
                <td>
                  <Link className="secondary-button" href={`/control/shops/${row.shopId}`}>
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
