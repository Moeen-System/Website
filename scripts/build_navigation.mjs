import { navigation, sitePages } from '../public/assets/site_content.js';
import { escape, icon } from '../public/assets/product_content.js';

const label = (text, tag = 'span') => `<${tag} data-nav-en="${escape(text.en)}">${escape(text.ar)}</${tag}>`;
const aria = text => `aria-label="${escape(text.ar)}" data-nav-en-label="${escape(text.en)}"`;
const current = (id, page) => id === page ? ' aria-current="page"' : '';

function link(id, page, classes = '') {
  const entry = sitePages[id];
  return `<a${classes ? ` class="${classes}"` : ''} href="${entry.path}"${current(id, page)}>${label(entry.label)}</a>`;
}

function tile(id, drawing, page) {
  const entry = sitePages[id];
  const art = drawing ? `<span class="tile__art"><img src="/assets/iso/light/${drawing}.svg" data-light="/assets/iso/light/${drawing}.svg" data-dark="/assets/iso/dark/${drawing}.svg" alt=""></span>` : '';
  return `<a class="tile" href="${entry.path}"${current(id, page)}>${art}<span class="tile__text">${label(entry.label, 'strong')}${entry.teaser ? label(entry.teaser, 'small') : ''}</span></a>`;
}

function featureTile(id, page) {
  const entry = sitePages[id];
  const { shot, width, height } = entry.image;
  return `<a class="mega__feature" href="${entry.path}"${current(id, page)}>
    <span class="mega__shot"><img width="${width}" height="${height}" data-shot="${shot}" src="/assets/shots2/${shot}_ar_light.png" alt="" loading="lazy"></span>
    ${label(entry.label, 'strong')}${label(entry.teaser, 'small')}
  </a>`;
}

export function buildNavigation(page = 'home') {
  const controls = { ar: 'القائمة الرئيسية', en: 'Main navigation' };
  const groups = navigation.filter(entry => typeof entry !== 'string');
  const navItem = entry => {
    if (typeof entry === 'string') return link(entry, page, 'nav__item');
    const active = entry.featured === page || entry.tiles.some(([id]) => id === page);
    return `<button type="button" class="nav__item" data-mega="${entry.id}" aria-expanded="false" aria-controls="mega"${active ? ' data-active-group' : ''}>${label(entry.label)}${icon('chev', 'i i--xs')}</button>`;
  };
  const panel = group => `<section class="mega__view mega__view--${group.id}${group.featured ? '' : ' mega__view--narrow'}" data-view="${group.id}" ${aria(group.label)} inert>
    <div class="mega__main"><div class="${group.featured ? 'mega__grid' : 'mega__list'}">${group.tiles.map(([id, drawing]) => tile(id, drawing, page)).join('')}</div></div>
    ${group.featured ? featureTile(group.featured, page) : ''}
  </section>`;
  const mobileItem = entry => {
    if (typeof entry === 'string') return link(entry, page);
    return `<details class="sheet__group"><summary>${label(entry.label)}${icon('chev')}</summary><div>
      ${entry.tiles.map(([id]) => link(id, page)).join('')}${entry.featured ? link(entry.featured, page) : ''}
    </div></details>`;
  };
  const login = { ar: 'تسجيل الدخول', en: 'Sign in' };
  const cta = { ar: 'انضم إلى قائمة الانتظار', en: 'Join the waitlist' };
  return `<header class="nav">
    <div class="wrap nav__bar">
      <a class="skip-link" href="#${page === 'home' ? 'top' : 'main'}">${label({ ar: 'تخطَّ إلى المحتوى', en: 'Skip to content' })}</a>
      <a class="nav__logo" href="/" ${aria({ ar: 'مُعين، الصفحة الرئيسية', en: 'Moeen home' })}>
        <img width="29" height="22" src="/assets/brand/mark_black.svg" data-light="/assets/brand/mark_black.svg" data-dark="/assets/brand/mark_white.svg" alt="">
        ${label({ ar: 'مُعين', en: 'Moeen' })}
      </a>
      <nav class="nav__menu" ${aria(controls)}>${navigation.map(navItem).join('')}</nav>
      <div class="nav__end">
        <button type="button" class="icon-btn" data-language aria-label="Switch to English"><span aria-hidden="true" data-nav-en="ع">EN</span></button>
        <button type="button" class="icon-btn" data-theme-toggle aria-label="التبديل إلى المظهر الداكن">${icon('moon', 'i i--moon')}${icon('sun', 'i i--sun')}</button>
        <a class="btn btn--ghost nav__login" href="https://app.moeen.dev/">${label(login)}</a>
        <a class="btn btn--solid nav__cta" href="/waitlist/">${label(cta)}<span class="btn__arrow" aria-hidden="true">${icon('arrow', 'i i--xs flip')}</span></a>
        <button type="button" class="icon-btn nav__toggle" aria-expanded="false" aria-controls="sheet" ${aria({ ar: 'القائمة', en: 'Menu' })}>${icon('menu', 'i flip')}</button>
      </div>
    </div>
    <div class="mega" id="mega" hidden><div class="mega__frame">${groups.map(panel).join('')}</div></div>
    <nav class="sheet" id="sheet" hidden ${aria(controls)}>
      <div class="wrap sheet__list">
        ${navigation.map(mobileItem).join('')}
        <a href="https://app.moeen.dev/">${label(login)}</a>
        <a class="btn btn--solid" href="/waitlist/">${label(cta)}</a>
      </div>
    </nav>
  </header>`;
}
