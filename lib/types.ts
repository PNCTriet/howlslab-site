export type ProjectStatus = "live" | "outdated";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectCardData = {
  title: string;
  slug: string;
  status: ProjectStatus;
  demoUrl?: string;
  cover: string;
  tags: string[];
  summary: string;
  featured: boolean;
};

export type Project = ProjectCardData & {
  tech: string[];
  year?: number;
  client?: string;
  hideClient: boolean;
  gallery: GalleryImage[];
  features: string[];
  order: number;
  /** Resolved public path, from frontmatter or `/projects/<slug>/icon.svg`. */
  icon: string;
  body: string;
};
