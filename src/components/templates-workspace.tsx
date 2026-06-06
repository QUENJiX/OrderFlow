"use client";

import { useMemo, useState } from "react";
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
  const [language, setLanguage] = useState<ReplyTemplate["language"] | "all">("all");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const product = useMemo(
    () => products.find((item) => item.id === productId) ?? products[0],
    [productId, products]
  );
  const visibleTemplates = templates.filter(
    (template) => language === "all" || template.language === language
  );

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Reply desk</h2>
          <p>Pick a product, filter by language, and copy customer-ready replies.</p>
        </div>
      </div>
      <div className="reply-controls">
        <div className="filter-bar">
          {(["all", "bn", "en"] as const).map((item) => (
            <button
              className={language === item ? "filter active" : "filter"}
              key={item}
              onClick={() => setLanguage(item)}
              type="button"
            >
              {item === "all" ? "All" : item === "bn" ? "Bangla" : "English"}
            </button>
          ))}
        </div>
        <select
          value={product?.id ?? ""}
          onChange={(event) => setProductId(event.target.value)}
        >
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="template-grid">
        {visibleTemplates.map((template) => {
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
