import { readFile, writeFile } from 'node:fs/promises';

export async function buildWebfonts(root) {
  const filename = 'thmanyah_webfonts.json';
  let bundle;
  for (const path of [root + filename, '/etc/secrets/' + filename]) {
    try {
      bundle = JSON.parse(await readFile(path, 'utf8'));
      break;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  if (!bundle) return '';

  const weights = ['400', '500', '600 700'];
  const faces = weights.map(weight => {
    const base64 = bundle[weight];
    const bytes = typeof base64 === 'string' ? Buffer.from(base64, 'base64') : Buffer.alloc(0);
    if (bytes.subarray(0, 4).toString() !== 'wOF2' || bytes.length < 48 || bytes.readUInt32BE(8) !== bytes.length) {
      throw new Error('Invalid Thmanyah webfont for weight ' + weight);
    }
    return bytes;
  });
  // The package starts with one big-endian byte length per weight, then the WOFF2 faces.
  const lengths = Buffer.alloc(4 * faces.length);
  faces.forEach((face, index) => lengths.writeUInt32BE(face.length, 4 * index));
  await writeFile(root + 'dist/assets/thmanyah_web.pack', Buffer.concat([lengths, ...faces]));
  await writeFile(root + 'dist/assets/thmanyah_web.js', `(() => {
  const weights = ${JSON.stringify(weights)};
  const preload = document.getElementById('thmanyah-font');
  const hasPaintedArabic = () => document.documentElement.lang === 'ar'
    && performance.getEntriesByName('first-contentful-paint', 'paint').length > 0;
  async function load() {
    if (hasPaintedArabic()) return;
    const response = await fetch(preload.href);
    if (!response.ok || hasPaintedArabic()) return;
    const bytes = await response.arrayBuffer();
    if (hasPaintedArabic()) return;
    const lengths = new DataView(bytes);
    let offset = 4 * weights.length;
    const faces = weights.map((weight, index) => {
      const length = lengths.getUint32(4 * index);
      const data = new Uint8Array(bytes, offset, length);
      offset += length;
      return new FontFace('Moeen Thmanyah Sans', data, { weight });
    });
    const loaded = await Promise.all(faces.map(face => face.load()));
    // A slow download must not reflow text the reader can already see.
    if (hasPaintedArabic()) return;
    for (const face of loaded) document.fonts.add(face);
  }
  const start = () => load().catch(() => {});
  // Safari can request the same file twice if fetch starts while the preload is still in flight.
  if (!preload.relList.supports?.('preload') || performance.getEntriesByName(preload.href, 'resource').length) start();
  else {
    preload.addEventListener('load', start, { once: true });
    preload.addEventListener('error', start, { once: true });
  }
})();
`);
  return '<link id="thmanyah-font" rel="preload" href="/assets/thmanyah_web.pack" as="fetch" crossorigin fetchpriority="high">\n<script src="/assets/thmanyah_web.js"></script>';
}
