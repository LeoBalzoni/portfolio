---
name: Leonardo Balzoni
description: A personal site drawn as one sheet of the Swiss national map; posts are places on a red waymarked route.
colors:
  route: "#d3301f"
  route-ink: "#ad2415"
  lake: "#cde2ef"
  lake-2: "#b5d2e5"
  lake-ink: "#1c577c"
  lake-line: "#5f9cc4"
  lake-depth: "#3f86b4"
  shoreline: "#3f7fa8"
  lake-text: "#1f3340"
  contour: "#a8683a"
  contour-ink: "#7a4521"
  index-contour: "#96592e"
  forest: "#b9d6a9"
  paper: "#f3f4ee"
  paper-2: "#e8eae1"
  ink: "#1b1c1a"
  ink-2: "#44463f"
  ink-3: "#63655d"
  rule: "rgb(27 28 26 / 0.16)"
  waypoint-white: "#ffffff"
  relief-shadow: "#464e68"
  relief-light: "#fffcee"
typography:
  display:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(3.25rem, 10.3cqw, 10.5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.038em"
    fontVariation: "'wdth' 100"
  page-title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.036em"
  post-title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.3rem, 6.4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.036em"
  headline:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.018em"
  place-name:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1rem, 1.7cqw, 1.7rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 96"
  spot-height:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1
    fontVariation: "'wdth' 88"
    fontFeature: "'tnum'"
  sheet-line:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum'"
  label:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  lede:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  reading:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.09rem, 1.5vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.68
  water:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.4rem, 3.1cqw, 3.2rem)"
    fontWeight: 400
    letterSpacing: "0.5em"
  water-heading:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 4.4vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "0.005em"
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "2px"
  code: "3px"
  block: "4px"
  figure: "0.9rem"
  mark: "50%"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 4.5rem)"
  band: "clamp(4.5rem, 9vw, 8.5rem)"
  head-gap: "clamp(2.25rem, 4vw, 3.5rem)"
  column-gap: "clamp(2rem, 6vw, 6rem)"
  row: "1.6rem"
  profile-inset: "2.25rem"
  wrap: "76rem"
  measure: "43rem"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "0.6rem 0"
  nav-link-active:
    textColor: "{colors.ink}"
  more-link:
    textColor: "{colors.ink}"
    padding: "0.5rem 0"
  more-link-hover:
    textColor: "{colors.route-ink}"
  gazetteer-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "1.6rem 0"
  gazetteer-row-hover:
    textColor: "{colors.route-ink}"
  waypoint:
    backgroundColor: "{colors.waypoint-white}"
    textColor: "{colors.ink}"
    typography: "{typography.place-name}"
    rounded: "{rounded.mark}"
    size: "clamp(0.95rem, 1.5cqw, 1.5rem)"
  mark-route:
    backgroundColor: "{colors.waypoint-white}"
    rounded: "{rounded.mark}"
    size: "1.05rem"
  mark-village:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.mark}"
    size: "0.6rem"
  mark-ferry:
    backgroundColor: "{colors.lake}"
    rounded: "{rounded.mark}"
    size: "1.05rem"
  spot-height:
    textColor: "{colors.contour-ink}"
    typography: "{typography.spot-height}"
  lake-band:
    backgroundColor: "{colors.lake}"
    textColor: "{colors.lake-text}"
    padding: "clamp(4.5rem, 9vw, 8.5rem) 0"
  profile-station:
    textColor: "{colors.ink}"
    padding: "0.8rem 0.5rem 0.9rem"
  profile-station-hover:
    backgroundColor: "{colors.paper-2}"
  inline-code:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.code}"
    padding: "0.12em 0.34em"
  code-block:
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.block}"
    padding: "1.1rem 1.25rem"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "0.6rem 1rem"
---

# Design System: Leonardo Balzoni

## Overview

**Creative North Star: "The National Map Sheet"**

The site is drawn as one sheet of the Swiss national topographic map: Sheet 1243, Lausanne, 1:25 000. The home page is the map itself, a generated terrain of sienna contours, cool relief shading and forest tint rising from a pale lake, with the name lettered at wall-map scale and a dashed red route climbing from the shore to a summit. Every ringed waypoint on that route is a piece of writing. The pages around it are the sheet's margins and its companion documents: a gazetteer of posts, an elevation profile of the work, a legend, a scale bar in the colophon.

