"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AppleButton } from "@/components/apple-button";
import { useLanguage } from "@/components/language-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_EN } from "@/lib/project-en";
import { site } from "@/lib/site";
import type { ProjectStatus } from "@/lib/types";

type ProjectOption = {
  slug: string;
  title: string;
  status: ProjectStatus;
};

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const fieldClass =
  "h-12 rounded-[12px] border-border bg-background px-4 text-[17px] shadow-none md:text-[17px]";

export function ContactIntro() {
  const { p } = useLanguage();
  return (
    <>
      <p className="text-center text-[14px] font-medium text-ink-secondary">{p.contactEyebrow}</p>
      <h1 className="mt-3 text-center text-[40px] font-semibold tracking-[-0.025em] text-foreground md:text-[56px]">
        {p.contactHeading}
      </h1>
      <p className="mx-auto mt-4 max-w-[36rem] text-center text-[17px] leading-[1.47] text-ink-secondary md:text-[19px]">
        {p.contactIntro(site.contactEmail)}
      </p>
    </>
  );
}

export function ContactForm({ projects }: { projects: ProjectOption[] }) {
  const { lang, p } = useLanguage();
  const params = useSearchParams();
  const requested = params.get("project") ?? "";
  const known = projects.some((project) => project.slug === requested);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectSlug, setProjectSlug] = useState(known ? requested : "");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [draftHref, setDraftHref] = useState<string | null>(null);
  const statusRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const nameId = useId();
  const emailId = useId();
  const projectId = useId();
  const messageId = useId();

  useEffect(() => {
    if (draftHref) statusRef.current?.focus();
  }, [draftHref]);

  const live = projects.filter((project) => project.status === "live");
  const outdated = projects.filter((project) => project.status === "outdated");
  const selected = projects.find((project) => project.slug === projectSlug);

  function titleFor(project: ProjectOption) {
    if (lang === "vi") return project.title;
    return PROJECT_EN[project.slug]?.title ?? project.title;
  }

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length === 0) next.name = p.nameError;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = p.emailError;
    }
    if (message.trim().length === 0) next.message = p.messageError;
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.email) {
      emailRef.current?.focus();
      return;
    }
    if (next.message) {
      messageRef.current?.focus();
      return;
    }

    const subject = p.mailSubject(selected ? titleFor(selected) : p.mailStudio);
    const body = [
      `${p.mailName}: ${name.trim()}`,
      `${p.mailEmail}: ${email.trim()}`,
      `${p.mailProject}: ${selected ? titleFor(selected) : p.mailNone}`,
      "",
      message.trim(),
    ].join("\n");
    const href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftHref(href);
    window.location.href = href;
  }

  if (draftHref) {
    return (
      <div className="mt-12 rounded-[20px] bg-band p-8" role="status">
        <h2
          ref={statusRef}
          tabIndex={-1}
          className="text-[28px] font-semibold tracking-[-0.02em] text-foreground outline-none"
        >
          {p.draftedTitle}
        </h2>
        <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary">{p.draftedBody(site.contactEmail)}</p>
        <p className="mt-4 text-[17px]">
          <a className="text-link hover:underline" href={draftHref}>
            {p.reopenDraft}
          </a>
        </p>
        <button
          type="button"
          className="mt-8 text-[17px] text-link hover:underline"
          onClick={() => setDraftHref(null)}
        >
          {p.anotherRequest}
        </button>
      </div>
    );
  }

  return (
    <form className="mt-12 space-y-8" onSubmit={onSubmit} noValidate>
      <Field
        id={nameId}
        label={p.nameLabel}
        error={errors.name}
      >
        <Input
          ref={nameRef}
          id={nameId}
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          className={fieldClass}
          required
        />
      </Field>
      <Field id={emailId} label="Email" error={errors.email}>
        <Input
          ref={emailRef}
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          className={fieldClass}
          required
        />
      </Field>
      <div>
        <Label htmlFor={projectId} className="text-[14px] text-foreground">
          {p.projectLabel}
        </Label>
        <div className="relative mt-2">
          <select
            id={projectId}
            name="project"
            value={projectSlug}
            onChange={(event) => setProjectSlug(event.target.value)}
            className={`${fieldClass} w-full appearance-none pr-10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`}
          >
            <option value="">{p.projectPlaceholder}</option>
            <ProjectOptions label={p.filterLive} projects={live} titleFor={titleFor} />
            <ProjectOptions label={p.filterOlder} projects={outdated} titleFor={titleFor} />
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </div>
      <Field id={messageId} label={p.messageLabel} error={errors.message}>
        <Textarea
          ref={messageRef}
          id={messageId}
          name="message"
          rows={6}
          maxLength={1000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : `${messageId}-hint`}
          className="field-sizing-fixed min-h-40 rounded-[12px] border-border bg-background px-4 py-3 text-[17px] shadow-none md:text-[17px]"
          required
        />
        <p id={`${messageId}-hint`} className="mt-2 text-[12px] text-muted-foreground">
          {message.length}/1000
        </p>
      </Field>
      <div className="space-y-3">
        <AppleButton type="submit">{p.sendRequest}</AppleButton>
        <p className="text-[12px] leading-[1.4] text-muted-foreground">{p.formHint(site.contactEmail)}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-[14px] text-foreground">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[12px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ProjectOptions({
  label,
  projects,
  titleFor,
}: {
  label: string;
  projects: ProjectOption[];
  titleFor: (project: ProjectOption) => string;
}) {
  if (projects.length === 0) return null;
  return (
    <optgroup label={label}>
      {projects.map((project) => (
        <option key={project.slug} value={project.slug}>
          {titleFor(project)}
        </option>
      ))}
    </optgroup>
  );
}
