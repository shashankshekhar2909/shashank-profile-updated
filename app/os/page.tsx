import type { Metadata } from "next";
import site from "@/content/site.json";
import OsDesktop from "@/components/OsDesktop";
import { getAllProjectMeta } from "@/lib/projects";

export const metadata: Metadata = {
  title: "BuildOS Desktop — Interactive Portfolio",
  description:
    "Explore Shashank Shekhar's portfolio as a full desktop operating system: boot sequence, draggable app windows, live terminal, and project explorer.",
  alternates: {
    canonical: "/os"
  }
};

export default function OsPage() {
  const projects = getAllProjectMeta();

  return (
    <OsDesktop
      projects={projects.map((p) => ({
        slug: p.slug,
        title: p.title,
        type: p.type,
        timeline: p.timeline,
        summary: p.summary,
        stack: p.stack
      }))}
      siteName={site.name}
      siteTitle={site.title}
      email={site.email}
      github={site.links.github}
      linkedin={site.links.linkedin}
      location={site.location}
      metrics={site.metrics}
    />
  );
}
