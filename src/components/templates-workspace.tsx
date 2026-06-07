"use client";

import { useMemo, useState } from "react";
import type { Product, ReplyTemplate, Shop } from "@/lib/domain/types";
import { CopyButton } from "./copy-button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
  const [language, setLanguage] = useState<ReplyTemplate["language"] | "all">(
    "all"
  );
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const product = useMemo(
    () => products.find((item) => item.id === productId) ?? products[0],
    [productId, products]
  );
  const visibleTemplates = templates.filter(
    (template) => language === "all" || template.language === language
  );

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Reply desk</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pick a product, filter by language, and copy customer-ready replies.
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Tabs
            onValueChange={(value) =>
              setLanguage(value as ReplyTemplate["language"] | "all")
            }
            value={language}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="bn">Bangla</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select onValueChange={setProductId} value={product?.id ?? ""}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {visibleTemplates.map((template) => {
            const body = product
              ? fillTemplate(template, product, shop)
              : template.body;
            return (
              <div
                className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4"
                key={template.id}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge tone={template.language === "bn" ? "info" : "neutral"}>
                    {template.language === "bn" ? "Bangla" : "English"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Trigger: {template.trigger}
                  </span>
                </div>
                <div className="text-sm font-medium">{template.title}</div>
                <p className="whitespace-pre-wrap rounded-md bg-card p-3 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
                <CopyButton label="Copy reply" value={body} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
