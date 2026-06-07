"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { IconTip } from "./ui/icon-tip";

export function CopyButton({
  value,
  label = "Copy",
  compact = false
}: {
  value: string;
  label?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    window.setTimeout(() => setCopied(false), 1400);
  }

  const button = (
    <Button
      onClick={copy}
      size={compact ? "icon-sm" : "sm"}
      type="button"
      variant={compact ? "ghost" : "secondary"}
    >
      {copied ? <Check /> : <Copy />}
      {!compact ? <span>{copied ? "Copied" : label}</span> : null}
    </Button>
  );

  return compact ? <IconTip label={label}>{button}</IconTip> : button;
}
