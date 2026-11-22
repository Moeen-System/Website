// Landing page. Arabic is the static HTML; English comes from this file. The switches swap
// words, labels, artwork and the real product captures. Menus and answers animate;
// everything rests under reduced motion.
const EN = {
  sys_kicker: "The platform at a glance", sys_title: "Why Moeen?",
  p1: "One system for people and agents.", p1s: "Your team and ai-moeen work on the same records within their permissions.",
  p2: "Your everyday tools in one place.", p2s: "Plan tasks and keep chat, meetings, and mail alongside your team’s files.",
  p3: "One knowledge base for AI.", p3s: "ai-moeen can draw on the work documents you’re allowed to see.",
  p4: "Connect the tools you already use.", p4s: "Bring in Gmail or Outlook accounts as your team needs them.",
  p5: "Built for Arabic from the start.", p5s: "A right-to-left interface you can switch to English at any time.",
  hybrid_intro: "Moeen is designed for people and AI agents in equal measure. Your team chooses what to handle itself and what to delegate, working in one workspace on the same records. Permissions, approvals, and an audit trail are built into each action, whoever carries it out.",
  feedback_title: "Client feedback",
  feedback_sample: "Sample testimonial",
  feedback_copy: "“We ask ai-moeen to turn our discussions into tasks, then review the work from the same place before anything goes out.”",
  feedback_client: "Reem Al-Harbi",
  feedback_role: "Operations lead · Sample client",
  desktop_alt: "The Moeen workspace showing a task list and ai-moeen",
  desktop_title: "Open Moeen on your device.",
  desktop_intro: "Choose the installer for your device, or open your workspace in the browser.",
  work_rail: "Workspace chapters",
  work_detail_alt_3_1: "The Moeen audit log",
  work_detail_copy_3_1: "Check the log to see what ran and who ran it.",
  work_detail_title_3_1: "Check the result of delegated work",
  work_detail_alt_3_0: "A written request in the ai-moeen composer",
  work_detail_copy_3_0: "Describe what you need, and include the due date or owner when it matters.",
  work_detail_title_3_0: "Ask in Arabic or English",
  work_main_alt_3: "A request to ai-moeen followed by its action plan",
  work_summary_3: "Message ai-moeen privately for individual requests, or mention it in a channel when the team should see the request.",
  work_title_3: "Delegate from the conversation you’re in.",
  work_detail_alt_2_1: "A team card with its members and tasks",
  work_detail_copy_2_1: "Give each follow-up an owner so the team knows who’s handling it.",
  work_detail_title_2_1: "Assign what you agreed to do",
  work_detail_alt_2_0: "A task moving between work statuses",
  work_detail_copy_2_0: "Keep the follow-ups visible on the team’s board.",
  work_detail_title_2_0: "Track the action items",
  work_main_alt_2: "One meeting branching into three follow-up tasks",
  work_summary_2: "Set the time and attendees, then turn decisions into tasks the team can follow.",
  work_title_2: "Give every meeting a clear follow-up.",
  work_detail_alt_1_1: "An email connected to a task creation action",
  work_detail_copy_1_1: "When a message needs a reply or review, add the follow-up to the board as a task.",
  work_detail_title_1_1: "Know which messages need follow-up",
  work_detail_alt_1_0: "A channel request followed by an ai-moeen reply and a task",
  work_detail_copy_1_0: "Ask ai-moeen to capture what you agreed and assign the task to the person following up.",
  work_detail_title_1_0: "Agree on who owns the follow-up",
  work_main_alt_1: "A team conversation in a Moeen channel",
  work_summary_1: "Pin what the team needs to refer to in the channel, and handle one-to-one discussions in direct messages.",
  work_title_1: "Give each conversation a place.",
  work_detail_alt_0_1: "A team connected to its members, channel and tasks",
  work_detail_copy_0_1: "Find the team’s members, tasks, and channel on one page.",
  work_detail_title_0_1: "Bring each team’s work together",
  work_detail_alt_0_0: "A task in three stages on the Moeen board",
  work_detail_copy_0_0: "As a task moves between stages, its details and owner stay with it.",
  work_detail_title_0_0: "Follow a task’s progress",
  work_main_alt_0: "The Moeen task board with columns for each stage of work",
  work_summary_0: "Group work by status and filter the board by team, assignee, or priority.",
  work_title_0: "A board that shows what needs attention.",
  work_nav_3: "Work with the agent",
  work_nav_2: "Meetings",
  work_nav_1: "Chat and mail",
  work_nav_0: "Tasks and teams",
  skip: 'Skip to content', home: 'Moeen, home', name: 'Moeen', main_nav: 'Main', menu: 'Menu', footer_nav: 'Site links',
  nav_pricing: 'Pricing', nav_changelog: 'Changelog', nav_roadmap: 'Roadmap',
  nav_changelog_s: 'New features, improvements and fixes', nav_roadmap_s: 'What we’re building and what’s planned',
  nav_product: 'Product', nav_customers: "Workspaces", nav_resources: 'Resources', nav_modules: 'Modules', nav_tools: 'Workspace tools',
  nav_download: 'Download', nav_download_s: 'The desktop app for macOS and Windows', nav_faq: 'Questions', nav_faq_s: 'What works in the beta',
  nav_waitlist: 'Waitlist', nav_waitlist_s: 'Get an invitation for your team',
  login: 'Log in', cta: 'Join the waitlist', language_short: 'ع', preview: 'Preview',
  mega_modules: 'Moeen modules', mega_ai: 'ai-moeen inside your workspace',
  m_tasks: 'Tasks', m_tasks_s: 'Lists and boards with owners and dates',
  m_chat: 'Chat', m_chat_s: 'Channels and direct messages',
  m_teams: 'Teams', m_teams_s: 'A team’s members, tasks and channel',
  m_audit: 'Audit log', m_audit_s: 'Every change and who made it',
  m_meetings: 'Meetings', m_meetings_s: 'Schedule, notes and follow-ups',
  m_mail: 'Mail', m_mail_s: 'Your inbox next to your tasks',
  mega_board: 'The task board', mega_board_s: 'Follow your team’s work from to do to done.',
  t1: 'Ask in your words', t2: 'Action plan', t3: 'Approvals',
  mega_t1: 'From a written request to an action', mega_t2: 'Every action before and after it runs',
  mega_t3: 'Deletes and sends wait for a person', mega_t4: 'What ai-moeen did and who approved it',
  mega_skills: 'Skills', mega_skills_s: 'Instructions ai-moeen reuses', mega_search: 'Search', mega_search_s: 'Find or run anything from anywhere',
  mega_plan: 'ai-moeen creates a task', mega_plan_s: 'One request, and a step that carries its mark.',
  badge: 'The beta is open by invitation',
  h1_a: "A workspace shared by your team and its AI agents.", h1_b: "Tasks, conversations, and files stay together, giving ai-moeen context when you delegate work.",
  platform_title: "How work moves across Moeen",
  platform_tasks: "What’s left before launch?",
  platform_tasks_copy: "Follow the launch checklist review on the board to see what’s done and what’s still in progress.",
  platform_chat: "Clear ownership from a team discussion",
  platform_chat_copy: "Omar takes on the review in the channel. ai-moeen records the task and assigns it to him.",
  platform_mail: "Follow up on a subscription offer",
  platform_mail_copy: "Keep the notes and proposal file in the email and track the reply as a separate task.",
  platform_audit: "See who changed the board",
  platform_audit_copy: "When a task changes owner or status, the audit log shows what changed and who changed it.",
  c1: 'All the work in one place', c1s: 'Every part of your team’s work in one system, sharing data and permissions instead of scattering across tools.',
  c2: 'Talk next to the work', c2s: 'Discussion and decisions in the same place the work happens, not in another app.',
  c3: 'Every change leaves a trace', c3s: 'The audit log keeps what every person and every agent did, when, and who approved it.',
  sec_a: "Control your workspace data.", sec_b: "Know who has access.", sec_more: "Data hosting details",
  sec_1: "Choose where your data is stored", sec_1s: "We plan to offer a choice of storage region. Beta data is currently hosted in Frankfurt, Germany.", sec_2: 'Roles and permissions', sec_2s: "Set what each member can view and change.", sec_3s: "Review the workspace’s action history to see who did what and when.",
  nav_platform: 'Platform', nav_system: "Agentic-hybrid architecture", nav_system_s: "Shared actions for teams and agents", nav_security: 'Security',
  hero_download: 'Get the desktop app',
  app_alt: 'Moeen’s task list beside ai-moeen, which has just created a task',
  logos_label: "Example workspaces",
  ai_title: "ai-moeen starts with your team’s context.",
  ai_library_alt: "Shared launch files in the Moeen library",
  ai_request_alt: "A request in the product channel to summarize what remains before launch and create missing tasks",
  ai_response_alt: "A demo reply from ai-moeen summarizing what remains before launch and attaching a new task",
  ai_context_title: "Shared knowledge the agent can draw on",
  ai_context_copy: "On Pro, ai-moeen can use Moeen documents and conversations that you have permission to see.",
  ai_actions_title: "Turn information into a task",
  ai_actions_copy: "Ask the agent to summarize what’s left before launch, then delegate task creation from the same conversation.",
  ai_control_title: "Your team stays in control",
  ai_control_copy: "When an action needs approval, a person reviews its details before it runs. The audit log records who requested it and who carried it out.",
  audit_alt: 'The Moeen audit log',
  mod_a: 'All of your team’s work in one system.', mod_b: 'Modules that share data, permissions and the audit log, with ai-moeen working in all of them.',
  pr_a: "Our vision for Moeen", pr_b: "What we aim for in each release", prev: 'Previous', next: 'Next',
  pr1: "Polish you notice every day", pr1s: "We make the interface responsive and clear so your team can stay focused on the work, even on busy days.",
  pr2: "A goal of zero bugs", pr2s: "We aim for every release to reach you bug-free. We test the workflows teams depend on and prioritize fixing defects.",
  pr3: "Something new each week", pr3s: "We aim to ship updates weekly, introducing features and modules when they’re ready.",
  pr4: "Modules your team can rely on", pr4s: "We aim for each module to carry a workflow from start to finish, with the depth teams need for everyday work.",
  feat_eyebrow: 'Platform', feat_a: "See where work happens and how it’s progressing.", feat_b: "Each team has its own channel and tasks, with follow-ups close to the conversation.",
  f_ai_s: 'Ask in your own words; it plans and acts inside the workspace, and stops for your approval.', f_ai_s_alt: 'A request to ai-moeen and the action plan it ran',
  f_chat: 'Chat', f_chat_s: 'Channels and direct messages for your team, with replies and reactions, and ai-moeen in the conversation.', f_chat_s_alt: 'A chat channel in Moeen',
  f_tasks: 'Tasks', f_tasks_s: 'Lists and boards, each task with an owner, a priority, a date and a status.', f_tasks_s_alt: 'A task list in Moeen',
  f_teams: 'Teams', f_teams_s: 'Each team with its members, tasks and channel in one place.', f_teams_s_alt: 'The teams list in Moeen',
  f_meet: 'Meetings', f_meet_s: 'The time and the people, with action items that become tasks.', f_meet_s_alt: 'A meeting and the action items from it',
  f_mail: 'Mail', f_mail_s: 'Your inbox next to your work, where any message can become a task.', f_mail_s_alt: 'An email with a button to turn it into a task',
  int_eyebrow: 'Integrations', int_a: "Keep your accounts connected to the workspace.", int_b: "Follow your email and calendar in Moeen.",
  int_lead: "Connect Gmail or Outlook to follow your messages, and add Google Calendar for your schedule. Available features depend on the app and the permissions you grant when connecting.",
  board_alt: 'The Moeen work board', chat_alt: 'A Moeen chat channel', meetings_alt: 'The Moeen meetings list', mail_alt: 'An email in Moeen', teams_alt: 'The Moeen teams list',
  bcta: 'Start with your team from the waitlist.', bctas: 'Your invitation comes to your work email.',
  tools_title_a: 'Fewer subscriptions.',
  tools_title_b: 'One workspace for your team.',
  tools_lead: 'Bring your everyday tools into Moeen so you can follow up where the conversation started.',
  tools_alt: 'Moeen’s workspace with its task list, team tools, and ai-moeen',
  tools_phone: 'Calls',
  tools_phone_detail: 'Voice and video calls.',
  tools_meetings: 'Meetings',
  tools_meetings_detail: 'Schedule meetings and track follow-ups.',
  tools_chat: 'Messages',
  tools_chat_detail: 'Team channels and direct messages.',
  tools_tasks: 'Tasks',
  tools_tasks_detail: 'Boards for deadlines and ownership.',
  tools_mail: 'Email',
  tools_mail_detail: 'Connect Gmail or Outlook.',
  tools_folder: 'Files',
  tools_folder_detail: 'Share files with the people who need them.',
  st_a: 'Start with your team in three steps.', st_b: 'Set up the workspace around the way you work.',
  s1: 'Add your teammates.', s1s: 'Invite teammates to the workspace and choose each person’s role when you send the invitation.',
  s2: 'Tell ai-moeen about your business.', s2s: 'On Pro, add company details, team responsibilities, and ways of working that ai-moeen can refer to.',
  s3: 'Create teams and projects.', s3s: 'Give each project its own team with its members, channel, and tasks in one place.',
  start_pause: 'Pause step rotation', start_play: 'Resume step rotation',
  dl_mac: "Apple silicon Macs", dl_mac_cta: "Download for macOS", dl_win: "64-bit Windows", dl_win_cta: "Download for Windows",
  dl_web: "Web", dl_web_s: "Any current browser", dl_web_cta: "Open Moeen in your browser",
  faq_a: 'Questions about the beta.', faq_b: 'What works today, and what comes later.',
  fq1: 'When can I use Moeen?', fa1: 'We send invitations from the waitlist, to the email address you joined with.',
  fq2: "What works in the beta?", fa2: "Tasks, teams, conversations, and files are saved in the workspace. Mail and calendar work with supported connected accounts. ai-moeen features require workspace setup.",
  fq3: "What does ai-moeen use to answer questions?", fa3: "On Pro, ai-moeen can refer to Moeen documents and conversations you can access. In channels, it uses sources available to the participants.",
  fq4: "Can I choose where my data is stored?", fa4: "The beta is currently hosted in Frankfurt. A choice of storage region is planned.",
  fq5: "Can I connect any app?", fa5: "Connections depend on app support and account permissions. The beta supports selected apps. Our goal is to let you connect any tool your team depends on.",
  cta_a: 'The waitlist is open.', cta_b: 'Add your work email and we will write when your invitation is ready.',
  footer_line: "An Arabic-first workspace for your team and its AI agents.", footer_releases: 'Releases on GitHub', footer_start: 'Get started',
  legal: '© 2026 Moeen', trademarks: 'Product names and logos are trademarks of their owners.', footer_lang: 'العربية',
};
const EXTRA = {
  ar: { title: 'مُعين | مساحة عمل لفريقك ووكلاء الذكاء الاصطناعي', language: 'Switch to English', dark: 'التبديل إلى المظهر الداكن', light: 'التبديل إلى المظهر الفاتح' },
  en: { title: 'Moeen | A workspace for people and AI agents', language: 'التبديل إلى العربية', dark: 'Switch to dark theme', light: 'Switch to light theme' },
};

