import Link from "next/link";

export function SupabaseSetupNotice() {
  return (
    <section className="panel setup-panel">
      <div className="panel-heading">
        <div>
          <h2>Supabase setup needed</h2>
          <p>
            The app is connected to Supabase, but the demo shop is not visible
            to the current request yet.
          </p>
        </div>
      </div>
      <ol className="setup-list">
        <li>Run `supabase/schema.sql` in the Supabase SQL editor.</li>
        <li>Run `supabase/seed.sql` after the schema succeeds.</li>
        <li>
          Create or sign in to a merchant user, then add that user to
          `shop_members`.
        </li>
      </ol>
      <div className="setup-actions">
        <Link className="primary-button" href="/login">
          Go to login
        </Link>
        <Link className="secondary-button" href="/settings">
          Check settings
        </Link>
      </div>
    </section>
  );
}
