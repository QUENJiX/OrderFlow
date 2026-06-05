import {
  ArrowRight,
  ClipboardList,
  MessageCircle,
  PackageCheck,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

const workflow = [
  {
    icon: MessageCircle,
    title: "Reply with a clean order link",
    text: "Send customers a product-specific link from comments, Messenger, or WhatsApp."
  },
  {
    icon: ClipboardList,
    title: "Capture COD and manual MFS orders",
    text: "Collect customer name, phone, address, quantity, variant, and payment reference."
  },
  {
    icon: PackageCheck,
    title: "Export courier-ready rows",
    text: "Move confirmed orders into your delivery workflow without spreadsheet chaos."
  }
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Public navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>F-commerce order desk</small>
          </span>
        </Link>
        <div className="landing-actions">
          <Link className="secondary-button" href="/merchant/login">
            Merchant login
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-copy">
          <h1>Turn Facebook interest into confirmed orders.</h1>
          <p>
            OrderFlow gives Bangladesh F-commerce sellers a merchant workspace,
            public order links, COD/manual payment tracking, and courier-ready
            exports.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/merchant/login">
              Start merchant setup
              <ArrowRight size={16} />
            </Link>
            <Link
              className="secondary-button"
              href="#workflow"
            >
              See workflow
            </Link>
          </div>
        </div>

        <div className="landing-product-shot" aria-label="OrderFlow dashboard preview">
          <div className="shot-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="shot-grid">
            <div className="shot-card">
              <small>Orders today</small>
              <strong>New</strong>
              <span>New customer submissions</span>
            </div>
            <div className="shot-card">
              <small>Courier ready</small>
              <strong>Ready</strong>
              <span>Needs delivery action</span>
            </div>
            <div className="shot-list">
              <p>Recent orders</p>
              <div><span>Customer order</span><strong>COD</strong></div>
              <div><span>Payment check</span><strong>bKash</strong></div>
              <div><span>Courier export</span><strong>CSV</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-workflow" id="workflow">
        {workflow.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={22} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="landing-admin-note">
        <ShieldCheck size={22} />
        <div>
          <h2>Separate platform control</h2>
          <p>
            Merchant access and developer/admin access are separate. The control
            room is hidden from public navigation and requires platform admin
            membership.
          </p>
        </div>
      </section>
    </main>
  );
}
