export const site = {
  name: "HOWL LAB",
  url: "https://howlslab.com",
  locale: "vi_VN",
  description:
    "HOWL LAB là studio sản phẩm nhỏ tại Việt Nam. Những sản phẩm đã làm ra — đang chạy, hoặc đã khép một vòng đời.",
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

export function coverAlt(title: string) {
  return `Minh hoạ trừu tượng cho ${title}. Chưa phải ảnh chụp sản phẩm.`;
}

export function statusLabel(status: "live" | "outdated") {
  return status === "live" ? "Đang chạy" : "Đã cũ";
}

export function hasLiveDemo(project: { status: "live" | "outdated"; demoUrl?: string }) {
  return project.status === "live" && Boolean(project.demoUrl);
}
