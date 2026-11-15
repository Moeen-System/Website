const WAITLIST_ENDPOINT = '__WAITLIST_ENDPOINT__';
  const COPY = {"ar":{"title":"مُعين","headline":"بعد ثلاثين عاماً، صار للبرمجيات طريقة استخدام أفضل.","lead":"مُعين نظام هجين صُمم للناس ولوكلاء الذكاء الاصطناعي بالقدر نفسه، يمنحك تحكّم البرمجيات التطبيقية وقدرة البنية التحتية على التوسع.","label":"البريد الإلكتروني للعمل","button":"انضم إلى قائمة الانتظار","invalid":"أدخل بريداً إلكترونياً صحيحاً.","offline":"قائمة الانتظار غير متصلة بعد. لم يُرسل شيء.","done":"أصبحت في القائمة. سنراسلك حين تجهز دعوتك.","failed":"تعذّر الانضمام الآن. حاول مرة أخرى بعد قليل.","language":"Switch to English"},"en":{"title":"Moeen","headline":"After thirty years, software has a better way to be used.","lead":"Moeen is a hybrid system, architected for people and agents in equal measure, with the control of application software and the scale of infrastructure.","label":"Work email","button":"Join the waitlist","invalid":"Enter a valid email address.","offline":"The waitlist is not connected yet. Nothing was sent.","done":"You're on the list. We'll write when your invite is ready.","failed":"Could not join right now. Try again in a moment.","language":"التبديل إلى العربية"}};
  const form = document.getElementById('waitlist'), status = document.getElementById('status'), email = document.getElementById('email');
  const language = document.getElementById('language');
  let locale = 'ar', message = null;
  try { const saved = localStorage.getItem('moeen.landing.locale'); if (saved === 'en' || saved === 'ar') locale = saved; } catch {}

  function render() {
    const text = COPY[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = locale === 'ar' ? 'مُعين · Moeen' : 'Moeen · مُعين';
    document.querySelectorAll('[data-text]').forEach((node) => { node.textContent = text[node.dataset.text]; });
    language.setAttribute('aria-label', text.language);
    language.title = text.language;
    status.textContent = message ? text[message] : '';
  }
  language.addEventListener('click', () => {
    locale = locale === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem('moeen.landing.locale', locale); } catch {}
    render();
  });
  function say(key, ok = false) { message = key; status.className = ok ? 'status ok' : 'status'; render(); }

  email.addEventListener('input', () => { email.removeAttribute('aria-invalid'); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!email.checkValidity()) { email.setAttribute('aria-invalid', 'true'); say('invalid'); email.focus(); return; }
    email.removeAttribute('aria-invalid');
    if (!WAITLIST_ENDPOINT.startsWith('http')) { say('offline'); return; }
    const button = form.querySelector('button'); if (button.disabled) return; button.disabled = true; email.disabled = true;
    try {
      const response = await fetch(WAITLIST_ENDPOINT, { method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ action: 'settings.join_waitlist', input: { email: email.value.trim(), locale, consent: true } }) });
      if (!response.ok || (await response.json()).ok !== true) throw new Error(String(response.status));
      form.reset(); say('done', true);
    } catch { say('failed'); }
    finally { button.disabled = false; email.disabled = false; }
  });
  render();
  // Fill the mark once on arrival, then leave it to hover.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { setTimeout(() => document.body.classList.add('filled'), 500); setTimeout(() => document.body.classList.remove('filled'), 2800); }
