import { CheckCircle2, CircleDashed } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { demoShop } from "@/lib/domain/seed";
import { COURIER_LABELS } from "@/lib/domain/types";
import { getRepository } from "@/lib/store";

export const dynamic = "force-dynamic";

const integrations = [
  {
    name: "Supabase Auth + Postgres",
    status: "Ready boundary",
    detail:
      "Repository interface is active. A Supabase implementation can replace the local store."
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
  const shop = await repo.getShopById(demoShop.id);

  return (
    <AppShell
      title="Settings"
      description="Shop profile and integration readiness for the practical MVP."
    >
      {shop ? (
        <div className="settings-grid">
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
      ) : null}
    </AppShell>
  );
}
