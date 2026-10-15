"use client";

import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/types";

export function StatusLabel({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const { p } = useLanguage();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-normal",
        status === "live"
          ? "bg-[#007aff]/10 text-[#007aff] dark:bg-[#0a84ff]/15 dark:text-[#0a84ff]"
          : "bg-black/[0.05] text-muted-foreground dark:bg-white/10",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "live" ? "bg-[#34c759]" : "bg-current opacity-50",
        )}
        aria-hidden="true"
      />
      {status === "live" ? p.statusLive : p.statusOlder}
    </span>
  );
}
