export default function ExperiencePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <section className="card p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-accent">CrowdAnalytix</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
              Senior Product Engineer
            </h1>
          </div>
          <span className="badge">2019 – Present</span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          Leading the design and delivery of enterprise product discovery and
          taxonomy platforms. Focused on scale, reliability, and AI-assisted
          workflows for large retail catalogs.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="section-title">High-Scale Product Discovery Platform</h2>
          <ul className="mt-4 grid gap-3 text-sm text-graphite">
            <li>Scaled to 7.7M+ SKUs with Typesense faceting and schema-driven UI.</li>
            <li>Designed bulk edit, auditing, and review workflows for retail teams.</li>
            <li>Improved search latency and relevance with tuned indexing pipelines.</li>
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="section-title">Taxonomy & Classification Management</h2>
          <ul className="mt-4 grid gap-3 text-sm text-graphite">
            <li>Built hierarchical governance for category and attribute updates.</li>
            <li>Integrated ML-assisted classification suggestions into dashboards.</li>
            <li>Reduced manual effort with curated review queues and validation.</li>
          </ul>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Modernization & DevOps</h2>
        <ul className="mt-4 grid gap-3 text-sm text-graphite">
          <li>Replatformed services with FastAPI, Docker, and CI/CD pipelines.</li>
          <li>Improved deployment reliability with IaC and monitoring routines.</li>
          <li>Partnered with cross-functional teams on roadmap and delivery.</li>
        </ul>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Independent / Freelance</h2>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          Before 2019, I worked as a freelance engineer preparing and
          customizing ecommerce websites using WooCommerce, WordPress, PHP, and
          AWS. Focused on rapid delivery, launch support, and performance
          tuning for small businesses.
        </p>
      </section>
    </div>
  );
}
