"use client";

import { Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatBdt } from "@/lib/domain/money";
import type { CustomerSummary } from "@/lib/domain/analytics";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";

export function CustomersWorkspace({
  customers
}: {
  customers: CustomerSummary[];
}) {
  const [query, setQuery] = useState("");

  if (customers.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-2 p-12 text-center">
        <ShoppingBag className="size-8 text-muted-foreground" />
        <div className="font-medium">No customers yet</div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Customers appear here after public order links start collecting orders.
        </p>
      </Card>
    );
  }

  const q = query.trim().toLowerCase();
  const visible = q
    ? customers.filter((customer) =>
        `${customer.name} ${customer.phone} ${customer.district}`
          .toLowerCase()
          .includes(q)
      )
    : customers;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Customer list</CardTitle>
          <p className="text-sm text-muted-foreground">
            Derived from order history. No separate CRM database yet.
          </p>
        </div>
        <div className="relative w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customers…"
            value={query}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Customer</TableHead>
              <TableHead>District</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead>Last order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((customer) => (
              <TableRow key={customer.phone}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback>{customer.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{customer.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {customer.phone}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {customer.district}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {customer.orderCount}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {formatBdt(customer.totalSpent)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(customer.lastOrderAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
