"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older Safari / insecure origins: fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

/** “Nhấn [C] để copy email” — the C key anywhere on the page, or a tap on the line. */
export function CopyEmail({ email }: { email: string }) {
  const [toast, setToast] = useState<{ ok: boolean; key: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(async () => {
    const ok = await writeClipboard(email);
    window.clearTimeout(timer.current);
    setToast({ ok, key: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), 2200);
  }, [email]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "c" && event.key !== "C") return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (isTypingTarget(event.target)) return;
      // Don't hijack ⌘C-style copies of a text selection.
      if (window.getSelection()?.toString()) return;
      event.preventDefault();
      void copy();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer.current);
    };
  }, [copy]);

  return (
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className="group -mx-2 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-2 text-[15px] text-ink-secondary transition-colors hover:text-foreground"
        aria-label={`Copy email ${email}`}
      >
        <span>Nhấn</span>
        <kbd className="keycap" aria-hidden="true">
          C
        </kbd>
        <span>để copy email</span>
      </button>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-4">
        {toast ? (
          <p key={toast.key} className="copy-toast">
            <span className="copy-toast-check" aria-hidden="true">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {toast.ok ? (
              <>
                Đã copy <span className="font-medium">{email}</span>
              </>
            ) : (
              <>Không copy được — email: {email}</>
            )}
          </p>
        ) : null}
      </div>
    </>
  );
}