The system is a printed map read in daylight. One light theme, paper ground, hairline rules, flat ink. Each colour carries a cartographic meaning and keeps it everywhere: red is the way to go, blue is water and play, sienna is ground and anything counted, green is forest and lives only in the terrain. Type follows map lettering: an upright grotesque in several widths for places and interface, italic serif for water, serif text for reading. Numbers are measurements: spot heights are real merged pull-request counts, and the profile's silhouette is plotted from them.

Density is generous on the map and in the bands below it, then tightens into ruled index rows on the work page and a single 43rem reading column on posts. Motion is the drawing of a line: the route draws once from shore to summit, waypoints land in order, the lake name settles, and nothing bounces.

**Key Characteristics:**
- One light theme on cool map paper; ink hairlines instead of boxes.
- A single signal red, reserved for the route, its rings and the underline of a link worth following.
- Lake blue as a full-width field for the side projects, with its own ink and italic serif lettering.
- Sienna for contours, the elevation profile, spot heights and list ticks: the colour of measured ground.
- Archivo on its width axis for places and interface, Literata for reading and for water, JetBrains Mono for code.
- Generated terrain (seed 1243) in two drawings of the same sheet: landscape, and portrait for narrow screens.

## Colors

A printed-map palette: neutral paper and ink, three working inks (red, blue, sienna) and one terrain tint (green), each tied to one meaning.

### Primary
- **Waymark Red** (`route`): the dashed route, the ring of a waypoint and of a route marker in the index, the 2px underline under navigation, "more" links and contact links, and the underline colour of links in prose. It is a line colour, never a fill and never text.
- **Waymark Red, Inked** (`route-ink`): the text colour a link takes on hover, and the focus outline. Use this, not `route`, wherever red must be read as text.

### Secondary
- **Lake** (`lake`): the water field on the map and the ground of the games band; also the fill of a ferry-stop marker.
- **Lake Shallow** (`lake-2`): text selection.
- **Lake Ink** (`lake-ink`): water lettering, the ferry line and its stop ring, game years, and the underline and hover colour of links on the lake band.
- **Lake Text** (`lake-text`): body copy set on the lake band.
- **Shoreline** (`shoreline`): the 1.3px shore stroke in the terrain and the 1.5px top and bottom edge of the lake band.
- **Depth Line** (`lake-line`) and **Depth Tint** (`lake-depth`): terrain only. Depth lines at 0.7px and 55% opacity; depth bands stacked at 3.5% opacity and up.

### Tertiary
- **Contour Sienna** (`contour`): 0.7px minor contours at 62% opacity, the profile's ground fill at 16%, the bedrock hatching and its border, blockquote rules, the scrollbar thumb.
- **Contour Ink** (`contour-ink`): the profile line, spot heights on the work page, list ticks and ordered-list numerals in prose.
- **Index Contour** (`index-contour`): terrain only; the heavier 1.25px contour every 250 m at 80% opacity.
- **Forest** (`forest`): terrain only, filled at 62% opacity. It has no interface use.

### Neutral
- **Map Paper** (`paper`): the page and the sheet ground; also the halo cut around map lettering.
- **Paper Shade** (`paper-2`): inline code ground and the hover ground of a profile station.
- **Ink** (`ink`): text, the neatline, the solid rules that open and close a list, village dots.
- **Ink 2** (`ink-2`): ledes, descriptions and secondary reading text.
- **Ink 3** (`ink-3`): metadata, captions, axis labels.
- **Rule** (`rule`): hairlines between rows; ink at 16%.
- **Waypoint White** (`waypoint-white`): the inside of a route ring, so it reads over contours and paper alike.
- **Relief Shadow** (`relief-shadow`) and **Relief Light** (`relief-light`): terrain only. Shade at up to 26% alpha on slopes facing away from a north-west light, warm highlight at up to 70% on lit slopes.

### Named Rules
**The One Route Rule.** Red marks the way to go and nothing else: the route, its rings, and the underline of a link. No red fills, no red headings, no red text at rest.

**The Water Rule.** Lake blue appears where there is water or play: the map's lake, the games band, the ferry line and its markers. Platform work never sits on blue.

**The Measured Ground Rule.** Sienna belongs to terrain and to counts taken from the real history: contours, the profile, spot heights, list ticks. A sienna number is always a real merged-PR count.

## Typography

**Display Font:** Archivo, variable with the width axis (with Helvetica Neue, Arial)
**Body Font:** Literata, roman and italic (with Georgia, Times New Roman)
**Label/Mono Font:** JetBrains Mono for code (with ui-monospace, SF Mono, Menlo). Labels and metadata are Archivo.

