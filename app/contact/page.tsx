import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Contact Shashank Shekhar",
  description:
    "Contact Shashank Shekhar for Senior Frontend Developer, Angular development, and AI-integrated product engineering work.",
  alternates: {
    canonical: "/contact"
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
          If you are building AI-integrated products, enterprise search, or
          workflow automation systems, I would love to help. I am open to EU/Remote
          roles and product engineering partnerships.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`mailto:${site.email}`} className="btn-primary">
            Email me
          </Link>
          <Link href={site.links.linkedin} className="btn-secondary">
            LinkedIn
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title">Availability</h2>
        <p className="mt-4 text-sm text-graphite">
          Location: {site.location}
        </p>
        <p className="mt-2 text-sm text-graphite">
          Preferred roles: AI-integrated product engineering, platform
          engineering, workflow automation.
        </p>
      </section>
    </div>
  );
}
