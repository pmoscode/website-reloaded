// Mobiles Menü auf- und zuklappen.
export function initMenu() {
  const btn = document.querySelector('[data-menu]');
  if (!btn) return;
  const set = (open) => {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('menu-open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) set(false); });
}
