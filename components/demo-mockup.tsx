"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { DEMO_COPY, type DemoProject } from "@/lib/demo-projects";

/** MacBook with an iPhone resting on its right edge, on a quiet light stage. */
export function DemoMockup({ demo, priority = false }: { demo: DemoProject; priority?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#f5f5f7] px-[8%] py-[6%]">
      <div className="relative w-full max-w-[520px]">
        <Image
          src={`/demos/${demo.slug}-macbook.webp`}
          alt={`${demo.name}, MacBook`}
          width={1840}
          height={1180}
          sizes="(min-width: 1024px) 520px, 90vw"
          priority={priority}
          className="h-auto w-[88%] drop-shadow-[0_18px_30px_rgba(0,0,0,0.12)]"
        />
        <Image
          src={`/demos/${demo.slug}-iphone.webp`}
          alt={`${demo.name}, iPhone`}
          width={956}
          height={1864}
          sizes="(min-width: 1024px) 120px, 22vw"
          priority={priority}
          className="absolute right-0 bottom-0 h-auto w-[22%] drop-shadow-[0_14px_24px_rgba(0,0,0,0.16)]"
        />
      </div>
    </div>
  );
}

export function DemoLink({ demo, small = false }: { demo: DemoProject; small?: boolean }) {
  const { lang } = useLanguage();
  const t = DEMO_COPY[lang];
  const cls = small ? "text-[13px] font-medium" : "text-[17px] font-medium";
  if (!demo.url) return <span className={`${cls} text-muted-foreground`}>{t.soon}</span>;
  return (
    <a
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} text-[#007aff] hover:underline`}
    >
      {t.open} ↗<span className="sr-only"> {demo.name}, {t.opensNewTab}</span>
    </a>
  );
}
