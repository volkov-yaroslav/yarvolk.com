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

## Favicons
Replace `public/images/favicon.png` with a square PNG of at least 180x180 pixels
(512x512 recommended). This remains the single source for all icons.
Astro generates 16, 32, and 48 pixel tab icons, a multi-size ICO, and a 180 pixel
Apple touch icon during each build. Every page and language uses the same set.
The linked filenames include a source-image hash so replacing the PNG changes
the URLs rather than depending on browser or CDN cache clearing. Root-level
`/favicon.ico` and `/apple-touch-icon.png` are also generated as discovery fallbacks.
No runtime image processing or separate generated files need to be maintained.

Run `npm run test:favicons` for icon generation and cache-versioning checks.

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
