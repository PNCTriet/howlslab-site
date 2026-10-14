import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactIntro } from "@/components/contact-form";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a demo",
  description: `Send a note to see a HOWL LAB project. The form only opens an email on your computer, addressed to ${site.contactEmail}.`,
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
      <ContactIntro />
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
