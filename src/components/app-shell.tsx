import {
  Boxes,
  ClipboardList,
  FileText,
  Home,
  Settings,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/merchant/dashboard", label: "Dashboard", icon: Home },
  { href: "/merchant/products", label: "Products", icon: Boxes },
  { href: "/merchant/orders", label: "Orders", icon: ClipboardList },
  { href: "/merchant/templates", label: "Templates", icon: FileText },
  { href: "/merchant/settings", label: "Settings", icon: Settings }
];

export function AppShell({
  title,
  description,
  children,
  actions
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Merchant workspace</small>
          </span>
        </Link>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.href}>
                <Icon size={18} aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="local-mode">
          <Sparkles size={18} aria-hidden />
          <span>
            Merchant access is controlled by Supabase Auth and shop membership.
          </span>
        </div>
      </aside>
      <main className="main-panel">
        <header className="page-header">
          <div>
            <p className="section-label">OrderFlow BD</p>
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>
          {actions ? <div className="header-actions">{actions}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
}
