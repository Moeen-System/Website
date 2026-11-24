// The eleven product and AI pages. Each page has its own concept and signature piece, built
// from live HTML and the real product captures; the copy comes from site_content.js and
// page_story_content.js. Examples on these pages are illustrations: they never touch a workspace.
import { seam } from './frame.js';
import { infoPages } from './site_content.js';
import { pageStories } from './page_story_content.js';

export const featurePageIds = ['tasks', 'chat', 'teams', 'data', 'meetings', 'mail', 'ai_moeen', 'mcp', 'knowledge_base', 'skills', 'integrations'];

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const PATHS = {
  hash: 'M6 2.5 4.5 13.5M11.5 2.5 10 13.5M2.5 6h11M2 10h11',
  at: 'M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0 0v1.2a1.8 1.8 0 0 0 3.5.5A6 6 0 1 0 11 13.2',
  phone: 'M3 2.5h2.6l1.2 3-1.6 1a7.4 7.4 0 0 0 4.3 4.3l1-1.6 3 1.2v2.6a1 1 0 0 1-1 1A11 11 0 0 1 2 3.5a1 1 0 0 1 1-1Z',
  folder: 'M2 4.5a1 1 0 0 1 1-1h3.5l1.5 1.5H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z',
  file: 'M4 1.8h5.2L12.5 5v9.2H4ZM9 1.8V5h3.5',
  lock: 'M4 7h8v6.5H4ZM5.5 7V5a2.5 2.5 0 0 1 5 0v2',
  users: 'M6 7.5a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM1.8 13.5c.4-2.4 2-3.8 4.2-3.8s3.8 1.4 4.2 3.8M10.6 3a2.2 2.2 0 0 1 0 4.3M12.2 9.9c1 .5 1.7 1.7 2 3.6',
  clock: 'M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2Zm0 3v3.2l2.2 1.4',
  mail: 'M2 3.5h12v9H2ZM2.4 4l5.6 4.5L13.6 4',
  send: 'M2.2 7.6 13.8 2.4 9.6 13.8 7.7 8.4Z',
  pin: 'M9.8 2.2 13.8 6.2 11.6 7l-2.4 2.4.3 3-1.3 1.3-2.4-2.4L3 14l-1-1 2.7-2.8L2.3 7.8 3.6 6.5l3 .3L9 4.4Z',
  shield: 'M8 1.8 13 4v4c0 3-2.2 5-5 6.2C5.2 13 3 11 3 8V4Z',
  key: 'M10 2.2a3.8 3.8 0 1 1-2.6 6.6L3.2 13H2v-2.4l1.4-1.3h1.4V7.9h1.4l.6-.6A3.8 3.8 0 0 1 10 2.2Zm.8 2.4h.1',
  search: 'M7 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm3.3 7.8 3.4 3.4',
  spark: 'M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z',
  layers: 'M8 2.2 14 5.2 8 8.2 2 5.2ZM2 8l6 3 6-3M2 10.8l6 3 6-3',
  video: 'M2 4.5h8v7H2ZM10 7l4-2.2v6.4L10 9',
  task: 'M3 2.5h10v11H3ZM5.5 8.2l1.8 1.8 3.3-3.6',
  book: 'M2.5 3c2-.8 3.8-.8 5.5.5 1.7-1.3 3.5-1.3 5.5-.5v10c-2-.8-3.8-.8-5.5.5-1.7-1.3-3.5-1.3-5.5-.5ZM8 3.5v10',
  terminal: 'M2 3h12v10H2ZM4.5 6.5 6.5 8 4.5 9.5M8 10h3.5',
  check: 'm3.5 8.3 3 3 6-6.3',
  plus: 'M8 3v10M3 8h10',
  play: 'M5 3.5v9l7-4.5Z',
};
export const ic = (name, cls = 'fp-i') => `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true"><path d="${PATHS[name]}"/></svg>`;
const status = (name) => `<svg class="i i--sm fp-status fp-status--${name}" aria-hidden="true"><use href="#i-status-${name}"/></svg>`;
const arrow = '<svg class="i i--sm flip" aria-hidden="true"><use href="#i-arrow"/></svg>';
const avatar = (seed, size = '') => `<span class="fp-av fp-av--${seed}${size ? ` fp-av--${size}` : ''}" aria-hidden="true"></span>`;
const shot = (name, alt, cls = '', eager = false) => `<img class="fp-shot ${cls}" data-shot="${name}" src="/assets/shots2/${name}_ar_light.png" alt="${esc(alt)}" decoding="async"${eager ? '' : ' loading="lazy"'}>`;
// The home page headline: an ink sentence, then a grey one. swash.js closes the ink sentence.
const stop = (text) => (/[.؟?!]$/.test(text) ? text : `${text}.`);
const keepWhole = (text) => text.replaceAll('ai-moeen', 'ai\u2011moeen');
const logo = (name, size = 28) => `<img src="/assets/logos/${name}.svg" alt="" width="${size}" height="${size}" loading="lazy">`;

/** What ai-moeen answers once the owner or the date is crossed out of the request. */
const markupReply = (owner, due, t) => {
  if (owner && due) return t('أنشأتُ المهمة وأسندتُها إلى سارة، وموعدها الخميس.', 'I created the task and assigned it to Sara, due Thursday.');
  if (owner) return t('أنشأتُ المهمة وأسندتُها إلى سارة. لم تذكر موعداً، فتركتُها بلا موعد.', 'I created the task and assigned it to Sara. You gave no date, so I left it without one.');
  if (due) return t('أنشأتُ المهمة وموعدها الخميس. لم تذكر مسؤولاً، فتركتُها بلا مسؤول.', 'I created the task, due Thursday. You named no owner, so I left it unassigned.');
  return t('أنشأتُ المهمة. لم تذكر مسؤولاً ولا موعداً، فتركتُهما لك.', 'I created the task. You gave no owner or date, so I left both to you.');
};

export function kit(page, locale) {
  const t = (ar, en) => (locale === 'ar' ? ar : en);
  const L = (pair) => esc(pair?.[locale] ?? pair?.ar ?? '');
  const entry = infoPages[page], blocks = pageStories[page]?.blocks ?? [];
  const cta = `<a class="btn btn--solid btn--lg" href="/waitlist/"><span>${t('انضم إلى قائمة الانتظار', 'Join the waitlist')}</span><span class="btn__arrow" aria-hidden="true"><svg class="i i--xs flip"><use href="#i-arrow"/></svg></span></a>`;
  const heading = (tag, lead, rest) => {
    const ink = keepWhole(stop(lead));
    return `<${tag}><span>${ink}</span>${rest ? ` <span class="dim">${keepWhole(rest)}</span>` : ''}</${tag}>`;
  };
  const hero = (rest) => `<span class="eyebrow">${L(entry.label)}</span>${heading('h1', L(entry.title ?? entry.label), rest)}`;
  const h1 = hero(L(entry.lead));
  const h2 = (lead, rest) => heading('h2', lead, rest);
  const items = (i) => blocks[i]?.items ?? [];
  const title = (i) => L(blocks[i]?.title);
  return { t, L, blocks, cta, hero, h1, h2, items, title };
}

