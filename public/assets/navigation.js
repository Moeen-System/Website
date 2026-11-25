const ui = {
  ar: { language: 'Switch to English', dark: 'التبديل إلى المظهر الداكن', light: 'التبديل إلى المظهر الفاتح' },
  en: { language: 'التبديل إلى العربية', dark: 'Switch to dark theme', light: 'Switch to light theme' },
};

export function initNavigation() {
  const root = document.documentElement;
  const nav = document.querySelector('.nav');
  const labels = [...document.querySelectorAll('[data-nav-en]')].map(node => [node, node.textContent]);
  const ariaLabels = [...document.querySelectorAll('[data-nav-en-label]')].map(node => [node, node.getAttribute('aria-label')]);
  const localizedLinks = [...document.querySelectorAll('[data-href-en]')].map(node => [node, node.href]);
  const language = nav.querySelector('[data-language]');
  const themeButton = nav.querySelector('[data-theme-toggle]');
  const mega = nav.querySelector('.mega');
  const frame = mega.querySelector('.mega__frame');
  const triggers = [...nav.querySelectorAll('[data-mega]')];
  const views = Object.fromEntries([...mega.querySelectorAll('.mega__view')].map(view => [view.dataset.view, view]));
  const toggle = nav.querySelector('.nav__toggle'), sheet = nav.querySelector('.sheet');
  const hoverable = matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = matchMedia('(min-width: 1200px)');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let current = null;
  let closeTimer, openTimer;

  function sizeMenu(trigger) {
    const bar = nav.querySelector('.nav__bar').getBoundingClientRect(), box = trigger.getBoundingClientRect();
    const view = views[trigger.dataset.mega];
    const start = root.dir === 'rtl' ? bar.right - box.right : box.left - bar.left;
    frame.style.width = `${view.offsetWidth}px`;
    frame.style.height = `${view.offsetHeight}px`;
    mega.style.setProperty('--x', `${Math.max(0, Math.min(start, bar.width - view.offsetWidth))}px`);
  }

  function openMenu(trigger, focus = false) {
    clearTimeout(closeTimer);
    const name = trigger.dataset.mega;
    const view = views[name];
    if (current !== name) {
      mega.hidden = false;
      for (const button of triggers) button.setAttribute('aria-expanded', String(button === trigger));
      for (const panel of Object.values(views)) {
        panel.classList.toggle('is-on', panel === view);
        panel.inert = panel !== view;
      }
      mega.classList.toggle('is-moving', Boolean(current));
      current = name;
      sizeMenu(trigger);
      requestAnimationFrame(() => { if (current) mega.classList.add('is-open'); });
    }
    if (focus) (view.querySelector('a') ?? view).focus();
  }

  function closeMenu(returnFocus = false) {
    clearTimeout(openTimer);
    if (!current) return;
    const trigger = triggers.find(button => button.dataset.mega === current);
    current = null;
    mega.classList.remove('is-open', 'is-moving');
    for (const button of triggers) button.setAttribute('aria-expanded', 'false');
    for (const panel of Object.values(views)) panel.inert = true;
    if (returnFocus) trigger.focus();
    closeTimer = setTimeout(() => { if (!current) mega.hidden = true; }, still.matches ? 0 : 200);
  }

  function setSheet(open) {
    toggle.setAttribute('aria-expanded', String(open));
    sheet.hidden = !open;
    root.classList.toggle('sheet-open', open);
  }

  for (const trigger of triggers) {
    trigger.addEventListener('click', event => {
      if (current === trigger.dataset.mega) closeMenu();
      else openMenu(trigger, event.detail === 0);
    });
    trigger.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      openMenu(trigger, true);
    });
    trigger.addEventListener('mouseenter', () => {
      if (!hoverable.matches) return;
      clearTimeout(openTimer);
      openTimer = setTimeout(() => openMenu(trigger), current ? 0 : 100);
    });
    trigger.addEventListener('mouseleave', () => {
      clearTimeout(openTimer);
      if (hoverable.matches) closeTimer = setTimeout(closeMenu, 160);
    });
  }

  mega.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  mega.addEventListener('mouseleave', () => { if (hoverable.matches) closeTimer = setTimeout(closeMenu, 160); });
  document.addEventListener('click', event => {
    if (!event.target.closest('.mega, [data-mega]')) closeMenu();
    if (!event.target.closest('.sheet, .nav__toggle')) setSheet(false);
  });
  nav.addEventListener('focusout', event => {
    if (!nav.contains(event.relatedTarget)) closeMenu();
  });
  toggle.addEventListener('click', () => setSheet(sheet.hidden));
  sheet.addEventListener('click', event => { if (event.target.closest('a')) setSheet(false); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (current) closeMenu(true);
    if (!sheet.hidden) {
      setSheet(false);
      toggle.focus();
    }
  });
  desktop.addEventListener('change', () => {
    closeMenu();
    setSheet(false);
  });
  addEventListener('resize', () => {
    if (current) sizeMenu(triggers.find(button => button.dataset.mega === current));
  });

  for (const link of document.querySelectorAll('[data-ask-copy]')) {
    link.addEventListener('click', () => {
      void navigator.clipboard?.writeText(root.lang === 'en' ? link.dataset.askCopyEn : link.dataset.askCopy).catch(() => {});
    });
  }

  const assets = new Map();
  for (const [index, img] of [...mega.querySelectorAll('img[data-light]')].entries()) {
    const url = img.dataset.light;
    if (!assets.has(url)) assets.set(url, fetch(url).then(response => response.ok ? response.text() : ''));
    assets.get(url).then(markup => {
      const holder = document.createElement('div');
      holder.innerHTML = markup
        .replace(/id="([^"]+)"/g, (_, id) => `id="menu-${index}-${id}"`)
        .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#menu-${index}-${id})`)
        .replace(/href="#([^"]+)"/g, (_, id) => `href="#menu-${index}-${id}"`);
      const svg = holder.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      img.replaceWith(svg);
    }).catch(() => {});
  }

  return (locale, theme) => {
    for (const [node, ar] of labels) node.textContent = locale === 'en' ? node.dataset.navEn : ar;
    for (const [node, ar] of ariaLabels) node.setAttribute('aria-label', locale === 'en' ? node.dataset.navEnLabel : ar);
    for (const [node, ar] of localizedLinks) node.href = locale === 'en' ? node.dataset.hrefEn : ar;
    language.title = ui[locale].language;
    language.setAttribute('aria-label', language.title);
    themeButton.title = ui[locale][theme === 'dark' ? 'light' : 'dark'];
    themeButton.setAttribute('aria-label', themeButton.title);
    if (current) sizeMenu(triggers.find(button => button.dataset.mega === current));
  };
}
