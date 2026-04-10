import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on code, architecture, and engineering culture.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Thoughts on code, architecture, and engineering culture.
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <FadeIn delay={0.2} className="mt-12">
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        </FadeIn>
      ) : (
        <FadeInStagger className="mt-12 flex flex-col gap-1">
          {posts.map((post) => (
            <FadeInItem key={post.slug}>
              <Link href={`/blog/${post.slug}/`}>
                <article className="group rounded-lg border border-transparent px-4 py-5 transition-colors hover:border-border hover:bg-muted/50">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-medium group-hover:text-foreground">
                        {post.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 text-sm text-muted-foreground sm:ml-6 sm:text-right">
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
                </article>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>
      )}
    </div>
  );
}
