import { featureChapters } from './feature_chapters.js';
import { blogPosts, infoPages, sitePages } from './site_content.js';
import { pageStories } from './page_story_content.js';

const strings = {
  ar: {
    brand: 'مُعين',
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
    brand: 'Moeen',
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

export const pages = Object.keys(sitePages);
export const copy = locale => strings[locale];
export const pageTitle = (page, locale) => infoPages[page]?.title?.[locale] ?? sitePages[page].label[locale];
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
      body: bilingual('رفع الملفات وتنظيمها متاح في الخطط الثلاث. تحتاج إلى برو عند استخدام ai-moeen أو فهرسة المحتوى والبحث فيه بقاعدة المعرفة.', 'You can upload and organize files on all three plans. Pro adds ai-moeen and knowledge base indexing and retrieval.'),
    },
    {
      title: bilingual('هل أستطيع شراء اشتراك الآن؟', 'Can I purchase a subscription now?'),
      body: bilingual('لم يُفعّل الدفع بعد. يمكنك الانضمام إلى قائمة الانتظار مجانًا.', 'Checkout is pending. You can join the waitlist for free.'),
    },
  ],
};

function pricingComparison(locale) {
  const text = copy(locale);
  const included = `${icon('check')}<span class="page-sr">${locale === 'ar' ? 'مشمول' : 'Included'}</span>`;
  const unavailable = locale === 'ar' ? 'غير مشمول' : 'Not included';
  const rows = [
    [locale === 'ar' ? 'المقاعد' : 'Seats', plans.map(plan => plan.seats ? text.freeSeats(plan.seats) : text.paidSeats)],
    [text.workspace, plans.map(() => included)],
    [text.tools, plans.map(() => included)],
    ['ai-moeen', plans.map(plan => plan.id === 'pro' ? included : unavailable)],
    [text.knowledge, plans.map(plan => plan.id === 'pro' ? included : unavailable)],
  ];
  return `<section class="price-comparison story-section">
    <table><caption>${locale === 'ar' ? 'قارن ما تشمله الخطط' : 'Compare what’s included'}</caption>
      <thead><tr><th scope="col">${locale === 'ar' ? 'الميزة' : 'Feature'}</th>
        ${plans.map(plan => `<th scope="col">${localized(plan.title, locale)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(([name, cells]) => `<tr><th scope="row">${name}</th>
        ${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></section>`;
}

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
    </div>
    <div class="story-body">${pricingComparison(locale)}${storySection(pricingQuestions, locale)}</div>`;
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
  const statusLabel = ({ id, marker }) => `<span class="page-marker" data-tone="${id}">${icon(marker)}${text[id]}</span>`;
  const guide = `<ul class="roadmap-guide" role="list">${groups.map(group => `<li>
    ${group.items.length ? `<a href="#roadmap-${group.id}">${statusLabel(group)}<bdi>${group.items.length}</bdi></a>` : statusLabel(group)}
    <p>${localized(roadmapDefinitions[group.id], locale)}</p>
  </li>`).join('')}</ul>`;
  if (!feed) return guide + `<p role="status" class="page-status">${status === 'error' ? text.roadmapError : text.loading}</p>
    ${status === 'error' ? `<button type="button" class="btn btn--ghost" data-retry>${text.retry}</button>` : ''}`;
  const rows = groups.filter(group => group.items.length).map(group => `
    <section class="roadmap-group page-rows" aria-labelledby="roadmap-${group.id}">
      <h2 id="roadmap-${group.id}">${statusLabel(group)}</h2>
      <ul role="list">${group.items.map(item => `<li><h3>${localized(item.title, locale)}</h3><p>${localized(item.summary, locale)}</p></li>`).join('')}</ul>
    </section>`).join('');
  return guide + (rows || `<p class="page-status">${text.emptyRoadmap}</p>`)
    + (feed.source === 'snapshot' || status === 'error' ? `<p class="page-status page-status--note">${text.snapshot}</p>` : '')
    + `<p class="roadmap-releases"><a class="link" href="/changelog/">${text.changelog}${icon('arrow', 'i flip')}</a></p>`;
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
  const recent = feed.releases.slice(0, 6).map(release => releaseMarkup(release, locale, origin)).join('');
  const archive = feed.releases.slice(6).map(release => releaseMarkup(release, locale, origin)).join('');
  return index + recent + (archive ? `<details class="release-archive"><summary>${text.archive}${icon('chev')}</summary>${archive}</details>` : '');
}

export const hasStory = page => Object.hasOwn(pageStories, page) || page === 'blog';

function storyFigure(image, locale, eager = false) {
  return `<figure class="feature-visual"><img width="${image.width}" height="${image.height}"
    data-shot="${image.shot}" src="/assets/shots2/${image.shot}_${locale}_light.png"
    alt="${localized(image.alt, locale)}" decoding="async"${eager ? '' : ' loading="lazy"'}></figure>`;
}

function storyHeading(page, locale, layout, image) {
  const entry = infoPages[page];
  const title = pageTitle(page, locale);
  const label = entry.topic?.[locale] ?? entry.label[locale];
  return `<header class="story-hero story-hero--${layout}">
    <div class="story-hero__copy">
      ${label === title ? '' : `<p class="story-kicker">${escape(label)}</p>`}
      <h1>${escape(title)}</h1>
      <p class="story-hero__lead">${escape(pageLead(page, locale))}</p>
    </div>
    ${image ? storyFigure(image, locale, true) : ''}
  </header>`;
}

function storySections(blocks, locale) {
  return blocks.map(part => storySection(part, locale)).join('');
}

function storySection(part, locale) {
  const title = localized(part.title, locale);
  const heading = `<h2>${title}</h2>`;
  const titleOf = item => localized(item.title, locale);
  const body = item => `<p>${localized(item.body, locale)}</p>`;
  if (part.kind === 'scene') {
    return `<section class="story-section story-scene"><div class="story-scene__copy">${heading}${body(part)}</div>${storyFigure(part.image, locale)}</section>`;
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
  const [featured, ...otherPosts] = blogPosts.map(id => infoPages[id]);
  const read = locale === 'ar' ? 'اقرأ المقال' : 'Read article';
  return `${storyHeading('blog', locale, 'blog')}
    <a class="blog-feature" href="${featured.path}">
      <div><p class="story-kicker">${localized(featured.topic, locale)}</p>
        <h2>${localized(featured.label, locale)}</h2><p>${localized(featured.lead, locale)}</p>
        <span class="blog-read">${read}${icon('arrow', 'i flip')}</span>
      </div>
      ${storyFigure(featured.image, locale, true)}
    </a>
    <ul class="blog-index" role="list">${otherPosts.map(post => `<li><a href="${post.path}">
      ${storyFigure(post.image, locale)}
      <div><p class="story-kicker">${localized(post.topic, locale)}</p>
        <h2>${localized(post.label, locale)}</h2><p>${localized(post.lead, locale)}</p>
        <span class="blog-read">${read}${icon('arrow', 'i flip')}</span>
      </div>
    </a></li>`).join('')}</ul>`;
}

function pageComposition(page, locale) {
  const entry = infoPages[page];
  const story = pageStories[page];
  const parts = story.blocks;
  const t = (ar, en) => locale === 'ar' ? ar : en;
  const title = localized(entry.title ?? entry.label, locale);
  const lead = localized(entry.lead, locale);
  const label = localized(entry.topic ?? entry.label, locale);
  const intro = `<header class="canvas-intro">${title !== label ? `<p class="story-kicker">${label}</p>` : ''}<h1>${title}</h1><p class="canvas-lead">${lead}</p></header>`;
  const part = index => storySection(parts[index], locale);
  const image = (asset = story.image ?? entry.image) => storyFigure(asset, locale, true);
  const rest = start => `<div class="story-body">${storySections(parts.slice(start), locale)}</div>`;
  const art = name => `<img class="object-art" alt="" src="/assets/iso/light/${name}.svg" data-light="/assets/iso/light/${name}.svg" data-dark="/assets/iso/dark/${name}.svg">`;

  const chapters = featureChapters[page]?.(t);

  switch (page) {
    case 'tasks': {
      const views = [
        [t('اللوحة', 'Board'), entry.image],
        [t('القائمة', 'List'), infoPages.architecture.image],
      ];
      return `<div class="tasks-studio">${intro}<section class="workbench" aria-label="${label}">
        <fieldset><legend class="page-sr">${t('عرض المهام', 'Task view')}</legend>
        ${views.map(([name], i) => `<label><input type="radio" name="task-view" value="${i}"${i === 0 ? ' checked' : ''}><span>${name}</span></label>`).join('')}</fieldset>
        ${views.map(([, asset], i) => `<div class="board-view board-view--${i}">${image(asset)}</div>`).join('')}</section></div><div class="edition-flow">${chapters[0]}${part(0)}${part(1)}${chapters[1]}${part(2)}</div>`;
    }
    case 'chat':
      return `<div class="conversation-cover">${intro}<div class="conversation-spread">${image()}${image(parts[0].image)}</div></div>
        <div class="conversation-note"><h2>${localized(parts[0].title, locale)}</h2><p>${localized(parts[0].body, locale)}</p></div><div class="thread-columns">${chapters[0]}${chapters[1]}</div>${rest(1)}`;
    case 'teams':
      return `<div class="team-map">${intro}<div class="team-orbit">
        <div class="team-center">${art('teams')}<b>${t('فريق المنتج','Product team')}</b></div>${[['people',t('الأعضاء','Members')],['chat',t('القناة','Channel')],['tasks',t('المهام','Tasks')]].map(([name, caption]) => `<span>${art(name)}<b>${caption}</b></span>`).join('')}
        </div></div><div class="edition-flow">${chapters[0]}${part(0)}${chapters[1]}${part(1)}</div>`;
    case 'data':
      return `<div class="storage-explorer">${intro}${chapters[0]}<div class="storage-preview">${image()}</div></div><div class="edition-flow">${part(0)}${chapters[1]}${part(1)}</div>`;
    case 'meetings':
      return `<div class="schedule-cover">${intro}${chapters[0]}</div><div class="edition-flow"><div class="agenda-content">${part(0)}${image()}</div>${chapters[1]}${part(1)}${part(2)}</div>`;
    case 'mail':
      return `<div class="mail-desk"><div class="letter-pocket">${image()}</div>${intro}</div><div class="edition-flow">${chapters[0]}${part(1)}${chapters[1]}${part(0)}</div>`;
    case 'architecture':
      return `<div class="architecture-lab">${intro}<div class="assembly"><div class="assembly-art" aria-hidden="true">
        <i></i><i></i><i></i><i></i></div><div class="assembly-notes"><h2>${localized(parts[0].title, locale)}</h2>
        ${parts[0].items.map((item,i) => `<details name="action-stage"${i === 0 ? ' open' : ''}><summary>${localized(item.title, locale)}${icon('plus')}</summary><p>${localized(item.body, locale)}</p></details>`).join('')}
        </div></div></div><div class="edition-flow">${chapters[0]}${part(1)}${chapters[1]}${part(2)}</div>`;
    case 'ai_moeen':
      return `<div class="agent-dialogue">${intro}<div class="dialogue-script">
        <blockquote>${localized(parts[0].quote, locale)}</blockquote>${image()}<p>${localized(parts[0].note, locale)}</p></div></div><div class="edition-flow">${chapters[0]}${part(1)}${chapters[1]}${part(2)}</div>`;
    case 'mcp':
      return `<div class="protocol-book"><aside class="protocol-intro">${art('workflow')}${intro}</aside><div class="edition-flow">${chapters[0]}${part(0)}${part(1)}${chapters[1]}${part(2)}</div></div>`;
    case 'knowledge_base':
      return `<div class="reading-room">${intro}${chapters[0]}</div><div class="edition-flow"><div class="source-stack">${image()}<div>${part(0)}</div></div>${part(1)}${chapters[1]}</div>`;
    case 'skills':
      return `<div class="skill-recipe">${intro}<div class="recipe-paper">${art('skills')}${part(0)}</div></div><div class="edition-flow">${chapters[0]}${part(1)}${chapters[1]}${part(2)}</div>`;
    case 'integrations':
      return `<div class="connection-atlas">${intro}${chapters[0]}</div><div class="edition-flow"><div class="connector-directory">${part(0)}</div><div class="connector-catalog">${image()}${part(1)}</div>${chapters[1]}</div>`;
    case 'about':
      return `<div class="founding-letter"><img class="letter-mark" src="/assets/brand/mark_black.svg" data-light="/assets/brand/mark_black.svg" data-dark="/assets/brand/mark_white.svg" alt="">${intro}${part(0)}</div>${rest(1)}`;
    case 'affiliate':
      return `<div class="partner-brief">${intro}${part(0)}</div>${rest(1)}`;
    case 'support':
      return `<div class="help-desk">${intro}
        <label class="help-search"><input type="search" data-help-search aria-label="${t('ابحث في مواضيع الدعم', 'Search help topics')}" placeholder="${t('ابحث في مواضيع الدعم', 'Search help topics')}"></label>
        ${part(0)}<p data-help-empty hidden role="status">${t('لا توجد مواضيع مطابقة.', 'No matching topics.')}</p></div>${rest(1)}`;
    case 'join':
      return `<div class="careers-poster">${intro}${part(1)}</div><div class="careers-letter">${part(0)}</div>`;
    case 'conversations_post':
      return `<div class="field-report">${intro}${image()}</div><div class="article-columns">${part(0)}${part(1)}</div>`;
    case 'approvals_post':
      return `<div class="review-column">${intro}${part(0)}</div>${rest(1)}`;
    case 'meetings_post':
      return `<div class="meeting-notebook">${intro}${part(0)}</div>${rest(1)}`;
    default:
      throw new Error(`Missing page composition for ${page}`);
  }
}

function information(page, locale) {
  if (page === 'docs') return '';
  if (page === 'blog') return blog(locale);

  const entry = infoPages[page];
  const links = entry.related?.map(id => sitePages[id]) ?? [];
  return `
    ${pageComposition(page, locale)}
    ${links.length ? `<aside class="story-related">
      <h2>${locale === 'ar' ? 'اقرأ أيضًا' : 'Explore related pages'}</h2>
      <ul role="list">${links.map(link => `<li><a class="link" href="${link.path}">${localized(link.label, locale)}${icon('arrow', 'i flip')}</a></li>`).join('')}</ul>
    </aside>` : ''}`;
}

export function renderContent(page, locale, { feed, origin, status } = {}) {
  if (page === 'pricing') return pricing(locale);
  if (page === 'roadmap') return roadmap(locale, feed, status);
  if (page === 'changelog') return changelog(locale, feed, origin);
  return information(page, locale);
}
