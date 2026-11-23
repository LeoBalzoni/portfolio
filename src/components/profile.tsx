import Link from "next/link";
import type { CSSProperties } from "react";
import { delivery, layers, layerTotal } from "@/data/work";

/**
 * An elevation profile along the path the data takes. Height is merged pull
 * requests per layer, so the silhouette is a measurement, not a decoration.
 */
export function Profile() {
  const totals = layers.map(layerTotal);
  const top = Math.ceil(Math.max(...totals) / 100) * 100;
  const n = layers.length;
  const W = 1000, H = 300;
  const x = (i: number) => ((i + 0.5) / n) * W;
  const y = (v: number) => H - (v / top) * H;
  // a smooth ridge line through each layer's height; both ends run to the baseline,
  // because there is no data beyond the first and last layer
  const pts = [[0, y(0)], ...totals.map((v, i) => [x(i), y(v)]), [W, y(0)]];
  let line = `M${pts[0][0]} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    line += `C${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  const ticks = Array.from({ length: top / 100 + 1 }, (_, i) => i * 100);

  return (
    <figure className="profile">
      <div className="profile__plot">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          {ticks.slice(1).map((t) => (
            <path key={t} className="profile__tick" d={`M0 ${y(t)}H${W}`} />
          ))}
          <path className="profile__ground" d={`${line}V${H}H0Z`} />
          <path className="profile__line" d={line} />
        </svg>
        <ul className="profile__scale" aria-hidden="true">
          {ticks.map((t) => (
            <li key={t} style={{ bottom: `${(t / top) * 100}%` }}>
              {t}
            </li>
          ))}
        </ul>
        <ol className="profile__spots">
          {layers.map((layer, i) => (
            <li key={layer.id} style={{ "--h": `${(totals[i] / top) * 100}%` } as CSSProperties}>
              {/* a low point before a steep climb: letter it on the near side, clear of the slope */}
              <span className={`spot${totals[i + 1] > totals[i] * 4 ? " spot--near" : ""}`}>
                <b>{totals[i]}</b>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <ol className="profile__stations">
        {layers.map((layer, i) => (
          <li key={layer.id}>
            <Link href={`/work/#${layer.id}`}>
              <b>{layer.name}</b>
              <span>{layer.short}</span>
              <span className="sr-only">, {totals[i]} merged pull requests</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="profile__bedrock">
        <b>{delivery.name}</b>
        <span>
          {layerTotal(delivery)} merged pull requests under all of it: Jenkins and Terraform until
          2024, Flux since
        </span>
      </p>
      <figcaption>
        Merged pull requests by layer, in the order the data flows. Counted from GitHub, November
        2026.
      </figcaption>
    </figure>
  );
}
