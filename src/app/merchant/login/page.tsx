import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { getRuntimeConfig } from "@/lib/config/env";
import {
  getCurrentUser,
  getMerchantDestination,
  getMerchantShopForUser
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function MerchantLoginPage() {
  const config = getRuntimeConfig();
  const user = await getCurrentUser();

  if (user) {
    const shop = await getMerchantShopForUser(user.id);
    redirect(
      getMerchantDestination({
        hasShop: Boolean(shop),
        isAuthenticated: true
      })
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-copy">
        <Link className="brand auth-brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Merchant access</small>
          </span>
        </Link>
        <h1>Run your Facebook orders from one workspace.</h1>
        <p>
          Create your merchant account, set up your shop, add products, and send
          customers clean order links.
        </p>
      </section>
      <AuthForm
        allowSignUp
        isSupabaseConfigured={config.supabase.isConfigured}
        redirectPath="/merchant/setup"
        supabasePublishableKey={config.supabase.publishableKey}
        supabaseUrl={config.supabase.url}
        title="Merchant login"
      />
    </main>
  );
}
