import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  PackageCheck,
  Sparkles,
  WalletCards
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const workflow = [
  {
    icon: MessageCircle,
    title: "Reply from Facebook fast",
    text: "Copy a product-aware Bangla or English reply with the order link already filled."
  },
  {
    icon: WalletCards,
    title: "Verify COD and MFS",
    text: "Track COD, bKash, and Nagad state before the package moves."
  },
  {
    icon: PackageCheck,
    title: "Send courier-ready rows",
    text: "Export confirmed orders for Steadfast, Pathao, RedX, or manual delivery."
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link className="flex items-center gap-2.5" href="/">
          <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-sm font-bold text-primary-foreground shadow-sm">
            OF
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">OrderFlow BD</div>
            <div className="text-xs text-muted-foreground">
              Facebook orders, cleaned up
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex" variant="ghost">
            <Link href="/control/login">Control login</Link>
          </Button>
          <Button asChild>
            <Link href="/merchant/login">Merchant login</Link>
          </Button>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--ink)] px-6 py-14 text-[var(--ink-text)] shadow-xl sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/3 size-96 rounded-full bg-[var(--chart-3)]/10 blur-3xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--ink-muted)]">
                <Sparkles className="size-3.5 text-primary" />
                Premium F-commerce order desk
              </span>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                From Facebook comment to courier-ready order.
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-[var(--ink-muted)]">
                OrderFlow BD gives F-commerce sellers a fast operator desk for
                product links, COD/manual bKash checks, reply templates, and
                courier export — without spreadsheet chaos.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/merchant/login">
                    Start merchant workspace
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="border-white/15 bg-white/5 text-[var(--ink-text)] hover:bg-white/10"
                  size="lg"
                  variant="outline"
                >
                  <Link href="#workflow">See daily flow</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-[var(--ink-muted)]">
                {["COD first", "bKash/Nagad manual checks", "Courier CSV"].map(
                  (item) => (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
                      key={item}
                    >
                      <CheckCircle2 className="size-3.5 text-primary" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Console mock */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-xs text-[var(--ink-muted)]">
                    Today’s order desk
                  </div>
                  <div className="text-sm font-semibold">Dhaka drop · 18 orders</div>
                </div>
                <Badge dot tone="success">
                  Live
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 py-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-[var(--ink-muted)]">
                    Payment checks
                  </div>
                  <div className="mt-1 font-mono text-2xl font-semibold tabular-nums">
                    6
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-[var(--ink-muted)]">
                    Courier ready
                  </div>
                  <div className="mt-1 font-mono text-2xl font-semibold tabular-nums">
                    9
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                {[
                  { icon: ClipboardList, label: "Shila Akter · Linen Kurti", tag: "New" },
                  { icon: WalletCards, label: "Tanvir Store · Nagad ref", tag: "Check" },
                  { icon: PackageCheck, label: "12 packed · Pathao CSV", tag: "Export" }
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm"
                      key={row.label}
                    >
                      <Icon className="size-4 text-[var(--ink-muted)]" />
                      <span className="flex-1 truncate">{row.label}</span>
                      <span className="font-mono text-xs text-primary">
                        {row.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="workflow">
        <div className="grid gap-4 sm:grid-cols-3">
          {workflow.map((item) => {
            const Icon = item.icon;
            return (
              <div
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-border-strong"
                key={item.title}
              >
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-dark)]">
                  <Icon className="size-4.5" />
                </span>
                <h2 className="mt-4 text-base font-semibold">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
