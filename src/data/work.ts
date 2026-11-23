// Work at Nexthink, as counted from GitHub in November 2026.
// `prs` is merged pull requests authored by me in that repository.

export interface Repo {
  name: string;
  prs: number;
  years: string;
  stack: string;
  what: string;
  did: string[];
  post?: { slug: string; label: string };
}

export interface Layer {
  id: string;
  name: string;
  /** One line shown under the name on the profile. */
  short: string;
  summary: string;
  repos: Repo[];
}

export const layers: Layer[] = [
  {
    id: "extraction",
    name: "Extraction",
    short: "Kafka to S3",
    summary:
      "Where the platform starts: events leave each product cell and land in the data lake with only the fields we are allowed to keep.",
    repos: [
      {
        name: "cloud-intelligence.cloudy-cider",
        prs: 43,
        years: "2021 to 2026",
        stack: "Java 21, Micronaut 4, Kafka, Protobuf, Avro, Testcontainers",
        what: "Reads protobuf events from Kafka, selects fields, hashes identifiers and writes Avro to S3.",
        did: [
          "Onboarded the first dozen event types between 2021 and 2023: binaries, devices, crashes, sessions, navigation and experience scores.",
          "Replaced one Kafka listener class per event with a single generic listener in 2023, deleting 17 classes.",
          "In 2026 made the extraction config the single source of truth: Avro schemas, tests and topic routing are all generated from it. 44 event types, no per-event code.",
        ],
        post: { slug: "one-json-file-to-onboard-a-kafka-event", label: "One JSON file to onboard a Kafka event" },
      },
    ],
  },
  {
    id: "pipelines",
    name: "Pipelines",
    short: "Spark and SQL",
    summary:
      "Nightly jobs turn raw events into tables, and tables into benchmarks computed across companies.",
    repos: [
      {
        name: "cloud-intelligence.data-pipelines",
        prs: 42,
        years: "2024 to 2026",
        stack: "Python, Pulumi, Step Functions, Lambda, EMR and Glue PySpark, Athena",
        what: "The pipeline monorepo: ingestion to Parquet, nightly Spark jobs, benchmark workflows and publication.",
        did: [
          "Built ingestion for LLM and generic telemetry in 2025.",
          "Added benchmark segmentation and multi-timeframe benchmarks, paired with matching changes in the serving API.",
          "Wrote a generic dataset processor: declarative joins, column hashing and group-by aggregation driven by config.",
          "Added a Spark-based centralisation job that drops configured columns before data leaves its region.",
          "Put a guard at publication that withholds any benchmark outside its valid range.",
        ],
        post: { slug: "the-benchmark-that-said-252-percent", label: "The benchmark that said 252%" },
      },
      {
        name: "cloud-intelligence.cip-aws",
        prs: 22,
        years: "2025 to 2026",
        stack: "Terragrunt, OpenTofu, Lake Formation",
        what: "The platform's AWS infrastructure.",
        did: ["Defined Lake Formation workspaces and tables for the generic telemetry path."],
      },
      {
        name: "cloud-intelligence.data-governance",
        prs: 16,
        years: "2026",
        stack: "Pulumi (Python), Lake Formation, DataZone, YAML and SQL definitions",
        what: "Declarative config for every stage: what is extracted, how datasets are built, how benchmarks are defined.",
        did: [
          "Audited every benchmark against a week of production data and declared a validity range on all 72 metrics.",
          "Wrote the 24-file how-to guide for the benchmark pipeline.",
          "Merged redundant benchmarks without breaking existing queries.",
        ],
      },
    ],
  },
  {
    id: "serving",
    name: "Serving",
    short: "GraphQL and REST",
    summary: "The APIs that answer benchmark questions, with privacy rules applied before anything leaves.",
    repos: [
      {
        name: "cloud-intelligence.benchmark-api",
        prs: 29,
        years: "2022 to 2026",
        stack: "Java 21, Micronaut, GraphQL, Avro on S3, Caffeine",
        what: "GraphQL over benchmark files for the diagnostics product.",
        did: [
          "Built the 2022 foundations: lookup queries and binary profiling endpoints.",
          "Added search by product name and permission checks.",
          "Changed the API to return tenant and device counts as ranges instead of exact numbers.",
        ],
      },
      {
        name: "cloud-intelligence.cross-customer-insights-service",
        prs: 27,
        years: "2023 to 2026",
        stack: "Java 21, Micronaut, ClickHouse, REST and GraphQL, Pact, Testcontainers",
        what: "The benchmarks query service, backed by ClickHouse.",
        did: [
          "Introduced the ClickHouse client in 2024.",
          "Delivered segmentation in one change of 91 files, merged seconds after its pipeline counterpart.",
          "Added multi-timeframe queries behind an optional column so existing clients kept working.",
          "Added a deprecation field so benchmarks can be retired without surprising consumers.",
        ],
      },
    ],
  },
  {
    id: "agents",
    name: "Agents",
    short: "MCP",
    summary: "The same benchmarks, offered to LLM agents.",
    repos: [
      {
        name: "cloud-intelligence.cross-customer-mcp",
        prs: 14,
        years: "2025 to 2026",
        stack: "Python, FastMCP on FastAPI, uv",
        what: "An MCP server that lets an agent discover and query the benchmark catalog.",
        did: [
          "Built the discover and query tools over the catalog.",
          "Added a catalog cache that keeps serving the last good copy when a refresh fails.",
          "Wrote a tool-selection eval suite: negative cases must pass every time across repeated runs.",
          "Routed tool-call telemetry through an anonymiser, off by default.",
        ],
      },
    ],
  },
  {
    id: "interfaces",
    name: "Interfaces",
    short: "React",
    summary: "What an IT admin sees. This is where most of my pull requests are.",
    repos: [
      {
        name: "diagnostics.cade-ui",
        prs: 318,
        years: "2021 to 2026",
        stack: "React, TypeScript, Apollo Client, styled-components, webpack 5, Module Federation, Jest",
        what: "The diagnostics dashboards: issue timelines, affected devices, ranked probable causes and benchmarks.",
        did: [
          "Made the first commit in January 2021. 497 of the 1,102 commits on main are mine.",
          "Built the insights widget, benchmarking views, editable timeframes, Binary Profiling and the generic issue view.",
          "Cut the bundle by 30% by letting webpack tree-shake, and moved the router from v5 to v6 behind an adapter.",
          "Exposed dashboards to other products as Module Federation remotes.",
        ],
        post: { slug: "two-builds-one-chunk-registry", label: "Two builds, one chunk registry" },
      },
      {
        name: "appex.dashboard-ui",
        prs: 11,
        years: "2024 to 2026",
        stack: "React, Module Federation, Playwright",
        what: "The Application Experience dashboards.",
        did: ["Embedded the web-app profiling and functional errors views from cade-ui, host side."],
      },
      {
        name: "cloud-intelligence.benchmarks-ui",
        prs: 9,
        years: "2026",
        stack: "React, Rspack, Biome, Jest, Playwright",
        what: "A benchmark configuration modal served to other teams as a federated remote.",
        did: ["Started with a walking skeleton to prove the path from build to host, then delivered the real modal."],
      },
      {
        name: "digital-experience.dex-ui-v3",
        prs: 6,
        years: "2024 to 2026",
        stack: "React, Apollo, Jest, Playwright",
        what: "The Digital Experience score interface.",
        did: [
          "Built the DEX Benchmarking dashboard in 2024.",
          "Moved its data source from a GraphQL dataset to a REST API in 2026 with no visual change.",
        ],
      },
      {
        name: "apollo.components",
        prs: 3,
        years: "2022 and 2026",
        stack: "React, styled-components, Storybook",
        what: "The shared design system.",
        did: ["Contributed a banner score type, and dependency work towards React 19."],
      },
    ],
  },
];

