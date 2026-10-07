"use client";

import { useLanguage } from "@/components/language-provider";
import type { Lang } from "@/lib/home-copy";
import { cn } from "@/lib/utils";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
];

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.langGroup}
      className="inline-flex rounded-full bg-black/[0.06] p-0.5 dark:bg-white/10"
    >
      {options.map((option) => {
        const selected = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            aria-pressed={selected}
            onClick={() => setLang(option.code)}
            className={cn(
              "h-7 min-w-9 rounded-full px-2 text-[12px] font-semibold tracking-[0.04em]",
              selected
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
