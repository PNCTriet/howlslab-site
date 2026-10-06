import Image from "next/image";
import Link from "next/link";
import { coverAlt } from "@/lib/site";
import type { Project } from "@/lib/types";

function previews(project: Project) {
  const items = [
    { src: project.cover, alt: coverAlt(project.title) },
    ...project.gallery.map((image) => ({ src: image.src, alt: image.alt })),
  ];
  const seen = new Set<string>();
  const unique: { src: string; alt: string }[] = [];
  for (const item of items) {
    if (seen.has(item.src)) continue;
    seen.add(item.src);
    unique.push(item);
    if (unique.length === 3) break;
  }
  return unique;
}

export function ProjectIconGrid({ projects }: { projects: Project[] }) {
  const tiles = [
    ...projects.filter((project) => project.status === "live"),
    ...projects.filter((project) => project.status === "outdated"),
  ];

  return (
    <ul className="relative z-10 mx-auto grid max-w-[720px] grid-cols-2 gap-x-3 gap-y-10 px-6 pt-14 pb-4 min-[480px]:grid-cols-3 lg:grid-cols-4">
      {tiles.map((project) => {
        const shots = previews(project);
        const outdated = project.status === "outdated";
        return (
          <li key={project.slug} className="flex justify-center">
            <Link
              href={`/projects/${project.slug}`}
              data-slug={project.slug}
              data-count={shots.length}
              aria-label={outdated ? `${project.title}, đã cũ` : project.title}
              className={outdated ? "app-tile is-outdated" : "app-tile"}
            >
              <span className="preview-fan" aria-hidden="true">
                {shots.map((shot) => (
                  <span key={shot.src} className="preview-card">
                    <Image src={shot.src} alt="" fill sizes="112px" unoptimized className="object-cover" />
                  </span>
                ))}
              </span>
              <span className="app-icon">
                <Image src={project.icon} alt="" width={72} height={72} unoptimized />
              </span>
              <span className="app-label">{project.title}</span>
              {outdated ? <span className="old-mark">Đã cũ</span> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