**Character:** Map lettering. An upright grotesque names land and runs the interface, changing width rather than face as its job changes; an italic serif names water; a book serif carries anything meant to be read through. Figures are tabular everywhere.

### Hierarchy
- **Display** (700, width 100, clamp(3.25rem, 10.3cqw, 10.5rem), 0.9, -0.038em): the name on the sheet. Sized in container-query units so it scales with the map, not the window. On the portrait sheet it runs at clamp(3.1rem, 17cqw, 7rem).
- **Page title** (700, clamp(3rem, 9vw, 6rem), 1, -0.036em): the h1 of an inner page. Post titles are the same voice at clamp(2.3rem, 6.4vw, 4rem), 1.02.
- **Headline** (700, clamp(2rem, 4.4vw, 3.6rem), 1, -0.032em): section h2. Layer headings on the work page step down to clamp(1.9rem, 3.4vw, 2.75rem); h2 inside prose to clamp(1.55rem, 2.6vw, 1.95rem), 1.12.
- **Title** (650, clamp(1.3rem, 2.2vw, 1.75rem), 1.15, -0.018em): a row title in the index. Smaller titles (adjoining sheets, off-sheet work, prose h3) sit at 1.2rem to 1.25rem, 650.
- **Place name** (700, width 96, clamp(1rem, 1.7cqw, 1.7rem), 1.08): waypoint lettering on the map; the summit is larger, villages lighter (500) and smaller. Notes under a name are 500, `ink-2`.
- **Spot height** (700, width 88, tabular, line-height 1): a count, preceded by a round dot in the current colour. 1.5rem to 1.6rem on the work page, clamp(1.1rem, 2vw, 1.6rem) on the profile.
- **Sheet line** (700, width 112, 0.01em): the sheet designation or the name in the top margin.
- **Body** (Archivo 400, 1.0625rem, 1.5): interface text, legend entries, tables.
- **Lede** (Literata 400, clamp(1.0625rem, 1.3vw, 1.25rem), 1.55, `ink-2`, max 62ch): the paragraph beside or under a heading, and descriptions in lists.
- **Reading** (Literata 400, clamp(1.09rem, 1.5vw, 1.2rem), 1.68): post prose in a 43rem measure, hanging punctuation, 1.25em between blocks.
- **Water** (Literata italic, uppercase, 0.5em tracking, `lake-ink`): the lake's name across open water. Water headings are Literata italic 500 in sentence case.
- **Label** (Archivo 400 to 600, 0.875rem, `ink-3`): metadata, captions, colophon. The first item of a metadata run is `ink`, 600 to 650.
- **Code** (JetBrains Mono, 0.875rem, 1.6 in blocks; 0.84em inline; 600 for repository names).

### Named Rules
**The Lettering Rule.** Land and interface are upright Archivo; water is italic Literata; reading is roman Literata. A face never crosses into another's territory.

**The Width Rule.** Emphasis within Archivo comes from the width axis as well as weight: 88 for spot heights, 96 for place names, 100 for display, 112 for the sheet line. Do not reach for a second sans.

**The Open Water Rule.** Letterspaced capitals are how a map names water, and that is their only use here. No tracked uppercase labels over headings or sections.

## Layout

The home page opens on the sheet at full width under a 4rem top margin. The landscape drawing is 1440 by 820 units and is capped at `max(60rem, (100svh - 4rem) * 1440 / 820)` wide, so the whole map, lake included, is in view on arrival; on short, wide windows paper shows either side of the neatline. Everything on the sheet is positioned in percentages of the drawing and sized in container-query units, so labels keep their place on the terrain at any width. Below 56rem the portrait drawing (800 by 1800) replaces it, with the title across the top and labels alternating sides of the route.

Below the map, content sits in a 76rem wrap with a fluid gutter (clamp(1.25rem, 4.5vw, 4.5rem)). Sections are bands with clamp(4.5rem, 9vw, 8.5rem) of vertical padding. A band head is an asymmetric two-column grid, 5 to 6, heading left and lede right, aligned to their bottoms; the legend reuses the same split. The work page uses 4 to 8 with a sticky layer heading at 1.5rem. Posts are a single column of 43rem plus gutters. The games band is three equal columns of phone screens, two for one game and one for the other.

Lists are ruled, not boxed: rows of 1.6rem to 1.75rem padding separated by 16% hairlines, opened and closed by solid ink rules. The profile and everything under it are inset 2.25rem to make room for the axis.

