"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "@/components/signature-path";

/** Handwritten “howlslab”. The pen writes it once, the first time it scrolls into view. */
export function Signature() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "drawn">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("drawn");
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="signature" data-state={state}>
      <noscript>
        <style>{`.signature path{stroke-dashoffset:0!important;animation:none!important}`}</style>
      </noscript>
      <svg viewBox={SIGNATURE_VIEWBOX} role="img" aria-label="Chữ ký: howlslab" className="h-auto w-full">
        <path d={SIGNATURE_PATH} pathLength={1} />
      </svg>
    </div>
  );
}
