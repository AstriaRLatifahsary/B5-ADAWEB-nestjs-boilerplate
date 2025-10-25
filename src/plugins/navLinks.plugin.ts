import { PluginManager } from '../common/pluginManager';

PluginManager.register({
  name: 'navLinks',
  render() {
    return `
      <style>
        .drawer-section { font-size: 0.75rem; letter-spacing: .08em; color: #7a7a7a; margin: 1rem 0 .5rem; text-transform: uppercase; }
        .drawer-menu { list-style: none; padding: 0; margin: 0; }
        .drawer-item { display: block; color: inherit; text-decoration: none; padding: .6rem .75rem; border-radius: 8px; margin: .15rem 0; }
        .drawer-item:hover { background: rgba(255, 120, 142, .15); }
        .drawer-sub { padding-left: 1rem; margin: .25rem 0 .35rem; border-left: 2px solid rgba(0,0,0,.08); }
        .drawer-sub .drawer-item { padding: .5rem .75rem; }
        .drawer-toggle { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
        .drawer-bottom { position: sticky; bottom: 0; background: inherit; padding: .75rem; border-top: 1px solid rgba(0,0,0,.08); margin-top: 1rem; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }
        .theme-switch { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
      </style>
      <div class="nav-widget">
        <div class="drawer-section">Main</div>
        <ul class="drawer-menu">
          <!-- Dashboard di bawah MAIN tetap ada -->
          <li><a class="drawer-item" href="/">Dashboard</a></li>
          <li>
            <div class="drawer-item drawer-toggle" onclick="this.nextElementSibling.hidden = !this.nextElementSibling.hidden;">
              Posts <span>▾</span>
            </div>
            <div class="drawer-sub" hidden>
              <a class="drawer-item" href="/news">News</a>
              <a class="drawer-item" href="/education">Education</a>
              <a class="drawer-item" href="/events">Events</a>
              <a class="drawer-item" href="/announcements">Announcements</a>
              <a class="drawer-item" href="/updates">Updates</a>
            </div>
          </li>
        </ul>

        <div class="drawer-section">Settings</div>
        <ul class="drawer-menu">
          <li><a class="drawer-item" href="/notifications">Notification</a></li>
          <li>
            <div class="drawer-item drawer-toggle" onclick="this.nextElementSibling.hidden = !this.nextElementSibling.hidden;">Settings <span>▾</span></div>
            <div class="drawer-sub" hidden>
              <a class="drawer-item" href="/profile">Profile</a>
              <a class="drawer-item" href="/preferences">Preferences</a>
              <a class="drawer-item" href="/account">Account</a>
            </div>
          </li>
        </ul>

        <div class="drawer-bottom">
          <div class="theme-switch" role="group" aria-label="Theme">
            <a class="theme-btn" href="/theme/light">Light</a>
            <a class="theme-btn" href="/theme/dark">Dark</a>
          </div>
        </div>
      </div>
    `;
  },
});
