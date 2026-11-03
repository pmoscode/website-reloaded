// Hell/Dunkel umschalten. Ohne Auswahl gilt die Systemeinstellung.
const KEY = 'theme';
const root = document.documentElement;
const systemDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
const isDark = () => (root.dataset.theme || (systemDark() ? 'dark' : 'light')) === 'dark';

export function initTheme() {
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    const sync = () => btn.setAttribute('aria-pressed', String(isDark()));
    sync();
    btn.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      // Entspricht die Wahl dem System, Einstellung wieder entfernen
      if ((next === 'dark') === systemDark()) {
        delete root.dataset.theme;
        try { localStorage.removeItem(KEY); } catch {}
      } else {
        root.dataset.theme = next;
        try { localStorage.setItem(KEY, next); } catch {}
      }
      sync();
    });
  });
}
