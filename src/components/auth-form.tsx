"use client";

import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      toast.error("Supabase is not configured yet. Add env vars and restart.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createBrowserSupabaseClient({
        publishableKey: supabasePublishableKey,
        url: supabaseUrl
      });

      if (mode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          toast.error(error.message);
          return;
        }
        if (!data.session) {
          toast.success(
            "Account created. Check your email if confirmation is enabled."
          );
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          toast.error(error.message);
          return;
        }
      }

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {allowSignUp
            ? "Create a merchant account or sign in to your workspace."
            : "Developer access is restricted to approved platform admins."}
        </p>
      </div>

      {allowSignUp ? (
        <Tabs
          className="mb-4"
          onValueChange={(value) => setMode(value as AuthMode)}
          value={mode}
        >
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="sign-in">
              Sign in
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="sign-up">
              Create account
            </TabsTrigger>
          </TabsList>
        </Tabs>
      ) : null}

      <form className="grid gap-3" onSubmit={submit}>
        <div className="grid gap-1.5">
          <Label htmlFor="auth-email">Email</Label>
          <Input
            autoComplete="email"
            id="auth-email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="auth-password">Password</Label>
          <Input
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            id="auth-password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </div>
        {!isSupabaseConfigured ? (
          <p className="rounded-md border border-[var(--warning)]/40 bg-[var(--warning-soft)] px-3 py-2 text-xs text-[var(--warning)]">
            Authentication is disabled until Supabase URL and publishable key are
            configured.
          </p>
        ) : null}
        <Button
          className="mt-1 w-full"
          disabled={isSubmitting || !isSupabaseConfigured}
          type="submit"
        >
          {mode === "sign-up" ? <UserPlus /> : <LogIn />}
          {isSubmitting
            ? "Working…"
            : mode === "sign-up"
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
