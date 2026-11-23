// Generates the map sheet artwork for the home page.
//
//   node scripts/generate-terrain.mjs
//
// Writes public/map/sheet-{wide,tall}.svg (relief shading, lake, forests, contours)
// and src/data/terrain.json (route and waypoint geometry for the same sheets).
// The terrain is synthetic: a seeded height field, not survey data.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LAKE_LEVEL = 372; // metres, the real surface level of Lake Geneva
const INTERVAL = 50;

// ---------- seeded noise ----------
function hash(ix, iy, seed) {
  let h = (ix * 374761393 + iy * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
const smooth = (t) => t * t * t * (t * (t * 6 - 15) + 10);
// Gradient noise remapped to 0..1, sampled on a rotated lattice so the grid never shows.
function valueNoise(x0, y0, seed) {
  const x = x0 * 0.8 - y0 * 0.6 + seed * 0.37, y = x0 * 0.6 + y0 * 0.8 - seed * 0.19;
  const ix = Math.floor(x), iy = Math.floor(y);
  const dx = x - ix, dy = y - iy;
  const g = (i, j, ax, ay) => {
    const a = hash(i, j, seed) * Math.PI * 2;
    return Math.cos(a) * ax + Math.sin(a) * ay;
  };
  const u = smooth(dx), v = smooth(dy);
  const n00 = g(ix, iy, dx, dy), n10 = g(ix + 1, iy, dx - 1, dy);
  const n01 = g(ix, iy + 1, dx, dy - 1), n11 = g(ix + 1, iy + 1, dx - 1, dy - 1);
  const n = n00 + (n10 - n00) * u + (n01 - n00) * v + (n00 - n10 - n01 + n11) * u * v;
  return Math.min(1, Math.max(0, 0.5 + n * 0.72));
}
function fbm(x, y, seed, octaves = 5) {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += amp * (valueNoise(x * freq, y * freq, seed + o * 17) * 2 - 1);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}
const gauss = (x, y, cx, cy, s) => Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s));

// ---------- sheets ----------
const SHEETS = {
  wide: {
    W: 1440, H: 820, step: 6,
    shore: (x) => 548 + 24 * Math.sin(x / 230 + 0.6) + 12 * Math.sin(x / 83 + 2) - 0.078 * x,
    peaks: [
      { x: 1120, y: 160, amp: 1500, s: 195 },
      { x: 1390, y: 0, amp: 900, s: 200 },
      { x: 800, y: -10, amp: 600, s: 190 },
      { x: 1345, y: 370, amp: 400, s: 120 },
    ],
    calm: { x: 330, y: 250, s: 330 }, // the title sits here: keep the ground quiet
    route: [
      [692, 0], [752, 452], [796, 408], [862, 380], [926, 364], [950, 322],
      [1010, 284], [1064, 264], [1062, 224], [1096, 194], [1120, 160],
    ],
    waypoints: [0, 3, 6, 10],
    ferry: [[1010, 0], [1108, 640], [1240, 825]],
    villages: [[812, 212], [1362, 398]],
    villageSides: ["right", "left"],
    lakeLabel: [112, 668],
    ferryLabel: [856, 716],
  },
  tall: {
    W: 800, H: 1800, step: 5,
    shore: (x) => 1262 + 26 * Math.sin(x / 150 + 1) + 12 * Math.sin(x / 61) + 0.03 * (x - 400),
    peaks: [
      { x: 300, y: 760, amp: 1450, s: 180 },
      { x: 650, y: 600, amp: 800, s: 165 },
      { x: 660, y: 1010, amp: 420, s: 120 },
    ],
    calm: { x: 330, y: 190, s: 300 },
    route: [
      [470, 0], [420, 1190], [330, 1148], [270, 1080], [330, 1032], [430, 988], [520, 906],
      [470, 848], [390, 820], [350, 790], [300, 760],
    ],
    waypoints: [0, 3, 6, 10],
    ferry: [[640, 0], [690, 1500], [775, 1805]],
    villages: [],
    villageSides: [],
    lakeLabel: [64, 1570],
    ferryLabel: [330, 1410],
  },
};

