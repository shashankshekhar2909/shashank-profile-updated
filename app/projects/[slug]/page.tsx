import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";

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
    title: `${project.title} - Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`
    },
    openGraph: {
      title: `${project.title} Case Study | Shashank Shekhar`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article"
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 pt-8">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-graphite hover:text-ink transition-colors"
        >
          <span className="font-sans">←</span> Back to Homepage
        </Link>
      </div>

      {/* Hero Header */}
      <section className="border-b border-mist pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-graphite">
          <span>{project.type}</span>
          <span>•</span>
          <span>{project.timeline}</span>
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl leading-none">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-graphite">
          {project.summary}
        </p>

        {project.links && project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="underline underline-offset-4 text-ink hover:opacity-80"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Main Prose Content */}
      <section className="prose-content">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </section>

      {/* Tech Stack Footer */}
      <section className="border-t border-mist pt-8 pb-16">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: `https://buildwithshashank.com/projects/${project.slug}`,
            author: {
              "@type": "Person",
              name: "Shashank Shekhar"
            },
            keywords: project.tags,
            about: project.stack
          })
        }}
      />
    </div>
  );
}
