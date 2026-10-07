export type Lang = "en" | "vi";

export const TRY_ON_URL = "https://tryon.howlslab.com";

export const BOOK_CALL_HREF =
  "mailto:howls.sslab@gmail.com?subject=Fitting%20Lab%20%E2%80%93%2015-min%20call";

/** Official pilot lines. Shown verbatim in both languages. */
export const TARGETS = [
  {
    date: "Q1 2027",
    text: "Pilot target: 10 fashion brands by Q1 2027",
  },
  {
    date: "Q2 2027",
    text: "Goal: 1,000 try-on sessions/month by Q2 2027",
  },
  {
    date: "Q3 2027",
    text: "Target: 5 brands on paid plans by Q3 2027",
  },
] as const;

export const ALSO_BUILT = [
  {
    href: "/projects/virtual-visit",
    en: {
      title: "Virtual Visit",
      body: "A realtime shared virtual space.",
    },
    vi: {
      title: "Virtual Visit",
      body: "Không gian ảo dùng chung, cập nhật theo thời gian thực.",
    },
  },
  {
    href: "/projects/howlsos",
    en: {
      title: "HowlsOS",
      body: "An internal ops dashboard with AI agents.",
    },
    vi: {
      title: "HowlsOS",
      body: "Bảng điều khiển vận hành nội bộ, có agent AI.",
    },
  },
  {
    href: undefined,
    en: {
      title: "CRM DNY",
      body: "A CRM with orders, contracts, and payroll.",
    },
    vi: {
      title: "CRM DNY",
      body: "CRM cho đơn hàng, hợp đồng và lương.",
    },
  },
  {
    href: undefined,
    en: {
      title: "AI video receptionist",
      body: "A bilingual realtime avatar that greets and answers.",
    },
    vi: {
      title: "Lễ tân video AI",
      body: "Avatar realtime, nói được cả tiếng Việt và tiếng Anh.",
    },
  },
] as const;

