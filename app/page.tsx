import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Shashank Shekhar | Senior Frontend Developer & AI-Integrated Product Engineer",
  description:
    "Shashank Shekhar is a Senior Frontend Developer and AI-Integrated Product Engineer based in India. He builds scalable Angular, React, Next.js, FastAPI, Typesense, Docker, and cloud-based product systems.",
  keywords: [
    "Shashank Shekhar",
    "Senior Frontend Developer",
    "Angular Developer",
    "AI-Integrated Product Engineer",
    "AI-Native Product Engineer",
    "Typesense Developer",
    "FastAPI Developer",
    "Product Catalog Engineer",
    "Frontend Architect India"
  ],
  alternates: {
    canonical: "/"
  }
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="badge">AI-Integrated Product Engineer</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Shashank Shekhar - Senior Frontend Developer &amp; AI-Integrated Product Engineer
          </h1>
          <p className="mt-4 text-lg text-graphite max-w-2xl">
            {site.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              Work with me
            </Button>
            <Button href="/resume" variant="secondary">
              View resume
            </Button>
            <Link href={site.links.v2} className="btn-secondary">
              Profile v2 (beta)
            </Link>
            <Link href={site.links.linkedin} className="btn-secondary">
              LinkedIn
            </Link>
            <Link href={site.links.github} className="btn-secondary">
              GitHub
            </Link>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="section-title">Proof bar</h2>
          <ul className="mt-4 grid gap-3 text-sm text-graphite">
            {site.proofBar.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <p className="badge">Featured app</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
            AI Tools App
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            A tool discovery and comparison platform for exploring AI products
            with a focused, opinionated workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://ai.buildwithshashank.com"
              className="btn-secondary"
            >
              Open app
            </Link>
            <Button href="/about" variant="secondary">
              Product Lab
            </Button>
          </div>
        </div>
        <div className="card p-6">
          <p className="badge">Homelab</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
            How I build and run it
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            A living record of the homelab systems, workflows, and reliability
            patterns I use to prototype and ship real products.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://homelab.buildwithshashank.com/"
              className="btn-secondary"
            >
              View homelab
            </Link>
            <Button href="/about" variant="secondary">
              Product Lab
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="section-title">What I do</h2>
          <div className="mt-4 grid gap-4">
            <article>
              <h3 className="text-base font-semibold text-ink">Frontend Engineering</h3>
              <p className="mt-1 text-sm leading-relaxed text-graphite">
                Senior frontend development using Angular, React, Next.js, TypeScript,
                design systems, dashboards, and scalable UI architecture.
              </p>
            </article>
            <article>
              <h3 className="text-base font-semibold text-ink">AI-Integrated Product Systems</h3>
              <p className="mt-1 text-sm leading-relaxed text-graphite">
                Building AI-assisted workflows, LLM-powered interfaces, automation tools,
                and product systems that combine frontend, backend, and AI APIs.
              </p>
            </article>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="section-title">What I do</h2>
          <div className="mt-4 grid gap-4">
            <article>
              <h3 className="text-base font-semibold text-ink">Search &amp; Product Catalog Platforms</h3>
              <p className="mt-1 text-sm leading-relaxed text-graphite">
                Experience building product catalog systems, taxonomy tools, dynamic
                attributes, and Typesense-powered search interfaces for large SKU datasets.
              </p>
            </article>
            <article>
              <h3 className="text-base font-semibold text-ink">Full Stack Delivery</h3>
              <p className="mt-1 text-sm leading-relaxed text-graphite">
                FastAPI, PostgreSQL, Docker, CI/CD, AWS, GCP, and production-focused
                deployment workflows.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Explore my work</h2>
        <div className="mt-4 grid gap-2 text-sm text-graphite">
          <Link href="/projects" className="underline underline-offset-4 hover:text-ink">
            View my Angular and AI product engineering projects
          </Link>
          <Link href="/experience" className="underline underline-offset-4 hover:text-ink">
            Explore my frontend engineering experience
          </Link>
          <Link href="/resume" className="underline underline-offset-4 hover:text-ink">
            Review my resume for Senior Frontend Developer and product engineering roles
          </Link>
          <Link href="/contact" className="underline underline-offset-4 hover:text-ink">
            Contact Shashank Shekhar for frontend or AI product work
          </Link>
          <Link
            href="https://ai.buildwithshashank.com"
            className="underline underline-offset-4 hover:text-ink"
          >
            Explore AI Stack Lab projects
          </Link>
          <Link
            href="https://homelab.buildwithshashank.com/"
            className="underline underline-offset-4 hover:text-ink"
          >
            Explore my homelab engineering systems
          </Link>
          <Link
            href="https://blogmanager.buildwithshashank.com"
            className="underline underline-offset-4 hover:text-ink"
          >
            Read product engineering notes and articles
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="section-title">What I bring</h2>
          <ul className="mt-4 grid gap-3 text-sm text-graphite">
            {site.whatIBring.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="section-title">Availability</h2>
          <p className="mt-4 text-sm leading-relaxed text-graphite">
            Open to EU/Remote roles focused on AI-integrated products, platform
            engineering, and workflow automation. I partner with product leaders to
            bring clarity, delivery velocity, and reliable systems.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="primary">
              Start a conversation
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Featured projects
            </h2>
            <p className="mt-2 text-sm text-graphite">
              Selected work across enterprise search, AI workflows, and automation
              systems.
            </p>
          </div>
          <Button href="/projects" variant="secondary">
            View all projects
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="card p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Ready to build the next system?
        </h2>
        <p className="mt-3 text-sm text-graphite">
          I help teams ship AI-enabled products that stay reliable, explainable,
          and cost-aware at scale.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/contact" variant="primary">
            Work with me
          </Button>
          <Button href="/resume" variant="secondary">
            View resume
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shashank Shekhar",
              url: "https://buildwithshashank.com/",
              jobTitle: [
                "Senior Frontend Developer",
                "AI-Integrated Product Engineer",
                "Angular Developer",
                "Frontend Engineer"
              ],
              knowsAbout: [
                "Angular",
                "React",
                "Next.js",
                "TypeScript",
                "FastAPI",
                "Typesense",
                "Docker",
                "CI/CD",
                "AWS",
                "GCP",
                "Frontend Architecture",
                "Product Catalog Systems",
                "AI Workflow Automation"
              ],
              sameAs: [
                "https://www.linkedin.com/in/shashankshekhar2k15/",
                "https://github.com/shashankshekhar2909/"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Build with Shashank",
              url: "https://buildwithshashank.com/",
              description:
                "Portfolio of Shashank Shekhar, Senior Frontend Developer and AI-Integrated Product Engineer."
            }
          ])
        }}
      />
    </div>
  );
}
