"use client";

import Image from "next/image";
import { Archive, Edit3, ExternalLink, Plus, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatBdt } from "@/lib/domain/money";
import type { Product, ProductInput } from "@/lib/domain/types";
import { CopyButton } from "./copy-button";
import { Field } from "./forms";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const emptyForm = {
  name: "",
  nameBn: "",
  description: "",
  price: "0",
  compareAtPrice: "",
  deliveryCharge: "80",
  stock: "0",
  variants: "",
  keywords: "",
  imageUrl: "",
  active: true
};

function formFromProduct(product: Product) {
  return {
    name: product.name,
    nameBn: product.nameBn,
    description: product.description,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
    deliveryCharge: String(product.deliveryCharge),
    stock: String(product.stock),
    variants: product.variants
      .map((variant) => `${variant.name}:${variant.stock}`)
      .join(", "),
    keywords: product.keywords.join(", "),
    imageUrl: product.imageUrl,
    active: product.active
  };
}

function parseVariants(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [name, stock] = item.split(":");
      return {
        name: name.trim(),
        stock: Number(stock ?? 0)
      };
    });
}

function toProductInput(form: typeof emptyForm): ProductInput {
  return {
    name: form.name,
    nameBn: form.nameBn,
    description: form.description,
    price: Number(form.price),
    compareAtPrice: form.compareAtPrice
      ? Number(form.compareAtPrice)
      : undefined,
    deliveryCharge: Number(form.deliveryCharge),
    stock: Number(form.stock),
    variants: parseVariants(form.variants),
    keywords: form.keywords
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    imageUrl: form.imageUrl,
    active: form.active
  };
}

export function ProductManager({
  initialProducts,
  shopSlug
}: {
  initialProducts: Product[];
  shopSlug: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [origin, setOrigin] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const editingProduct = useMemo(
    () => products.find((product) => product.id === editingId),
    [editingId, products]
  );

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFieldErrors({});
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = toProductInput(form);
    const response = await fetch(
      editingId ? `/api/products/${editingId}` : "/api/products",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );
    const result = (await response.json()) as ApiResult<Product>;

    if (!result.ok) {
      setFieldErrors(result.fieldErrors ?? {});
      setMessage(result.error);
      return;
    }

    setProducts((current) =>
      editingId
        ? current.map((product) =>
            product.id === result.data.id ? result.data : product
          )
        : [result.data, ...current]
    );
    setMessage(editingId ? "Product updated" : "Product created");
    resetForm();
  }

  async function deactivate(productId: string) {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE"
    });
    const result = (await response.json()) as ApiResult<Product>;
    if (result.ok) {
      setProducts((current) =>
        current.map((product) =>
          product.id === result.data.id ? result.data : product
        )
      );
      setMessage("Product deactivated");
    }
  }

  function edit(product: Product) {
    setEditingId(product.id);
    setForm(formFromProduct(product));
    setFieldErrors({});
    setMessage("");
  }

  return (
    <div className="workspace-grid">
      <form className="panel form-panel" onSubmit={submit}>
        <div className="panel-heading">
          <div>
            <h2>{editingProduct ? "Edit product" : "Create product"}</h2>
            <p>Set up order links sellers can paste into Facebook replies.</p>
          </div>
          {editingProduct ? (
            <button className="secondary-button" onClick={resetForm} type="button">
              Cancel
            </button>
          ) : null}
        </div>

        <div className="form-grid">
          <Field label="Product name" error={fieldErrors.name}>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </Field>
          <Field label="Bangla name">
            <input
              value={form.nameBn}
              onChange={(event) =>
                setForm({ ...form, nameBn: event.target.value })
              }
            />
          </Field>
          <Field label="Price" error={fieldErrors.price}>
            <input
              min="0"
              type="number"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
            />
          </Field>
          <Field label="Compare-at price" error={fieldErrors.compareAtPrice}>
            <input
              min="0"
              type="number"
              value={form.compareAtPrice}
              onChange={(event) =>
                setForm({ ...form, compareAtPrice: event.target.value })
              }
            />
          </Field>
          <Field label="Delivery charge" error={fieldErrors.deliveryCharge}>
            <input
              min="0"
              type="number"
              value={form.deliveryCharge}
              onChange={(event) =>
                setForm({ ...form, deliveryCharge: event.target.value })
              }
            />
          </Field>
          <Field label="Stock" error={fieldErrors.stock}>
            <input
              min="0"
              type="number"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: event.target.value })}
            />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
        </Field>
        <Field label="Variants">
          <input
            placeholder="S:8, M:14, L:10"
            value={form.variants}
            onChange={(event) =>
              setForm({ ...form, variants: event.target.value })
            }
          />
        </Field>
        <Field label="Keywords">
          <input
            placeholder="kurti, price, dam"
            value={form.keywords}
            onChange={(event) =>
              setForm({ ...form, keywords: event.target.value })
            }
          />
        </Field>
        <Field label="Image URL">
          <input
            value={form.imageUrl}
            onChange={(event) =>
              setForm({ ...form, imageUrl: event.target.value })
            }
          />
        </Field>
        <label className="check-row">
          <input
            checked={form.active}
            type="checkbox"
            onChange={(event) =>
              setForm({ ...form, active: event.target.checked })
            }
          />
          Active product
        </label>
        {message ? <p className="form-message">{message}</p> : null}
        <button className="primary-button" type="submit">
          {editingProduct ? <Save size={16} /> : <Plus size={16} />}
          {editingProduct ? "Save product" : "Create product"}
        </button>
      </form>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Catalog</h2>
            <p>{products.length} products configured for manual order links.</p>
          </div>
        </div>
        <div className="product-list">
          {products.map((product) => {
            const path = `/order/${shopSlug}/${product.slug}`;
            const link = origin ? `${origin}${path}` : path;
            return (
              <article className="product-row" key={product.id}>
                <Image
                  alt=""
                  className="product-thumb"
                  height={72}
                  src={product.imageUrl}
                  width={72}
                />
                <div>
                  <div className="row-title">
                    <strong>{product.name}</strong>
                    {!product.active ? (
                      <span className="badge badge-danger">Inactive</span>
                    ) : null}
                  </div>
                  <p>{product.nameBn}</p>
                  <small>
                    {formatBdt(product.price)} · Stock {product.stock} · Delivery{" "}
                    {formatBdt(product.deliveryCharge)}
                  </small>
                </div>
                <div className="row-actions">
                  <CopyButton compact label="Copy order link" value={link} />
                  <a className="icon-button" href={path} title="Open order page">
                    <ExternalLink size={16} />
                  </a>
                  <button
                    className="icon-button"
                    onClick={() => edit(product)}
                    title="Edit product"
                    type="button"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="icon-button danger"
                    disabled={!product.active}
                    onClick={() => deactivate(product.id)}
                    title="Deactivate product"
                    type="button"
                  >
                    <Archive size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
