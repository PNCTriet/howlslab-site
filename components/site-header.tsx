"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { NavLinks } from "@/components/nav-links";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-nav backdrop-blur-xl backdrop-saturate-150">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-[14px] focus:text-foreground"
      >
        {t.skip}
      </a>
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 sm:px-6 lg:h-14 lg:flex-nowrap lg:py-0">
        <Link href="/" className="mr-auto flex items-center gap-2.5 text-foreground">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-[4px] bg-black text-[13px] font-semibold text-white"
          >
            H
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.03em]">HOWLSLAB</span>
        </Link>
        <nav aria-label={t.navLabel} className="order-3 flex w-full flex-wrap items-center lg:order-2 lg:w-auto">
          <NavLinks />
        </nav>
        <div className="order-2 flex items-center gap-1 lg:order-3">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
