"use client";

import { ChevronsUpDown, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { SignOutButton } from "./sign-out-button";

export function AccountMenu({
  email,
  isSupabaseConfigured,
  redirectPath,
  settingsHref,
  supabasePublishableKey,
  supabaseUrl
}: {
  email: string;
  isSupabaseConfigured: boolean;
  redirectPath: string;
  settingsHref?: string;
  supabasePublishableKey?: string;
  supabaseUrl?: string;
}) {
  const initial = email?.slice(0, 1).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-md border border-border bg-card py-1 pl-1 pr-2 text-sm shadow-sm transition-colors hover:border-border-strong"
          type="button"
        >
          <Avatar className="size-7">
            <AvatarFallback className="text-[11px]">{initial}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[140px] truncate text-xs text-muted-foreground sm:inline">
            {email}
          </span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2 normal-case">
          <UserRound className="size-4" />
          <span className="truncate text-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {settingsHref ? (
          <DropdownMenuItem asChild>
            <Link href={settingsHref}>
              <Settings className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <div className="p-0.5">
          <SignOutButton
            isSupabaseConfigured={isSupabaseConfigured}
            redirectPath={redirectPath}
            supabasePublishableKey={supabasePublishableKey}
            supabaseUrl={supabaseUrl}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
