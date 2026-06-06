import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MerchantSettingsForm } from "@/components/merchant-settings-form";
import { COURIER_LABELS } from "@/lib/domain/types";
import { requireMerchantShop } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const integrations = [
  {
    name: "Meta Page replies",
    status: "Manual first",
    detail:
      "Use copy-ready replies now. Real page automation comes after manual pilots prove the workflow."
  },
  {
    name: "bKash/Nagad checks",
    status: "Manual mode",
    detail:
      "Track manual references and mark payments verified from the orders workspace."
  },
  {
    name: "Courier handoff",
    status: "CSV first",
    detail:
      "Export courier-ready orders for Steadfast, Pathao, RedX, eCourier, or manual delivery."
  }
];

export default async function MerchantSettingsPage() {
  const { shop, user } = await requireMerchantShop();

  return (
    <AppShell
      title="Settings"
      description="Shop details, order defaults, and account access."
      shop={shop}
      user={user}
    >
      <div className="settings-grid">
        <MerchantSettingsForm shop={shop} />

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Order defaults</h2>
              <p>Operational defaults used when orders enter the desk.</p>
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
              <h2>Account access</h2>
              <p>Your login controls this merchant workspace.</p>
            </div>
          </div>
          <div className="access-card">
            <ShieldCheck size={22} aria-hidden />
            <div>
              <strong>{user.email ?? "Merchant account"}</strong>
              <span>Owner access · {shop.status}</span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Integration readiness</h2>
              <p>Core merchant workspace now uses real account ownership.</p>
            </div>
          </div>
          <div className="integration-list">
            {integrations.map((integration) => (
              <article className="integration-row" key={integration.name}>
                <CheckCircle2 size={20} />
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
