---
title: Content + Substance TODOs
status: Draft
created: 2026-05-17
author: Leonardo Balzoni
---

# Content + Substance TODOs

The visual shell is in good shape (see `specs/visual-redesign.md`). What still reads
as "polished template" is the **content** — placeholder links, generic copy, and
missing detail pages. This doc tracks the items to work through together, step
by step.

Each section ends with a **Decisions needed** list — the questions to answer
before we touch code.

---

## 1. Replace placeholder content

Right now the site has six fictional projects, three social links that point to
`github.com` / `linkedin.com` / `x.com`, an `hello@example.com` mailto, and no
photo of you. Recruiters and clients ping the socials first, so this is the
highest-leverage thing to fix.

### What's placeholder today

| Location | File | Current value |
|---|---|---|
| Featured projects on home | `src/data/projects.ts` | 6 fictional entries (Cloud Intelligence Platform, etc.) |
| Social hrefs on home hero | `src/app/page.tsx` (`socials` array) | `https://github.com`, `https://linkedin.com`, `https://x.com` |
| Social hrefs in footer | `src/components/footer.tsx` (`socials` array) | same placeholders + `mailto:hello@example.com` |
| Social hrefs in contact section | `src/app/page.tsx` (reused `socials` array) | same |
| Blog posts | `content/blog/hello-world.mdx`, `building-with-ai.mdx` | scaffold posts |

### Plan

- Decide which socials to keep. The current set is GitHub / LinkedIn / X.
  Worth considering: do you want X on a portfolio aimed at hiring, or drop it
  for something like Bluesky / your personal blog RSS / Read.cv?
- Pick **3–5 real projects** to feature. They don't all need to be open-source —
  a one-paragraph case study of work shipped at $employer counts. If the
  source isn't public, drop `github` from the entry and only set `live` or
  neither (the UI handles both being absent).
- Replace the email. If you don't want to expose a personal address, a
  forwarding alias (`hello@leonardobalzoni.com` once you own the domain) is
  the standard portfolio move.
- Decide whether to keep both scaffold blog posts visible at launch, replace
  them with one real post, or hide the Blog section entirely until you have
  something to publish (the home page already conditionally renders it on
  `latestPosts.length > 0`, see `src/app/page.tsx:207`).

### Decisions needed

- [ ] Final list of social platforms + real URLs.
- [ ] Real email address (or forwarding alias).
- [ ] List of 3–5 real projects to feature, with for each: title, one-paragraph
      description, tags, optional `github` URL, optional `live` URL.
- [ ] Blog at launch: keep scaffold posts / replace / hide.

---

## 2. Project case-study pages

Today, clicking a project's "Code" link jumps to a GitHub placeholder. There's
no place where you actually *talk about* the work — the constraints, the
trade-offs, what you'd do differently. For a senior-engineering portfolio,
this is the single strongest section you can add. Visitors who scroll past
the hero are looking for evidence of judgement, not a list of tag chips.

### Two reasonable shapes

**Option A — MDX per project, mirrors blog.** Add a `content/projects/`
folder with one `.mdx` per project, a route at `src/app/projects/[slug]/page.tsx`,
and reuse the same MDX rendering setup (`next-mdx-remote/rsc`, the `prose`
class on `<article>`) we already use in `src/app/blog/[slug]/page.tsx`. Pros:
no new tooling, you write in markdown, easy to embed images / code blocks.
Cons: you'll re-type metadata fields that already exist in `src/data/projects.ts`.

**Option B — Co-located data + MDX content.** Keep the metadata (title,
description, tags, links, `featured`) in `src/data/projects.ts` as today, and
add an optional `body` field that points to a markdown file. The detail page
reads both. Pros: project card lists keep working untouched, no duplicated
metadata. Cons: slight indirection between the data and the prose.

I'd suggest **Option B** — minimal disruption, and the card list on
`/projects/` already reads from the data file, so we'd just add `<Link>`
wrappers when a `body` exists.

### Detail page outline (whichever option we pick)

Mirror the blog post layout, but with project-specific blocks:

