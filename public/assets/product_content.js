const strings = {
  ar: {
    brand: 'مُعين', home: 'الصفحة الرئيسية', skip: 'تخطَّ إلى المحتوى', nav: 'صفحات مُعين',
    language: 'Switch to English', languageShort: 'EN', light: 'التبديل إلى المظهر الفاتح', dark: 'التبديل إلى المظهر الداكن',
    waitlist: 'انضم إلى قائمة الانتظار', login: 'تسجيل الدخول', copyright: '© 2026 مُعين',
    pricing: 'الأسعار', pricingLead: 'قارن الخطط واختر ما يناسب فريقك. يُحسب الاشتراك لكل مساحة عمل على حدة.',
    roadmap: 'خريطة الطريق', roadmapLead: 'تابع ما نعمل عليه وما نخطط له وما اكتمل في مُعين.',
    changelog: 'سجل التحديثات', changelogLead: 'تابع الميزات الجديدة والتحسينات والإصلاحات في كل إصدار من مُعين.',
    cadence: 'دورة الفوترة', annual: 'سنوي', monthly: 'شهري', perSeat: 'لكل مقعد شهريًا',
    monthlyNote: 'فوترة شهرية', annualNote: amount => `${amount} لكل مقعد سنويًا`,
    freeNote: 'مجانية لكل مساحة عمل', freeSeats: count => `حتى ${count} مقاعد`, paidSeats: 'المقاعد حسب الاشتراك',
    workspace: 'الفرق والمهام والمحادثات', tools: 'الملفات والبريد والاجتماعات والتكاملات', knowledge: 'قاعدة المعرفة للذكاء الاصطناعي',
    priceTerms: 'الأسعار بالدولار الأمريكي قبل الضريبة.', payment: 'الاشتراكات المدفوعة لم تُفعّل بعد. التسجيل في قائمة الانتظار لا يتطلّب دفعًا.',
    feature: 'جديد', improvement: 'تحسينات', fix: 'إصلاحات', archive: 'الإصدارات السابقة',
    release: (version) => `الإصدار ${version}`,
    in_progress: 'نعمل عليها', planned: 'على القائمة', later: 'في المستقبل', done: 'اكتملت',
    snapshot: 'تُعرض نسخة محفوظة من خريطة الطريق.', emptyRoadmap: 'سننشر الخطط هنا حين تصبح جاهزة للمشاركة.',
    loading: 'جارٍ تحميل خريطة الطريق…', roadmapError: 'تعذّر تحميل خريطة الطريق.', retry: 'إعادة المحاولة',
    releaseError: 'تعذّر عرض سجل التحديثات الآن.', openReleases: 'افتح سجل التحديثات في مُعين',
  },
  en: {
    brand: 'Moeen', home: 'Home', skip: 'Skip to content', nav: 'Moeen pages',
    language: 'التبديل إلى العربية', languageShort: 'ع', light: 'Switch to light theme', dark: 'Switch to dark theme',
    waitlist: 'Join the waitlist', login: 'Sign in', copyright: '© 2026 Moeen',
    pricing: 'Pricing', pricingLead: 'Compare plans and choose what fits your team. Each workspace has its own subscription.',
    roadmap: 'Roadmap', roadmapLead: 'See what we’re building, what’s planned, and what’s done in Moeen.',
    changelog: 'Changelog', changelogLead: 'Follow new features, improvements, and fixes in each Moeen release.',
    cadence: 'Billing period', annual: 'Yearly', monthly: 'Monthly', perSeat: 'per seat/month',
    monthlyNote: 'Billed monthly', annualNote: amount => `${amount} per seat, billed yearly`,
    freeNote: 'Free per workspace', freeSeats: count => `Up to ${count} seats`, paidSeats: 'Seats based on subscription',
    workspace: 'Teams, tasks, and chat', tools: 'Files, email, meetings, and integrations', knowledge: 'AI knowledge base',
    priceTerms: 'Prices are in USD before tax.', payment: 'Paid subscriptions are pending. Joining the waitlist is free.',
    feature: 'New', improvement: 'Improved', fix: 'Fixed', archive: 'Earlier releases',
    release: (version) => `Release ${version}`,
    in_progress: 'In progress', planned: 'Planned', later: 'Later', done: 'Done',
    snapshot: 'Showing a saved copy of the roadmap.', emptyRoadmap: 'We’ll share plans here when they’re ready.',
    loading: 'Loading the roadmap…', roadmapError: 'The roadmap couldn’t load.', retry: 'Try again',
    releaseError: 'The changelog is temporarily unavailable.', openReleases: 'Open the changelog in Moeen',
  },
};

