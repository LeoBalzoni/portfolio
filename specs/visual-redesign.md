---
title: Portfolio Visual Redesign
status: Draft
created: 2026-04-11
author: Leonardo Balzoni
---

# Portfolio Visual Redesign

## Executive Summary

**What:** A comprehensive visual overhaul of the portfolio site — transforming it from a clean but generic scaffold into a polished, modern, single-page experience with a 3D WebGL hero, premium typography, scroll-driven animations, and a refined green-accented color palette.

**Why:** The current site reads as "default template." The goal is for the site itself to demonstrate craft — a visitor should feel "this person builds beautiful things" within seconds of landing.

**Scope:**
- Included: Home page conversion to single-page scroll, 3D Da Vinci bust in hero, new typography (Syne + Inter), green accent color palette, scroll-triggered animations, anchor-based navigation, contact/social section
- Excluded: Loading/splash screen (revisit after measuring performance), mobile-specific 3D fallback (ship same experience), contact form, blog post redesign (separate effort)

## Goals and Non-Goals

### Goals

- Create an immediately memorable first impression via the 3D hero and "Not this Leonardo" moment
- Achieve a premium, modern feel through typography, spacing, and animation quality
- Convert the home page to a single scrolling experience with smooth anchor navigation
- Introduce a subtle green accent color to break out of pure grayscale
- Maintain dark/light theme support with the new palette
- Keep separate pages for /projects/, /blog/, /blog/[slug], and resume (PDF download)

### Non-Goals

- Loading/splash screen (deferred — assess after 3D model integration to see if weight justifies it)
- Mobile-specific fallback for 3D (ship the same experience across devices for now)
- Blog post page redesign (separate spec)
- Contact form (social links are sufficient)
- Enterprise SSO, CMS, or backend (static export stays)

## Architecture

### Page Structure

```
Home (single scroll page)
├── Hero (full viewport)
│   ├── 3D Da Vinci bust (React Three Fiber)
│   ├── Name / title / tagline
│   └── "Not this Leonardo." caption
├── About / Tech Stack
├── Featured Projects (grid)
├── Latest Blog Posts
└── Contact / Social Links + Footer

Separate pages (standard navigation)
├── /projects/    — full project grid
├── /blog/        — all posts index
├── /blog/[slug]/ — individual MDX post
└── Resume        — PDF download link
```

### Navigation Behavior

- **On the home page:** Nav links (About, Projects, Blog, Contact) scroll to the corresponding section using anchor IDs with smooth scroll behavior. The active nav indicator updates based on scroll position (IntersectionObserver).
- **On sub-pages** (/projects/, /blog/, etc.): Nav links navigate back to the home page sections (e.g., `/#projects`). A "back to home" behavior is implicit.
- **Resume link:** Opens/downloads the PDF directly.

### Tech Stack Additions

| Package | Purpose |
|---------|---------|
| `@react-three/fiber` | React renderer for Three.js — renders the 3D bust |
| `@react-three/drei` | Helpers: `useGLTF`, `OrbitControls`, `Float`, environment lighting |
| `three` | Three.js core (peer dependency) |
| `next/font/google` | Load Syne + Inter fonts (replaces Geist) |

No additional animation libraries needed — Framer Motion (already installed) handles scroll-triggered reveals and section transitions.

## Design Specification

### Typography

**Font pairing:** Syne (headings/display) + Inter (body/UI)

| Element | Font | Weight | Size (desktop) | Size (mobile) |
|---------|------|--------|-----------------|----------------|
| Hero name | Syne | 800 (ExtraBold) | 5rem–6rem | 2.5rem–3rem |
| Section headings | Syne | 700 (Bold) | 2rem–2.5rem | 1.5rem–1.75rem |
| Nav links | Inter | 500 (Medium) | 0.875rem | 0.875rem |
| Body text | Inter | 400 (Regular) | 1rem–1.125rem | 1rem |
| Badges/tags | Inter | 400 (Regular) | 0.75rem–0.875rem | 0.75rem |
| Caption ("Not this Leonardo") | Syne | 400 (Regular) | 0.875rem | 0.75rem |

### Color Palette

Subtle green accent layered over the existing grayscale foundation. Using oklch for consistency with the current globals.css.

