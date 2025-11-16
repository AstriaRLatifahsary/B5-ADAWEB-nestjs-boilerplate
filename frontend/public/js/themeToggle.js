document.addEventListener('DOMContentLoaded', () => {
  const THEME_KEY = 'theme';
  const defaultTheme = 'default';

  const mapping = {
    home: { default: '/css/home.css', dark: '/css/homeDark.css' },
    auth: { default: '/css/auth.css', dark: '/css/authDark.css' },
  };

  function currentTheme() {
    return localStorage.getItem(THEME_KEY) || defaultTheme;
  }

  function applyTheme(t) {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    if (themeStylesheet) {
      themeStylesheet.href = t === 'dark' ? mapping.home.dark : mapping.home.default;
    }
    const authStylesheet = document.getElementById('auth-theme-stylesheet');
    if (authStylesheet) {
      authStylesheet.href = t === 'dark' ? mapping.auth.dark : mapping.auth.default;
    }
    if (t === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
  }

  // Apply stored theme on load
  applyTheme(currentTheme());

  // Listen for theme toggle clicks
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    e.preventDefault();
    const next = currentTheme() === 'dark' ? 'default' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
});
