// Runs in <head> before the first paint: applies the saved language and theme so the
// page never flashes the wrong one. Shared keys with the waitlist page.
(function () {
  var root = document.documentElement, locale = 'ar', theme = 'light';
  try {
    var savedLocale = localStorage.getItem('moeen.landing.locale');
    var savedTheme = localStorage.getItem('moeen.landing.theme');
    if (savedLocale === 'en' || savedLocale === 'ar') locale = savedLocale;
    if (savedTheme === 'dark' || savedTheme === 'light') theme = savedTheme;
  } catch (error) {}
  // A shared link can ask for a language: moeen.dev/?lang=en
  var asked = new URLSearchParams(location.search).get('lang');
  if (asked === 'en' || asked === 'ar') {
    locale = asked;
    try { localStorage.setItem('moeen.landing.locale', locale); } catch (error) {}
  }
  root.dataset.theme = theme;
  root.classList.add('js');
  if (locale === 'en') {
    root.lang = 'en';
    root.dir = 'ltr';
    root.classList.add('i18n-pending');
  }
})();
