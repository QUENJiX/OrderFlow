"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  COURIER_LABELS,
  COURIERS,
  type CourierProvider,
  type Shop
} from "@/lib/domain/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function MerchantSettingsForm({ shop }: { shop: Shop }) {
  const [form, setForm] = useState({
    defaultCourier: shop.defaultCourier,
    defaultDistrict: shop.defaultDistrict,
    email: shop.email,
    ownerName: shop.ownerName,
    phone: shop.phone,
    supportPhone: shop.supportPhone
  });
  const [isSaving, setIsSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch("/api/merchant/shop", {
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
        method: "PATCH"
      });
      const result = (await response.json()) as ApiResult<Shop>;
      if (result.ok) {
        toast.success("Shop settings saved");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Settings update failed"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Shop profile</CardTitle>
          <p className="text-sm text-muted-foreground">
            These details appear in merchant operations and order handling.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Owner name</Label>
              <Input
                onChange={(event) =>
                  setForm({ ...form, ownerName: event.target.value })
                }
                value={form.ownerName}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Support phone</Label>
              <Input
                onChange={(event) =>
                  setForm({ ...form, supportPhone: event.target.value })
                }
                value={form.supportPhone}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Business phone</Label>
              <Input
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
                value={form.phone}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Business email</Label>
              <Input
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                type="email"
                value={form.email}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Default district</Label>
              <Input
                onChange={(event) =>
                  setForm({ ...form, defaultDistrict: event.target.value })
                }
                value={form.defaultDistrict}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Default courier</Label>
              <Select
                onValueChange={(value) =>
                  setForm({ ...form, defaultCourier: value as CourierProvider })
                }
                value={form.defaultCourier}
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
          </div>
          <div>
            <Button disabled={isSaving} type="submit">
              <Save />
              {isSaving ? "Saving…" : "Save settings"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
