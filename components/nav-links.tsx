"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const linkClass =
  "rounded-full px-2 py-2 text-[13px] text-foreground/80 transition-colors hover:text-foreground sm:px-3 sm:text-[14px]";

export function NavLinks() {
  const pathname = usePathname();
  const onContact = pathname === "/contact";

  return (
    <>
      <Link href="/#du-an" className={linkClass}>
        Dự án
      </Link>
      <Link
        href="/contact"
        className={cn(linkClass, onContact && "font-medium text-foreground")}
        aria-current={onContact ? "page" : undefined}
      >
        Liên hệ
      </Link>
    </>
  );
}
