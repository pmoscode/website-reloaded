// Zustimmung für externe Dienste (Matomo, Embeds). Gespeichert in localStorage – keine Cookies.
import * as params from '@params';

const KEY = 'consent';
const VERSION = 1;
const items = params.consent || [];

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return v && v.v === VERSION ? v.items : null;
  } catch { return null; }
}
function write(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, items: state, at: new Date().toISOString() })); } catch {}
}
const allowed = (key) => !!(read() || {})[key];

// ── Dienste aktivieren ────────────────────────────
function loadEmbeds(key, force = false) {
  document.querySelectorAll(`[data-consent-embed="${key}"]`).forEach((el) => {
    if (!force && !allowed(key)) return;
    const f = document.createElement('iframe');
    f.src = el.dataset.src;
    f.width = el.dataset.width;
    f.height = el.dataset.height;
    f.title = el.dataset.title || '';
    f.loading = 'lazy';
    f.setAttribute('allowfullscreen', '');
    el.replaceChildren(f);
  });
}

let matomoLoaded = false;
function loadMatomo() {
  const m = params.matomo || {};
  if (matomoLoaded || !m.url || !m.siteid) return;
  matomoLoaded = true;
  const _paq = (window._paq = window._paq || []);
  _paq.push(['trackPageView'], ['enableLinkTracking'], ['setTrackerUrl', m.url + 'matomo.php'], ['setSiteId', String(m.siteid)]);
  const s = document.createElement('script');
  s.async = true;
  s.src = m.url + 'matomo.js';
  document.head.appendChild(s);
}

function apply() {
  const state = read() || {};
  items.forEach(({ key }) => {
    if (!state[key]) return;
    if (key === 'matomo') loadMatomo();
    else loadEmbeds(key);
  });
}

// ── UI ────────────────────────────────────────────
export function initConsent() {
  const banner = document.querySelector('[data-consent-banner]');
  const dialog = document.querySelector('[data-consent-dialog]');
  const boxes = dialog ? [...dialog.querySelectorAll('[data-consent-key]')] : [];
  const sync = () => {
    const state = read() || {};
    boxes.forEach((b) => { b.checked = !!state[b.dataset.consentKey]; });
  };

  // Einbettungen per Klick laden: speichert die Zustimmung für diesen Dienst
  document.querySelectorAll('[data-consent-allow]').forEach((btn) => btn.addEventListener('click', () => {
    const key = btn.dataset.consentAllow;
    write({ ...(read() || {}), [key]: true });
    loadEmbeds(key, true);
    if (banner) banner.hidden = true;
    sync();
  }));

  if (!items.length || !dialog) return;

  const save = (state) => {
    write(state);
    if (banner) banner.hidden = true;
    sync();
    apply();
  };
  const all = (value) => Object.fromEntries(items.map(({ key }) => [key, value]));

  document.querySelectorAll('[data-consent-open]').forEach((b) => b.addEventListener('click', () => { sync(); dialog.showModal(); }));
  document.querySelectorAll('[data-consent-accept]').forEach((b) => b.addEventListener('click', () => save(all(true))));
  document.querySelectorAll('[data-consent-deny]').forEach((b) => b.addEventListener('click', () => save(all(false))));
  dialog.querySelector('[data-consent-save]')?.addEventListener('click', () => {
    save(Object.fromEntries(boxes.map((b) => [b.dataset.consentKey, b.checked])));
  });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  if (read() === null) { if (banner) banner.hidden = false; }
  else apply();
}
