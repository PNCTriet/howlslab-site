"use client";

import { Fragment, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { DeviceShowcase } from "@/components/home-proposal/devices";
import { hand } from "@/components/home-proposal/fonts";
import { LoopArrow, Marker, Pill, Sel, Squiggle } from "@/components/home-proposal/ornaments";
import { ALSO_BUILT, BOOK_CALL_HREF, TARGETS, TRY_ON_URL } from "@/lib/home-copy";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const SW = 1.75;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const pad = (i: number) => String(i + 1).padStart(2, "0");

function HeroTitle({ text }: { text: string }) {
  const words = text.split(" ");
  let i = words.findIndex((w) => /\d/.test(w));
  if (i < 0) i = words.length - 1;
  let tail = words.slice(i).join(" ");
  let rest: string[] = [];
  if (tail.length > 14) {
    tail = words[i];
    rest = words.slice(i + 1);
  }
  return (
    <>
      {words.slice(0, i).map((w, k) => (
        <Fragment key={k}>
          <span className="whitespace-nowrap">{w}</span>{" "}
        </Fragment>
      ))}
      <Marker>{tail}</Marker>
      {rest.map((w, k) => (
        <Fragment key={k}>
          {" "}
          <span className="whitespace-nowrap">{w}</span>
        </Fragment>
      ))}
    </>
  );
}

/** Scroll engine from the HowlsOS proposal page: one passive listener, rAF-throttled. */
function useScrollScenes() {
  useEffect(() => {
    const root = document.documentElement;
    const bar = document.querySelector<HTMLElement>("[data-pv-bar]");
    const end = document.querySelector<HTMLElement>("[data-pv-end]");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--p", max > 0 ? clamp01(window.scrollY / max).toFixed(4) : "0");
      for (const el of scenes) {
        const r = el.getBoundingClientRect();
        const p =
          el.dataset.scene === "pin"
            ? -r.top / Math.max(1, r.height - vh)
            : (vh * 0.7 - r.top) / Math.max(1, r.height * 0.75);
        el.style.setProperty("--p", clamp01(p).toFixed(4));
      }
      if (bar) {
        const endTop = end?.getBoundingClientRect().top ?? Infinity;
        bar.dataset.show = window.scrollY > vh * 0.6 && endTop > vh * 0.85 ? "1" : "0";
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      root.style.removeProperty("--p");
    };
  }, []);
}

function SectionHead({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p data-reveal className="pv-eyebrow text-primary">
        {eyebrow}
      </p>
      <h2 data-reveal style={{ "--d": 1 } as React.CSSProperties} className="pv-title mt-3">
        {title}
      </h2>
      {sub ? (
        <p data-reveal style={{ "--d": 2 } as React.CSSProperties} className="pv-lead mt-4 text-muted-foreground">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function LangToggle() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.langGroup} className="pv-lang shrink-0">
      {(["vi", "en"] as const).map((code) => (
        <button key={code} type="button" lang={code} aria-pressed={lang === code} onClick={() => setLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function FittingHome() {
  const { lang, t } = useLanguage();
  useScrollScenes();

  const howTitle =
    lang === "en" ? (
      <>
        A room. A link.<span className="pv-tone2"><Sel>A lead</Sel>.</span>
      </>
    ) : (
      <>
        Phòng demo. Một link.<span className="pv-tone2"><Sel>Một lead</Sel>.</span>
      </>
    );
  const workTitle =
    lang === "en" ? (
      <>
        Also <Squiggle>built</Squiggle> by the lab.
      </>
    ) : (
      <>
        Lab cũng đã <Squiggle>làm</Squiggle>.
      </>
    );
  const targetsTitle =
    lang === "en" ? (
      <>
        Roadmap & <Pill invert>pilot targets</Pill>.
      </>
    ) : (
      <>
        Lộ trình và <Pill invert>mục tiêu pilot</Pill>.
      </>
    );
  const aboutTitle =
    lang === "en" ? (
      <>
        Founded in <Marker>2025</Marker>.
      </>
    ) : (
      <>
        Thành lập năm <Marker>2025</Marker>.
      </>
    );
  const finalTitle =
    lang === "en" ? (
      <>
        Talk to the <Squiggle>lab</Squiggle>.
      </>
    ) : (
      <>
        Nói chuyện với <Squiggle>lab</Squiggle>.
      </>
    );

  const demo = (className?: string) => (
    <a href={TRY_ON_URL} target="_blank" rel="noopener noreferrer" className={cn("pv-btn pv-btn-primary", className)}>
      {t.tryDemo}
      <span className="sr-only"> ({t.newTab})</span>
    </a>
  );
  const book = (className?: string) => (
    <a href={BOOK_CALL_HREF} className={cn("pv-btn pv-btn-ghost", className)}>
      {t.bookCall}
    </a>
  );

  return (
    <div className={cn("pv min-h-dvh", hand.variable)}>
      <div aria-hidden className="pv-progress fixed inset-x-0 top-0 z-50 h-[2px] bg-primary" />

      <header className="fixed inset-x-0 top-3 z-40 px-3">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:absolute focus:top-14 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          {t.skip}
        </a>
        <div className="pv-glass mx-auto flex h-12 max-w-[760px] items-center gap-3 rounded-full pr-1.5 pl-5">
          <Link href="/" className="shrink-0 text-[15px] font-semibold tracking-[-0.2px]">
            HOWLSLAB
          </Link>
          <span aria-hidden className="hidden h-4 w-px shrink-0 bg-foreground/15 sm:block" />
          <span className="hidden truncate text-[13px] text-muted-foreground sm:block">{t.navAudience}</span>
          <div className="flex-1" />
          <LangToggle />
          <a href={BOOK_CALL_HREF} className="pv-btn pv-btn-sm hidden text-primary hover:bg-primary/10 md:inline-flex">
            {t.bookCall}
          </a>
          <a
            href={TRY_ON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pv-btn pv-btn-sm pv-btn-primary shrink-0"
          >
            {t.tryDemo}
            <span className="sr-only"> ({t.newTab})</span>
          </a>
        </div>
      </header>

      <div id="product">
        <section data-scene="pin" className="relative h-[140svh]">
          <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-5 pt-16 pb-8">
            <div className="pv-hero-stage w-full max-w-[1240px] text-center">
              <div className="pv-in pv-brand">
                <span aria-hidden className="pv-brand-icon" />
                <span className="pv-hand pv-brand-word">HOWLSLAB</span>
              </div>
              <p className="pv-eyebrow pv-in mt-7 text-primary" style={{ "--d": 1 } as React.CSSProperties}>
                {t.eyebrow}
              </p>
              <h1 className="pv-hero pv-in mx-auto mt-3 max-w-[11ch] sm:max-w-[14ch]" style={{ "--d": 1 } as React.CSSProperties}>
                <HeroTitle key={lang} text={t.heroTitle} />
              </h1>
              <p
                className="pv-lead pv-in mx-auto mt-6 max-w-[34ch] text-muted-foreground sm:max-w-[46ch]"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                {t.heroBody}
              </p>
              <p className="pv-in mx-auto mt-3 max-w-[42ch] text-[15px] leading-snug text-muted-foreground" style={{ "--d": 2 } as React.CSSProperties}>
                {t.partner}
              </p>

              <div className="pv-in relative mt-9 sm:mt-16" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="pv-cta-note">
                  <span className="pv-hand pv-note">{t.heroNote}</span>
                  <LoopArrow />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {demo()}
                  {book()}
                </div>
              </div>
              <p
                className="pv-in mx-auto mt-6 flex max-w-[520px] flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px] text-muted-foreground"
                style={{ "--d": 4 } as React.CSSProperties}
              >
                <span className="font-semibold text-foreground">Howls Lab</span>
                <span aria-hidden>·</span>
                <span>2025</span>
                <span aria-hidden>·</span>
                <span>Triết · Đông</span>
              </p>
            </div>
            <ArrowDown
              aria-hidden
              strokeWidth={SW}
              className="pv-in absolute bottom-6 left-1/2 size-5 -translate-x-1/2 text-muted-foreground"
              style={{ "--d": 6 } as React.CSSProperties}
            />
          </div>
        </section>

        <section
          id="how"
          className="relative z-10 -mt-[30svh] rounded-t-[32px] bg-[var(--pv-tile)] px-5 pt-24 pb-16 sm:rounded-t-[44px] sm:pt-32 sm:pb-24"
        >
          <SectionHead className="text-center" eyebrow={t.howKicker} title={howTitle} sub={t.howIntro} />
          <div className="mt-12 sm:mt-16">
            <DeviceShowcase desktopAlt={t.desktopAlt} mobileAlt={t.mobileAlt} />
          </div>
          <ol className="mx-auto mt-14 grid max-w-[1080px] gap-4 sm:mt-20 sm:gap-5 md:grid-cols-2">
            {t.steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--d": i } as React.CSSProperties}
                className="relative rounded-[28px] bg-[var(--pv-raised)] p-7 sm:p-8"
              >
                <span className="text-[15px] font-semibold text-primary tabular">{pad(i)}</span>
                <div className="pv-card-title mt-6">{step.title}</div>
                <p className="pv-body mt-2 text-muted-foreground">{step.body}</p>
                {i < t.steps.length - 1 ? (
                  <ArrowRight aria-hidden strokeWidth={SW} className="absolute top-8 right-7 size-5 text-muted-foreground max-md:rotate-90" />
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="relative z-10 bg-[var(--pv-canvas)] px-5 py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHead eyebrow={t.workKicker} title={workTitle} sub={t.workIntro} />
            </div>
            <ul className="grid gap-4 sm:gap-5">
              {ALSO_BUILT.map((item, i) => {
                const text = item[lang];
                const inner = (
                  <>
                    <span className="text-[15px] font-semibold text-primary tabular">{pad(i)}</span>
                    <span className="min-w-0">
                      <span className="pv-card-title block text-balance">{text.title}</span>
                      <span className="pv-body mt-2 block text-muted-foreground">{text.body}</span>
                      {item.href ? <span className="mt-4 block text-[15px] font-medium text-primary">{t.viewCase}</span> : null}
                    </span>
                  </>
                );
                return (
                  <li key={text.title} data-reveal style={{ "--d": i % 2 } as React.CSSProperties}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex min-h-[160px] flex-col justify-between gap-8 rounded-[28px] bg-[var(--pv-tile)] p-7 sm:min-h-[200px] sm:p-10"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <article className="flex min-h-[160px] flex-col justify-between gap-8 rounded-[28px] bg-[var(--pv-tile)] p-7 sm:min-h-[200px] sm:p-10">
                        {inner}
                      </article>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="targets" className="relative z-10 bg-[var(--pv-dark)] px-5 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center">
              <p data-reveal className="pv-eyebrow text-[#2997ff]">
                {t.targetsKicker}
              </p>
              <h2 data-reveal style={{ "--d": 1 } as React.CSSProperties} className="pv-title mt-3">
                {targetsTitle}
              </h2>
              <p data-reveal style={{ "--d": 2 } as React.CSSProperties} className="pv-lead mx-auto mt-4 max-w-[36rem] text-[#a1a1a6]">
                {t.targetsIntro}
              </p>
            </div>

            <div data-scene="view" className="relative mt-16 sm:mt-24">
              <div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-[2px] rounded-full bg-white/15 lg:block">
                <div className="pv-fill-x h-full rounded-full bg-[#2997ff]" />
              </div>
              <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-[2px] rounded-full bg-white/15 lg:hidden">
                <div className="pv-fill-y h-full w-full rounded-full bg-[#2997ff]" />
              </div>
              <ol
                className="relative grid gap-4 lg:gap-8 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
                style={{ "--n": TARGETS.length } as React.CSSProperties}
              >
                {TARGETS.map((item, i) => (
                  <li key={item.text} data-reveal style={{ "--d": i } as React.CSSProperties} className="relative pl-10 lg:pt-12 lg:pl-0">
                    <span aria-hidden className="absolute top-0.5 left-0 size-4 rounded-full border-2 border-[#2997ff] bg-[var(--pv-dark)] lg:top-0" />
                    <article className="rounded-[28px] bg-white/[0.06] p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-black uppercase">
                          {t.targetBadge}
                        </span>
                        <span className="text-[13px] font-semibold text-[#2997ff] tabular">{item.date}</span>
                      </div>
                      <p className="pv-card-title mt-6 text-balance">{item.text}</p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
            <p data-reveal className="mt-8 text-center text-[15px] text-[#a1a1a6]">
              {t.targetsNote}
            </p>
          </div>
        </section>

        <section id="about" className="relative z-10 bg-[var(--pv-canvas)] px-5 py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHead eyebrow={t.aboutKicker} title={aboutTitle} sub={t.aboutBody} />
            </div>
            <div data-reveal className="rounded-[28px] bg-[var(--pv-tile)] p-7 sm:p-10">
              <p className="pv-eyebrow text-primary">{t.contactKicker}</p>
              <h2 className="pv-card-title mt-3">{t.contactTitle}</h2>
              <p className="pv-body mt-4 text-muted-foreground">{t.contactBody}</p>
              <a href={`mailto:${site.contactEmail}`} className="pv-stat mt-8 block text-primary">
                {site.contactEmail}
              </a>
              <div className="mt-8">{book()}</div>
            </div>
          </div>
        </section>

        <section data-pv-end id="contact" className="relative z-10 bg-[var(--pv-canvas)] px-5 pt-28 pb-16 text-center sm:pt-40">
          <h2 data-reveal className="pv-hero mx-auto max-w-[12ch] text-[clamp(48px,7vw,96px)]">
            {finalTitle}
          </h2>
          <p data-reveal style={{ "--d": 1 } as React.CSSProperties} className="pv-lead mt-8 text-muted-foreground">
            <a href={`mailto:${site.contactEmail}`} className="font-semibold text-foreground">
              {site.contactEmail}
            </a>
          </p>
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {demo()}
            {book()}
          </div>
          <footer className="mt-28 text-[12px] text-muted-foreground sm:mt-36">© 2026 HOWLSLAB · Ho Chi Minh City</footer>
        </section>
      </div>

      <div
        data-pv-bar
        data-show="0"
        className="pv-bar pv-glass fixed inset-x-3 z-40 flex items-center gap-3 rounded-[24px] py-2.5 pr-2.5 pl-5 md:hidden"
        style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] text-muted-foreground">Fitting Lab</div>
          <a href={`mailto:${site.contactEmail}`} className="block truncate text-[15px] font-semibold tracking-[-0.02em]">
            {site.contactEmail}
          </a>
        </div>
        <a href={TRY_ON_URL} target="_blank" rel="noopener noreferrer" className="pv-btn pv-btn-primary h-11 shrink-0 px-5 text-[15px]">
          {t.tryDemo}
          <span className="sr-only"> ({t.newTab})</span>
        </a>
      </div>
    </div>
  );
}
