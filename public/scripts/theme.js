const THEMES = [
  'main', 'main-light',
  'academic', 'academic-light',
  'elegant', 'elegant-light',
  'ice', 'ice-light',
  'light', 'dark'
];

const STORAGE_KEY = 'theme';

function detectSystemPreference() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'main' : 'main-light';
}

function setTheme(theme) {
  if (!THEMES.includes(theme)) return;

  document.body.className = document.body.className
    .split(' ')
    .filter(c => !c.startsWith('theme-'))
    .concat(`theme-${theme}`)
    .join(' ');

  localStorage.setItem(STORAGE_KEY, theme);

  // Sync dropdown if present
  const select = document.querySelector('[data-theme-toggle]');
  if (select && select.value !== theme) select.value = theme;

  // Update sun/moon icon
  updateIcon(theme);
}

function toggleLightDark() {
  const current = localStorage.getItem(STORAGE_KEY) || detectSystemPreference();

  const toggled = current.endsWith('-light')
    ? current.replace('-light', '')
    : THEMES.includes(`${current}-light`)
      ? `${current}-light`
      : current;

  setTheme(toggled);
}

function updateIcon(theme) {
  const isLight = theme.includes('light') || theme === 'light';

  document.querySelectorAll('[id^="icon-sun-"]').forEach(el => {
    el.style.opacity = isLight ? '1' : '0';
  });

  document.querySelectorAll('[id^="icon-moon-"]').forEach(el => {
    el.style.opacity = isLight ? '0' : '1';
  });
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const active = saved || detectSystemPreference();
  setTheme(active);
}

function toggleThemeMenu(id) {
  const menu = document.getElementById(`theme-menu-${id}`);
  if (!menu) return;
  menu.classList.toggle('hidden');
}

// Auto-close dropdown on outside click
document.addEventListener('click', (e) => {
  document.querySelectorAll('[id^="theme-menu-"]').forEach(menu => {
    if (!menu.classList.contains('hidden') && !menu.parentElement.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});

// Watch for dropdown change
document.querySelector('[data-theme-toggle]')?.addEventListener('change', (e) => {
  setTheme(e.target.value);
});

// Init everything
if (typeof window !== 'undefined') {
  window.setTheme = setTheme;
  window.toggleLightDark = toggleLightDark;
  window.toggleThemeMenu = toggleThemeMenu;
  window.addEventListener('DOMContentLoaded', initTheme);
}

