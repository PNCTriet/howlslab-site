import fs from "node:fs";
import path from "node:path";

export type ProjectPhoto = {
  src: string;
  kind: "opening" | "repository" | "placeholder";
};

/** Slugs whose gallery file is a labeled stand-in, not a product photograph. */
const REPOSITORY_SLUGS = new Set(["man-led-su-kien"]);

const PLACEHOLDER_SLUGS = new Set([
  "ban-ve-live-show",
  "brand-package-crm",
  "crm-van-phong-luat",
  "cua-hang-in-3d",
  "cuon-album",
  "game-kiosk",
  "howls-studio",
  "howlsticket",
  "live-puzzle",
]);

export function photosFor(slug: string): ProjectPhoto[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return [];
  const prefix = `${slug}-`;
  return fs
    .readdirSync(dir)
    .filter((name) => name.startsWith(prefix) && name.endsWith(".webp"))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((name) => ({
      src: `/gallery/${name}`,
      kind: PLACEHOLDER_SLUGS.has(slug)
        ? ("placeholder" as const)
        : REPOSITORY_SLUGS.has(slug)
          ? ("repository" as const)
          : ("opening" as const),
    }));
}
