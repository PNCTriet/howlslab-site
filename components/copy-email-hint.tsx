"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

async function copyEmail() {
  const value = site.contactEmail;
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  const ok = document.execCommand("copy");
  input.remove();
  if (!ok) throw new Error("copy failed");
}

export function CopyEmailHint() {
  const { p } = useLanguage();
  const [toast, setToast] = useState<string | null>(null);

  const copy = useCallback(async () => {
    try {
      await copyEmail();
      setToast(p.copiedEmail);
    } catch {
      setToast(p.copyFailed);
    }
  }, [p.copiedEmail, p.copyFailed]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "c" && event.key !== "C") return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (isTypingTarget(event.target)) return;
      event.preventDefault();
      void copy();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [copy]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  return (
    <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] text-ink-secondary">
      <span>{p.press}</span>
      <button
        type="button"
        className="keycap"
        aria-keyshortcuts="C"
        aria-label={p.copyEmail}
        onClick={() => void copy()}
      >
        C
      </button>
      <span>{p.toCopyEmail}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {toast ?? ""}
      </span>
      {toast ? (
        <span className="email-toast" aria-hidden="true">
          {toast}
        </span>
      ) : null}
    </p>
  );
}
