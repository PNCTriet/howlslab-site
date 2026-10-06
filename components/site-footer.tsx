import { site } from "@/lib/site";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M14.2 8.5h2.6V5.2h-2.6c-2.3 0-3.9 1.6-3.9 4.1v2H8v3.2h2.3V22h3.3v-7.5h2.5l.4-3.2h-2.9v-1.5c0-.7.4-1.3 1.6-1.3z" />
    </svg>
  );
}

const iconLink =
  "inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff]";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground">LIÊN HỆ</p>
          <ul className="mt-2 flex items-center gap-1">
            <li>
              <a className={iconLink} href={`mailto:${site.contactEmail}`} aria-label={`Email ${site.contactEmail}`}>
                <MailIcon />
              </a>
            </li>
            <li>
              <a className={iconLink} href={site.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a
                className={iconLink}
                href={site.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook, sắp cập nhật"
              >
                <FacebookIcon />
              </a>
            </li>
          </ul>
        </div>
        <p className="text-[12px] text-muted-foreground">© 2026 HOWL LAB · Sài Gòn</p>
      </div>
    </footer>
  );
}