const pages = {
  // ---- Tasks: the board is the page ------------------------------------------------------------
  tasks(locale) {
    const { t, L, cta, h1, items, title, blocks, h2 } = kit('tasks', locale);
    const columns = [['backlog', t('قائمة الانتظار', 'Backlog')], ['todo', t('للتنفيذ', 'To do')], ['progress', t('قيد التنفيذ', 'In progress')], ['done', t('مكتملة', 'Done')]];
    const cards = {
      backlog: [[t('تحديث صفحة الأسعار', 'Update the pricing page'), 'MKT-20', 'b', t('التسويق', 'Marketing')]],
      todo: [[t('إعداد خطة الإطلاق التجريبي', 'Prepare the beta launch plan'), 'APP-144', 'c', t('إطلاق التطبيق', 'App launch')]],
      progress: [[t('إصلاح بطء قائمة الشحنات', 'Fix the slow shipments list'), 'APP-145', 'd', t('إطلاق التطبيق', 'App launch')]],
      done: [[t('إقفال حسابات أكتوبر', 'Close October books'), 'FIN-10', 'e', t('المالية', 'Finance')]],
    };
    const card = ([name, id, who, tag], extra = '') => `<article class="kb-card${extra}"><div class="kb-card__top"><span dir="ltr">${id}</span>${avatar(who, 'sm')}</div><h3>${name}</h3><span class="fp-tag">${tag}</span></article>`;
    const featured = `<article class="kb-card kb-card--live" data-kanban-card data-step="1"><div class="kb-card__top"><span dir="ltr">APP-148</span>${avatar('a', 'sm')}</div>
      <h3>${t('مراجعة نص زر التسجيل', 'Review the signup button copy')}</h3><span class="fp-tag fp-tag--blue">${t('الخميس', 'Thursday')}</span>
      <button type="button" class="kb-next" data-kanban-next>${t('انقلها إلى الحالة التالية', 'Move to the next status')}${arrow}</button></article>`;
    const notes = [
      [t('النتيجة المطلوبة', 'Outcome'), t('اكتب ما يجب أن يتحقّق كي تُعدّ المهمة مكتملة.', 'Say what has to be true for the task to count as done.')],
      [t('المسؤول', 'Owner'), t('شخص واحد يتولّى المهمة، ومن يراجع معه إن لزم.', 'One person owns the task, plus anyone reviewing with them.')],
      [t('الموعد', 'Due'), t('اربط الموعد بما يعتمد عليه، مثل دعوات التجربة.', 'Tie the date to what depends on it, such as the beta invites.')],
    ];
    const checklist = [t('الوصف يحدّد ما سنعدّه مكتملاً.', 'The description explains what counts as done.'), t('المرفق هو النسخة التي راجعها الفريق.', 'The attachment is the version the team reviewed.'), t('تعكس الحالة ما أُنجز بالفعل.', 'The status reflects the work actually completed.')];
    return `<div class="fp fp--tasks">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <section class="kanban" data-kanban aria-label="${t('لوحة مهام توضيحية', 'An illustrative task board')}">
        ${columns.map(([key, name], i) => `<div class="kb-col" data-col="${i}"><header>${status(key)}<b>${name}</b><span class="kb-count">${cards[key].length + (i === 1 ? 1 : 0)}</span></header>
          <div class="kb-stack">${i === 1 ? featured : ''}${cards[key].map((c) => card(c)).join('')}</div></div>`).join('')}
      </section>
      <p class="fp-note">${t('جرّب نقل المهمة: هكذا يرى الفريق تقدّم العمل على اللوحة.', 'Try moving the task: this is how the team sees work progress on the board.')}</p>

      ${seam('dots')}
      <section class="anatomy">
        <div class="anatomy__copy">${h2(t('ماذا يحتاج من سيتسلّم المهمة بعدك؟', 'What does the next owner need?'), t('سجّل العمل المطلوب بحيث يستطيع زميل لم يحضر النقاش أن يبدأ به.', 'Write the task so someone who missed the discussion can pick it up.'))}</div>
        <div class="anatomy__stage">
          <article class="anatomy__card">
            <header><span dir="ltr">APP-148</span>${status('progress')}<span>${t('قيد التنفيذ', 'In progress')}</span></header>
            <h3>${t('مراجعة نص زر التسجيل', 'Review the signup button copy')}</h3>
            <dl>
              <div data-pin="1"><dt>${t('النتيجة المطلوبة', 'Outcome')}</dt><dd>${t('راجع نص الزر في النسختين العربية والإنجليزية، وأرفق لقطة لكل نسخة.', 'Review the button in Arabic and English and attach a screenshot of each.')}</dd></div>
              <div data-pin="2"><dt>${t('المسؤول', 'Owner')}</dt><dd>${avatar('a', 'sm')}${t('ريم، وسارة تراجع الهاتف', 'Reem, with Sara on mobile')}</dd></div>
              <div data-pin="3"><dt>${t('الموعد', 'Due')}</dt><dd>${t('الخميس، قبل دعوات التجربة', 'Thursday, before beta invites')}</dd></div>
            </dl>
          </article>
          <ol class="anatomy__notes">${notes.map(([name, body], i) => `<li data-pin="${i + 1}"><b>${name}</b><p>${body}</p></li>`).join('')}</ol>
        </div>
      </section>

      ${seam('hatch')}
      <section class="views">
        <div class="views__head">${h2(title(1))}<p>${L(blocks[1]?.body)}</p></div>
        <div class="views__frame">${shot('showcase_board', t('لوحة المهام في مُعين موزّعة حسب حالة العمل', 'Moeen task board grouped by status'))}</div>
        <ul class="views__list">${items(0).map((item) => `<li><h3>${L(item.title)}</h3><p>${L(item.body)}</p></li>`).join('')}</ul>
      </section>

      ${seam('cross')}
      <section class="review" data-checklist>
        <div class="review__ring" style="--p:0"><span data-checklist-count>0/${checklist.length}</span></div>
        <div>${h2(t('راجع المهمة قبل تسليمها إلى زميلك', 'Review a task before handing it over'), t('إذا تغيّر المطلوب أو الموعد، حدّثه في المهمة حتى يراه من يتولّى العمل بعدك.', 'If the brief or deadline has changed, update the task so the next owner sees it.'))}
          <fieldset><legend class="page-sr">${t('قائمة مراجعة تجريبية', 'Sample review checklist')}</legend>${checklist.map((s) => `<label><input type="checkbox"><span>${s}</span></label>`).join('')}</fieldset></div>
      </section>

      ${seam('dash')}
      <section class="split-faq">${h2(title(2), t('مهامك، ومهام كل فريق.', 'Your tasks, and each team’s.'))}${items(2).map((q) => `<div><h3>${L(q.title)}</h3><p>${L(q.body)}</p></div>`).join('')}</section>
    </div>`;
  },

  // ---- Chat: the page reads as a channel -------------------------------------------------------
  chat(locale) {
    const { t, L, cta, h1, items, title, blocks, h2 } = kit('chat', locale);
    const thread = [
      ['a', t('ريم', 'Reem'), '09:12', t('لدينا نسختان من شاشة الترحيب. أيّهما نعتمد للتجربة؟', 'We have two versions of the welcome screen. Which one goes into the beta?')],
      ['b', t('سارة', 'Sara'), '09:17', t('لنعتمد النسخة الأقصر. وضعت ملف النصّين هنا لتبقى المقارنة متاحة.', 'Let’s use the shorter version. I’ve attached both drafts here so we can refer back.')],
      ['a', t('ريم', 'Reem'), '09:20', t('سأراجعها على الهاتف اليوم، ثم أضع لقطة النتيجة في المهمة.', 'I’ll check it on mobile today and put a screenshot on the task.')],
    ];
    const msg = ([who, name, time, text], i) => `<li class="ch-msg" style="--i:${i}">${avatar(who)}<div><p class="ch-msg__meta"><b>${name}</b><time dir="ltr">${time}</time></p><p>${text}</p></div></li>`;
    const kinds = [['hash', '#'], ['at', '@'], ['phone', '']];
    return `<div class="fp fp--chat">
      <header class="ch-hero">
        <div class="ch-hero__copy">${h1}${cta}</div>
        <div class="ch-window" aria-hidden="true">
          <header>${ic('hash')}<b>${t('المنتج', 'product')}</b><span>${t('6 أعضاء', '6 members')}</span></header>
          <ol>${thread.map(msg).join('')}
            <li class="ch-msg ch-msg--ai" style="--i:3"><span class="fp-av fp-av--ai"></span><div><p class="ch-msg__meta"><b>ai-moeen</b><time dir="ltr">09:21</time></p>
              <p>${t('أنشأت مهمة المراجعة وأسندتها إلى ريم.', 'I created the review task and assigned it to Reem.')}</p>
              <span class="ch-task">${status('todo')}<span dir="ltr">APP-148</span>${t('مراجعة شاشة الترحيب على الهاتف', 'Review the welcome screen on mobile')}</span></div></li>
          </ol>
          <div class="ch-composer">${t('اكتب رسالة إلى #المنتج', 'Message #product')}${ic('send')}</div>
        </div>
      </header>

      ${seam('dots')}
      <section class="ch-pin">
        <span class="ch-pin__badge">${ic('pin')}${t('رسالة مثبّتة', 'Pinned message')}</span>
        <blockquote>${t('اعتمدنا النص القصير. الملف في هذه الرسالة، وريم تتولّى المراجعة على الهاتف.', 'We agreed on the shorter copy. Both drafts are attached here, and Reem owns the mobile review.')}</blockquote>
        <p>${t('ثبّت رسالة تجمع القرار ومرجعه. يجد العضو الذي ينضم لاحقاً ما اتُّفق عليه دون قراءة النقاش كله.', 'Pin a message that holds the decision and its reference, so anyone joining later finds what was agreed without reading everything.')}</p>
      </section>

      ${seam('hatch')}
      <section class="ch-places">${h2(title(1), t('قناة للفريق، ورسالة لزميل، ومكالمة عند الحاجة.', 'A channel for the team, a message for a teammate, a call when you need one.'))}
        <ul>${items(1).map((item, i) => `<li><span class="ch-places__icon">${ic(kinds[i][0])}</span><div><h3>${L(item.title)}</h3><p>${L(item.body)}</p></div></li>`).join('')}</ul>
      </section>

      ${seam('cross')}
      <section class="fp-scene"><div>${h2(title(0))}<p>${L(blocks[0]?.body)}</p></div>${shot('mod_chat', t('نقاش في قناة وبجانبه المهمة الناتجة عنه', 'A channel discussion next to its follow-up task'))}</section>

      <a class="ch-cta" href="/waitlist/"><span>${t('اكتب أول رسالة لفريقك في مُعين', 'Write your team’s first message in Moeen')}</span><span class="ch-cta__send">${t('انضم إلى قائمة الانتظار', 'Join the waitlist')}${ic('send')}</span></a>
    </div>`;
  },

  // ---- Teams: an orbit around the team ---------------------------------------------------------
  teams(locale) {
    const { t, L, cta, h1, items, title, blocks, h2 } = kit('teams', locale);
    const satellites = [['hash', t('القناة', 'Channel'), '#المنتج'], ['task', t('المهام', 'Tasks'), t('6 مهام', '6 tasks')], ['folder', t('الملفات', 'Files'), t('12 ملفاً', '12 files')]];
    return `<div class="fp fp--teams">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <div class="orbit" aria-hidden="true">
        <div class="orbit__ring orbit__ring--a">${['a', 'b', 'c', 'd', 'e', 'f'].map((s, i) => `<span style="--n:${i}">${avatar(s)}</span>`).join('')}</div>
        <div class="orbit__ring orbit__ring--b"></div>
        <div class="orbit__core"><span class="orbit__badge">${ic('users')}</span><b>${t('فريق المنتج', 'Product team')}</b><small>${t('6 أعضاء', '6 members')}</small></div>
        ${satellites.map(([icon, name, meta], i) => `<span class="orbit__sat orbit__sat--${i}">${ic(icon)}<b>${name}</b><small>${meta}</small></span>`).join('')}
      </div>

      ${seam('dash')}
      <section class="charter">
        <div class="charter__copy">${h2(t('نبذة يبدأ منها كل فريق', 'A brief for every new team'), t('هذا مثال تكيّفه لعضو ينضم غداً.', 'An example to adapt for someone joining tomorrow.'))}</div>
        <article class="charter__card">
          <header><span class="orbit__badge">${ic('users')}</span><div><b>${t('فريق التسجيل', 'Signup team')}</b><small>${t('نبذة الفريق', 'Team brief')}</small></div></header>
          <dl><div><dt>${t('المهمة', 'Remit')}</dt><dd>${t('نتابع التجربة من فتح الدعوة إلى إنشاء أول مهمة.', 'We own the experience from opening an invite to creating a first task.')}</dd></div>
          <div><dt>${t('ما نراجعه', 'What we review')}</dt><dd>${t('صعوبات البدء كل خميس، ونختار ما سنعالجه في الأسبوع التالي.', 'Onboarding friction every Thursday, then we choose what to fix next week.')}</dd></div></dl>
          <footer>${['a', 'b', 'c'].map((s) => avatar(s, 'sm')).join('')}<span>${t('3 أعضاء', '3 members')}</span></footer>
        </article>
      </section>

      ${seam('dots')}
      <section class="track">${h2(title(0), t('النبذة، ثم الأعضاء والقناة، ثم المهام والملفات.', 'The brief, then members and a channel, then tasks and files.'))}<ol>${items(0).map((item, i) => `<li><span class="track__n">${i + 1}</span><h3>${L(item.title)}</h3><p>${L(item.body)}</p></li>`).join('')}</ol></section>

      ${seam('hatch')}
      <section class="fork">${h2(t('ماذا يحدث عند انضمام عضو إلى الفريق؟', 'What happens when someone joins?'), t('يعتمد ذلك على طريقة ربط القناة.', 'It depends on how the channel was linked.'))}
        <span class="fork__who">${avatar('f', 'sm')}${t('عضو جديد في الفريق', 'A new team member')}</span>
        <div class="fork__paths">
          <div><span class="fork__label">${ic('plus')}${t('قناة أنشأتها للفريق', 'Channel created for the team')}</span><p>${t('تتبع القناة عضوية الفريق. عندما تضمّ زميلاً إلى الفريق، يصبح عضواً في قناته.', 'The channel follows team membership. Adding someone to the team adds them to its channel.')}</p></div>
          <div><span class="fork__label">${ic('hash')}${t('قناة قائمة اخترت ربطها', 'Existing channel linked later')}</span><p>${t('تحتفظ القناة بأعضائها. تحقّق من وصول الزميل إلى النقاش والملفات قبل إحالة العمل إليه.', 'The channel keeps its own members. Check the teammate can open the discussion and files before handing work over.')}</p></div>
        </div>
      </section>

      ${seam('cross')}
      <section class="fp-scene fp-scene--wide"><div>${h2(title(1))}<p>${L(blocks[1]?.body)}</p></div>${shot('setup_teams', t('صفحة فريق تجريبي في مُعين', 'A demo team page in Moeen'))}</section>
    </div>`;
  },

  // ---- Data: a file explorer -------------------------------------------------------------------
  data(locale) {
    const { t, L, cta, h1, items, title, h2 } = kit('data', locale);
    const tree = [
      [t('ملفاتي', 'My files'), [[t('مسوّدة ملاحظات الإطلاق', 'Launch notes draft'), 'DOCX', '84 KB', t('أنت فقط', 'Only you')]]],
      [t('ملفات مساحة العمل', 'Workspace files'), [[t('خطة الإطلاق', 'Launch plan'), 'PDF', '1.2 MB', t('كل أعضاء مساحة العمل', 'Everyone in the workspace')], [t('ميزانية الربع', 'Quarter budget'), 'XLSX', '220 KB', t('فريق المالية', 'Finance team')]]],
      [t('مرفقات #المنتج', '#product attachments'), [[t('نصّا شاشة الترحيب', 'Welcome screen drafts'), 'MD', '6 KB', t('أعضاء قناة #المنتج', 'Members of #product')]]],
    ];
    let index = 0;
    const file = ([name, kind, size, access]) => `<button type="button" class="ex-file${index === 1 ? ' is-on' : ''}" data-file data-name="${esc(name)}" data-kind="${kind}" data-size="${size}" data-access="${esc(access)}" data-i="${index++}"><span class="ex-ext ex-ext--${kind.toLowerCase()}">${kind}</span><span>${name}</span></button>`;
    const first = tree[1][1][0];
    const ways = ['folder', 'hash', 'spark'];
    return `<div class="fp fp--data">
      <header class="fp-hero fp-hero--start"><div>${h1}${cta}</div></header>
      <div class="explorer" data-explorer>
        <nav class="explorer__tree" aria-label="${t('مجلدات توضيحية', 'Example folders')}">
          ${tree.map(([folder, files], i) => `<details${i < 2 ? ' open' : ''}><summary>${ic('folder')}${folder}</summary>${files.map(file).join('')}</details>`).join('')}
        </nav>
        <div class="explorer__preview" aria-live="polite">
          <span class="ex-ext ex-ext--big ex-ext--${first[1].toLowerCase()}" data-p-kind>${first[1]}</span>
          <h3 data-p-name>${first[0]}</h3>
          <dl><div><dt>${t('الحجم', 'Size')}</dt><dd data-p-size dir="ltr">${first[2]}</dd></div><div><dt>${ic('lock')}${t('من يستطيع فتحه', 'Who can open it')}</dt><dd data-p-access>${first[3]}</dd></div></dl>
          <p class="explorer__hint">${t('اختر ملفاً لترى من يستطيع الوصول إليه. يرث الملف صلاحيات المجلد أو القناة التي يقع فيها.', 'Pick a file to see who can open it. A file inherits access from its folder or channel.')}</p>
        </div>
      </div>

      ${seam('dash')}
      <section class="ways">${h2(title(1), t('من مجلده، أو من القناة، أو بسؤال ai-moeen.', 'From its folder, its channel, or by asking ai-moeen.'))}<ol>${items(1).map((item, i) => `<li><span class="ways__icon">${ic(ways[i])}</span><h3>${L(item.title)}</h3><p>${L(item.body)}</p></li>`).join('')}</ol></section>

      ${seam('dots')}
      <section class="handoff">
        <div>${h2(t('قبل تسليم مجلد العمل إلى الفريق', 'Before handing over a folder'), t('راجع هذه النقاط أولاً.', 'Check these points first.'))}
          <ol>${[t('افتح المعاينة وتأكّد من النسخة التي ستسلّمها.', 'Preview the file to confirm the version.'), t('اختر اسماً يصف محتوى الملف.', 'Give it a name that describes its contents.'), t('راجع المجلد الوجهة ومن يستطيع فتحه.', 'Check the destination folder and who can open it.')].map((s) => `<li>${s}</li>`).join('')}</ol></div>
        ${shot('workspace_data', t('مجلد الملفات الخاصة ومجلد ملفات مساحة العمل في مُعين', 'The private and workspace file folders in Moeen'))}
      </section>
    </div>`;
  },

  // ---- Meetings: a calendar week ---------------------------------------------------------------
  meetings(locale) {
    const { t, L, cta, h1, items, title, blocks, h2 } = kit('meetings', locale);
    const days = [t('الأحد', 'Sun'), t('الإثنين', 'Mon'), t('الثلاثاء', 'Tue'), t('الأربعاء', 'Wed'), t('الخميس', 'Thu')];
    const events = [[0, 1, 2, t('مزامنة المنتج', 'Product sync'), 'b'], [1, 3, 2, t('مقابلة', 'Interview'), 'c'], [3, 0, 2, t('تخطيط الأسبوع', 'Weekly planning'), 'e'], [4, 4, 2, t('عرض تجريبي', 'Demo'), 'd']];
    const agenda = [['10:00', t('راجع ما تغيّر', 'Review what changed'), t('افتح اللوحة وحدّد ما اكتمل منذ آخر لقاء.', 'Open the board and see what finished since last time.')], ['10:10', t('احسم قرار الإصدار', 'Make the release decision'), t('سجّل ما يمنع الإطلاق وما يمكن متابعته بعده.', 'Record what blocks the release and what can follow.')], ['10:25', t('اتفق على المتابعة', 'Agree on the follow-up'), t('مسؤول واحد وموعد عودة لكل بند.', 'One owner and a return date for each item.')]];
    return `<div class="fp fp--meetings">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <div class="cal" data-calendar>
        <div class="cal__days"><span></span>${days.map((d) => `<b>${d}</b>`).join('')}</div>
        <div class="cal__grid">
          <div class="cal__hours">${['09:00', '10:00', '11:00', '12:00'].map((h) => `<span dir="ltr">${h}</span>`).join('')}</div>
          ${days.map((_, d) => `<div class="cal__day" data-day="${d}"></div>`).join('')}
          ${events.map(([d, start, len, name, tone]) => `<span class="cal__ev cal__ev--${tone}" style="--d:${d};--s:${start};--l:${len}">${name}</span>`).join('')}
          <button type="button" class="cal__ev cal__ev--main" style="--d:2;--s:2;--l:2" aria-expanded="false" data-event>${ic('video')}<b>${t('مراجعة الإطلاق', 'Launch review')}</b><small dir="ltr">10:00 - 10:30</small></button>
          <div class="cal__pop" data-event-pop hidden>
            <b>${t('مراجعة الإطلاق', 'Launch review')}</b>
            <p>${['a', 'b', 'c', 'd'].map((s) => avatar(s, 'sm')).join('')}<span>${t('4 مشاركين', '4 people')}</span></p>
            <ol>${agenda.map(([time, name]) => `<li><time dir="ltr">${time}</time>${name}</li>`).join('')}</ol>
          </div>
          <span class="cal__now" style="--d:2;--at:1.4" aria-hidden="true"></span>
        </div>
      </div>
      <p class="fp-note">${t('اضغط على الاجتماع لترى جدول أعماله.', 'Click the meeting to see its agenda.')}</p>

      ${seam('hatch')}
      <section class="ruler"><div class="ruler__head">${h2(t('جلسة من نصف ساعة لمراجعة الإطلاق', 'A thirty-minute launch review'), t('خصّص لكل بند وقتاً ونتيجة تحتاج إلى حسمها.', 'Give each item a time and a decision to reach.'))}</div>
        <ol>${agenda.map(([time, name, body]) => `<li><time dir="ltr">${time}</time><div><h3>${name}</h3><p>${body}</p></div></li>`).join('')}</ol></section>

      ${seam('cross')}
      <section class="phases">${h2(title(0), t('ما تفعله قبل الاجتماع وأثناءه وبعده.', 'What to do at each stage.'))}<ol>${items(0).map((item, i) => `<li><span class="phases__dot">${i + 1}</span><h3>${L(item.title)}</h3><p>${L(item.body)}</p></li>`).join('')}</ol></section>

      ${seam('dash')}
      <section class="fp-minutes">
        <div class="fp-minutes__paper">${h2(t('محضر يعمل منه الفريق', 'Minutes you can act on'))}
          <p>${t('وافق الفريق على الإطلاق بعد إصلاح رابط الدعوة.', 'The team agreed to launch once the invitation link is fixed.')}</p>
          <p class="fp-minutes__line"><mark>${t('سارة تصلح رابط الدعوة', 'Sara fixes the invitation link')}</mark></p>
          <p class="fp-minutes__line"><mark>${t('ريم تختبره يوم الخميس', 'Reem tests it on Thursday')}</mark></p></div>
        <div class="fp-minutes__tasks">${[[t('إصلاح رابط الدعوة', 'Fix the invitation link'), 'b'], [t('اختبار رابط الدعوة', 'Test the invitation link'), 'a']].map(([name, who], i) => `<article class="kb-card"><div class="kb-card__top"><span dir="ltr">APP-15${i}</span>${avatar(who, 'sm')}</div><h3>${name}</h3><span class="fp-tag">${t('الخميس', 'Thursday')}</span></article>`).join('')}</div>
      </section>

      ${seam('dots')}
      <section class="split-faq">${h2(title(2))}${items(2).map((q) => `<div><h3>${L(q.title)}</h3><p>${L(q.body)}</p></div>`).join('')}</section>
      ${seam('hatch')}
      <section class="fp-scene"><div>${h2(title(1))}<p>${L(blocks[1]?.body)}</p></div>${shot('mod_meetings', t('اجتماع تتفرّع منه مهام متابعة', 'A meeting with follow-up tasks'))}</section>
    </div>`;
  },

  // ---- Mail: from inbox to task ----------------------------------------------------------------
  mail(locale) {
    const { t, L, cta, h1, items, title, blocks, h2 } = kit('mail', locale);
    const inbox = [
      ['f', t('هشام البلوي', 'Hisham Al-Balawi'), t('ملاحظات على عرض الاشتراك', 'Notes on the subscription offer'), '09:40', true],
      ['c', t('لمى الراجحي', 'Lama Al-Rajhi'), t('موعد الإطلاق', 'Launch date'), '08:12'],
      ['d', t('طارق منصور', 'Tariq Mansour'), t('دعوة: مراجعة الربع', 'Invite: quarterly review'), t('أمس', 'Yesterday')],
      ['e', t('ماجد العنزي', 'Majed Al-Anazi'), t('أسئلة العميل الجديدة', 'New customer questions'), t('أمس', 'Yesterday')],
    ];
    return `<div class="fp fp--mail">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <div class="inbox" data-inbox>
        <ul class="inbox__list">${inbox.map(([who, name, subject, time, open]) => `<li class="${open ? 'is-open' : ''}">${avatar(who, 'sm')}<div><b>${name}</b><span>${subject}</span></div><time>${time}</time></li>`).join('')}</ul>
        <article class="inbox__letter">
          <header><div>${avatar('f')}<p><b>${t('هشام البلوي', 'Hisham Al-Balawi')}</b><small dir="ltr">hisham@aramex.example</small></p></div><time dir="ltr">09:40</time></header>
          <h3>${t('ملاحظات على عرض الاشتراك', 'Notes on the subscription offer')}</h3>
          <p>${t('شكراً على العرض. نحتاج إلى مراجعة مدة الخدمة قبل عرضه على لجنة المشتريات يوم الخميس.', 'Thanks for the offer. We need the service period reviewed before it goes to the procurement committee on Thursday.')}</p>
          <span class="inbox__att">${ic('file')}<bdi dir="ltr">Proposal-v3.pdf</bdi></span>
          <footer><button type="button" class="btn btn--ghost btn--sm" data-to-task>${ic('task')}${t('إلى مهمة', 'To task')}</button><span>${t('رد', 'Reply')}</span></footer>
          <div class="inbox__task" aria-live="polite"><article class="kb-card"><div class="kb-card__top"><span dir="ltr">APP-151</span>${avatar('a', 'sm')}</div><h3>${t('مراجعة مدة الخدمة في العرض', 'Review the service period in the offer')}</h3><span class="fp-tag fp-tag--blue">${t('الخميس، قبل الظهر', 'Thursday, before noon')}</span></article></div>
        </article>
      </div>
      <p class="fp-note">${t('اضغط «إلى مهمة» لترى كيف تصبح الرسالة عملاً على اللوحة.', 'Press “To task” to see the email become work on the board.')}</p>

      ${seam('cross')}
      <section class="letters">${h2(t('رسالة واحدة، ومتابعتان مختلفتان', 'One email, two different follow-ups'), t('ردّ إلى العميل، ومهمة يراها الفريق.', 'A reply to the customer, and a task the team can see.'))}
        <div class="letters__pair">
          <article class="letters__paper"><span class="letters__stamp">${ic('mail')}</span><h3>${t('ردّ إلى العميل', 'Reply to the customer')}</h3><blockquote>${t('شكراً على الملاحظات. سنراجع مدة الخدمة ونعود إليكم الخميس بالعرض المحدّث.', 'Thank you for the feedback. We’ll review the service period and send the revised proposal on Thursday.')}</blockquote></article>
          <article class="letters__task"><span class="letters__stamp">${ic('task')}</span><h3>${t('مهمة للفريق', 'Task for the team')}</h3><blockquote>${t('راجعي مدة الخدمة في العرض وأرفقي النسخة المحدّثة قبل ظهر الخميس.', 'Review the service period and attach the revised proposal before noon on Thursday.')}</blockquote></article>
        </div></section>

      ${seam('dash')}
      <section class="postmarks">${h2(title(0), t('اعثر على الرسالة، وراجع، ثم تابع.', 'Find the message, review, then follow up.'))}<ol>${items(0).map((item, i) => `<li><span class="postmarks__n">0${i + 1}</span><h3>${L(item.title)}</h3><p>${L(item.body)}</p></li>`).join('')}</ol></section>
      ${seam('dots')}
      <section class="fp-scene"><div>${h2(title(1))}<p>${L(blocks[1]?.body)}</p></div>${shot('mail', t('رسالة مفتوحة في بريد مُعين', 'An open message in Moeen Mail'))}</section>
    </div>`;
  },

  // ---- ai-moeen: a marked-up request ---------------------------------------------------------------
  ai_moeen(locale) {
    const { t, L, cta, h1, blocks, h2 } = kit('ai_moeen', locale);
    const mark = (key, text) => (key === 'owner' || key === 'due' ? `<button type="button" class="mk mk--${key}" data-mark="${key}" aria-pressed="true">${text}</button>` : `<span class="mk mk--${key}">${text}</span>`);
    const field = (key, name, value, empty) => `<div class="slip__row" data-field="${key}"><dt>${name}</dt><dd><span class="mk mk--${key}">${value}</span>${empty ? `<em>${empty}</em>` : ''}</dd></div>`;
    const ask = t(
      `أنشئ مهمة ${mark('title', 'لمراجعة شاشة الترحيب')} في فريق ${mark('team', 'إطلاق التطبيق')}، وأسنِدها إلى ${mark('owner', 'سارة')}، على أن تنتهي <span class="mk-end">${mark('due', 'يوم الخميس')}.</span>`,
      `Create a task to ${mark('title', 'review the welcome screen')} in the ${mark('team', 'App launch')} team, assign it to ${mark('owner', 'Sara')}, and make it due <span class="mk-end">${mark('due', 'Thursday')}.</span>`,
    );
    const capture = (name, width, height, alt, cls = '') => `<img class="${cls}" data-shot="${name}" src="/assets/shots2/${name}_${locale}_light.png" width="${width}" height="${height}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
    const day = [
      ['09:10', t('لخّص النقاش', 'Sum up the discussion'), t('ذكره خالد في القناة، فكتب ما بقي قبل الإطلاق وأنشأ المهمة الناقصة.', 'Khalid mentioned it in the channel. It wrote what was left and created the missing task.'),
        `<div class="day__chat">${capture('ai_scene_request', 411, 80, t('خالد يطلب من ai-moeen تلخيص ما بقي قبل الإطلاق', 'Khalid asks ai-moeen to summarize what is left'))}${capture('ai_scene_response', 395, 201, t('رد ai-moeen مع المهمة التي أنشأها', 'The ai-moeen reply with the task it created'))}</div>`],
      ['11:30', t('أنشئ مهمة لغد', 'Create a task for tomorrow'), t('لم يذكر الطلب مسؤولاً، فبقيت المهمة بلا مسؤول. لا يخمّن من يتولّاها.', 'The request named no owner, so the task stayed unassigned. It doesn’t guess.'),
        `<div class="day__crop">${capture('plan', 375, 852, t('طلب إنشاء مهمة وخطوات تنفيذه', 'A request to create a task and the steps it ran'))}</div>`],
      ['14:05', t('شارك خطة الإطلاق', 'Share the launch plan'), t('تغيير المشاركة ينتظر صاحب الطلب. يرى الملف ومن سيطّلع عليه، ثم يقرّر.', 'A sharing change waits for the person who asked. They see the file and who will open it, then decide.'),
        `<div class="permit" data-permit><header>${ic('shield')}<b>${t('موافقتك مطلوبة', 'Your approval is needed')}</b></header><div class="permit__body"><h4>${t('مشاركة ملف', 'Share a file')}</h4><dl><div><dt>${t('الملف', 'File')}</dt><dd>${t('خطة الإطلاق التجريبي', 'Beta launch plan')}.md</dd></div><div><dt>${t('سيطّلع عليه', 'Shared with')}</dt><dd>${t('فريق التسويق', 'Marketing team')}</dd></div></dl></div><footer data-permit-ask><button type="button" data-permit-answer="yes">${ic('check')}${t('موافقة وتنفيذ', 'Approve and run')}</button><button type="button" data-permit-answer="no">${t('رفض', 'Reject')}</button></footer><p class="permit__done" data-permit-done aria-live="polite" hidden data-yes="${t('وافقت، فشُورك الملف مع فريق التسويق.', 'You approved it. The file is now shared with Marketing.')}" data-no="${t('رفضت الطلب، ولم تتغيّر المشاركة.', 'You rejected it. Nothing changed.')}"></p></div>`],
      ['16:40', t('اكتب ملخّص اليوم بصيغة فريقك', 'Write today’s recap your team’s way'), t('أرفق مهارة محفوظة مع الطلب، فيكتب بالصيغة التي اتفق عليها الفريق.', 'Attach a saved skill to the request and it follows the format your team agreed on.'),
        `<div class="day__wide">${capture('workspace_skills', 894, 439, t('المهارات المحفوظة في مُعين', 'Saved skills in Moeen'))}</div>`],
    ];
    const bounds = [
      [t('ينفّذه ضمن صلاحياتك', 'Runs within your permissions'), [t('إنشاء المهام وتعديلها وإسنادها', 'Create, edit, and assign tasks'), t('جدولة الاجتماعات في مُعين', 'Schedule meetings in Moeen'), t('الكتابة في القنوات المتاحة لك', 'Post in channels you can access'), t('البحث في المستندات المتاحة لك', 'Search documents you can read')]],
      [t('ينتظر موافقتك', 'Waits for your approval'), [t('الحذف', 'Deletion'), t('مشاركة الملفات ونقلها', 'Sharing and moving files'), t('تغيير أعضاء القنوات والفرق', 'Changing channel and team members'), t('دعوة الأعضاء وإزالتهم', 'Inviting and removing members')]],
      [t('لا يصل إليه في هذا الإصدار', 'Out of reach in this release'), [t('البريد', 'Email'), t('التقاويم والملفات الخارجية', 'External calendars and drives'), t('المكالمات وتسجيلاتها', 'Calls and recordings'), t('كلمات المرور والفوترة', 'Passwords and billing')]],
    ];
    const places = [
      [t('في قناة', 'In a channel'), t('اذكر ai-moeen ليرى الفريق الطلب والرد. يعتمد الرد على ما يحقّ لأعضاء القناة الاطّلاع عليه.', 'Mention ai-moeen so the team sees the request and the reply. The reply uses what the channel’s members may see.')],
      [t('في محادثة خاصة', 'In a private chat'), t('يرجع إلى المستندات والمحادثات المتاحة لك. راجع المصدر قبل أن تنقل الرد إلى قناة.', 'It uses the documents and conversations you can open. Check the source before moving a reply to a channel.')],
      [t('خطة برو', 'The Pro plan'), `${L(blocks[2]?.items?.[1]?.body)} <a href="/pricing/">${t('قارن الخطط', 'Compare plans')}</a>`],
    ];
    return `<div class="fp fp--ai">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <section class="markup" data-markup aria-label="${t('طلب مكتوب والمهمة التي نتجت عنه', 'A written request and the task it became')}">
        <div class="markup__thread">
          <p class="markup__place">${ic('hash')}${t('المنتج', 'product')}</p>
          <div class="markup__msg">${avatar('b')}<div><p class="markup__by"><b>${t('عمر الزهراني', 'Omar Al-Zahrani')}</b><time dir="ltr">09:20</time></p><p class="markup__text"><span class="markup__at">${keepWhole('@ai-moeen')}</span> ${ask}</p></div></div>
          <div class="markup__msg">${avatar('ai')}<div><p class="markup__by"><b>${keepWhole('ai-moeen')}</b><time dir="ltr">09:21</time></p><p class="markup__text" data-markup-reply aria-live="polite">${markupReply(true, true, t)}</p></div></div>
        </div>
        <div class="markup__slip"><article class="slip"><header><span dir="ltr">APP-148</span><small>${t('أنشأها', 'Created by')} ${keepWhole('ai-moeen')}</small></header><dl>
          ${field('title', t('المهمة', 'Task'), t('مراجعة شاشة الترحيب', 'Review the welcome screen'))}
          ${field('team', t('الفريق', 'Team'), t('إطلاق التطبيق', 'App launch'))}
          ${field('owner', t('المسؤول', 'Owner'), t('سارة العتيبي', 'Sara Al-Otaibi'), t('بلا مسؤول', 'Unassigned'))}
          ${field('due', t('الموعد', 'Due'), t('الخميس', 'Thursday'), t('بلا موعد', 'No date'))}</dl></article></div>
        <p class="markup__hint">${t('اضغط «سارة» أو «يوم الخميس» لتشطبها من الطلب، ولاحظ ما يتغيّر في المهمة.', 'Press “Sara” or “Thursday” to cross it out and see what changes in the task.')}</p>
      </section>

      ${seam('hatch')}
      <section class="day">${h2(t('أربعة طلبات في يوم عادي', 'Four requests on an ordinary day'), t('أمثلة من مساحة عمل تجريبية.', 'Examples from a demo workspace.'))}
        <ol>${day.map(([time, name, body, art]) => `<li><div class="day__copy"><h3>${name}</h3><time dir="ltr">${time}</time><p>${body}</p></div><div class="day__art">${art}</div></li>`).join('')}</ol></section>

      ${seam('dots')}
      <section class="bounds">${h2(t('ما ينفّذه، وما ينتظر موافقتك', 'What it runs, and what waits for you'), t('ويمكن لمشرف مساحة العمل أن يطلب موافقة قبل كل تعديل.', 'A workspace admin can also require approval before every change.'))}
        <div class="bounds__cols">${bounds.map(([name, list], i) => `<div class="bounds__col bounds__col--${['run', 'wait', 'off'][i]}"><h3>${name}</h3><ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul></div>`).join('')}</div></section>

      ${seam('cross')}
      <section class="split-faq">${h2(t('أين تكتب طلبك؟', 'Where do you ask?'), t('القناة للفريق، والمحادثة الخاصة لك.', 'A channel for the team, a private chat for you.'))}${places.map(([name, body]) => `<div><h3>${name}</h3><p>${body}</p></div>`).join('')}</section>
    </div>`;
  },

  // ---- MCP: an API reference -------------------------------------------------------------------
  mcp(locale) {
    const { t, L, cta, hero, items, title, blocks, h2 } = kit('mcp', locale);
    const scopes = blocks[0]?.rows ?? [];
    const lanes = [t('العميل الخارجي', 'External client'), t('مُعين', 'Moeen'), t('المسؤول', 'Approver')];
    const seq = [[0, 1, t('يطلب حذف مهمة', 'Requests a task deletion')], [1, 2, t('يعرض الطلب للموافقة', 'Shows the request for approval')], [2, 1, t('يوافق مرة واحدة', 'Approves once')], [0, 1, t('يعيد الطلب مع معرّف الموافقة', 'Retries with the approval ID')]];
    return `<div class="fp fp--mcp">
      <header class="ref-hero">
        <div class="ref-hero__copy">${hero(t('أدوات المهام ضمن نطاق يحدّده المالك أو المشرف المخوّل.', 'Task tools within a scope set by an owner or authorized admin.'))}${cta}</div>
        <figure class="editor" aria-label="${t('مثال توضيحي لإعداد عميل', 'An illustrative client configuration')}">
          <figcaption><span class="editor__dots"><i></i><i></i><i></i></span><span dir="ltr">mcp.json</span><span class="editor__tag">${t('مثال', 'Example')}</span></figcaption>
          <pre dir="ltr"><code><span class="c-p">{</span>
  <span class="c-k">"moeen"</span>: <span class="c-p">{</span>
    <span class="c-k">"transport"</span>: <span class="c-s">"streamable-http"</span>,
    <span class="c-k">"url"</span>: <span class="c-s">"&lt;SERVER_URL&gt;"</span>,
    <span class="c-k">"headers"</span>: <span class="c-p">{</span>
      <span class="c-k">"Authorization"</span>: <span class="c-s">"&lt;AUTHORIZATION&gt;"</span>
    <span class="c-p">}</span>
  <span class="c-p">}</span>
<span class="c-p">}</span></code></pre>
          <dl class="editor__legend"><div><dt dir="ltr">SERVER_URL</dt><dd>${t('رابط الخادم الظاهر في إعدادات MCP', 'The server URL shown in MCP settings')}</dd></div><div><dt dir="ltr">AUTHORIZATION</dt><dd>${t('ترويسة المصادقة التي تظهر مرة واحدة', 'The authorization header, shown once')}</dd></div></dl>
        </figure>
      </header>

      ${seam('dots')}
      <section class="scopes">${h2(title(0), t('قراءة المهام، أو إنشاؤها وتعديلها.', 'Read tasks, or create and update them.'))}<div>${scopes.map(([key, value], i) => `<article><header><code dir="ltr">${esc(key.code)}</code><span class="scopes__verb scopes__verb--${i ? 'write' : 'read'}">${i ? t('كتابة', 'Write') : t('قراءة', 'Read')}</span></header><p>${L(value)}</p></article>`).join('')}</div></section>

      ${seam('hatch')}
      <section class="runbook">${h2(title(1), t('من الإعدادات إلى العميل، ثم المراجعة.', 'From settings to the client, then review.'))}<ol>${items(1).map((item, i) => `<li><span dir="ltr">$ ${i + 1}</span><div><h3>${L(item.title)}</h3><p>${L(item.body)}</p></div></li>`).join('')}</ol></section>

      ${seam('cross')}
      <section class="sequence">${h2(title(2), L(blocks[2]?.items?.[0]?.body))}
        <div class="sequence__scroll">
        <div class="sequence__chart" style="--lanes:${lanes.length}">
          ${lanes.map((name, i) => `<b class="sequence__lane" style="--c:${i}">${name}</b>`).join('')}
          ${seq.map(([from, to, label], row) => `<span class="sequence__msg${to < from ? ' is-back' : ''}" style="--from:${Math.min(from, to)};--to:${Math.max(from, to)};--r:${row}"><i>${label}</i></span>`).join('')}
        </div></div></section>
    </div>`;
  },

  // ---- Knowledge base: a reading room ----------------------------------------------------------
  knowledge_base(locale) {
    const { t, L, cta, h1, items, title, blocks, h2 } = kit('knowledge_base', locale);
    const types = ['PDF', 'DOCX', 'XLSX', 'CSV', 'TXT', 'JSON', 'MD'];
    return `<div class="fp fp--kb">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <div class="reading">
        <div class="reading__q">${avatar('a', 'sm')}<p>${L(blocks[0]?.quote)}</p></div>
        <article class="reading__paper">
          <header>${ic('file')}<bdi dir="ltr">shipment_requirements.md</bdi></header>
          <h3>${t('متطلبات تصدير الشحنات', 'Shipment export requirements')}</h3>
          <p class="reading__dim">${t('يغطي هذا القسم تصدير بيانات الشحنات إلى أنظمة الشركاء.', 'This section covers exporting shipment data to partner systems.')}</p>
          <p><mark>${t('يُقبل ملف التصدير إذا احتوى على رقم الشحنة وتاريخ التسليم.', 'An export is accepted when it includes the shipment number and delivery date.')}</mark><sup>1</sup> ${t('تُراجع الحقول الناقصة قبل الإرسال.', 'Missing fields are reviewed before submission.')}</p>
          <p class="reading__dim">${t('تُحفظ نسخة من كل ملف مُرسل لمدة تسعين يوماً.', 'A copy of each sent file is kept for ninety days.')}</p>
        </article>
        <div class="reading__a"><span class="fp-av fp-av--ai"></span><div><p>${t('رقم الشحنة وتاريخ التسليم. لا يحدّد المقتطف من يراجع الحقول الناقصة.', 'The shipment number and delivery date. The excerpt does not say who reviews missing fields.')}</p><span class="reading__cite"><sup>1</sup><bdi dir="ltr">shipment_requirements.md</bdi></span></div></div>
      </div>
      <p class="fp-note">${L(blocks[0]?.note)}</p>

      ${seam('dash')}
      <section class="layers">${h2(title(1), t('الفهرسة، ثم الصلاحيات، ثم المشاركة.', 'Indexing, then access, then sharing.'))}<ol>${items(1).map((item, i) => `<li style="--i:${i}"><h3>${L(item.title)}</h3><p>${L(item.body)}</p>${i === 0 ? `<p class="layers__types">${types.map((x) => `<span dir="ltr">${x}</span>`).join('')}</p>` : ''}</li>`).join('')}</ol></section>

      ${seam('dots')}
      <section class="fp-scene fp-scene--wide"><div>${h2(t('إذا لم يجد ai-moeen ما طلبت', 'When a detail cannot be found'))}<p>${t('ابدأ باسم الملف وصلاحية قراءته، ثم تحقّق من حالة الفهرسة. قد يحتاج المستند الممسوح ضوئياً إلى نسخة بنص قابل للاستخراج.', 'Start with the filename and your access, then check indexing. A scanned document may need a version with extractable text.')}</p></div>${shot('ai_scene_library', t('مستندات الإطلاق في مكتبة مُعين', 'Launch documents in the Moeen library'))}</section>
    </div>`;
  },

  // ---- Skills: recipe cards --------------------------------------------------------------------
  skills(locale) {
    const { t, L, cta, hero, items, title, blocks, h2 } = kit('skills', locale);
    const deck = [
      [t('ملخّص الاجتماع', 'Meeting recap'), L(blocks[0]?.quote), 'meetings'],
      [t('تسليم عمل الجمعة', 'Friday handoff'), t('اكتب ما اكتمل، ثم ما بقي، ثم القرار المطلوب من الزميل. اذكر الروابط المتاحة ولا تضف موعداً لم يتفق عليه الفريق.', 'List what is complete, what remains, and the decision the next teammate needs to make. Include available links and leave out dates the team has not agreed on.'), 'handoff'],
      [t('مراجعة المهام الأسبوعية', 'Weekly task review'), t('رتّب المهام المفتوحة حسب الموعد، وأبرز ما ليس له مسؤول، واختم بثلاثة بنود تحتاج إلى قرار.', 'Order open tasks by due date, flag anything without an owner, and end with three items that need a decision.'), 'weekly'],
    ];
    return `<div class="fp fp--skills">
      <header class="deck-hero">
        <div>${hero(t('احفظها في مهارة ترفقها بطلبك إلى ai-moeen.', 'Save them as a skill and attach it to a request.'))}${cta}</div>
        <div class="deck" data-deck>${deck.map(([name, body, id], i) => `<button type="button" class="deck__card" data-card="${i}" aria-pressed="${i === 0}" style="--k:${i}"><span class="deck__tag">${ic('book')}${t('مهارة', 'Skill')}</span><b>${name}</b><span class="deck__body">${body}</span><span class="deck__foot" dir="ltr">/${id}</span></button>`).join('')}
          <button type="button" class="deck__next" data-deck-next>${t('المهارة التالية', 'Next skill')}${arrow}</button></div>
      </header>

      ${seam('hatch')}
      <section class="recipe">${h2(t('كيف تكتب مهارة تفيدك؟', 'Build a skill from a recurring request'), t('احتفظ في المهارة بطريقة العمل، واذكر في الطلب ما يخص هذه المرّة.', 'Keep the method in the skill, and put what is specific to this time in the request.'))}
        <div class="recipe__card">
          <div><span class="recipe__label">${t('التعليمات المحفوظة', 'Saved instructions')}</span><p>${deck[1][1]}</p></div>
          <div><span class="recipe__label">${t('طلب هذا الأسبوع', 'This week’s request')}</span><p>${t('حضّر تسليم مهمة مراجعة شاشة الترحيب إلى سارة.', 'Prepare the welcome screen review for handoff to Sara.')}</p></div>
          <div><span class="recipe__label">${t('ما الذي تراجعه؟', 'What to check')}</span><p>${t('أن الملخّص يصف الحالة الفعلية، وأن الروابط متاحة لمن يتسلّم المهمة.', 'That the summary reflects the actual state and the next owner can open the links.')}</p></div>
        </div></section>

      ${seam('cross')}
      <section class="fp-scene fp-scene--wide"><div>${h2(title(1))}<p>${L(blocks[1]?.body)}</p></div>${shot('workspace_skills', t('قائمة المهارات في مساحة تجريبية', 'Skills in a demo workspace'))}</section>
      ${seam('dash')}
      <section class="split-faq">${h2(title(2), t('حين تتكرّر الصيغة، أو تتغيّر طريقة العمل.', 'When a format repeats, or the way of working changes.'))}${items(2).map((q) => `<div><h3>${L(q.title)}</h3><p>${L(q.body)}</p></div>`).join('')}</section>
    </div>`;
  },

  // ---- Integrations: a constellation and a directory -------------------------------------------
  integrations(locale) {
    const { t, L, cta, h1, items, title, h2 } = kit('integrations', locale);
    const ring = ['gmail', 'outlook', 'google_calendar', 'zoom', 'google_drive', 'slack', 'github', 'notion', 'google_sheets', 'figma', 'jira', 'hubspot'];
    const directory = [
      ['gmail', 'Gmail', 'mail'], ['outlook', 'Outlook', 'mail'], ['google_calendar', 'Google Calendar', 'calendar'], ['zoom', 'Zoom', 'meetings'],
      ['google_drive', 'Google Drive', 'files'], ['google_sheets', 'Google Sheets', 'files'], ['slack', 'Slack', 'work'], ['notion', 'Notion', 'work'],
      ['github', 'GitHub', 'work'], ['jira', 'Jira', 'work'], ['figma', 'Figma', 'work'], ['hubspot', 'HubSpot', 'work'],
    ];
    const filters = [['all', t('الكل', 'All')], ['mail', t('البريد', 'Mail')], ['calendar', t('التقويم', 'Calendar')], ['meetings', t('الاجتماعات', 'Meetings')], ['files', t('الملفات', 'Files')], ['work', t('أدوات العمل', 'Work tools')]];
    return `<div class="fp fp--int">
      <header class="fp-hero fp-hero--center">${h1}${cta}</header>
      <div class="sky" aria-hidden="true">
        <span class="sky__ring sky__ring--1"></span><span class="sky__ring sky__ring--2"></span>
        <span class="sky__core"><img class="theme-img" src="/assets/brand/mark_black.svg" data-light="/assets/brand/mark_black.svg" data-dark="/assets/brand/mark_white.svg" alt=""></span>
        ${ring.map((name, i) => `<span class="sky__logo" style="--a:${(i * 360) / ring.length}deg;--r:${i % 2 ? 1 : 0}">${logo(name, 24)}</span>`).join('')}
      </div>

      ${seam('dots')}
      <section class="routes">${h2(t('ابدأ من العمل الذي بين يديك', 'Start with the job you need to do'), t('ثم اختر التطبيق الذي تحتاج إلى ربطه.', 'Then choose the app to connect.'))}
        <ul>${items(0).map((item) => `<li>${logo(item.logo, 32)}<div><h3>${L(item.title)}</h3><p>${L(item.body)}</p></div></li>`).join('')}</ul></section>

      ${seam('hatch')}
      <section class="directory" data-directory><div class="directory__head">${h2(t('دليل التكاملات', 'Integrations directory'), t('صفِّه بحسب نوع العمل.', 'Filter it by the kind of work.'))}<span class="fp-tag">${t('معاينة', 'Preview')}</span></div>
        <p>${t('تختلف الإمكانات من تطبيق إلى آخر، وتتوقّف على الأذونات التي يمنحها الحساب المتصل.', 'What each app supports varies, and depends on the permissions the connected account grants.')}</p>
        <div class="directory__filters" role="group" aria-label="${t('تصفية التطبيقات', 'Filter apps')}">${filters.map(([key, name], i) => `<button type="button" data-filter="${key}" aria-pressed="${i === 0}">${name}</button>`).join('')}</div>
        <ul class="directory__grid">${directory.map(([key, name, kind]) => `<li data-kind="${kind}">${logo(key, 30)}<b>${name}</b></li>`).join('')}</ul></section>

      ${seam('cross')}
      <section class="track">${h2(title(1), t('افتح التفاصيل، وراجع، ثم ارجع إلى عملك.', 'Open the details, review, then return to work.'))}<ol>${items(1).map((item, i) => `<li><span class="track__n">${i + 1}</span><h3>${L(item.title)}</h3><p>${L(item.body)}</p></li>`).join('')}</ol></section>
    </div>`;
  },
};

export function featurePage(page, locale) {
  return pages[page](locale);
}

/** Interactions for the signature pieces, delegated on the content element so they survive
 *  the re-render that follows a language change. */
export function initFeaturePage(content) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  content.addEventListener('click', (event) => {
    const target = event.target;

    const next = target.closest('[data-kanban-next]');
    if (next) {
      const card = next.closest('[data-kanban-card]'), board = card.closest('[data-kanban]');
      const columns = [...board.querySelectorAll('.kb-col')];
      const step = (Number(card.dataset.step) + 1) % columns.length;
      const first = card.getBoundingClientRect();
      columns[step].querySelector('.kb-stack').prepend(card);
      card.dataset.step = String(step);
      columns.forEach((col, i) => { col.querySelector('.kb-count').textContent = String(col.querySelectorAll('.kb-card').length); col.classList.toggle('is-target', i === step); });
      if (!still.matches) {
        const last = card.getBoundingClientRect();
        card.animate([{ transform: `translate(${first.left - last.left}px, ${first.top - last.top}px)` }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
      return;
    }

    const fileButton = target.closest('[data-file]');
    if (fileButton) {
      const explorer = fileButton.closest('[data-explorer]');
      explorer.querySelectorAll('[data-file]').forEach((b) => b.classList.toggle('is-on', b === fileButton));
      const kind = explorer.querySelector('[data-p-kind]');
      kind.textContent = fileButton.dataset.kind;
      kind.className = `ex-ext ex-ext--big ex-ext--${fileButton.dataset.kind.toLowerCase()}`;
      explorer.querySelector('[data-p-name]').textContent = fileButton.dataset.name;
      explorer.querySelector('[data-p-size]').textContent = fileButton.dataset.size;
      explorer.querySelector('[data-p-access]').textContent = fileButton.dataset.access;
      return;
    }

    const meeting = target.closest('[data-event]');
    if (meeting) {
      const pop = meeting.parentElement.querySelector('[data-event-pop]');
      const open = meeting.getAttribute('aria-expanded') !== 'true';
      meeting.setAttribute('aria-expanded', String(open));
      pop.hidden = !open;
      return;
    }

    const toTask = target.closest('[data-to-task]');
    if (toTask) { toTask.closest('[data-inbox]').classList.toggle('is-converted'); return; }

    const mark = target.closest('[data-mark="owner"], [data-mark="due"]');
    if (mark) {
      const markup = mark.closest('[data-markup]');
      const on = mark.getAttribute('aria-pressed') !== 'true';
      markup.classList.add('is-done');
      mark.setAttribute('aria-pressed', String(on));
      markup.querySelector(`[data-field="${mark.dataset.mark}"]`).classList.toggle('is-empty', !on);
      const has = (key) => markup.querySelector(`[data-mark="${key}"]`).getAttribute('aria-pressed') === 'true';
      markup.querySelector('[data-markup-reply]').textContent = markupReply(has('owner'), has('due'), (ar, en) => (document.documentElement.lang === 'en' ? en : ar));
      return;
    }

    const answer = target.closest('[data-permit-answer]');
    if (answer) {
      const permit = answer.closest('[data-permit]'), done = permit.querySelector('[data-permit-done]');
      permit.querySelector('[data-permit-ask]').hidden = true;
      done.hidden = false;
      done.textContent = done.dataset[answer.dataset.permitAnswer];
      return;
    }

    const deckNext = target.closest('[data-deck-next]');
    const card = deckNext ? (() => { const all = [...deckNext.closest('[data-deck]').querySelectorAll('[data-card]')]; return all.find((c) => c.style.getPropertyValue('--k') === '1') ?? all[1]; })() : target.closest('[data-card]');
    if (card) {
      const deck = card.closest('[data-deck]'), cards = [...deck.querySelectorAll('[data-card]')];
      const order = [cards.indexOf(card), ...cards.map((_, i) => i).filter((i) => i !== cards.indexOf(card))];
      order.forEach((i, k) => { cards[i].style.setProperty('--k', String(k)); cards[i].setAttribute('aria-pressed', String(k === 0)); });
      return;
    }

    const filter = target.closest('[data-filter]');
    if (filter) {
      const directory = filter.closest('[data-directory]');
      directory.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === filter)));
      directory.querySelectorAll('.directory__grid li').forEach((li) => { li.hidden = filter.dataset.filter !== 'all' && li.dataset.kind !== filter.dataset.filter; });
    }
  });

  content.addEventListener('change', (event) => {
    const list = event.target.closest('[data-checklist]');
    if (!list) return;
    const boxes = [...list.querySelectorAll('input[type="checkbox"]')], done = boxes.filter((b) => b.checked).length;
    list.querySelector('.review__ring').style.setProperty('--p', String(done / boxes.length));
    list.querySelector('[data-checklist-count]').textContent = `${done}/${boxes.length}`;
  });

}

/** Runs after every render: the pens, or the About grid, draw once they scroll into view. */
export function mountFeaturePage(content) {
  const markup = content.querySelector('[data-markup], [data-commits]');
  if (!markup || !('IntersectionObserver' in window)) return;
  markup.classList.add('can-run');
  const watch = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { markup.classList.add('is-run'); watch.disconnect(); } }, { threshold: 0.3 });
  watch.observe(markup);
}
