import { AppShell } from "@/components/app-shell";
import { LoginForm } from "@/components/login-form";
import { getRuntimeConfig } from "@/lib/config/env";

export default function LoginPage() {
  const config = getRuntimeConfig();

  return (
    <AppShell
      title="Login"
      description="Supabase Auth entry point for production merchant access."
    >
      <div className="settings-grid">
        <LoginForm
          isSupabaseConfigured={config.supabase.isConfigured}
          supabasePublishableKey={config.supabase.publishableKey}
          supabaseUrl={config.supabase.url}
        />
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Auth setup status</h2>
              <p>Use Supabase Auth after the project URL and public key are set.</p>
            </div>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Runtime mode</dt>
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
              <dt>Redirect URL</dt>
              <dd>{config.appUrl}/auth/callback</dd>
            </div>
          </dl>
        </section>
      </div>
    </AppShell>
  );
}
