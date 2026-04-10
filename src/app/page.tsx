import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FadeIn, FadeInStagger, FadeInItem, ScaleOnHover } from "@/components/motion";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Go",
  "Python",
  "AWS",
  "Kubernetes",
  "Terraform",
  "PostgreSQL",
];

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="pb-16 pt-24 sm:pb-24 sm:pt-32">
        <FadeIn>
          <p className="text-sm font-medium text-muted-foreground">
            Hey, I&apos;m
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
            Leonardo Balzoni
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Software engineer who enjoys building things that live on the
            internet. Currently focused on cloud platforms, data systems, and
            developer tooling.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-8 flex items-center gap-4">
          <Link
            href="/projects/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View my work
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="X"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* About / Stack */}
      <section className="pb-16 sm:pb-24">
        <FadeIn>
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Tech Stack
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <FadeInItem key={tech}>
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-normal"
              >
                {tech}
              </Badge>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </section>

      {/* Featured Projects */}
      <section className="pb-16 sm:pb-24">
        <FadeIn className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Featured Projects
          </h2>
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </FadeIn>
        <FadeInStagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <FadeInItem key={project.title}>
              <ScaleOnHover>
                <Card className="h-full transition-colors hover:border-foreground/20">
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
            </FadeInItem>
          ))}
        </FadeInStagger>
      </section>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="pb-24">
          <FadeIn className="flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Latest Posts
            </h2>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </FadeIn>
          <FadeInStagger className="mt-6 flex flex-col gap-2">
            {latestPosts.map((post) => (
              <FadeInItem key={post.slug}>
                <Link href={`/blog/${post.slug}/`}>
                  <div className="group flex items-center justify-between rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-border hover:bg-muted/50">
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
              </FadeInItem>
            ))}
          </FadeInStagger>
        </section>
      )}
    </div>
  );
}