function ridged(x, y, seed) {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let o = 0; o < 3; o++) {
    const n = 1 - Math.abs(valueNoise(x * freq, y * freq, seed + o * 31) * 2 - 1);
    sum += amp * n * n;
    norm += amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return sum / norm;
}
const ramp = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

function makeHeight(sheet, seed) {
  const { W, shore, peaks, calm } = sheet;
  return (x, y) => {
    const d = shore(x) - y; // positive inland
    if (d <= 0) {
      // lake bed: drops away from the shore, gently uneven
      return LAKE_LEVEL + d * 0.55 * (1 + 0.25 * fbm(x / 260, y / 260, seed + 5, 3));
    }
    const quiet = 1 - 0.9 * gauss(x, y, calm.x, calm.y, calm.s);
    let massif = 0;
    for (const p of peaks) massif += p.amp * gauss(x, y, p.x, p.y, p.s);
    const crest = ridged(x / 240, y / 240, seed + 9);
    const rise =
      d * (0.1 + 0.3 * (x / W)) * quiet +
      massif * (0.42 + 0.95 * crest) +
      quiet * (60 + massif * 0.05) * fbm(x / 230, y / 230, seed, 4);
    return LAKE_LEVEL + d * 0.06 + ramp(d / 240) * Math.max(0, rise);
  };
}

// ---------- marching squares, stitched into closed loops ----------
// The grid extends two cells beyond the sheet. The outermost ring is forced to
// `outside`, so every contour closes off-sheet and can be filled.
function contourLoops(sample, sheet, level, outside) {
  const { W, H, step } = sheet;
  const nx = Math.ceil(W / step) + 5, ny = Math.ceil(H / step) + 5;
  const ox = -2 * step, oy = -2 * step;
  const v = new Float64Array(nx * ny);
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      const edge = i === 0 || j === 0 || i === nx - 1 || j === ny - 1;
      v[j * nx + i] = edge ? outside : sample(ox + i * step, oy + j * step);
    }
  const hEdge = (i, j) => j * nx + i; // edge from (i,j) to (i+1,j)
  const vEdge = (i, j) => nx * ny + j * nx + i; // edge from (i,j) to (i,j+1)
  const pts = new Map();
  const link = new Map();
  const point = (id, i0, j0, i1, j1) => {
    if (pts.has(id)) return;
    const a = v[j0 * nx + i0], b = v[j1 * nx + i1];
    const t = (level - a) / (b - a);
    pts.set(id, [ox + (i0 + (i1 - i0) * t) * step, oy + (j0 + (j1 - j0) * t) * step]);
  };
  const connect = (a, b) => {
    (link.get(a) ?? link.set(a, []).get(a)).push(b);
    (link.get(b) ?? link.set(b, []).get(b)).push(a);
  };
  for (let j = 0; j < ny - 1; j++)
    for (let i = 0; i < nx - 1; i++) {
      const tl = v[j * nx + i] > level, tr = v[j * nx + i + 1] > level;
      const br = v[(j + 1) * nx + i + 1] > level, bl = v[(j + 1) * nx + i] > level;
      const code = (tl ? 8 : 0) | (tr ? 4 : 0) | (br ? 2 : 0) | (bl ? 1 : 0);
      if (code === 0 || code === 15) continue;
      const T = hEdge(i, j), B = hEdge(i, j + 1), L = vEdge(i, j), R = vEdge(i + 1, j);
      if (tl !== tr) point(T, i, j, i + 1, j);
      if (bl !== br) point(B, i, j + 1, i + 1, j + 1);
      if (tl !== bl) point(L, i, j, i, j + 1);
      if (tr !== br) point(R, i + 1, j, i + 1, j + 1);
      switch (code) {
        case 1: case 14: connect(L, B); break;
        case 2: case 13: connect(B, R); break;
        case 3: case 12: connect(L, R); break;
        case 4: case 11: connect(T, R); break;
        case 6: case 9: connect(T, B); break;
        case 7: case 8: connect(L, T); break;
        case 5: connect(L, T); connect(B, R); break;
        case 10: connect(L, B); connect(T, R); break;
      }
    }
  const seen = new Set();
  const loops = [];
  for (const start of link.keys()) {
    if (seen.has(start)) continue;
    const loop = [];
    let prev = -1, cur = start;
    while (!seen.has(cur)) {
      seen.add(cur);
      loop.push(pts.get(cur));
      const [a, b] = link.get(cur);
      const next = a !== prev && !seen.has(a) ? a : b;
      prev = cur;
      cur = next;
      if (cur === undefined) break;
    }
    if (loop.length > 5) loops.push(loop);
  }
  return loops;
}

