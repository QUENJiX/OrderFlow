"use client";

import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Field } from "./forms";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({
  allowSignUp,
  isSupabaseConfigured,
  redirectPath,
  supabasePublishableKey,
  supabaseUrl,
  title
}: {
  allowSignUp: boolean;
  isSupabaseConfigured: boolean;
  redirectPath: string;
  supabasePublishableKey?: string;
  supabaseUrl?: string;
  title: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<AuthMode>("sign-in");
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
      const supabase = createBrowserSupabaseClient({
        publishableKey: supabasePublishableKey,
        url: supabaseUrl
      });

      if (mode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        if (!data.session) {
          setMessage("Account created. Check your email if confirmation is enabled.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          setMessage(error.message);
          return;
        }
      }

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="panel form-panel login-panel" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          <p>
            {allowSignUp
              ? "Create a merchant account or sign in to your existing workspace."
              : "Developer access is restricted to approved platform admins."}
          </p>
        </div>
      </div>
      {allowSignUp ? (
        <div className="auth-toggle" role="tablist" aria-label="Auth mode">
          <button
            className={mode === "sign-in" ? "filter active" : "filter"}
            onClick={() => setMode("sign-in")}
            type="button"
          >
            Sign in
          </button>
          <button
            className={mode === "sign-up" ? "filter active" : "filter"}
            onClick={() => setMode("sign-up")}
            type="button"
          >
            Create account
          </button>
        </div>
      ) : null}
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
          autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
          minLength={6}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field>
      {!isSupabaseConfigured ? (
        <div className="mode-callout">
          Authentication is disabled until Supabase URL and publishable key are
          configured.
        </div>
      ) : null}
      {message ? <p className="form-message">{message}</p> : null}
      <button
        className="primary-button"
        disabled={isSubmitting || !isSupabaseConfigured}
        type="submit"
      >
        {mode === "sign-up" ? <UserPlus size={16} /> : <LogIn size={16} />}
        {isSubmitting
          ? "Working"
          : mode === "sign-up"
            ? "Create account"
            : "Sign in"}
      </button>
    </form>
  );
}
