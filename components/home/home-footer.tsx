import { Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

function GitHubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-full text-ink-secondary transition-colors hover:bg-black/[0.05] hover:text-foreground dark:hover:bg-white/10";

export function HomeFooter() {
  return (
    <footer className="mx-auto w-full max-w-[640px] px-6 pb-8">
      <div className="border-t border-[var(--hairline)] pt-6">
        <p className="eyebrow">Liên hệ</p>
        <div className="mt-1 flex items-center justify-between gap-4">
          <ul className="-ml-3 flex items-center">
            <li>
              <a href={`mailto:${site.contactEmail}`} className={iconLink} aria-label={`Email ${site.contactEmail}`}>
                <Mail className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLink}
                aria-label="GitHub, mở trong tab mới"
              >
                <GitHubMark className="size-[17px]" />
              </a>
            </li>
          </ul>
          <div className="-mr-3 flex items-center gap-1">
            <p className="whitespace-nowrap text-[12px] leading-[1.33] text-muted-foreground">
              © {new Date().getFullYear()} {site.name} · {site.city}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
