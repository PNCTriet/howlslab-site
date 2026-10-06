import type { AnchorHTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...props}
      className="text-link underline decoration-transparent underline-offset-4 hover:decoration-current"
      target={external ? "_blank" : props.target}
      rel={external ? "noopener noreferrer" : props.rel}
    />
  );
}

export function CaseStudyBody({ source }: { source: string }) {
  if (!source) {
    return <p className="text-[17px] text-ink-secondary">Sắp cập nhật.</p>;
  }

  return (
    <div className="case-study">
      <MDXRemote source={source} components={{ a: MdxLink }} />
    </div>
  );
}
