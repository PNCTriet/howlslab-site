export const site = {
  name: "HOWL LAB",
  url: "https://howlslab.com",
  locale: "en_US",
  description:
    "HOWL LAB is a small product studio in Vietnam. The products we have shipped — still live, or closed out.",
  /**
   * Inbox that actually receives mail.
   * The contact form never posts to a server — it only opens a mailto draft.
   */
  contactEmail: "howls.sslab@gmail.com",
  city: "Sài Gòn",
} as const;

export function contactHref(slug?: string) {
  if (!slug) return "/contact";
  return `/contact?project=${encodeURIComponent(slug)}`;
}

export function coverAlt(title: string, lang: "en" | "vi" = "en") {
  if (lang === "vi") return `Minh hoạ trừu tượng cho ${title}. Chưa phải ảnh chụp sản phẩm.`;
  return `Abstract cover for ${title}. Not a product photograph.`;
}

export function statusLabel(status: "live" | "outdated", lang: "en" | "vi" = "en") {
  if (lang === "vi") return status === "live" ? "Đang chạy" : "Đã cũ";
  return status === "live" ? "Live" : "Older";
}

export function hasLiveDemo(project: { status: "live" | "outdated"; demoUrl?: string }) {
  return project.status === "live" && Boolean(project.demoUrl);
}
