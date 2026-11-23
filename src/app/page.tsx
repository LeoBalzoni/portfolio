import Link from "next/link";
import { MapSheet } from "@/components/map-sheet";
import { PostList } from "@/components/post-list";
import { Profile } from "@/components/profile";
import { ArrowIcon, ArrowOutIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { totalPrs, totalRepos } from "@/data/work";
import { getAllPosts } from "@/lib/blog";
import { asset, siteConfig } from "@/lib/site";

const GAMES_POST = "/blog/two-birthdays-two-party-games/";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <MapSheet />

      <section id="writing" className="band">
        <div className="wrap">
          <div className="band__head">
            <h2>Writing</h2>
            <p>
              Engineering posts written from my own pull requests, one talk, and two party games.
              The ringed ones are on the route above.
            </p>
          </div>
          <PostList posts={posts} />
        </div>
      </section>

      <section id="work" className="band band--ruled">
        <div className="wrap">
          <div className="band__head">
            <h2>Five years, one data platform</h2>
            <p>
              At Nexthink I work on Cloud Intelligence, the platform that compares one
              company&apos;s devices with everyone else&apos;s. I have worked on every layer of it,
              from the Kafka consumer that reads the events to the screen that shows the result:{" "}
              {totalPrs} merged pull requests across {totalRepos} repositories.
            </p>
          </div>
          <Profile />
          <Link href="/work/" className="more">
            Every repository, and what I did in it
            <ArrowIcon className="icon" />
          </Link>
        </div>
      </section>

      <section id="games" className="band band--lake">
        <div className="wrap">
          <div className="band__head">
            <h2 className="water">On the lake: two birthday games</h2>
            <p>
              Every October I build a web app for my own birthday party. Each one has to work
              once, at a known hour, on whatever phones show up.
            </p>
          </div>
          <div className="games">
            <article className="game">
              <div className="game__shots game__shots--pair">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/games/leooracle-landing.jpg")}
                  alt="Leo's Oracle on a phone: the title, the line Predict the night. Beat your friends, and a field for a game code."
                  width={720}
                  height={1276}
                  loading="lazy"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/games/leooracle-betting.jpg")}
                  alt="The betting screen: a balance of 1,000 L€ and yes-or-no markets, each with a multiplier."
                  width={720}
                  height={1276}
                  loading="lazy"
                />
              </div>
              <h3>LeoOracle</h3>
              <p className="game__year">2026, for my 31st</p>
              <p>
                A prediction market for a single dinner. Guests bet a virtual currency called L€
                on questions like &ldquo;Will someone make an unsolicited toast?&rdquo;, then put
                their phones down until the reveal.
              </p>
              <p className="game__links">
                <a href="https://leo-oracle.vercel.app" rel="noopener noreferrer">
                  Play it
                  <ArrowOutIcon className="icon" />
                </a>
              </p>
            </article>
            <article className="game game--single">
              <div className="game__shots">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/games/imaginarena-share.jpg")}
                  alt="The ImaginArena share image: three cartoon figures facing a burst of light under the words Join the ImaginArena."
                  width={720}
                  height={1280}
                  loading="lazy"
                />
              </div>
              <div className="game__text">
                <h3>ImaginArena</h3>
                <p className="game__year">2025, for my 30th</p>
                <p>
                  A knockout tournament for image prompts. Two players get the same absurd brief,
                  such as &ldquo;The Greek gods commuting on a bus&rdquo;, and the room votes on
                  whose picture wins.
                </p>
                <p className="game__links">
                  <a href="https://imaginarena.vercel.app" rel="noopener noreferrer">
                    Play it
                    <ArrowOutIcon className="icon" />
                  </a>
                  <a href="https://github.com/LeoBalzoni/ImaginArena" rel="noopener noreferrer">
                    Source
                    <ArrowOutIcon className="icon" />
                  </a>
                </p>
              </div>
            </article>
          </div>
          <Link href={GAMES_POST} className="more">
            How both were built, and what went wrong
            <ArrowIcon className="icon" />
          </Link>
        </div>
      </section>

      <section id="legend" className="band">
        <div className="wrap legend">
          <div>
            <h2>Legend</h2>
            <dl className="key">
              <div>
                <dt>
                  <svg viewBox="0 0 56 16" aria-hidden="true">
                    <path className="key__route" d="M2 8h34" />
                    <circle className="key__ring" cx="46" cy="8" r="5.5" />
                  </svg>
                </dt>
                <dd>Marked route. Each ring is a post or a talk.</dd>
              </div>
              <div>
                <dt>
                  <svg viewBox="0 0 56 16" aria-hidden="true">
                    <circle className="key__dot" cx="46" cy="8" r="3.5" />
                  </svg>
                </dt>
                <dd>A post off the route.</dd>
              </div>
              <div>
                <dt>
                  <svg viewBox="0 0 56 16" aria-hidden="true">
                    <path className="key__ferry" d="M2 8h34" />
                    <circle className="key__stop" cx="46" cy="8" r="5.5" />
                  </svg>
                </dt>
                <dd>Ferry line and stop. Side projects, built for fun.</dd>
              </div>
              <div>
                <dt>
                  <span className="spot">
                    <b>347</b>
                  </span>
                </dt>
                <dd>Spot height. A count of my merged pull requests, as on the profile above.</dd>
              </div>
              <div>
                <dt>
                  <svg viewBox="0 0 56 16" aria-hidden="true">
                    <path className="key__contour" d="M2 11c10-9 18 4 28-3s14-2 24 1" />
                    <path className="key__contour" d="M2 5c10-6 18 5 28-1s14-3 24-1" />
                  </svg>
                </dt>
                <dd>Contours, lake and forest. Invented, and generated from a seed.</dd>
              </div>
            </dl>
          </div>
          <div className="about">
            <h2>Who drew this</h2>
            <p>
              I am Leonardo, a software engineer from Rome, living in Lausanne. I started as a
              machine learning engineer in 2020 and drifted toward architecture, backend systems
              and the developer experience around them.
            </p>
            <p>
              I also wear a few hats that do not produce commits: Scrum master for the team,
              onboarding buddy for new hires, and the person who tends to end up demoing to
              stakeholders. Outside work I climb, I run, and I hold opinions about Italian
              restaurants.
            </p>
            <p>The fastest ways to reach me:</p>
            <ul className="contact">
              <li>
                <a href={siteConfig.linkedin} rel="noopener noreferrer">
                  <LinkedinIcon className="icon" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.github} rel="noopener noreferrer">
                  <GithubIcon className="icon" />
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <MailIcon className="icon" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
