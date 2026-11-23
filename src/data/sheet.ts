// What is drawn on the home page map, and where.
// Geometry comes from src/data/terrain.json (see scripts/generate-terrain.mjs).

export interface Place {
  slug: string;
  /** Short name as lettered on the map. */
  name: string;
  note: string;
}

/** The waymarked route, from the shore to the summit. */
export const route: Place[] = [
  { slug: "one-json-file-to-onboard-a-kafka-event", name: "One JSON file", note: "Kafka, at the shore" },
  { slug: "the-benchmark-that-said-252-percent", name: "The 252% benchmark", note: "Data quality" },
  { slug: "leaving-the-deploy-monolith-for-flux", name: "Leaving the monolith", note: "Delivery" },
  { slug: "how-to-survive-the-ai-era", name: "Surviving the AI era", note: "Talk, 13 Jan 2026" },
];

/** Posts off the route. */
export const villages: Place[] = [
  { slug: "notes-from-a-year-with-llms", name: "A year with LLMs", note: "" },
  { slug: "two-builds-one-chunk-registry", name: "Two builds, one registry", note: "" },
];

export const ferry: Place = {
  slug: "two-birthdays-two-party-games",
  name: "Birthday games",
  note: "Ferry, two stops",
};

export type Marker = "route" | "village" | "ferry";

export function markerFor(slug: string): Marker {
  if (route.some((p) => p.slug === slug)) return "route";
  if (ferry.slug === slug) return "ferry";
  return "village";
}
