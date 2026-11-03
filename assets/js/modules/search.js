// Volltextsuche mit Pagefind (Index wird beim Build erzeugt, siehe Taskfile).
import * as params from '@params';

let pagefind;
function loadPagefind() {
  if (!pagefind) {
    const url = params.pagefind;
    pagefind = import(url).then(async (pf) => {
      await pf.options({ baseUrl: params.base, excerptLength: 22 });
      pf.init();
      return pf;
    });
    pagefind.catch(() => { pagefind = undefined; });
  }
  return pagefind;
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function setupBox(box) {
  const input = box.querySelector('[data-search-input]');
  const status = box.querySelector('[data-search-status]');
  const list = box.querySelector('[data-search-results]');
  let selected = -1;

  const links = () => [...list.querySelectorAll('a')];
  const select = (i) => {
    const all = links();
    if (!all.length) return;
    selected = (i + all.length) % all.length;
    all.forEach((a, n) => a.setAttribute('aria-selected', String(n === selected)));
    all[selected].scrollIntoView({ block: 'nearest' });
  };

  async function run() {
    const q = input.value.trim();
    selected = -1;
    if (!q) { list.innerHTML = ''; status.textContent = 'Type to search all articles.'; return; }
    let pf;
    try { pf = await loadPagefind(); } catch {
      status.textContent = 'The search index is not available. Build the site with “task build” or “task serve”.';
      return;
    }
    const search = await pf.debouncedSearch(q, {}, 180);
    if (search === null) return; // von neuerer Eingabe überholt
    const top = await Promise.all(search.results.slice(0, 10).map((r) => r.data()));
    if (input.value.trim() !== q) return;
    if (!top.length) {
      list.innerHTML = '';
      status.textContent = `No article matches “${q}”. Try a broader word or a category like woodwork.`;
      return;
    }
    status.textContent = `${search.results.length} ${search.results.length === 1 ? 'result' : 'results'}`;
    list.innerHTML = top.map((d) => `
      <li><a href="${esc(d.url)}">
        ${d.meta.image ? `<img src="${esc(d.meta.image)}" alt="" loading="lazy">` : '<span class="ph"></span>'}
        <b>${esc(d.meta.title)}</b>
        <span class="ex">${d.excerpt}</span>
      </a></li>`).join('');
  }

  input.addEventListener('input', run);
  input.addEventListener('focus', () => { loadPagefind().catch(() => {}); }, { once: true });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(selected + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); select(selected - 1); }
    else if (e.key === 'Enter') {
      const target = links()[selected] || links()[0];
      if (target) { e.preventDefault(); location.href = target.href; }
    }
  });
  return { input, run };
}

export function initSearch() {
  const boxes = [...document.querySelectorAll('[data-search]')].map((b) => [b, setupBox(b)]);
  const dialog = document.getElementById('search-dialog');
  const dialogBox = boxes.find(([b]) => dialog?.contains(b))?.[1];

  // Suchseite: ?q= übernehmen
  const pageBox = boxes.find(([b]) => !dialog?.contains(b))?.[1];
  if (pageBox) {
    const q = new URLSearchParams(location.search).get('q');
    if (q) { pageBox.input.value = q; pageBox.run(); }
    pageBox.input.focus();
  }

  if (!dialog || !dialogBox) return;
  const open = () => {
    if (pageBox) { pageBox.input.focus(); return; }
    if (!dialog.open) dialog.showModal();
    dialogBox.input.focus();
    dialogBox.input.select();
  };
  document.querySelectorAll('[data-open-search]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); open(); }));
  dialog.querySelector('[data-search-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      open();
    }
  });
}
