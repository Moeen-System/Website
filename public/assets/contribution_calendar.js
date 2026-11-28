const DAY = 86_400_000;
const WEEK = 7;
const RANGE = 365;
const CHANGES = { one: 'تعديل واحد', two: 'تعديلان', few: 'تعديلات', many: 'تعديلًا', other: 'تعديل' };
const number = new Intl.NumberFormat('en-US');
const arabicPlural = new Intl.PluralRules('ar');

function changeCount(count, locale) {
  if (locale === 'en') return `${number.format(count)} ${count === 1 ? 'change' : 'changes'}`;
  if (!count) return 'لا تعديلات';
  const form = arabicPlural.select(count);
  return form === 'one' || form === 'two' ? CHANGES[form] : `${number.format(count)} ${CHANGES[form] ?? CHANGES.other}`;
}

export function contributionCalendar({ commits, releases }, locale) {
  if (!commits.days.length) return '';
  const t = (ar, en) => locale === 'ar' ? ar : en;
  const dateLocale = t('ar-u-nu-latn', 'en');
  const on = new Intl.DateTimeFormat(dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const month = new Intl.DateTimeFormat(dateLocale, { month: 'short', timeZone: 'UTC' });
  const byDay = new Map(commits.days);
  const through = Date.parse(commits.days.at(-1)[0]);
  const start = through - (RANGE - 1) * DAY;
  const offset = new Date(start).getUTCDay();
  const columns = Math.ceil((offset + RANGE) / WEEK);
  const counts = Array.from({ length: RANGE }, (_, index) => {
    const date = new Date(start + index * DAY);
    const key = date.toISOString().slice(0, 10);
    return { date, key, count: byDay.get(key) ?? 0 };
  });
  const maximum = Math.max(1, ...counts.map(({ count }) => count));
  const total = counts.reduce((sum, { count }) => sum + count, 0);
  const summary = t(
    `${changeCount(total, locale)} على شيفرة مُعين من ${on.format(start)} إلى ${on.format(through)}`,
    `${changeCount(total, locale)} to Moeen’s code from ${on.format(start)} to ${on.format(through)}`,
  );

  const cells = '<i aria-hidden="true"></i>'.repeat(offset);
  const axis = counts.flatMap(({ date }, index) => {
    if (date.getUTCDate() !== 1) return [];
    const column = Math.floor((offset + index) / WEEK) + 1;
    return `<span style="--c:${column}">${month.format(date)}</span>`;
  }).join('');
  const days = counts.map(({ date, key, count }) => {
    const level = Math.ceil(count * 4 / maximum);
    return `<i data-l="${level}" data-day="${key}" data-tip="${on.format(date)} · ${changeCount(count, locale)}"></i>`;
  }).join('');
  const title = t('من أول سطر حتى الآن.', 'From the first line until now.');
  const description = t('كل مربّع يمثّل يومًا.', 'Each square is one day.');
  const name = t('نشاط التطوير حسب اليوم', 'Daily development activity');
  const facts = [
    releases && [releases.count, t('الإصدارات المنشورة', 'Published releases')],
    [commits.merged, t('طلبات الدمج المعتمدة', 'Merged pull requests')],
    releases && [`<bdi dir="ltr">v${releases.latest}</bdi>`, t('أحدث إصدار', 'Latest release')],
  ].filter(Boolean);

  return `<section class="ship" aria-labelledby="contribution-heading">
    <h2 id="contribution-heading"><span>${title}</span> <span class="dim">${description}</span></h2>
    <div class="commits" data-commits style="--columns:${columns}">
      <div class="commits__head">
        <p>${summary}</p>
        <p class="commits__key" aria-hidden="true">${t('أقل', 'Less')}<i data-l="0"></i><i data-l="1"></i><i data-l="2"></i><i data-l="3"></i><i data-l="4"></i>${t('أكثر', 'More')}</p>
      </div>
      <div class="commits__viewport" role="region" aria-label="${name}" tabindex="0">
        <div class="commits__calendar">
          <div class="commits__axis" aria-hidden="true">${axis}</div>
          <div class="commits__grid" role="img" aria-label="${summary}">${cells}${days}</div>
        </div>
      </div>
      <span class="commits__tip" data-commits-tip aria-hidden="true" hidden></span>
    </div>
    <dl class="co-cells co-cells--${facts.length} ship__facts">${facts.map(([value, label]) => `<div><dd>${value}</dd><dt>${label}</dt></div>`).join('')}</dl>
  </section>`;
}

function showDay(calendar, cell) {
  const previous = calendar.querySelector('.is-on');
  if (previous === cell) return;
  previous?.classList.remove('is-on');
  const tip = calendar.querySelector('[data-commits-tip]');
  tip.hidden = !cell;
  if (!cell) return;

  cell.classList.add('is-on');
  tip.textContent = cell.dataset.tip;
  const box = calendar.getBoundingClientRect();
  const at = cell.getBoundingClientRect();
  const half = tip.offsetWidth / 2;
  tip.style.left = `${Math.min(Math.max(at.left + at.width / 2 - box.left, half), box.width - half)}px`;
  tip.style.top = `${at.top - box.top}px`;
}

export function initContributionCalendar(content) {
  content.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'touch') return;
    const grid = event.target.closest('.commits__grid');
    if (grid) showDay(grid.closest('[data-commits]'), event.target.closest('[data-day]'));
  });
  content.addEventListener('pointerout', (event) => {
    const grid = event.target.closest('.commits__grid');
    if (grid && !grid.contains(event.relatedTarget)) showDay(grid.closest('[data-commits]'), null);
  });
}

export function showLatestContributions(content) {
  const viewport = content.querySelector('.commits__viewport');
  if (!viewport) return;
  viewport.scrollLeft = viewport.matches(':dir(rtl)') ? -viewport.scrollWidth : viewport.scrollWidth;
}
