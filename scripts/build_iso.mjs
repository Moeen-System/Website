// Draws the website's isometric illustrations: soft, rounded blocks in one neutral colour,
// in light and dark. Each block is a rounded silhouette on a slightly darker base, with its
// three faces laid on it as rounded panels, so edges read as soft bevels. No accent colour.
// Writes public/assets/iso/<theme>/<name>.svg. Run with `node scripts/build_iso.mjs`.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const COS = Math.cos(Math.PI / 6), SIN = 0.5, S = 22;
const R_OUT = 4.2, R_FACE = 3; // corner radii in drawing units (one block edge is 22)
const THEMES = {
  light: { base: '#e2e2e5', topA: '#ffffff', topB: '#f7f7f8', left: '#f0f0f2', right: '#e7e7ea', line: '#d6d6da' },
  dark: { base: '#1a1a1c', topA: '#2e2e31', topB: '#28282b', left: '#232325', right: '#1e1e20', line: '#343438' },
};

// The plan cards are the one place the blocks take a colour: blue for Plus, violet for Pro.
const TINTS = {
  plan_plus: {
    light: { base: '#8db4f6', topA: '#eaf1fe', topB: '#d3e2fd', left: '#b4cdfa', right: '#93b7f7', line: '#79a4f2' },
    dark: { base: '#142a52', topA: '#3d74d8', topB: '#3163bf', left: '#24509f', right: '#1b3f80', line: '#4c82e6' },
  },
  plan_pro: {
    light: { base: '#b795fb', topA: '#f4efff', topB: '#e6dafe', left: '#cfb9fd', right: '#b898fb', line: '#a27ef6' },
    dark: { base: '#2f1a5c', topA: '#8a5bf0', topB: '#7747dd', left: '#5e34b9', right: '#4a2895', line: '#9a6ff5' },
  },
};

const point = (x, y, z) => [(x - y) * COS * S, (x + y) * SIN * S - z * S];
const f = (n) => n.toFixed(2);

/** A closed path through the points, every corner rounded by up to r. */
function rounded(pts, r) {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i += 1) {
    const p = pts[i], prev = pts[(i + n - 1) % n], next = pts[(i + 1) % n];
    const toward = (q) => { const dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy); return [dx / len, dy / len, len]; };
    const [ax, ay, al] = toward(prev), [bx, by, bl] = toward(next);
    const rr = Math.min(r, al / 2.2, bl / 2.2);
    const a = [p[0] + ax * rr, p[1] + ay * rr], b = [p[0] + bx * rr, p[1] + by * rr];
    d += `${i ? 'L' : 'M'}${f(a[0])},${f(a[1])}Q${f(p[0])},${f(p[1])} ${f(b[0])},${f(b[1])}`;
  }
  return `${d}Z`;
}

let uid = 0;
/** One block: [x, y, z, width, depth, height]. */
function block([x, y, z, w, d, h], t, theme, k) {
  const P = (a, b, c) => point(a, b, c);
  const A = P(x, y, z + h), B = P(x + w, y, z + h), C = P(x + w, y + d, z + h), D = P(x, y + d, z + h);
  const B0 = P(x + w, y, z), C0 = P(x + w, y + d, z), D0 = P(x, y + d, z);
  const outline = rounded([A, B, B0, C0, D0, D], R_OUT);
  const id = `${theme}${uid += 1}`;
  const inset = 0.9; // a hairline of base shows between faces: the soft edge
  const shrink = (pts) => { const cx = pts.reduce((s, q) => s + q[0], 0) / pts.length, cy = pts.reduce((s, q) => s + q[1], 0) / pts.length; return pts.map(([px, py]) => { const dx = cx - px, dy = cy - py, l = Math.hypot(dx, dy) || 1; return [px + dx / l * inset, py + dy / l * inset]; }); };
  // Colours are CSS variables with this theme's values as fallbacks, so an inline copy follows
  // the page theme. --lift is how far the block rises when the drawing separates on hover.
  const lift = (3 + z * 7 + (k % 2) * 3).toFixed(1);
  return `<g class="iso-b" style="--k:${k};--lift:${lift}"><clipPath id="c${id}"><path d="${outline}"/></clipPath>`
    + `<path d="${outline}" style="fill:var(--iso-base,${t.base})"/>`
    + `<g clip-path="url(#c${id})">`
    + `<path d="${rounded(shrink([B, C, C0, B0]), R_FACE)}" style="fill:var(--iso-right,${t.right})"/>`
    + `<path d="${rounded(shrink([D, C, C0, D0]), R_FACE)}" style="fill:var(--iso-left,${t.left})"/>`
    + `<path d="${rounded(shrink([A, B, C, D]), R_FACE)}" fill="url(#top${theme})"/>`
    + `</g><path d="${outline}" style="stroke:var(--iso-line,${t.line})" stroke-width=".8"/></g>`;
}