const root = document.documentElement;
const still = matchMedia('(prefers-reduced-motion: reduce)');
const AR = { text: {}, label: {}, alt: {} };
document.querySelectorAll('[data-i18n]').forEach((node) => { AR.text[node.dataset.i18n] ??= node.textContent; });
document.querySelectorAll('[data-i18n-label]').forEach((node) => { AR.label[node.dataset.i18nLabel] ??= node.getAttribute('aria-label'); });
document.querySelectorAll('[data-i18n-alt]').forEach((node) => { AR.alt[node.dataset.i18nAlt] ??= node.alt; });

let locale = root.lang === 'en' ? 'en' : 'ar';
let theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
// "ai-moeen" never breaks at its hyphen: U+2011 is a non-breaking hyphen.
const keepWhole = (text) => text.replaceAll('ai-moeen', 'ai‑moeen');
const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
const pick = (key, store) => (locale === 'en' ? EN[key] ?? store[key] : store[key]);

function render() {
  const extra = EXTRA[locale];
  root.lang = locale;
  root.dir = locale === 'en' ? 'ltr' : 'rtl';
  root.dataset.theme = theme;
  document.title = extra.title;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0e0e0f' : '#fafafa';
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = keepWhole(pick(node.dataset.i18n, AR.text)); });
  document.querySelectorAll('[data-i18n-label]').forEach((node) => { node.setAttribute('aria-label', pick(node.dataset.i18nLabel, AR.label)); });
  if (locale === 'ar') document.querySelectorAll(SWASH).forEach(swash);
  document.querySelectorAll('[data-i18n-alt]').forEach((node) => { node.alt = pick(node.dataset.i18nAlt, AR.alt); });
  document.querySelectorAll('img[data-light]').forEach((node) => { const src = node.dataset[theme]; if (!node.src.endsWith(src)) node.src = src; });
  document.querySelectorAll('img[data-shot]').forEach((node) => {
    const src = `/assets/shots2/${node.dataset.shot}_${node.dataset.locale ?? locale}_${theme}.png`;
    if (!node.src.endsWith(src)) node.src = src;
  });
  const language = document.querySelector('[data-language]');
  language.setAttribute('aria-label', extra.language);
  language.title = extra.language;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const label = theme === 'dark' ? extra.light : extra.dark;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  root.classList.remove('i18n-pending');
}
// Arabic headlines end on Thmanyah's swash: only the last word of the lead phrase stretches
// its final letter, so the line closes on one long connected stroke.
const SWASH = 'h1 > span:first-child, h2 > span:first-child:not(.dim)';
function swash(node) {
  const match = node.textContent.match(/^(.*?)(\S+?)([.،؛؟!»]*)$/s);
  if (!match || !match[2]) return;
  const word = document.createElement('span');
  word.className = 'swash';
  word.textContent = match[2];
  node.replaceChildren(match[1], word, match[3]);
}
// Language and theme changes crossfade where the browser supports view transitions.
const change = (update) => { if (document.startViewTransition && !still.matches) document.startViewTransition(() => { update(); render(); }); else { update(); render(); } };
const switchLanguage = () => change(() => { locale = locale === 'ar' ? 'en' : 'ar'; save('moeen.landing.locale', locale); });
document.querySelector('[data-language]').addEventListener('click', switchLanguage);
document.querySelector('[data-language-footer]').addEventListener('click', switchLanguage);
document.querySelector('[data-theme-toggle]').addEventListener('click', () => change(() => { theme = theme === 'dark' ? 'light' : 'dark'; save('moeen.landing.theme', theme); }));

