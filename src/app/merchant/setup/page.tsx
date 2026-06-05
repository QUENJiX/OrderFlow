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
    <main className="auth-page">
      <section className="auth-copy">
        <Link className="brand auth-brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Shop setup</small>
          </span>
        </Link>
        <h1>Create the workspace your customers will order from.</h1>
        <p>
          Your shop name becomes the public order-link slug. You can add
          products after this step.
        </p>
      </section>
      <MerchantSetupForm />
    </main>
  );
}
