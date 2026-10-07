"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-5 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">HOWLSLAB</p>
          <p className="mt-2 max-w-[32ch] text-[13px] leading-[1.45] text-muted-foreground">{t.footerBlurb}</p>
          <a className="mt-3 inline-block text-[13px] text-link hover:underline" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
        </div>
        <nav aria-label={t.footerNav}>
          <ul className="space-y-2 text-[13px]">
            <li>
              <Link href="/#product" className="text-link hover:underline">
                {t.navProduct}
              </Link>
            </li>
            <li>
              <Link href="/#work" className="text-link hover:underline">
                {t.navWork}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-link hover:underline">
                {t.contactPage}
              </Link>
            </li>
            <li>
              <Link href="/demo" className="text-link hover:underline">
                {t.earlier}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-[1120px] border-t border-border px-5 py-6 sm:px-6">
        <p className="text-[12px] leading-[1.4] text-muted-foreground">© 2026 HOWLSLAB · Ho Chi Minh City</p>
      </div>
    </footer>
  );
}
