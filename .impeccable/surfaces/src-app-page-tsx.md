---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/layout.tsx"]
---

# Home sheet and site shell

Scope: the home page (`src/app/page.tsx`) and the shared shell it sets for writing, work and post pages. Mode: Experience on the home page; Read on post pages.

Audience and job: engineering peers and hiring managers arriving from a shared link; they should find one piece worth reading within seconds and know how to reach Leonardo. Proof on hand: posts written from real pull-request history, merged-PR counts per repository, two live party games with screenshots. Constraint: static export under a base path, no backend.

Memorable moment: a red route draws itself from the lake shore up to a summit, and every stop on it is something to read.

Unresolved: video link for the talk post, a portrait, a résumé PDF.

## Direction contract

THESIS: Five years of work drawn as one sheet of the Swiss national map. Posts and projects are named places on a waymarked route; the site refuses the dark developer-portfolio page of intro, card grid and post list.

OWN-WORLD: Cool map-paper ground, a large pale lake-blue field with depth lines, sienna contour lines with heavier index contours, soft relief shading, forest-green tints, one signal-red route with ringed waypoints. Upright grotesk in several widths for places and interface, letterspaced italic serif for water, serif text for reading. A fine kilometre grid with coordinates in the margin. Spot heights are real merged-PR counts.

STORY: The visitor sees a map with a name on it, understands that the labelled stops are writing, follows one, and later finds the legend that explains who drew it and how to reach him.

FIRST VIEWPORT: Generated terrain fills the frame, lower half lake. Sheet line top left, four plain nav links top right. The name at wall-map scale upper left with a two-line statement under it. A dashed red route climbs from the shore, lower centre, to a summit upper right through four waypoints, each a linked piece of writing with its kind and date. "LAC LÉMAN" letterspaced in italic across the empty water, and one ferry line to the games.

Signature interaction: the route draws from shore to summit once on load, waypoints landing in order; hovering or focusing a waypoint lifts its label and thickens its ring. Motion grammar: lines draw, labels settle, nothing bounces; reduced motion shows the finished sheet.

FORM: National map sheet, position 4 of 7 on the grounded list. seed:87c49b48cbc440a8

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