export const delivery: Layer = {
  id: "delivery",
  name: "Delivery",
  short: "Under all of it",
  summary: "How every layer above reaches production.",
  repos: [
    {
      name: "sdlc.microservices-definition",
      prs: 76,
      years: "2021 to 2024",
      stack: "Jenkins, Terraform, Helm",
      what: "The company-wide deployment repository.",
      did: ["Shipped three years of monthly and maintenance releases for our services, one image tag at a time."],
      post: { slug: "leaving-the-deploy-monolith-for-flux", label: "Leaving the deploy monolith for Flux" },
    },
    {
      name: "gitops.cloud-intelligence",
      prs: 27,
      years: "2024 to 2026",
      stack: "Flux, Helm, Kustomize, GitHub Actions",
      what: "The team's Flux flotilla.",
      did: [
        "Created the repository and its first chart in November 2024 and took it to production in July 2025.",
        "Added the promotion gate, and onboarded the MCP server and the benchmarks interface.",
      ],
    },
    {
      name: "sdlc.flux-catalog",
      prs: 14,
      years: "2025 to 2026",
      stack: "Flux, Kustomize",
      what: "The catalog that says which flotilla may be promoted how far.",
      did: ["Registered our flotillas and raised their ceilings one stage per pull request."],
    },
    {
      name: "github-as-code",
      prs: 13,
      years: "2023 to 2026",
      stack: "YAML",
      what: "Repositories, permissions and branch protection, declared as code.",
      did: ["Created the team's repositories and made the promotion checkbox a required check."],
    },
    {
      name: "gitops.cloudy-cider",
      prs: 11,
      years: "2026",
      stack: "Flux, Helm",
      what: "A dedicated flotilla for the Kafka extractor.",
      did: ["Split it out of the team flotilla, then moved the extraction config into a ConfigMap."],
    },
  ],
};

export const elsewhere = [
  {
    title: "Functional Errors pipeline",
    text: "Designed and built the first version of an actor-based, Kafka-fed pipeline behind Nexthink's Functional Errors feature, and validated it under load.",
  },
  {
    title: "LLM pilot for Experience Mining",
    text: "Ramped up on LLM development in two weeks to deliver a working pipeline for the Kenvue pilot, and co-presented the demo.",
  },
  {
    title: "Nexthink Labs Chrome extension",
    text: "Turned a Tampermonkey script for collecting functional errors into a shipped Chrome extension in two weeks.",
  },
  {
    title: "Quaternion CNNs for 3D sound event detection",
    text: "Master's thesis at La Sapienza in Rome: quaternion-valued convolutional networks for locating sounds in space.",
    href: "https://github.com/LeoBalzoni/QuaternionNN_SoundEventLocalization",
  },
];

const sum = (l: Layer) => l.repos.reduce((n, r) => n + r.prs, 0);
export const layerTotal = sum;
export const totalPrs = [...layers, delivery].reduce((n, l) => n + sum(l), 0);
export const totalRepos = [...layers, delivery].reduce((n, l) => n + l.repos.length, 0);
