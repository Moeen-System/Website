// The affiliate, support, careers, about and pricing pages. Each has its own signature piece: a
// share picker, a help palette, an open-roles board, a letter and a savings calculator. Nothing
// on these pages is sent anywhere: copy buttons write to the visitor's own clipboard.
import { seam } from './frame.js';
import { contributionCalendar } from './contribution_calendar.js';
import { ic, kit } from './feature_pages.js';
import { infoPages, sitePages, upcomingModules } from './site_content.js';
import { pageStories } from './page_story_content.js';
import { CURRENCY_OPTIONS, DEFAULT_CURRENCY, formatPrice, wholePrice } from './pricing_currency.js';

export const companyPageIds = ['affiliate', 'support', 'join', 'about'];

const EMAIL = 'team@moeen.dev';

const iso = (name) => `<img class="co-iso" alt="" src="/assets/iso/light/${name}.svg" data-light="/assets/iso/light/${name}.svg" data-dark="/assets/iso/dark/${name}.svg">`;
const arrow = '<svg class="i i--sm flip" aria-hidden="true"><use href="#i-arrow"/></svg>';
const check = '<svg class="i i--sm" aria-hidden="true"><use href="#i-check"/></svg>';
const mark = (alt = '') => `<img src="/assets/brand/mark_black.svg" data-light="/assets/brand/mark_black.svg" data-dark="/assets/brand/mark_white.svg" alt="${alt}" width="26" height="20">`;

