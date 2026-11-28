import { seam } from './frame.js';
import { swashHeaders } from './swash.js';
import { blogPosts, infoPages, sitePages } from './site_content.js';
import { pageStories } from './page_story_content.js';
import { featurePage, featurePageIds } from './feature_pages.js';
import { architecturePage } from './architecture_page.js';
import { companyPage, companyPageIds, pricingPage } from './company_pages.js';

const strings = {
  ar: {
    brand: 'مُعين',
    waitlist: 'انضم إلى قائمة الانتظار', login: 'تسجيل الدخول', copyright: '© 2026 مُعين',
    pricing: 'الأسعار', pricingLead: 'قارن الخطط واختر ما يناسب فريقك.',
    roadmap: 'خريطة الطريق', roadmapLead: 'تابع ما نعمل عليه وما نخطط له وما اكتمل في مُعين.',
    changelog: 'سجل التحديثات', changelogLead: 'تابع الميزات الجديدة والتحسينات والإصلاحات في كل إصدار من مُعين.',
    cadence: 'دورة الفوترة', annual: 'سنوي', monthly: 'شهري', perSeat: 'لكل مقعد شهريًا',
    monthlyNote: 'فوترة شهرية', annualNote: amount => `${amount} لكل مقعد سنويًا`,
    freeNote: 'مجانية لكل مساحة عمل', freeSeats: count => `حتى ${count} مقاعد`, paidSeats: 'المقاعد حسب الاشتراك',
    workspace: 'الفرق والمهام والمحادثات', tools: 'الملفات والبريد والاجتماعات والتكاملات', knowledge: 'قاعدة المعرفة للذكاء الاصطناعي',
    priceTerms: 'الأسعار قبل الضريبة ومقرّبة إلى أقرب وحدة من العملة.',
    feature: 'جديد', improvement: 'تحسينات', fix: 'إصلاحات', archive: 'الإصدارات السابقة',
    release: (version) => `الإصدار ${version}`,
    in_progress: 'نعمل عليها الآن', planned: 'التالي', later: 'ما بعد ذلك', done: 'اكتملت',
    snapshot: 'تُعرض نسخة محفوظة من خريطة الطريق.', emptyRoadmap: 'سننشر الخطط هنا حين تصبح جاهزة للمشاركة.',
    loading: 'جارٍ تحميل خريطة الطريق…', roadmapError: 'تعذّر تحميل خريطة الطريق.', retry: 'إعادة المحاولة',
    releaseError: 'تعذّر عرض سجل التحديثات الآن.', openReleases: 'افتح سجل التحديثات في مُعين',
  },
  en: {
    brand: 'Moeen',
    waitlist: 'Join the waitlist', login: 'Sign in', copyright: '© 2026 Moeen',
    pricing: 'Pricing', pricingLead: 'Compare plans and choose what fits your team.',
    roadmap: 'Roadmap', roadmapLead: 'See what we’re building, what’s planned, and what’s done in Moeen.',
    changelog: 'Changelog', changelogLead: 'Follow new features, improvements, and fixes in each Moeen release.',
    cadence: 'Billing period', annual: 'Yearly', monthly: 'Monthly', perSeat: 'per seat/month',
    monthlyNote: 'Billed monthly', annualNote: amount => `${amount} per seat, billed yearly`,
    freeNote: 'Free per workspace', freeSeats: count => `Up to ${count} seats`, paidSeats: 'Seats based on subscription',
    workspace: 'Teams, tasks, and chat', tools: 'Files, email, meetings, and integrations', knowledge: 'AI knowledge base',
    priceTerms: 'Prices are before tax and rounded to the nearest whole unit.',
    feature: 'New', improvement: 'Improved', fix: 'Fixed', archive: 'Earlier releases',
    release: (version) => `Release ${version}`,
    in_progress: 'In progress', planned: 'Planned', later: 'Later', done: 'Done',
    snapshot: 'Showing a saved copy of the roadmap.', emptyRoadmap: 'We’ll share plans here when they’re ready.',
    loading: 'Loading the roadmap…', roadmapError: 'The roadmap couldn’t load.', retry: 'Try again',
    releaseError: 'The changelog is temporarily unavailable.', openReleases: 'Open the changelog in Moeen',
  },
};

