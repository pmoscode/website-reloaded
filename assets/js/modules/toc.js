// Aktuellen Abschnitt im Inhaltsverzeichnis markieren.
export function initToc() {
  const toc = document.querySelector('[data-toc]');
  if (!toc || !('IntersectionObserver' in window)) return;
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const headings = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const visible = new Set();
  const update = () => {
    const current = headings.find((h) => visible.has(h)) ||
      [...headings].reverse().find((h) => h.getBoundingClientRect().top < 120);
    links.forEach((a) => a.removeAttribute('aria-current'));
    if (current) byId.get(current.id)?.setAttribute('aria-current', 'true');
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    update();
  }, { rootMargin: '-80px 0px -60% 0px' });
  headings.forEach((h) => io.observe(h));
}
