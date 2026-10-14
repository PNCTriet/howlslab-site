"use client";

import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { TextLink } from "@/components/text-link";
import { useLanguage } from "@/components/language-provider";
import { contactHref, hasLiveDemo } from "@/lib/site";
import type { ProjectCardData } from "@/lib/types";

type DemoProject = Pick<ProjectCardData, "slug" | "title" | "status" | "demoUrl">;

export function DemoAction({
  project,
  prominent = false,
}: {
  project: DemoProject;
  prominent?: boolean;
}) {
  const { p } = useLanguage();
  if (hasLiveDemo(project) && project.demoUrl) {
    const quiet = (
      <>
        {p.tryIt}
        <span className="sr-only">
          {" "}
          {project.title}, {p.opensNewTab}
        </span>
      </>
    );
    if (prominent) {
      return (
        <AppleButton
          nativeButton={false}
          render={<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />}
        >
          {quiet}
        </AppleButton>
      );
    }
    return (
      <TextLink href={project.demoUrl} external>
        {quiet}
      </TextLink>
    );
  }

  if (prominent) {
    return (
      <AppleButton nativeButton={false} render={<Link href={contactHref(project.slug)} />}>
        {p.requestDemo}
      </AppleButton>
    );
  }

  return <TextLink href={contactHref(project.slug)}>{p.requestDemo}</TextLink>;
}