// ---- The mega menu: one panel that resizes and slides between views ------------------
const mega = document.getElementById('mega'), frame = mega.querySelector('.mega__frame');
const triggers = [...document.querySelectorAll('[data-mega]')];
const views = Object.fromEntries([...mega.querySelectorAll('.mega__view')].map((view) => [view.dataset.view, view]));
const hoverable = matchMedia('(hover: hover) and (pointer: fine)');
let current = null, closeTimer, openTimer;

function place(trigger) {
  const bar = trigger.closest('.nav__bar').getBoundingClientRect(), box = trigger.getBoundingClientRect();
  const width = views[trigger.dataset.mega].offsetWidth;
  const start = locale === 'en' ? box.left - bar.left - 8 : bar.right - box.right - 8;
  mega.style.setProperty('--x', `${Math.max(0, Math.min(start, bar.width - width))}px`);
}
function openMega(name) {
  clearTimeout(closeTimer);
  const trigger = triggers.find((t) => t.dataset.mega === name), next = views[name];
  const previous = current;
  if (previous === name) return;
  const order = triggers.map((t) => t.dataset.mega);
  const direction = previous ? Math.sign(order.indexOf(name) - order.indexOf(previous)) * (locale === 'en' ? 1 : -1) : 0;
  triggers.forEach((t) => t.setAttribute('aria-expanded', String(t === trigger)));
  mega.hidden = false;
  for (const [key, view] of Object.entries(views)) {
    view.classList.toggle('is-on', key === name);
    view.classList.toggle('from-start', key === name && direction < 0);
    view.classList.toggle('from-end', key === name && direction > 0);
    view.inert = key !== name;
  }
  frame.style.width = `${next.offsetWidth}px`;
  frame.style.height = `${next.offsetHeight}px`;
  place(trigger);
  mega.classList.toggle('is-moving', Boolean(previous));
  requestAnimationFrame(() => mega.classList.add('is-open'));
  current = name;
}
function closeMega() {
  if (!current) return;
  mega.classList.remove('is-open', 'is-moving');
  triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
  current = null;
  closeTimer = setTimeout(() => { if (!current) mega.hidden = true; }, 220);
}
for (const trigger of triggers) {
  trigger.addEventListener('click', () => (current === trigger.dataset.mega ? closeMega() : openMega(trigger.dataset.mega)));
  trigger.addEventListener('mouseenter', () => { if (!hoverable.matches) return; clearTimeout(openTimer); openTimer = setTimeout(() => openMega(trigger.dataset.mega), current ? 0 : 110); });
  trigger.addEventListener('mouseleave', () => { clearTimeout(openTimer); if (hoverable.matches) closeTimer = setTimeout(closeMega, 180); });
}
mega.addEventListener('mouseenter', () => clearTimeout(closeTimer));
mega.addEventListener('mouseleave', () => { if (hoverable.matches) closeTimer = setTimeout(closeMega, 180); });
mega.addEventListener('click', (event) => { const link = event.target.closest('a'); if (!link) return; closeMega(); });
document.addEventListener('click', (event) => { if (!event.target.closest('.mega, [data-mega]')) closeMega(); });
document.querySelector('.nav__menu').addEventListener('focusout', (event) => { if (!event.relatedTarget?.closest?.('.mega, .nav__menu')) setTimeout(() => { if (!mega.contains(document.activeElement)) closeMega(); }, 0); });
mega.addEventListener('focusout', (event) => { if (!event.relatedTarget?.closest?.('.mega, [data-mega]')) closeMega(); });

