// Ebenen im Hero folgen leicht dem Mauszeiger (nur Maus, nicht bei reduzierter Bewegung).
export function initStage() {
  const stage = document.querySelector('[data-stage]');
  if (!stage) return;
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layers = [...stage.querySelectorAll('[data-depth]')];
  let frame = 0;
  addEventListener('pointermove', (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      layers.forEach((l) => {
        const d = Number(l.dataset.depth);
        l.style.transform = `translate(${(x * d).toFixed(1)}px, ${(y * d).toFixed(1)}px)`;
      });
    });
  }, { passive: true });
}
