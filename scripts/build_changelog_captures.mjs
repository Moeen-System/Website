// Refresh the website's screenshot cards from the App's published changelog source.
import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { captureFilename, releaseCapture } from '../public/assets/release_capture.js';

const repository = process.argv[2] ?? '../Moeen';
const output = fileURLToPath(new URL('../public/assets/changelog_captures/', import.meta.url));
const readApp = file => execFileSync('git', ['show', `origin/main:${file}`], { cwd: repository, maxBuffer: 10 * 1024 * 1024 });
const { releases } = JSON.parse(readApp('content/changelog/releases.json'));
const work = await mkdtemp(path.join(tmpdir(), 'moeen_changelog_'));
try {
  const input = path.join(work, 'source.png');
  const exported = [];
  for (const release of releases) {
    const capture = releaseCapture(release);
    if (!capture) continue;
    const png = readApp(`apps/web/src/modules/settings/changelog_images/${capture.file}`);
    const { sourceWidth, sourceHeight, x, y, width, height } = capture.region;
    if (png.readUInt32BE(16) !== sourceWidth || png.readUInt32BE(20) !== sourceHeight) {
      throw new Error(`Capture dimensions differ from the changelog source for ${release.version}`);
    }
    await writeFile(input, png);
    const file = captureFilename(release.version);
    execFileSync('cwebp', ['-quiet', '-lossless', '-exact', '-crop', x, y, width, height, input, '-o', path.join(work, file)].map(String));
    exported.push(file);
  }
  await mkdir(output, { recursive: true });
  for (const file of exported) {
    await copyFile(path.join(work, file), path.join(output, file));
  }
  console.log(`Exported ${exported.length} changelog screenshots.`);
} finally {
  await rm(work, { recursive: true, force: true });
}
