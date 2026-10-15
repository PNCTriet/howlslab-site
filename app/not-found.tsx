"use client";

import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { useLanguage } from "@/components/language-provider";

export default function NotFound() {
  const { p } = useLanguage();
  return (
    <div className="mx-auto max-w-[640px] px-6 py-24 text-center md:py-36">
      <p className="text-[14px] font-medium text-ink-secondary">404</p>
      <h1 className="mt-3 text-[40px] font-semibold tracking-[-0.025em] text-foreground md:text-[56px]">
        {p.notFoundTitle}
      </h1>
      <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary">{p.notFoundBody}</p>
      <div className="mt-8 flex justify-center">
        <AppleButton nativeButton={false} render={<Link href="/" />}>{p.notFoundHome}</AppleButton>
      </div>
    </div>
  );
}
