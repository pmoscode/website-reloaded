# pmoscode Website (reloaded)

Neuauflage von [pmoscode.dev](https://pmoscode.dev) mit [Hugo](https://gohugo.io) und eigenem Theme.

## Voraussetzungen

- Hugo (extended) ≥ 0.168 – `brew install hugo`
- [Task](https://taskfile.dev) – `brew install go-task`
- Git LFS – `brew install git-lfs && git lfs install`
- Pagefind (Suche) lädt `task tools:pagefind` automatisch nach `.bin/` – kein Node nötig.

## Tasks

| Task | Zweck |
|------|-------|
| `task serve` | Dev-Server mit Drafts und Live-Reload, Suchindex wird vorher erzeugt |
| `task build` | Produktions-Build nach `public/` inkl. Suchindex (`ENV=staging` möglich) |
| `task preview` | Produktions-Build lokal ansehen (inkl. Suche) auf Port 1414 |
| `task new:post NAME=…` | Neuen Artikel als Page Bundle unter `content/post/<jahr>/` |
| `task check` | Strikter Build (Warnungen sind Fehler) |

## Struktur

```
config/_default/     Basis-Konfiguration
config/<env>/        Abweichungen je Umgebung (development, staging, production)
content/post/<jahr>/ Artikel als Page Bundles (index.md + img/)
layouts/             Eigenes Theme (Templates, _partials, _shortcodes, _markup-Hooks)
assets/css/          Vanilla-CSS, wird in Namensreihenfolge gebündelt (00-tokens … 90-syntax)
assets/js/           Vanilla-JS (ES-Module), gebündelt über Hugos js.Build
assets/icons/        Linien-Icons im Stil des Logos (+ Social-Brands)
assets/logo/         Original-Logo als SVG (currentColor → Hell/Dunkel)
assets/fonts/        Selbst gehostete Schriften (Onest, JetBrains Mono)
data/consent.yaml    Externe Dienste, die Zustimmung brauchen
static/              Unverarbeitete Dateien (Favicons, Videos)
```

## Deployment

- Push auf `main` → Staging auf GitHub Pages
- Tag `vX.Y.Z` → Produktion per rsync (Secrets: `SSH_DEPLOY_KEY`, `REMOTE_USER`, `REMOTE_HOST`, `REMOTE_PATH`)

## Inhalte

- **Bilder** im Page Bundle werden automatisch als WebP in mehreren Größen ausgeliefert. Ein einzelnes Bild in einem Absatz wird zur Figur (Bildunterschrift = Titel, sonst Alt-Text), mehrere Bilder in einem Absatz stehen nebeneinander.
- **Serien:** `series: ["Name"]` im Front Matter verknüpft Artikel (Teil X von Y, Serien-Box).
- **Kategorie-Icons** werden in `params.categoryIcons` zugeordnet.
- **Shortcodes:** `video`, `rawhtml`, `embed` (iframe erst nach Zustimmung, z. B. itch.io).
