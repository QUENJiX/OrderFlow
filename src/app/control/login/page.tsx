import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { getRuntimeConfig } from "@/lib/config/env";
import {
  getControlDestination,
  getCurrentUser,
  isPlatformAdmin
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ControlLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const config = getRuntimeConfig();
  const user = await getCurrentUser();
  const params = await searchParams;

  if (user) {
    const allowed = await isPlatformAdmin(user.id);
    if (allowed) {
      redirect(
        getControlDestination({
          isAuthenticated: true,
          isPlatformAdmin: true
        })
      );
    }
  }

  return (
    <main className="auth-page control-auth-page">
      <section className="auth-copy">
        <Link className="brand auth-brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Control</small>
          </span>
        </Link>
        <h1>Platform control room.</h1>
        <p>
          Developer access is separate from merchant accounts and requires a
          row in `platform_admins`.
        </p>
        {params.error === "not-admin" ? (
          <p className="mode-callout">
            This Supabase user is signed in, but is not listed as a platform
            admin.
          </p>
        ) : null}
      </section>
      <AuthForm
        allowSignUp={false}
        isSupabaseConfigured={config.supabase.isConfigured}
        redirectPath="/control"
        supabasePublishableKey={config.supabase.publishableKey}
        supabaseUrl={config.supabase.url}
        title="Control login"
      />
    </main>
  );
}
