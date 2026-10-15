"use client";

import Link from "next/link";
import { AppWindow } from "lucide-react";
import { ProjectImage } from "@/components/project-image";
import { StatusLabel } from "@/components/status-label";
import { DemoLink } from "@/components/demo-mockup";
import { useLanguage } from "@/components/language-provider";
import { demoForProject } from "@/lib/demo-projects";
import { PROJECT_EN } from "@/lib/project-en";
import type { ProjectCardData } from "@/lib/types";

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const { lang, p } = useLanguage();
  const en = PROJECT_EN[project.slug];
  const title = lang === "en" && en ? en.title : project.title;
  const summary = lang === "en" && en ? en.summary : project.summary;
  const demo = demoForProject(project.slug);
  return (
    <article className="relative h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="howl-card group flex h-full flex-col overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007aff]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#f5f5f7]">
          <ProjectImage
            src={project.cover}
            alt={p.coverAlt(title, project.cover.endsWith(".webp"))}
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-3">
            <AppWindow className="size-4 text-[#007aff] dark:text-[#0a84ff]" strokeWidth={1.75} aria-hidden="true" />
            <StatusLabel status={project.status} />
          </div>
          <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.03em] text-foreground">{title}</h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.4] text-ink-secondary">{summary}</p>
          <p className="mt-auto pt-3 text-[13px] font-medium text-[#007aff] dark:text-[#0a84ff]">{p.learnMore}</p>
        </div>
      </Link>
      {demo ? (
        <div className="absolute right-4 bottom-4">
          <DemoLink demo={demo} small />
        </div>
      ) : null}
    </article>
  );
}
