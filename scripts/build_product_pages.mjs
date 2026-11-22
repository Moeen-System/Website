import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { copy, escape, pageLead, pages, pageTitle, renderContent, validFeed } from '../public/assets/product_content.js';
import { infoPages, sitePages } from '../public/assets/site_content.js';
import { buildNavigation } from './build_navigation.mjs';

function pageDocument(page, context, symbols) {
  const text = copy('ar');
  const { origin } = context;
  const title = `${escape(pageTitle(page, 'ar'))} | ${text.brand}`;
  const description = escape(pageLead(page, 'ar'));
  const data = JSON.stringify(context).replaceAll('<', '\\u003c');
  const path = sitePages[page].path;
  return `<!doctype html>
<html lang="ar" dir="rtl" data-theme="light" data-density="compact" data-product-page="${page}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#fafafa">
<link rel="canonical" href="https://moeen.dev${path}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="https://moeen.dev${path}">
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
${buildNavigation(page)}
${page === 'docs' ? '<main id="main" class="section product-page product-page--empty" tabindex="-1" data-product-content></main>' : `
<main id="main" class="section product-page${infoPages[page] && !infoPages[page].image ? ' product-page--story' : ''}" tabindex="-1">
  <div class="wrap product-page__wrap">
    <header class="product-page__head">
      <h1 data-page-heading>${escape(pageTitle(page, 'ar'))}</h1>
      <p class="lead" data-page-lead>${description}</p>
    </header>
    <div data-product-content>${renderContent(page, 'ar', context)}</div>
    ${page === 'roadmap' ? `<noscript><p class="page-status"><a href="${escape(origin)}/roadmap.json">خريطة الطريق بصيغة JSON</a></p></noscript>` : ''}
  </div>
</main>`}
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
  const common = [...landing.matchAll(/<symbol id="i-(?:moon|sun|arrow|check|plus|chev|menu)"[\s\S]*?<\/symbol>/g)].map(([symbol]) => symbol);
  if (common.length !== 7) throw new Error('Missing product page icons in the landing sprite');
  const symbols = common.join('') + productIcons;
  const feeds = { roadmap, changelog };
  await Promise.all(pages.map(async page => {
    const folder = root + 'dist' + sitePages[page].path;
    await mkdir(folder, { recursive: true });
    await writeFile(folder + 'index.html', pageDocument(page, { origin, feed: feeds[page] ?? null }, symbols));
  }));
  console.log(`Built ${pages.length} product, company and resource pages.`);
}
