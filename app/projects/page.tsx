import { getAllProjects, getAllTags } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import TagFilter from "@/components/TagFilter";

interface ProjectsPageProps {
  searchParams?: { tag?: string };
}

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
          Projects
        </h1>
        <p className="mt-3 text-base leading-relaxed text-graphite">
          A blend of enterprise platforms and independent systems across search,
          workflow orchestration, and AI automation.
        </p>
        <div className="mt-6">
          <TagFilter tags={tags} activeTag={activeTag} />
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
