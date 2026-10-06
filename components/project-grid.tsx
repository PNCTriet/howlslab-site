"use client";

import { useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import type { ProjectCardData } from "@/lib/types";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "live", label: "Đang chạy" },
  { id: "outdated", label: "Đã cũ" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const visible =
    filter === "all" ? projects : projects.filter((project) => project.status === filter);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = FILTERS.findIndex((item) => item.id === filter);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % FILTERS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + FILTERS.length) % FILTERS.length;
    } else {
      return;
    }
    event.preventDefault();
    setFilter(FILTERS[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <section aria-labelledby="all-projects-heading" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="all-projects-heading"
              className="text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]"
            >
              Tất cả dự án
            </h2>
            <p className="mt-3 max-w-[36rem] text-[17px] leading-[1.47] text-ink-secondary">
              Lọc theo trạng thái. Dự án đã cũ, hoặc chưa có link public, mở bằng yêu cầu demo.
            </p>
          </div>
          <div
            role="radiogroup"
            aria-label="Lọc theo trạng thái"
            className="inline-flex w-full rounded-full bg-black/[0.05] p-1 dark:bg-white/10 md:w-auto"
            onKeyDown={onKeyDown}
          >
            {FILTERS.map((item, index) => {
              const selected = filter === item.id;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    buttons.current[index] = node;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  className={cn(
                    "h-9 flex-1 cursor-pointer rounded-full px-4 text-[14px] font-medium md:flex-none",
                    selected
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <p aria-live="polite" className="mt-6 text-[12px] text-muted-foreground">
          {visible.length} dự án
        </p>
        {visible.length === 0 ? (
          <p className="mt-8 text-[17px] text-ink-secondary">Chưa có dự án trong nhóm này.</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
