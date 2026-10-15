"use client";

import { usePathname } from "next/navigation";

/** The dock and Fitting Lab drafts bring their own chrome, so the global header and footer step aside. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/demo/dock" || pathname === "/demo/fitting") return null;
  return children;
}
