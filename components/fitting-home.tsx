"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { ALSO_BUILT, BOOK_CALL_HREF, TARGETS, TRY_ON_URL } from "@/lib/home-copy";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduceMotion = useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      data-shown={reduceMotion || shown ? "true" : "false"}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function FittingHome() {
  const { lang, t } = useLanguage();

  return (
    <div>
      <section id="product" aria-labelledby="product-heading" className="mx-auto max-w-[1120px] px-5 pt-16 pb-8 sm:px-6 md:pt-24 md:pb-12">
        <div className="rise max-w-[46rem]">
          <p className="text-[13px] font-medium tracking-[0.04em] text-ink-secondary">{t.eyebrow}</p>
          <h1
            id="product-heading"
            className="mt-3 text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[56px] lg:text-[68px]"
          >
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-[40rem] text-[17px] leading-[1.45] text-ink-secondary sm:text-[19px]">{t.heroBody}</p>
          <p className="mt-3 max-w-[40rem] text-[14px] leading-[1.45] text-muted-foreground">{t.partner}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={TRY_ON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-[15px] font-medium text-white transition-transform hover:bg-black/85 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {t.tryDemo}
              <span className="sr-only"> ({t.newTab})</span>
            </a>
            <a
              href={BOOK_CALL_HREF}
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[15px] font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)] outline outline-black/10 transition-transform hover:bg-white/80 active:scale-[0.98] dark:bg-card dark:outline-white/15"
            >
              {t.bookCall}
            </a>
          </div>
        </div>
      </section>

      <section id="how" aria-labelledby="how-heading" className="mx-auto max-w-[1120px] px-5 py-12 sm:px-6 md:py-16">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t.howKicker}</p>
          <h2 id="how-heading" className="mt-2 max-w-[16ch] text-[28px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]">
            {t.howTitle}
          </h2>
          <p className="mt-3 max-w-[36rem] text-[16px] leading-[1.45] text-ink-secondary">{t.howIntro}</p>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 70} className="h-full">
                <article className="lab-card h-full p-6 sm:p-7">
                  <p className="text-[12px] font-semibold tracking-[0.08em] text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-foreground">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.45] text-ink-secondary">{step.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section id="targets" aria-labelledby="targets-heading" className="mx-auto max-w-[1120px] px-5 py-12 sm:px-6 md:py-16">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t.targetsKicker}</p>
          <h2 id="targets-heading" className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]">
            {t.targetsTitle}
          </h2>
          <p className="mt-3 max-w-[36rem] text-[16px] leading-[1.45] text-ink-secondary">{t.targetsIntro}</p>
        </Reveal>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {TARGETS.map((item, index) => (
            <li key={item.text}>
              <Reveal delay={index * 70} className="h-full">
                <article className="lab-card flex h-full flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] text-white uppercase dark:bg-white dark:text-black">
                      {t.targetBadge}
                    </span>
                    <span className="text-[13px] font-medium text-foreground tabular-nums">{item.date}</span>
                  </div>
                  <p className="mt-5 text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-foreground">{item.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-muted-foreground">{t.targetsNote}</p>
      </section>

      <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-[1120px] px-5 py-12 sm:px-6 md:py-16">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t.workKicker}</p>
          <h2 id="work-heading" className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]">
            {t.workTitle}
          </h2>
          <p className="mt-3 max-w-[38rem] text-[16px] leading-[1.45] text-ink-secondary">{t.workIntro}</p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {ALSO_BUILT.map((item, index) => {
            const text = item[lang];
            const inner = (
              <>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">{text.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.45] text-ink-secondary">{text.body}</p>
                {item.href ? <p className="mt-4 text-[13px] font-medium text-link">{t.viewCase}</p> : null}
              </>
            );
            return (
              <li key={text.title}>
                <Reveal delay={index * 60} className="h-full">
                  {item.href ? (
                    <Link href={item.href} className="lab-card block h-full p-6 transition-transform hover:-translate-y-0.5">
                      {inner}
                    </Link>
                  ) : (
                    <article className="lab-card h-full p-6">{inner}</article>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-4 px-5 py-12 sm:px-6 md:py-16 lg:grid-cols-2">
        <Reveal>
          <article id="about" aria-labelledby="about-heading" className="lab-card h-full p-6 sm:p-8">
            <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t.aboutKicker}</p>
            <h2 id="about-heading" className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-foreground">
              {t.aboutTitle}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-ink-secondary">{t.aboutBody}</p>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article id="contact" aria-labelledby="contact-heading" className="lab-card h-full p-6 sm:p-8">
            <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t.contactKicker}</p>
            <h2 id="contact-heading" className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-foreground">
              {t.contactTitle}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-ink-secondary">{t.contactBody}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={`mailto:${site.contactEmail}`} className="text-[15px] font-medium text-link hover:underline">
                {site.contactEmail}
              </a>
              <a href={BOOK_CALL_HREF} className="text-[15px] font-medium text-foreground hover:underline">
                {t.bookCall}
              </a>
            </div>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
