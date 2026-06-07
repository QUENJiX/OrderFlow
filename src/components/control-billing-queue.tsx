"use client";

import { StickyNote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatBdt } from "@/lib/domain/money";
import type { BillingRecord } from "@/lib/domain/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Textarea } from "./ui/textarea";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const statuses: BillingRecord["status"][] = ["trial", "due", "paid", "overdue"];
const statusTone: Record<
  BillingRecord["status"],
  "info" | "warning" | "success" | "danger"
> = {
  trial: "info",
  due: "warning",
  paid: "success",
  overdue: "danger"
};

export function ControlBillingQueue({
  records
}: {
  records: BillingRecord[];
}) {
  const [billingRecords, setBillingRecords] = useState(records);

  async function patchBilling(
    billingId: string,
    patch: Partial<Pick<BillingRecord, "notes" | "status">>
  ) {
    const response = await fetch(`/api/control/billing/${billingId}`, {
      body: JSON.stringify(patch),
      headers: { "Content-Type": "application/json" },
      method: "PATCH"
    });
    const result = (await response.json()) as ApiResult<BillingRecord>;

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setBillingRecords((current) =>
      current.map((record) => (record.id === billingId ? result.data : record))
    );
    toast.success("Billing updated");
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Billing queue</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manual founder-led billing follow-up for pilot merchants.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {billingRecords.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            Billing records appear after merchants are added to plans.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {billingRecords.map((record) => (
              <li
                className="flex flex-wrap items-center gap-3 px-4 py-3"
                key={record.id}
              >
                <div className="min-w-[140px] flex-1">
                  <div className="text-sm font-medium">{record.period}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge className="capitalize" tone="neutral">
                      {record.plan}
                    </Badge>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      {formatBdt(record.amount)}
                    </span>
                  </div>
                </div>
                <Select
                  onValueChange={(value) =>
                    patchBilling(record.id, {
                      status: value as BillingRecord["status"]
                    })
                  }
                  value={record.status}
                >
                  <SelectTrigger className="h-8 w-[120px] capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem className="capitalize" key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge className="hidden capitalize sm:inline-flex" dot tone={statusTone[record.status]}>
                  {record.status}
                </Badge>
                <NotesPopover
                  notes={record.notes}
                  onSave={(notes) => patchBilling(record.id, { notes })}
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function NotesPopover({
  notes,
  onSave
}: {
  notes: string;
  onSave: (notes: string) => void;
}) {
  const [value, setValue] = useState(notes);
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button size="icon-sm" title="Billing note" variant="ghost">
          <StickyNote
            className={notes ? "text-primary" : "text-muted-foreground"}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <div className="grid gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Billing note
          </span>
          <Textarea
            onChange={(event) => setValue(event.target.value)}
            placeholder="Add a follow-up note…"
            rows={3}
            value={value}
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                onSave(value);
                setOpen(false);
              }}
              size="sm"
            >
              Save note
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
