(function () {
  var STRINGS = {
    en: {
      'nav.home': 'Home',
      'nav.reviews': 'Reviews',
      'nav.interviews': 'Interviews',
      'nav.columns': 'Columns',
      'nav.documentaries': 'Documentaries',
      'nav.agenda': 'Shows',
      'nav.about': 'About',
      'footer.tagline': 'Paranoia Urbana — Digital and Print Zine — A Samamba Thrash Initiative!',
      'reviews.heading': 'Reviews',
      'interviews.heading': 'Interviews',
      'columns.heading': 'Columns',
      'documentaries.heading': 'Documentaries',
      'agenda.heading': 'Show Schedule',
      'agenda.moreinfo': 'More info',
      'links.label': 'Links:',
      'about.heading': 'About Us',
      'about.contact.label': 'Contact:',
      'about.p1':
        'Paranoia Urbana is a digital and print metal/punk zine (d-beat, raw punk, crust, thrash), a Samamba Thrash initiative. We bring interviews, reviews, columns, and underground coverage.',
      'about.p2':
        "This zine doesn't belong only to whoever edits it, but to everyone who makes up the scene. Anyone can submit texts or suggest interviews and reviews. Our goal is to promote unity between punks and bangers — communities with different styles, united by the same cause — and to root out fascist elements from the scene. Paranoia Urbana follows a libertarian antifascist ideology.",
      'hero.eyebrow': 'Urban Culture',
      'hero.tagline': 'The street speaks. We record it.',
      'hero.explore': 'Explore ↓',
      'dossie.label': '002 — Dossier',
      'dossie.heading': 'Street Stories',
      'section.about.label': 'About',
      'section.about.heading': 'The Street Is the Stage',
      'about.readmore': 'Read more ↗',
      'section.poem.label': 'Zine #01 — Poetry',
      'section.poem.heading': 'Voice of the Streets',
    },
  };

  var HTML_STRINGS = {
    en: {
      'agenda.empty':
        'No shows scheduled at the moment. Keep an eye on <a href="https://www.instagram.com/paranoiaurbana/" target="_blank" rel="noopener">Instagram</a>.',
    },
  };

  function applyLang(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.textContent;
      var dict = STRINGS[lang];
      el.textContent = lang !== 'pt' && dict && dict[key] ? dict[key] : el.dataset.i18nOriginal;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.innerHTML;
      var dict = HTML_STRINGS[lang];
      el.innerHTML = lang !== 'pt' && dict && dict[key] ? dict[key] : el.dataset.i18nOriginal;
    });

    document.querySelectorAll('[data-lang-content]').forEach(function (el) {
      var elLang = el.getAttribute('data-lang-content');
      el.style.display = elLang === lang ? '' : 'none';
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
    });

    try {
      localStorage.setItem('pu-lang', lang);
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = 'pt';
    try {
      saved = localStorage.getItem('pu-lang') || 'pt';
    } catch (e) {}

    applyLang(saved);

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang-btn'));
      });
    });
  });
})();
