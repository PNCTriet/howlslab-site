import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function ProjectImage({ src, alt, sizes, priority = false, className }: ProjectImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      className={cn("object-cover", className)}
    />
  );
}
