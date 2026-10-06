import Link from "next/link";
import { AppWindow } from "lucide-react";
import { ProjectImage } from "@/components/project-image";
import { StatusLabel } from "@/components/status-label";
import { coverAlt } from "@/lib/site";
import type { ProjectCardData } from "@/lib/types";

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <article className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="howl-card group flex h-full flex-col overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007aff]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-black/[0.03] dark:bg-white/[0.04]">
          <ProjectImage
            src={project.cover}
            alt={coverAlt(project.title)}
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
            className="motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-spring motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-3">
            <AppWindow className="size-4 text-[#007aff] dark:text-[#0a84ff]" strokeWidth={1.75} aria-hidden="true" />
            <StatusLabel status={project.status} />
          </div>
          <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.03em] text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.4] text-ink-secondary">
            {project.summary}
          </p>
          <p className="mt-auto pt-3 text-[13px] font-medium text-[#007aff] dark:text-[#0a84ff]">Tìm hiểu thêm</p>
        </div>
      </Link>
    </article>
  );
}
