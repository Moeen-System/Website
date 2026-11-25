// Draws the shaded isometric cubes for the website's pricing plans.
// For compact navigation illustrations, run pnpm brand --navigation-dir=<website>/public/assets/iso in the app repo.
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

/** Project a block defined as [x, y, z, width, depth, height]. */
function projectBlock([x, y, z, w, d, h]) {
  const A = point(x, y, z + h), B = point(x + w, y, z + h);
  const C = point(x + w, y + d, z + h), D = point(x, y + d, z + h);
  const B0 = point(x + w, y, z), C0 = point(x + w, y + d, z), D0 = point(x, y + d, z);
  return { A, B, C, D, B0, C0, D0, outline: rounded([A, B, B0, C0, D0, D], R_OUT), z };
}

function shadedBlock({ A, B, C, D, B0, C0, D0, outline, z, id }, t, theme, k) {
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

// Preserve the fragment IDs of the existing pricing exports.
let uid = 82;
function svg(blocks, t, theme) {
  // Far blocks first: by the sum of each block's nearest corner, then by height.
  const order = [...blocks].sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]) || a[2] - b[2]);
  const pts = blocks.flatMap(([x, y, z, w, d, h]) => [[x, y, z], [x + w, y, z], [x, y + d, z], [x + w, y + d, z], [x, y, z + h], [x + w, y, z + h], [x, y + d, z + h], [x + w, y + d, z + h]].map(([a, b, c]) => point(a, b, c)));
  const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]), pad = 2;
  const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad - 14, w = Math.max(...xs) - minX + pad, h = Math.max(...ys) - minY + pad;
  const projected = order.map(block => ({ ...projectBlock(block), id: `${theme}${uid += 1}` }));
  const viewBox = [minX, minY, w, h].map(f).join(' ');
  const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">`;
  const gradient = `<defs><linearGradient id="top${theme}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--iso-top-a,${t.topA})"/><stop offset="1" style="stop-color:var(--iso-top-b,${t.topB})"/></linearGradient></defs>`;
  return `${svgStart}${gradient}${projected.map((b, k) => shadedBlock(b, t, theme, k)).join('')}</svg>\n`;
}

const G = 0.12; // the gap between neighbouring blocks
const cube = (x, y, z, accent) => [x * (1 + G), y * (1 + G), z * (1 + G), 1, 1, 1, accent];
const PLANS = {
  plan_free: [cube(1, 1, 0)],
  plan_plus: [cube(0, 0, 0), cube(1, 0, 0), cube(0, 1, 0), cube(1, 1, 0), cube(0, 0, 1)],
  plan_pro: [cube(0, 0, 0), cube(1, 0, 0), cube(2, 0, 0), cube(0, 1, 0), cube(1, 1, 0), cube(2, 1, 0), cube(0, 0, 1), cube(1, 0, 1), cube(0, 1, 1), cube(0, 0, 2)],
};

for (const [theme, colors] of Object.entries(THEMES)) {
  const folder = `${root}public/assets/iso/${theme}/`;
  await mkdir(folder, { recursive: true });
  for (const [name, blocks] of Object.entries(PLANS)) {
    await writeFile(`${folder}${name}.svg`, svg(blocks, TINTS[name]?.[theme] ?? colors, theme));
  }
}
console.log(`iso: wrote ${Object.keys(PLANS).length * 2} pricing illustrations`);
