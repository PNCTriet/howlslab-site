"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <span className="inline-flex size-11" aria-hidden="true" />;
  }

  const dark = resolvedTheme === "dark";
  const label = dark ? "Bật giao diện sáng" : "Bật giao diện tối";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-11 rounded-full"
      aria-label={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
