// Single source of truth for absolute site identity.
// `url` MUST be the public origin including the basePath, because Next resolves
// relative metadata (OG image, canonical) against it. Update this when the
// deployment URL changes.
export const siteConfig = {
  url: "https://leobalzoni.github.io/portfolio",
  name: "Leonardo Balzoni",
  title: "Leonardo Balzoni — Software Engineer",
  description:
    "Software engineer at Nexthink in Lausanne. Working on large-scale, AI-assisted data platforms on AWS — Spark, Kafka, and the Kubernetes infrastructure that ships them. Writing occasionally about the work.",
  ogImageAlt: "Leonardo Balzoni — Software Engineer",
};
