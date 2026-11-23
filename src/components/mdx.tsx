import type { ReactNode } from "react";
import { asset } from "@/lib/site";
import { ArrowOutIcon } from "@/components/icons";

function Figure({
  src,
  alt,
  caption,
  width,
  height,
  narrow,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  narrow?: boolean;
}) {
  return (
    <figure className={`fig${narrow ? " fig--narrow" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        width={width ? Number(width) : undefined}
        height={height ? Number(height) : undefined}
        loading="lazy"
        decoding="async"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function FigureRow({ children }: { children: ReactNode }) {
  return <div className="fig-row">{children}</div>;
}

function GameFacts({ year, live, code }: { year: string; live: string; code?: string }) {
  return (
    <p className="facts">
      <span>Built for 11 October {year}</span>
      <a href={live} rel="noopener noreferrer">
        Play it
        <ArrowOutIcon className="icon" />
      </a>
      {code ? (
        <a href={code} rel="noopener noreferrer">
          Source
          <ArrowOutIcon className="icon" />
        </a>
      ) : null}
    </p>
  );
}

export const mdxComponents = { Figure, FigureRow, GameFacts };
