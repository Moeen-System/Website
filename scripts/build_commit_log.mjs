// Writes scripts/commit_log.json, the record behind the About page's grid, from the app's own
// history: node scripts/build_commit_log.mjs ../Moeen
// Only dates and a size from 1 to 4 leave the repository: no names, messages or hours.
import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const repository = process.argv[2] ?? '../Moeen';
const run = (command, args) => execFileSync(command, args, { encoding: 'utf8', cwd: repository, maxBuffer: 1 << 26 });

const log = run('git', ['log', 'origin/main', '--no-merges', '--reverse', '--date=short', '--format=@%ad', '--shortstat']);
const commits = log.split('@').slice(1).map((entry) => {
  const [date, ...stat] = entry.trim().split('\n');
  const lines = [...stat.join(' ').matchAll(/(\d+) (?:insertion|deletion)/g)].reduce((sum, [, n]) => sum + Number(n), 0);
  return { date, lines };
}).sort((a, b) => a.date.localeCompare(b.date));

// Four shades with an equal share of the changes in each.
const sorted = commits.map(({ lines }) => lines).sort((a, b) => a - b);
const limits = [0.25, 0.5, 0.75].map((share) => sorted[Math.floor(sorted.length * share)]);
const days = {};
for (const { date, lines } of commits) days[date] = (days[date] ?? '') + (1 + limits.filter((limit) => lines >= limit).length);

const merged = JSON.parse(run('gh', ['pr', 'list', '--state', 'merged', '--limit', '5000', '--json', 'number'])).length;
const out = fileURLToPath(new URL('commit_log.json', import.meta.url));
await writeFile(out, `${JSON.stringify({ count: commits.length, merged, days: Object.entries(days) }, null, 1)}\n`);
console.log(`${commits.length} changes, ${merged} merged pull requests, ${Object.keys(days).length} days.`);
