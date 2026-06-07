import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "./sparkline";

export function Stat({
  label,
  value,
  detail,
  icon,
  delta,
  spark,
  className
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  icon?: ReactNode;
  delta?: { value: string; direction: "up" | "down" | "flat" };
  spark?: number[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-strong",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {icon ? (
          <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
        ) : null}
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="font-mono text-[26px] font-semibold leading-none tabular-nums">
          {value}
        </span>
        {spark ? <Sparkline data={spark} className="text-primary/70 shrink-0" /> : null}
      </div>
      <div className="mt-2 flex items-center gap-2">
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              delta.direction === "up" && "text-[var(--success)]",
              delta.direction === "down" && "text-[var(--danger)]",
              delta.direction === "flat" && "text-muted-foreground"
            )}
          >
            {delta.direction === "up" ? <ArrowUpRight className="size-3.5" /> : null}
            {delta.direction === "down" ? (
              <ArrowDownRight className="size-3.5" />
            ) : null}
            {delta.value}
          </span>
        ) : null}
        {detail ? (
          <span className="truncate text-xs text-muted-foreground">{detail}</span>
        ) : null}
      </div>
    </div>
  );
}
