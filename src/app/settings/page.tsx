import { CheckCircle2, CircleDashed } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { getRuntimeConfig } from "@/lib/config/env";
import { COURIER_LABELS } from "@/lib/domain/types";
import { findActiveShop } from "@/lib/store/active-shop";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

const integrations = [
  {
    name: "Supabase Auth + Postgres",
    status: "Schema ready",
    detail:
      "Repository interface, clients, schema, seed, and mode selection are in place."
  },
  {
    name: "Meta Page automation",
    status: "Local demo only",
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

export default async function SettingsPage() {
  const repo = getRepository();
  const config = getRuntimeConfig();
  const shop = await findActiveShop(repo);

  return (
    <AppShell
      title="Settings"
      description="Shop profile and integration readiness for the practical MVP."
    >
      <div className="settings-grid">
        {shop ? (
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Shop profile</h2>
                <p>Seeded pilot workspace for local validation.</p>
              </div>
            </div>
            <dl className="detail-list">
              <div>
                <dt>Shop</dt>
                <dd>{shop.name}</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{shop.ownerName}</dd>
              </div>
              <div>
                <dt>Support phone</dt>
                <dd>{shop.supportPhone}</dd>
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
        ) : (
          <SupabaseSetupNotice />
        )}

        <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Runtime mode</h2>
                <p>
                  The app chooses Supabase only when public Supabase env vars are
                  complete. Run `supabase/schema.sql` then `supabase/seed.sql`.
                </p>
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
              <div>
                <dt>Missing vars</dt>
                <dd>
                  {config.supabase.missing.length > 0
                    ? config.supabase.missing.join(", ")
                    : "None"}
                </dd>
              </div>
            </dl>
          </section>

        <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Integration readiness</h2>
                <p>Honest local mode today, clear seams for the full app later.</p>
              </div>
            </div>
            <div className="integration-list">
              {integrations.map((integration, index) => (
                <article className="integration-row" key={integration.name}>
                  {index === 0 ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <CircleDashed size={20} />
                  )}
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
