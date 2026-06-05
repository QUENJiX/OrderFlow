import { CheckCircle2, CircleDashed } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getRuntimeConfig } from "@/lib/config/env";
import { COURIER_LABELS } from "@/lib/domain/types";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const integrations = [
  {
    name: "Supabase Auth + Postgres",
    status: "Connected",
    detail:
      "Merchant access, shop membership, product catalog, and order storage are backed by Supabase."
  },
  {
    name: "Meta Page automation",
    status: "Manual first",
    detail:
      "Webhook verification and simulated comment events exist. OAuth and real replies are deferred."
  },
  {
    name: "Payments",
    status: "Manual mode",
    detail:
      "COD, manual bKash, and manual Nagad are tracked. Gateways plug into the payment adapter later."
  },
  {
    name: "Courier APIs",
    status: "CSV first",
    detail:
      "Generic CSV export is active. Steadfast, Pathao, RedX, and eCourier adapters can be added later."
  }
];

export default async function MerchantSettingsPage() {
  const config = getRuntimeConfig();
  const { shop } = await requireMerchantShop();

  return (
    <AppShell
      title="Settings"
      description="Shop profile and integration readiness."
    >
      <div className="settings-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Shop profile</h2>
              <p>Your active merchant workspace.</p>
            </div>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Shop</dt>
              <dd>{shop.name}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{shop.ownerName || "Not set"}</dd>
            </div>
            <div>
              <dt>Support phone</dt>
              <dd>{shop.supportPhone || "Not set"}</dd>
            </div>
            <div>
              <dt>Default courier</dt>
              <dd>{COURIER_LABELS[shop.defaultCourier]}</dd>
            </div>
            <div>
              <dt>Plan</dt>
              <dd>{shop.plan}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Runtime mode</h2>
              <p>Production mode uses Supabase Auth, RLS, and shop membership.</p>
            </div>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Current mode</dt>
              <dd>{config.mode}</dd>
            </div>
            <div>
              <dt>Supabase URL</dt>
              <dd>{config.supabase.url ? "Configured" : "Missing"}</dd>
            </div>
            <div>
              <dt>Public key</dt>
              <dd>{config.supabase.publishableKey ? "Configured" : "Missing"}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Integration readiness</h2>
              <p>Core merchant workspace now uses real account ownership.</p>
            </div>
          </div>
          <div className="integration-list">
            {integrations.map((integration, index) => (
              <article className="integration-row" key={integration.name}>
                {index === 0 ? <CheckCircle2 size={20} /> : <CircleDashed size={20} />}
                <div>
                  <strong>{integration.name}</strong>
                  <span>{integration.status}</span>
                  <p>{integration.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
