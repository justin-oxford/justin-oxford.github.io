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

## Edit content in the browser (Pages CMS)

Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, and open this repo. You get forms for
Projects, Writing, the Home bio, and the About timeline/certificates. Saving commits to `main` and the site
redeploys in about a minute. The forms are defined in `.pages.yml`.

- New entries start as **Draft** (hidden from the live site). Turn Draft off to publish.
- Project images upload to `src/content/projects/images/`; writing PDFs to `src/docs/`.
- To add a new tag, add it to `src/data/tags.yaml` **and** to the `tags` field in `.pages.yml`. The build fails if
  the two lists differ.
- The build still validates every save. If something's invalid, the deploy fails (check the Actions tab) and the
  live site stays as it was.

## Add a project (by hand)

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

**Launch check:** every build fails if the text `TODO(Justin)` or any draft content ends up in the built site
(see `src/integrations/launch-check.mjs`). Unwritten Home/About text simply doesn't render on the live site.

**Drafts:** entries with `draft: true` never appear on the live site, but `npm run dev` shows them
(marked "Draft") so you can review them. Delete the `draft: true` line to publish.

## Content layout

| Path | What |
| --- | --- |
| `src/content/projects/*.md` | One file per project |
| `src/content/writing/*.md` | One file per essay/paper/story (`title`, `year`, `kind`, `summary`, `pdf`, `draft`) |
| `src/docs/**.pdf` | Writing PDFs. `pdf: /docs/essays/x.pdf` means the file at `src/docs/essays/x.pdf`; only PDFs of published entries are copied into the site |
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
