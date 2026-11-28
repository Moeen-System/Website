// Writes daily contribution totals for the public About and Changelog calendars.
// Run with node scripts/build_commit_log.mjs ../Moeen.
import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

const repository = process.argv[2] ?? '../Moeen';
const run = (command, args) => execFileSync(command, args, { encoding: 'utf8', cwd: repository });
const dates = run('git', ['log', 'origin/main', '--no-merges', '--format=%as']).trim().split('\n').filter(Boolean);
const days = new Map();
for (const date of dates) days.set(date, (days.get(date) ?? 0) + 1);

const merged = JSON.parse(run('gh', ['pr', 'list', '--state', 'merged', '--limit', '5000', '--json', 'number'])).length;
const output = { merged, days: [...days].sort(([a], [b]) => a.localeCompare(b)) };
await writeFile(new URL('commit_log.json', import.meta.url), JSON.stringify(output, null, 1) + '\n');
console.log(`${dates.length} commits, ${merged} merged pull requests, ${days.size} active days.`);
