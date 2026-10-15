"use client";

import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { DemoAction } from "@/components/demo-action";
import { ProjectImage } from "@/components/project-image";
import { StatusLabel } from "@/components/status-label";
import { DemoLink } from "@/components/demo-mockup";
import { useLanguage } from "@/components/language-provider";
import { demoForProject } from "@/lib/demo-projects";
import { PROJECT_EN } from "@/lib/project-en";
import type { ProjectCardData } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: ProjectCardData[] }) {
  const { p } = useLanguage();
  const featured = projects.filter((project) => project.featured && project.status === "live");
  const lead = featured[0];
  if (!lead) return null;
  const rest = featured.slice(1);

  return (
    <section aria-labelledby="featured-heading" className="py-16 md:py-20">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2
          id="featured-heading"
          className="text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]"
        >
          {p.featuredTitle}
        </h2>
        <p className="mt-3 max-w-[36rem] text-[17px] leading-[1.47] text-ink-secondary">{p.featuredBody}</p>
        <div className="mt-10 flex flex-col gap-6 md:mt-12">
          <FeaturedLead project={lead} />
          {rest.length > 0 ? (
            <ul className="grid gap-6 lg:grid-cols-2">
              {rest.map((project) => (
                <li key={project.slug}>
                  <FeaturedTile project={project} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function useCardCopy(project: ProjectCardData) {
  const { lang } = useLanguage();
  const en = PROJECT_EN[project.slug];
  if (lang === "vi" || !en) return { title: project.title, summary: project.summary };
  return { title: en.title, summary: en.summary };
}

function FeaturedLead({ project }: { project: ProjectCardData }) {
  const { p } = useLanguage();
  const copy = useCardCopy(project);
  const demo = demoForProject(project.slug);
  return (
    <article className="howl-card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <StatusLabel status={project.status} />
          <h3 className="mt-4 text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            <Link href={`/projects/${project.slug}`} className="hover:underline">
              {copy.title}
            </Link>
          </h3>
          <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary md:text-[19px]">{copy.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AppleButton nativeButton={false} render={<Link href={`/projects/${project.slug}`} />}>
              {p.learnMore}
            </AppleButton>
            {demo ? <DemoLink demo={demo} /> : <DemoAction project={{ ...project, title: copy.title }} />}
          </div>
        </div>
        <div className="relative aspect-[16/9] bg-[#f5f5f7]">
          <ProjectImage
            src={project.cover}
            alt={p.coverAlt(copy.title, project.cover.endsWith(".webp"))}
            sizes="(min-width: 1024px) 560px, 100vw"
            priority
          />
        </div>
      </div>
    </article>
  );
}

function FeaturedTile({ project }: { project: ProjectCardData }) {
  const copy = useCardCopy(project);
  const { p } = useLanguage();
  const demo = demoForProject(project.slug);
  return (
    <article className="howl-card grid h-full overflow-hidden sm:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-8">
        <StatusLabel status={project.status} />
        <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.02em] text-foreground">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {copy.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[17px] leading-[1.47] text-ink-secondary">{copy.summary}</p>
        <div className="mt-6">
          {demo ? <DemoLink demo={demo} /> : <DemoAction project={{ ...project, title: copy.title }} />}
        </div>
      </div>
      <div className="relative aspect-[16/9] bg-[#f5f5f7]">
        <ProjectImage
          src={project.cover}
          alt={p.coverAlt(copy.title, project.cover.endsWith(".webp"))}
          sizes="(min-width: 1024px) 280px, 100vw"
        />
      </div>
    </article>
  );
}
