const root = document.documentElement;

/* ---------- theme (light/dark) ---------- */
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ---------- accent color picker ---------- */
const swatches = document.querySelectorAll('.swatch');

function applyAccent(color) {
  root.style.setProperty('--accent', color);
  localStorage.setItem('accent', color);
  swatches.forEach(s => s.classList.toggle('is-active', s.dataset.accent === color));
}

const savedAccent = localStorage.getItem('accent');
if (savedAccent) applyAccent(savedAccent);
else swatches[0] && swatches[0].classList.add('is-active');

swatches.forEach(s => {
  s.addEventListener('click', () => applyAccent(s.dataset.accent));
});

/* ---------- sidebar view switching ---------- */
const sideLinks = document.querySelectorAll('.side-link');
const views = document.querySelectorAll('.view');

function showView(name) {
  views.forEach(v => v.hidden = v.dataset.view !== name);
  sideLinks.forEach(l => l.classList.toggle('is-active', l.dataset.view === name));
}

sideLinks.forEach(link => {
  link.addEventListener('click', () => showView(link.dataset.view));
});

/* ---------- portfolio filter pills ---------- */
const filterPills = document.querySelectorAll('.filter-pill');
const cards = document.querySelectorAll('.card');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const filter = pill.dataset.filter;
    filterPills.forEach(p => {
      p.classList.toggle('is-active', p === pill);
      p.setAttribute('aria-selected', p === pill ? 'true' : 'false');
    });
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

/* ---------- resume "more options" dropdown (placeholder) ---------- */
const cvMore = document.getElementById('cv-more');
if (cvMore) {
  cvMore.addEventListener('click', () => {
    const expanded = cvMore.getAttribute('aria-expanded') === 'true';
    cvMore.setAttribute('aria-expanded', String(!expanded));
    showView('resume');
  });
}
