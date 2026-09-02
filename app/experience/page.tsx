import type { Metadata } from "next";
import Link from "next/link";
import experienceData from "@/content/experience.json";

export const metadata: Metadata = {
  title: "Experience — 8+ Years in AI Engineering",
  description:
    "Shashank Shekhar has 8+ years across AI systems, developer tools, frontend engineering, product catalog platforms, and search-driven UIs.",
  alternates: {
    canonical: "/experience"
  },
  openGraph: {
    title: "Experience — 8+ Years in AI Engineering | Shashank Shekhar",
    description:
      "Shashank Shekhar has 8+ years across AI systems, developer tools, frontend engineering, product catalog platforms, and search-driven UIs.",
    url: "/experience",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shashank Shekhar — AI-Native Product Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience — 8+ Years in AI Engineering | Shashank Shekhar",
    description:
      "Shashank Shekhar has 8+ years across AI systems, developer tools, frontend engineering, product catalog platforms, and search-driven UIs.",
    images: ["/opengraph-image"]
  }
};

export default function ExperiencePage() {
  const coreSkills = [
    "Agentic Development",
    "Angular",
    "React / Next.js",
    "TypeScript",
    "FastAPI",
    "Typesense",
    "Docker",
    "CI/CD (GitLab)",
    "AWS",
    "GCP",
    "Product Catalog Systems",
    "Taxonomy Applications",
    "AI Workflow Tools",
    "Search Interfaces",
    "Frontend Architecture"
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <section className="card p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-accent">8+ years shipping production systems</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
              Experience
            </h1>
          </div>
          <span className="badge">2017 – Present</span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          Product-oriented software engineer who owns systems end to end:
          architecture design, implementation, deployment, and production
          support. Currently focused on agentic development — AI agents that
          build, execute, diagnose, and modify applications — built on eight
          years of enterprise frontend, search, and platform engineering.
        </p>
      </section>

      <section className="card p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink">CrowdAnalytix</h2>
            <p className="mt-1 text-sm text-graphite">Software Engineer II (Product Systems)</p>
          </div>
          <span className="text-xs uppercase tracking-wide text-accent">Aug 2019 – Present · Bengaluru</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          Designed and delivered scalable enterprise systems supporting
          large-scale catalog and taxonomy platforms.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="section-title">High-Scale Product Discovery</h3>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Built search-driven product system supporting 7.7M+ SKUs.</li>
              <li>Implemented millisecond-level faceted search using Typesense.</li>
              <li>Designed schema-driven product views and bulk-edit workflows.</li>
            </ul>
          </div>
          <div>
            <h3 className="section-title">Taxonomy & Classification</h3>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Built hierarchical category management and attribute governance tools.</li>
              <li>Integrated ML classification predictions into operational dashboards.</li>
              <li>Reduced manual analyst effort through workflow improvements.</li>
            </ul>
          </div>
          <div>
            <h3 className="section-title">Modernization & Tooling</h3>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Re-architected legacy UI into modular, reusable component structures.</li>
              <li>Built reusable SVG tooling (zoom/pan/coordinate export) used across internal tools.</li>
              <li>Established Docker-based CI/CD pipelines with GitLab Runner, deploying to AWS and GCP.</li>
            </ul>
          </div>
          <div>
            <h3 className="section-title">Environment</h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              Angular, TypeScript, Typesense, FastAPI, Docker, GitLab CI/CD, AWS, GCP
            </p>
          </div>
        </div>
      </section>

      <section className="card p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink">Independent Systems & Applied Engineering</h2>
            <p className="mt-1 text-sm text-graphite">The BuildOS platform and applied AI services</p>
          </div>
          <span className="text-xs uppercase tracking-wide text-accent">Ongoing</span>
        </div>
        <div className="mt-6 relative pl-6 border-l-2 border-mist space-y-8">
          {experienceData.timeline.map((entry) => (
            <div key={entry.title} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-stone" />
              <div className="flex items-center justify-between text-xs text-graphite font-mono">
                <span className="font-bold text-ink text-sm">{entry.title}</span>
                <span>{entry.period}</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/projects" className="text-xs font-semibold text-brand hover:underline">
            Full case studies →
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="section-title">Freelance Developer</h2>
          <span className="text-xs uppercase tracking-wide text-accent">Jul 2017 – Jul 2019 · Remote</span>
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-graphite">
          <li>Delivered 15+ web applications end-to-end, including ecommerce builds on WooCommerce, WordPress, and PHP.</li>
          <li>Managed AWS EC2 deployments and production maintenance.</li>
          <li>Owned planning, client communication, delivery, and fixes.</li>
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="section-title">Core skills</h2>
          <ul className="mt-4 grid gap-2 text-sm text-graphite md:grid-cols-2">
            {coreSkills.map((skill) => (
              <li key={skill} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="section-title">Education & Certifications</h2>
          <ul className="mt-4 grid gap-2 text-sm text-graphite">
            <li>MCA — BBAU University, Lucknow (2014 – 2017)</li>
            <li>B.Sc. IT — Amity University, Lucknow (2011 – 2014)</li>
            <li className="pt-2">Architecting with Google Kubernetes Engine: Foundations (2021)</li>
            <li>Google Cloud Fundamentals: Core Infrastructure (2021)</li>
            <li>Getting Started With Docker (2019)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