Two breakpoints. At 56rem all two-column grids collapse to one, index metadata drops under its row as a wrapped line, the sticky heading is released, and the scale bar changes from 16.667vw to 25vw so it still equals one grid square of the sheet in view. At 36rem the top margin tightens to 3.5rem, the name abbreviates to "L. Balzoni", the sheet line drops to "Sheet 1243", the profile loses its axis and inset, and repository rows stack.

## Elevation & Depth

The interface is flat, like print. Depth belongs to the terrain, where relief shading is drawn into the artwork by the generator, and to raster objects laid on the sheet, which are the only things that cast a shadow. Legibility over terrain comes from a paper halo cut around the lettering (a 0.32em stroke painted under the fill, in `paper` on land and `lake` on water), which is the map's own device and not a glow.

### Shadow Vocabulary
- **Screenshot on the lake** (`box-shadow: 0 1.1rem 2.2rem -1rem rgb(18 52 76 / 0.55), 0 0 0 1px rgb(18 52 76 / 0.25)`): phone screenshots in the games band.
- **Figure in a post** (`box-shadow: 0 1rem 2rem -1.1rem rgb(27 28 26 / 0.5), 0 0 0 1px var(--rule)`): images inside prose.
- **Waypoint halo** (`box-shadow: 0 0 0 calc(var(--ring) * 0.4) rgb(211 48 31 / 0.2)`): a flat ring around a waypoint on hover and focus; a state, not elevation.

### Named Rules
**The Printed Sheet Rule.** Nothing drawn in ink casts a shadow. Only a photograph or screenshot placed on the sheet does.

## Shapes

Square and ruled. Sections, lists, the profile, the bedrock strip and the sheet itself have no corner radius; structure is drawn with 1px ink lines (the neatline, the rule that opens and closes a list, the 2px baseline of the profile) and 16% hairlines between rows. The only round things are point symbols, which are full circles: route rings (white inside, red border of 24% of the diameter), village dots (solid ink), ferry stops (lake fill, lake-ink border), and the dot before a spot height.

Small radii appear only where content from elsewhere is set into the page: 3px on inline code, 4px on code blocks, 0.9rem on post figures and clamp(0.9rem, 1.6vw, 1.4rem) on phone screenshots, which reads as the device's own corner. The focus outline carries a 2px radius.

Lines have a vocabulary. Solid ink is structure. Dashed red with round caps (13 on, 9 off, 4.5 wide, over a 75% paper casing) is the route. Fine dashed lake-ink (9 on, 6 off, 1.6 wide) is the ferry. Dotted 16% ink (2 on, 5 off) is a profile gridline. Diagonal sienna hatching at -55 degrees, 1px every 7px, is bedrock. Unordered lists use a short horizontal sienna tick, not a bullet.

## Components

Components are map furniture: symbols, lettering and ruled tables, each with one job.

### Links as buttons
There are no filled buttons. An action is a link in Archivo 600 at 1.125rem with a 2px `route` underline and a trailing arrow icon.
- **Hover:** text shifts to `route-ink` and the gap to the arrow opens from 0.6rem to 1rem over 0.35s on the system ease, cubic-bezier(0.16, 1, 0.3, 1).
- **On the lake:** underline and hover colour become `lake-ink`.
- **Small variant:** 1rem, used under a repository to point at its post.
- **Focus (global):** 2px `route-ink` outline, 3px offset.

### Navigation
The top margin of the sheet: 4rem tall, a 1px ink rule beneath, sheet line or name at the left (700, width 112), four plain links at the right (500). The red underline grows from the left to full width on hover and stays at full width for the current section. On the home page the left slot carries "Sheet 1243 · Lausanne · 1:25 000" because the name is already the map's title. The same four links stay visible at every width; there is no menu.

### Colophon
The bottom margin: a 1px ink rule above, a scale bar exactly one grid square wide with 0, 500 m and 1 km ticks, the sheet note in 0.875rem `ink-2`, and three contact links with 1.05em icons (1.75px round stroke for drawn icons).

### The map sheet (signature)
Generated terrain as a single SVG image under an overlay that draws the kilometre grid (0.6px ink at 20%, 11px coordinates at 55%), the ferry line and the route. Waypoints are zero-size anchors at surveyed points with a ring and a label hung to one side; the label is a name over a note, haloed in paper.
- **On load:** the route draws once from shore to summit over 2.6s; waypoints fade in from a 6px blur in order, 0.55s apart; the lake name settles from 0.62em tracking. Reduced motion shows the finished sheet.
- **Hover / focus:** the ring scales to 1.25 with a flat red halo, the name takes a 2px red underline, and the label slides 0.3rem away from the ring, all over 0.4s.
- **Variants:** summit (larger name), village (small solid ink dot, 500 weight, no note), ferry (italic Literata in `lake-ink`, haloed in `lake`, no ring).

