# yarvolk.com

Personal portfolio and blog built with Astro and deployed to a Hetzner VPS (CloudPanel).

## Overview
This is a static site. Astro builds the source files into HTML/CSS/JS, and only the built files are served.

## Project structure (important folders)
- `src/` — pages, layouts, components
- `src/content/` — content in Markdown/MDX (blog + projects + pages)
- `public/` — static assets
- `dist/` — build output (generated)

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deployment (current setup)
- GitHub Actions runs on a self-hosted runner on the VPS.
- On every push to `main`, it builds the site on the server and deploys `dist/` to the web root.

Key paths on the server:
- Web root: `/home/yarvolk-com/htdocs/yarvolk.com`
- Runner: `/home/yarvolk-com/actions-runner`
- Source mirror: `/home/yarvolk-com/site-src`

## Editing content
Edit source files (not the HTML in `htdocs`):
- Home: `src/content/pages/-index.mdx`
- About: `src/content/pages/about.mdx`
- Contact: `src/content/pages/contact.mdx`
- Privacy: `src/content/pages/privacy.mdx`
- Blog posts: `src/content/blog/*.mdx`
- Projects: `src/content/project/*.mdx`

## Notes
- The live site is static; source edits require a build.
- Pushing to GitHub triggers the build + deploy automatically.
