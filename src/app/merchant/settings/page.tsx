import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MerchantSettingsForm } from "@/components/merchant-settings-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const defaults: { label: string; value: string }[] = [
    { label: "Shop", value: shop.name },
    { label: "Owner", value: shop.ownerName || "Not set" },
    { label: "Support phone", value: shop.supportPhone || "Not set" },
    { label: "Default courier", value: COURIER_LABELS[shop.defaultCourier] },
    { label: "Plan", value: shop.plan }
  ];

  return (
    <AppShell
      title="Settings"
      description="Shop details, order defaults, and account access."
      shop={shop}
      user={user}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <MerchantSettingsForm shop={shop} />
        <div className="grid gap-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Order defaults</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Defaults used when orders enter the desk.
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <dl className="divide-y divide-border">
                {defaults.map((row) => (
                  <div
                    className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                    key={row.label}
                  >
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium capitalize">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Account access</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your login controls this workspace.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 p-3">
                <ShieldCheck className="size-5 text-primary" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {user.email ?? "Merchant account"}
                  </div>
                  <div className="text-xs capitalize text-muted-foreground">
                    Owner access · {shop.status}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-3">
        <CardHeader>
          <div>
            <CardTitle>Integration readiness</CardTitle>
            <p className="text-sm text-muted-foreground">
              Core merchant workspace now uses real account ownership.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {integrations.map((integration) => (
            <div
              className="rounded-lg border border-border bg-muted/30 p-4"
              key={integration.name}
            >
              <CheckCircle2 className="size-4 text-primary" />
              <div className="mt-2 text-sm font-medium">{integration.name}</div>
              <Badge className="mt-1.5" tone="neutral">
                {integration.status}
              </Badge>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {integration.detail}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