// ---- Workspace setup: keep each step in focus for five seconds ---------------------------
const setup = document.getElementById('start');
if (setup) {
  const track = setup.querySelector('.start-steps');
  const steps = [...track.querySelectorAll('.start-step')];
  const playback = setup.querySelector('.start-playback');
  const compact = matchMedia('(max-width: 659px)');
  let active = 0, playing = !still.matches, visible = false, timer, settleTimer;

  function scheduleStep() {
    clearTimeout(timer);
    if (playing && visible && !document.hidden && !track.matches(':focus-within')) {
      timer = setTimeout(() => showStep((active + 1) % steps.length), 5000);
    }
  }
  function setPlaying(value) {
    playing = value;
    playback.toggleAttribute('data-paused', !playing);
    scheduleStep();
  }
  function leadingEdge(node) {
    const bounds = node.getBoundingClientRect();
    return root.dir === 'rtl' ? bounds.right : bounds.left;
  }
  function showStep(index, scroll = true) {
    active = index;
    steps.forEach((step, position) => {
      step.toggleAttribute('data-current', position === index);
      step.querySelector('button').setAttribute('aria-pressed', String(position === index));
    });
    if (compact.matches && scroll) {
      const distance = leadingEdge(steps[index]) - leadingEdge(track);
      track.scrollBy({ left: distance, behavior: 'auto' });
    }
    scheduleStep();
  }

  setup.setAttribute('data-setup-rotation', '');
  playback.hidden = false;
  setPlaying(playing);
  steps.forEach((step, index) => step.querySelector('button').addEventListener('click', () => {
    setPlaying(false);
    showStep(index);
  }));
  playback.addEventListener('click', () => setPlaying(!playing));
  track.addEventListener('focusin', scheduleStep);
  track.addEventListener('focusout', () => queueMicrotask(scheduleStep));
  track.addEventListener('pointerdown', event => {
    if (compact.matches && event.pointerType === 'touch') setPlaying(false);
  });
  track.addEventListener('scroll', () => {
    if (!compact.matches) return;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      const edge = leadingEdge(track);
      const nearest = steps.reduce((best, step, index) =>
        Math.abs(leadingEdge(step) - edge) < Math.abs(leadingEdge(steps[best]) - edge) ? index : best, active);
      if (nearest === active) return;
      setPlaying(false);
      showStep(nearest, false);
    }, 140);
  }, { passive: true });
  document.addEventListener('visibilitychange', scheduleStep);
  still.addEventListener('change', () => { if (still.matches) setPlaying(false); });
  compact.addEventListener('change', () => showStep(active));
  new MutationObserver(() => showStep(active)).observe(root, { attributeFilter: ['dir'] });
  new IntersectionObserver(([entry]) => {
    visible = entry.intersectionRatio >= .25;
    scheduleStep();
  }, { threshold: .25 }).observe(track);
}

