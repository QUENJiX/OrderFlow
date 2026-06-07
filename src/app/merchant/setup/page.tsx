import { redirect } from "next/navigation";
import Link from "next/link";
import { MerchantSetupForm } from "@/components/merchant-setup-form";
import { getCurrentUser, getMerchantShopForUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantSetupPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/merchant/login");
  }

  const shop = await getMerchantShopForUser(user.id);
  if (shop) {
    redirect("/merchant/dashboard");
  }

  return (
    <main className="relative grid min-h-screen place-items-center bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-sm font-bold text-primary-foreground shadow-sm">
              OF
            </span>
            <span className="text-base font-semibold">OrderFlow BD</span>
          </Link>
          <h1 className="text-xl font-semibold tracking-tight">
            Create the workspace your customers will order from.
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your shop name becomes the public order-link slug. You can add
            products after this step.
          </p>
        </div>
        <MerchantSetupForm />
      </div>
    </main>
  );
}