**Light mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.985 0.002 155)` | Barely-warm off-white with green whisper |
| `--foreground` | `oklch(0.145 0.01 155)` | Near-black with green undertone |
| `--primary` | `oklch(0.45 0.12 155)` | Muted forest green — links, active states, accent |
| `--primary-foreground` | `oklch(0.985 0 0)` | White text on primary |
| `--muted` | `oklch(0.95 0.01 155)` | Subtle green-tinted surface |
| `--muted-foreground` | `oklch(0.45 0.02 155)` | Subdued text |
| `--accent` | `oklch(0.92 0.03 155)` | Light green tint for hover states, badges |
| `--border` | `oklch(0.88 0.02 155)` | Soft green-gray borders |

**Dark mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.13 0.01 155)` | Deep dark with green undertone |
| `--foreground` | `oklch(0.95 0.01 155)` | Off-white with green warmth |
| `--primary` | `oklch(0.65 0.15 155)` | Brighter green for dark backgrounds |
| `--primary-foreground` | `oklch(0.13 0 0)` | Dark text on primary |
| `--muted` | `oklch(0.22 0.015 155)` | Dark surface with green hint |
| `--muted-foreground` | `oklch(0.65 0.02 155)` | Subdued light text |
| `--accent` | `oklch(0.25 0.03 155)` | Subtle green surface for hovers |
| `--border` | `oklch(1 0 0 / 10%)` | Keep current translucent border |

### 3D Hero Section

