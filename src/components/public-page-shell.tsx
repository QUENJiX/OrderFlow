import Link from "next/link";
import type { ReactNode } from "react";

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
    <main className="public-page">
      <nav className="marketing-nav" aria-label="Public navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Merchant order desk</small>
          </span>
        </Link>
        <Link className="secondary-button" href="/merchant/login">
          Merchant login
        </Link>
      </nav>
      <header className="public-header">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children}
    </main>
  );
}
