"use client";

import { usePathname } from "next/navigation";

/**
 * The home page is a single quiet column with its own minimal footer, so the
 * global header and footer step aside there. Every other route keeps them.
 */
export function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