const pages = {
  // ---- Affiliate: choose the page that answers the team's problem ---------------------------------
  affiliate(locale) {
    const { t, L, cta, h1, h2, items, title } = kit('affiliate', locale);
    const teams = [[t('فريق التصميم', 'Design team'), 'a', 'b'], [t('فريق المبيعات', 'Sales team'), 'c', 'd'], [t('فريق الدعم', 'Support team'), 'e', 'f']];
    const problems = [
      ['chat', t('تضيع القرارات وسط الرسائل', 'Decisions get lost in messages'), 'mod_chat'],
      ['tasks', t('لا يعرف الفريق من يتابع المهمة', 'Nobody knows who owns a task'), 'mod_tasks'],
      ['data', t('ملفات العمل متفرّقة', 'Work files are scattered'), 'ai_scene_library'],
      ['mail', t('متابعات العملاء عالقة في البريد', 'Client follow-ups are stuck in email'), 'mod_mail'],
      ['ai_moeen', t('يتكرّر الطلب نفسه كل أسبوع', 'The same request comes up every week'), 'ai_scene_response'],
    ];
    const states = [
      [t('التقديم', 'Applications'), t('لم يُفتح بعد', 'Not open yet')],
      [t('الشروط', 'Terms'), t('ستُنشر في هذه الصفحة', 'To be published on this page')],
      [t('العمولة', 'Commission'), t('تُعلن مع الشروط', 'Announced with the terms')],
    ];
    const reads = [
      ['pricing', t('الخطط وما تشمله كل واحدة منها.', 'The plans and what each one includes.')],
      ['roadmap', t('ما نعمل عليه الآن وما يأتي بعده.', 'What we’re building now and what comes next.')],
      ['changelog', t('ما وصل إلى مُعين في كل إصدار.', 'What reached Moeen in each release.')],
    ];
    return `<div class="fp fp--aff">
      <header class="aff-hero"><div class="aff-hero__copy">${h1}${cta}</div>
        <div class="aff-map" aria-hidden="true">
          <svg viewBox="0 0 520 380" preserveAspectRatio="none"><path d="M110 190C230 190 230 74 360 74"/><path d="M110 190H360"/><path d="M110 190C230 190 230 306 360 306"/></svg>
          <span class="aff-map__you"><b>${t('توصيتك', 'Your referral')}</b>${mark}</span>
          ${teams.map(([name, one, two], i) => `<span class="aff-map__team" style="--i:${i}"><i class="fp-av fp-av--sm fp-av--${one}"></i><i class="fp-av fp-av--sm fp-av--${two}"></i><b>${name}</b></span>`).join('')}
        </div></header>
      <dl class="co-cells co-cells--3 aff-states">${states.map(([name, value]) => `<div><dt>${name}</dt><dd>${value}</dd></div>`).join('')}</dl>

      ${seam('hatch')}
      <section class="share" data-share>${h2(t('ابدأ من مشكلة الفريق', 'Start with the team’s problem'), t('واعرف الصفحة التي تشرح له الحل.', 'Find the page that explains the answer.'))}
        <div class="share__stage"><div class="share__list" role="group" aria-label="${t('مشكلة الفريق', 'The team’s problem')}">${problems.map(([, name], i) => `<button type="button" data-share-pick="${i}" aria-pressed="${i === 0}">${name}</button>`).join('')}</div>
        ${problems.map(([id, , image], i) => { const entry = infoPages[id], url = `moeen.dev${entry.path}`; return `<article class="share__card" data-share-card="${i}"${i ? ' hidden' : ''}>
          <div class="share__art"><img data-shot="${image}" src="/assets/shots2/${image}_${locale}_light.png" alt="" loading="lazy" decoding="async"></div>
          <div class="share__text"><h3>${L(entry.title)}</h3><p>${L(entry.lead)}</p>
            <div class="share__link"><bdi dir="ltr">${url}</bdi><button type="button" data-copy="https://${url}" data-copied="${t('نُسخ الرابط', 'Link copied')}">${t('انسخ الرابط', 'Copy link')}</button></div>
            <a class="link" href="${entry.path}">${t('افتح الصفحة', 'Open the page')}${arrow}</a></div>
        </article>`; }).join('')}</div></section>

      ${seam('dots')}
      <section class="co-section">${h2(title(0))}
        <div class="co-cells co-cells--2">${items(0).map((item, i) => `<article class="aff-who">${iso(['people', 'chat'][i])}<h3>${L(item.title)}</h3><p>${L(item.body)}</p></article>`).join('')}</div></section>

      ${seam('cross')}
      <section class="co-section">${h2(t('قبل أن توصي بمُعين', 'Before you recommend Moeen'), t('راجع ما يعمل اليوم وما سيأتي.', 'Check what works today and what’s coming.'))}
        <div class="co-cells co-cells--3">${reads.map(([id, body]) => `<a class="co-link" href="${sitePages[id].path}"><h3>${L(sitePages[id].label)}</h3><p>${body}</p>${arrow}</a>`).join('')}</div></section>

      ${seam('dash')}
      <section class="split-faq">${h2(title(1))}${items(1).map((q) => `<div><h3>${L(q.title)}</h3><p>${L(q.body)}</p></div>`).join('')}</section>
    </div>`;
  },

  // ---- Support: a help palette, then the team's address -----------------------------------------------
  support(locale, { questions }) {
    const { t, L, h1, h2, items } = kit('support', locale);
    const from = (page, index) => pageStories[page].blocks[index].items;
    const groups = [
      [t('البدء', 'Getting started'), 'key', items(0)],
      [t('الوصول والصلاحيات', 'Access and permissions'), 'lock', items(1)],
      [t('المهام', 'Tasks'), 'task', from('tasks', 2)],
      [t('الاجتماعات', 'Meetings'), 'video', from('meetings', 2)],
      ['AI', 'spark', from('ai_moeen', 2)],
      [t('الاشتراك', 'Billing'), 'file', questions],
    ];
    let n = 0;
    const topics = groups.map(([name, icon, list]) => [name, list.map((item) => ({ ...item, icon, id: n++ }))]);
    const all = topics.flatMap(([, list]) => list);
    const subjects = [t('سؤال عن الحساب', 'An account question'), t('مشكلة تقنية', 'A technical problem'), t('اقتراح للفريق', 'A suggestion for the team')];
    return `<div class="fp fp--help">
      <header class="fp-hero fp-hero--center">${h1}</header>
      <section class="help" data-help aria-label="${t('مواضيع الدعم', 'Help topics')}">
        <div class="help__window">
          <label class="help__search">${ic('search')}<input type="search" data-help-search autocomplete="off" aria-label="${t('ابحث في مواضيع الدعم', 'Search help topics')}" placeholder="${t('ابحث في مواضيع الدعم', 'Search help topics')}"></label>
          <div class="help__body">
            <div class="help__list">${topics.map(([name, list]) => `<div data-help-group><p>${name}</p>${list.map((item) => `<button type="button" data-help-topic="${item.id}" aria-pressed="${item.id === 0}">${ic(item.icon)}<span>${L(item.title)}</span></button>`).join('')}</div>`).join('')}
              <p class="help__empty" data-help-empty role="status" hidden>${t('لا توجد مواضيع مطابقة.', 'No matching topics.')}</p></div>
            <div class="help__pane" aria-live="polite">${all.map((item) => `<article data-help-answer="${item.id}"${item.id ? ' hidden' : ''}><span class="help__icon">${ic(item.icon)}</span><h3>${L(item.title)}</h3><p>${L(item.body)}</p>${item.href ? `<a class="btn btn--ghost" href="${item.href}">${t('افتح الصفحة', 'Open the page')}${arrow}</a>` : ''}</article>`).join('')}</div>
          </div>
        </div>
      </section>

      ${seam('hatch')}
      <section class="mailto"><div class="mailto__copy">${h2(t('راسل فريق مُعين', 'Write to the Moeen team'), t('إن لم تجد جوابك هنا.', 'If your answer isn’t here.'))}
          <p class="mailto__subjects">${subjects.map((name) => `<a href="mailto:${EMAIL}?subject=${encodeURIComponent(name)}">${name}</a>`).join('')}</p></div>
        <div class="mailto__card"><span class="mailto__stamp" aria-hidden="true">${mark()}</span><small>${t('إلى', 'To')}</small><a href="mailto:${EMAIL}" dir="ltr">${EMAIL}</a><i aria-hidden="true"></i><i aria-hidden="true"></i>
          <div><button type="button" class="btn btn--solid" data-copy="${EMAIL}" data-copied="${t('نُسخ العنوان', 'Address copied')}">${t('انسخ العنوان', 'Copy the address')}</button><a class="btn btn--ghost" href="mailto:${EMAIL}">${t('اكتب رسالة', 'Write an email')}</a></div></div>
      </section>
    </div>`;
  },

  // ---- Join us: the open-roles board, then what the team is building ----------------------------------
  join(locale, { feed }) {
    const { t, L, h1, h2, items, title } = kit('join', locale);
    const notice = items(1)[0];
    const columns = [t('الدور', 'Role'), t('الفريق', 'Team'), t('مكان العمل', 'Location'), t('الحالة', 'Status')];
    const widths = [[62, 44, 38, 50], [48, 56, 46, 50], [70, 36, 40, 50], [54, 48, 34, 50], [60, 40, 44, 50]];
    const next = (feed?.items ?? []).filter((item) => item.status === 'in_progress' || item.status === 'planned').slice(0, 4);
    const stage = { in_progress: ['status-progress', t('نعمل عليها الآن', 'In progress')], planned: ['status-todo', t('التالي', 'Planned')] };
    const capture = (name, key, cls) => `<img class="${cls}" data-shot="${name}"${key ? ` data-locale="${key}"` : ''} src="/assets/shots2/${name}_${key ?? locale}_light.png" alt="" loading="lazy" decoding="async">`;
    const vision = [
      ['globe', t('تجربة متقنة في تفاصيلها', 'Polish you notice every day'), t('نعتني بسرعة الاستجابة ووضوح الواجهة، ليبقى التركيز على العمل حتى في أكثر الأيام ازدحاماً.', 'We make the interface responsive and clear so your team can stay focused on the work, even on busy days.')],
      ['rings', t('إصدارات بلا أخطاء', 'A goal of zero bugs'), t('هدفنا أن يصلك كل إصدار خالياً من الأخطاء. لذلك نختبر المسارات التي يعتمد عليها فريقك ونعطي الأولوية لإصلاح الأعطال.', 'We aim for every release to reach you bug-free. We test the workflows teams depend on and prioritize fixing defects.')],
      ['chart', t('جديد كل أسبوع', 'Something new each week'), t('نسعى إلى إصدار تحديث كل أسبوع، وإضافة مزايا ووحدات جديدة حين تكتمل.', 'We aim to ship updates weekly, introducing features and modules when they’re ready.')],
      ['log', t('وحدات يعتمد عليها فريقك', 'Modules your team can rely on'), t('نبني كل وحدة لتتابع بها عملك من بدايته إلى نهايته، مع ما تحتاج إليه من تفاصيل في الاستخدام اليومي.', 'We aim for each module to carry a workflow from start to finish, with the depth teams need for everyday work.')],
    ];
    return `<div class="fp fp--join">
      <header class="fp-hero fp-hero--center">${h1}</header>
      <section class="roles" aria-labelledby="roles-title">
        <div class="roles__table" aria-hidden="true"><div class="roles__head">${columns.map((name) => `<span>${name}</span>`).join('')}</div>
          ${widths.map((row) => `<div class="roles__row">${row.map((w) => `<span><i style="inline-size:${w}%"></i></span>`).join('')}</div>`).join('')}</div>
        <div class="roles__empty"><h2 id="roles-title">${title(1)}</h2><h3>${t('لا توجد وظائف حالياً.', 'No jobs yet.')} ${L(notice.title)}</h3><p>${L(notice.body)}</p><a class="btn btn--ghost" href="/company/about/">${t('تعرّف على مُعين', 'Get to know Moeen')}${arrow}</a></div>
      </section>

      ${seam('dots')}
      <section class="co-section">${h2(title(0), t('واجهة بلغتين، ووكلاء تراجع عملهم.', 'One interface in two languages, and agents you can review.'))}
        <div class="build">
          <article class="build__tile"><header><h3>${L(items(0)[0].title)}</h3><p>${L(items(0)[0].body)}</p></header><div class="build__art build__art--pair">${capture('app', locale === 'ar' ? 'en' : 'ar', 'is-back')}${capture('app', locale, 'is-front')}</div></article>
          <article class="build__tile"><header><h3>${L(items(0)[1].title)}</h3><p>${L(items(0)[1].body)}</p></header><div class="build__art build__art--log">${capture('audit', null, 'is-log')}</div></article>
          ${next.length ? `<ul class="build__next">${next.map((item) => `<li data-tone="${item.status}"><small><svg class="i" aria-hidden="true"><use href="#i-${stage[item.status][0]}"/></svg>${stage[item.status][1]}</small><h3>${L(item.title)}</h3><p>${L(item.summary)}</p></li>`).join('')}</ul>` : ''}
        </div></section>

      <section class="vision"><div class="vision__head">${h2(t('رؤيتنا لمُعين', 'Our vision for Moeen'), t('ما نسعى إليه في كل إصدار.', 'What we aim for in each release.'))}</div>
        <ol>${vision.map(([art, name, body], i) => `<li><span dir="ltr">0${i + 1}</span><img src="/assets/principles/${art}.svg" alt="" width="360" height="240" loading="lazy"><h3>${name}</h3><p>${body}</p></li>`).join('')}</ol></section>
    </div>`;
  },
};

