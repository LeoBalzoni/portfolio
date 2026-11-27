import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostKind = "post" | "talk" | "games";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: PostKind;
  /** For talks: the day the talk was given. */
  talkDate?: string;
  /** For talks: a public recording, once there is one. */
  video?: string;
  tags: string[];
  minutes: number;
  content: string;
}

// Reading order for the index. Posts not listed here follow, newest first.
const ORDER = [
  "a-sales-cockpit-for-a-shared-screen",
  "how-to-survive-the-ai-era",
  "the-benchmark-that-said-252-percent",
  "leaving-the-deploy-monolith-for-flux",
  "one-json-file-to-onboard-a-kafka-event",
  "two-birthdays-two-party-games",
  "two-builds-one-chunk-registry",
  "notes-from-a-year-with-llms",
];

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString(),
    kind: (data.kind as PostKind) ?? "post",
    talkDate: data.talkDate || undefined,
    video: data.video || undefined,
    tags: data.tags ?? [],
    minutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const rank = (slug: string) => {
    const i = ORDER.indexOf(slug);
    return i === -1 ? ORDER.length : i;
  };
  return getAllSlugs()
    .map(getPostBySlug)
    .sort(
      (a, b) =>
        rank(a.slug) - rank(b.slug) ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export const kindLabel: Record<PostKind, string> = {
  post: "Post",
  talk: "Talk",
  games: "Side projects",
};

export function formatDate(iso: string, style: "long" | "short" = "long") {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
