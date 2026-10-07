import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Homepage drafts",
  description: "Earlier HOWLSLAB homepages, kept reachable.",
};

const links = [
  { href: "/demo", label: "Portfolio" },
  { href: "/demo/grid", label: "Icon grid" },
  { href: "/demo/dock", label: "Dock" },
];

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav aria-label="Homepage drafts" className="border-b border-black/10 bg-white/90 dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-[12px] sm:px-6">
          <span className="font-medium text-foreground">Homepage drafts</span>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-link hover:underline">
              {link.label}
            </Link>
          ))}
          <Link href="/" className="text-muted-foreground hover:text-foreground hover:underline sm:ml-auto">
            Fitting Lab
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
