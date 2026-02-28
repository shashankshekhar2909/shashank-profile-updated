import Link from "next/link";
import { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-accent">
          <span>{project.type}</span>
          <span>•</span>
          <span>{project.timeline}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
          <Link href={`/projects/${project.slug}`} className="link-hover">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          {project.summary}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
