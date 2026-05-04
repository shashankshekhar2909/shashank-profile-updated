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
        {project.problem && (
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            <span className="font-medium text-ink">Problem:</span> {project.problem}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          <span className="font-medium text-ink">Tech stack:</span>{" "}
          {project.stack.slice(0, 4).join(", ")}
        </p>
        {project.outcome && (
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            <span className="font-medium text-ink">Outcome:</span> {project.outcome}
          </p>
        )}
        <p className="mt-3 text-sm">
          <Link href={`/projects/${project.slug}`} className="link-hover underline underline-offset-4">
            View project details and related implementation
          </Link>
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
