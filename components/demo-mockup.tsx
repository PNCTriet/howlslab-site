"use client";

import { useLanguage } from "@/components/language-provider";
import { DEMO_COPY, type DemoProject } from "@/lib/demo-projects";

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
