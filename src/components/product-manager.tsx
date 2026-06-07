"use client";

import Image from "next/image";
import { Archive, Edit3, ExternalLink, ImageIcon, Plus, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatBdt } from "@/lib/domain/money";
import type { Product, ProductInput } from "@/lib/domain/types";
import { CopyButton } from "./copy-button";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { IconTip } from "./ui/icon-tip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

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
      return { name: name.trim(), stock: Number(stock ?? 0) };
    });
}

function toProductInput(form: typeof emptyForm): ProductInput {
  return {
    name: form.name,
    nameBn: form.nameBn,
    description: form.description,
    price: Number(form.price),
    compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
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
  const [open, setOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const editingProduct = useMemo(
    () => products.find((product) => product.id === editingId),
    [editingId, products]
  );

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setFieldErrors({});
    setOpen(true);
  }

  function edit(product: Product) {
    setEditingId(product.id);
    setForm(formFromProduct(product));
    setFieldErrors({});
    setOpen(true);
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
      toast.error(result.error);
      return;
    }

    setProducts((current) =>
      editingId
        ? current.map((product) =>
            product.id === result.data.id ? result.data : product
          )
        : [result.data, ...current]
    );
    toast.success(editingId ? "Product updated" : "Product created");
    setOpen(false);
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
      toast.success("Product deactivated");
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {products.length} products configured for manual order links.
        </p>
        <Button onClick={openCreate}>
          <Plus />
          Add product
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-10 text-center">
          <ImageIcon className="size-8 text-muted-foreground" />
          <div className="font-medium">No products yet</div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Create your first product to generate a shareable order link.
          </p>
          <Button className="mt-2" onClick={openCreate}>
            <Plus />
            Add product
          </Button>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const path = `/order/${shopSlug}/${product.slug}`;
            const link = origin ? `${origin}${path}` : path;
            return (
              <Card className="flex flex-col overflow-hidden" key={product.id}>
                <div className="relative aspect-[4/3] bg-muted">
                  {product.imageUrl ? (
                    <Image
                      alt={product.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      src={product.imageUrl}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageIcon className="size-8" />
                    </div>
                  )}
                  {!product.active ? (
                    <Badge className="absolute left-2 top-2" tone="danger">
                      Inactive
                    </Badge>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{product.name}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {product.nameBn}
                      </div>
                    </div>
                    <Badge tone={product.stock > 0 ? "neutral" : "warning"}>
                      {product.stock} left
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-base font-semibold tabular-nums">
                      {formatBdt(product.price)}
                    </span>
                    {product.compareAtPrice ? (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatBdt(product.compareAtPrice)}
                      </span>
                    ) : null}
                    <span className="ml-auto text-xs text-muted-foreground">
                      +{formatBdt(product.deliveryCharge)} delivery
                    </span>
                  </div>
                  <div className="mt-auto flex items-center gap-1 border-t border-border pt-2">
                    <CopyButton compact label="Copy order link" value={link} />
                    <IconTip label="Open order page">
                      <Button asChild size="icon-sm" variant="ghost">
                        <a href={path} rel="noreferrer" target="_blank">
                          <ExternalLink />
                        </a>
                      </Button>
                    </IconTip>
                    <IconTip label="Edit product">
                      <Button
                        onClick={() => edit(product)}
                        size="icon-sm"
                        variant="ghost"
                      >
                        <Edit3 />
                      </Button>
                    </IconTip>
                    <IconTip label="Deactivate product">
                      <Button
                        className="ml-auto text-[var(--danger)]"
                        disabled={!product.active}
                        onClick={() => deactivate(product.id)}
                        size="icon-sm"
                        variant="ghost"
                      >
                        <Archive />
                      </Button>
                    </IconTip>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit product" : "Create product"}
            </DialogTitle>
            <DialogDescription>
              Set up order links sellers can paste into Facebook replies.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-3" onSubmit={submit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <ProductField error={fieldErrors.name} label="Product name">
                <Input
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  value={form.name}
                />
              </ProductField>
              <ProductField label="Bangla name">
                <Input
                  onChange={(event) =>
                    setForm({ ...form, nameBn: event.target.value })
                  }
                  value={form.nameBn}
                />
              </ProductField>
              <ProductField error={fieldErrors.price} label="Price">
                <Input
                  min="0"
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  type="number"
                  value={form.price}
                />
              </ProductField>
              <ProductField
                error={fieldErrors.compareAtPrice}
                label="Compare-at price"
              >
                <Input
                  min="0"
                  onChange={(event) =>
                    setForm({ ...form, compareAtPrice: event.target.value })
                  }
                  type="number"
                  value={form.compareAtPrice}
                />
              </ProductField>
              <ProductField
                error={fieldErrors.deliveryCharge}
                label="Delivery charge"
              >
                <Input
                  min="0"
                  onChange={(event) =>
                    setForm({ ...form, deliveryCharge: event.target.value })
                  }
                  type="number"
                  value={form.deliveryCharge}
                />
              </ProductField>
              <ProductField error={fieldErrors.stock} label="Stock">
                <Input
                  min="0"
                  onChange={(event) =>
                    setForm({ ...form, stock: event.target.value })
                  }
                  type="number"
                  value={form.stock}
                />
              </ProductField>
            </div>
            <ProductField label="Description">
              <Textarea
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                rows={3}
                value={form.description}
              />
            </ProductField>
            <ProductField label="Variants">
              <Input
                onChange={(event) =>
                  setForm({ ...form, variants: event.target.value })
                }
                placeholder="S:8, M:14, L:10"
                value={form.variants}
              />
            </ProductField>
            <ProductField label="Keywords">
              <Input
                onChange={(event) =>
                  setForm({ ...form, keywords: event.target.value })
                }
                placeholder="kurti, price, dam"
                value={form.keywords}
              />
            </ProductField>
            <ProductField label="Image URL">
              <Input
                onChange={(event) =>
                  setForm({ ...form, imageUrl: event.target.value })
                }
                value={form.imageUrl}
              />
            </ProductField>
            <label className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm font-medium">Active product</span>
              <Switch
                checked={form.active}
                onCheckedChange={(checked) => setForm({ ...form, active: checked })}
              />
            </label>
            <DialogFooter>
              <Button onClick={() => setOpen(false)} type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? <Save /> : <Plus />}
                {editingProduct ? "Save product" : "Create product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductField({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? (
        <span className="text-xs text-[var(--danger)]">{error}</span>
      ) : null}
    </div>
  );
}
