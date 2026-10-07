import Link from "next/link";
import { AppleButton } from "@/components/apple-button";
import { FeaturedProjects } from "@/components/featured-projects";
import { ProjectGrid } from "@/components/project-grid";
import { TextLink } from "@/components/text-link";
import { getAllProjects, toCard } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();
  const cards = projects.map(toCard);
  const liveCount = projects.filter((project) => project.status === "live").length;
  const outdatedCount = projects.length - liveCount;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="rise mx-auto max-w-[1120px] px-6 pt-16 pb-14 text-center md:pt-24 md:pb-20 lg:pt-28">
          <p className="text-[14px] font-medium text-ink-secondary md:text-[17px]">
            Studio sản phẩm · Việt Nam
          </p>
          <h1 className="mx-auto mt-4 max-w-[14em] text-balance text-[36px] font-semibold leading-[1.05] tracking-[-0.032em] text-foreground sm:text-[56px] lg:text-[64px]">
            Những sản phẩm đã làm ra.
          </h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-pretty text-[19px] leading-[1.47] text-ink-secondary md:text-[21px]">
            HOWL LAB là studio sản phẩm nhỏ tại Việt Nam. Chúng tôi thiết kế và
            xây phần mềm cho người dùng thật — không gian ảo, thử đồ, nội dung, CRM — rồi để lại
            một cửa để bạn xem.
          </p>
          <ul className="mx-auto mt-8 grid max-w-[520px] grid-cols-3 gap-3 text-left">
            <li className="howl-card px-4 py-3">
              <p className="text-[12px] text-muted-foreground">Đang chạy</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-foreground tabular-nums">
                {liveCount}
              </p>
            </li>
            <li className="howl-card px-4 py-3">
              <p className="text-[12px] text-muted-foreground">Đã cũ</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-foreground tabular-nums">
                {outdatedCount}
              </p>
            </li>
            <li className="howl-card px-4 py-3">
              <p className="text-[12px] text-muted-foreground">Dự án</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-foreground tabular-nums">
                {projects.length}
              </p>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <AppleButton nativeButton={false} render={<Link href="#du-an" />}>
              Xem dự án
            </AppleButton>
            <TextLink href="/contact">Liên hệ</TextLink>
          </div>
        </div>
      </section>

      <div id="du-an">
        <FeaturedProjects projects={cards} />
        <ProjectGrid projects={cards} />
      </div>

      <section id="ve-howl" aria-labelledby="about-heading" className="border-t border-border py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1120px] items-start gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <h2
              id="about-heading"
              className="max-w-[16ch] text-balance text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]"
            >
              Lab nhỏ. Việc thì làm cho xong.
            </h2>
            <p className="mt-6 max-w-[40rem] text-[17px] leading-[1.47] text-ink-secondary md:text-[19px]">
              HOWL LAB ở Việt Nam. Phần lớn
              sản phẩm bắt đầu từ một nhu cầu cụ thể: gặp nhau trong một không gian ảo, thử một
              món đồ, hoặc theo đơn hàng và hợp đồng trong nội bộ.
            </p>
          </div>
          <div className="howl-card p-8 md:p-10">
            <p className="text-[12px] font-medium text-muted-foreground">Liên hệ</p>
            <p className="mt-3 text-[21px] font-semibold tracking-[-0.02em] text-foreground">
              Muốn xem một bản không còn public?
            </p>
            <p className="mt-3 text-[17px] leading-[1.47] text-ink-secondary">
              Gửi yêu cầu demo. Biểu mẫu chỉ mở email trên máy bạn.
            </p>
            <div className="mt-6">
              <AppleButton nativeButton={false} render={<Link href="/contact" />}>
                Yêu cầu demo
              </AppleButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
