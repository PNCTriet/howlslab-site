import Image from "next/image";
import { CopyEmailHint } from "@/components/copy-email-hint";
import { ProjectIconGrid } from "@/components/project-icon-grid";
import { SignatureWordmark } from "@/components/signature-wordmark";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
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
          <h1 className="mt-6 flex items-center gap-2.5 text-[28px] font-semibold tracking-[-0.03em] text-foreground md:text-[32px]">
            Triết · HOWL LAB
            <span className="online-dot" role="img" aria-label="Đang online" />
          </h1>
          <p className="mt-1 text-[15px] text-ink-secondary">Founder · Product Builder</p>
          <p className="mt-8 max-w-[38rem] text-[17px] leading-[1.55] text-ink-secondary">
            HOWL LAB là studio nhỏ của Triết tại Sài Gòn. Chúng tôi làm sản phẩm thật: không gian
            ảo, thử đồ bằng AI, CRM và công cụ vận hành — từ quyết định sản phẩm đến chi tiết giao
            diện và bản chạy được.
          </p>
          <CopyEmailHint />
        </div>
      </section>

      <section id="du-an" aria-labelledby="products-caption" className="relative mt-20 md:mt-28">
        <div className="dot-band" aria-hidden="true" />
        <h2
          id="products-caption"
          className="relative z-10 px-6 text-center font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground"
        >
          SẢN PHẨM ĐÃ LÀM — RÊ CHUỘT ĐỂ XEM
        </h2>
        <ProjectIconGrid projects={projects} />
      </section>

      <SignatureWordmark />
    </div>
  );
}
