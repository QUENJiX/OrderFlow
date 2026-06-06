"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function SignOutButton({
  isSupabaseConfigured,
  redirectPath,
  supabasePublishableKey,
  supabaseUrl
}: {
  isSupabaseConfigured: boolean;
  redirectPath: string;
  supabasePublishableKey?: string;
  supabaseUrl?: string;
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
    <button className="ghost-button" disabled={isSigningOut} onClick={signOut} type="button">
      <LogOut size={16} aria-hidden />
      {isSigningOut ? "Signing out" : "Sign out"}
    </button>
  );
}
