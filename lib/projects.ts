import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { GalleryImage, Project, ProjectCardData, ProjectStatus } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function asRecord(value: unknown, file: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(file, "frontmatter must be a mapping");
  }
  return value as Record<string, unknown>;
}

function requiredString(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(file, `${key} is required`);
  }
  return value.trim();
}

function optionalString(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (value == null || value === "") return undefined;
  if (typeof value !== "string") fail(file, `${key} must be a string`);
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function stringList(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (value == null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(file, `${key} must be a list of strings`);
  }
  return value.map((item) => item.trim()).filter(Boolean);
}

function optionalBoolean(data: Record<string, unknown>, key: string, file: string, fallback = false) {
  const value = data[key];
  if (value == null) return fallback;
  if (typeof value !== "boolean") fail(file, `${key} must be true or false`);
  return value;
}

function optionalNumber(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (value == null || value === "") return undefined;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    fail(file, `${key} must be a number`);
  }
  return value;
}

function parseStatus(value: string, file: string): ProjectStatus {
  if (value === "live" || value === "outdated") return value;
  fail(file, "status must be live or outdated");
}

function parseDemoUrl(value: string | undefined, file: string) {
  if (!value) return undefined;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    fail(file, "demoUrl must be an absolute URL");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    fail(file, "demoUrl must use http or https");
  }
  return value;
}

function parseGallery(data: Record<string, unknown>, file: string): GalleryImage[] {
  const value = data.gallery;
  if (value == null) return [];
  if (!Array.isArray(value)) fail(file, "gallery must be a list");
  return value.map((item, index) => {
    const entry = asRecord(item, file);
    const src = requiredString(entry, "src", `${file} gallery[${index}]`);
    const alt = requiredString(entry, "alt", `${file} gallery[${index}]`);
    const caption = optionalString(entry, "caption", `${file} gallery[${index}]`) ?? "Sắp cập nhật";
    if (!src.startsWith("/")) fail(file, `gallery[${index}].src must start with /`);
    return { src, alt, caption };
  });
}

function assertPublicFile(src: string, file: string) {
  const absolute = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  if (!fs.existsSync(absolute)) fail(file, `missing public file ${src}`);
}

function parseProject(filePath: string): Project {
  const file = path.basename(filePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = asRecord(parsed.data, file);
  const slug = requiredString(data, "slug", file);
  const expected = file.replace(/\.mdx$/, "");
  if (slug !== expected) fail(file, `slug "${slug}" must match filename "${expected}.mdx"`);
  if (!SLUG_PATTERN.test(slug)) fail(file, "slug must be lowercase kebab-case");

  const cover = requiredString(data, "cover", file);
  if (!cover.startsWith("/")) fail(file, "cover must start with /");
  assertPublicFile(cover, file);

  const iconInput = optionalString(data, "icon", file);
  const icon = iconInput ?? `/projects/${slug}/icon.svg`;
  if (!icon.startsWith("/")) fail(file, "icon must start with /");
  assertPublicFile(icon, file);

  const gallery = parseGallery(data, file);
  for (const image of gallery) assertPublicFile(image.src, file);

  const year = optionalNumber(data, "year", file);
  if (year != null && (year < 1990 || year > 2100)) fail(file, "year looks invalid");

  return {
    title: requiredString(data, "title", file),
    slug,
    status: parseStatus(requiredString(data, "status", file), file),
    demoUrl: parseDemoUrl(optionalString(data, "demoUrl", file), file),
    cover,
    tags: stringList(data, "tags", file),
    tech: stringList(data, "tech", file),
    year,
    client: optionalString(data, "client", file),
    hideClient: optionalBoolean(data, "hideClient", file),
    summary: requiredString(data, "summary", file),
    featured: optionalBoolean(data, "featured", file),
    gallery,
    features: stringList(data, "features", file),
    order: optionalNumber(data, "order", file) ?? 999,
    icon,
    body: parsed.content.trim(),
  };
}

export const getAllProjects = cache(function getAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .sort();
  const projects = files.map((name) => parseProject(path.join(CONTENT_DIR, name)));
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) fail(project.slug, "duplicate slug");
    seen.add(project.slug);
  }
  return projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "vi"));
});

export function getProject(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function toCard(project: Project): ProjectCardData {
  return {
    title: project.title,
    slug: project.slug,
    status: project.status,
    demoUrl: project.demoUrl,
    cover: project.cover,
    tags: project.tags,
    summary: project.summary,
    featured: project.featured,
  };
}
