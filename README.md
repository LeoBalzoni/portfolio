# Portfolio

Personal portfolio site — homepage with a 3D hero scene, project showcase, and an MDX-powered blog. Built as a static export and deployed to GitHub Pages.

## Tech stack

**Framework & language**
- [Next.js 16](https://nextjs.org) (App Router, static export via `output: "export"`)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)

**Styling & UI**
- [Tailwind CSS 4](https://tailwindcss.com) with `@tailwindcss/typography` and `tw-animate-css`
- [shadcn/ui](https://ui.shadcn.com) primitives (Button, Card, Badge, Separator) built on [Base UI](https://base-ui.com)
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [lucide-react](https://lucide.dev) icons
- `class-variance-authority`, `clsx`, `tailwind-merge` for variant/className composition

**3D & motion**
- [three.js](https://threejs.org) with [@react-three/fiber](https://r3f.docs.pmnd.rs) and [@react-three/drei](https://drei.docs.pmnd.rs) for the hero scene
- [framer-motion](https://www.framer.com/motion/) for UI animations

**Content**
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for MDX blog posts
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for frontmatter parsing
- [reading-time](https://github.com/ngryman/reading-time) for post read-time estimates

**Tooling**
- ESLint 9 (`eslint-config-next`)
- PostCSS (`@tailwindcss/postcss`)

## Project structure

```
portfolio/
├── content/
│   └── blog/                 # MDX blog posts (frontmatter + body)
├── public/
│   ├── models/               # GLTF/3D assets for the hero scene
│   └── *.svg                 # Static icons
├── specs/                    # Design / spec documents
├── src/
│   ├── app/                  # Next.js App Router routes
│   │   ├── layout.tsx        # Root layout (theme provider, nav, footer)
│   │   ├── page.tsx          # Homepage with hero scene
│   │   ├── globals.css       # Tailwind entry + global styles
│   │   ├── opengraph-image.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog index
│   │   │   └── [slug]/       # Individual post pages
│   │   └── projects/
│   │       └── page.tsx      # Projects listing
│   ├── components/
│   │   ├── hero-scene.tsx    # react-three-fiber scene
│   │   ├── hero-scene-loader.tsx
│   │   ├── nav.tsx, footer.tsx
│   │   ├── theme-provider.tsx, theme-toggle.tsx
│   │   ├── motion.tsx, icons.tsx
│   │   └── ui/               # shadcn primitives
│   ├── data/
│   │   └── projects.ts       # Project entries shown on /projects
│   └── lib/
│       ├── blog.ts           # MDX loading + frontmatter helpers
│       ├── site.ts           # Site metadata
│       └── utils.ts          # `cn()` and shared helpers
├── next.config.ts            # Static export + GitHub Pages basePath
├── components.json           # shadcn config
└── tsconfig.json
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

- `npm run dev` — start the dev server
- `npm run build` — produce a static export in `out/`
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Deployment

The site is configured for static export (`output: "export"` in `next.config.ts`) and uses a `/portfolio` `basePath` in production for GitHub Pages. The built site lands in `out/`.
