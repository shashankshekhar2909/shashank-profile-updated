import type { Metadata } from "next";
import Link from "next/link";
import OkfGraph from "@/components/OkfGraph";

export const metadata: Metadata = {
  title: "Playground — 3D Map of the BuildOS Platform",
  description:
    "Interactive 3D knowledge graph of the BuildOS platform: how Knowledge Hub, BuildOS Agent, and Node Commander connect into one agentic development loop.",
  alternates: {
    canonical: "/playground"
  },
  openGraph: {
    title: "Playground — 3D Map of the BuildOS Platform | Shashank Shekhar",
    description:
      "Interactive 3D knowledge graph of the BuildOS platform: how Knowledge Hub, BuildOS Agent, and Node Commander connect into one agentic development loop.",
    url: "/playground",
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
    title: "Playground — 3D Map of the BuildOS Platform | Shashank Shekhar",
    description:
      "Interactive 3D knowledge graph of the BuildOS platform: how Knowledge Hub, BuildOS Agent, and Node Commander connect into one agentic development loop.",
    images: ["/opengraph-image"]
  }
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Playground</h1>
        <p className="mt-3 text-base leading-relaxed text-graphite max-w-2xl">
          A live 3D map of the BuildOS platform — the same kind of structural
          knowledge graph (OKF) that Knowledge Hub compiles from real
          repositories for AI agents to navigate. Every node is a real part of
          the system.
        </p>
      </section>

      <section>
        <OkfGraph />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="section-title">What you are looking at</h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            OKF (Open Knowledge Format) represents a software system as a graph
            of applications, services, datastores, and concepts with explicit
            relationships. Agents query this structure instead of guessing from
            text chunks — that is what makes their output respect real
            interfaces. This page renders the BuildOS platform itself in that
            form.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="section-title">How this page is built</h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            No 3D library — a custom force-directed simulation and perspective
            projection on a plain canvas, ~300 lines, zero added dependencies.
            Honors reduced-motion preferences and adapts to light/dark themes.
            The graph data is a JSON file in the same format Knowledge Hub
            emits.
          </p>
        </div>
      </section>

      <section className="card p-8 text-center">
        <h2 className="text-xl font-bold tracking-tight text-ink">
          Want your system mapped like this?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-graphite">
          This is the foundation of agentic development: agents that understand
          structure before they touch code.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/projects/buildos-knowledge-hub" className="btn-secondary">
            Read the Knowledge Hub case study
          </Link>
          <Link href="/contact" className="btn-brand">
            Book a call
          </Link>
        </div>
      </section>
    </div>
  );
}
