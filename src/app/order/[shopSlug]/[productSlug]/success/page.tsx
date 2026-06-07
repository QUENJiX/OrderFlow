import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    shopSlug: string;
    productSlug: string;
  }>;
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function OrderSuccessPage({
  params,
  searchParams
}: PageProps) {
  const { shopSlug, productSlug } = await params;
  const { orderId } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
          <CheckCircle2 className="size-7 text-primary" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Order received
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Thanks, your order request is saved.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The seller will confirm stock, payment, and courier details soon. Please
          keep your phone active for delivery calls.
        </p>
        {orderId ? (
          <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 font-mono text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-medium">{orderId}</span>
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild variant="secondary">
            <Link href={`/order/${shopSlug}/${productSlug}`}>
              Place another order
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
