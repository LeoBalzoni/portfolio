import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering posts written from real pull requests, a talk on staying sane in the AI era, and notes on two birthday party games.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <h1>Writing</h1>
          <p>
            Engineering posts written from my own pull requests, with the parts that went wrong
            left in. One talk. Two party games.
          </p>
        </header>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
