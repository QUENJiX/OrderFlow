"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

export function SignOutButton({
  isSupabaseConfigured,
  redirectPath,
  supabasePublishableKey,
  supabaseUrl,
  className
}: {
  isSupabaseConfigured: boolean;
  redirectPath: string;
  supabasePublishableKey?: string;
  supabaseUrl?: string;
  className?: string;
}) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    try {
      if (isSupabaseConfigured) {
        const supabase = createBrowserSupabaseClient({
          publishableKey: supabasePublishableKey,
          url: supabaseUrl
        });
        await supabase.auth.signOut();
      }
    } finally {
      window.location.href = redirectPath;
    }
  }

  return (
    <button
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-[var(--danger)] outline-none transition-colors hover:bg-[var(--danger-soft)] disabled:opacity-50",
        className
      )}
      disabled={isSigningOut}
      onClick={signOut}
      type="button"
    >
      <LogOut className="size-4" aria-hidden />
      {isSigningOut ? "Signing out…" : "Sign out"}
    </button>
  );
}