// Radial-distance simplification, then a smooth closed path through edge midpoints.
function loopPath(loop, tol, bounds) {
  const kept = [loop[0]];
  for (let i = 1; i < loop.length; i++) {
    const [px, py] = kept[kept.length - 1];
    if ((loop[i][0] - px) ** 2 + (loop[i][1] - py) ** 2 >= tol * tol) kept.push(loop[i]);
  }
  if (kept.length < 4) return "";
  if (bounds) {
    const inside = kept.some(([x, y]) => x > -4 && y > -4 && x < bounds.W + 4 && y < bounds.H + 4);
    if (!inside) return "";
  }
  const f = (n) => (Math.round(n * 10) / 10).toString();
  const n = kept.length;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m0 = mid(kept[n - 1], kept[0]);
  let d = `M${f(m0[0])} ${f(m0[1])}`;
  for (let i = 0; i < n; i++) {
    const p = kept[i], m = mid(p, kept[(i + 1) % n]);
    d += `Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`;
  }
  return d + "Z";
}

// ---------- tiny PNG encoder (8-bit RGBA) ----------
const CRC = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function png(width, height, rgba, text) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++)
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("tEXt", Buffer.from(`Description\0${text}`, "latin1")),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// Relief shading in the manner of Swiss maps: light from the north-west,
// shadow in a cool grey-blue, lit slopes left as paper.
function relief(height, sheet) {
  const scale = 2;
  const w = Math.round(sheet.W / scale), h = Math.round(sheet.H / scale);
  const out = Buffer.alloc(w * h * 4);
  const lx = -0.62, ly = -0.62, lz = 0.48;
  for (let j = 0; j < h; j++)
    for (let i = 0; i < w; i++) {
      const x = (i + 0.5) * scale, y = (j + 0.5) * scale, e = 7;
      const here = height(x, y);
      const o = (j * w + i) * 4;
      if (here <= LAKE_LEVEL + 0.4) continue;
      const dzdx = (height(x + e, y) - height(x - e, y)) / (2 * e);
      const dzdy = (height(x, y + e) - height(x, y - e)) / (2 * e);
      const k = 0.42; // vertical exaggeration
      const nx = -dzdx * k, ny = -dzdy * k, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const lit = (nx * lx + ny * ly + nz * lz) / len - lz; // 0 on flat ground
      const fade = Math.min(1, (here - LAKE_LEVEL) / 60);
      if (lit < 0) {
        out[o] = 70; out[o + 1] = 78; out[o + 2] = 104;
        out[o + 3] = Math.round(Math.min(0.26, -lit * 0.42) * fade * 255);
      } else {
        out[o] = 255; out[o + 1] = 252; out[o + 2] = 238;
        out[o + 3] = Math.round(Math.min(0.7, lit * 1.3) * fade * 255);
      }
    }
  return png(w, h, out, "Synthetic relief shading generated by scripts/generate-terrain.mjs");
}

// ---------- geometry for the route ----------
function spline(points) {
  const f = (n) => (Math.round(n * 10) / 10).toString();
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)], p1 = points[i];
    const p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

