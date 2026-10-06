import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { TextLink } from "@/components/text-link";
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
  if (hasLiveDemo(project) && project.demoUrl) {
    const quiet = (
      <>
        Xem thử
        <span className="sr-only"> {project.title}, mở trong tab mới</span>
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
        Yêu cầu demo
      </AppleButton>
    );
  }

  return <TextLink href={contactHref(project.slug)}>Yêu cầu demo</TextLink>;
}