export const pages = Object.keys(sitePages);
export const copy = locale => strings[locale];
export const pageTitle = (page, locale) => sitePages[page].title?.[locale] ?? sitePages[page].label[locale];
export const pageLead = (page, locale) => infoPages[page]?.lead?.[locale] ?? copy(locale)[page + 'Lead'] ?? '';
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
const bilingual = (ar, en) => ({ ar, en });
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

const pricingQuestions = {
  kind: 'faq',
  title: bilingual('أسئلة عن الاشتراك', 'Questions about billing'),
  items: [
    {
      title: bilingual('كيف تُحسب المقاعد؟', 'What counts as a seat?'),
      body: bilingual('تُحسب المقاعد لكل مساحة عمل. في الخطة المجانية، يشغل المالك والأعضاء والدعوات التي لم تنتهِ صلاحيتها مقاعد من الحدّ المتاح.', 'Seats are counted per workspace. On Free, the owner, other members, and unexpired invitations all count toward the limit.'),
    },
    {
      title: bilingual('ما الفرق بين الفوترة الشهرية والسنوية؟', 'How do monthly and yearly billing differ?'),
      body: bilingual('تُحسب الفوترة الشهرية بسعر المقعد الشهري. ولحساب المبلغ السنوي، اضرب السعر الشهري المعروض في الخيار السنوي في 12، ثم في عدد المقاعد.', 'Monthly billing uses the monthly seat rate. For yearly billing, multiply the displayed yearly monthly rate by 12, then multiply by the number of seats.'),
    },
    {
      title: bilingual('هل أحتاج إلى خطة برو للاحتفاظ بالملفات؟', 'Do I need Pro to store files?'),
      body: bilingual('رفع الملفات وتنظيمها متاح في الخطط الثلاث. تحتاج إلى برو عند استخدام AI أو فهرسة المحتوى والبحث فيه بقاعدة المعرفة.', 'You can upload and organize files on all three plans. Pro adds AI and knowledge base indexing and retrieval.'),
    },
  ],
};

function pricing(locale) {
  const text = copy(locale);
  return pricingPage(locale, { plans, lifetimePrice: 500_000, questions: pricingQuestions, text, title: pageTitle('pricing', locale), lead: text.pricingLead, label: text.pricing });
}

// Changelog and roadmap open with the home page's two-tone headline.
function pageHead(page, locale, extra = '') {
  const label = (sitePages[page].navLabel ?? sitePages[page].label)[locale];
  return `<header class="fp-hero fp-hero--center page-head"><span class="eyebrow">${escape(label)}</span>
    <h1><span>${escape(pageTitle(page, locale))}.</span> <span class="dim">${escape(pageLead(page, locale))}</span></h1>${extra}</header>`;
}

const roadmapDefinitions = {
  in_progress: bilingual('بدأ العمل على هذه البنود.', 'Work has started on these items.'),
  planned: bilingual('بنود على قائمتنا لم يبدأ تنفيذها بعد.', 'Items on our list that haven’t started yet.'),
  later: bilingual('أفكار نعود إليها لاحقًا.', 'Ideas to revisit later.'),
  done: bilingual('بنود اكتمل تنفيذها.', 'Work that has been completed.'),
};

function roadmap(locale, feed, status) {
  const text = copy(locale);
  const groups = Object.entries(statuses).map(([id, marker]) => ({
    id, marker, items: feed?.items.filter(item => item.status === id) ?? [],
  }));
  const key = `<ul class="road-key" role="list">${groups.map(({ id, marker, items }) => {
    const label = `${icon(marker)}<span>${text[id]}</span>`;
    return `<li data-tone="${id}">${items.length ? `<a href="#roadmap-${id}">${label}<bdi>${items.length}</bdi></a>` : `<span>${label}</span>`}</li>`;
  }).join('')}</ul>`;
  const head = pageHead('roadmap', locale, key);
  if (!feed) return head + `<p role="status" class="page-status">${status === 'error' ? text.roadmapError : text.loading}</p>
    ${status === 'error' ? `<button type="button" class="btn btn--ghost" data-retry>${text.retry}</button>` : ''}`;
  const patterns = ['hatch', 'dots', 'cross', 'dash'];
  const rows = groups.filter(group => group.items.length).map(({ id, marker, items }, index) => `${seam(patterns[index])}
    <section class="road" data-tone="${id}" aria-labelledby="roadmap-${id}">
      <header><h2 id="roadmap-${id}">${icon(marker)}<span>${text[id]}</span></h2><p>${localized(roadmapDefinitions[id], locale)}</p></header>
      <ul role="list">${items.map(item => `<li><h3>${localized(item.title, locale)}</h3><p>${localized(item.summary, locale)}</p></li>`).join('')}</ul>
    </section>`).join('');
  return head + (rows || `<p class="page-status">${text.emptyRoadmap}</p>`) + seam('hatch')
    + `<div class="road-end"><a class="link" href="/changelog/">${text.changelog}${icon('arrow', 'i flip')}</a>${feed.source === 'snapshot' || status === 'error' ? `<span>${text.snapshot}</span>` : ''}</div>`;
}

