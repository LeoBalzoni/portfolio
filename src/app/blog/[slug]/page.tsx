import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { ArrowIcon } from "@/components/icons";
import { formatDate, getAllPosts, getAllSlugs, getPostBySlug, kindLabel } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? all[i - 1] : undefined;
  const next = i < all.length - 1 ? all[i + 1] : undefined;

  return (
    <article className="post">
      <header className="post__head">
        <h1>{post.title}</h1>
        <p className="post__lede">{post.description}</p>
        <p className="post__meta">
          <span>{kindLabel[post.kind]}</span>
          {post.kind === "talk" && post.talkDate ? (
            <span>
              Given <time dateTime={post.talkDate}>{formatDate(post.talkDate)}</time>
            </span>
          ) : (
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          )}
          <span>{post.minutes} min read</span>
        </p>
        {post.kind === "talk" ? (
          <p className="post__note">
            {post.video ? (
              <a href={post.video} rel="noopener noreferrer">
                Watch the recording
              </a>
            ) : (
              "The recording is internal for now. If it becomes public, the link will be here."
            )}
          </p>
        ) : null}
      </header>

      <div className="prose">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <nav className="adjoining" aria-label="More writing">
        <h2>Adjoining sheets</h2>
        <ul>
          {prev ? (
            <li>
              <Link href={`/blog/${prev.slug}/`}>
                <ArrowIcon className="icon icon--back" />
                <span>{prev.title}</span>
              </Link>
            </li>
          ) : null}
          {next ? (
            <li className="adjoining__next">
              <Link href={`/blog/${next.slug}/`}>
                <span>{next.title}</span>
                <ArrowIcon className="icon" />
              </Link>
            </li>
          ) : null}
        </ul>
        <Link href="/blog/" className="more">
          All writing
          <ArrowIcon className="icon" />
        </Link>
      </nav>
    </article>
  );
}
