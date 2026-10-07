
import { cn } from "@/lib/utils";

/** Figma-style selection box: thin blue frame, 4 square handles, italic blue word. */
export function Sel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pv-sel">
      {children}
      {(["tl", "tr", "bl", "br"] as const).map((c) => <span key={c} aria-hidden className="pv-sel-h" data-c={c} />)}
    </span>
  );
}

/** Word with a hand-drawn double squiggle underline that draws in when revealed. */
export function Squiggle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("pv-squig", className)}>
      {children}
      <svg aria-hidden viewBox="0 0 200 18" preserveAspectRatio="none" className="pv-squig-svg">
        <path pathLength={1} d="M3 9 C 30 3, 52 13, 80 8 S 130 4, 160 8 S 190 11, 197 6" />
        <path pathLength={1} d="M14 15 C 46 10, 74 16, 104 13 S 150 10, 186 14" />
      </svg>
    </span>
  );
}

/** Soft marker highlight: skewed band behind the text. */
export function Marker({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "yellow" }) {
  return <span className="pv-mark" data-tone={tone}>{children}</span>;
}

/** Word inside a rounded pill (dark on light, light on dark). */
export function Pill({ children, invert }: { children: React.ReactNode; invert?: boolean }) {
  return <span className="pv-pill" data-invert={invert ? "" : undefined}>{children}</span>;
}

/** Looping hand-drawn arrows. Stroke 1.5, round caps, accent blue (currentColor). */
export function LoopArrow({ className, variant = "cta" }: { className?: string; variant?: "cta" | "down" }) {
  return variant === "cta" ? (
    <svg aria-hidden viewBox="0 0 64 84" fill="none" className={cn("pv-arrow", className)}>
      <path pathLength={1} d="M44 4 C 24 8, 10 22, 14 38 C 17 50, 30 50, 28 41 C 26 33, 12 36, 11 50 C 10 64, 26 75, 56 74" />
      <path pathLength={1} d="M47 67 L 57 74 L 47 80" />
    </svg>
  ) : (
    <svg aria-hidden viewBox="0 0 70 60" fill="none" className={cn("pv-arrow", className)}>
      <path pathLength={1} d="M64 6 C 44 4, 30 10, 30 22 C 30 31, 41 31, 40 23 C 39 15, 22 17, 16 30 C 12 39, 12 46, 14 54" />
      <path pathLength={1} d="M7 47 L 14 55 L 21 47" />
    </svg>
  );
}

/** Three tick marks bursting from a corner (like a hand-drawn sparkle). */
export function Ticks({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" fill="none" className={cn("pv-ticks", className)} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M30 3 L 30 15" /><path d="M9 9 L 18 18" /><path d="M3 30 L 15 30" />
    </svg>
  );
}


