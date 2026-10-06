import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yêu cầu demo",
  description: "Gửi lời nhắn để xem một dự án của HOWL LAB. Biểu mẫu chỉ mở email trên máy bạn.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const projects = getAllProjects().map((project) => ({
    slug: project.slug,
    title: project.title,
    status: project.status,
  }));

  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 md:py-24">
      <p className="text-center text-[14px] font-medium text-ink-secondary">HOWL LAB</p>
      <h1 className="mt-3 text-center text-[40px] font-semibold tracking-[-0.025em] text-foreground md:text-[56px]">
        Yêu cầu demo
      </h1>
      <p className="mx-auto mt-4 max-w-[36rem] text-center text-[17px] leading-[1.47] text-ink-secondary md:text-[19px]">
        Kể ngắn về dự án bạn muốn xem. Thư sẽ soạn sẵn tới {site.contactEmail}. Chúng tôi chưa
        lưu biểu mẫu trên máy chủ.
      </p>
      <Suspense fallback={<FormFallback />}>
        <ContactForm projects={projects} />
      </Suspense>
    </div>
  );
}

function FormFallback() {
  return (
    <div
      className="mt-12 h-[520px] rounded-[20px] bg-band motion-safe:animate-pulse"
      aria-hidden="true"
    />
  );
}