function svg(blocks, t, theme) {
  // Far blocks first: by the sum of each block's nearest corner, then by height.
  const order = [...blocks].sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]) || a[2] - b[2]);
  const pts = blocks.flatMap(([x, y, z, w, d, h]) => [[x, y, z], [x + w, y, z], [x, y + d, z], [x + w, y + d, z], [x, y, z + h], [x + w, y, z + h], [x, y + d, z + h], [x + w, y + d, z + h]].map(([a, b, c]) => point(a, b, c)));
  const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]), pad = 2;
  const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad - 14, w = Math.max(...xs) - minX + pad, h = Math.max(...ys) - minY + pad;
  const gradient = `<defs><linearGradient id="top${theme}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--iso-top-a,${t.topA})"/><stop offset="1" style="stop-color:var(--iso-top-b,${t.topB})"/></linearGradient></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(minX)} ${f(minY)} ${f(w)} ${f(h)}" fill="none">${gradient}${order.map((b, k) => block(b, t, theme, k)).join('')}</svg>\n`;
}

const G = 0.12; // the gap between neighbouring blocks
const cube = (x, y, z, accent) => [x * (1 + G), y * (1 + G), z * (1 + G), 1, 1, 1, accent];
const plate = (x, y, z, w = 2.2, d = 1.6, h = 0.24, accent) => [x, y, z, w, d, h, accent];

const SCENES = {
  // Menu entries.
  tasks: [plate(0, 0, 0), plate(0.35, 0.35, 0.45), plate(0.7, 0.7, 0.9, 2.2, 1.6, 0.24, true)],
  chat: [[0, 0, 0, 2.2, 1.2, 0.4], [0.7, 0.5, 0.75, 2.2, 1.2, 0.4, true]],
  teams: [[0, 0, 0, 1, 1, 1.4], [1.16, 0, 0, 1, 1, 2.1, true], [2.32, 0, 0, 1, 1, 1]],
  meetings: [cube(1, 0, 0), cube(0, 1, 0), cube(2, 1, 0), cube(1, 2, 0), [1.16, 1.16, 0, 1, 1, 1.7, true]],
  mail: [[0, 0, 0, 2.6, 1.8, 0.3], [0.35, 0.3, 0.42, 1.9, 1.2, 0.16, true]],
  ask: [[0, 0, 0, 2.6, 1.6, 0.32], [0.9, 0.3, 0.44, 1, 1, 1, true]],
  workflow: [cube(0, 0, 0), [1.16, 0, 0, 1, 1, 1.6], [2.32, 0, 0, 1, 1, 2.2, true]],
  skills: [cube(0, 0, 0), cube(1, 0, 0), cube(2, 0, 0), cube(2, 1, 0, true)],
  search: [0, 1, 2].flatMap((x) => [0, 1, 2].map((y) => (x === 1 && y === 1 ? [1.08, 1.08, 0, 1, 1, 1.5, true] : [x * 1.08, y * 1.08, 0, 1, 1, 0.25]))),
  download: [[0, 0, 0, 2.6, 2, 0.3], [0.8, 0.5, 0.42, 1, 1, 1, true]],
  notes: [plate(0, 0, 0, 2.2, 1.6, 0.2), plate(0.25, -0.2, 0.36, 2.2, 1.6, 0.2), plate(0.5, -0.4, 0.72, 2.2, 1.6, 0.2, true)],
  people: [cube(0, 0, 0), cube(1, 0, 0), cube(0, 0, 1, true)],
};
// Pricing plans: one block, a few, a building. Drawn after the menu so its ids never move.
const PLANS = {
  plan_free: [cube(1, 1, 0)],
  plan_plus: [cube(0, 0, 0), cube(1, 0, 0), cube(0, 1, 0), cube(1, 1, 0), cube(0, 0, 1)],
  plan_pro: [cube(0, 0, 0), cube(1, 0, 0), cube(2, 0, 0), cube(0, 1, 0), cube(1, 1, 0), cube(2, 1, 0), cube(0, 0, 1), cube(1, 0, 1), cube(0, 1, 1), cube(0, 0, 2)],
};

for (const scenes of [SCENES, PLANS]) for (const [theme, t] of Object.entries(THEMES)) {
  const folder = `${root}public/assets/iso/${theme}/`;
  await mkdir(folder, { recursive: true });
  for (const [name, blocks] of Object.entries(scenes)) await writeFile(`${folder}${name}.svg`, svg(blocks.map((b) => b.slice(0, 6)), TINTS[name]?.[theme] ?? t, theme));
}
console.log(`iso: wrote ${(Object.keys(SCENES).length + Object.keys(PLANS).length) * 2} illustrations`);