// ---- About: a letter standing in the meadow, then the record of what shipped ------------------------
pages.about = (locale, { feed }) => {
  const { t, L, h2 } = kit('about', locale);
  const entry = infoPages.about;
  const parts = [
    [t('المشكلة في أدوات العمل اليوم', 'The problem with work tools today'), t('كثير من العمل يبدأ برسالة أو اجتماع، ثم يتفرّق. القرار في محادثة، والملف في مجلد، والمهمة في أداة أخرى. ومن سينفّذ العمل يبحث عمّا اتفق عليه الفريق قبل أن يبدأ. ثم دخل الذكاء الاصطناعي من خارج ذلك كله: يجيب عن الأسئلة، لكنه لا يعرف ما يجري في الفريق، ولا يرى الفريق ما يفعله.', 'A lot of work starts in a message or a meeting, then scatters. The decision sits in a chat, the file in a folder, the task in another tool. Whoever does the work has to find out what was agreed before they can begin. Then AI arrived from outside all of it: it answers questions, yet it doesn’t know what is happening in the team, and the team can’t see what it does.')],
    [t('ما نبنيه', 'What we’re building'), t('مُعين مساحة عمل يتشاركها الناس ووكلاء الذكاء الاصطناعي. تجتمع فيها المهام والمحادثات والاجتماعات والبريد والملفات، ويعمل الجميع على السجلات نفسها. ما تنجزه من الواجهة يمكنك أن تفوّضه إلى وكيل ضمن صلاحياتك، وما يحتاج إلى قرار ينتظر موافقة إنسان، ويبقى أثره في سجل التدقيق.', 'Moeen is a workspace shared by people and AI agents. Tasks, chat, meetings, mail and files live together, and everyone works on the same records. What you do from the interface, you can delegate to an agent within your permissions. What needs a decision waits for a person, and its trace stays in the audit log.')],
    [t('لماذا نبدأ بالعربية', 'Why we start with Arabic'), t('لأن الفريق الذي يعمل بالعربية يستحق أداة صُمّمت بلغته من البداية. نكتب كل شاشة بالعربية أولاً، ونبنيها من اليمين، ثم نتيحها بالإنجليزية لمن أرادها. ويعمل الفريق بلغتيه على المهام والمحادثات نفسها.', 'Because a team that works in Arabic deserves a tool designed in its language from the start. We write every screen in Arabic first and build it from the right, then offer it in English to anyone who prefers it. Both languages work on the same tasks and conversations.')],
  ];
  const record = feed?.commits ? contributionCalendar(feed, locale) : '';
  return `<div class="fp fp--about">
    <section class="letter"><img class="letter__bg" src="/assets/hero/meadow.webp" alt="" width="1536" height="1024"><div class="letter__fade" aria-hidden="true"></div>
      <header><span class="eyebrow">${L(entry.label)}</span><h1><span>${L(entry.title)}</span></h1></header>
      <article class="letter__paper">${parts.map(([name, body], i) => `<section><h2 data-plain><span dir="ltr">0${i + 1}</span>${name}</h2><p>${body}</p></section>`).join('')}
        <footer><span class="letter__sign" aria-hidden="true" lang="ar" dir="rtl">مُعين</span><b>${t('فريق مُعين', 'The Moeen team')}</b><small dir="ltr">moeen.dev</small></footer></article></section>
    ${record ? `${seam('hatch')}${record}` : ''}
  </div>`;
};

