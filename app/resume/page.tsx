import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume - Shashank Shekhar | AI-Native Product Engineer",
  description:
    "Resume of Shashank Shekhar, AI-Native Product Engineer with experience across Angular, React, FastAPI, Typesense, Docker, AWS, and GCP.",
  alternates: {
    canonical: "/resume"
  }
};

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
            <p className="mt-2 text-sm text-graphite">Software Engineer II (Product Systems)</p>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Led 7.7M+ SKU product discovery platform with Typesense faceting.</li>
              <li>Built taxonomy/classification governance with ML-assisted tooling.</li>
              <li>Modernized services with FastAPI, Docker, and CI/CD.</li>
              <li className="text-xs text-graphite/80">
                Environment: Angular, TypeScript, Typesense, FastAPI, Docker, GitLab CI/CD, AWS, GCP
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-ink">Independent</h3>
              <span className="text-xs uppercase tracking-wide text-accent">2017 – 2019</span>
            </div>
            <p className="mt-2 text-sm text-graphite">Freelance Developer</p>
            <ul className="mt-3 grid gap-2 text-sm text-graphite">
              <li>Delivered 15+ web applications end-to-end.</li>
              <li>Managed AWS EC2 deployments and production maintenance.</li>
              <li>Owned planning, client communication, delivery, and fixes.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Skills</h2>
        <div className="mt-4 grid gap-4 text-sm text-graphite">
          <p><span className="font-semibold text-ink">Frontend:</span> Angular, TypeScript, React / Next.js component architecture</p>
          <p><span className="font-semibold text-ink">System Design:</span> search-driven systems, workflow modeling, schema design, API contracts</p>
          <p><span className="font-semibold text-ink">Backend &amp; APIs:</span> FastAPI (Python), REST APIs, LLM integration</p>
          <p><span className="font-semibold text-ink">Infrastructure:</span> Docker, CI/CD (GitLab), AWS, GCP, Linux</p>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Education</h2>
        <div className="mt-4 grid gap-3 text-sm text-graphite">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span><span className="font-semibold text-ink">MCA</span> — BBAU University, Lucknow</span>
            <span className="text-xs uppercase tracking-wide text-accent">2014 – 2017</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span><span className="font-semibold text-ink">B.Sc. IT</span> — Amity University, Lucknow</span>
            <span className="text-xs uppercase tracking-wide text-accent">2011 – 2014</span>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Certifications</h2>
        <ul className="mt-4 grid gap-2 text-sm text-graphite">
          <li>Architecting with Google Kubernetes Engine: Foundations — Oct 2021</li>
          <li>Google Cloud Fundamentals: Core Infrastructure — Sep 2021</li>
          <li>Getting Started With Docker — Jan 2019</li>
        </ul>
      </section>
    </div>
  );
}
