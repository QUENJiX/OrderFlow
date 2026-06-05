import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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
    <main className="success-page">
      <section className="success-card">
        <CheckCircle2 size={42} />
        <p className="section-label">Order received</p>
        <h1>Thanks, your order request is saved.</h1>
        <p>
          The seller will confirm stock, payment, and courier details soon.
          Please keep your phone active for delivery calls.
        </p>
        {orderId ? <strong>Order ID: {orderId}</strong> : null}
        <div className="success-actions">
          <Link className="secondary-button" href={`/order/${shopSlug}/${productSlug}`}>
            Place another order
          </Link>
          <Link className="primary-button" href="/">
            Merchant dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
