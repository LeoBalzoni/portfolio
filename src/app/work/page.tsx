import type { Metadata } from "next";
import Link from "next/link";
import { Profile } from "@/components/profile";
import { ArrowIcon, ArrowOutIcon } from "@/components/icons";
import { delivery, elsewhere, layers, layerTotal, totalPrs, totalRepos, type Layer } from "@/data/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Five years at Nexthink on one data platform, repository by repository: what each one is, what I did in it, and how many pull requests it took.",
};

function LayerSection({ layer }: { layer: Layer }) {
  return (
    <section id={layer.id} className="layer">
      <header className="layer__head">
        <h2>{layer.name}</h2>
        <p>{layer.summary}</p>
        <p className="layer__total">
          <span className="spot">
            <b>{layerTotal(layer)}</b>
          </span>
          merged pull requests
        </p>
      </header>
      <ul className="repos">
        {layer.repos.map((repo) => (
          <li key={repo.name} className="repo">
            <p className="repo__count">
              <span className="spot">
                <b>{repo.prs}</b>
              </span>
              <span className="sr-only"> merged pull requests</span>
            </p>
            <div>
              <h3>
                <code>{repo.name}</code>
              </h3>
              <p className="repo__what">{repo.what}</p>
              <ul className="repo__did">
                {repo.did.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="repo__meta">
                <span>{repo.years}</span>
                <span>{repo.stack}</span>
              </p>
              {repo.post ? (
                <Link href={`/blog/${repo.post.slug}/`} className="more more--small">
                  {repo.post.label}
                  <ArrowIcon className="icon" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function WorkPage() {
  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <h1>Work</h1>
          <p>
            I work at Nexthink in Lausanne, on the Cloud Intelligence platform.
            It collects device telemetry from every customer, removes what identifies them, and
            turns the rest into benchmarks: how does your fleet compare with everyone
            else&apos;s?
          </p>
          <p>
            This page lists the repositories I have worked in, in the order the data flows through
            them. The numbers are my merged pull requests, {totalPrs} across {totalRepos}{" "}
            repositories, counted from GitHub in November 2026.
          </p>
        </header>

        <Profile />

        {layers.map((layer) => (
          <LayerSection key={layer.id} layer={layer} />
        ))}
        <LayerSection layer={delivery} />

        <section className="layer">
          <header className="layer__head">
            <h2>Off this sheet</h2>
            <p>Work that the repositories above do not show.</p>
          </header>
          <ul className="elsewhere">
            {elsewhere.map((item) => (
              <li key={item.title}>
                <h3>
                  {item.href ? (
                    <a href={item.href} rel="noopener noreferrer">
                      {item.title}
                      <ArrowOutIcon className="icon" />
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
