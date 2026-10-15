"use client";

import { ProjectDock, type DockItem } from "@/components/home/project-dock";
import { useLanguage } from "@/components/language-provider";

export function DockIntro({ name }: { name: string }) {
  const { p } = useLanguage();
  return (
    <>
      <h1
        id="home-name"
        className="mt-5 flex items-center gap-2 text-[22px] font-semibold leading-[1.27] tracking-[-0.022em] text-foreground"
      >
        <span>{name}</span>
        <span className="online-dot" role="img" aria-label={p.dockOnline} />
      </h1>
    </>
  );
}

export function DockBody() {
  const { p } = useLanguage();
  return (
    <p className="rise rise-2 mt-7 text-pretty text-[17px] leading-[1.6] tracking-[-0.012em] text-ink-secondary">
      {p.dockBody}
    </p>
  );
}

export function DockSectionLabel() {
  const { p } = useLanguage();
  return (
    <h2 id="apps-heading" className="eyebrow text-center">
      <span className="hidden sm:inline">{p.dockAppsDesktop}</span>
      <span className="sm:hidden">{p.dockAppsMobile}</span>
    </h2>
  );
}

export function DockLists({ live, outdated }: { live: DockItem[]; outdated: DockItem[] }) {
  const { p } = useLanguage();
  return (
    <div className="home-docks">
      <ProjectDock items={live} variant="main" ariaLabel={p.dockLiveAria(live.length)} />
      {outdated.length > 0 ? (
        <ProjectDock
          items={outdated}
          variant="muted"
          label={p.dockOlder}
          ariaLabel={p.dockOlderAria(outdated.length)}
        />
      ) : null}
    </div>
  );
}

export function GridIntro() {
  const { p } = useLanguage();
  return (
    <>
      <h1 className="mt-6 flex items-center gap-2.5 text-[28px] font-semibold tracking-[-0.03em] text-foreground md:text-[32px]">
        HOWL LAB
        <span className="online-dot" role="img" aria-label={p.gridOnline} />
      </h1>
      <p className="mt-8 max-w-[38rem] text-[17px] leading-[1.55] text-ink-secondary">{p.gridBody}</p>
    </>
  );
}

export function GridCaption() {
  const { p } = useLanguage();
  return (
    <h2
      id="products-caption"
      className="relative z-10 px-6 text-center font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground"
    >
      {p.gridCaption}
    </h2>
  );
}
