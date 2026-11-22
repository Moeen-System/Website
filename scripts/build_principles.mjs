// Draws the white dotted line art for the principles band: a dotted globe, concentric rings,
// dotted log lines and a step chart. Writes public/assets/principles/<name>.svg.
// Run with `node scripts/build_principles.mjs` after changing a drawing.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const W = 360, H = 240, f = (n) => n.toFixed(1);
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none">${body}</svg>\n`;

// A sphere of dots, lit from the upper start side, its back half and far edge fading out.
function globe() {
  const cx = 180, cy = 128, r = 104, tilt = 0.32, spin = 0.9;
  let dots = '';
  for (let lat = -80; lat <= 80; lat += 6) {
    const ring = Math.cos((lat * Math.PI) / 180);
    const count = Math.max(6, Math.round(64 * ring));
    for (let i = 0; i < count; i += 1) {
      const lon = (i / count) * Math.PI * 2 + spin;
      const x = ring * Math.cos(lon), y = Math.sin((lat * Math.PI) / 180), z = ring * Math.sin(lon);
      const yy = y * Math.cos(tilt) - z * Math.sin(tilt), zz = y * Math.sin(tilt) + z * Math.cos(tilt);
      if (zz < -0.05) continue;
      const light = Math.max(0, 0.55 * zz + 0.45 * (-x) + 0.3 * (-yy));
      const opacity = Math.min(1, 0.12 + light * 0.95);
      dots += `<circle cx="${f(cx + x * r)}" cy="${f(cy - yy * r)}" r="${f(0.9 + zz * 0.8)}" fill="#fff" fill-opacity="${opacity.toFixed(2)}"/>`;
    }
  }
  return svg(`<g data-motion="globe">${dots}</g>`);
}

// Rings around one point: the decision at the centre.
function rings() {
  let body = '';
  [96, 72, 48].forEach((r, i) => { body += `<circle data-motion="ring" cx="180" cy="120" r="${r}" stroke="#fff" stroke-opacity="${(0.35 + i * 0.15).toFixed(2)}" stroke-dasharray="1.5 5" stroke-linecap="round"/>`; });
  body += '<line x1="40" y1="120" x2="320" y2="120" stroke="#fff" stroke-opacity=".25" stroke-dasharray="2 5"/><line x1="180" y1="10" x2="180" y2="230" stroke="#fff" stroke-opacity=".25" stroke-dasharray="2 5"/>';
  body += '<circle cx="180" cy="120" r="22" fill="#fff" fill-opacity=".14" stroke="#fff"/><circle cx="180" cy="120" r="5" fill="#fff"/>';
  const markers = [[180, 24], [276, 120], [112, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#fff"/>`).join('');
  body += `<g data-motion="orbit">${markers}</g>`;
  return svg(body);
}

// Dotted log lines, one per recorded step, the newest strongest.
function log() {
  let body = '';
  for (let i = 0; i < 8; i += 1) {
    const y = 40 + i * 22, end = 330 - (i % 3) * 36;
    body += `<line data-motion="log" x1="30" y1="${y}" x2="${end}" y2="${y}" stroke="#fff" stroke-opacity="${(0.4 + i * 0.075).toFixed(2)}" stroke-dasharray="1.5 4" stroke-linecap="round"/>`;
  }
  return svg(body);
}

// A step chart on a dotted grid: steady, uneven improvement.
function chart() {
  const x0 = 60, y0 = 216, w = 240, h = 168, cols = 7, rows = 5;
  let body = '';
  for (let c = 0; c <= cols; c += 1) body += `<line x1="${f(x0 + (c * w) / cols)}" y1="${y0 - h}" x2="${f(x0 + (c * w) / cols)}" y2="${y0}" stroke="#fff" stroke-opacity=".35" stroke-dasharray="2 4"/>`;
  for (let r = 0; r <= rows; r += 1) body += `<line x1="${x0}" y1="${f(y0 - (r * h) / rows)}" x2="${x0 + w}" y2="${f(y0 - (r * h) / rows)}" stroke="#fff" stroke-opacity=".35" stroke-dasharray="2 4"/>`;
  const steps = [[0, 0], [1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 5], [7, 5]];
  const pts = steps.map(([c, r]) => [x0 + (c * w) / cols, y0 - (r * h) / rows]);
  const route = pts.map(([x, y]) => `${f(x)},${f(y)}`).join('L');
  const nodes = pts.slice(1, -1).map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="4" fill="#fff"/>`).join('');
  body += `<path d="M${x0},${y0}H${x0 + w}V${y0 - h}" stroke="#fff"/>`;
  body += `<g data-motion="chart">
    <path d="M${route}L${x0 + w},${y0}L${x0},${y0}Z" fill="#fff" fill-opacity=".1"/>
    <path d="M${route}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
    ${nodes}</g>`;
  return svg(body);
}

await mkdir(`${root}public/assets/principles`, { recursive: true });
for (const [name, draw] of Object.entries({ globe, rings, log, chart })) await writeFile(`${root}public/assets/principles/${name}.svg`, draw());
console.log('principles: wrote 4 drawings');
