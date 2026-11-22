import { navigation } from '../public/assets/site_content.js';
import { aria, label, link, upcomingList } from './build_navigation.mjs';

const text = (ar, en) => ({ ar, en });
const ask = prompt => 'https://chatgpt.com/?q=' + encodeURIComponent(prompt);
const destinations = {
  askAr: ask('ما مُعين، وكيف يمكن أن يستخدمه فريقي؟ استند إلى الموقع الرسمي https://moeen.dev/ وميّز بين ما هو متاح الآن وما سيأتي قريبًا.'),
  askEn: ask('What is Moeen and how could my team use it? Use the official site https://moeen.dev/ and distinguish available features from upcoming ones.'),
};
const more = (href, title) => `<a href="${href}">${label(title)}</a>`;
const group = (title, items) => `<div class="footer-group">${label(title, 'h3')}${items}</div>`;

export function buildFooter(page = 'home') {
  const groups = navigation.filter(item => typeof item === 'object');
  const resources = navigation.filter(item => typeof item === 'string');
  const menuLinks = (tiles, tail) => [...tiles.map(([id]) => id), ...(tail ? [tail] : [])].map(id => link(id, page)).join('');
  const menuColumn = item => {
    if (item.sections) return item.sections.map((section, index) =>
      group(index === 0 ? item.label : section.label, menuLinks(section.tiles, section.related ?? item.bottom[0]))).join('');
    return group(item.label, item.upcoming ? upcomingList(item) : menuLinks(item.tiles));
  };
  const extras = [
    ['/#security', text('الأمان', 'Security')], ['/#download', text('التنزيل', 'Download')], ['/#faq', text('الأسئلة الشائعة', 'FAQ')],
    ['https://github.com/Moeen-System/Downloads/releases', text('نسخ التطبيق', 'App releases')],
  ].map(([url, title]) => more(url, title)).join('');
  // Keep these controls inactive until the official profile URLs are provided.
  const socials = [
    ['GitHub', '<span class="footer-github" aria-hidden="true"></span>'],
    ['X', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-7.4L5.3 22H2.1l8.2-9.4L2 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.8L7.4 4H5.5l12.3 16Z"/></svg>'],
    ['LinkedIn', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3ZM6.5 7.6a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM19 19h-3v-5.4c0-1.3-.5-2-1.6-2-1.1 0-1.9.8-1.9 2.3V19h-3V9h2.9v1.4C13 9.3 14 8.8 15.4 8.8c2.3 0 3.6 1.4 3.6 4.4V19Z"/></svg>'],
  ];
  return `<footer class="footer site-footer"><div class="wrap">
    <div class="site-footer__top">
      <a class="site-footer__brand" href="/" ${aria(text('مُعين، الصفحة الرئيسية', 'Moeen home'))}><img alt="" src="/assets/brand/mark_black.svg" data-dark="/assets/brand/mark_white.svg" data-light="/assets/brand/mark_black.svg" width="34" height="26">${label(text('مُعين', 'Moeen'))}</a>
      <div class="site-footer__actions"><a class="btn btn--ghost" href="${destinations.askAr}" data-href-en="${destinations.askEn}" target="_blank" rel="noopener noreferrer">${label(text('اسأل ChatGPT عن مُعين', 'Ask ChatGPT about Moeen'))}<span aria-hidden="true">↗</span></a>
      <button class="btn btn--ghost" type="button" data-language-footer>${label(text('English', 'العربية'))}</button></div>
    </div>
    <nav class="site-footer__columns" ${aria(text('روابط الموقع', 'Site links'))}>
      ${groups.filter(item => item.id !== 'company').map(menuColumn).join('')}
      ${group(text('الموارد', 'Resources'), resources.map(id => link(id, page)).join('') + extras)}
      ${groups.filter(item => item.id === 'company').map(menuColumn).join('')}
    </nav>
    <div class="site-footer__base"><div>${label(text('© 2026 مُعين', '© 2026 Moeen'))} ${more('/waitlist/', text('قائمة الانتظار', 'Waitlist'))} ${more('https://app.moeen.dev/', text('تسجيل الدخول', 'Sign in'))}</div>
    <div class="footer-socials">${socials.map(([name, mark]) => `<button type="button" disabled aria-label="${name}" title="${name}">${mark}</button>`).join('')}</div></div>
    <p class="footer-legal">${label(text('أسماء المنتجات وشعاراتها علامات تجارية لمالكيها.', 'Product names and logos are trademarks of their owners.'))}</p>
    <svg class="footer-wordmark" viewBox="0 -45 1000 243" aria-hidden="true" focusable="false">
      <defs><linearGradient id="footer-ink" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="var(--brand)"/><stop offset=".88" stop-color="var(--brand)" stop-opacity=".12"/></linearGradient></defs>
      <text x="500" y="220" direction="rtl" lang="ar" text-anchor="middle" textLength="890" lengthAdjust="spacingAndGlyphs" fill="none" stroke="url(#footer-ink)" stroke-width="1.4">مُعين</text>
    </svg></div></footer>`;
}
