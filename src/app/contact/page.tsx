import { PublicPageShell } from "@/components/public-page-shell";

export default function ContactPage() {
  return (
    <PublicPageShell
      title="Contact"
      description="Support details for the OrderFlow BD pilot."
    >
      <section className="panel legal-copy">
        <p>
          For merchant onboarding, support, data requests, or pilot feedback,
          contact the OrderFlow BD team.
        </p>
        <p>Email: support@orderflowbd.example</p>
        <p>Phone: +8801711122233</p>
        <p>Location: Dhaka, Bangladesh</p>
      </section>
    </PublicPageShell>
  );
}