export const copy = {
  en: {
    skip: "Skip to content",
    langGroup: "Language",
    navLabel: "Primary",
    navProduct: "Product",
    navTargets: "Targets",
    navWork: "Work",
    navContact: "Contact",
    footerNav: "Footer",
    footerBlurb: "Howls Lab in Ho Chi Minh City. Fitting Lab, and the products around it.",
    contactPage: "Contact form",
    earlier: "Earlier homepages",
    themeLight: "Switch to light appearance",
    themeDark: "Switch to dark appearance",
    newTab: "opens in a new tab",
    eyebrow: "Howls Lab · Ho Chi Minh City",
    heroTitle: "Fitting Lab",
    heroBody:
      "AI virtual try-on for fashion brands. A demo room built around your catalog, a link you can send, and an AI layer that answers shoppers and follows up on qualified leads.",
    partner:
      "The try-on engine comes from a technology partner. Howls Lab owns the product layer around it.",
    tryDemo: "Try the demo",
    bookCall: "Book a 15-min call",
    heroNote: "See it live",
    navAudience: "Fitting Lab",
    desktopAlt: "Fitting Lab on MacBook Pro: a brand demo room for fashion try-on",
    mobileAlt: "Fitting Lab on iPhone 16 Pro",
    howKicker: "For brands",
    howTitle: "How it works for brands",
    howIntro: "Four steps from a catalog to a conversation worth having.",
    steps: [
      {
        title: "A demo room for your catalog",
        body: "We set up a brand demo room and load the pieces you want shoppers to try.",
      },
      {
        title: "Share a link",
        body: "Send one link. The person opening it does not install an app.",
      },
      {
        title: "Shoppers try on. The assistant answers.",
        body: "They try garments on. An AI shopping assistant stays in the session and answers as they look.",
      },
      {
        title: "Qualified leads, tracked and followed up",
        body: "Leads that are worth a conversation are recorded, then followed up.",
      },
    ],
    targetsKicker: "Roadmap",
    targetsTitle: "Roadmap & pilot targets",
    targetsIntro: "What we are aiming at. Each card is a target, with a date.",
    targetBadge: "Target",
    targetsNote: "Targets, not results.",
    workKicker: "The lab",
    workTitle: "Also built by the lab",
    workIntro: "Fitting Lab is the product in front. These are the others — proof the lab ships fast.",
    viewCase: "View case study",
    aboutKicker: "About",
    aboutTitle: "Howls Lab",
    aboutBody:
      "Howls Lab was founded in 2025 in Ho Chi Minh City, Vietnam. The founders are Triết and Đông.",
    contactKicker: "Contact",
    contactTitle: "Talk to the lab",
    contactBody: "Write to howls.sslab@gmail.com, or book a 15-minute call about Fitting Lab.",
    emailCta: "Email the lab",
  },
  vi: {
    skip: "Đi tới nội dung",
    langGroup: "Ngôn ngữ",
    navLabel: "Chính",
    navProduct: "Sản phẩm",
    navTargets: "Mục tiêu",
    navWork: "Đã làm",
    navContact: "Liên hệ",
    footerNav: "Chân trang",
    footerBlurb: "Howls Lab tại Thành phố Hồ Chí Minh. Fitting Lab, và những sản phẩm quanh nó.",
    contactPage: "Biểu mẫu liên hệ",
    earlier: "Bản trang chủ trước",
    themeLight: "Bật giao diện sáng",
    themeDark: "Bật giao diện tối",
    newTab: "mở trong tab mới",
    eyebrow: "Howls Lab · Thành phố Hồ Chí Minh",
    heroTitle: "Fitting Lab",
    heroBody:
      "Thử đồ ảo bằng AI cho thương hiệu thời trang. Phòng demo dựng theo catalog của brand, một link để gửi đi, và lớp AI trả lời khách rồi theo dõi lead đủ điều kiện.",
    partner: "Máy thử đồ đến từ đối tác công nghệ. Howls Lab giữ lớp sản phẩm bao quanh nó.",
    tryDemo: "Xem bản demo",
    bookCall: "Đặt lịch 15 phút",
    heroNote: "Xem ngay",
    navAudience: "Fitting Lab",
    desktopAlt: "Fitting Lab trên MacBook Pro: phòng demo thử đồ cho thương hiệu thời trang",
    mobileAlt: "Fitting Lab trên iPhone 16 Pro",
    howKicker: "Cho brand",
    howTitle: "Brand dùng như thế nào",
    howIntro: "Bốn bước, từ catalog đến một cuộc nói chuyện đáng làm.",
    steps: [
      {
        title: "Phòng demo theo catalog",
        body: "Dựng phòng demo cho brand và đưa đúng những món bạn muốn khách thử.",
      },
      {
        title: "Gửi một link",
        body: "Một đường link là đủ. Người mở link không cần cài app.",
      },
      {
        title: "Khách thử đồ, trợ lý trả lời",
        body: "Khách thử trang phục ngay trong phòng. Trợ lý mua sắm bằng AI ở lại phiên và giải đáp trong lúc xem.",
      },
      {
        title: "Lead được ghi và theo dõi tiếp",
        body: "Lead đủ điều kiện được lưu lại, rồi có người theo tiếp.",
      },
    ],
    targetsKicker: "Lộ trình",
    targetsTitle: "Lộ trình và mục tiêu pilot",
    targetsIntro: "Những gì lab đang nhắm tới. Mỗi thẻ là một mục tiêu, kèm mốc thời gian.",
    targetBadge: "Target",
    targetsNote: "Mục tiêu, chưa phải kết quả.",
    workKicker: "Lab",
    workTitle: "Lab cũng đã làm",
    workIntro: "Fitting Lab là sản phẩm đang đưa ra trước. Những thứ dưới đây cho thấy lab ship nhanh.",
    viewCase: "Xem case study",
    aboutKicker: "Về lab",
    aboutTitle: "Howls Lab",
    aboutBody:
      "Howls Lab thành lập năm 2025 tại Thành phố Hồ Chí Minh, Việt Nam. Hai nhà sáng lập là Triết và Đông.",
    contactKicker: "Liên hệ",
    contactTitle: "Nói chuyện với lab",
    contactBody: "Gửi thư tới howls.sslab@gmail.com, hoặc đặt 15 phút để nói về Fitting Lab.",
    emailCta: "Gửi email cho lab",
  },
} as const;
