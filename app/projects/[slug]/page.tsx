import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { photosFor } from "@/lib/gallery";
import { PROJECT_EN } from "@/lib/project-en";
import { getAllProjects, getProject, toCard } from "@/lib/projects";
import type { Project } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  const english = PROJECT_EN[project.slug];
  const title = english?.title ?? project.title;
  const description = english?.summary ?? project.summary;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug}`,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = relatedProjects(project, getAllProjects()).map(toCard);

  return <ProjectDetail project={project} related={related} photos={photosFor(project.slug)} />;
}

function relatedProjects(current: Project, all: Project[]) {
  const rest = all.filter((item) => item.slug !== current.slug);
  const same = rest.filter((item) => item.status === current.status);
  const others = rest.filter((item) => item.status !== current.status);
  return [...same, ...others].slice(0, 3);
}
