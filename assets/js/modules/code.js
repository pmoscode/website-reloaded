// "Copy"-Button in Codeblöcken.
export function initCode() {
  document.querySelectorAll('.codeblock [data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const block = btn.closest('.codeblock');
      // Bei Zeilennummern-Tabelle nur die Code-Spalte kopieren
      const code = block.querySelector('.lntd:last-child code') || block.querySelector('pre code') || block.querySelector('pre');
      try {
        await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ''));
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
    });
  });
}