- Eyebrow: "← Back to projects"
- H1: project title
- Subtitle: one-sentence pitch (the existing `description`)
- Stat row: role, dates, team size, stack (badges row already styled)
- Hero image / screenshot / short demo gif
- MDX body — free-form, but a useful shape is:
  - **Context** — what was the actual problem and constraints?
  - **What I did** — the work, with one or two trade-off callouts
  - **Outcome** — measurable result if you have one, otherwise what shipped
- Footer: links to code / live demo if public

### Decisions needed

- [ ] Option A vs. Option B (recommend B).
- [ ] Which projects get a full case study vs. just a card. Not every project
      needs prose — pick the 2–3 you're proudest of.
- [ ] Where do screenshots / demo gifs live? `public/projects/<slug>/...` is
      the obvious answer.

---

## 3. Resume PDF

The redesign spec (`specs/visual-redesign.md:201`, `FR-009`) calls for a
Resume link that opens / downloads a PDF, and `public/resume.pdf` is
referenced in the file-structure section. Neither the file nor any UI link
to it exists today. Either ship it or remove the line from the spec so it
stops being a silent TODO.

### Plan

- Drop the PDF at `public/resume.pdf`. With `basePath: "/portfolio"` set in
  `next.config.ts`, the URL becomes `/portfolio/resume.pdf` in prod — the
  `<a href>` should be a plain `/resume.pdf` (Next prefixes basePath
  automatically when used via `<Link>`, but for a raw `<a>` we want to use
  Next's basePath-aware helper, or hardcode the prefix conditionally).
- Decide *where* the link lives. Three reasonable spots:
  1. In the hero, as a secondary CTA next to "View my work" — most visible.
  2. In the nav, as a top-level "Resume" link — easy to find.
  3. In the contact section, alongside the social buttons — least intrusive.
- Open in a new tab (`target="_blank"`) so it doesn't blow away the scroll
  position.

### Decisions needed

- [ ] Where does the link live? (recommend: hero as secondary CTA *and* nav
      link — small enough that doubling up doesn't hurt.)
- [ ] What does it actually link to? Hosting the PDF in the repo is fine but
      means every CV revision is a commit. Alternative: link to a stable
      Read.cv / LinkedIn PDF export.

---

## 10. Hero copy

The eyebrow says "Hey, I'm" → name. Below the name, the paragraph reads:

> Software engineer who enjoys building things that live on the internet.
> Currently focused on cloud platforms, data systems, and developer tooling.

That's fine but generic — it could describe a thousand engineers. The hero
is the one piece of copy that *every* visitor reads, and it's where to
spend the most opinion / personality budget.

### What "better" looks like

A specific, dated sentence beats a category list. Compare:

- ❌ "Currently focused on cloud platforms, data systems, and developer tooling."
- ✅ "Currently at Nexthink, building the data platform that powers our
      observability product."
- ✅ "Previously shipped X at Y — open to staff-level platform roles in EU."

The pattern: **what you're doing right now + one concrete signal** (a
company, a result, a stack, an availability note). The second sentence can
stay broad if the first one anchors.

### Plan

- Rewrite the body paragraph (`src/app/page.tsx:89`) to lead with a specific
  current-state sentence.
- Optionally drop the "Hey, I'm" eyebrow — if you're already named in the
  nav and meta title, it's a small redundancy. Keeping it is fine; just a
  call to make.
- If you want a hint of personality (not required), one short third
  sentence in italics or muted color works well — a hobby, a city, a stance.

### Decisions needed

- [ ] What's the "anchor sentence"? (current role + one concrete signal)
- [ ] Keep or drop the "Hey, I'm" eyebrow.
- [ ] Add a third "flavor" sentence, or leave it at two.

---

## How we'll work through this

These four blocks aren't equal in size. Suggested order, lightest first:

1. **§3 Resume PDF** — basically a file drop + one link. 15 minutes.
2. **§10 Hero copy** — pure writing. We iterate on a single paragraph.
3. **§1 Real content** — biggest *outside-of-repo* effort (you need to
   collect URLs and write blurbs), but small code changes.
4. **§2 Case-study pages** — biggest *inside-of-repo* effort (new route,
   new content folder, image handling) and benefits from §1 being done
   first so the project list is final.

Ping me on whichever you want to start on and we'll walk through it.
