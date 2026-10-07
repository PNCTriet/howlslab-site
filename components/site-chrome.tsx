"use client";

import { usePathname } from "next/navigation";

/** Homepage and the dock draft bring their own chrome, so the global header and footer step aside. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/demo/dock") return null;
  return children;
}
