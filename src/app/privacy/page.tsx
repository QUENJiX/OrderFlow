import { PublicPageShell } from "@/components/public-page-shell";
import type { ReactNode } from "react";

export default function PrivacyPage() {
  return (
    <PublicPageShell
      title="Privacy Policy"
      description="Public privacy page for OrderFlow BD pilot and Meta readiness."
    >
      <LegalPanel>
        <p>
          OrderFlow BD collects merchant shop data, product data, customer order
          details, payment references, courier fields, and support notes so
          Facebook-first sellers can process COD/manual payment orders.
        </p>
        <p>
          Customer data is used to confirm orders, prepare courier shipments,
          handle payment verification, and provide merchant support. We do not
          sell customer data.
        </p>
        <p>
          Future Meta integrations will use Facebook Page/comment/message data
          only to detect inquiries, generate compliant replies, and log
          automation outcomes for the connected merchant.
        </p>
        <p>
          Deletion requests can be sent through the contact page. Some order
          records may be retained when needed for accounting, fraud prevention,
          dispute handling, or legal obligations.
        </p>
      </LegalPanel>
    </PublicPageShell>
  );
}

function LegalPanel({ children }: { children: ReactNode }) {
  return <section className="legal-copy">{children}</section>;
}
