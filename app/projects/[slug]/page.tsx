import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project"
    };
  }

  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <section className="card p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-accent">
          <span>{project.type}</span>
          <span>•</span>
          <span>{project.timeline}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="card p-8">
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </section>

      <section className="card p-6">
        <h2 className="section-title">Tech stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>
      </section>

      {project.links && project.links.length > 0 && (
        <section className="card p-6">
          <h2 className="section-title">Links</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-accent">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="link-hover"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
