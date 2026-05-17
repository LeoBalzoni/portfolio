// Single source of truth for absolute site identity.
// `url` MUST be the public origin including the basePath, because Next resolves
// relative metadata (OG image, canonical) against it. Update this when the
// deployment URL changes.
export const siteConfig = {
  url: "https://leobalzoni.github.io/portfolio",
  name: "Leonardo Balzoni",
  title: "Leonardo Balzoni — Software Engineer",
  description:
    "Software engineer building modern web applications. Writing about code, architecture, and engineering culture.",
  ogImageAlt: "Leonardo Balzoni — Software Engineer",
};
