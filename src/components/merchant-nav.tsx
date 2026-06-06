"use client";

import {
  Boxes,
  ClipboardList,
  FileText,
  Home,
  Settings,
  UsersRound
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/merchant/dashboard", label: "Dashboard", icon: Home },
  { href: "/merchant/orders", label: "Orders", icon: ClipboardList },
  { href: "/merchant/products", label: "Products", icon: Boxes },
  { href: "/merchant/replies", label: "Replies", icon: FileText },
  { href: "/merchant/customers", label: "Customers", icon: UsersRound },
  { href: "/merchant/settings", label: "Settings", icon: Settings }
];

export function MerchantNav() {
  const pathname = usePathname();

  return (
    <nav className="side-nav" aria-label="Merchant navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={active ? "active" : undefined}
            href={item.href}
            key={item.href}
          >
            <Icon size={18} aria-hidden />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
