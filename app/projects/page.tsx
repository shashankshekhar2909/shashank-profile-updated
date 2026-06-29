import { getAllProjects, getAllTags } from "@/lib/projects";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import TagFilter from "@/components/TagFilter";

interface ProjectsPageProps {
  searchParams?: { tag?: string };
}

export const metadata: Metadata = {
  title: "Projects by Shashank Shekhar - BuildOS, AI, Search & Product Systems",
  description:
    "Projects by Shashank Shekhar across the BuildOS AI engineering platform, Angular product catalog systems, Typesense search interfaces, FastAPI backends, Docker deployment, and frontend architecture.",
  alternates: {
    canonical: "/projects"
  }
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const activeTag = searchParams?.tag;
  const projects = await getAllProjects();
  const tags = await getAllTags();

  const filteredProjects = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Projects by Shashank Shekhar - BuildOS, AI, Search &amp; Product Systems
        </h1>
        <p className="mt-3 text-base leading-relaxed text-graphite">
          A blend of independent AI engineering platforms and enterprise systems
          across search, workflow orchestration, infrastructure, and automation.
        </p>
        <div className="mt-6">
          <TagFilter tags={tags} activeTag={activeTag} />
        </div>
      </section>

      <section className="card p-8">
        <p className="badge">BuildOS Ecosystem</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
          Three products forming one AI engineering platform
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold text-ink">Knowledge Hub</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              Understands repositories, docs, architecture, APIs, and engineering
              notes to build long-term project memory.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink">BuildOS Agent</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              Uses that context to plan, reason, document, coordinate AI models,
              and assist software development.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink">Node Commander</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              Executes infrastructure operations, Docker workflows, deployments,
              migrations, and server management.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
