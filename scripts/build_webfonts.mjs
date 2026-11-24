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

  const faces = ['400', '500', '600 700'].map(weight => {
    const base64 = bundle[weight];
    const bytes = typeof base64 === 'string' ? Buffer.from(base64, 'base64') : Buffer.alloc(0);
    if (bytes.subarray(0, 4).toString() !== 'wOF2' || bytes.length < 48 || bytes.readUInt32BE(8) !== bytes.length) {
      throw new Error('Invalid Thmanyah webfont for weight ' + weight);
    }
    return [weight, bytes.toString('base64')];
  });
  await writeFile(root + 'dist/assets/thmanyah_web.js', `(() => {
  const faces = ${JSON.stringify(faces)}.map(([weight, data]) =>
    new FontFace('Moeen Thmanyah Sans', Uint8Array.from(atob(data), byte => byte.charCodeAt(0)), { weight })
  );
  Promise.all(faces.map(face => face.load())).then(loaded => {
    for (const face of loaded) document.fonts.add(face);
    document.documentElement.classList.add('thmanyah-loaded');
  }).catch(() => {});
})();
`);
  return '<script defer src="/assets/thmanyah_web.js"></script>';
}