### Gazetteer (post index)
An ordered list of rows: marker, title and description, right-aligned metadata. Grid of 2.25rem, flexible, 9.5rem. The marker repeats the post's symbol on the map (route ring, village dot or ferry stop), so the index and the map share a key. On hover the title turns `route-ink` and the marker scales to 1.3. The whole row is one link.

### Elevation profile (signature)
A figure whose silhouette is data: a smooth sienna line over a 16% sienna fill, plotted from merged pull requests per layer, with dotted gridlines every 100 and spot heights lettered above each crest. Under it, five station links on a 2px ink baseline, divided by hairlines, each with a `paper-2` hover ground; then a hatched bedrock strip for the delivery layer that sits under all the others; then a caption stating the source and date of the counts.

### Spot height
A number in Archivo 700 at width 88 with a round dot before it. `contour-ink` when it heads a layer or a repository, `ink` on the profile and in the legend. It is never decorative: it always shows a real count.

### Layers and repositories (work page)
Each layer opens with a 1px ink rule, a sticky heading with lede and total on the left, and repositories on the right. A repository row is a spot height, the repository name in mono 600, one serif sentence of what it is, ticked contributions in `ink-2`, and a metadata line whose first item (the years) is `ink` 600.

### Lake band
A full-width `lake` field edged top and bottom with a 1.5px shoreline, an italic serif heading in `lake-ink`, and `lake-text` copy. Phone screenshots sit in three equal columns at 720:1276, top-cropped, with the screenshot shadow.

### Legend
A definition list keyed by drawn symbols in a 4.5rem column: route and ring, village dot, ferry line and stop, a spot height, two contour strokes. Entries in Archivo, `ink-2`, hairline between rows.

### Prose
Literata in a 43rem measure. Links keep the text colour with a 1px `route` underline. Headings switch to Archivo. Blockquotes are italic with a 1px sienna rule at the left edge. Tables are Archivo with a solid ink rule under the header and hairlines under rows. Code blocks have a hairline border, 4px radius and a thin sienna scrollbar. Figures take the figure shadow and an Archivo caption in `ink-3`; a narrow variant caps at 19rem and a row variant sets two side by side. The post closes with "Adjoining sheets": previous and next as two titled links with arrows, under a 1px ink rule.

## Do's and Don'ts

### Do:
- **Do** keep one light theme on `paper`. The dark and light toggle was removed on purpose.
- **Do** give every new colour use a cartographic reason: red for the route and links, blue for water and side projects, sienna for ground and counts, green for forest in the terrain only.
- **Do** use `route-ink` when red must be read as text, and `route` only for lines, rings and underlines.
- **Do** separate content with rules: solid 1px ink to open and close, `rule` hairlines between rows.
- **Do** size anything placed on the sheet in container-query units and position it in percentages of the drawing.
- **Do** halo lettering that crosses terrain with a paper stroke painted under the fill (0.32em), in `lake` when it sits on water.
- **Do** set figures as tabular Archivo and make every spot height a real, sourced count.
- **Do** change the terrain by editing and re-running `scripts/generate-terrain.mjs`, keeping its colours in step with the tokens here.
- **Do** keep motion to lines that draw and labels that settle, on cubic-bezier(0.16, 1, 0.3, 1), and show the finished state under reduced motion.

### Don't:
- **Don't** add a dark theme or a theme toggle.
- **Don't** fill a button or a panel with red, or set resting text in `route`.
- **Don't** put platform work on lake blue, or use forest green in the interface.
- **Don't** box content in cards. Lists are ruled rows; the only filled field is the lake.
- **Don't** put a shadow on anything drawn in ink. Shadows belong under screenshots and figures.
- **Don't** set tracked uppercase anywhere but a water name on the map.
- **Don't** introduce a second sans or a decorative display face; use Archivo's width axis.
- **Don't** round the corners of sections, lists, the profile or the sheet. Radius is for point symbols, code and inset rasters.
- **Don't** invent a number for a spot height or a shape for the profile; both are measurements.
- **Don't** hide the four navigation links behind a menu at any width.
