import Link from "next/link";
import site from "@/content/site.json";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="badge">AI-Integrated Product Engineer</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {site.name}
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
    </div>
  );
}
