"use client";

import { Download, MoonStar, PackageSearch, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "./ui/command";
import { Kbd } from "./ui/kbd";
import { merchantNavItems } from "./merchant-nav";

export function CommandTrigger({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:border-border-strong hover:text-foreground",
        className
      )}
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      type="button"
    >
      <Search className="size-4" />
      <span className="hidden md:inline">Search…</span>
      <Kbd className="ml-2 hidden md:inline-flex">⌘K</Kbd>
    </button>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pendingG = useRef(false);
  const gTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      // ⌘K / Ctrl+K toggles the palette from anywhere.
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      // Ignore shortcuts while typing or when the palette is open.
      const el = event.target as HTMLElement | null;
      const typing =
        !!el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.isContentEditable);
      if (open || typing || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      // "/" opens search.
      if (event.key === "/") {
        event.preventDefault();
        setOpen(true);
        return;
      }

      // "g" then a nav key jumps to a screen (e.g. g o → Orders).
      if (event.key.toLowerCase() === "g") {
        pendingG.current = true;
        window.clearTimeout(gTimer.current);
        gTimer.current = window.setTimeout(() => {
          pendingG.current = false;
        }, 1200);
        return;
      }
      if (pendingG.current) {
        pendingG.current = false;
        const pressed = event.key.toLowerCase();
        const item = merchantNavItems.find(
          (navItem) => navItem.shortcut.toLowerCase() === pressed
        );
        if (item) {
          event.preventDefault();
          router.push(item.href);
        }
      }
    }
    function onOpen() {
      setOpen(true);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [open, router]);

  function run(action: () => void) {
    setOpen(false);
    action();
  }

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search or jump to…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {merchantNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.href}
                onSelect={() => run(() => router.push(item.href))}
                value={`go ${item.label}`}
              >
                <Icon className="text-muted-foreground" />
                <span>{item.label}</span>
                <CommandShortcut>G {item.shortcut}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              run(() => {
                window.location.href = "/api/orders/export";
              })
            }
            value="export courier csv"
          >
            <Download className="text-muted-foreground" />
            <span>Export courier CSV</span>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => router.push("/merchant/orders"))}
            value="find order"
          >
            <PackageSearch className="text-muted-foreground" />
            <span>Find an order</span>
          </CommandItem>
          <CommandItem onSelect={() => run(toggleTheme)} value="toggle theme">
            <MoonStar className="text-muted-foreground" />
            <span>Toggle theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
