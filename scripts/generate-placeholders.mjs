/**
 * Generates every on-brand image the storefront references — as optimised WebP.
 * Keeps the project 100% WebP (no jpg/png anywhere). Replace any file in
 * /public/images with a real photograph (also WebP) whenever you have one.
 *
 *   npm run gen:images
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public");

const TEAL = "#0E8388";
const TEAL_LIGHT = "#2FB4B6";
const TEAL_BRIGHT = "#3FD0CE";
const TEAL_CORE = "#5FD6D4";
const INK = "#0C141B";
const INK_2 = "#1C2630";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** wrap a label to N chars per line (max 3 lines). */
function wrap(text, max = 18) {
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 3);
}

/** Jolchap seal + water-drop mark as an SVG group. */
function drop(x, y, s, color = TEAL, hi = TEAL_CORE, opacity = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${s / 100})" opacity="${opacity}">
    <circle cx="50" cy="50" r="43" fill="none" stroke="${color}" stroke-width="1.6" opacity="0.4"/>
    <circle cx="50" cy="50" r="39" fill="none" stroke="${color}" stroke-width="2.6" stroke-dasharray="2.6 4.2" stroke-linecap="round" opacity="0.85"/>
    <path d="M50 28C57.5 41 64.5 48 64.5 57.5A14.5 14.5 0 1 1 35.5 57.5C35.5 48 42.5 41 50 28Z" fill="${color}"/>
    <ellipse cx="44.5" cy="54" rx="2.6" ry="4.2" transform="rotate(-22 44.5 54)" fill="${hi}" opacity="0.85"/>
  </g>`;
}

/**
 * Dramatic, clearly-lit branded poster: a deep ink stage washed with a bright
 * teal spotlight, concentric stamp rings, light streaks and the Jolchap seal —
 * reads unmistakably as styled product imagery rather than a flat dark box.
 */
function poster({ w, h, label, sub, tag, i = 0 }) {
  const min = Math.min(w, h);
  const spots = [
    [0.74, 0.28],
    [0.28, 0.32],
    [0.68, 0.7],
    [0.5, 0.22],
    [0.32, 0.68],
    [0.8, 0.5],
  ];
  const [gx, gy] = spots[i % spots.length];
  const angle = 115 + (i % 4) * 22;
  const lines = wrap(label, w < 700 ? 15 : 22);
  const fontSize = Math.round(min * (w < 700 ? 0.092 : 0.072));
  const baseY = h - lines.length * fontSize * 1.1 - h * 0.075;
  const markSize = min * 0.62;
  const mx = (i % 2 === 0 ? 0.55 : 0.16) * w;
  const my = 0.16 * h;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${INK_2}"/>
      <stop offset="60%" stop-color="${INK}"/>
      <stop offset="100%" stop-color="#05080B"/>
    </linearGradient>
    <radialGradient id="spot" cx="${gx * 100}%" cy="${gy * 100}%" r="60%">
      <stop offset="0%" stop-color="${TEAL_BRIGHT}" stop-opacity="0.8"/>
      <stop offset="35%" stop-color="${TEAL}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${TEAL}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spot2" cx="${(1 - gx) * 100}%" cy="${(1 - gy) * 100}%" r="40%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${TEAL_LIGHT}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    ${Array.from({ length: Math.ceil(w / 70) }, (_, k) => `<line x1="${k * 70}" y1="0" x2="${k * 70}" y2="${h}"/>`).join("")}
    ${Array.from({ length: Math.ceil(h / 70) }, (_, k) => `<line x1="0" y1="${k * 70}" x2="${w}" y2="${k * 70}"/>`).join("")}
  </g>

  <g stroke="${TEAL}" stroke-opacity="0.16" stroke-width="2">
    <line x1="${-h}" y1="${h * 0.2}" x2="${w}" y2="${h * 0.2 - w}" />
    <line x1="${-h}" y1="${h * 0.55}" x2="${w}" y2="${h * 0.55 - w}" />
    <line x1="${-h}" y1="${h * 0.9}" x2="${w}" y2="${h * 0.9 - w}" />
  </g>

  <g fill="none" stroke="${TEAL}" stroke-opacity="0.22">
    <circle cx="${gx * w}" cy="${gy * h}" r="${min * 0.5}"/>
    <circle cx="${gx * w}" cy="${gy * h}" r="${min * 0.34}" stroke-opacity="0.3"/>
    <circle cx="${gx * w}" cy="${gy * h}" r="${min * 0.18}" stroke-opacity="0.4"/>
  </g>

  <rect width="${w}" height="${h}" fill="url(#spot)"/>
  <rect width="${w}" height="${h}" fill="url(#spot2)"/>

  ${drop(mx, my, markSize, TEAL, TEAL_CORE, 0.92)}

  <rect x="0" y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="url(#floor)"/>

  ${drop(w * 0.055, h * 0.05, min * 0.13, "#fff", TEAL_LIGHT, 1)}
  <text x="${w * 0.055 + min * 0.155}" y="${h * 0.05 + min * 0.1}" font-family="Arial, sans-serif" font-weight="800" font-size="${Math.round(min * 0.056)}" letter-spacing="2" fill="#ffffff">JOLCHAP</text>

  ${tag ? `<g><rect x="${w - w * 0.055 - tag.length * fontSize * 0.32 - 26}" y="${h * 0.05}" rx="${fontSize * 0.4}" width="${tag.length * fontSize * 0.32 + 26}" height="${fontSize * 0.85}" fill="${TEAL}"/><text x="${w - w * 0.055 - 13}" y="${h * 0.05 + fontSize * 0.58}" text-anchor="end" font-family="Arial, sans-serif" font-weight="700" font-size="${Math.round(fontSize * 0.4)}" letter-spacing="2" fill="#fff">${esc(tag.toUpperCase())}</text></g>` : ""}

  <rect x="${w * 0.055}" y="${baseY - fontSize * 0.95}" width="54" height="5" rx="2.5" fill="${TEAL}"/>
  ${lines
    .map(
      (ln, idx) =>
        `<text x="${w * 0.055}" y="${baseY + idx * fontSize * 1.1}" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${fontSize}" fill="#ffffff">${esc(ln)}</text>`
    )
    .join("")}
  ${sub ? `<text x="${w * 0.055}" y="${baseY + lines.length * fontSize * 1.1 + fontSize * 0.46}" font-family="Arial, sans-serif" font-weight="600" font-size="${Math.round(fontSize * 0.38)}" letter-spacing="1" fill="${TEAL_LIGHT}">${esc(sub.toUpperCase())}</text>` : ""}
