import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FadeIn, FadeInStagger, FadeInItem, ScaleOnHover } from "@/components/motion";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I've worked on.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A selection of things I&apos;ve built. Some are open source, some are
          production systems I&apos;ve contributed to. Placeholder links for now
          — swap in your own.
        </p>
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <FadeInItem key={project.title}>
            <ScaleOnHover className="h-full">
              <Card className="flex h-full flex-col transition-colors hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge variant="secondary" className="text-[10px]">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
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
                <CardFooter className="gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                </CardFooter>
              </Card>
            </ScaleOnHover>
          </FadeInItem>
        ))}
      </FadeInStagger>
    </div>
  );
}
