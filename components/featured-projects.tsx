import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { DemoAction } from "@/components/demo-action";
import { ProjectImage } from "@/components/project-image";
import { StatusLabel } from "@/components/status-label";
import { coverAlt } from "@/lib/site";
import type { ProjectCardData } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: ProjectCardData[] }) {
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
          Đang mở cửa
        </h2>
        <p className="mt-3 max-w-[36rem] text-[17px] leading-[1.47] text-ink-secondary">
          Một vài sản phẩm vẫn vào được ngay.
        </p>
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

function FeaturedLead({ project }: { project: ProjectCardData }) {
  return (
    <article className="howl-card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <StatusLabel status={project.status} />
          <h3 className="mt-4 text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            <Link href={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary md:text-[19px]">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AppleButton
              nativeButton={false}
              render={<Link href={`/projects/${project.slug}`} />}
            >
              Tìm hiểu thêm
            </AppleButton>
            <DemoAction project={project} />
          </div>
        </div>
        <div className="relative min-h-[240px] lg:min-h-[520px]">
          <ProjectImage
            src={project.cover}
            alt={coverAlt(project.title)}
            sizes="(min-width: 1024px) 560px, 100vw"
            priority
          />
        </div>
      </div>
    </article>
  );
}

function FeaturedTile({ project }: { project: ProjectCardData }) {
  return (
    <article className="howl-card grid h-full overflow-hidden sm:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-8">
        <StatusLabel status={project.status} />
        <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.02em] text-foreground">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[17px] leading-[1.47] text-ink-secondary">
          {project.summary}
        </p>
        <div className="mt-6">
          <DemoAction project={project} />
        </div>
      </div>
      <div className="relative min-h-[200px]">
        <ProjectImage
          src={project.cover}
          alt={coverAlt(project.title)}
          sizes="(min-width: 1024px) 280px, 100vw"
        />
      </div>
    </article>
  );
}
