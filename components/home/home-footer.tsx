import { Mail } from "lucide-react";
import { site } from "@/lib/site";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-full text-ink-secondary transition-colors hover:bg-black/[0.05] hover:text-foreground";

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
          </ul>
          <p className="whitespace-nowrap text-[12px] leading-[1.33] text-muted-foreground">
            © {new Date().getFullYear()} {site.name} · {site.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
