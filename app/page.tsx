import Image from "next/image";
import { CopyEmail } from "@/components/home/copy-email";
import { HomeFooter } from "@/components/home/home-footer";
import { ProjectDock, type DockItem } from "@/components/home/project-dock";
import { Signature } from "@/components/home/signature";
import { getAllProjects, iconFor, taglineFor } from "@/lib/projects";
import { site } from "@/lib/site";

export default function HomePage() {
  const projects = getAllProjects();
  const items: DockItem[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    tagline: taglineFor(project),
    status: project.status,
    cover: project.cover,
    icon: iconFor(project),
  }));
  const live = items.filter((item) => item.status === "live");
  const outdated = items.filter((item) => item.status === "outdated");

  return (
    <div className="home">
      <section aria-labelledby="home-name" className="mx-auto w-full max-w-[640px] px-6 pt-16 sm:pt-20">
        <div className="rise">
          <Image
            src="/avatar.svg"
            alt={`${site.founder}, ${site.name}`}
            width={76}
            height={76}
            unoptimized
            priority
            className="home-avatar"
          />
          <h1
            id="home-name"
            className="mt-5 flex items-center gap-2 text-[22px] font-semibold leading-[1.27] tracking-[-0.022em] text-foreground"
          >
            <span>
              {site.founder} <span className="font-normal text-muted-foreground">·</span> {site.name}
            </span>
            <span className="online-dot" role="img" aria-label="Đang hoạt động" />
          </h1>
          <p className="mt-0.5 text-[17px] leading-[1.41] text-ink-secondary">Founder · Product Builder</p>
        </div>

        <p className="rise rise-2 mt-7 text-pretty text-[17px] leading-[1.6] tracking-[-0.012em] text-ink-secondary">
          HOWL LAB là studio nhỏ ở {site.city}, chuyên làm sản phẩm thật cho người dùng thật: không gian
          ảo để gặp nhau, phòng thử đồ bằng AI, CRM cho văn phòng, và những công cụ vận hành chạy mỗi
          ngày. Mình đi cùng từ ý tưởng, thiết kế đến lúc sản phẩm lên sóng — rồi để lại một cánh cửa để
          bạn ghé xem.
        </p>

        <div className="rise rise-3 mt-4">
          <CopyEmail email={site.contactEmail} />
        </div>
      </section>

      <section id="du-an" aria-labelledby="apps-heading" className="home-apps rise rise-4">
        <h2 id="apps-heading" className="eyebrow text-center">
          Sản phẩm đã làm · <span className="hidden sm:inline">rê chuột để xem, bấm để mở</span>
          <span className="sm:hidden">chạm để mở</span>
        </h2>

        <div className="home-docks">
          <ProjectDock items={live} variant="main" ariaLabel={`Đang chạy, ${live.length} dự án`} />
          {outdated.length > 0 ? (
            <ProjectDock
              items={outdated}
              variant="muted"
              label="Đã cũ"
              ariaLabel={`Đã cũ, ${outdated.length} dự án`}
            />
          ) : null}
        </div>
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
