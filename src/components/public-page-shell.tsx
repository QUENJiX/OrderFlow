import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function PublicPageShell({
  children,
  description,
  title
}: {
  children: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-background">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-5">
        <Link className="flex items-center gap-2.5" href="/">
          <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-sm font-bold text-primary-foreground shadow-sm">
            OF
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">OrderFlow BD</div>
            <div className="text-xs text-muted-foreground">
              Merchant order desk
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="secondary">
            <Link href="/merchant/login">Merchant login</Link>
          </Button>
        </div>
      </nav>
      <header className="mx-auto max-w-4xl px-6 pb-6 pt-8">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="mx-auto max-w-4xl px-6 pb-16">{children}</div>
    </main>
  );
}
