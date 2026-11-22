// Outline illustrations for the landing page menus. Both themes share the same drawing.
// Run node scripts/build_iso.mjs to regenerate the standalone SVGs.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const themes = { light: '#737373', dark: '#a3a3a3' };

const path = (d) => `<path d="${d}"/>`;
const circle = (x, y, radius) => `<circle cx="${x}" cy="${y}" r="${radius}"/>`;
const rect = (x, y, width, height, radius = 3) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}"/>`;
const quiet = (drawing) => `<g opacity=".5">${drawing}</g>`;
const face = (drawing) => `<g transform="matrix(1 .18 -.1 1 3 -5)">${drawing}</g>`;
const layer = (drawing, lift = 0) => lift
  ? `<g class="iso-b" style="--lift:${lift}px">${drawing}</g>`
  : drawing;
const check = (x, y) => path(`M${x} ${y}l3 3 6-6`);

const scenes = {
  tasks: face(
    quiet(path('M15 12h32a4 4 0 0 1 4 4v28'))
    + layer(rect(10, 17, 36, 31, 4) + check(16, 25) + check(16, 36) + path('M30 25h9m-9 11h9'), 2),
  ),
  chat: face(
    quiet(path('M33 25h16a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-1v6l-8-6h-6'))
    + layer(path('M12 13h27a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5H25l-8 7v-7h-5a5 5 0 0 1-5-5V18a5 5 0 0 1 5-5Z') + path('M16 22h19m-19 6h12'), 2),
  ),
  teams: quiet(circle(14, 26, 5) + circle(50, 26, 5) + path('M6 43v-2a8 8 0 0 1 11-7m41 9v-2a8 8 0 0 0-11-7'))
    + layer(circle(32, 20, 7) + path('M20 46v-4a12 12 0 0 1 24 0v4m-22 4 20 4'), 2),
  meetings: face(
    quiet(path('M13 17h28a4 4 0 0 1 4 4M13 46h24'))
    + layer(rect(8, 22, 34, 24, 4) + path('m42 30 11-6v19l-11-6') + circle(20, 34, 4), 2),
  ),
  mail: face(
    quiet(path('M15 14h37a4 4 0 0 1 4 4v23'))
    + layer(rect(8, 20, 43, 28, 4) + path('m9 23 17 13a5 5 0 0 0 6 0l18-13m-41 22 12-10m29 10L38 35'), 2),
  ),
  ask: face(
    quiet(path('M13 15h23m8 0h5m0 5v5'))
    + layer(rect(7, 24, 49, 21, 5) + path('m15 30 5 5-5 5m9 0h10m14-20v-9m-4.5 4.5h9'), 2),
  ),
  workflow: quiet(path('m21 31 11 3m3-3v-9l11-7m-11 22v7l11 3'))
    + layer(circle(15, 29, 6) + circle(35, 35, 3), 1)
    + layer(circle(51, 13, 5) + circle(51, 48, 5), 3),
  approvals: face(
    quiet(path('m15 16 17-7 18 7v13c0 10-11 18-18 21'))
    + layer(path('m10 21 18-7 18 7v11c0 11-10 18-18 21-8-3-18-10-18-21V21Z') + path('m20 32 5 5 10-10'), 2),
  ),
  audit: face(
    quiet(path('M15 9h26l7 7v16m-8-23v8h8'))
    + layer(path('M12 13h23l7 7v12M35 13v8h7M12 13v35h20m-13-23h14m-14 7h10m-10 7h8') + circle(44, 43, 9) + path('M44 38v5l3 2'), 2),
  ),
  skills: face(
    quiet(path('M40 16a14 14 0 0 1 13 14v15c-8-4-15-4-21 0M32 45c-7-4-15-4-22 0v-4m22 4v6'))
    + layer(path('M32 43V22c-6-5-13-7-22-4v20c9-2 16-1 22 5Zm0 0V22c6-5 13-7 22-4v20c-9-2-16-1-22 5Z') + path('M16 25c4 0 8 1 11 3m10 0c3-2 7-3 11-3m-1 6c-4 0-7 1-10 3'), 2),
  ),
  search: face(quiet(rect(7, 14, 39, 29, 4) + path('M7 23h22m-15 8h11m-11 6h8')))
    + layer(circle(39, 32, 10) + path('m46 39 9 9'), 2),
  download: face(
    quiet(path('M14 14h29a4 4 0 0 1 4 4v12M20 48h17m-9-7v7'))
    + layer(path('M11 19h27v22H11a3 3 0 0 1-3-3V22a3 3 0 0 1 3-3Zm35 9v16m-6-6 6 6 6-6'), 2),
  ),
  notes: face(
    quiet(path('M17 10h33v35M12 14h33v35'))
    + layer(rect(7, 18, 34, 33, 3) + path('M14 26h19m-19 7h15m-15 7h18'), 2),
  ),
  people: face(
    quiet(path('M13 15h38a4 4 0 0 1 4 4v22'))
    + layer(rect(7, 20, 43, 29, 4) + circle(22, 31, 4) + path('M15 42v-1a7 7 0 0 1 14 0v1m6-11h8m-8 7h8'), 2),
  ),
};

function svg(drawing, stroke) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 60" fill="none" stroke="var(--iso-stroke, ${stroke})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${drawing}</svg>\n`;
}

for (const [theme, stroke] of Object.entries(themes)) {
  const folder = `${root}public/assets/iso/${theme}/`;
  await mkdir(folder, { recursive: true });
  await Promise.all(Object.entries(scenes).map(([name, drawing]) =>
    writeFile(`${folder}${name}.svg`, svg(drawing, stroke)),
  ));
}
console.log(`iso: wrote ${Object.keys(scenes).length * 2} outline illustrations`);
