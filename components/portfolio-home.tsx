"use client";

import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { FeaturedProjects } from "@/components/featured-projects";
import { ProjectGrid } from "@/components/project-grid";
import { TextLink } from "@/components/text-link";
import { useLanguage } from "@/components/language-provider";
import type { ProjectCardData } from "@/lib/types";

export function PortfolioHome({ cards }: { cards: ProjectCardData[] }) {
  const { p } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="rise mx-auto max-w-[1120px] px-6 pt-16 pb-14 text-center md:pt-24 md:pb-20 lg:pt-28">
          <p className="text-[14px] font-medium text-ink-secondary md:text-[17px]">{p.eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-[14em] text-balance text-[36px] font-semibold leading-[1.05] tracking-[-0.032em] text-foreground sm:text-[56px] lg:text-[64px]">
            {p.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-pretty text-[19px] leading-[1.47] text-ink-secondary md:text-[21px]">
            {p.heroBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <AppleButton nativeButton={false} render={<Link href="#du-an" />}>
              {p.viewProjects}
            </AppleButton>
            <TextLink href="/contact">{p.contact}</TextLink>
          </div>
        </div>
      </section>

      <div id="du-an">
        <FeaturedProjects projects={cards} />
        <ProjectGrid projects={cards} />
      </div>

      <section id="ve-howl" aria-labelledby="about-heading" className="border-t border-border py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1120px] items-start gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <h2
              id="about-heading"
              className="max-w-[16ch] text-balance text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]"
            >
              {p.aboutTitle}
            </h2>
            <p className="mt-6 max-w-[40rem] text-[17px] leading-[1.47] text-ink-secondary md:text-[19px]">
              {p.aboutBody}
            </p>
          </div>
          <div className="howl-card p-8 md:p-10">
            <p className="text-[12px] font-medium text-muted-foreground">{p.contactKicker}</p>
            <p className="mt-3 text-[21px] font-semibold tracking-[-0.02em] text-foreground">
              {p.contactTitle}
            </p>
            <p className="mt-3 text-[17px] leading-[1.47] text-ink-secondary">{p.contactBody}</p>
            <div className="mt-6">
              <AppleButton nativeButton={false} render={<Link href="/contact" />}>
                {p.requestDemo}
              </AppleButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
