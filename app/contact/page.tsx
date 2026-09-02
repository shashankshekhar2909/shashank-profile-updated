import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Contact — Agentic Development & AI Consulting",
  description:
    "Contact Shashank Shekhar for agentic development, AI system architecture, product engineering, and self-hosted infrastructure work.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact — Agentic Development & AI Consulting | Shashank Shekhar",
    description:
      "Contact Shashank Shekhar for agentic development, AI system architecture, product engineering, and self-hosted infrastructure work.",
    url: "/contact",
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
    title: "Contact — Agentic Development & AI Consulting | Shashank Shekhar",
    description:
      "Contact Shashank Shekhar for agentic development, AI system architecture, product engineering, and self-hosted infrastructure work.",
    images: ["/opengraph-image"]
  }
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Contact Shashank Shekhar
        </h1>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          If you are building AI-integrated products, agentic systems, enterprise
          search, or workflow automation, I would love to help. I take on
          consulting engagements and product engineering partnerships, and I am
          open to EU/Remote roles.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`mailto:${site.email}`} className="btn-brand">
            Email me
          </Link>
          <Link href={site.links.linkedin} className="btn-secondary">
            LinkedIn
          </Link>
        </div>
        <p className="mt-4 text-xs text-graphite">
          Tell me what you are building and where it is stuck — I reply with a
          concrete next step, not a sales pitch.
        </p>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Availability</h2>
        <p className="mt-4 text-sm text-graphite">
          Location: {site.location}
        </p>
        <p className="mt-2 text-sm text-graphite">
          Engagements: agentic development, AI-integrated product engineering,
          platform engineering, workflow automation.
        </p>
      </section>
    </div>
  );
}
