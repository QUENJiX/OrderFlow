import { AppShell } from "@/components/app-shell";

export default function DataDeletionPage() {
  return (
    <AppShell
      title="Data Deletion"
      description="How merchants or customers can request deletion."
    >
      <section className="panel legal-copy">
        <p>
          To request deletion of merchant, customer, or Facebook-related data,
          contact OrderFlow BD with the shop name, order ID if available, phone
          number, and the data you want removed.
        </p>
        <p>
          We aim to review deletion requests within 7 business days during the
          pilot. Some records may need to be retained for accounting, delivery,
          fraud prevention, dispute handling, or legal reasons.
        </p>
        <p>Email: support@orderflowbd.example</p>
      </section>
    </AppShell>
  );
}
