"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IconTip } from "./ui/icon-tip";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }

  const label = isDark ? "Light mode" : "Dark mode";
  return (
    <IconTip label={label}>
      <Button
        aria-label={label}
        onClick={toggle}
        size="icon-sm"
        suppressHydrationWarning
        type="button"
        variant="ghost"
      >
        {mounted && !isDark ? <Moon /> : <Sun />}
      </Button>
    </IconTip>
  );
}
