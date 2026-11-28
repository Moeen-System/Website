import { copy, pageLead, pageTitle, renderContent, validFeed } from './product_content.js';
import { initNavigation } from './navigation.js';
import { initContributionCalendar, showLatestContributions } from './contribution_calendar.js';
import { initFeaturePage, mountFeaturePage } from './feature_pages.js';
import { applyPricingCurrency, initCompanyPage } from './company_pages.js';
import { CURRENCY_OPTIONS, DEFAULT_CURRENCY, detectPricingCurrency } from './pricing_currency.js';
import { initArchitecturePage } from './architecture_page.js';

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
const currencyKey = 'moeen.landing.currency';
let manualCurrency = null;
if (page === 'pricing') {
  try {
    const saved = localStorage.getItem(currencyKey);
    if (Object.hasOwn(CURRENCY_OPTIONS, saved)) manualCurrency = saved;
  } catch {}
}
let pricingCurrency = manualCurrency ?? DEFAULT_CURRENCY;

function store(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

function applyTheme() {
  root.dataset.theme = theme;
  renderNavigation(locale, theme);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#131313' : '#fafafa';
  for (const image of document.querySelectorAll('img[data-shot]')) {
    const src = `/assets/shots2/${image.dataset.shot}_${image.dataset.locale ?? locale}_${theme}.png`;
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
  mountFeaturePage(content);
  showLatestContributions(content);
  if (page === 'pricing') {
    applyCadence();
    applyPricingCurrency(content, pricingCurrency);
  }
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
  for (const node of document.querySelectorAll('[data-page-text]')) node.textContent = text[node.dataset.pageText];
  if (rebuild) updateContent();
  else {
    if (page === 'pricing') applyPricingCurrency(content, pricingCurrency);
    showLatestContributions(content);
    applyTheme();
  }
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

if (page === 'pricing') {
  content.addEventListener('change', event => {
    const control = event.target;
    if (control.matches('[data-pricing-currency]') && Object.hasOwn(CURRENCY_OPTIONS, control.value)) {
      manualCurrency = pricingCurrency = control.value;
      store(currencyKey, pricingCurrency);
      applyPricingCurrency(content, pricingCurrency);
    }
    if (control.matches('input[name="cadence"]')) {
      cadence = control.value;
      applyCadence();
    }
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

initFeaturePage(content);
initCompanyPage(content);
initContributionCalendar(content);
initArchitecturePage(content);
mountFeaturePage(content);
applyLanguage(locale === 'en');

if (page === 'pricing' && !manualCurrency) {
  void detectPricingCurrency().then((detected) => {
    if (manualCurrency || detected === pricingCurrency) return;
    pricingCurrency = detected;
    applyPricingCurrency(content, pricingCurrency);
  });
}
