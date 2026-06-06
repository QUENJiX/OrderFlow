import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  PackageCheck,
  WalletCards
} from "lucide-react";
import Link from "next/link";

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
    <main className="marketing-page">
      <nav className="marketing-nav" aria-label="Public navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OrderFlow BD</strong>
            <small>Facebook orders, cleaned up</small>
          </span>
        </Link>
        <div className="landing-actions">
          <Link className="secondary-button" href="/control/login">
            Control login
          </Link>
          <Link className="primary-button" href="/merchant/login">
            Merchant login
          </Link>
        </div>
      </nav>

      <section className="marketing-hero">
        <div className="hero-copy">
          <h1>From Facebook comment to courier-ready order.</h1>
          <p>
            OrderFlow BD gives F-commerce sellers a premium order desk for
            product links, COD/manual bKash checks, reply templates, and courier
            export without spreadsheet chaos.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/merchant/login">
              Start merchant workspace
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link className="secondary-button" href="#workflow">
              See daily flow
            </Link>
          </div>
          <div className="hero-proof">
            <span><CheckCircle2 size={15} /> COD first</span>
            <span><CheckCircle2 size={15} /> bKash/Nagad manual checks</span>
            <span><CheckCircle2 size={15} /> Courier CSV</span>
          </div>
        </div>

        <div className="hero-console" aria-label="OrderFlow order desk preview">
          <div className="console-header">
            <div>
              <span>Today’s order desk</span>
              <strong>Dhaka drop · 18 orders</strong>
            </div>
            <span className="badge badge-success">Live</span>
          </div>
          <div className="console-grid">
            <article>
              <span>Payment checks</span>
              <strong>6</strong>
              <small>bKash/Nagad awaiting verification</small>
            </article>
            <article>
              <span>Courier ready</span>
              <strong>9</strong>
              <small>Batch export for Steadfast</small>
            </article>
          </div>
          <div className="console-list">
            <div>
              <ClipboardList size={18} aria-hidden />
              <span>Shila Akter · Linen Kurti · COD</span>
              <strong>New</strong>
            </div>
            <div>
              <WalletCards size={18} aria-hidden />
              <span>Tanvir Store · Nagad reference</span>
              <strong>Check</strong>
            </div>
            <div>
              <PackageCheck size={18} aria-hidden />
              <span>12 packed orders · Pathao CSV</span>
              <strong>Export</strong>
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
    </main>
  );
}
