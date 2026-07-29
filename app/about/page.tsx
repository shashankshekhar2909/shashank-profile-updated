import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI-Native Product Engineer",
  description:
    "About Shashank Shekhar, an AI-Native Product Engineer building the BuildOS platform, developer tools, AI systems, and self-hosted infrastructure with Next.js, FastAPI, and Docker.",
  alternates: {
    canonical: "/about"
  }
};

const skills = {
  "System Design & Architecture": [
    "Event-driven and API-first platform design",
    "Multi-tenant data modeling and governance",
    "Performance optimization and reliability"
  ],
  Frontend: [
    "Next.js, Angular, and design system foundations",
    "Search UX, workflow builders, data-heavy UI",
    "Accessibility-first component architecture"
  ],
  "Backend & APIs": [
    "FastAPI, Node.js, Typesense",
    "Workflow orchestration services",
    "Schema-driven validation and pipelines"
  ],
  "AI & Automation": [
    "Agentic development: agents that build, run, diagnose, and patch apps",
    "Prompt + schema design for reliable extraction",
    "Cost/latency/fallback planning",
    "NL to workflow generation"
  ],
  Infrastructure: [
    "Dockerized services + CI/CD",
    "AWS and GCP deployments",
    "Observability, logging, and backups"
  ]
};

export default function AboutPage() {
  const currentUpcomingProducts = [
    "BuildOS Agent - AI engineering workspace for planning, parsing, and multi-agent coordination",
    "Node Commander - Agentless SSH fleet management for Docker deployments and migrations",
    "Knowledge Hub - Tree-sitter AST parser compiling repositories into structured project memory",
    "LayerOne - Open-source cross-framework design tokens and accessible web components"
  ];

  const contentAutomationSystems = [
    "Ghost Blog System - Self-hosted publishing platform for long-form content",
    "GhostPilot - Automated content engine that generates, schedules, and publishes posts using AI"
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          About
        </h1>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          I am a product engineer who thinks in systems: how data moves, how teams
          operate, and how every decision affects reliability at scale. Today that
          means agentic development — AI agents that do not stop at generating
          code, but build whole applications, execute them, diagnose failures, and
          apply fixes, with deterministic validation and human review where it
          matters.
        </p>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          Over 8+ years I have shipped enterprise search platforms (7.7M+ SKUs on
          Typesense), Angular and React product systems, workflow orchestration
          tools, and AI-integrated automation services. That experience now feeds
          BuildOS: Knowledge Hub gives agents structured repository context, the
          Agent plans and coordinates, and Node Commander executes on real
          infrastructure. Guardrails stay non-negotiable — validation, fallback
          paths, monitoring, and cost control.
        </p>
      </section>

      <section className="card p-8">
        <h2 className="section-title">Product Lab</h2>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          I do not build portfolio pieces — I run real systems on my own
          infrastructure. Every product below is deployed on a self-hosted Docker
          fleet I operate: 20+ services behind Cloudflare tunnels, with
          monitoring, backups, and CI/CD I maintain myself.
        </p>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          The lab exists because agentic development needs a proving ground.
          Agents that build, execute, and repair applications have to do it on
          real servers with real failure modes — so that is where mine run.
        </p>

        <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
          Current / Upcoming Products
        </h3>
        <ul className="mt-4 grid gap-2 text-sm text-graphite">
          {currentUpcomingProducts.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
          Content &amp; Automation Systems
        </h3>
        <ul className="mt-4 grid gap-2 text-sm text-graphite">
          {contentAutomationSystems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-base leading-relaxed text-graphite">
          More products will be added as they move from idea to prototype to real
          usage.
        </p>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          The goal is simple: build useful systems, ship fast, and evolve them
          into real products.
        </p>

        <div className="mt-6 grid gap-2 text-sm text-graphite">
          <a
            className="underline underline-offset-4 hover:text-ink"
            href="https://blogmanager.buildwithshashank.com"
            target="_blank"
            rel="noreferrer"
          >
            blogmanager.buildwithshashank.com
          </a>
          <a
            className="underline underline-offset-4 hover:text-ink"
            href="https://ai.buildwithshashank.com"
            target="_blank"
            rel="noreferrer"
          >
            AI Tools App
          </a>
          <a
            className="underline underline-offset-4 hover:text-ink"
            href="https://homelab.buildwithshashank.com/"
            target="_blank"
            rel="noreferrer"
          >
            homelab.buildwithshashank.com
          </a>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="card p-6">
            <h2 className="section-title">{group}</h2>
            <ul className="mt-4 grid gap-2 text-sm text-graphite">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="card p-6">
        <h2 className="section-title">How I work</h2>
        <ul className="mt-4 grid gap-3 text-sm text-graphite">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
            <span>Start with outcomes, map the system, then ship in slices.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
            <span>Keep architecture clean with strong contracts and validation.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
            <span>Use AI responsibly: deterministic paths, logs, and audits.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
