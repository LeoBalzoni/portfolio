import Link from "next/link";
import { HeroSceneLoader } from "@/components/hero-scene-loader";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FadeIn,
  ScrollFadeIn,
  ScrollStagger,
  ScrollStaggerItem,
  ScaleOnHover,
} from "@/components/motion";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";

const stack: { name: string; highlighted?: boolean }[] = [
  { name: "TypeScript", highlighted: true },
  { name: "React" },
  { name: "Next.js" },
  { name: "Python", highlighted: true },
  { name: "Spark" },
  { name: "Kafka" },
  { name: "AWS", highlighted: true },
  { name: "Kubernetes" },
  { name: "GitOps / Flux" },
  { name: "LLMs" },
  { name: "SQL / NQL" },
];

const socials = [
  { href: "https://github.com/LeoBalzoni", icon: GithubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/leobalzoni/",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
];

function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
      {number} — {label}
    </p>
  );
}

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero — full viewport, placeholder for 3D bust */}
      <section className="flex min-h-[calc(100vh-4rem)] items-center pb-16 pt-8">
        <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left: text */}
          <div>
            <FadeIn>
              <p className="text-sm font-medium text-primary">
                Hey, I&apos;m
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                Leonardo
                <br />
                <span>Balzoni</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Software engineer at Nexthink, based in Lausanne. I work on
                cloud data platforms — architecture, pipelines, and the
                infrastructure that ships them. Lately drawn to the messy
                parts: untangling complexity, making slow things fast.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-8 flex items-center gap-4">
              <a
                href="#projects"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                View my work
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: 3D Da Vinci bust */}
          <div className="hidden h-80 md:block lg:h-[28rem]">
            <HeroSceneLoader />
          </div>
        </div>
      </section>

      {/* About / Stack */}
      <section id="about" className="scroll-mt-20 pb-24">
        <ScrollFadeIn>
          <SectionEyebrow number="01" label="About" />
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            About
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            I work on Nexthink&apos;s Cloud Intelligence platform — the data
            pipelines, event-driven systems, and Kubernetes infrastructure
            behind the analytics our customers rely on. A lot of the work
            today is large-scale and AI-assisted: LLM-driven pipelines running
            on the AWS suite, Spark jobs feeding Kafka-backed DAGs, and the
            dashboards (DEX Benchmarks, AppEx, Functional Errors) on top of
            them. I started as an ML engineer in 2020 and have since drifted
            toward architecture, backend systems, and the developer experience
            around them.
          </p>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            I also wear a few non-IC hats: Scrum master for the team,
            onboarding buddy for new hires, and the person who tends to end up
            demoing to stakeholders. I like the parts where the work gets
            ambiguous — shaping a feature before it&apos;s a ticket, profiling
            something slow, unblocking another team — and the unglamorous
            parts too, like the release cycle and the test suite that ships
            with it.
          </p>
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.1}>
          <h3 className="mt-10 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Tech Stack
          </h3>
        </ScrollFadeIn>
        <ScrollStagger className="mt-4 flex flex-wrap gap-2">
          {stack.map(({ name, highlighted }) => (
            <ScrollStaggerItem key={name}>
              <Badge
                variant={highlighted ? "outline" : "secondary"}
                className={
                  highlighted
                    ? "border-primary/30 bg-primary/10 px-3 py-1 text-sm font-normal text-primary"
                    : "px-3 py-1 text-sm font-normal"
                }
              >
                {name}
              </Badge>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="scroll-mt-20 pb-24">
        <ScrollFadeIn className="flex items-end justify-between">
          <div>
            <SectionEyebrow number="02" label="Projects" />
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Projects
            </h2>
          </div>
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </ScrollFadeIn>
        <ScrollStagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ScrollStaggerItem key={project.title}>
              <ScaleOnHover>
                <Card className="h-full transition-colors hover:border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section id="blog" className="scroll-mt-20 pb-24">
          <ScrollFadeIn className="flex items-end justify-between">
            <div>
              <SectionEyebrow number="03" label="Blog" />
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Blog
              </h2>
            </div>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </ScrollFadeIn>
          <ScrollStagger className="mt-8 flex flex-col gap-2">
            {latestPosts.map((post) => (
              <ScrollStaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}/`}>
                  <div className="group flex items-center justify-between rounded-lg border border-border/70 px-4 py-4 transition-colors hover:border-border hover:bg-muted/50">
                    <div>
                      <h3 className="font-medium group-hover:text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {post.description}
                      </p>
                    </div>
                    <div className="ml-4 hidden shrink-0 text-right text-sm text-muted-foreground sm:block">
                      <p>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs">{post.readingTime}</p>
                    </div>
                  </div>
                </Link>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 pb-24">
        <ScrollFadeIn>
          <SectionEyebrow number="04" label="Contact" />
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Want to chat about a project, an idea, or just say hi? GitHub and
            LinkedIn are the fastest ways to reach me.
          </p>
        </ScrollFadeIn>
        <ScrollStagger className="mt-8 flex items-center gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <ScrollStaggerItem key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>
    </div>
  );
}
