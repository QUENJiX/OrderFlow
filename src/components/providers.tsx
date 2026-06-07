"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return <TooltipProvider delayDuration={200}>{children}</TooltipProvider>;
}