</svg>`;
}

/** Square avatar with initials. */
function avatar({ size, name, i = 0 }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const angle = 120 + (i % 3) * 40;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="a" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${INK_2}"/><stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="g" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${TEAL}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#a)"/>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.45}" fill="none" stroke="${TEAL}" stroke-opacity="0.4" stroke-width="2.5"/>
  <text x="50%" y="49%" text-anchor="middle" dominant-baseline="central" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${Math.round(size * 0.32)}" fill="#ffffff">${esc(initials)}</text>
  ${drop(size * 0.5 - size * 0.075, size * 0.7, size * 0.15, TEAL, TEAL_CORE, 1)}
</svg>`;
}

/* ── Build the manifest ─────────────────────────────────────────────────── */
const products = [
  ["custom-round-rubber-stamp", 3, "Custom Round Rubber Stamp", "Stamps"],
  ["self-inking-stamp", 2, "Self-Inking Stamp", "Stamps"],
  ["pre-inked-pocket-stamp", 2, "Pre-Inked Pocket Stamp", "Stamps"],
  ["wax-seal-stamp-kit", 2, "Wax Seal Stamp Kit", "Seals"],
  ["monogram-brass-seal", 2, "Monogram Brass Seal", "Seals"],
  ["custom-printed-tshirt", 3, "Custom Printed T-Shirt", "Apparel"],
  ["couple-matching-tshirts", 2, "Couple Matching T-Shirts", "Apparel"],
  ["printed-panjabi", 2, "Printed Panjabi", "Apparel"],
  ["custom-hoodie", 2, "Custom Hoodie", "Apparel"],
  ["family-combo-tshirts", 2, "Family Combo T-Shirts", "Apparel"],
  ["custom-tote-bag", 2, "Custom Canvas Tote Bag", "Bags"],
  ["printed-jute-bag", 2, "Printed Jute Bag", "Bags"],
  ["personalised-backpack", 2, "Personalised Backpack", "Bags"],
  ["custom-photo-mug", 3, "Custom Photo Mug", "Drinkware"],
  ["magic-color-mug", 2, "Magic Colour-Changing Mug", "Drinkware"],
  ["stainless-steel-bottle", 2, "Personalised Steel Bottle", "Drinkware"],
  ["custom-photo-frame", 2, "Custom Photo Frame", "Gifts"],
  ["engraved-wooden-keychain", 2, "Engraved Wooden Keychain", "Gifts"],
  ["personalised-name-plate", 2, "Personalised Name Plate", "Gifts"],
  ["premium-business-cards", 2, "Premium Business Cards", "Cards"],
  ["wedding-invitation-cards", 2, "Wedding Invitation Cards", "Cards"],
];

const categories = [
  ["seals-stamps", "Seals & Stamps"],
  ["apparel", "Custom Apparel"],
  ["drinkware", "Mugs & Bottles"],
  ["bags", "Bags"],
  ["gifts", "Personalised Gifts"],
  ["stationery", "Business & Stationery"],
];