function build(name, seed) {
  const sheet = SHEETS[name];
  const { W, H } = sheet;
  const height = makeHeight(sheet, seed);
  const bounds = { W, H };

  let maxH = 0;
  for (let y = 0; y <= H; y += 12) for (let x = 0; x <= W; x += 12) maxH = Math.max(maxH, height(x, y));

  const paths = (sample, level, outside, tol = 3.2) =>
    contourLoops(sample, sheet, level, outside).map((l) => loopPath(l, tol, bounds)).join("");

  // water: everything at or below lake level, then deeper bands
  const lake = paths(height, LAKE_LEVEL + 0.25, 1e6, 2.4);
  const depths = [];
  for (let l = LAKE_LEVEL - 25; l > LAKE_LEVEL - 400; l -= 25) {
    const d = paths(height, l, 1e6);
    if (d) depths.push(d);
  }
  // land contours
  const minor = [], index = [];
  for (let l = Math.ceil((LAKE_LEVEL + 20) / INTERVAL) * INTERVAL; l < maxH; l += INTERVAL) {
    const d = paths(height, l, -1e6);
    if (!d) continue;
    (l % 250 === 0 ? index : minor).push(d);
  }
  // forest: a second field, kept to lower slopes away from the calm title ground
  const wood = (x, y) => {
    const hgt = height(x, y);
    if (hgt <= LAKE_LEVEL + 6) return -1;
    const band = 1 - Math.min(1, Math.abs(hgt - 820) / 560);
    const quiet = 1 - gauss(x, y, sheet.calm.x, sheet.calm.y, sheet.calm.s * 0.8);
    return fbm(x / 150, y / 150, seed + 40, 4) * 0.9 + band * 0.42 * quiet - 0.3;
  };
  const forest = paths(wood, 0, -1, 4);

  const reliefPng = relief(height, sheet).toString("base64");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
<title>Synthetic topographic map: a lake shore rising to a summit</title>
<rect width="${W}" height="${H}" fill="#f3f4ee"/>
<path d="${forest}" fill="#b9d6a9" fill-opacity=".62" fill-rule="evenodd"/>
<image width="${W}" height="${H}" preserveAspectRatio="none" href="data:image/png;base64,${reliefPng}"/>
<path d="${lake}" fill="#cde2ef" fill-rule="evenodd"/>
${depths.map((d, i) => `<path d="${d}" fill="#3f86b4" fill-opacity="${(0.035 + i * 0.002).toFixed(3)}" fill-rule="evenodd"/>`).join("\n")}
<g fill="none" stroke="#5f9cc4" stroke-width=".7" stroke-opacity=".55">${depths.filter((_, i) => i % 2 === 1).map((d) => `<path d="${d}"/>`).join("")}</g>
<g fill="none" stroke="#a8683a" stroke-opacity=".62" stroke-width=".7"><path d="${minor.join("")}"/></g>
<g fill="none" stroke="#96592e" stroke-opacity=".8" stroke-width="1.25"><path d="${index.join("")}"/></g>
<path d="${lake}" fill="none" stroke="#3f7fa8" stroke-width="1.3"/>
</svg>
`;
  fs.mkdirSync(path.join(ROOT, "public/map"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `public/map/sheet-${name}.svg`), svg);

  // route geometry, snapped to the generated shore where y is given as 0
  const onShore = ([x, y]) => (y === 0 ? [x, Math.round(sheet.shore(x)) - 4] : [x, y]);
  const route = sheet.route.map(onShore);
  const ferry = sheet.ferry.map(([x, y]) => (y === 0 ? [x, Math.round(sheet.shore(x)) + 2] : [x, y]));
  const pct = ([x, y]) => [+((x / W) * 100).toFixed(2), +((y / H) * 100).toFixed(2)];
  return {
    width: W,
    height: H,
    summitMetres: Math.round(maxH),
    route: spline(route),
    ferry: spline(ferry),
    waypoints: sheet.waypoints.map((i) => ({ at: route[i], pct: pct(route[i]) })),
    port: { at: ferry[0], pct: pct(ferry[0]) },
    villages: sheet.villages.map((p, i) => ({ at: p, pct: pct(p), side: sheet.villageSides[i] })),
    lakeLabel: pct(sheet.lakeLabel),
    ferryLabel: pct(sheet.ferryLabel),
    bytes: svg.length,
  };
}

const data = { wide: build("wide", 1243), tall: build("tall", 1243) };
for (const [k, v] of Object.entries(data)) {
  console.log(k, `${(v.bytes / 1024).toFixed(0)} KB`, `summit ${v.summitMetres} m`);
  delete v.bytes;
}
fs.writeFileSync(path.join(ROOT, "src/data/terrain.json"), JSON.stringify(data, null, 2) + "\n");
