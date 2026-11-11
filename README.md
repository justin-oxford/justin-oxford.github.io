# justinoxford.com

Justin Oxford's personal site: a catalog of projects, writing, and aviation career.
Static [Astro](https://docs.astro.build) site, deployed to GitHub Pages. No server, no database.

**Legacy site (reference only):** the old site this replaces lives in
`D:\Documents\Web-Development\justin-oxford-dot-com` and `D:\Documents\Web-Development\justin-oxford-dot-com-api`
(GitHub: `justin-oxford/justin-oxford-dot-com`). Never copy its `php/` folders, logs, `build/`, or `node_modules/`.

## Run locally

Requires Node 26 (see `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build into dist/, validates all content
npm run preview   # serve the built dist/ locally
```

## Add a project

1. Copy an existing file in `src/content/projects/` and rename it (the filename becomes the URL slug).
2. Edit the frontmatter and write-up. Add any new tag to `src/data/tags.yaml`.
3. Commit and push. It's live in about a minute.

Frontmatter:

```yaml
---
title: JavaScript Racing
summary: One-line description.
status: archived          # active | archived | shelved
started: 2019-06          # YYYY-MM
ended: 2019-08            # optional
tags: [javascript, game-dev]   # must exist in src/data/tags.yaml
featured: true            # shows on Home
draft: false              # true = excluded from the build
links:                    # all optional
  repo: https://github.com/justin-oxford/javascript-racing
  live: /play/javascript-racing/
cover: ./javascript-racing/cover.png    # optional
coverAlt: Overhead view of the circuit  # required if cover is set
---
Write-up in Markdown.
```

If anything is wrong (unknown tag, bad date, typo'd field name, missing `coverAlt`), `npm run build`
fails and names the file and field.

**Drafts:** entries with `draft: true` never appear on the live site, but `npm run dev` shows them
(marked "Draft") so you can review them. Delete the `draft: true` line to publish.

## Content layout

| Path | What |
| --- | --- |
| `src/content/projects/*.md` | One file per project |
| `src/content/writing/*.md` | One file per essay/paper (`title`, `year`, `kind`, `summary`, `pdf`, `draft`); PDFs go in `public/docs/` |
| `src/data/tags.yaml` | Tag vocabulary (`id`, `label`) |
| `src/data/timeline.yaml` | Career timeline (`start`, `end?`, `org`, `role`, `summary`) |
| `src/data/certificates.yaml` | Certificates & ratings (`name`, `detail?`), in display order |
| `src/content.config.ts` | Schemas for all of the above |
| `public/play/<game>/` | Archived playable builds |

## How deploy works

Every push to `main` runs `.github/workflows/deploy.yml`: the official `withastro/action` installs from
`package-lock.json`, builds, and uploads `dist/`; then `actions/deploy-pages` publishes it.
The repo is `justin-oxford.github.io`, so no `base` path is needed. Watch runs in the repo's **Actions** tab.
It can also be re-run by hand from there (**Run workflow**).

One-time setup: repo → Settings → Pages → Source: **GitHub Actions**.
