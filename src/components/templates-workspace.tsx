import type { Product, ReplyTemplate, Shop } from "@/lib/domain/types";
import { CopyButton } from "./copy-button";

function fillTemplate(template: ReplyTemplate, product: Product, shop: Shop) {
  const orderLink = `/order/${shop.slug}/${product.slug}`;
  return template.body
    .replaceAll("{price}", String(product.price))
    .replaceAll("{delivery_charge}", String(product.deliveryCharge))
    .replaceAll("{order_link}", orderLink)
    .replaceAll("{shop_name}", shop.name);
}

export function TemplatesWorkspace({
  templates,
  products,
  shop
}: {
  templates: ReplyTemplate[];
  products: Product[];
  shop: Shop;
}) {
  const product = products[0];

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Reply templates</h2>
          <p>Copy these into Facebook comments, inbox, WhatsApp, or Instagram.</p>
        </div>
      </div>
      <div className="template-grid">
        {templates.map((template) => {
          const body = product ? fillTemplate(template, product, shop) : template.body;
          return (
            <article className="template-card" key={template.id}>
              <div>
                <span className="badge badge-neutral">
                  {template.language === "bn" ? "Bangla" : "English"}
                </span>
                <h3>{template.title}</h3>
                <small>Trigger: {template.trigger}</small>
              </div>
              <p>{body}</p>
              <CopyButton label="Copy reply" value={body} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