const releaseIllustrations = {
  compact_task_create: 'tasks',
  ai_composer_height: 'ask',
  claude_workspace_design_refresh: 'teams',
  workspace_ai_agents: 'ask',
  personal_recurring_reminders: 'tasks',
  public_roadmap: 'audit',
  meeting_platforms: 'meetings',
  private_product_waitlist: 'people',
  connected_mail_calendar: 'mail',
};

function releaseMarkup(release, locale) {
  const text = copy(locale);
  const artwork = release.artwork;
  const lead = release.changes.find(change => change.kind === 'feature' && (!artwork?.featureId || change.id === artwork.featureId));
  const version = escape(release.version);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(release.date));
  const illustration = (lead && Object.hasOwn(releaseIllustrations, lead.id) ? releaseIllustrations[lead.id] : null)
    ?? (artwork ? 'audit' : null);
  const artworkSrc = theme => `/assets/iso/${theme}/${illustration}.svg`;
  return `<article class="release page-rows" id="v${version}" aria-labelledby="title-${version}">
    <header class="release-meta">
      <h2 id="title-${version}"><a href="#v${version}" aria-label="${escape(text.release(version))}"><bdi dir="ltr">v${version}</bdi></a></h2>
      <time datetime="${release.date}">${escape(date)}</time>
    </header>
    <div class="release-body">
      ${illustration ? `<figure class="release-image"><img width="164" height="116" loading="lazy" decoding="async"
        data-light="${artworkSrc('light')}" data-dark="${artworkSrc('dark')}" src="${artworkSrc('light')}" alt=""></figure>` : ''}
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
  const latest = feed.releases[0];
  const highlight = latest.changes.find(change => change.id === latest.artwork?.featureId) ?? latest.changes[0];
  const index = `<div class="changelog-index">
    <div class="changelog-latest">
      <p class="story-kicker">${locale === 'ar' ? 'أحدث إصدار' : 'Latest release'}</p>
      <a href="#v${escape(latest.version)}"><bdi dir="ltr">v${escape(latest.version)}</bdi>
        ${highlight ? `<strong>${localized(highlight.title, locale)}</strong>` : ''}${icon('arrow', 'i flip')}
      </a>
    </div>
    <details class="version-index"><summary>${locale === 'ar' ? 'انتقل إلى إصدار' : 'Jump to a version'}${icon('chev')}</summary>
      <ul role="list">${feed.releases.map(release => `<li><a href="#v${escape(release.version)}"><bdi dir="ltr">v${escape(release.version)}</bdi></a></li>`).join('')}</ul>
    </details>
  </div>`;
  const recent = feed.releases.slice(0, 6).map(release => releaseMarkup(release, locale)).join('');
  const archive = feed.releases.slice(6).map(release => releaseMarkup(release, locale)).join('');
  return pageHead('changelog', locale) + seam('hatch') + index + recent + (archive ? `<details class="release-archive"><summary>${text.archive}${icon('chev')}</summary>${archive}</details>` : '');
}

export const hasStory = page => Object.hasOwn(pageStories, page) || page === 'blog';

function storySection(part, locale) {
  const title = localized(part.title, locale);
  const heading = `<h2>${title}</h2>`;
  const titleOf = item => localized(item.title, locale);
  const body = item => `<p>${localized(item.body, locale)}</p>`;
  if (part.kind === 'scene') {
    return `<section class="story-section story-scene">${heading}${body(part)}</section>`;
  }
  if (part.kind === 'example') {
    return `<section class="story-section story-example">${heading}<blockquote>${localized(part.quote, locale)}</blockquote>
      ${part.note ? `<p>${localized(part.note, locale)}</p>` : ''}</section>`;
  }
  if (part.kind === 'matrix') {
    return `<section class="story-section story-matrix">
      <table><caption>${title}</caption>
        <thead><tr>${part.headings.map(cell => `<th scope="col">${localized(cell, locale)}</th>`).join('')}</tr></thead>
        <tbody>${part.rows.map(([key, value]) => `<tr>
          <th scope="row">${key.code ? `<code dir="ltr">${escape(key.code)}</code>` : localized(key, locale)}</th>
          <td>${localized(value, locale)}</td></tr>`).join('')}</tbody>
      </table>
    </section>`;
  }
  if (part.kind === 'faq') {
    return `<section class="story-section story-faq">${heading}<div class="story-answers">
      ${part.items.map(item => `<details><summary><span>${titleOf(item)}</span>${icon('chev')}</summary>${body(item)}</details>`).join('')}
    </div></section>`;
  }
  if (part.kind === 'resources') {
    return `<section class="story-section story-resources">${heading}<ul role="list">
      ${part.items.map(item => `<li><a href="${escape(item.href)}"><div><h3>${titleOf(item)}</h3>${body(item)}</div>${icon('arrow', 'i flip')}</a></li>`).join('')}
    </ul></section>`;
  }
  if (part.kind === 'prose' || part.kind === 'notice') {
    return `<section class="story-section story-${part.kind}">${heading}
      ${part.items.map(item => `<div><h3>${titleOf(item)}</h3>${body(item)}</div>`).join('')}
    </section>`;
  }

  const ordered = ['steps', 'timeline', 'pipeline'].includes(part.kind);
  const listTag = ordered ? 'ol' : 'ul';
  return `<section class="story-section story-${part.kind}">${heading}<${listTag} role="list">
    ${part.items.map((item, index) => `<li>
      ${part.kind === 'steps' ? `<span class="story-step" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>` : ''}
      ${item.logo ? `<img class="story-provider-logo" src="/assets/logos/${item.logo}.svg" alt="" width="28" height="28" loading="lazy">` : ''}
      <div><h3>${titleOf(item)}</h3>${body(item)}</div>
    </li>`).join('')}
  </${listTag}></section>`;
}

function blog(locale) {
  return `${pageHead('blog', locale)}${seam('hatch')}
    <ul class="posts" role="list">${blogPosts.map(id => infoPages[id]).map(entry => `<li><a href="${entry.path}">
      <small>${localized(entry.topic, locale)}</small><div><h2>${localized(entry.label, locale)}</h2><p>${localized(entry.lead, locale)}</p></div>${icon('arrow', 'i i--sm flip')}
    </a></li>`).join('')}</ul>`;
}

// Articles read as one quiet column: topic, title, then the text.
function post(page, locale) {
  const entry = infoPages[page];
  return `<article class="post"><header><span class="eyebrow">${localized(entry.topic, locale)}</span><h1>${localized(entry.label, locale)}</h1><p>${localized(entry.lead, locale)}</p></header>
    ${pageStories[page].blocks.map(part => storySection(part, locale)).join('')}</article>`;
}

function pageComposition(page, locale, feed) {
  if (featurePageIds.includes(page)) return featurePage(page, locale);
  if (companyPageIds.includes(page)) return companyPage(page, locale, { questions: pricingQuestions.items, feed });
  if (page === 'architecture') return architecturePage(locale);
  return post(page, locale);
}

function information(page, locale, feed) {
  if (page === 'docs') return '';
  if (page === 'blog') return blog(locale);

  const entry = infoPages[page];
  const links = entry.related?.map(id => sitePages[id]) ?? [];
  return `
    ${pageComposition(page, locale, feed)}
    ${links.length ? `${seam('hatch')}<aside class="related" style="--n:${links.length}">
      <h2>${locale === 'ar' ? 'اقرأ كذلك' : 'Explore related pages'}</h2>
      ${links.map(link => `<a href="${link.path}"><strong>${localized(link.label, locale)}</strong>${link.teaser ? `<small>${localized(link.teaser, locale)}</small>` : ''}${icon('arrow', 'i i--sm flip')}</a>`).join('')}
    </aside>` : ''}`;
}

export function renderContent(page, locale, { feed, origin, status } = {}) {
  const html = page === 'pricing' ? pricing(locale)
    : page === 'roadmap' ? roadmap(locale, feed, status)
    : page === 'changelog' ? changelog(locale, feed, origin)
    : information(page, locale, feed);
  return locale === 'ar' ? swashHeaders(html) : html;
}
