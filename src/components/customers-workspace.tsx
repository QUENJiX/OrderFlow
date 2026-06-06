import { Phone, ShoppingBag } from "lucide-react";
import { formatBdt } from "@/lib/domain/money";
import type { CustomerSummary } from "@/lib/domain/analytics";

export function CustomersWorkspace({
  customers
}: {
  customers: CustomerSummary[];
}) {
  if (customers.length === 0) {
    return (
      <section className="panel empty-state">
        <ShoppingBag size={28} aria-hidden />
        <h2>No customers yet</h2>
        <p>Customers appear here after public order links start collecting orders.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Customer list</h2>
          <p>Derived from order history. No separate CRM database yet.</p>
        </div>
      </div>
      <div className="customer-grid">
        {customers.map((customer) => (
          <article className="customer-row" key={customer.phone}>
            <div className="customer-avatar">{customer.name.slice(0, 1)}</div>
            <div>
              <strong>{customer.name}</strong>
              <span>
                <Phone size={13} aria-hidden />
                {customer.phone}
              </span>
              <small>{customer.district} · Last order {new Date(customer.lastOrderAt).toLocaleDateString()}</small>
            </div>
            <div className="customer-stats">
              <strong>{customer.orderCount}</strong>
              <span>orders</span>
            </div>
            <div className="customer-stats">
              <strong>{formatBdt(customer.totalSpent)}</strong>
              <span>spent</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
