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
  },
  openGraph: {
    title: "BuildOS Desktop — Interactive Portfolio | Shashank Shekhar",
    description:
      "Explore Shashank Shekhar's portfolio as a full desktop operating system: boot sequence, draggable app windows, live terminal, and project explorer.",
    url: "/os",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shashank Shekhar — AI-Native Product Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildOS Desktop — Interactive Portfolio | Shashank Shekhar",
    description:
      "Explore Shashank Shekhar's portfolio as a full desktop operating system: boot sequence, draggable app windows, live terminal, and project explorer.",
    images: ["/opengraph-image"]
  }
};

export default function OsPage() {
  const projects = getAllProjectMeta();

  return (
    <>
      <h1 className="sr-only">BuildOS Desktop — Interactive Portfolio</h1>
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
    </>
  );
}
