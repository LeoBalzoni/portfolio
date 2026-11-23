# Portfolio

Leonardo Balzoni's personal site: writing, work notes and side projects, drawn as one sheet of a topographic map. Built as a static export and deployed to GitHub Pages on every push to `main`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, `output: "export"`), React 19, TypeScript
- Plain CSS in `src/app/globals.css`; fonts (Archivo, Literata, JetBrains Mono) self-hosted through `next/font`
- MDX posts rendered with `next-mdx-remote`, with `remark-gfm` for tables
- No client-side libraries beyond React; the map is static SVG and CSS

## Layout

```
content/blog/            MDX posts (frontmatter + body)
scripts/
  generate-terrain.mjs   Generates the map artwork and route geometry
public/
  map/                   Generated: sheet-wide.svg, sheet-tall.svg
  games/                 Screenshots used in the games section and post
src/
  app/                   Routes: / , /blog/ , /blog/[slug]/ , /work/
  components/            map-sheet, profile, post-list, site-nav, site-footer, mdx
  data/
    sheet.ts             Which posts sit on the map, and their short names
    work.ts              Repositories, merged-PR counts and what was done in each
    terrain.json         Generated: route, waypoint and label positions
  lib/                   blog.ts (post loading), site.ts (identity, base path)
PRODUCT.md               Product brief
DESIGN.md                Design system
```

## Common tasks

```bash
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

**Add a post.** Create `content/blog/<slug>.mdx` with `title`, `description`, `date`, `kind` (`post`, `talk` or `games`) and `tags`. To control its place in the index, add the slug to `ORDER` in `src/lib/blog.ts`. To put it on the map, add it to `route` or `villages` in `src/data/sheet.ts`.

**Link the talk recording.** Set `video` in the frontmatter of `content/blog/how-to-survive-the-ai-era.mdx`.

**Images in posts.** Put files under `public/` and use `<Figure src="/games/file.jpg" alt="..." caption="..." />`. The component adds the deployment base path.

**Change the map.** Edit the sheet definitions at the top of `scripts/generate-terrain.mjs` (shoreline, peaks, route points, label positions), then run `node scripts/generate-terrain.mjs` and commit the regenerated files. The terrain is synthetic and seeded, so the output is reproducible.

**Update the work numbers.** Edit `src/data/work.ts`. The profile chart and totals are computed from it.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages. The site is served under `/portfolio`, which `src/lib/site.ts` applies as the base path in production builds.
