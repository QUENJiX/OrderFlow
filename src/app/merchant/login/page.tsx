import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <main className="relative grid min-h-screen place-items-center bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="fixed right-5 top-5 z-50">
        <ThemeToggle />
      </div>
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-sm font-bold text-primary-foreground shadow-sm">
              OF
            </span>
            <span className="text-base font-semibold">OrderFlow BD</span>
          </Link>
          <h1 className="text-xl font-semibold tracking-tight">
            Run your Facebook orders from one workspace.
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Create your merchant account, set up your shop, and send customers
            clean order links.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
          <AuthForm
            allowSignUp
            isSupabaseConfigured={config.supabase.isConfigured}
            redirectPath="/merchant/setup"
            supabasePublishableKey={config.supabase.publishableKey}
            supabaseUrl={config.supabase.url}
            title="Merchant login"
          />
        </div>
      </div>
    </main>
  );
}
