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

  // Also support sidebar theme links: <a class="theme-btn" href="/theme/dark">Dark</a>
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.theme-btn');
    if (!link) return;
    e.preventDefault();
    // Determine theme from href (/theme/dark or /theme/light) or data-theme
    const href = link.getAttribute('href') || '';
    let theme = link.dataset.theme;
    if (!theme && href) {
      const parts = href.split('/').filter(Boolean);
      theme = parts.length ? parts[parts.length - 1] : '';
    }
    if (theme === 'light') theme = 'default';
    if (!theme) theme = currentTheme();
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    // If the sidebar drawer is open, try to close it for better UX
    const drawer = document.getElementById('appDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const btn = document.getElementById('sidebarToggle');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      if (overlay) overlay.hidden = true;
      if (btn) btn.setAttribute('aria-expanded', 'false');
      const app = document.getElementById('appContent');
      if (app) app.style.overflow = '';
      document.body.classList.remove('drawer-open');
    }
  });
});