export function companyPage(page, locale, context) {
  return pages[page](locale, context);
}

// ---- Pricing --------------------------------------------------------------------------------------

const MAX_TOOL_PRICE = 50_000;
const money = (cents) => `<bdi dir="ltr" data-usd-cents="${cents}">${formatPrice(cents, DEFAULT_CURRENCY)}</bdi>`;
const SEATS = { ar: { one: 'مقعد واحد', two: 'مقعدان', few: 'مقاعد', many: 'مقعداً', other: 'مقعد' }, en: { one: 'seat', other: 'seats' } };
function seatCount(count, locale) {
  const form = new Intl.PluralRules(locale).select(count), word = SEATS[locale][form] ?? SEATS[locale].other;
  return locale === 'ar' && (form === 'one' || form === 'two') ? word : `${count} ${word}`;
}

// Paid per-seat rates with annual billing, in USD cents. Visitors can edit every rate.
const TOOL_CATEGORIES = {
  chat: ['المحادثات', 'Chat'],
  tasks: ['المهام', 'Tasks'],
  docs: ['الملفات والمستندات', 'Files and documents'],
  meetings: ['المكالمات والاجتماعات', 'Calls and meetings'],
  mail: ['البريد والتقويم', 'Email and calendar'],
  ai: ['الذكاء الاصطناعي', 'AI'],
};
const TOOLS = [
  { id: 'slack', name: 'Slack', category: 'chat', cents: 725, selected: true },
  { id: 'jira', name: 'Jira', category: 'tasks', cents: 791, selected: true },
  { id: 'asana', name: 'Asana Starter', category: 'tasks', cents: 1099 },
  { id: 'trello', name: 'Trello Standard', category: 'tasks', cents: 500 },
  { id: 'linear', name: 'Linear Basic', category: 'tasks', cents: 1000 },
  { id: 'notion', name: 'Notion', category: 'docs', cents: 1000, selected: true },
  { id: 'google_workspace', name: 'Google Workspace Starter', category: 'mail', cents: 700, logo: 'gmail' },
  { id: 'zoom', name: 'Zoom', category: 'meetings', cents: 1333 },
  { id: 'chatgpt', name: 'ChatGPT Business', category: 'ai', cents: 2000, selected: true },
  { id: 'claude', name: 'Claude Team', category: 'ai', cents: 2000 },
];
const AI_TOOLS = new Set(TOOLS.filter(tool => tool.category === 'ai').map(tool => tool.id));

