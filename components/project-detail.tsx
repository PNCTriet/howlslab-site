"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AppleDevicePair } from "@/components/apple-device-pair";
import { DemoAction } from "@/components/demo-action";
import { ProjectCard } from "@/components/project-card";
import { ProjectImage } from "@/components/project-image";
import { StatusLabel } from "@/components/status-label";
import { useLanguage } from "@/components/language-provider";
import { demoForProject } from "@/lib/demo-projects";
import { PROJECT_EN } from "@/lib/project-en";
import type { Project, ProjectCardData } from "@/lib/types";

function Paragraphs({ source, empty }: { source: string; empty: string }) {
  const blocks = source
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  if (blocks.length === 0) {
    return <p className="text-[17px] text-ink-secondary">{empty}</p>;
  }
  return (
    <div className="case-study">
      {blocks.map((block) => (
        <p key={block}>{block}</p>
      ))}
    </div>
  );
}

export function ProjectDetail({
  project,
  related,
}: {
  project: Project;
  related: ProjectCardData[];
}) {
  const { lang, p } = useLanguage();
  const en = PROJECT_EN[project.slug];
  const title = lang === "en" && en ? en.title : project.title;
  const summary = lang === "en" && en ? en.summary : project.summary;
  const tags = lang === "en" && en ? en.tags : project.tags;
  const features = lang === "en" && en ? en.features : project.features;
  const body = lang === "en" && en ? en.body : project.body;
  const gallery =
    lang === "en" && en
      ? project.gallery.map((image, index) => ({
          ...image,
          alt: en.gallery[index]?.alt ?? image.alt,
          caption: en.gallery[index]?.caption ?? image.caption,
        }))
      : project.gallery;
  const demo = demoForProject(project.slug);
  const screens = demo?.screens;
  const tech = project.tech.length > 0 ? project.tech.join(", ") : p.comingSoon;
  const showClient = Boolean(project.client) && !project.hideClient;
  const live = project.status === "live" && Boolean(project.demoUrl);

  return (
    <article>
      <div className="mx-auto max-w-[1120px] px-6 pt-8">
        <Link
          href="/#du-an"
          className="inline-flex items-center gap-1 text-[14px] text-link hover:underline"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          {p.backToProjects}
        </Link>
      </div>

      <header className="mx-auto max-w-[760px] px-6 pt-10 pb-12 text-center md:pt-16">
        <StatusLabel status={project.status} />
        <h1 className="mt-4 text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[56px]">
          {title}
        </h1>
        <p className="mt-5 text-[19px] leading-[1.47] text-ink-secondary md:text-[21px]">{summary}</p>
        {tags.length > 0 ? (
          <p className="mt-4 text-[14px] text-muted-foreground">{tags.join(" · ")}</p>
        ) : null}
        <div className="mt-8 flex justify-center">
          <DemoAction project={{ ...project, title }} prominent />
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-6">
        {screens ? (
          <div className="howl-card overflow-hidden bg-[#f5f5f7] px-4 py-8 sm:px-8 md:px-12 md:py-14">
            <AppleDevicePair
              macScreen={screens.macbook}
              phoneScreen={screens.iphone}
              macAlt={p.macAlt(title)}
              phoneAlt={p.phoneAlt(title)}
              priority
            />
          </div>
        ) : (
          <>
            <p className="text-center text-[12px] text-muted-foreground">{p.placeholderNote}</p>
            {gallery.length > 0 ? (
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {gallery.map((image, index) => (
                  <li key={image.src} className={index === 0 ? "md:col-span-2" : undefined}>
                    <figure className="howl-card overflow-hidden">
                      <div className="relative aspect-[16/10]">
                        <ProjectImage
                          src={image.src}
                          alt={image.alt}
                          sizes={
                            index === 0
                              ? "(min-width: 1120px) 1072px, 100vw"
                              : "(min-width: 1120px) 520px, 100vw"
                          }
                          priority={index === 0}
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-center text-[12px] leading-[1.33] text-muted-foreground">
                        {image.caption}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-center text-[17px] text-ink-secondary">{p.noShots}</p>
            )}
          </>
        )}
      </div>

      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
          {p.overview}
        </h2>
        <div className="mt-6">
          <Paragraphs source={body} empty={p.comingSoon} />
        </div>

        <h2 className="mt-16 text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
          {p.features}
        </h2>
        {features.length > 0 ? (
          <ol className="mt-6 divide-y divide-border border-y border-border">
            {features.map((feature, index) => (
              <li key={feature} className="flex gap-6 py-5">
                <span className="w-8 text-[14px] text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[21px] tracking-[-0.015em] text-foreground">{feature}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-6 text-[17px] text-ink-secondary">{p.comingSoon}</p>
        )}

        <h2 className="mt-16 text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
          {p.facts}
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-8 md:grid-cols-3">
          <div>
            <dt className="text-[12px] text-muted-foreground">{p.year}</dt>
            <dd className="mt-1 text-[17px] text-foreground">{project.year ?? p.comingSoon}</dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted-foreground">{p.status}</dt>
            <dd className="mt-1 text-[17px] text-foreground">
              {project.status === "live" ? p.statusLive : p.statusOlder}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted-foreground">{p.tech}</dt>
            <dd className="mt-1 text-[17px] text-foreground">{tech}</dd>
          </div>
          {showClient ? (
            <div>
              <dt className="text-[12px] text-muted-foreground">{p.client}</dt>
              <dd className="mt-1 text-[17px] text-foreground">{project.client}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <section className="py-16 md:py-24">
        <div className="howl-card mx-auto max-w-[720px] px-6 py-12 text-center md:px-10">
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            {live ? p.liveCta : p.closedCta}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary">
            {live ? p.liveCtaBody : p.closedCtaBody}
          </p>
          <div className="mt-8 flex justify-center">
            <DemoAction project={{ ...project, title }} prominent />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="py-16 md:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            <h2
              id="related-heading"
              className="text-[32px] font-semibold tracking-[-0.02em] text-foreground"
            >
              {p.related}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
