import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10">
      <section className="card p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">
              Shashank Shekhar
            </h1>
            <p className="mt-2 text-sm text-graphite">
              AI-Integrated Product Engineer • Bengaluru, India
            </p>
          </div>
          <Link href="/resume-shashank-shekhar.pdf" className="btn-primary">
            Download PDF
          </Link>
        </div>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          Product engineer with 8+ years of experience building enterprise search,
          workflow systems, and AI-enabled automation. Focused on responsible AI,
          scalable architecture, and end-to-end delivery.
        </p>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Experience</h2>
        <div className="mt-4 grid gap-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-ink">CrowdAnalytix</h3>
              <span className="text-xs uppercase tracking-wide text-accent">2019 – Present</span>
            </div>
            <p className="mt-2 text-sm text-graphite">Senior Product Engineer</p>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Led 7.7M+ SKU product discovery platform with Typesense faceting.</li>
              <li>Built taxonomy/classification governance with ML-assisted tooling.</li>
              <li>Modernized services with FastAPI, Docker, and CI/CD.</li>
            </ul>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-ink">Independent</h3>
              <span className="text-xs uppercase tracking-wide text-accent">2016 – 2019</span>
            </div>
            <p className="mt-2 text-sm text-graphite">Freelance Web Engineer</p>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Prepared and customized ecommerce websites.</li>
              <li>Built on WooCommerce, WordPress, and PHP.</li>
              <li>Handled AWS hosting, performance, and launch support.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Skills</h2>
        <div className="mt-4 grid gap-4 text-sm text-graphite">
          <p>System design, enterprise search, workflow orchestration</p>
          <p>Next.js, Angular, FastAPI, Typesense</p>
          <p>AI integration, schema validation, automation services</p>
          <p>Docker, CI/CD, AWS, GCP</p>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Education</h2>
        <p className="mt-4 text-sm text-graphite">
          Bachelor of Engineering in Computer Science
        </p>
      </section>
    </div>
  );
}
