"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ViewTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { StatusLabel } from "@/components/status-label";
import { statusLabel } from "@/lib/site";
import type { ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export type DockItem = {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  cover: string;
  icon: string;
};

type Variant = "main" | "muted";

/** Resting icon size, fully-magnified size (px) and how far the swell reaches. */
const METRICS: Record<Variant, { base: number; max: number; reach: number }> = {
  main: { base: 56, max: 86, reach: 2.9 },
  muted: { base: 44, max: 66, reach: 2.9 },
};

const CARD_WIDTH = 304;
const EDGE = 12;

const WIDE_QUERY = "(min-width: 640px)";
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

function useMedia(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function ProjectDock({
  items,
  variant = "main",
  label,
  ariaLabel,
}: {
  items: DockItem[];
  variant?: Variant;
  /** Small caption shown inside the dock, before a separator (macOS “Recents” style). */
  label?: string;
  ariaLabel: string;
}) {
  const { base, max, reach } = METRICS[variant];
  const wide = useMedia(WIDE_QUERY);
  const finePointer = useMedia(HOVER_QUERY);
  // Some environments misreport hover support; a real mouse moving over the dock settles it.
  const [mouseSeen, setMouseSeen] = useState(false);
  const hoverCapable = wide && (finePointer || mouseSeen);
  const motionOk = useMedia(MOTION_QUERY);
  const magnify = hoverCapable && motionOk;

  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sizes = useRef<number[]>(items.map(() => base));
  const pointerX = useRef<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const cardX = useRef<number | null>(null);
  const frame = useRef(0);
  const leaveTimer = useRef<number | undefined>(undefined);

  // One rAF loop drives both the dock swell and the floating window's glide.
  // The step body lives in a ref so the loop always sees the latest props.
  const stepRef = useRef<() => void>(() => {});
  const run = useCallback(() => {
    frame.current = 0;
    stepRef.current();
  }, []);
  const kick = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(run);
  }, [run]);

  useEffect(() => {
    stepRef.current = () => {
      const els = itemRefs.current;
      const mx = pointerX.current;
      const range = base * reach;

      // Read every rect first, then write — no layout thrash between items.
      const centers = els.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2;
      });

      let moving = false;
      els.forEach((el, i) => {
        if (!el) return;
        let target = base;
        const center = centers[i];
        if (magnify && mx != null && center != null) {
          const d = Math.abs(mx - center);
          if (d < range) target = base + (max - base) * ((Math.cos((Math.PI * d) / range) + 1) / 2);
        }
        const current = sizes.current[i] ?? base;
        let next = magnify ? current + (target - current) * 0.26 : target;
        if (Math.abs(target - next) < 0.2) next = target;
        else moving = true;
        if (next !== current) {
          sizes.current[i] = next;
          el.style.setProperty("--s", `${next.toFixed(2)}px`);
        }
      });

      const index = activeRef.current;
      const wrap = wrapRef.current;
      const card = cardRef.current;
      const el = index == null ? null : els[index];
      if (wrap && card && el) {
        const w = wrap.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        let target = r.left + r.width / 2 - w.left - CARD_WIDTH / 2;
        const min = EDGE - w.left;
        const maxX = window.innerWidth - EDGE - CARD_WIDTH - w.left;
        target = Math.min(Math.max(target, min), Math.max(min, maxX));
        if (cardX.current == null || !motionOk) cardX.current = target;
        else cardX.current += (target - cardX.current) * 0.22;
        if (Math.abs(target - cardX.current) < 0.3) cardX.current = target;
        else moving = true;
        card.style.setProperty("--x", `${cardX.current.toFixed(2)}px`);
      }

      if (moving) kick();
    };
  });

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(leaveTimer.current);
    },
    [],
  );

  // Magnification switched off (resize, reduced-motion toggle): settle back to rest.
  useEffect(() => {
    if (!magnify) pointerX.current = null;
    kick();
  }, [magnify, kick]);

  const activate = useCallback(
    (index: number) => {
      window.clearTimeout(leaveTimer.current);
      if (activeRef.current == null) cardX.current = null; // first appearance snaps, later ones glide
      activeRef.current = index;
      setActive(index);
      setShown(index);
      kick();
    },
    [kick],
  );

  const deactivate = useCallback(
    (delay = 90) => {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = window.setTimeout(() => {
        activeRef.current = null;
        setActive(null);
      }, delay);
    },
    [],
  );

  function onPointerMove(event: ReactPointerEvent) {
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && !mouseSeen) setMouseSeen(true);
    pointerX.current = event.clientX;
    kick();
  }

  function onPointerLeave() {
    pointerX.current = null;
    kick();
    deactivate();
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLUListElement>) {
    if (event.key === "Escape") {
      pointerX.current = null;
      deactivate(0);
      kick();
      return;
    }
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const at = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (at === -1) return;
    event.preventDefault();
    const next = (at + (event.key === "ArrowRight" ? 1 : -1) + links.length) % links.length;
    links[next]?.focus();
  }

  function onFocusItem(index: number, target: HTMLElement) {
    activate(index);
    if (magnify && target.matches(":focus-visible")) {
      const el = itemRefs.current[index];
      if (el) {
        const r = el.getBoundingClientRect();
        pointerX.current = r.left + r.width / 2;
        kick();
      }
    }
  }

  function onBlurItem(event: React.FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.closest("ul")?.contains(next)) return;
    pointerX.current = null;
    deactivate(0);
    kick();
  }

  const current = items[shown] ?? items[0];
  const open = active != null && hoverCapable;

  return (
    <div ref={wrapRef} className="dock-wrap" data-variant={variant}>
      {hoverCapable && current ? (
        <div ref={cardRef} className="dock-card" data-open={open || undefined} aria-hidden="true">
          <div className="dock-card-chrome">
            <span className="dock-light bg-[#ff5f57]" />
            <span className="dock-light bg-[#febc2e]" />
            <span className="dock-light bg-[#28c840]" />
            <span className="dock-card-url">howlslab.com/projects/{current.slug}</span>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {items.map((item, index) => (
              <Image
                key={item.slug}
                src={item.cover}
                alt=""
                fill
                unoptimized={item.cover.endsWith(".svg")}
                sizes={`${CARD_WIDTH}px`}
                className={cn(
                  "object-cover transition-opacity duration-300",
                  index === shown ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
          <div className="px-4 pt-3 pb-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-[15px] font-semibold tracking-[-0.016em] text-foreground">
                {current.title}
              </p>
              <StatusLabel status={current.status} className="shrink-0" />
            </div>
            <p className="mt-0.5 truncate text-[13px] leading-[1.38] text-ink-secondary">{current.tagline}</p>
          </div>
        </div>
      ) : null}

      <div className="dock-bar">
        {label ? (
          <>
            <span className="dock-label">{label}</span>
            <span className="dock-sep" aria-hidden="true" />
          </>
        ) : null}
        <ul
          className="dock-list"
          aria-label={ariaLabel}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onKeyDown={onKeyDown}
        >
          {items.map((item, index) => (
            <li
              key={item.slug}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="dock-item"
              data-active={active === index || undefined}
              style={{ "--s": `${base}px` } as CSSProperties}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") activate(index);
              }}
            >
              <span className="dock-tip" aria-hidden="true">
                {item.title}
              </span>
              <Link
                href={`/projects/${item.slug}`}
                className="dock-link"
                aria-label={`${item.title}, ${statusLabel(item.status)}. ${item.tagline}`}
                onFocus={(event) => onFocusItem(index, event.currentTarget)}
                onBlur={onBlurItem}
                draggable={false}
              >
                <ViewTransition name={`app-icon-${item.slug}`} share="app-icon-morph" default="none">
                  <Image
                    src={item.icon}
                    alt=""
                    width={120}
                    height={120}
                    unoptimized
                    draggable={false}
                    className="dock-icon"
                  />
                </ViewTransition>
                <span className="dock-name" aria-hidden="true">
                  {item.title}
                </span>
              </Link>
              {item.status === "live" ? <span className="dock-dot" aria-hidden="true" /> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
