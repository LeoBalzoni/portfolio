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
    title: "Cloud Intelligence Platform",
    description:
      "Real-time analytics platform processing millions of events daily. Built with microservices architecture, event-driven pipelines, and interactive dashboards.",
    tags: ["TypeScript", "React", "AWS", "Kafka"],
    github: "https://github.com",
    featured: true,
  },
  {
    title: "Data Pipeline Framework",
    description:
      "Scalable ETL framework for ingesting, transforming, and routing data across multiple cloud providers with built-in monitoring and alerting.",
    tags: ["Python", "Apache Beam", "GCP", "Terraform"],
    github: "https://github.com",
    featured: true,
  },
  {
    title: "Developer Portal",
    description:
      "Internal developer portal with API documentation, service catalog, and automated onboarding workflows for engineering teams.",
    tags: ["Next.js", "TypeScript", "Tailwind", "MDX"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "GitOps Deployment Engine",
    description:
      "Automated deployment system using GitOps principles. Manages infrastructure-as-code, continuous delivery, and rollback strategies.",
    tags: ["Go", "Kubernetes", "ArgoCD", "Helm"],
    github: "https://github.com",
  },
  {
    title: "Cross-Customer Insights",
    description:
      "ML-powered analytics service that identifies patterns and anomalies across customer datasets while preserving data privacy.",
    tags: ["Python", "scikit-learn", "FastAPI", "PostgreSQL"],
    github: "https://github.com",
  },
  {
    title: "Auth Middleware",
    description:
      "High-performance authentication and authorization middleware supporting RBAC, OAuth2, and custom policy engines.",
    tags: ["Go", "gRPC", "Redis", "OPA"],
    github: "https://github.com",
  },
];
