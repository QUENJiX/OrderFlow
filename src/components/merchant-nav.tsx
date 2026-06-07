"use client";

import {
  Boxes,
  ClipboardList,
  FileText,
  Home,
  Settings,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  shortcut: string;
};

export const merchantNavItems: NavItem[] = [
  { href: "/merchant/dashboard", label: "Dashboard", icon: Home, shortcut: "D" },
  { href: "/merchant/orders", label: "Orders", icon: ClipboardList, shortcut: "O" },
  { href: "/merchant/products", label: "Products", icon: Boxes, shortcut: "P" },
  { href: "/merchant/replies", label: "Replies", icon: FileText, shortcut: "R" },
  { href: "/merchant/customers", label: "Customers", icon: UsersRound, shortcut: "C" },
  { href: "/merchant/settings", label: "Settings", icon: Settings, shortcut: "," }
];

export function MerchantNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-0.5" aria-label="Merchant navigation">
      {merchantNavItems.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            )}
            href={item.href}
            key={item.href}
          >
            {active ? (
              <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary" />
            ) : null}
            <Icon className="size-4 shrink-0" aria-hidden />
            <span className="flex-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
