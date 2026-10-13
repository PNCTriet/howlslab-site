"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { DEMO_COPY, DEMO_PROJECTS } from "@/lib/demo-projects";

const font = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", var(--font-inter), Inter, sans-serif',
};

export function DemoShowcase() {
  const { lang } = useLanguage();
  const t = DEMO_COPY[lang];

  return (
    <div style={font} className="bg-white text-[#1d1d1f]">
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
        <Link href="/" className="text-[17px] font-semibold tracking-[-0.01em]">
          HOWLSLAB
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="text-[14px] text-[#424245] hover:text-[#1d1d1f]">
            {t.contact}
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <section className="rise mx-auto max-w-[1120px] px-6 pt-16 pb-16 text-center md:pt-24 md:pb-24">
        <p className="text-[14px] font-medium text-[#6e6e73] md:text-[17px]">{t.eyebrow}</p>
        <h1 className="mx-auto mt-4 max-w-[16em] text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[56px] lg:text-[72px]">
          {t.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-pretty text-[19px] leading-[1.45] text-[#6e6e73] md:text-[21px]">
          {t.lead}
        </p>
      </section>

      <ul className="mx-auto flex max-w-[1120px] flex-col gap-16 px-6 pb-24 md:gap-24">
        {DEMO_PROJECTS.map((p) => (
          <li key={p.slug} className="rounded-[32px] bg-[#f5f5f7] px-6 pt-10 pb-8 md:px-16 md:pt-16">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-[32px] font-semibold tracking-[-0.02em] md:text-[40px]">{p.name}</h2>
                <p className="mt-2 max-w-[36rem] text-[17px] leading-[1.47] text-[#424245] md:text-[19px]">
                  {p[lang]}
                </p>
              </div>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 shrink-0 items-center rounded-full bg-[#0071e3] px-6 text-[17px] text-white transition-colors duration-200 hover:bg-[#0077ed]"
                >
                  {t.open} ↗
                </a>
              ) : (
                <span className="inline-flex h-11 shrink-0 items-center rounded-full bg-black/[0.06] px-6 text-[15px] text-[#6e6e73]">
                  {t.soon}
                </span>
              )}
            </div>
            {p.hasMockups ? (
              <div className="relative mt-10 md:mt-16">
                <Image
                  src={`/demos/${p.slug}-macbook.webp`}
                  alt={`${p.name} — desktop`}
                  width={1840}
                  height={1180}
                  sizes="(min-width: 1120px) 900px, 90vw"
                  className="w-[88%] transition-transform duration-500 ease-out hover:-translate-y-1"
                />
                <Image
                  src={`/demos/${p.slug}-iphone.webp`}
                  alt={`${p.name} — mobile`}
                  width={956}
                  height={1864}
                  sizes="(min-width: 1120px) 220px, 24vw"
                  className="absolute right-0 bottom-0 w-[24%] transition-transform duration-500 ease-out hover:-translate-y-1"
                />
              </div>
            ) : (
              <div className="h-8" />
            )}
          </li>
        ))}
      </ul>

      <footer className="border-t border-black/10">
        <p className="mx-auto max-w-[1120px] px-6 py-8 text-[12px] text-[#6e6e73]">{t.footer}</p>
      </footer>
    </div>
  );
}
