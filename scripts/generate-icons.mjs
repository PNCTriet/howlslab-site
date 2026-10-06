/**
 * Builds one squircle app icon per project: a soft two-stop gradient, a gentle
 * top highlight, and a simple white glyph drawn on a 120 × 120 grid.
 * Output: public/projects/<slug>/icon.svg  (plus public/avatar.svg)
 * Run: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "public");

/** Superellipse (n = 5) — close to the continuous-corner iOS icon mask. */
function squirclePath(size = 120, n = 5, steps = 240) {
  const r = size / 2;
  const points = [];
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = r + r * Math.sign(c) * Math.abs(c) ** (2 / n);
    const y = r + r * Math.sign(s) * Math.abs(s) ** (2 / n);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

const SQUIRCLE = squirclePath();

// Stroke-first glyphs, SF Symbols-ish: round caps, 7px lines on a 120 grid.
const stroke = 'fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"';
const thin = 'fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"';

const glyphs = {
  // People meeting on an isometric floor.
  "virtual-visit": `
    <path ${thin} opacity="0.5" d="M60 74 94 89 60 104 26 89Z"/>
    <circle cx="48" cy="44" r="9" fill="#fff"/>
    <path fill="#fff" d="M34 74c0-9 6.3-15 14-15s14 6 14 15c0 2-1.6 3.5-3.5 3.5h-21C35.6 77.5 34 76 34 74Z"/>
    <circle cx="74" cy="50" r="8" fill="#fff" opacity="0.85"/>
    <path fill="#fff" opacity="0.85" d="M62 78c0-8 5.4-13.5 12-13.5S86 70 86 78c0 1.8-1.4 3.2-3.2 3.2H65.2C63.4 81.2 62 79.8 62 78Z"/>`,
  // An open door, light streaming through.
  "virtual-visit-lite": `
    <path ${stroke} d="M38 92V34a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v58"/>
    <path fill="#fff" d="M44 33.5 70 40v52H44Z" opacity="0.95"/>
    <circle cx="64" cy="66" r="3.2" fill="#0a84ff"/>
    <path ${stroke} d="M30 92h60"/>`,
  // Four OS tiles, one lit.
  howlsos: `
    <rect x="30" y="30" width="26" height="26" rx="8" fill="#fff"/>
    <rect x="64" y="30" width="26" height="26" rx="8" fill="#ff9f0a"/>
    <rect x="30" y="64" width="26" height="26" rx="8" fill="#fff" opacity="0.9"/>
    <rect x="64" y="64" width="26" height="26" rx="8" fill="#fff" opacity="0.55"/>`,
  // Clothes hanger.
  "fitting-lab": `
    <path ${stroke} d="M52 40a8 8 0 1 1 11.5 7.2c-2.3 1.1-3.5 2.8-3.5 5.3V56"/>
    <path ${stroke} d="M60 56 26 80a4 4 0 0 0 2.3 7.3h63.4A4 4 0 0 0 94 80Z"/>`,
  // A day dial — time, focus, one dot of today.
  "personal-os": `
    <circle cx="60" cy="60" r="30" ${stroke}/>
    <path ${stroke} d="M60 42v18l12 8"/>
    <circle cx="60" cy="60" r="4.5" fill="#fff"/>`,
  // Scales of justice.
  "crm-van-phong-luat": `
    <path ${stroke} d="M60 30v58M44 92h32M34 42h52"/>
    <path ${thin} d="M34 42 24 66M34 42l10 24M86 42 76 66M86 42l10 24"/>
    <path fill="#fff" d="M22 66h24a12 9 0 0 1-24 0ZM74 66h24a12 9 0 0 1-24 0Z"/>
    <circle cx="60" cy="30" r="5" fill="#fff"/>`,
  // Ticket with a star — the show.
  "ban-ve-live-show": `
    <path fill="#fff" d="M28 40a6 6 0 0 1 6-6h52a6 6 0 0 1 6 6v10a10 10 0 0 0 0 20v10a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6V70a10 10 0 0 0 0-20Z"/>
    <path fill="#c644fc" d="m60 46 4.1 8.6 9.4 1.2-6.9 6.5 1.8 9.3L60 67l-8.4 4.6 1.8-9.3-6.9-6.5 9.4-1.2Z"/>`,
  // Admin ticket stub with perforation.
  howlsticket: `
    <path ${stroke} d="M30 42a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v8a10 10 0 0 0 0 20v8a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6v-8a10 10 0 0 0 0-20Z"/>
    <path fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 10" d="M70 44v32"/>
    <path ${thin} d="M42 54h14M42 66h10"/>`,
  // LED dot matrix forming a heart.
  "man-led-su-kien": (() => {
    const on = new Set([
      "1,0", "2,0", "4,0", "5,0",
      "0,1", "1,1", "2,1", "3,1", "4,1", "5,1", "6,1",
      "0,2", "1,2", "2,2", "3,2", "4,2", "5,2", "6,2",
      "1,3", "2,3", "3,3", "4,3", "5,3",
      "2,4", "3,4", "4,4",
      "3,5",
    ]);
    let dots = "";
    for (let y = 0; y < 6; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const lit = on.has(`${x},${y}`);
        dots += `<circle cx="${33 + x * 9}" cy="${37 + y * 9.2}" r="3.7" fill="#fff" opacity="${lit ? 1 : 0.14}"/>`;
      }
    }
    return dots;
  })(),
  // Motion waves around a body — interactive, controller-free.
  "howls-studio": `
    <circle cx="60" cy="60" r="9" fill="#fff"/>
    <path ${thin} d="M44 44a22 22 0 0 0 0 32M76 44a22 22 0 0 1 0 32"/>
    <path ${thin} opacity="0.5" d="M34 34a36 36 0 0 0 0 52M86 34a36 36 0 0 1 0 52"/>`,
  // Brand package: an isometric box.
  "brand-package-crm": `
    <path fill="#fff" d="M60 28 90 43v34L60 92 30 77V43Z" opacity="0.98"/>
    <path fill="none" stroke="#ff9f0a" stroke-width="4" stroke-linejoin="round" d="M30 43l30 15 30-15M60 58v34"/>
    <path fill="none" stroke="#ff9f0a" stroke-width="4" stroke-linecap="round" d="M45 35.5 75 50.5"/>`,
  // 3D print: nozzle over stacked layers.
  "cua-hang-in-3d": `
    <path fill="#fff" d="M50 26h20v10l-6 10h-8l-6-10Z"/>
    <rect x="34" y="58" width="52" height="8" rx="4" fill="#fff" opacity="0.6"/>
    <rect x="30" y="70" width="60" height="8" rx="4" fill="#fff" opacity="0.8"/>
    <rect x="26" y="82" width="68" height="8" rx="4" fill="#fff"/>
    <circle cx="60" cy="51" r="3" fill="#fff"/>`,
  // Running track lanes.
  "landing-giai-chay": `
    <rect x="22" y="36" width="76" height="48" rx="24" ${stroke}/>
    <rect x="36" y="49" width="48" height="22" rx="11" ${thin} opacity="0.6"/>
    <path fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" d="M60 36v13"/>`,
  // Event calendar.
  "ban-ve-su-kien": `
    <rect x="28" y="34" width="64" height="56" rx="12" fill="#fff"/>
    <path fill="#ff3b30" d="M28 46a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12v4H28Z"/>
    <path fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" d="M44 28v12M76 28v12"/>
    <circle cx="60" cy="70" r="7" fill="#0a84ff"/>`,
  // Photo with a person tag.
  "cuon-album": `
    <rect x="26" y="32" width="68" height="56" rx="12" fill="#fff"/>
    <path fill="#ff7aa2" d="M26 76 46 58l14 12 10-8 24 18v0a12 12 0 0 1-12 8H38a12 12 0 0 1-12-12Z"/>
    <circle cx="74" cy="48" r="7" fill="#a970ff"/>`,
  // Webcam lens with a crosshair.
  "game-kiosk": `
    <circle cx="60" cy="56" r="26" ${stroke}/>
    <circle cx="60" cy="56" r="10" fill="#30d158"/>
    <path ${thin} d="M60 22v8M60 82v8M26 56h8M86 56h8"/>
    <path ${stroke} d="M46 96h28"/>`,
};

