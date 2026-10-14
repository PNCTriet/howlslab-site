export type DemoProject = {
  slug: string;
  /** Matching entry in content/projects, when the demo belongs to a portfolio project. */
  projectSlug?: string;
  name: string;
  url?: string;
  /** Mockups live in /public/demos/{slug}-macbook.webp and -iphone.webp. */
  hasMockups: boolean;
  /** Raw screenshots composited into official Apple bezels on the project page. */
  screens?: { macbook: string; iphone: string };
  en: string;
  vi: string;
};

export const DEMO_PROJECTS: DemoProject[] = [
  {
    slug: "tryon",
    projectSlug: "fitting-lab",
    name: "Fitting Lab",
    url: "https://tryon.howlslab.com",
    hasMockups: true,
    screens: {
      macbook: "/screens/tryon-desktop.webp",
      iphone: "/screens/tryon-mobile.webp",
    },
    en: "Live fitting rooms for fashion brands, with AI virtual try-on.",
    vi: "Phòng thử đồ trực tuyến cho thương hiệu thời trang, thử đồ ảo bằng AI.",
  },
  {
    slug: "vicall",
    name: "ViCall",
    url: "https://vircall.howlslab.com",
    hasMockups: true,
    en: "A live AI virtual receptionist. Private demo, password required.",
    vi: "Lễ tân ảo AI trò chuyện trực tiếp. Demo riêng, cần mật khẩu.",
  },
  {
    slug: "takico",
    name: "Takico",
    url: "https://takico.vercel.app",
    hasMockups: true,
    en: "A browser game with start, play, win and lose screens.",
    vi: "Game trên trình duyệt với các màn chờ, chơi, thắng và thua.",
  },
  {
    slug: "mblife-photobooth",
    name: "MB Life Photobooth",
    url: "https://mb-life-demo.vercel.app",
    hasMockups: true,
    en: "Event photobooth: iPad check-in, LED stage screen and admin list.",
    vi: "Photobooth sự kiện: iPad nhập mã, màn hình LED sân khấu và trang quản trị.",
  },
  {
    slug: "mblife-luckydraw",
    name: "MB Life Lucky Draw",
    url: "https://mb-luicky-draw-psi.vercel.app",
    hasMockups: true,
    en: "Event lucky draw with an LED screen and an admin page.",
    vi: "Quay số may mắn cho sự kiện, có màn hình LED và trang quản trị.",
  },
  {
    slug: "pendiasure",
    name: "Pendiasure",
    url: "https://trinity-abbott.vercel.app",
    hasMockups: true,
    en: "Guest registration for a scientific seminar.",
    vi: "Đăng ký khách mời cho hội thảo khoa học.",
  },
  {
    slug: "jumpjump",
    name: "Jump Jump",
    url: "https://micatcher-jump-jump.vercel.app",
    hasMockups: true,
    en: "A tap-to-jump arcade game for an anniversary event.",
    vi: "Game nhảy bằng một chạm cho sự kiện kỷ niệm.",
  },
  {
    slug: "vivis",
    projectSlug: "virtual-visit",
    name: "Vivis",
    url: "https://vivis.howlslab.com",
    hasMockups: false,
    en: "A shared virtual space: walk around and meet other visitors live.",
    vi: "Không gian ảo dùng chung: đi dạo và gặp khách tham quan khác theo thời gian thực.",
  },
  {
    slug: "live-puzzle",
    name: "Live Puzzle",
    hasMockups: false,
    en: "Interactive puzzle for live events.",
    vi: "Trò ghép hình tương tác cho sự kiện trực tiếp.",
  },
  {
    slug: "ocx",
    name: "OCX",
    hasMockups: false,
    en: "Online ticketing platform.",
    vi: "Nền tảng bán vé trực tuyến.",
  },
];

export const DEMO_COPY = {
  en: { open: "Open demo", soon: "Demo coming soon", opensNewTab: "opens in a new tab" },
  vi: { open: "Mở demo", soon: "Demo sắp ra mắt", opensNewTab: "mở trong tab mới" },
} as const;

export function demoForProject(projectSlug: string) {
  return DEMO_PROJECTS.find((demo) => demo.projectSlug === projectSlug);
}
