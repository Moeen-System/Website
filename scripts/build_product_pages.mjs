import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { copy, escape, icon, pages, renderContent, validFeed } from '../public/assets/product_content.js';

function pageDocument(page, context, symbols) {
  const text = copy('ar');
  const { origin } = context;
  const title = `${text[page]} | ${text.brand}`;
  const description = text[page + 'Lead'];
  const data = JSON.stringify(context).replaceAll('<', '\\u003c');
  const nav = pages.map(id => `<a class="nav__item" data-page-text="${id}" href="/${id}/"${page === id ? ' aria-current="page"' : ''}>${text[id]}</a>`).join('');
  return `<!doctype html>
<html lang="ar" dir="rtl" data-theme="light" data-density="compact" data-product-page="${page}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#fafafa">
<link rel="canonical" href="https://moeen.dev/${page}/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="https://moeen.dev/${page}/">
<meta property="og:image" content="https://moeen.dev/og_ar.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=IBM+Plex+Sans+Arabic:wght@400;500;600&amp;display=swap" rel="stylesheet">
<script src="/assets/prefs.js"></script>
<link rel="stylesheet" href="/assets/landing.css">
<link rel="stylesheet" href="/assets/product_pages.css">
<script type="module" src="/assets/product_pages.js"></script>
</head>
<body>
<svg width="0" height="0" class="sprite" aria-hidden="true">${symbols}</svg>
<header class="nav product-nav">
  <div class="wrap nav__bar">
    <a class="skip-link" href="#main" data-page-text="skip">${text.skip}</a>
    <a class="nav__logo" href="/" data-page-label="home" aria-label="${text.home}">
      <img width="29" height="22" src="/assets/brand/mark_black.svg" data-light="/assets/brand/mark_black.svg" data-dark="/assets/brand/mark_white.svg" alt="">
      <span data-page-text="brand">${text.brand}</span>
    </a>
    <nav class="product-nav__links" aria-label="${text.nav}" data-page-label="nav">${nav}</nav>
    <div class="nav__end">
      <button type="button" class="icon-btn" data-product-language aria-label="${text.language}"><span aria-hidden="true" data-page-text="languageShort">${text.languageShort}</span></button>
      <button type="button" class="icon-btn" data-product-theme aria-label="${text.dark}">${icon('moon', 'i i--moon')}${icon('sun', 'i i--sun')}</button>
      <a class="btn btn--solid nav__cta" href="/waitlist/"><span data-page-text="waitlist">${text.waitlist}</span><span class="btn__arrow" aria-hidden="true">${icon('arrow', 'i i--xs flip')}</span></a>
    </div>
  </div>
</header>
<main id="main" class="section product-page" tabindex="-1">
  <div class="wrap product-page__wrap">
    <header class="product-page__head">
      <h1 data-page-text="${page}">${text[page]}</h1>
      <p class="lead" data-page-text="${page}Lead">${description}</p>
    </header>
    <div data-product-content>${renderContent(page, 'ar', context)}</div>
    ${page === 'roadmap' ? `<noscript><p class="page-status"><a href="${escape(origin)}/roadmap.json">خريطة الطريق بصيغة JSON</a></p></noscript>` : ''}
  </div>
</main>
<footer class="footer product-footer">
  <div class="wrap product-footer__inner">
    <span data-page-text="copyright">${text.copyright}</span>
    <a href="${escape(origin)}/" data-page-text="login">${text.login}</a>
  </div>
</footer>
<script type="application/json" id="product-data">${data}</script>
</body>
</html>
`;
}

async function getFeed(page, url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const feed = await response.json();
    if (!validFeed(page, feed)) throw new Error('Unsupported feed');
    return feed;
  } catch (error) {
    console.warn(`${page}: initial feed unavailable (${error.message}).`);
    return null;
  }
}

export async function buildProductPages(root, origin, landing) {
  const [changelog, roadmap, productIcons] = await Promise.all([
    getFeed('changelog', origin + '/changelog/releases.json'),
    getFeed('roadmap', origin + '/roadmap.json'),
    readFile(root + 'scripts/product_status_icons.svg', 'utf8'),
  ]);
  const common = [...landing.matchAll(/<symbol id="i-(?:moon|sun|arrow|check|plus|chev)"[\s\S]*?<\/symbol>/g)].map(([symbol]) => symbol);
  if (common.length !== 6) throw new Error('Missing product page icons in the landing sprite');
  const symbols = common.join('') + productIcons;
  const feeds = { roadmap, changelog };
  await Promise.all(pages.map(async page => {
    const folder = root + `dist/${page}/`;
    await mkdir(folder, { recursive: true });
    await writeFile(folder + 'index.html', pageDocument(page, { origin, feed: feeds[page] ?? null }, symbols));
  }));
  console.log('Built the pricing, roadmap and changelog pages.');
}
