"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const linkClass =
  "rounded-full px-2 py-2 text-[13px] text-foreground/80 transition-colors hover:text-foreground sm:px-2.5 sm:text-[14px]";

export function NavLinks() {
  const { t } = useLanguage();
  const links = [
    { href: "/#product", label: t.navProduct },
    { href: "/#targets", label: t.navTargets },
    { href: "/#work", label: t.navWork },
    { href: "/#contact", label: t.navContact },
  ];

  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
