// The hybrid architecture page. Its signature piece is a simulator: choose who asks and what
// they ask for, and follow the request through the same five stops. The rules are the app's own:
// a person's request runs within their permissions, and a delete or a sharing change asked for by
// AI or MCP waits for a person. It is an illustration and never touches a workspace.
import { seam } from './frame.js';
import { ic, kit } from './feature_pages.js';

const ACTORS = ['person', 'ai', 'mcp'];
const ACTIONS = [['tasks.update', 'write'], ['tasks.delete', 'destructive'], ['data.share_items', 'sharing']];

const copy = (t) => ({
  actor: { person: t('سارة', 'Sara'), ai: 'ai-moeen', mcp: t('عميل MCP', 'MCP client') },
  from: { person: t('من الواجهة', 'From the interface'), ai: t('باسم سارة', 'On behalf of Sara'), mcp: t('من اتصال خارجي', 'From an external connection') },
  action: { 'tasks.update': t('تعديل مهمة', 'Edit a task'), 'tasks.delete': t('حذف مهمة', 'Delete a task'), 'data.share_items': t('مشاركة ملف', 'Share a file') },
  risk: { write: t('تعديل', 'Write'), destructive: t('حذف', 'Destructive'), sharing: t('تغيير وصول', 'Access change') },
  steps: [t('الطلب', 'Request'), t('الإجراء', 'Action'), t('الصلاحيات', 'Permissions'), t('الموافقة', 'Approval'), t('السجل', 'Record')],
  allowed: t('مسموح', 'Allowed'), outside: t('خارج نطاق الاتصال', 'Outside the connection’s scope'),
  skip: t('لا تلزم', 'Not required'), wait: t('تنتظر شخصاً', 'Waiting for a person'), approved: t('وافقت سارة', 'Approved by Sara'), rejected: t('رفضت سارة', 'Rejected by Sara'),
  done: t('نُفّذ', 'Done'), stopped: t('لم يُنفّذ', 'Not run'), pending: t('لم يُنفّذ بعد', 'Not run yet'),
});

/** What happens at each stop. `answer` is a person's decision on a waiting request. */
function trace(actor, action, answer, c) {
  const risk = Object.fromEntries(ACTIONS)[action];
  const inScope = !(actor === 'mcp' && action === 'data.share_items');
  const needs = actor !== 'person' && risk !== 'write';
  const request = [c.actor[actor], c.from[actor], 'ok'], act = [c.action[action], action, 'ok'];
  if (!inScope) return [request, act, [c.outside, '', 'stop'], ['', '', 'off'], [c.stopped, '', 'off']];
  const allowed = [c.allowed, '', 'ok'];
  if (!needs) return [request, act, allowed, [c.skip, '', 'skip'], [c.done, '', 'ok']];
  if (!answer) return [request, act, allowed, [c.wait, '', 'wait'], [c.pending, '', 'off']];
  return answer === 'yes' ? [request, act, allowed, [c.approved, '', 'ok'], [c.done, '', 'ok']] : [request, act, allowed, [c.rejected, '', 'stop'], [c.stopped, '', 'off']];
}

const ICONS = ['users', 'spark', 'key', 'shield', 'book'];

function stops(actor, action, answer, t) {
  const c = copy(t);
  return trace(actor, action, answer, c).map(([title, note, state], i) => `<li data-state="${state}" style="--i:${i}"><span class="sim__node">${ic(ICONS[i])}</span><small>${c.steps[i]}</small><b>${title || c.skip}</b>${note ? `<em${i === 1 ? ' dir="ltr"' : ''}>${note}</em>` : ''}</li>`).join('');
}

function record(actor, action, answer, t) {
  const c = copy(t), end = trace(actor, action, answer, c);
  const state = end[4][2] === 'ok' ? 'ok' : end[3][2] === 'wait' ? 'wait' : 'stop';
  const risk = Object.fromEntries(ACTIONS)[action];
  return `<span><i class="fp-av fp-av--sm fp-av--${actor === 'person' ? 'a' : actor === 'ai' ? 'ai' : 'd'}"></i>${c.actor[actor]}</span><code dir="ltr">${action}</code><span class="fp-tag">${c.risk[risk]}</span><span class="sim__result" data-state="${state}">${end[4][0]}</span>`;
}

