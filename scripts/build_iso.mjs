// Copies the pricing scenes exported by the app's shared illustration component.
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = process.argv[2];
if (!appRoot) throw new Error('Pass the path to the Moeen App checkout.');

const destination = fileURLToPath(new URL('../public/assets/iso/', import.meta.url));
const plans = { free: 'records', plus: 'projects', pro: 'workflow' };

for (const theme of ['light', 'dark']) {
  const output = path.join(destination, theme);
  await mkdir(output, { recursive: true });
  for (const [plan, scene] of Object.entries(plans)) {
    await copyFile(
      path.join(appRoot, 'brand', 'illustrations', theme, `scene_${scene}.svg`),
      path.join(output, `plan_${plan}.svg`),
    );
  }
}
console.log('Copied the pricing illustrations from the App design system.');
