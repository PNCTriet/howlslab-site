import Image from "next/image";
import { CopyEmailHint } from "@/components/copy-email-hint";
import { GridCaption, GridIntro } from "@/components/draft-home-copy";
import { ProjectIconGrid } from "@/components/project-icon-grid";
import { SignatureWordmark } from "@/components/signature-wordmark";
import { getAllProjects } from "@/lib/projects";

export default function IconGridHomePage() {
  const projects = getAllProjects();

  return (
    <div>
      <section className="mx-auto max-w-[1120px] px-6 pt-16 md:pt-24 lg:pt-32">
        <div className="max-w-[640px]">
          <Image
            src="/avatar.svg"
            alt=""
            width={72}
            height={72}
            unoptimized
            priority
            className="size-[72px] rounded-full"
          />
          <GridIntro />
          <CopyEmailHint />
        </div>
      </section>

      <section id="du-an" aria-labelledby="products-caption" className="relative mt-20 md:mt-28">
        <div className="dot-band" aria-hidden="true" />
        <GridCaption />
        <ProjectIconGrid projects={projects} />
      </section>

      <SignatureWordmark />
    </div>
  );
}
