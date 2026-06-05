"use client";

import { LogIn } from "lucide-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Field } from "./forms";

export function LoginForm({
  isSupabaseConfigured
}: {
  isSupabaseConfigured: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isSupabaseConfigured) {
      setMessage("Supabase is not configured yet. Add env vars and restart.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Signed in. You can return to the dashboard.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="panel form-panel login-panel" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <h2>Merchant login</h2>
          <p>
            Invite-only Supabase Auth path. Local mode stays open for demo work.
          </p>
        </div>
      </div>
      <Field label="Email">
        <input
          autoComplete="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Field label="Password">
        <input
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field>
      {!isSupabaseConfigured ? (
        <div className="mode-callout">
          Login is disabled in local mode. Add Supabase URL and publishable key
          to enable this form.
        </div>
      ) : null}
      {message ? <p className="form-message">{message}</p> : null}
      <button
        className="primary-button"
        disabled={isSubmitting || !isSupabaseConfigured}
        type="submit"
      >
        <LogIn size={16} />
        {isSubmitting ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
