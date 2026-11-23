import Link from "next/link";
import type { CSSProperties } from "react";
import terrain from "@/data/terrain.json";
import { ferry, route, villages } from "@/data/sheet";
import { asset } from "@/lib/site";

type Variant = "wide" | "tall";

// Which side of its waypoint each label sits on, shore to summit.
const SIDES: Record<Variant, ("left" | "right")[]> = {
  wide: ["left", "right", "right", "right"],
  tall: ["left", "right", "left", "right"],
};

const GRID: Record<Variant, { every: number; east: number; north: number }> = {
  wide: { every: 240, east: 2536, north: 1155 },
  tall: { every: 200, east: 2537, north: 1158 },
};

function Sheet({ variant }: { variant: Variant }) {
  const t = terrain[variant];
  const { every, east, north } = GRID[variant];
  const xs = Array.from({ length: Math.floor((t.width - 1) / every) }, (_, i) => (i + 1) * every);
  const ys = Array.from({ length: Math.floor((t.height - 1) / every) }, (_, i) => (i + 1) * every);
  const at = ([x, y]: number[]): CSSProperties => ({ left: `${x}%`, top: `${y}%` });

  return (
    <div
      className={`sheet sheet--${variant}`}
      style={{ aspectRatio: `${t.width} / ${t.height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sheet__terrain"
        src={asset(`/map/sheet-${variant}.svg`)}
        alt=""
        width={t.width}
        height={t.height}
        fetchPriority={variant === "wide" ? "high" : "auto"}
      />
      <svg className="sheet__lines" viewBox={`0 0 ${t.width} ${t.height}`} aria-hidden="true">
        <g className="sheet__grid">
          {xs.map((x, i) => (
            <g key={x}>
              <path d={`M${x} 0V${t.height}`} />
              <text x={x + 5} y={t.height - 8}>
                {east + i + 1}
              </text>
            </g>
          ))}
          {ys.map((y, i) => (
            <g key={y}>
              <path d={`M0 ${y}H${t.width}`} />
              <text x={t.width - 6} y={y - 6} textAnchor="end">
                {north - i - 1}
              </text>
            </g>
          ))}
        </g>
        <path className="sheet__ferry" d={t.ferry} />
        <mask id={`reveal-${variant}`} maskUnits="userSpaceOnUse" x="0" y="0" width={t.width} height={t.height}>
          <path className="sheet__reveal" d={t.route} pathLength={1} />
        </mask>
        <path className="sheet__route-case" d={t.route} mask={`url(#reveal-${variant})`} />
        <path className="sheet__route" d={t.route} mask={`url(#reveal-${variant})`} />
      </svg>

      <div className="sheet__title">
        <h1>
          Leonardo
          <br />
          Balzoni
        </h1>
        <p>
          Software engineer at Nexthink in Lausanne. Five years on one data platform, drawn as a
          map: follow the red route, or{" "}
          <a href="#writing">go straight to the index</a>.
        </p>
      </div>

      <p className="sheet__water" style={at(t.lakeLabel)} aria-hidden="true">
        Lac Léman
      </p>

      <ol className="sheet__places">
        {route.map((place, i) => (
          <li key={place.slug}>
            <Link
              href={`/blog/${place.slug}/`}
              className={`wp wp--${SIDES[variant][i]}${i === route.length - 1 ? " wp--summit" : ""}`}
              style={{ ...at(t.waypoints[i].pct), "--i": i } as CSSProperties}
            >
              <span className="wp__ring" aria-hidden="true" />
              <span className="wp__label">
                <span className="wp__name">{place.name}</span>
                <span className="wp__note">{place.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {t.villages.map((v, i) => (
        <Link
          key={villages[i].slug}
          href={`/blog/${villages[i].slug}/`}
          className={`wp wp--${v.side} wp--village`}
          style={{ ...at(v.pct), "--i": 4 } as CSSProperties}
        >
          <span className="wp__ring" aria-hidden="true" />
          <span className="wp__label">
            <span className="wp__name">{villages[i].name}</span>
          </span>
        </Link>
      ))}

      <Link
        href={`/blog/${ferry.slug}/`}
        className="wp wp--ferry"
        style={{ ...at(t.ferryLabel), "--i": 5 } as CSSProperties}
      >
        <span className="wp__label">
          <span className="wp__name">{ferry.name}</span>
          <span className="wp__note">{ferry.note}</span>
        </span>
      </Link>
    </div>
  );
}

/** The home page map. Two drawings of the same sheet: landscape, and portrait for narrow screens. */
export function MapSheet() {
  return (
    <>
      <Sheet variant="wide" />
      <Sheet variant="tall" />
    </>
  );
}
