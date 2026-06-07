"use client";

import { Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function MerchantSetupForm() {
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [defaultDistrict, setDefaultDistrict] = useState("Dhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/merchant/setup", {
        body: JSON.stringify({
          defaultDistrict,
          ownerName,
          shopName,
          supportPhone
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      const payload = (await response.json()) as {
        error?: string;
        ok: boolean;
      };

      if (!response.ok || !payload.ok) {
        toast.error(payload.error ?? "Shop setup failed");
        return;
      }

      window.location.href = "/merchant/dashboard";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Shop setup failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="rounded-xl border border-border bg-card p-6 shadow-lg"
      onSubmit={submit}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">Create your shop</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This workspace becomes your merchant dashboard.
        </p>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <Label>Shop name</Label>
          <Input
            minLength={2}
            onChange={(event) => setShopName(event.target.value)}
            required
            value={shopName}
          />
        </div>
        <div className="grid gap-1.5">
          <Label>Owner name</Label>
          <Input
            onChange={(event) => setOwnerName(event.target.value)}
            value={ownerName}
          />
        </div>
        <div className="grid gap-1.5">
          <Label>Support phone</Label>
          <Input
            onChange={(event) => setSupportPhone(event.target.value)}
            value={supportPhone}
          />
        </div>
        <div className="grid gap-1.5">
          <Label>Default district</Label>
          <Input
            onChange={(event) => setDefaultDistrict(event.target.value)}
            value={defaultDistrict}
          />
        </div>
        <Button className="mt-1 w-full" disabled={isSubmitting} type="submit">
          <Store />
          {isSubmitting ? "Creating shop…" : "Create shop"}
        </Button>
      </div>
    </form>
  );
}