// ---- Questions: answers open and close with their height -------------------------------
for (const details of document.querySelectorAll('.faq details')) {
  const summary = details.querySelector('summary'), body = details.querySelector('.faq__body');
  summary.addEventListener('click', (event) => {
    if (still.matches) return;
    event.preventDefault();
    if (details.dataset.moving) return;
    details.dataset.moving = '1';
    const opening = !details.open;
    if (opening) details.open = true;
    const height = body.scrollHeight;
    details.classList.toggle('is-open', opening);
    const run = body.animate(
      [{ height: opening ? '0px' : `${height}px`, opacity: opening ? 0 : 1 }, { height: opening ? `${height}px` : '0px', opacity: opening ? 1 : 0 }],
      { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    run.onfinish = () => { if (!opening) details.open = false; delete details.dataset.moving; };
  });
  details.classList.toggle('is-open', details.open);
}

// ---- Headings and pictures rise into place once, as they scroll in ---------------------
if (!still.matches && 'IntersectionObserver' in window) {
  root.classList.add('can-reveal');
  const seen = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); seen.unobserve(entry.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((node) => seen.observe(node));
}

// ---- Integrations: now and then a logo glides to an empty tile ---------------------------
const board = document.querySelector('[data-board]');
if (board && !still.matches) {
  const chips = [...board.querySelectorAll('.chip-logo')];
  const COLS = 10, ROWS = 3;
  let boardTimer;
  const hop = () => {
    const taken = new Set(chips.map((chip) => `${chip.style.getPropertyValue('--c')},${chip.style.getPropertyValue('--r')}`));
    const free = [];
    for (let c = 1; c <= COLS; c += 1) for (let r = 1; r <= ROWS; r += 1) if (!taken.has(`${c},${r}`)) free.push([c, r]);
    const chip = chips[Math.floor(Math.random() * chips.length)];
    const [c, r] = free[Math.floor(Math.random() * free.length)];
    chip.style.setProperty('--c', c); chip.style.setProperty('--r', r);
  };
  new IntersectionObserver(([entry]) => { clearInterval(boardTimer); if (entry.isIntersecting) boardTimer = setInterval(hop, 2200); }, { threshold: 0.3 }).observe(board);
}

// ---- Principles: the arrows move the track one card at a time --------------------------
const track = document.querySelector('.principles__track');
if (track) {
  const arrows = [...document.querySelectorAll('[data-principles]')];
  const step = () => track.querySelector('.principle').getBoundingClientRect().width;
  const update = () => {
    const max = track.scrollWidth - track.clientWidth, at = Math.abs(track.scrollLeft);
    arrows[0].disabled = at < 4; arrows[1].disabled = at > max - 4;
  };
  arrows.forEach((arrow) => arrow.addEventListener('click', () => {
    const forward = Number(arrow.dataset.principles);
    track.scrollBy({ left: forward * step() * (root.dir === 'rtl' ? -1 : 1), behavior: still.matches ? 'auto' : 'smooth' });
  }));
  track.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

// ---- The phone menu --------------------------------------------------------------------
const toggle = document.querySelector('.nav__toggle'), sheet = document.getElementById('sheet');
const setSheet = (open) => { toggle.setAttribute('aria-expanded', String(open)); sheet.hidden = !open; root.classList.toggle('sheet-open', open); };
toggle.addEventListener('click', () => setSheet(sheet.hidden));
sheet.addEventListener('click', (event) => { if (event.target.closest('a')) setSheet(false); });
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (current) { const trigger = triggers.find((t) => t.dataset.mega === current); closeMega(); trigger?.focus(); }
  if (!sheet.hidden) { setSheet(false); toggle.focus(); }
});
matchMedia('(min-width: 1024px)').addEventListener('change', (event) => { if (event.matches) setSheet(false); });

// Inline menu illustrations so their outlines follow the theme and can lift on hover.
async function inlineIso() {
  const cache = new Map();
  await Promise.all([...document.querySelectorAll('img[data-light*="/assets/iso/"]')].map(async (img) => {
    const url = img.dataset.light;
    if (!cache.has(url)) cache.set(url, fetch(url).then((r) => r.text()));
    const markup = await cache.get(url);
    const holder = document.createElement('div');
    holder.innerHTML = markup;
    const svg = holder.querySelector('svg');
    if (!svg) return;
    svg.setAttribute('class', img.className.replace('theme-img', '').trim());
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    img.replaceWith(svg);
  }));
}
inlineIso();
render();

// Keep the chapter rail in step with the reading position. Its links also work without JS.
const chapters = [...document.querySelectorAll('.work-chapter')];
const chapterRail = document.querySelector('.work-rail');
const chapterLinks = [...(chapterRail?.querySelectorAll('a') ?? [])];
function markChapter(id) {
  for (const link of chapterLinks) {
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
if (chapters.length && chapterRail) {
  const railAboveChapters = matchMedia('(max-width: 719px)');
  markChapter(chapters[0].id);
  let railVisible = false;
  let chapterFrame = 0;
  function queueChapter() {
    if (!railVisible || chapterFrame) return;
    chapterFrame = requestAnimationFrame(() => {
      chapterFrame = 0;
      const railEdge = railAboveChapters.matches ? chapterRail.getBoundingClientRect().bottom + 20 : 0;
      const readingLine = Math.max(window.innerHeight * .3, railEdge);
      let active = chapters[0];
      for (const chapter of chapters) {
        if (chapter.getBoundingClientRect().top > readingLine) break;
        active = chapter;
      }
      markChapter(active.id);
    });
  }
  const chapterObserver = new IntersectionObserver(([entry]) => {
    railVisible = entry.isIntersecting;
    queueChapter();
  });
  chapterObserver.observe(document.querySelector('.work-tour'));
  window.addEventListener('scroll', queueChapter, { passive: true });
  window.addEventListener('resize', queueChapter);
}

// Keep the fallback image if a drawing fails to load.
for (const image of document.querySelectorAll('[data-principle-art]')) {
  fetch(image.src).then(response => {
    if (!response.ok) return null;
    return response.text();
  }).then(markup => {
    if (!markup) return;
    const graphic = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
    if (graphic.localName !== 'svg') return;
    graphic.setAttribute('class', image.className);
    graphic.setAttribute('aria-hidden', 'true');
    graphic.setAttribute('focusable', 'false');
    image.replaceWith(graphic);
  }).catch(() => {});
}
