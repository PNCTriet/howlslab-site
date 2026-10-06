import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CaseStudyBody } from "@/components/case-study-body";
import { DemoAction } from "@/components/demo-action";
import { ProjectCard } from "@/components/project-card";
import { ProjectImage } from "@/components/project-image";
import { StatusLabel } from "@/components/status-label";
import { getAllProjects, getProject, iconFor, toCard } from "@/lib/projects";
import { statusLabel } from "@/lib/site";
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
  if (!project) return { title: "Không tìm thấy" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
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

  const related = relatedProjects(project, getAllProjects());
  const tech = project.tech.length > 0 ? project.tech.join(", ") : "Sắp cập nhật";
  const showClient = Boolean(project.client) && !project.hideClient;

  return (
    <article>
      <div className="mx-auto max-w-[1120px] px-6 pt-8">
        <Link
          href="/#du-an"
          className="inline-flex items-center gap-1 text-[14px] text-link hover:underline"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Tất cả dự án
        </Link>
      </div>

      <header className="mx-auto max-w-[760px] px-6 pt-10 pb-12 text-center md:pt-16">
        {/* Shares its name with the home dock icon, so the icon morphs into place. */}
        <ViewTransition name={`app-icon-${project.slug}`} share="app-icon-morph" default="none">
          <Image
            src={iconFor(project)}
            alt=""
            width={88}
            height={88}
            unoptimized
            priority
            className="detail-icon mx-auto mb-6 block size-[88px]"
          />
        </ViewTransition>
        <StatusLabel status={project.status} />
        <h1 className="mt-4 text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[56px]">
          {project.title}
        </h1>
        <p className="mt-5 text-[19px] leading-[1.47] text-ink-secondary md:text-[21px]">
          {project.summary}
        </p>
        {project.tags.length > 0 ? (
          <p className="mt-4 text-[14px] text-muted-foreground">{project.tags.join(" · ")}</p>
        ) : null}
        <div className="mt-8 flex justify-center">
          <DemoAction project={project} prominent />
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-6">
        <p className="text-center text-[12px] text-muted-foreground">
          Minh hoạ tạm — ảnh chụp sản phẩm sắp cập nhật.
        </p>
        {project.gallery.length > 0 ? (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <li key={image.src} className={index === 0 ? "md:col-span-2" : undefined}>
                <figure className="howl-card overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <ProjectImage
                      src={image.src}
                      alt={image.alt}
                      sizes={index === 0 ? "(min-width: 1120px) 1072px, 100vw" : "(min-width: 1120px) 520px, 100vw"}
                      priority={index === 0}
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-center text-[12px] leading-[1.33] text-muted-foreground">
                    {image.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-center text-[17px] text-ink-secondary">
            Ảnh chụp màn hình — Sắp cập nhật.
          </p>
        )}
      </div>

      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
          Giới thiệu
        </h2>
        <div className="mt-6">
          <CaseStudyBody source={project.body} />
        </div>

        <h2 className="mt-16 text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
          Tính năng chính
        </h2>
        {project.features.length > 0 ? (
          <ol className="mt-6 divide-y divide-border border-y border-border">
            {project.features.map((feature, index) => (
              <li key={feature} className="flex gap-6 py-5">
                <span className="w-8 text-[14px] text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[21px] tracking-[-0.015em] text-foreground">{feature}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-6 text-[17px] text-ink-secondary">Sắp cập nhật.</p>
        )}

        <h2 className="mt-16 text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
          Thông tin
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-8 md:grid-cols-3">
          <div>
            <dt className="text-[12px] text-muted-foreground">Năm</dt>
            <dd className="mt-1 text-[17px] text-foreground">{project.year ?? "Sắp cập nhật"}</dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted-foreground">Trạng thái</dt>
            <dd className="mt-1 text-[17px] text-foreground">{statusLabel(project.status)}</dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted-foreground">Công nghệ</dt>
            <dd className="mt-1 text-[17px] text-foreground">{tech}</dd>
          </div>
          {showClient ? (
            <div>
              <dt className="text-[12px] text-muted-foreground">Khách hàng</dt>
              <dd className="mt-1 text-[17px] text-foreground">{project.client}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <section className="py-16 md:py-24">
        <div className="howl-card mx-auto max-w-[720px] px-6 py-12 text-center md:px-10">
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            {project.status === "live" && project.demoUrl ? "Vào xem bản đang chạy." : "Muốn xem trực tiếp?"}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary">
            {project.status === "live" && project.demoUrl
              ? "Bản demo vẫn mở. Trang này giữ lại câu chuyện của sản phẩm."
              : "Dự án này không còn link public. Gửi một lời nhắn, lab sẽ mở lại cho bạn xem."}
          </p>
          <div className="mt-8 flex justify-center">
            <DemoAction project={project} prominent />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="py-16 md:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            <h2
              id="related-heading"
              className="text-[32px] font-semibold tracking-[-0.02em] text-foreground"
            >
              Dự án khác
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={toCard(item)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function relatedProjects(current: Project, all: Project[]) {
  const rest = all.filter((item) => item.slug !== current.slug);
  const same = rest.filter((item) => item.status === current.status);
  const others = rest.filter((item) => item.status !== current.status);
  return [...same, ...others].slice(0, 3);
}