const palettes = {
  "virtual-visit": ["#7D7AFF", "#5E5CE6", "#3634A3"],
  "virtual-visit-lite": ["#70D7FF", "#32ADE6", "#0071E3"],
  howlsos: ["#48484A", "#2C2C2E", "#1C1C1E"],
  "fitting-lab": ["#FF8BA7", "#FF5E7E", "#E0325A"],
  "personal-os": ["#5EE38A", "#30D158", "#1FA347"],
  "crm-van-phong-luat": ["#5B8CFF", "#2F5FE0", "#1C3FAA"],
  "ban-ve-live-show": ["#E07BFF", "#BF5AF2", "#8E3AC7"],
  howlsticket: ["#FFB340", "#FF8A00", "#F05A00"],
  "man-led-su-kien": ["#3A3A6A", "#24244A", "#121230"],
  "howls-studio": ["#6E6E73", "#3A3A3C", "#1C1C1E"],
  "brand-package-crm": ["#FFE066", "#FFC700", "#F5A300"],
  "cua-hang-in-3d": ["#5CE1D6", "#00C7BE", "#00968F"],
  "landing-giai-chay": ["#B6EB6A", "#7DD13F", "#4AA82A"],
  "ban-ve-su-kien": ["#9ED8FF", "#5AC8FA", "#2E9BF0"],
  "cuon-album": ["#FFB3C7", "#F78FB3", "#C77DFF"],
  "game-kiosk": ["#2E2E3A", "#1A1A24", "#0B0B12"],
};

function iconSvg(slug) {
  const [a, b, c] = palettes[slug];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="0.55" stop-color="${b}"/>
      <stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <linearGradient id="hl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.28"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.4" flood-color="#000" flood-opacity="0.18"/>
    </filter>
    <clipPath id="m"><path d="${SQUIRCLE}"/></clipPath>
  </defs>
  <g clip-path="url(#m)">
    <rect width="120" height="120" fill="url(#g)"/>
    <rect width="120" height="120" fill="url(#hl)"/>
  </g>
  <path d="${SQUIRCLE}" fill="none" stroke="#000" stroke-opacity="0.08" stroke-width="1"/>
  <g filter="url(#s)">${glyphs[slug]}
  </g>
</svg>
`;
}

for (const slug of Object.keys(glyphs)) {
  const dir = path.join(root, "projects", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "icon.svg"), iconSvg(slug));
}

const avatar = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2c2c2e"/>
      <stop offset="1" stop-color="#000"/>
    </linearGradient>
  </defs>
  <path d="${SQUIRCLE}" fill="url(#a)"/>
  <path fill="#fff" d="M40 34h9.6v21h20.8V34H80v52h-9.6V64.2H49.6V86H40Z"/>
</svg>
`;
fs.writeFileSync(path.join(root, "avatar.svg"), avatar);
console.log(`Wrote ${Object.keys(glyphs).length} icons + avatar.svg`);
