import { copy, pageLead, pageTitle, renderContent, validFeed } from './product_content.js';
import { initNavigation } from './navigation.js';

const root = document.documentElement;
const page = root.dataset.productPage;
const content = document.querySelector('[data-product-content]');
const language = document.querySelector('[data-language]');
const themeButton = document.querySelector('[data-theme-toggle]');
const renderNavigation = initNavigation();
const context = JSON.parse(document.getElementById('product-data').textContent);
let locale = root.lang === 'en' ? 'en' : 'ar';
let theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
let cadence = 'annual';

function store(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

function applyTheme() {
  root.dataset.theme = theme;
  renderNavigation(locale, theme);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#131313' : '#fafafa';
  for (const image of document.querySelectorAll('img[data-shot]')) {
    const src = `/assets/shots2/${image.dataset.shot}_${locale}_${theme}.png`;
    if (image.getAttribute('src') !== src) image.src = src;
  }
  for (const image of document.querySelectorAll('img[data-light]')) {
    if (image.getAttribute('src') !== image.dataset[theme]) image.src = image.dataset[theme];
  }
}

function applyCadence() {
  for (const input of content.querySelectorAll('input[name="cadence"]')) input.checked = input.value === cadence;
  for (const price of content.querySelectorAll('[data-rate]')) price.hidden = price.dataset.rate !== cadence;
}

function openLinkedRelease() {
  const release = document.getElementById(location.hash.slice(1));
  const archive = release?.closest('.release-archive');
  if (!archive || archive.open) return;
  archive.open = true;
  release.scrollIntoView();
}

function updateContent() {
  content.innerHTML = renderContent(page, locale, context);
  if (page === 'pricing') applyCadence();
  applyTheme();
  if (page === 'changelog') openLinkedRelease();
}

function applyLanguage(rebuild = true) {
  const text = copy(locale);
  root.lang = locale;
  root.dir = locale === 'ar' ? 'rtl' : 'ltr';
  const title = pageTitle(page, locale), description = pageLead(page, locale);
  document.title = `${title} | ${text.brand}`;
  document.querySelector('meta[name="description"]').content = description;
  const heading = document.querySelector('[data-page-heading]');
  if (heading) {
    heading.textContent = title;
    document.querySelector('[data-page-lead]').textContent = description;
  }
  for (const node of document.querySelectorAll('[data-page-text]')) node.textContent = text[node.dataset.pageText];
  if (rebuild) updateContent();
  else applyTheme();
  root.classList.remove('i18n-pending');
}

function toggleLanguage() {
  locale = locale === 'ar' ? 'en' : 'ar';
  store('moeen.landing.locale', locale);
  const url = new URL(location.href);
  url.searchParams.set('lang', locale);
  history.replaceState(null, '', url);
  applyLanguage();
}
language.addEventListener('click', toggleLanguage);
document.querySelector('[data-language-footer]').addEventListener('click', toggleLanguage);

themeButton.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  store('moeen.landing.theme', theme);
  applyTheme();
});

if (page === 'support') {
  content.addEventListener('input', event => {
    if (!event.target.matches('[data-help-search]')) return;
    const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase(locale);
    const query = normalize(event.target.value.trim());
    const topics = [...content.querySelectorAll('.story-resources li')];
    for (const topic of topics) topic.hidden = !normalize(topic.textContent).includes(query);
    content.querySelector('[data-help-empty]').hidden = topics.some(topic => !topic.hidden);
  });
}

if (page === 'pricing') {
  content.addEventListener('change', event => {
    if (!event.target.matches('input[name="cadence"]')) return;
    cadence = event.target.value;
    applyCadence();
  });
}

if (page === 'changelog') {
  addEventListener('hashchange', openLinkedRelease);
  openLinkedRelease();
}

if (page === 'roadmap') {
  let pending = false;
  async function refreshRoadmap() {
    if (pending || document.hidden) return;
    pending = true;
    const previous = JSON.stringify(context.feed);
    const status = context.status;
    try {
      const response = await fetch(context.origin + '/roadmap.json', { credentials: 'omit', signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Roadmap unavailable');
      const feed = await response.json();
      if (!validFeed('roadmap', feed)) throw new Error('Unsupported roadmap feed');
      context.feed = feed;
      context.status = 'ready';
    } catch {
      context.status = 'error';
    } finally {
      pending = false;
    }
    if (previous !== JSON.stringify(context.feed) || status !== context.status) updateContent();
  }
  content.addEventListener('click', event => {
    if (event.target.closest('[data-retry]')) void refreshRoadmap();
  });
  void refreshRoadmap();
  setInterval(refreshRoadmap, 60_000);
  document.addEventListener('visibilitychange', refreshRoadmap);
}

applyLanguage(locale === 'en');
