import Image from "next/image";
import { CopyEmail } from "@/components/home/copy-email";
import { HomeFooter } from "@/components/home/home-footer";
import type { DockItem } from "@/components/home/project-dock";
import { Signature } from "@/components/home/signature";
import { DockBody, DockIntro, DockLists, DockSectionLabel } from "@/components/draft-home-copy";
import { PROJECT_EN } from "@/lib/project-en";
import { getAllProjects, iconFor, taglineFor } from "@/lib/projects";
import { site } from "@/lib/site";

export default function DockHomePage() {
  const projects = getAllProjects();
  const items: DockItem[] = projects.map((project) => {
    const english = PROJECT_EN[project.slug];
    const englishTagline = english?.summary.split(/(?<=[.!?])\s+/)[0];
    return {
      slug: project.slug,
      title: project.title,
      titleEn: english?.title,
      tagline: taglineFor(project),
      taglineEn: englishTagline,
      status: project.status,
      cover: project.cover,
      icon: iconFor(project),
    };
  });
  const live = items.filter((item) => item.status === "live");
  const outdated = items.filter((item) => item.status === "outdated");

  return (
    <div className="home">
      <section aria-labelledby="home-name" className="mx-auto w-full max-w-[640px] px-6 pt-16 sm:pt-20">
        <div className="rise">
          <Image
            src="/avatar.svg"
            alt={site.name}
            width={76}
            height={76}
            unoptimized
            priority
            className="home-avatar"
          />
          <DockIntro name={site.name} />
        </div>
        <DockBody />
        <div className="rise rise-3 mt-4">
          <CopyEmail email={site.contactEmail} />
        </div>
      </section>

      <section id="du-an" aria-labelledby="apps-heading" className="home-apps rise rise-4">
        <DockSectionLabel />
        <DockLists live={live} outdated={outdated} />
      </section>

      <div className="mx-auto w-full max-w-[640px] px-6 pt-14 pb-14 sm:pt-16 sm:pb-16">
        <div className="mx-auto w-[220px] sm:w-[248px]">
          <Signature />
        </div>
      </div>

      <HomeFooter />
    </div>
  );
}