export function architecturePage(locale) {
  const { t, L, hero, h2, blocks } = kit('architecture', locale);
  const c = copy(t);
  const picks = (name, list, labels) => `<div class="sim__pick" role="group" aria-label="${name}"><span>${name}</span>${list.map((id, i) => `<button type="button" data-sim-${labels === c.actor ? 'actor' : 'action'}="${id}" aria-pressed="${i === (labels === c.actor ? 1 : 1)}">${labels[id]}</button>`).join('')}</div>`;
  const context = [
    ['at', t('المحادثة', 'The conversation'), t('ما كُتب في النقاش المتاح لمن طلب.', 'What was written in the discussion the requester can open.')],
    ['task', t('سجلات العمل', 'Work records'), t('المهام والمواعيد والمسؤولون ضمن صلاحيته.', 'Tasks, dates and owners within their permissions.')],
    ['book', t('قاعدة المعرفة', 'Knowledge base'), t('المستندات المسموح بقراءتها، في خطة برو.', 'Documents they’re allowed to read, on Pro.')],
  ];
  const stale = [
    [t('طلب', 'Request'), t('يقترح الوكيل نقل مجلد، وينتظر موافقتك.', 'The agent proposes moving a folder and waits for you.')],
    [t('تغيّر', 'Change'), t('يضيف زميل ملفات إلى المجلد قبل أن توافق.', 'A teammate adds files to it before you approve.')],
    [t('توقّف', 'Stop'), t('الموافقة مرتبطة بالمحتوى الذي رأيته، فلا تُطبّق على غيره.', 'Approval is tied to the content you saw, so it doesn’t apply to the new one.')],
    [t('طلب جديد', 'New request'), t('تراجع المحتوى الحالي، ثم تقرّر.', 'You review the current content, then decide.')],
  ];
  return `<div class="fp fp--arch">
    <header class="fp-hero fp-hero--center">${hero(t('يعمل الجميع على السجلات نفسها، وتُراعى الصلاحيات والموافقات في كل إجراء.', 'Everyone works on the same records, with permissions and approvals on every action.'))}</header>
    <section class="sim" data-sim data-actor="ai" data-action="tasks.delete" aria-label="${t('محاكاة مسار الطلب', 'Request path simulation')}">
      <div class="sim__bar">${picks(t('من يطلب؟', 'Who asks?'), ACTORS, c.actor)}${picks(t('ماذا يطلب؟', 'For what?'), ACTIONS.map(([id]) => id), c.action)}</div>
      <ol class="sim__path" data-sim-path>${stops('ai', 'tasks.delete', '', t)}</ol>
      <div class="sim__gate" data-sim-gate><span>${t('الطلب بانتظار قرارك', 'This request is waiting for you')}</span><button type="button" data-sim-answer="yes">${t('موافقة', 'Approve')}</button><button type="button" data-sim-answer="no">${t('رفض', 'Reject')}</button></div>
      <div class="sim__log"><small>${t('سجل التدقيق', 'Audit log')}</small><p data-sim-record aria-live="polite">${record('ai', 'tasks.delete', '', t)}</p></div>
    </section>

    ${seam('hatch')}
    <section class="co-section">${h2(t('المهمة نفسها من مدخلين', 'One task, two entry points'), t('يتغيّر المدخل، ويبقى السجل واحداً.', 'The entry point changes. The record doesn’t.'))}
      <div class="co-cells co-cells--2 doors">
        <article><div class="doors__ui"><div class="kb-card"><div class="kb-card__top"><span dir="ltr">APP-148</span><span class="fp-av fp-av--sm fp-av--b"></span></div><h3>${t('مراجعة شاشة الترحيب', 'Review the welcome screen')}</h3><span class="fp-tag fp-tag--blue">${t('المسؤول: عمر', 'Owner: Omar')}</span></div></div>
          <h3>${t('من اللوحة', 'From the board')}</h3><p>${t('تفتح المهمة وتختار المسؤول، ويُنفَّذ التغيير باسمك.', 'You open the task, choose the owner, and the change runs as you.')}</p></article>
        <article><div class="doors__ui"><div class="doors__msg"><span class="fp-av fp-av--sm fp-av--a"></span><p>${t('أسنِد مراجعة شاشة الترحيب إلى عمر.', 'Assign the welcome screen review to Omar.')}</p></div><div class="doors__msg doors__msg--ai"><span class="fp-av fp-av--sm fp-av--ai"></span><p>${t('أسندتُ المهمة إلى عمر.', 'I assigned the task to Omar.')}</p></div></div>
          <h3>${t('من المحادثة', 'From the conversation')}</h3><p>${t('تطلب من ai-moeen، فينفّذ الإجراء نفسه ضمن صلاحياتك ويظهر باسمه.', 'You ask ai-moeen. It runs the same action within your permissions, labeled as its own.')}</p></article>
      </div></section>

    ${seam('dots')}
    <section class="co-section">${h2(L(blocks[1].title), t('ثلاثة مصادر، وكلها ضمن صلاحيات من طلب.', 'Three sources, all within the requester’s permissions.'))}
      <div class="co-cells co-cells--3 ctx">${context.map(([icon, name, body]) => `<article><span class="ctx__icon">${ic(icon)}</span><h3>${name}</h3><p>${body}</p></article>`).join('')}</div></section>

    ${seam('cross')}
    <section class="co-section">${h2(t('إذا تغيّر السجل قبل أن توافق', 'When the record changes before approval'))}
      <ol class="stale">${stale.map(([name, body], i) => `<li${i === 2 ? ' class="is-stop"' : ''}><span></span><h3>${name}</h3><p>${body}</p></li>`).join('')}</ol></section>

    ${seam('dash')}
    <section class="fp-scene audit-scene"><div>${h2(L(blocks[2].title))}<p>${L(blocks[2].body)}</p></div><img class="audit-scene__shot" data-shot="audit" src="/assets/shots2/audit_${locale}_light.png" alt="${t('سجل التدقيق في مساحة عمل تجريبية', 'Audit log in a demo workspace')}" width="1520" height="960" loading="lazy" decoding="async"></section>
  </div>`;
}

function refresh(sim, answer) {
  const t = (ar, en) => (document.documentElement.lang === 'en' ? en : ar);
  const { actor, action } = sim.dataset;
  const path = sim.querySelector('[data-sim-path]');
  path.innerHTML = stops(actor, action, answer, t);
  path.classList.remove('is-run'); void path.offsetWidth; path.classList.add('is-run');
  sim.querySelector('[data-sim-record]').innerHTML = record(actor, action, answer, t);
  sim.querySelector('[data-sim-gate]').hidden = !path.querySelector('[data-state="wait"]');
  for (const key of ['actor', 'action']) sim.querySelectorAll(`[data-sim-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute(`data-sim-${key}`) === sim.dataset[key])));
}

export function initArchitecturePage(content) {
  content.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sim-actor], [data-sim-action], [data-sim-answer]');
    if (!button) return;
    const sim = button.closest('[data-sim]');
    if (button.dataset.simActor) sim.dataset.actor = button.dataset.simActor;
    if (button.dataset.simAction) sim.dataset.action = button.dataset.simAction;
    refresh(sim, button.dataset.simAnswer ?? '');
  });
}
