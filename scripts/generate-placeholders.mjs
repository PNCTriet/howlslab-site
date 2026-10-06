/**
 * Builds abstract SVG covers and gallery frames for each project.
 * No stock photography and no real product UI — gradients and geometry only.
 * Run: node scripts/generate-placeholders.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "public", "projects");

const projects = [
  {
    slug: "virtual-visit",
    c1: "#E7EEFF",
    c2: "#C9D8FF",
    orb: "#7EA2FF",
    accent: "#3E5BFF",
    cover: "floor",
    shots: ["avatars", "rooms", "minigame"],
  },
  {
    slug: "virtual-visit-lite",
    c1: "#F3F7FB",
    c2: "#E3EEF8",
    orb: "#A9C6E4",
    accent: "#5E87B0",
    cover: "landing",
    shots: ["landing", "bento", "auth"],
  },
  {
    slug: "howlsos",
    c1: "#F6F4F0",
    c2: "#E7E2D8",
    orb: "#E4C89A",
    accent: "#B8894A",
    cover: "cms",
    shots: ["cms", "editor", "list"],
  },
  {
    slug: "fitting-lab",
    c1: "#FFF1F4",
    c2: "#FFD9E3",
    orb: "#FF9BB4",
    accent: "#F2547D",
    cover: "tryon",
    shots: ["tryon", "catalog", "split"],
  },
  {
    slug: "personal-os",
    c1: "#F8F4EE",
    c2: "#EFE4D4",
    orb: "#F0C39A",
    accent: "#E0924A",
    cover: "bento",
    shots: ["bento", "editor", "calendar"],
  },
  {
    slug: "crm-van-phong-luat",
    c1: "#EEF8F5",
    c2: "#D5EFE8",
    orb: "#8ED4C4",
    accent: "#1F8A70",
    cover: "table",
    shots: ["table", "list", "bars"],
  },
  {
    slug: "ban-ve-live-show",
    c1: "#F3F0FF",
    c2: "#E3DCFF",
    orb: "#B7A8FF",
    accent: "#6D5EFC",
    cover: "tickets",
    shots: ["tickets", "split", "table"],
  },
  {
    slug: "howlsticket",
    c1: "#FFF4EE",
    c2: "#FFE0D0",
    orb: "#FFB088",
    accent: "#F06A32",
    cover: "tickets",
    shots: ["auth", "table", "list"],
  },
  {
    slug: "man-led-su-kien",
    c1: "#F1F8F2",
    c2: "#D9EEDD",
    orb: "#9ED4AE",
    accent: "#3D9A5F",
    cover: "landing",
    shots: ["landing", "bento", "split"],
  },
  {
    slug: "howls-studio",
    c1: "#F3F3F6",
    c2: "#E2E2EA",
    orb: "#C5C5D4",
    accent: "#6E6E80",
    cover: "editorial",
    shots: ["editorial", "catalog", "wave"],
  },
  {
    slug: "brand-package-crm",
    c1: "#F7F5F2",
    c2: "#E8E2D6",
    orb: "#D7C4A3",
    accent: "#8C6A3D",
    cover: "cms",
    shots: ["cms", "list", "split"],
  },
  {
    slug: "cua-hang-in-3d",
    c1: "#F2F7FF",
    c2: "#DDE8F8",
    orb: "#A9C4F5",
    accent: "#4C7FE0",
    cover: "catalog",
    shots: ["catalog", "split", "table"],
  },
  {
    slug: "landing-giai-chay",
    c1: "#F4FFE9",
    c2: "#E3F6C8",
    orb: "#C6E986",
    accent: "#6FA828",
    cover: "wave",
    shots: ["wave", "tickets", "editorial"],
  },
  {
    slug: "ban-ve-su-kien",
    c1: "#F8F1F8",
    c2: "#F0DFF0",
    orb: "#E2B4DE",
    accent: "#B565A7",
    cover: "tickets",
    shots: ["tickets", "auth", "list"],
  },
  {
    slug: "cuon-album",
    c1: "#FAF7F2",
    c2: "#F0E6D6",
    orb: "#E6CBA8",
    accent: "#C4956A",
    cover: "albums",
    shots: ["albums", "catalog", "list"],
  },
  {
    slug: "game-kiosk",
    c1: "#F5F3FF",
    c2: "#E6E0FF",
    orb: "#C4B8FF",
    accent: "#7C6CF0",
    cover: "minigame",
    shots: ["minigame", "landing", "split"],
  },
];

const r = (value) => Math.round(value * 10) / 10;

function rect(x, y, w, h, fill, opacity = 1, radius = 12) {
  return `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" rx="${r(radius)}" fill="${fill}" opacity="${opacity}"/>`;
}

function backdrop(c1, c2, orb, shift) {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="54"/>
      </filter>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#1d1d1f" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="1600" height="1000" fill="url(#bg)"/>
    <circle cx="${1280 - shift}" cy="${140 + shift}" r="240" fill="${orb}" opacity="0.7" filter="url(#blur)"/>
    <circle cx="${220 + shift}" cy="${880 - shift / 2}" r="280" fill="#ffffff" opacity="0.55" filter="url(#blur)"/>
  `;
}

function browser(x, y, w, h, scene) {
  const clip = "win";
  return `
    <defs>
      <clipPath id="${clip}">
        <rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" rx="32"/>
      </clipPath>
    </defs>
    <g filter="url(#shadow)">
      <g clip-path="url(#${clip})">
        <rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" fill="#ffffff"/>
        <rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="56" fill="#f5f5f7"/>
        <circle cx="${r(x + 32)}" cy="${r(y + 28)}" r="6" fill="#ff5f57"/>
        <circle cx="${r(x + 54)}" cy="${r(y + 28)}" r="6" fill="#febc2e"/>
        <circle cx="${r(x + 76)}" cy="${r(y + 28)}" r="6" fill="#28c840"/>
        <rect x="${r(x + w / 2 - 150)}" y="${r(y + 18)}" width="300" height="20" rx="10" fill="#1d1d1f" opacity="0.06"/>
        <g transform="translate(${r(x)} ${r(y + 56)})">
          ${scene(w, h - 56)}
        </g>
      </g>
    </g>
    <rect x="${r(x + 0.5)}" y="${r(y + 0.5)}" width="${r(w - 1)}" height="${r(h - 1)}" rx="32" stroke="#1d1d1f" stroke-opacity="0.08"/>
  `;
}

function floor(w, h, accent) {
  const cx = w / 2;
  const cy = h * 0.62;
  let svg = `<ellipse cx="${r(cx)}" cy="${r(cy)}" rx="${r(w * 0.36)}" ry="${r(h * 0.2)}" fill="${accent}" opacity="0.14"/>`;
  for (let i = -4; i <= 4; i += 1) {
    svg += `<line x1="${r(cx + i * 60)}" y1="${r(cy - h * 0.16)}" x2="${r(cx + i * 110)}" y2="${r(cy + h * 0.22)}" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>`;
  }
  svg += `<line x1="${r(cx - w * 0.34)}" y1="${r(cy)}" x2="${r(cx + w * 0.34)}" y2="${r(cy)}" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>`;
  const spots = [
    [cx - 90, cy - 16],
    [cx + 30, cy + 10],
    [cx + 130, cy - 36],
  ];
  for (const [x, y] of spots) {
    svg += `<circle cx="${r(x)}" cy="${r(y - 22)}" r="12" fill="${accent}"/>`;
    svg += rect(x - 14, y - 6, 28, 18, "#1d1d1f", 0.8, 9);
  }
  return svg;
}

function avatars(w, h, accent) {
  let svg = rect(36, 36, w - 72, h - 72, accent, 0.08, 28);
  const cols = 4;
  for (let i = 0; i < 8; i += 1) {
    const x = 90 + (i % cols) * ((w - 160) / cols);
    const y = 110 + Math.floor(i / cols) * (h * 0.38);
    svg += `<circle cx="${r(x)}" cy="${r(y)}" r="28" fill="${i % 3 === 0 ? accent : "#1d1d1f"}" opacity="${i % 3 === 0 ? 1 : 0.12}"/>`;
    svg += rect(x - 36, y + 40, 72, 14, "#1d1d1f", 0.1, 7);
  }
  return svg;
}

function minigame(w, h, accent) {
  let svg = rect(48, 48, w - 96, h - 96, "#1d1d1f", 0.04, 32);
  svg += `<circle cx="${r(w * 0.38)}" cy="${r(h * 0.52)}" r="${r(Math.min(w, h) * 0.22)}" fill="${accent}" opacity="0.9"/>`;
  svg += `<circle cx="${r(w * 0.38)}" cy="${r(h * 0.52)}" r="${r(Math.min(w, h) * 0.1)}" fill="#ffffff" opacity="0.9"/>`;
  svg += rect(w * 0.62, h * 0.28, w * 0.24, 18, "#1d1d1f", 0.16, 9);
  svg += rect(w * 0.62, h * 0.28 + 36, w * 0.18, 12, "#1d1d1f", 0.08, 6);
  svg += rect(w * 0.62, h * 0.28 + 70, 120, 36, accent, 1, 18);
  return svg;
}

function rooms(w, h, accent) {
  const gap = 20;
  const pad = 36;
  const cw = (w - pad * 2 - gap) / 2;
  const ch = (h - pad * 2 - gap) / 2;
  return [
    rect(pad, pad, cw, ch, accent, 0.85, 24),
    rect(pad + cw + gap, pad, cw, ch, "#1d1d1f", 0.06, 24),
    rect(pad, pad + ch + gap, cw, ch * 0.7, "#1d1d1f", 0.06, 24),
    rect(pad + cw + gap, pad + ch + gap, cw, ch * 0.7, accent, 0.2, 24),
  ].join("");
}

function landing(w, h, accent) {
  return [
    rect(40, 48, w * 0.38, 26, "#1d1d1f", 0.88, 10),
    rect(40, 90, w * 0.3, 14, "#1d1d1f", 0.12, 7),
    rect(40, 114, w * 0.24, 14, "#1d1d1f", 0.08, 7),
    rect(40, 168, 140, 40, accent, 1, 20),
    rect(w * 0.5, 40, w * 0.44, h - 80, accent, 0.16, 28),
  ].join("");
}

function bento(w, h, accent) {
  return [
    rect(32, 32, w * 0.46, h * 0.56, accent, 0.18, 24),
    rect(32 + w * 0.46 + 16, 32, w * 0.42, h * 0.26, "#1d1d1f", 0.06, 20),
    rect(32 + w * 0.46 + 16, 32 + h * 0.26 + 16, w * 0.42, h * 0.26, accent, 0.75, 20),
    rect(32, 32 + h * 0.56 + 16, w * 0.28, h * 0.28, "#1d1d1f", 0.06, 20),
    rect(32 + w * 0.28 + 16, 32 + h * 0.56 + 16, w * 0.58, h * 0.28, "#1d1d1f", 0.05, 20),
  ].join("");
}

function cms(w, h, accent) {
  let svg = rect(0, 0, w * 0.24, h, "#1d1d1f", 0.04, 0);
  svg += rect(24, 28, w * 0.16, 18, accent, 0.9, 8);
  for (let i = 0; i < 5; i += 1) {
    svg += rect(24, 72 + i * 42, w * 0.16, 14, "#1d1d1f", i === 1 ? 0.2 : 0.08, 7);
  }
  svg += rect(w * 0.28, 28, w * 0.3, 22, "#1d1d1f", 0.12, 8);
  for (let i = 0; i < 3; i += 1) {
    svg += rect(w * 0.28 + i * (w * 0.22), 80, w * 0.2, h * 0.42, accent, 0.08 + i * 0.08, 18);
  }
  return svg;
}

function editor(w, h, accent) {
  let svg = rect(32, 28, w - 64, 48, "#1d1d1f", 0.04, 14);
  svg += rect(48, 42, 120, 20, accent, 0.85, 10);
  for (let i = 0; i < 7; i += 1) {
    const width = i % 3 === 2 ? w * 0.46 : w * 0.62;
    svg += rect(48, 104 + i * 36, width, 14, "#1d1d1f", 0.1, 7);
  }
  svg += rect(w * 0.74, 104, w * 0.18, h * 0.5, accent, 0.15, 16);
  return svg;
}

function list(w, h, accent) {
  let svg = "";
  const rows = 6;
  for (let i = 0; i < rows; i += 1) {
    const y = 28 + i * ((h - 40) / rows);
    svg += rect(32, y, w - 64, (h - 40) / rows - 12, "#1d1d1f", 0.04, 16);
    svg += `<circle cx="${r(64)}" cy="${r(y + 28)}" r="8" fill="${accent}" opacity="${i % 2 === 0 ? 1 : 0.35}"/>`;
    svg += rect(88, y + 20, w * 0.32, 14, "#1d1d1f", 0.14, 7);
    svg += rect(w * 0.62, y + 20, w * 0.16, 14, "#1d1d1f", 0.08, 7);
  }
  return svg;
}

function tryon(w, h, accent) {
  return [
    rect(40, 36, w * 0.48, h - 72, accent, 0.16, 32),
    `<circle cx="${r(40 + w * 0.24)}" cy="${r(h * 0.42)}" r="${r(Math.min(w, h) * 0.14)}" fill="#ffffff"/>`,
    rect(40 + w * 0.24 - 36, h * 0.42 + Math.min(w, h) * 0.1, 72, 120, "#ffffff", 0.85, 28),
    rect(w * 0.56, 48, w * 0.36, 72, "#1d1d1f", 0.05, 18),
    rect(w * 0.56, 136, w * 0.36, 72, "#1d1d1f", 0.05, 18),
    rect(w * 0.56, 228, 150, 42, accent, 1, 21),
  ].join("");
}

function catalog(w, h, accent) {
  let svg = "";
  const cols = 3;
  const rows = 2;
  const gap = 18;
  const pad = 36;
  const cw = (w - pad * 2 - gap * (cols - 1)) / cols;
  const ch = (h - pad * 2 - gap * (rows - 1)) / rows;
  for (let i = 0; i < cols * rows; i += 1) {
    const x = pad + (i % cols) * (cw + gap);
    const y = pad + Math.floor(i / cols) * (ch + gap);
    svg += rect(x, y, cw, ch, i === 0 ? accent : "#1d1d1f", i === 0 ? 0.85 : 0.06, 20);
  }
  return svg;
}

function split(w, h, accent) {
  return [
    rect(32, 32, w * 0.46, h - 64, accent, 0.18, 24),
    rect(w * 0.52, 48, w * 0.28, 22, "#1d1d1f", 0.8, 8),
    rect(w * 0.52, 88, w * 0.36, 14, "#1d1d1f", 0.1, 7),
    rect(w * 0.52, 112, w * 0.3, 14, "#1d1d1f", 0.08, 7),
    rect(w * 0.52, 160, 132, 40, accent, 1, 20),
    rect(w * 0.52, 230, w * 0.38, h * 0.28, "#1d1d1f", 0.05, 16),
  ].join("");
}

function calendar(w, h, accent) {
  let svg = rect(40, 36, w - 80, 56, "#1d1d1f", 0.05, 16);
  svg += rect(56, 52, 90, 24, accent, 1, 12);
  const cols = 7;
  const rows = 4;
  const gap = 12;
  const pad = 48;
  const cw = (w - pad * 2 - gap * (cols - 1)) / cols;
  const ch = (h - 140 - gap * (rows - 1)) / rows;
  for (let i = 0; i < cols * rows; i += 1) {
    const x = pad + (i % cols) * (cw + gap);
    const y = 116 + Math.floor(i / cols) * (ch + gap);
    const on = i % 6 === 2 || i % 11 === 0;
    svg += rect(x, y, cw, ch, on ? accent : "#1d1d1f", on ? 0.85 : 0.06, 10);
  }
  return svg;
}

function table(w, h, accent) {
  let svg = rect(28, 24, w - 56, 52, "#1d1d1f", 0.04, 14);
  svg += rect(44, 40, w * 0.18, 18, accent, 0.9, 8);
  for (let i = 0; i < 6; i += 1) {
    const y = 100 + i * ((h - 120) / 6);
    svg += `<line x1="28" y1="${r(y)}" x2="${r(w - 28)}" y2="${r(y)}" stroke="#1d1d1f" stroke-opacity="0.08"/>`;
    svg += `<circle cx="52" cy="${r(y + 26)}" r="6" fill="${i % 2 ? accent : "#1d1d1f"}" opacity="${i % 2 ? 1 : 0.25}"/>`;
    svg += rect(76, y + 18, w * 0.28, 14, "#1d1d1f", 0.12, 7);
    svg += rect(w * 0.48, y + 18, w * 0.16, 14, "#1d1d1f", 0.08, 7);
    svg += rect(w * 0.74, y + 14, 78, 24, accent, 0.16, 12);
  }
  return svg;
}

function bars(w, h, accent) {
  let svg = "";
  const heights = [0.35, 0.62, 0.48, 0.8, 0.42, 0.7, 0.55];
  const gap = 18;
  const pad = 48;
  const bw = (w - pad * 2 - gap * (heights.length - 1)) / heights.length;
  heights.forEach((pct, i) => {
    const bh = (h - 120) * pct;
    svg += rect(pad + i * (bw + gap), h - 48 - bh, bw, bh, accent, 0.25 + pct * 0.7, 14);
  });
  return svg;
}

function tickets(w, h, accent) {
  let svg = "";
  for (let i = 0; i < 3; i += 1) {
    const y = 36 + i * ((h - 48) / 3);
    const th = (h - 48) / 3 - 16;
    const fill = i === 0 ? accent : "#1d1d1f";
    const opacity = i === 0 ? 0.92 : 0.06;
    svg += rect(72, y, w - 144, th, fill, opacity, 22);
    svg += `<circle cx="72" cy="${r(y + th / 2)}" r="16" fill="#ffffff"/>`;
    svg += `<circle cx="${r(w - 72)}" cy="${r(y + th / 2)}" r="16" fill="#ffffff"/>`;
    svg += rect(108, y + th / 2 - 10, w * 0.28, 16, i === 0 ? "#ffffff" : "#1d1d1f", i === 0 ? 0.85 : 0.12, 8);
  }
  return svg;
}

function auth(w, h, accent) {
  const cw = Math.min(420, w * 0.46);
  const ch = Math.min(300, h * 0.62);
  const x = (w - cw) / 2;
  const y = (h - ch) / 2;
  return [
    rect(x, y, cw, ch, "#1d1d1f", 0.04, 28),
    rect(x + 36, y + 40, cw * 0.45, 20, "#1d1d1f", 0.16, 8),
    rect(x + 36, y + 84, cw - 72, 40, "#ffffff", 1, 12),
    rect(x + 36, y + 140, cw - 72, 40, "#ffffff", 1, 12),
    rect(x + 36, y + ch - 76, cw - 72, 40, accent, 1, 20),
  ].join("");
}

function editorial(w, h, accent) {
  return [
    rect(40, 40, w * 0.5, h * 0.62, accent, 0.16, 28),
    rect(40, 40 + h * 0.62 + 20, w * 0.22, 16, "#1d1d1f", 0.14, 8),
    rect(w * 0.56, 48, w * 0.34, 18, "#1d1d1f", 0.8, 8),
    rect(w * 0.56, 84, w * 0.28, 12, "#1d1d1f", 0.1, 6),
    rect(w * 0.56, 108, w * 0.32, 12, "#1d1d1f", 0.08, 6),
    rect(w * 0.56, 132, w * 0.24, 12, "#1d1d1f", 0.08, 6),
    rect(w * 0.56, 190, w * 0.36, h * 0.36, "#1d1d1f", 0.05, 20),
  ].join("");
}

function albums(w, h, accent) {
  const size = Math.min(w, h) * 0.42;
  return [
    `<g transform="translate(${r(w * 0.18)} ${r(h * 0.18)}) rotate(-8 ${r(size / 2)} ${r(size / 2)})">${rect(0, 0, size, size, "#1d1d1f", 0.08, 28)}</g>`,
    `<g transform="translate(${r(w * 0.34)} ${r(h * 0.22)}) rotate(6 ${r(size / 2)} ${r(size / 2)})">${rect(0, 0, size, size, accent, 0.85, 28)}</g>`,
    `<g transform="translate(${r(w * 0.5)} ${r(h * 0.3)}) rotate(-2 ${r(size / 2)} ${r(size / 2)})">${rect(0, 0, size * 0.86, size * 0.86, "#ffffff", 0.8, 24)}</g>`,
  ].join("");
}

function wave(w, h, accent) {
  const samples = [30, 48, 36, 70, 54, 88, 46, 76, 40, 92, 58, 66, 34, 72, 50, 84];
  const gap = 10;
  const pad = 40;
  const bw = (w - pad * 2 - gap * (samples.length - 1)) / samples.length;
  return samples
    .map((pct, i) => {
      const bh = (h - 100) * (pct / 100);
      return rect(pad + i * (bw + gap), h - 40 - bh, bw, bh, accent, 0.35 + pct / 180, 8);
    })
    .join("");
}

const scenes = {
  floor,
  avatars,
  minigame,
  rooms,
  landing,
  bento,
  cms,
  editor,
  list,
  tryon,
  catalog,
  split,
  calendar,
  table,
  bars,
  tickets,
  auth,
  editorial,
  albums,
  wave,
};

function frame({ c1, c2, orb, accent }, sceneName, inset) {
  const draw = scenes[sceneName];
  if (!draw) throw new Error(`Unknown scene ${sceneName}`);
  const shift = sceneName.length * 6;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" fill="none">
  ${backdrop(c1, c2, orb, inset ? shift : shift / 2)}
  ${browser(inset.x, inset.y, inset.w, inset.h, (w, h) => draw(w, h, accent))}
</svg>
`;
}

fs.rmSync(root, { recursive: true, force: true });

for (const project of projects) {
  const dir = path.join(root, project.slug);
  fs.mkdirSync(dir, { recursive: true });
  const cover = frame(project, project.cover, { x: 250, y: 130, w: 1100, h: 720 });
  fs.writeFileSync(path.join(dir, "cover.svg"), cover);
  project.shots.forEach((scene, index) => {
    const shot = frame(project, scene, { x: 70, y: 60, w: 1460, h: 880 });
    fs.writeFileSync(path.join(dir, `0${index + 1}.svg`), shot);
  });
}

console.log(`Wrote placeholders for ${projects.length} projects.`);