**Model:** [Da Vinci Bust by Mario Stocco](https://sketchfab.com/3d-models/da-vinci-bust-e0b7ecf8a49b4eaeb8df289ca486848c) (CC Attribution, free GLB download from Sketchfab).

**Layout:** Full-viewport hero. The bust is positioned to one side (right on desktop) with the name/title/tagline on the other side (left). The caption "Not this Leonardo." appears near the bust, styled as a subtle aside.

**Interactions:**
- **Idle:** Slow continuous rotation on the Y axis (~0.1 rad/s) + gentle floating motion (vertical bobbing via `drei`'s `<Float>`)
- **Mouse move:** Bust rotation tracks mouse position across the viewport (subtle, ±15 degrees). Creates a "watching you" feel without being aggressive.
- **Scroll:** As the user scrolls past the hero section, the bust fades out (opacity) and scales down slightly. Parallax optional — the bust scrolls at a slower rate than the text.

**Technical notes:**
- Load the GLB from `/public/models/davinci-bust.glb`
- Use `useGLTF.preload()` to start loading immediately
- Canvas is client-only (`"use client"` component) — wrap in `<Suspense>` with a fallback
- Lighting: soft ambient + single directional light. Optionally an `<Environment>` preset for reflections.
- The canvas MUST NOT block interaction with text/buttons overlaid on it (use `pointer-events: none` on the canvas, `pointer-events: auto` on interactive elements).

### Scroll Animations

All sections below the hero use scroll-triggered entrance animations via Framer Motion's `whileInView`:

| Element | Animation | Timing |
|---------|-----------|--------|
| Section headings | Fade up (y: 30 → 0, opacity: 0 → 1) | duration: 0.6s, ease: easeOut |
| Project cards | Staggered fade up | stagger: 0.1s between cards |
| Blog post rows | Slide in from left | duration: 0.5s, stagger: 0.08s |
| Tech stack badges | Staggered scale in | stagger: 0.05s |
| Social links (footer) | Fade up | stagger: 0.1s |

All animations trigger once (`once: true` on `whileInView`) — no re-animation on scroll back.

Smooth scroll between sections: `scroll-behavior: smooth` on `<html>` (already set in globals.css) + `scroll-margin-top` on each section to offset the sticky nav height.

### Component Changes

| Component | Change |
|-----------|--------|
| `layout.tsx` | Replace Geist fonts with Syne + Inter via `next/font/google` |
| `globals.css` | New green-accented color palette for both light and dark modes |
| `nav.tsx` | Anchor links (`#about`, `#projects`, `#blog`, `#contact`) on home page. Scroll-spy for active state. Keep page links for sub-pages. |
| `page.tsx` | Full rewrite: full-viewport hero with 3D canvas, anchored sections, new typography scale |
| `motion.tsx` | Add `ScrollFadeIn` and `ScrollStagger` components using `whileInView` instead of `animate` |
| `footer.tsx` | Becomes the contact/social section at the bottom of the scroll page |
| **New:** `hero-scene.tsx` | Client component: React Three Fiber `<Canvas>`, loads Da Vinci bust, handles mouse tracking + scroll fade |

### File Structure (new/changed)

```
public/
  models/
    davinci-bust.glb          # 3D model (downloaded from Sketchfab)
  resume.pdf                   # Resume PDF for download

src/
  components/
    hero-scene.tsx             # NEW — R3F canvas + 3D bust
    nav.tsx                    # MODIFIED — anchor scroll + scroll spy
    motion.tsx                 # MODIFIED — add scroll-triggered variants
    footer.tsx                 # MODIFIED — becomes contact section
  app/
    page.tsx                   # MODIFIED — single-page scroll layout
    layout.tsx                 # MODIFIED — new fonts
    globals.css                # MODIFIED — green palette
```

## Requirements

### Functional Requirements

- **FR-001:** Home page MUST be a single scrolling page with sections: Hero, About/Stack, Projects, Blog, Contact
- **FR-002:** Navigation links on the home page MUST scroll to the corresponding section, not navigate to a new page
- **FR-003:** Nav MUST highlight the currently visible section based on scroll position
- **FR-004:** Hero section MUST display a 3D Da Vinci bust loaded via React Three Fiber
- **FR-005:** The bust MUST auto-rotate slowly and respond to mouse position
- **FR-006:** The bust MUST fade out when scrolling past the hero section
- **FR-007:** The caption "Not this Leonardo." MUST appear near the bust
- **FR-008:** All sections below the hero MUST animate in on scroll (once per visit)
- **FR-009:** Resume link MUST open/download a PDF file
- **FR-010:** Separate pages MUST still exist for /projects/, /blog/, and /blog/[slug]/
- **FR-011:** Dark/light theme toggle MUST work with the new green-accented palette

### Non-Functional Requirements

- **Performance:** The 3D model GLB file SHOULD be under 5MB. Compress if larger.
- **Performance:** The site MUST remain functional while the 3D model loads (progressive enhancement via `<Suspense>`).
- **Compatibility:** MUST work in latest Chrome, Firefox, Safari, Edge. WebGL is required for the 3D bust — no fallback for now.
- **Accessibility:** All interactive elements MUST remain keyboard-accessible. The 3D canvas MUST NOT trap focus.
- **Build:** MUST still work with `output: "export"` (static export for GitHub Pages).

## Resolved Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Typography | Syne (headings) + Inter (body) | Syne is distinctive and creative without being loud; Inter is the gold standard for UI readability. Can swap later to test other pairings. |
| 3D library | React Three Fiber + drei | React-native integration, works with Next.js static export, large ecosystem, declarative API |
| 3D model | Da Vinci bust (Sketchfab, CC-BY) | Perfect thematic fit ("Not this Leonardo"), free, available in GLB |
| Color accent | Subtle green (oklch hue 155) | User preference. Applied as undertone across the palette rather than a loud accent. |
| Animation library | Framer Motion (existing) | Already installed, supports `whileInView` for scroll triggers. No need for GSAP. |
| Mobile 3D | Same as desktop | User decision — revisit if performance issues surface |
| Loading screen | Deferred | Assess after 3D integration — may not be needed if model is small and loads fast |

## Attribution

The Da Vinci bust 3D model is by [Mario Stocco on Sketchfab](https://sketchfab.com/3d-models/da-vinci-bust-e0b7ecf8a49b4eaeb8df289ca486848c) under Creative Commons Attribution license. Credit MUST be included in the site footer or an attributions page.

## Success Criteria

- [ ] Hero section loads with 3D bust visible and interactive within 3 seconds on broadband
- [ ] Scrolling through the page feels smooth (no jank from 3D rendering)
- [ ] All sections animate in on scroll
- [ ] Nav correctly highlights active section while scrolling
- [ ] Color palette looks intentional in both light and dark modes
- [ ] Typography hierarchy is clear and feels premium (not generic)
- [ ] "Not this Leonardo" makes visitors smile
- [ ] Site still builds and deploys via static export to GitHub Pages
