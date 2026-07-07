export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "DEX Benchmarks Dashboard",
    description:
      "Engineered and delivered the DEX Benchmarks Dashboard end-to-end — full-stack feature work spanning UI, backend logic, and SQL/NQL queries. Shipped under tight deadlines for a Forrester demo and the subsequent GA release, with recognition from both internal stakeholders and customers.",
    tags: ["TypeScript", "React", "SQL / NQL", "Full-Stack"],
    featured: true,
  },
  {
    title: "Functional Errors Pipeline",
    description:
      "Designed and built the first version of an actor-based, Kafka-fed DAG pipeline powering Nexthink's Functional Errors feature. Defined the architecture, validated the integration under load, and established the patterns the rest of the team builds on.",
    tags: ["Kafka", "TypeScript", "Architecture", "Data Pipelines"],
    featured: true,
  },
  {
    title: "Cross-Customer Insights v2 — Segmentation",
    description:
      "End-to-end evolution of CCI to support segmentation across the data model, pipelines, and consuming services (AI Drive, DEX). Cut the effort to onboard a new segmentation by ~50% and unblocked downstream teams without further backend changes.",
    tags: ["TypeScript", "Data Platform", "Architecture", "Cross-Team"],
    featured: true,
  },
  {
    title: "AI/LLM Pipelines on AWS",
    description:
      "Ongoing work integrating LLMs into large-scale data pipelines on the AWS suite — Spark jobs feeding processing flows, with the LLM step embedded as just another component rather than a magic box. Focus on cost, evaluation, and reliability rather than demos.",
    tags: ["AWS", "Spark", "LLMs", "Python"],
  },
  {
    title: "AppEx Dashboard UI",
    description:
      "Led the design and implementation of the AppEx Dashboard UI and contributed to the backend refactor underneath it — laying the groundwork for future benchmarking capabilities and unblocking the AppEx team during a capacity crunch.",
    tags: ["TypeScript", "React", "Full-Stack"],
  },
  {
    title: "FluxCD Migration",
    description:
      "Led the team's move from ArgoCD to FluxCD, taking CI/CD all the way to production and decoupling our deploys from the monolith release train. Earlier I had also pioneered ArgoCD adoption on the team — same instinct, one platform later. Documented both transitions so other teams could follow.",
    tags: ["Kubernetes", "FluxCD", "GitOps", "CI/CD"],
  },
  {
    title: "LLM Pilot for Experience Mining (Kenvue)",
    description:
      "Ramped up on LLM-based development in two weeks to deliver a working pipeline for the Kenvue XPM pilot. Co-presented the demo, which exceeded expectations and seeded continued investment in the area.",
    tags: ["Python", "LLMs", "AI", "Data"],
  },
  {
    title: "Nexthink-Labs Chrome Extension",
    description:
      "Built and shipped a Chrome extension for collecting and processing functional errors, starting from a Tampermonkey script. Two weeks from concept to release, with ongoing iteration as detection needs evolved.",
    tags: ["TypeScript", "Chrome Extensions", "Web"],
  },
  {
    title: "Quaternion CNN for 3D Sound Event Detection",
    description:
      "Master's thesis at La Sapienza: quaternion-valued convolutional neural networks for spatial audio event localization. Explored whether the algebraic structure of quaternions could capture the geometry of 3D sound better than real-valued nets.",
    tags: ["Python", "PyTorch", "Research", "Deep Learning"],
    github:
      "https://github.com/LeoBalzoni/QuaternionNN_SoundEventLocalization",
  },
];
