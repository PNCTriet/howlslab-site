"use client";

import { usePathname } from "next/navigation";

/** The dock draft has its own footer, so the global chrome steps aside there. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/demo/dock") return null;
  return children;
}