const blog = [
  ["how-to-design-the-perfect-custom-stamp", "How to Design the Perfect Custom Stamp", "Guide"],
  ["rubber-vs-self-inking-stamps", "Rubber vs Self-Inking Stamps", "Guide"],
  ["wax-seals-for-weddings", "Wax Seals for Wedding Invitations", "Ideas"],
  ["custom-tshirt-printing-methods", "T-Shirt Printing Methods Explained", "Guide"],
  ["choosing-the-right-tshirt-fabric", "Choosing the Right T-Shirt Fabric", "Tips"],
  ["personalised-gift-ideas", "25 Personalised Gift Ideas", "Ideas"],
  ["corporate-gifting-guide", "A Smart Guide to Corporate Gifting", "Business"],
  ["branding-your-small-business", "Branding Your Small Business", "Business"],
  ["photo-mug-care-guide", "How to Care for Your Photo Mug", "Tips"],
  ["design-files-for-printing", "Preparing Design Files for Print", "Guide"],
  ["eco-friendly-printing", "Eco-Friendly Printing Choices", "Ideas"],
  ["business-card-design-tips", "8 Business Card Design Tips", "Business"],
  ["couple-tshirt-ideas", "Couple T-Shirt Ideas", "Ideas"],
  ["monogram-meaning-guide", "Monograms 101", "Guide"],
  ["bulk-order-printing-guide", "Bulk Order Printing Guide", "Business"],
  ["wedding-stationery-checklist", "Wedding Stationery Checklist", "Ideas"],
  ["logo-to-print-ready", "From Logo to Print-Ready", "Guide"],
  ["seasonal-merch-ideas", "Seasonal Merch Ideas", "Ideas"],
  ["customise-your-workspace", "Personalise Your Workspace", "Tips"],
];

const authors = [
  ["ria-haque", "Ria Haque"],
  ["imran-kabir", "Imran Kabir"],
  ["sabbir-ahmed", "Sabbir Ahmed"],
  ["jolchap-editorial", "Jolchap Journal"],
];

const testimonialPeople = [
  ["tahmid", "Tahmid Hasan"],
  ["nusrat", "Nusrat Jahan"],
  ["rafi", "Rafiul Islam"],
  ["maliha", "Maliha Chowdhury"],
  ["shovon", "Shovon Rahman"],
  ["farzana", "Farzana Akter"],
];

const lifestyle = [
  ["about/story", "Made In Dhaka", "Since 2019"],
  ["about/workshop", "Where Ideas Get Printed", "The Studio"],
  ["about/athletes", "The People We Print For", "Our Customers"],
  ["about/cta", "Let's Make Something", "Start Your Order"],
  ["lifestyle/gym-1", "Custom Stamps & Seals", ""],
  ["lifestyle/gym-2", "Personalised Gifts", ""],
  ["lifestyle/gym-3", "Printed Apparel", ""],
];

const jobs = [];

let pi = 0;
for (const [slug, count, name, tag] of products) {
  for (let n = 1; n <= count; n++) {
    jobs.push({
      file: `images/products/${slug}-${n}.webp`,
      svg: poster({ w: 1000, h: 1250, label: name, sub: `0${n} · ${tag}`, tag, i: pi++ }),
    });
  }
}
categories.forEach(([slug, name], i) =>
  jobs.push({
    file: `images/categories/${slug}.webp`,
    svg: poster({ w: 1200, h: 900, label: name, sub: "Shop the collection", i }),
  })
);
blog.forEach(([slug, title, tag], i) =>
  jobs.push({
    file: `images/blog/${slug}.webp`,
    svg: poster({ w: 1600, h: 1000, label: title, tag, i }),
  })
);
authors.forEach(([slug, name], i) =>
  jobs.push({ file: `images/authors/${slug}.webp`, svg: avatar({ size: 400, name, i }) })
);
testimonialPeople.forEach(([slug, name], i) =>
  jobs.push({ file: `images/testimonials/${slug}.webp`, svg: avatar({ size: 400, name, i }) })
);
lifestyle.forEach(([path, label, sub], i) =>
  jobs.push({
    file: `images/${path}.webp`,
    svg: poster({ w: 1200, h: 1500, label, sub, i }),
  })
);
jobs.push({
  file: "images/og/jolchap-og.webp",
  svg: poster({ w: 1200, h: 630, label: "Make It Yours", sub: "Custom Print & Personalisation", tag: "Jolchap", i: 1 }),
});

/* ── Render ─────────────────────────────────────────────────────────────── */
console.log(`Generating ${jobs.length} WebP images…`);
let done = 0;
for (const job of jobs) {
  const out = join(OUT, job.file);
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(job.svg)).webp({ quality: 84, effort: 4 }).toFile(out);
  done++;
}
console.log(`✓ Wrote ${done} images to /public/images`);
