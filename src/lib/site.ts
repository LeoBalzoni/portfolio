// Single source of truth for absolute site identity.
// `url` MUST be the public origin including the basePath, because Next resolves
// relative metadata (OG image, canonical) against it. Update this when the
// deployment URL changes.
export const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

/** Prefix a file from /public with the deployment base path. */
export const asset = (path: string) => `${basePath}${path}`;

export const siteConfig = {
  url: "https://leobalzoni.github.io/portfolio",
  name: "Leonardo Balzoni",
  title: "Leonardo Balzoni, software engineer in Lausanne",
  description:
    "Software engineer at Nexthink in Lausanne. Writing and work notes from five years on one data platform: Kafka extraction, Spark pipelines, serving APIs, the interfaces on top, and the delivery under all of it.",
  ogImageAlt: "Leonardo Balzoni, software engineer in Lausanne",
  github: "https://github.com/LeoBalzoni",
  linkedin: "https://www.linkedin.com/in/leobalzoni/",
  email: "l.balzoni@gmail.com",
};
