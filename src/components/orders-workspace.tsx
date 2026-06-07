"use client";

import {
  CheckCircle2,
  Download,
  MoreHorizontal,
  RefreshCw,
  Search,
  Truck,
  WalletCards
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatBdt } from "@/lib/domain/money";
import {
  COURIER_LABELS,
  COURIERS,
  ORDER_STATUS_LABELS,
  ORDER_STATUSES,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUSES,
  type CourierProvider,
  type Order,
  type OrderPatch,
  type OrderStatus,
  type PaymentStatus,
  type Product
} from "@/lib/domain/types";
import { CopyButton } from "./copy-button";
import {
  CourierBadge,
  OrderStatusBadge,
  PaymentStatusBadge
} from "./status-badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "./ui/sheet";
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

export function OrdersWorkspace({
  initialOrders,
  products
}: {
  initialOrders: Order[];
  products: Product[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);

  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  const visibleOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((order) => {
      if (filter !== "all" && order.status !== filter) return false;
      if (!q) return true;
      const product = productById.get(order.productId);
      return [
        order.id,
        order.customer.name,
        order.customer.phone,
        product?.name ?? ""
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, filter, query, productById]);

  const openOrder = orders.find((order) => order.id === openId) ?? null;

  async function patchOrder(orderId: string, patch: OrderPatch) {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    const result = (await response.json()) as ApiResult<Order>;
    if (result.ok) {
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? result.data : order))
      );
      toast.success("Order updated");
    } else {
      toast.error(result.error);
    }
  }

  async function bulkMark(ids: string[], patch: OrderPatch) {
    await Promise.all(ids.map((id) => patchOrder(id, patch)));
    setSelected(new Set());
  }

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((current) =>
      current.size === visibleOrders.length
        ? new Set()
        : new Set(visibleOrders.map((order) => order.id))
    );
  }

  function copyDetails(order: Order) {
    const product = productById.get(order.productId);
    return [
      `Order: ${order.id}`,
      `Customer: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Address: ${order.customer.address}, ${order.customer.area}, ${order.customer.district}`,
      `Product: ${product?.name ?? "Unknown product"}`,
      `Variant: ${order.variant ?? "-"}`,
      `Quantity: ${order.quantity}`,
      `COD amount: ${formatBdt(order.total)}`
    ].join("\n");
  }

  const allChecked =
    visibleOrders.length > 0 && selected.size === visibleOrders.length;
  const someChecked = selected.size > 0 && !allChecked;
  const selectedIds = [...selected];

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search orders, customers, phone…"
            value={query}
          />
        </div>
        <Select
          onValueChange={(value) => setFilter(value as OrderStatus | "all")}
          value={filter}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ORDER_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {ORDER_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button asChild variant="secondary">
          <Link
            href={`/api/orders/export${filter !== "all" ? `?status=${filter}` : ""}`}
            prefetch={false}
          >
            <Download />
            Export CSV
          </Link>
        </Button>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/50 px-3 py-2 text-sm">
          <span className="font-medium">{selected.size} selected</span>
          <Button
            onClick={() => bulkMark(selectedIds, { status: "courier_ready" })}
            size="sm"
            variant="secondary"
          >
            <Truck />
            Mark courier ready
          </Button>
          <Button
            onClick={() => bulkMark(selectedIds, { paymentStatus: "verified" })}
            size="sm"
            variant="secondary"
          >
            <WalletCards />
            Verify payment
          </Button>
          <Button
            className="ml-auto"
            onClick={() => setSelected(new Set())}
            size="sm"
            variant="ghost"
          >
            Clear
          </Button>
        </div>
      ) : null}

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all"
                checked={allChecked ? true : someChecked ? "indeterminate" : false}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Courier</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleOrders.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                className="h-32 text-center text-sm text-muted-foreground"
                colSpan={9}
              >
                No orders match your filters.
              </TableCell>
            </TableRow>
          ) : (
            visibleOrders.map((order) => {
              const product = productById.get(order.productId);
              return (
                <TableRow
                  className="cursor-pointer"
                  data-state={selected.has(order.id) ? "selected" : undefined}
                  key={order.id}
                  onClick={() => setOpenId(order.id)}
                >
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      aria-label={`Select ${order.id}`}
                      checked={selected.has(order.id)}
                      onCheckedChange={() => toggle(order.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-xs font-medium">{order.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {order.customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {product?.name ?? "Unknown product"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.variant ?? "No variant"} · Qty {order.quantity}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {formatBdt(order.total)}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    <CourierBadge courier={order.courierProvider} />
                  </TableCell>
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon-sm" variant="ghost">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setOpenId(order.id)}>
                          Open details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            patchOrder(order.id, { status: "courier_ready" })
                          }
                        >
                          <Truck />
                          Mark courier ready
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            patchOrder(order.id, { paymentStatus: "verified" })
                          }
                        >
                          <WalletCards />
                          Mark payment verified
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => patchOrder(order.id, {})}>
                          <RefreshCw />
                          Refresh
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <OrderDrawer
        copyValue={openOrder ? copyDetails(openOrder) : ""}
        onOpenChange={(open) => setOpenId(open ? openId : null)}
        onPatch={patchOrder}
        order={openOrder}
        product={openOrder ? productById.get(openOrder.productId) : undefined}
      />
    </div>
  );
}

function OrderDrawer({
  order,
  product,
  copyValue,
  onOpenChange,
  onPatch
}: {
  order: Order | null;
  product?: Product;
  copyValue: string;
  onOpenChange: (open: boolean) => void;
  onPatch: (orderId: string, patch: OrderPatch) => void;
}) {
  return (
    <Sheet onOpenChange={onOpenChange} open={Boolean(order)}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md" side="right">
        {order ? (
          <>
            <SheetHeader>
              <SheetTitle className="font-mono">{order.id}</SheetTitle>
              <SheetDescription>
                {new Date(order.createdAt).toLocaleString()}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-5 p-5">
              <section className="grid gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Customer
                </span>
                <div className="text-sm font-medium">{order.customer.name}</div>
                <div className="font-mono text-sm text-muted-foreground">
                  {order.customer.phone}
                </div>
                <div className="text-sm text-muted-foreground">
                  {order.customer.address}, {order.customer.area},{" "}
                  {order.customer.district}
                </div>
              </section>

              <section className="grid gap-1 rounded-md border border-border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {product?.name ?? "Unknown product"}
                  </span>
                  <span className="font-mono tabular-nums">
                    {formatBdt(order.total)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {order.variant ?? "No variant"} · Qty {order.quantity}
                </div>
              </section>

              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label>Order status</Label>
                  <Select
                    onValueChange={(value) =>
                      onPatch(order.id, { status: value as OrderStatus })
                    }
                    value={order.status}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {ORDER_STATUS_LABELS[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Payment</Label>
                  <Select
                    onValueChange={(value) =>
                      onPatch(order.id, { paymentStatus: value as PaymentStatus })
                    }
                    value={order.paymentStatus}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {PAYMENT_STATUS_LABELS[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Courier</Label>
                  <Select
                    onValueChange={(value) =>
                      onPatch(order.id, {
                        courierProvider: value as CourierProvider
                      })
                    }
                    value={order.courierProvider}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COURIERS.map((courier) => (
                        <SelectItem key={courier} value={courier}>
                          {COURIER_LABELS[courier]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Tracking ID</Label>
                  <Input
                    defaultValue={order.trackingId ?? ""}
                    onBlur={(event) =>
                      onPatch(order.id, { trackingId: event.target.value })
                    }
                    placeholder="Courier tracking ID"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <CopyButton label="Copy details" value={copyValue} />
                <Button
                  onClick={() =>
                    onPatch(order.id, { status: "courier_ready" })
                  }
                  variant="default"
                >
                  <CheckCircle2 />
                  Courier ready
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
