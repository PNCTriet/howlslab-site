import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export function TextLink({ href, children, external = false, className }: TextLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-0.5 text-[17px] text-link hover:underline",
    className,
  );
  const content = (
    <>
      {children}
      <ChevronRight className="size-4" aria-hidden="true" />
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
