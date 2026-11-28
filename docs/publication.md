# Moeen website

Claude's standalone landing page is published separately from Moeen-System/App. The original design, inline vector logo, hover animation, reduced-motion behavior and Arabic/English switch are retained. The existing black product favicon is included.

Run `node scripts/build_site.mjs`. It uses the public `WAITLIST_API_URL` from the environment, fills Arabic copy for the first static render and emits `dist/`. Render builds omit the fictional logo and testimonial sections and the standalone Thmanyah files used by the local preview. `WEB_PORT` is only for local preview.

Production reads the project owner's Thmanyah Sans webfont bundle from the Render secret file `thmanyah_webfonts.json`. Its three keys are `400`, `500` and `600 700`, each containing a base64-encoded WOFF2 face. The build packages the faces in a same-origin script for the homepage, product pages and waitlist. Browsers use IBM Plex Sans Arabic if the supplied faces are unavailable. Keep the bundle out of Git. See the [Thmanyah font license](https://font.thmanyah.com/licenses).

The form calls the public `settings.join_waitlist` action on the existing Moeen API. It omits cookies, validates the address, requires an explicit submission, reports failures truthfully and never creates a workspace or account. The API stores unique normalized addresses and consent metadata. Verified product owners manage the waitlist from the Moeen super admin console. No invitation or marketing email is sent by enrollment.

Hosting uses a Render static site. `app.moeen.dev` remains the workspace application. Static hosting and both custom domains are within the current included plan; outbound bandwidth and pipeline quotas still apply.


## Public product pages

The landing page and public product pages use the same navigation. Edit the route list, menu order, and bilingual feature and company copy in `public/assets/site_content.js`. The build emits the Product, AI, Company, Blog, Docs, Pricing, Roadmap and Changelog routes. Public pages use the site's saved language and theme and support direct links with `?lang=ar` or `?lang=en`. Docs has a route and a shared header and footer with an empty main area.

Feature, company and article copy lives in `public/assets/page_story_content.js`. Their compositions are rendered in `public/assets/product_content.js` and styled in `public/assets/product_pages.css`. Match the section order to how people work with the feature. Use demo workspace captures with Arabic and English light and dark variants when a screenshot illustrates the workflow. Use the shared 1px media outline for screenshot frames. In transparent illustrations, apply the same edge to the panels during capture so the empty canvas stays transparent. Use the App repository's capability docs to verify product claims before publishing.

- **Pricing** mirrors the public Free, Plus and Pro plan definitions in the App repository's `packages/core/src/billing.ts`. When prices or entitlements change, update `public/assets/product_content.js` with the app's approved values. The page links to enrollment during the beta.
- **Roadmap** uses `/roadmap.json` on the app origin. It renders an initial copy at build time and fetches the feed on load, every minute while visible, and when the page becomes visible again. The feed identifies saved data when GitHub sync is unavailable.
- **Changelog** reads `/changelog/releases.json` on the app origin at build time and links to published lead-feature artwork. The app's current cross-origin policy restricts browser JSON reads, so rebuild the site to import a new release. App release notes remain the editable source.

The app origin comes from `WAITLIST_API_URL`. The existing manually configured Render Content Security Policy needs `https://app.moeen.dev` in `img-src` for release artwork. The checked-in `render.yaml` includes that source.

## Website copy

Use Moeen’s Arabic natural writing skill from the App repository at `.agents/skills/arabic_natural_writing/SKILL.md` for Arabic on every website page. Draft from meaning, keep product terms consistent with the glossary, and make sure the English version makes the same claims. Check both reading directions after editing.

The built-in AI is called AI in both languages. Export its black square bot from the App repository with `node scripts/build_brand.mjs` and use `brand/logo/brain/ai_bot.svg` for the website avatar. Use release-matched demo captures for the hero, Chats and AI examples.

Use the rounded glyphs registered in the App repository’s `packages/ui/src/components/icon.tsx` for website controls and feature icons. The static pages embed those shapes as SVG.


## Verified publication, 16 November 2026

- Public address: https://moeen.dev/. https://www.moeen.dev/ redirects to the root. Both are verified in Render with issued certificates and return HTTPS 200.
- Static service: `moeen-website`, ID `srv-dbt1q5ek1f9s73ajrang`. The initial deployment is `dep-dbt1q5mk1f9s73ajrb90`, from website commit `d10b19a698f4e1088cb580f0d4563d67c7710cad` on `production`.
- Render source is the public Website repository. Automatic deploys and PR previews are off. Build is `node scripts/build_site.mjs`, publish directory `dist`, and `WAITLIST_API_URL` is `https://app.moeen.dev/api/public/actions`.
- Spaceship DNS adds only `@ A 216.24.57.1` and `www CNAME moeen-website.onrender.com`, with 30-minute TTL. The existing app CNAME, Spacemail records and Resend records remain intact.
- The four response headers in `render.yaml` were also applied through Render's Headers page because the service was created manually, rather than from a Blueprint. HTTPS, the redirect, CSP, no-sniff header and both favicon assets were checked live.
- App PR #110 is merged at `4c75021f01718c06e42ee51a4cbdc309254f81a9`, with `main`, `staging` and `production` aligned. Its GitHub CI and full local `pnpm check` passed, including 52 API tests with zero failures or skips. Beta 0.31 is live and migration 0013 stores registrations in the existing PostgreSQL database.
- Backend configuration deployment `dep-dbt239m1egvs73f6qukg` uses that same application source. `WAITLIST_ORIGINS` explicitly allows `https://moeen.dev`, `https://www.moeen.dev` and `https://moeen-website.onrender.com`; it does not grant private API access or credentialed CORS.
- Arabic and English, validation, real fonts and the logo hover fill were checked on the public HTTPS page. Desktop/mobile layouts and a successful form-to-database registration were checked locally with an isolated QA database; the generated QA account and registrations were removed afterward.
- The verified product-owner account opened the live private page at `https://app.moeen.dev/settings/anas-doleh/waitlist`. The production list was empty at review. Live negative API checks confirmed invalid-input rejection, hostile-origin rejection and private-list authentication. No synthetic address was submitted to production and no signup email is sent by this form.

Future source changes use a feature branch and pull request. Documentation-only publication records do not require rebuilding the unchanged static assets.
