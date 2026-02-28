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
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          About
        </h1>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          I am a product engineer who thinks in systems: how data moves, how teams
          operate, and how every decision affects reliability at scale. My work
          blends product intuition with pragmatic engineering, helping teams move
          from ambiguity to aligned architecture and delivery.
        </p>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          Over 8+ years, I have built enterprise search platforms, workflow
          orchestration tools, and AI-integrated automation services. I bring an
          AI-native mindset with strong guardrails: validation, fallback paths,
          monitoring, and cost control.
        </p>
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