export const pages = ['pricing', 'roadmap', 'changelog'];
export const copy = locale => strings[locale];
export const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

export const icon = (name, classes = 'i i--sm') =>
  `<svg class="${classes}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

const localized = (value, locale) => escape(value?.[locale] ?? value?.ar ?? '');
const statuses = { in_progress: 'status-progress', planned: 'status-todo', later: 'status-backlog', done: 'status-done' };
const categories = { feature: 'plus', improvement: 'arrow-up', fix: 'status-done' };
const versionPattern = /^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const copyPair = value => typeof value?.ar === 'string' && typeof value?.en === 'string';

export function validFeed(page, data) {
  if (data?.schemaVersion !== 1) return false;
  if (page === 'roadmap') return ['github', 'snapshot'].includes(data.source) && Array.isArray(data.items)
    && data.items.every(item => item && Object.hasOwn(statuses, item.status) && copyPair(item.title) && copyPair(item.summary));
  return Array.isArray(data.releases) && data.releases.length > 0 && data.releases.every(release =>
    release && typeof release.version === 'string' && versionPattern.test(release.version)
    && typeof release.date === 'string' && datePattern.test(release.date)
    && Number.isFinite(Date.parse(release.date)) && Array.isArray(release.changes)
    && release.changes.every(change => change && Object.hasOwn(categories, change.kind)
      && copyPair(change.title) && copyPair(change.description)));
}

// Mirrors WORKSPACE_PLANS in App packages/core/src/billing.ts, in USD cents.
const plans = [
  { id: 'free', title: { ar: 'مجانية', en: 'Free' }, monthly: 0, annual: 0, seats: 3 },
  { id: 'plus', title: { ar: 'بلس', en: 'Plus' }, monthly: 500, annual: 400 },
  { id: 'pro', title: { ar: 'برو', en: 'Pro' }, monthly: 800, annual: 700 },
];

function pricing(locale) {
  const text = copy(locale);
  const money = cents => `<bdi dir="ltr">$${cents / 100}</bdi>`;
  return `
    <div class="plan-tools">
      <fieldset class="plan-cadence" data-plan-cadence>
        <legend class="page-sr">${text.cadence}</legend>
        ${['annual', 'monthly'].map(id => `<label><input type="radio" name="cadence" value="${id}"${id === 'annual' ? ' checked' : ''}><span>${text[id]}</span></label>`).join('')}
      </fieldset>
    </div>
    <div class="plan-grid">
      ${plans.map(plan => {
        const paid = plan.id !== 'free';
        const included = [paid ? text.paidSeats : text.freeSeats(plan.seats), text.workspace, text.tools];
        if (plan.id === 'pro') included.push('ai-moeen', text.knowledge);
        return `<article class="plan plan--${plan.id}">
          <h2>${localized(plan.title, locale)}</h2>
          <div class="plan-cost">
            ${['annual', 'monthly'].map(id => `<div data-rate="${id}"${id === 'monthly' ? ' hidden' : ''}>
              <p><strong>${money(plan[id])}</strong>${paid ? ` <span>${text.perSeat}</span>` : ''}</p>
              <p class="plan-note">${paid ? id === 'annual' ? text.annualNote(money(plan.annual * 12)) : text.monthlyNote : text.freeNote}</p>
            </div>`).join('')}
          </div>
          <ul role="list">${included.map(item => `<li>${icon('check')}<span>${item}</span></li>`).join('')}</ul>
        </article>`;
      }).join('')}
    </div>
    <div class="plan-access">
      <p>${text.priceTerms} ${text.payment}</p>
      <a class="btn btn--solid btn--lg" href="/waitlist/"><span>${text.waitlist}</span><span class="btn__arrow" aria-hidden="true">${icon('arrow', 'i i--xs flip')}</span></a>
    </div>`;
}

function roadmap(locale, feed, status) {
  const text = copy(locale);
  if (!feed) return `<p role="status" class="page-status">${status === 'error' ? text.roadmapError : text.loading}</p>
    ${status === 'error' ? `<button type="button" class="btn btn--ghost" data-retry>${text.retry}</button>` : ''}`;
  const rows = Object.entries(statuses).map(([statusId, marker]) => {
    const items = feed.items.filter(item => item.status === statusId);
    if (!items.length) return '';
    return `<section class="roadmap-group page-rows" aria-labelledby="roadmap-${statusId}">
      <h2 id="roadmap-${statusId}" class="page-marker" data-tone="${statusId}">${icon(marker)}${text[statusId]}</h2>
      <ul role="list">${items.map(item => `<li><h3>${localized(item.title, locale)}</h3><p>${localized(item.summary, locale)}</p></li>`).join('')}</ul>
    </section>`;
  }).join('');
  return rows + (rows ? '' : `<p class="page-status">${text.emptyRoadmap}</p>`)
    + (feed.source === 'snapshot' || status === 'error' ? `<p class="page-status page-status--note">${text.snapshot}</p>` : '');
}

function releaseMarkup(release, locale, origin) {
  const text = copy(locale);
  const artwork = release.artwork;
  const lead = release.changes.find(change => change.kind === 'feature' && (!artwork?.featureId || change.id === artwork.featureId));
  const version = escape(release.version);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(release.date));
  const artworkSrc = theme => `${escape(origin)}/changelog/artwork/${release.version.replaceAll(/[.+-]/g, '_')}_${locale}_${theme}.png`;
  return `<article class="release page-rows" id="v${version}" aria-labelledby="title-${version}">
    <header class="release-meta">
      <h2 id="title-${version}"><a href="#v${version}" aria-label="${escape(text.release(version))}"><bdi dir="ltr">v${version}</bdi></a></h2>
      <time datetime="${release.date}">${escape(date)}</time>
    </header>
    <div class="release-body">
      ${lead ? `<img class="release-image" width="1440" height="720" loading="lazy" decoding="async"
        data-light="${artworkSrc('light')}" data-dark="${artworkSrc('dark')}" src="${artworkSrc('light')}"
        alt="${localized(artwork?.title ?? lead.title, locale)}">` : ''}
      ${Object.entries(categories).map(([kind, symbol]) => {
        const changes = release.changes.filter(change => change.kind === kind);
        if (!changes.length) return '';
        return `<section class="release-changes" aria-labelledby="${version}-${kind}">
          <h3 class="page-marker" data-tone="${kind}" id="${version}-${kind}">${icon(symbol)}${text[kind]}</h3>
          <ul>${changes.map(change => `<li><strong>${localized(change.title, locale)}</strong><p>${localized(change.description, locale)}</p></li>`).join('')}</ul>
        </section>`;
      }).join('')}
    </div>
  </article>`;
}

function changelog(locale, feed, origin) {
  const text = copy(locale);
  if (!feed) return `<p class="page-status">${text.releaseError}</p><a class="link" href="${escape(origin)}/settings/changelog">${text.openReleases}</a>`;
  const recent = feed.releases.slice(0, 6).map(release => releaseMarkup(release, locale, origin)).join('');
  const archive = feed.releases.slice(6).map(release => releaseMarkup(release, locale, origin)).join('');
  return recent + (archive ? `<details class="release-archive"><summary>${text.archive}${icon('chev')}</summary>${archive}</details>` : '');
}

export function renderContent(page, locale, { feed, origin, status } = {}) {
  if (page === 'pricing') return pricing(locale);
  if (page === 'roadmap') return roadmap(locale, feed, status);
  return changelog(locale, feed, origin);
}
