import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-nav backdrop-blur-xl backdrop-saturate-150">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-[14px] focus:text-foreground"
      >
        Đi tới nội dung
      </a>
      <div className="mx-auto flex h-12 max-w-[1120px] items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-foreground">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-[8px] bg-black text-[13px] font-semibold text-white dark:bg-white dark:text-black"
          >
            H
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.03em]">HOWL LAB</span>
        </Link>
        <nav aria-label="Chính" className="flex items-center">
          <NavLinks />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
