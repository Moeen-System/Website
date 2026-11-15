# Moeen website

Claude's standalone landing page is published separately from Moeen-System/App. The original design, inline vector logo, hover animation, reduced-motion behavior and Arabic/English switch are retained. The existing black product favicon is included.

Run `node scripts/build_site.mjs`. It uses the public `WAITLIST_API_URL` from the environment, fills Arabic copy for the first static render and emits `dist/`. No dependencies, credentials, user records or app source are included. `WEB_PORT` is only for local preview.

The form calls the public `settings.join_waitlist` action on the existing Moeen API. It omits cookies, validates the address, requires an explicit submission, reports failures truthfully and never creates a workspace or account. The API stores unique normalized addresses and consent metadata. The authenticated Anas-Doleh page is the only management interface. No invitation or marketing email is sent by enrollment.

Hosting uses a Render static site on the free static-site tier after its dashboard confirms the plan. Publication and domain verification are recorded after rollout. `app.moeen.dev` remains the workspace application.
