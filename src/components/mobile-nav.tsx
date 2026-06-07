"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { MerchantNav } from "./merchant-nav";

export function MobileNav({
  shopName,
  plan
}: {
  shopName: string;
  plan: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation"
          className="lg:hidden"
          size="icon-sm"
          variant="ghost"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-72 gap-0 bg-sidebar p-0 text-sidebar-foreground"
        side="left"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4">
          <span className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-dark)] text-xs font-bold text-primary-foreground">
            OF
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{shopName}</div>
            <div className="text-xs capitalize text-muted-foreground">
              {plan} plan
            </div>
          </div>
        </div>
        <div className="p-3" onClick={() => setOpen(false)} role="presentation">
          <MerchantNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
