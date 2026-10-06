export const site = {
  name: "HOWL LAB",
  url: "https://howlslab.com",
  locale: "vi_VN",
  founder: "Triết",
  founderHandle: "Howls",
  description:
    "HOWL LAB là studio sản phẩm nhỏ của Triết (Howls) tại Việt Nam. Những sản phẩm đã làm ra — đang chạy, hoặc đã khép một vòng đời.",
  /**
   * Placeholder inbox. Replace with the studio's real address before launch.
   * The contact form never posts to a server — it only opens a mailto draft.
   */
  contactEmail: "hello@howlslab.com",
  githubUrl: "https://github.com/PNCTriet",
  /** Placeholder until the studio has a page. */
  facebookUrl: "https://www.facebook.com/",
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