/** Yearly totals in cents. AI needs Pro; more than three seats need Plus; otherwise Free is enough. */
function savings(tools, seats, rates) {
  const now = tools.reduce((sum, [, cents]) => sum + cents, 0) * seats * 12;
  const plan = tools.some(([id]) => AI_TOOLS.has(id)) ? 'pro' : seats > 3 ? 'plus' : 'free';
  const moeen = rates[plan] * seats * 12;
  return { now, plan, moeen, save: Math.max(0, now - moeen), share: now ? Math.min(100, Math.round((moeen / now) * 100)) : 0 };
}

export function pricingPage(locale, { plans, lifetimePrice, questions, text, title, lead, label }) {
  const t = (ar, en) => (locale === 'ar' ? ar : en);
  const L = (pair) => pair[locale];
  const cta = `<a class="btn pr-btn" href="/waitlist/">${text.waitlist}</a>`;
  const about = {
    free: t('لفريق صغير يبدأ العمل على مُعين.', 'For a small team getting started.'),
    plus: t('لفريق يحتاج إلى أكثر من ثلاثة مقاعد.', 'For a team that needs more than three seats.'),
    pro: t('لفريق يفوّض عملاً إلى AI.', 'For a team that delegates work to AI.'),
  };
  const base = [t('الفرق والمهام', 'Teams and tasks'), t('المحادثات والاجتماعات', 'Chat and meetings'), t('الملفات والبريد', 'Files and email'), t('التكاملات', 'Integrations')];
  const privateSupport = t('دعم في مجموعة خاصة 7 أيام في الأسبوع', 'Private group support 7 days a week');
  const featureRequest = t('اطلب أي ميزة تحتاجها', 'Request any feature you’d like');
  const featureRequestLink = `<a href="mailto:${EMAIL}?subject=${encodeURIComponent(t('اقتراح ميزة لمُعين', 'Moeen feature request'))}">${featureRequest}</a>`;
  const supportChannels = `<span class="pr-plan__channels">
    <img src="/assets/logos/whatsapp.svg" alt="WhatsApp" width="16" height="16">
    <img src="/assets/logos/slack.svg" alt="Slack" width="16" height="16">
    ${mark(text.brand)}
  </span>`;
  const modules = `<div class="pr-plan__modules"><h3 data-plain>${t('الوحدات القادمة', 'Upcoming modules')}</h3>
    <ul class="upcoming-list">${upcomingModules.map(name => `<li><span>${L(name)}</span><small>${t('قريبًا', 'Soon')}</small></li>`).join('')}</ul></div>`;
  const includes = {
    free: [null, [text.freeSeats(3), ...base]],
    plus: [t('كل ما في المجانية، ويضاف إليه:', 'Everything in Free, plus:'), [text.paidSeats, `${privateSupport}${supportChannels}`]],
    pro: [t('كل ما في بلس، ويضاف إليه:', 'Everything in Plus, plus:'), ['AI', text.knowledge, featureRequestLink]],
  };
  const save = (plan) => Math.round((1 - plan.annual / plan.monthly) * 100);
  const yes = `<span class="pr-yes">${check}</span><span class="page-sr">${t('مشمول', 'Included')}</span>`;
  const no = `<span class="pr-no" aria-hidden="true"></span><span class="page-sr">${t('غير مشمول', 'Not included')}</span>`;
  const every = plans.map(() => yes), pro = plans.map((plan) => (plan.id === 'pro' ? yes : no));
  const table = [
    [t('الفريق', 'Team'), [[t('المقاعد', 'Seats'), plans.map((plan) => (plan.seats ? text.freeSeats(plan.seats) : text.paidSeats))], [t('الفرق', 'Teams'), every]]],
    [t('العمل', 'Work'), [[t('المهام', 'Tasks'), every], [t('المحادثات', 'Chat'), every], [t('الاجتماعات', 'Meetings'), every], [t('البريد', 'Email'), every], [t('الملفات', 'Files'), every], [t('التكاملات', 'Integrations'), every]]],
    [t('الذكاء الاصطناعي', 'AI'), [['AI', pro], [text.knowledge, pro]]],
    [t('الدعم', 'Support'), [[privateSupport, plans.map(plan => plan.id === 'free' ? no : yes)], [featureRequest, pro]]],
  ];
  const paid = plans.filter((plan) => plan.monthly);
  const start = savings(TOOLS.filter(tool => tool.selected).map(({ id, cents }) => [id, cents]), 10, Object.fromEntries(plans.map((plan) => [plan.id, plan.annual])));
  return `<div class="fp fp--pricing">
    <header class="fp-hero fp-hero--center"><span class="eyebrow">${label}</span><h1><span>${title}.</span> <span class="dim">${lead}</span></h1>
      <div class="pr-controls">
        <fieldset class="pr-cadence" data-plan-cadence><legend class="page-sr">${text.cadence}</legend>
          ${['annual', 'monthly'].map((id) => `<label><input type="radio" name="cadence" value="${id}"${id === 'annual' ? ' checked' : ''}><span>${text[id]}${id === 'annual' ? `<em>${t('وفّر حتى', 'Save up to')} <bdi dir="ltr">${Math.max(...paid.map(save))}%</bdi></em>` : ''}</span></label>`).join('')}
        </fieldset>
        <label class="pr-currency">
          <span class="page-sr">${t('العملة', 'Currency')}</span>
          <select data-pricing-currency>${Object.entries(CURRENCY_OPTIONS).map(([id, option]) => `<option value="${id}">${option.label}</option>`).join('')}</select>
          <svg class="i i--xs" aria-hidden="true"><use href="#i-chev"/></svg>
        </label>
      </div>
    </header>
    <section class="pr-plans" aria-label="${t('الخطط', 'Plans')}">${plans.map((plan) => { const [intro, list] = includes[plan.id]; return `<article class="pr-plan pr-plan--${plan.id}">
      <img class="pr-plan__art" alt="" width="96" height="76" src="/assets/iso/light/plan_${plan.id}.svg" data-light="/assets/iso/light/plan_${plan.id}.svg" data-dark="/assets/iso/dark/plan_${plan.id}.svg">
      <header><h2 data-plain>${L(plan.title)}</h2>${plan.id === 'pro' ? '<span class="tile__tag" dir="ltr">AI</span>' : ''}</header>
      <p class="pr-plan__for">${about[plan.id]}</p>
      <div class="pr-plan__cost">${['annual', 'monthly'].map((id) => `<div data-rate="${id}"${id === 'monthly' ? ' hidden' : ''}><p><strong>${money(plan[id])}</strong><span>${plan.monthly ? text.perSeat : ''}</span></p><small>${plan.monthly ? (id === 'annual' ? text.annualNote(money(plan.annual * 12)) : text.monthlyNote) : text.freeNote}</small></div>`).join('')}</div>
      ${cta}
      <div class="pr-plan__list">${intro ? `<p>${intro}</p>` : ''}<ul>${list.map((item) => `<li>${check}<span>${item}</span></li>`).join('')}</ul></div>
      ${plan.monthly ? modules : ''}
    </article>`; }).join('')}
      <article class="pr-plan pr-plan--lifetime">
        <header>
          <h2 data-plain>${t('مدى الحياة', 'Lifetime')}</h2>
          <p class="pr-plan__for">${t('تحديثات ودعم مدى الحياة.', 'Lifetime updates and support.')}</p>
        </header>
        <div class="pr-plan__cost"><p><strong>${money(lifetimePrice)}</strong><span>${t('دفعة واحدة', 'one-time payment')}</span></p></div>
        <a class="btn pr-btn" href="mailto:${EMAIL}?subject=${encodeURIComponent(t('خطة مُعين مدى الحياة', 'Moeen Lifetime plan'))}">${t('استفسر عن الخطة', 'Ask about Lifetime')}</a>
      </article>
    </section>
    <p class="pr-terms">${text.priceTerms}</p>

    ${seam('hatch')}
    <section class="calc" data-calc data-currency="${DEFAULT_CURRENCY}" data-plans="${plans.map((plan) => `${plan.id}:${plan.annual}`).join(',')}">
      <div class="calc__tools"><h2><span>${t('احسب ما توفّره مع مُعين.', 'See what you save with Moeen.')}</span> <span class="dim">${t('ضع علامة على ما تدفعه اليوم.', 'Tick what you pay for today.')}</span></h2>
        <ul>${TOOLS.map(({ id, name, category, cents, selected, logo = id }) => `<li><label><input type="checkbox" data-calc-tool="${id}"${selected ? ' checked' : ''}><img src="/assets/logos/${logo}.svg" alt="" width="18" height="18"${id === 'chatgpt' ? ' data-mono="chatgpt"' : ''}><span><b><bdi>${name}</bdi></b><small>${t(...TOOL_CATEGORIES[category])}</small></span></label><span class="calc__price" dir="ltr"><span data-calc-unit>$</span><input type="number" inputmode="numeric" min="0" max="${wholePrice(MAX_TOOL_PRICE, DEFAULT_CURRENCY)}" step="1" value="${wholePrice(cents, DEFAULT_CURRENCY)}" data-calc-price="${id}" data-calc-cents="${cents}" aria-label="${t(`سعر المقعد شهريًا في ${name}`, `${name} price per seat per month`)}" aria-describedby="calc-currency"></span></li>`).join('')}</ul>
        <p>${t('أسعار إرشادية لكل مقعد شهرياً مع الفوترة السنوية، راجعناها في نوفمبر 2026. عدّلها إلى ما تدفعه فعلاً، فالخطط تختلف في ميزاتها ولا يغطي مُعين كل ميزة في كل أداة.', 'Guide prices per seat per month, billed yearly, checked in November 2026. Change them to what you actually pay: plans differ, and Moeen doesn’t cover every feature of every tool.')}</p></div>
      <span id="calc-currency" class="page-sr">${DEFAULT_CURRENCY}</span>
      <div class="calc__result" aria-live="polite">
        <label class="calc__seats"><span>${t('عدد المقاعد', 'Seats')}</span><output data-calc-seats>${seatCount(10, locale)}</output><input type="range" min="1" max="100" value="10" data-calc-range aria-label="${t('عدد المقاعد', 'Seats')}"></label>
        <p class="calc__save"><small>${t('توفّر تقديراً في السنة', 'Estimated savings a year')}</small><strong data-calc-save dir="ltr">${formatPrice(start.save, DEFAULT_CURRENCY)}</strong></p>
        <div class="calc__bars"><div><p><span>${t('اشتراكاتك اليوم', 'Your subscriptions today')}</span><b data-calc-now dir="ltr">${formatPrice(start.now, DEFAULT_CURRENCY)}</b></p><i class="is-now" data-calc-bar-now></i></div>
          <div><p><span>${t('مُعين', 'Moeen')} <em data-calc-plan>${L(plans.find((plan) => plan.id === start.plan).title)}</em></span><b data-calc-moeen dir="ltr">${formatPrice(start.moeen, DEFAULT_CURRENCY)}</b></p><i class="is-moeen" data-calc-bar style="inline-size:${start.share}%"></i></div></div>
        <p class="calc__none" data-calc-none hidden>${t('بهذه الأرقام لا يظهر توفير. أضف أداة أو غيّر السعر.', 'These numbers show no saving. Add a tool or change a price.')}</p>
      </div>
    </section>

    ${seam('dots')}
    <section class="pr-table"><table><caption><span>${t('قارن الخطط حسب المقعد.', 'Compare seat-based plans.')}</span></caption>
      <thead><tr><td></td>${plans.map((plan) => `<th scope="col"><b>${L(plan.title)}</b>${['annual', 'monthly'].map((id) => `<small data-rate="${id}"${id === 'monthly' ? ' hidden' : ''}>${money(plan[id])}${plan.monthly ? ` ${text.perSeat}` : ''}</small>`).join('')}</th>`).join('')}</tr></thead>
      ${table.map(([name, rows]) => `<tbody><tr><th colspan="4" scope="rowgroup">${name}</th></tr>${rows.map(([row, cells]) => `<tr><th scope="row">${row}</th>${cells.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>`).join('')}
    </table></section>

    ${seam('cross')}
    <section class="split-faq pr-faq"><h2><span>${L(questions.title)}.</span></h2>${questions.items.map((q) => `<div><h3>${L(q.title)}</h3><p>${L(q.body)}</p></div>`).join('')}</section>
  </div>`;
}

// ---- Interactions ------------------------------------------------------------------------------------

async function copyText(button, value) {
  try { await navigator.clipboard.writeText(value); } catch { return; }
  button.dataset.label ??= button.textContent;
  button.textContent = button.dataset.copied;
  clearTimeout(Number(button.dataset.timer));
  button.dataset.timer = String(setTimeout(() => { button.textContent = button.dataset.label; }, 1800));
}

const fold = (value) => value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[أإآ]/g, 'ا').toLocaleLowerCase();

function showTopic(help, id) {
  help.querySelectorAll('[data-help-topic]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.helpTopic === id)));
  help.querySelectorAll('[data-help-answer]').forEach((a) => { a.hidden = a.dataset.helpAnswer !== id; });
}

function updateSavings(calc) {
  const seats = Number(calc.querySelector('[data-calc-range]').value);
  const tools = [...calc.querySelectorAll('[data-calc-tool]:checked')].map((box) => {
    const id = box.dataset.calcTool;
    const input = calc.querySelector(`[data-calc-price="${id}"]`);
    return [id, Number(input.dataset.calcCents)];
  });
  const rates = Object.fromEntries(calc.dataset.plans.split(',').map((plan) => plan.split(':')).map(([id, rate]) => [id, Number(rate)]));
  const result = savings(tools, seats, rates);
  const { currency } = calc.dataset;
  calc.querySelector('[data-calc-range]').style.setProperty('--at', `${((seats - 1) / 99) * 100}%`);
  calc.querySelector('[data-calc-seats]').textContent = seatCount(seats, document.documentElement.lang);
  calc.querySelector('[data-calc-now]').textContent = formatPrice(result.now, currency);
  calc.querySelector('[data-calc-moeen]').textContent = formatPrice(result.moeen, currency);
  calc.querySelector('[data-calc-save]').textContent = formatPrice(result.save, currency);
  calc.querySelector('[data-calc-bar]').style.inlineSize = `${result.share}%`;
  calc.querySelector('[data-calc-bar-now]').style.inlineSize = result.now ? '100%' : '0';
  calc.querySelector('[data-calc-none]').hidden = result.save > 0;
  calc.querySelector('[data-calc-plan]').textContent = document.querySelector(`.pr-plan--${result.plan} h2`).textContent;
}

export function applyPricingCurrency(content, currency) {
  content.querySelector('[data-pricing-currency]').value = currency;
  for (const amount of content.querySelectorAll('[data-usd-cents]')) {
    amount.textContent = formatPrice(Number(amount.dataset.usdCents), currency);
  }
  const calc = content.querySelector('[data-calc]');
  calc.dataset.currency = currency;
  calc.querySelector('#calc-currency').textContent = currency;
  for (const unit of calc.querySelectorAll('[data-calc-unit]')) {
    unit.textContent = CURRENCY_OPTIONS[currency].unit;
  }
  for (const input of calc.querySelectorAll('[data-calc-price]')) {
    input.max = wholePrice(MAX_TOOL_PRICE, currency);
    input.value = wholePrice(Number(input.dataset.calcCents), currency);
  }
  updateSavings(calc);
}

function updateEditedPrice(input, currency) {
  const amount = Math.min(Number(input.max), Math.max(0, Math.round(input.valueAsNumber || 0)));
  input.dataset.calcCents = amount * 100 / CURRENCY_OPTIONS[currency].rate;
  return amount;
}

/** Delegated on the content element, so they survive the re-render after a language change. */
export function initCompanyPage(content) {
  content.addEventListener('click', (event) => {
    const { target } = event;
    const pick = target.closest('[data-share-pick]');
    if (pick) {
      const share = pick.closest('[data-share]');
      share.querySelectorAll('[data-share-pick]').forEach((b) => b.setAttribute('aria-pressed', String(b === pick)));
      share.querySelectorAll('[data-share-card]').forEach((card) => { card.hidden = card.dataset.shareCard !== pick.dataset.sharePick; });
      return;
    }
    const copy = target.closest('[data-copy]');
    if (copy) { void copyText(copy, copy.dataset.copy); return; }
    const topic = target.closest('[data-help-topic]');
    if (topic) { showTopic(topic.closest('[data-help]'), topic.dataset.helpTopic); return; }
  });

  content.addEventListener('input', (event) => {
    const { target } = event;
    if (target.matches('[data-help-search]')) {
      const help = target.closest('[data-help]'), query = fold(target.value.trim());
      const topics = [...help.querySelectorAll('[data-help-topic]')];
      for (const topic of topics) {
        const answer = help.querySelector(`[data-help-answer="${topic.dataset.helpTopic}"]`);
        topic.hidden = !fold(`${topic.textContent} ${answer.textContent}`).includes(query);
      }
      help.querySelectorAll('[data-help-group]').forEach((group) => { group.hidden = ![...group.querySelectorAll('[data-help-topic]')].some((topic) => !topic.hidden); });
      const first = topics.find((topic) => !topic.hidden);
      help.querySelector('[data-help-empty]').hidden = Boolean(first);
      if (first) showTopic(help, first.dataset.helpTopic);
      return;
    }
    const calc = target.closest('[data-calc]');
    if (!calc) return;
    if (target.matches('[data-calc-price]')) updateEditedPrice(target, calc.dataset.currency);
    updateSavings(calc);
  });

  content.addEventListener('change', (event) => {
    const input = event.target;
    if (!input.matches('[data-calc-price]')) return;
    input.value = updateEditedPrice(input, input.closest('[data-calc]').dataset.currency);
  });

  // Arrow keys walk the help topics from the search field.
  content.addEventListener('keydown', (event) => {
    if (!event.target.matches('[data-help-search]') || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const help = event.target.closest('[data-help]');
    const visible = [...help.querySelectorAll('[data-help-topic]')].filter((topic) => !topic.hidden);
    if (!visible.length) return;
    const at = visible.findIndex((topic) => topic.getAttribute('aria-pressed') === 'true');
    const next = visible[(at + (event.key === 'ArrowDown' ? 1 : -1) + visible.length) % visible.length];
    showTopic(help, next.dataset.helpTopic);
    next.scrollIntoView({ block: 'nearest' });
  });
}
