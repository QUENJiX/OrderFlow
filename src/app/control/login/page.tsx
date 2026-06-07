import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { ThemeToggle } from "@/components/theme-toggle";
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
            Platform control room.
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Developer access is separate from merchant accounts and requires a
            row in <code className="font-mono text-xs">platform_admins</code>.
          </p>
        </div>
        {params.error === "not-admin" ? (
          <p className="mb-4 rounded-md border border-[var(--warning)]/40 bg-[var(--warning-soft)] px-3 py-2 text-sm text-[var(--warning)]">
            This Supabase user is signed in, but is not listed as a platform
            admin.
          </p>
        ) : null}
        <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
          <AuthForm
            allowSignUp={false}
            isSupabaseConfigured={config.supabase.isConfigured}
            redirectPath="/control"
            supabasePublishableKey={config.supabase.publishableKey}
            supabaseUrl={config.supabase.url}
            title="Control login"
          />
        </div>
      </div>
    </main>
  );
}
