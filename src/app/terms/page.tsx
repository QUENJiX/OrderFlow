import { AppShell } from "@/components/app-shell";

export default function TermsPage() {
  return (
    <AppShell
      title="Terms of Service"
      description="Pilot terms for merchants using OrderFlow BD."
    >
      <section className="panel legal-copy">
        <p>
          OrderFlow BD is provided as a pilot SaaS tool for managing product
          order links, customer order capture, COD/manual payment tracking, and
          courier-ready exports.
        </p>
        <p>
          Merchants are responsible for product accuracy, stock availability,
          pricing, customer communication, delivery performance, payment
          verification, and compliance with applicable commerce rules.
        </p>
        <p>
          External services such as Meta, payment gateways, and courier APIs are
          not connected in local MVP mode. Future provider integrations will be
          subject to each provider&apos;s approval, availability, and terms.
        </p>
      </section>
    </AppShell>
  );
}
