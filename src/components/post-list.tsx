import Link from "next/link";
import { markerFor } from "@/data/sheet";
import { type BlogPost, formatDate, kindLabel } from "@/lib/blog";

export function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <ol className="gaz">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}/`} className="gaz__row">
            <span className={`mark mark--${markerFor(post.slug)}`} aria-hidden="true" />
            <span className="gaz__main">
              <span className="gaz__title">{post.title}</span>
              <span className="gaz__desc">{post.description}</span>
            </span>
            <span className="gaz__meta">
              <span>{kindLabel[post.kind]}</span>
              <span>
                {post.kind === "talk" && post.talkDate
                  ? `Given ${formatDate(post.talkDate, "short")}`
                  : formatDate(post.date, "short")}
              </span>
              <span>{post.minutes} min</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
