"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type { PlatformMerchantRow } from "@/lib/domain/analytics";
import type { Shop, ShopPlan, ShopStatus } from "@/lib/domain/types";
import { formatBdt } from "@/lib/domain/money";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IconTip } from "./ui/icon-tip";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const plans: ShopPlan[] = ["pilot", "starter", "assisted"];
const statuses: ShopStatus[] = ["pilot", "active", "paused"];
const statusTone: Record<ShopStatus, "info" | "success" | "warning"> = {
  pilot: "info",
  active: "success",
  paused: "warning"
};

export function ControlShopTable({ rows }: { rows: PlatformMerchantRow[] }) {
  const [merchantRows, setMerchantRows] = useState(rows);

  async function patchShop(shopId: string, patch: Partial<Shop>) {
    const response = await fetch(`/api/control/shops/${shopId}`, {
      body: JSON.stringify(patch),
      headers: { "Content-Type": "application/json" },
      method: "PATCH"
    });
    const result = (await response.json()) as ApiResult<Shop>;

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setMerchantRows((current) =>
      current.map((row) =>
        row.shopId === shopId
          ? {
              ...row,
              plan: result.data.plan,
              status: result.data.status,
              supportNotes: result.data.supportNotes
            }
          : row
      )
    );
    toast.success("Merchant updated");
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Merchant health</CardTitle>
          <p className="text-sm text-muted-foreground">
            Plan, order volume, billing state, and support follow-up.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Merchant</TableHead>
              <TableHead className="w-[130px]">Plan</TableHead>
              <TableHead className="w-[130px]">Status</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">GMV</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead className="min-w-[200px]">Support note</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {merchantRows.map((row) => (
              <TableRow key={row.shopId}>
                <TableCell>
                  <div className="font-medium">{row.shopName}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {row.slug}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      patchShop(row.shopId, { plan: value as ShopPlan })
                    }
                    value={row.plan}
                  >
                    <SelectTrigger className="h-8 capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem className="capitalize" key={plan} value={plan}>
                          {plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      patchShop(row.shopId, { status: value as ShopStatus })
                    }
                    value={row.status}
                  >
                    <SelectTrigger className="h-8 capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem
                          className="capitalize"
                          key={status}
                          value={status}
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {row.orders}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {formatBdt(row.orderValue)}
                </TableCell>
                <TableCell>
                  <Badge className="capitalize" tone={statusTone[row.status]}>
                    {row.billingStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Input
                    className="h-8"
                    defaultValue={row.supportNotes}
                    onBlur={(event) =>
                      patchShop(row.shopId, { supportNotes: event.target.value })
                    }
                    placeholder="Follow-up note"
                  />
                </TableCell>
                <TableCell>
                  <IconTip label="Open merchant">
                    <Button asChild size="icon-sm" variant="ghost">
                      <Link href={`/control/shops/${row.shopId}`}>
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </IconTip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
