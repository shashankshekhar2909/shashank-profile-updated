import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";
import articlesData from "@/content/articles.json";
import experienceData from "@/content/experience.json";
import Button from "@/components/Button";
import Terminal from "@/components/Terminal";
import ScrollReveal from "@/components/ScrollReveal";
import CountUpMetric from "@/components/CountUpMetric";
import { getAllProjectMeta } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Shashank Shekhar | AI-Native Product Engineer",
  description:
    "Shashank Shekhar is an AI-Native Product Engineer specializing in agentic development — AI agents that build, execute, diagnose, and modify whole applications — plus developer tools, AI systems, and self-hosted infrastructure.",
  alternates: {
    canonical: "/"
  }
};

const mockupLineStyles: Record<string, string> = {
  muted: "text-zinc-500",
  ok: "text-emerald-400",
  info: "text-blue-400",
  accent: "text-purple-400"
};

export default function HomePage() {
  const projects = getAllProjectMeta();
  const featured = projects.filter((p) => p.featured);
  const regularCaseStudies = projects.filter((p) => !p.featured);
  const articles = articlesData.articles.filter((a) => !a.placeholder);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-32">
      <ScrollReveal />
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-8 md:pt-20">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mist px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-graphite bg-card-bg mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Currently building BuildOS
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-6xl font-sans leading-none">
              AI-Native <br />
              Product Engineer
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-graphite max-w-2xl font-sans">
              I build AI agents that <span className="text-ink font-semibold">build, execute, diagnose, and modify whole applications</span> — plus the developer tools, self-hosted infrastructure, and production platforms they run on.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-brand">
                Book a call
              </Link>
              <Button href="#products" variant="secondary">
                See Products
              </Button>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="btn border border-mist bg-card-bg text-ink hover:bg-mist/35"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <Terminal
              autoDemo
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
            />
            <p className="mt-3 text-center text-[11px] text-graphite font-mono">
              live shell — click it, type <span className="text-brand">help</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. METRICS SECTION */}
      <section className="border-y border-mist py-12 bg-card-bg/30">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 text-center md:text-left">
          {site.metrics.map((metric) => (
            <CountUpMetric key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </section>

      {/* 2b. INTERACTIVE TERMINAL (mobile — desktop version lives in the hero) */}
      <section className="flex flex-col gap-6 lg:hidden">
        <div>
          <h2 className="section-title">Explore via Terminal</h2>
          <p className="mt-2 text-sm text-graphite">
            This portfolio has a shell. Type <code className="font-mono text-ink">help</code> — every command runs on real project data.
          </p>
        </div>
        <Terminal
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
        />
      </section>

      {/* 2c. WORK WITH ME (consulting offers) */}
      <section id="services" className="flex flex-col gap-8">
        <div>
          <h2 className="section-title">Work With Me</h2>
          <p className="mt-2 text-sm text-graphite">
            Four ways I engage with teams and founders. Fixed scope, clear deliverables, no bench time.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {site.services.map((service) => (
            <div key={service.title} className="card p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-ink text-base">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{service.outcome}</p>
                <ul className="mt-4 space-y-2 text-xs text-graphite">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--color-brand)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="mt-6 text-xs font-semibold text-brand hover:underline">
                Start a conversation →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 2d. PROOF STRIP */}
      <section className="border-y border-mist py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          <span className="text-xs uppercase tracking-wider text-graphite">Proven in production</span>
          <span className="font-mono text-sm text-ink">CrowdAnalytix — 7.7M+ SKU search platform</span>
          <span className="font-mono text-sm text-ink">BuildOS — 3-product AI platform</span>
          <span className="font-mono text-sm text-ink">20+ self-hosted services in continuous operation</span>
        </div>
      </section>

      {/* 3. CURRENTLY BUILDING */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Currently Building</h2>
          <p className="mt-2 text-sm text-graphite">Evolving local tooling into a cohesive cloud environment.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-ink text-sm">BuildOS Agent</span>
                <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">Active Dev</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                AI engineering workspace for repository planning, parsing, and multi-agent coordination.
              </p>
            </div>
            <Link href="/projects/buildos-agent" className="mt-4 text-[11px] font-semibold text-ink hover:underline">
              Read Details →
            </Link>
          </div>

          <div className="card p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-ink text-sm">Node Commander</span>
                <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">Live</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                Agentless SSH fleet management dashboard for Docker deployments and zero-downtime migrations.
              </p>
            </div>
            <Link href="/projects/buildos-node-commander" className="mt-4 text-[11px] font-semibold text-ink hover:underline">
              Read Details →
            </Link>
          </div>

          <div className="card p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-ink text-sm">Knowledge Hub</span>
                <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider">In Dev</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                AST tree-sitter based schema parser compiling directories into structured repository memory maps.
              </p>
            </div>
            <Link href="/projects/buildos-knowledge-hub" className="mt-4 text-[11px] font-semibold text-ink hover:underline">
              Read Details →
            </Link>
          </div>

          <div className="card p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-ink text-sm">LayerOne</span>
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">In Progress</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                Open-source cross-framework design tokens and core accessible web components.
              </p>
            </div>
            <Link href="/projects/layerone-design-system" className="mt-4 text-[11px] font-semibold text-ink hover:underline">
              Read Details →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Big Cards) */}
      <section id="products" className="flex flex-col gap-10">
        <div>
          <h2 className="section-title">Featured Products</h2>
          <p className="mt-2 text-sm text-graphite">Full-scale platforms demonstrating visual and engineering depth.</p>
        </div>
        <div className="flex flex-col gap-12">
          {featured.map((product) => (
            <div key={product.slug} className="card overflow-hidden grid lg:grid-cols-[1fr_1.1fr] border border-mist bg-card-bg">
              {/* Product Visual Side */}
              <div className="p-8 bg-zinc-950 border-b lg:border-b-0 lg:border-r border-mist flex flex-col justify-between min-h-[300px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="badge">{product.type}</span>
                    <span className="text-[10px] tracking-wide text-zinc-400 font-mono">{product.timeline}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-100">{product.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{product.summary}</p>
                </div>

                {/* CSS Generated Dashboard Layout Mockup */}
                {product.mockup && (
                  <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-[10px] text-zinc-400 select-none shadow-inner" aria-hidden="true">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80"></span>
                        <span className="h-2 w-2 rounded-full bg-yellow-500/80"></span>
                        <span className="h-2 w-2 rounded-full bg-green-500/80"></span>
                      </div>
                      <span className="text-[9px] text-zinc-500">session: {product.slug}</span>
                    </div>
                    <div className="space-y-1">
                      {product.mockup.map((line) => (
                        <p key={line.text} className={mockupLineStyles[line.style] ?? "text-zinc-400"}>
                          {line.text}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details Side */}
              <div className="p-8 flex flex-col justify-between gap-6">
                <div className="grid gap-6">
                  {product.problem && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink">The Problem</h4>
                      <p className="mt-1 text-sm text-graphite leading-relaxed">{product.problem}</p>
                    </div>
                  )}
                  {product.outcome && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink">The Solution</h4>
                      <p className="mt-1 text-sm text-graphite leading-relaxed">{product.outcome}</p>
                    </div>
                  )}
                  
                  {product.highlights && product.highlights.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink">Highlights</h4>
                      <ul className="mt-2 grid gap-1.5 text-xs text-graphite">
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2">✔ {highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink">Tech Stack</h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {product.stack.map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-mist/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-4">
                    {product.links?.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        className="text-xs font-semibold text-ink underline underline-offset-4"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <Link href={`/projects/${product.slug}`} className="btn btn-secondary">
                    Read Case Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ENGINEERING PHILOSOPHY */}
      <section className="flex flex-col gap-8">
        <div>
          <h2 className="section-title">Engineering Philosophy</h2>
          <p className="mt-2 text-sm text-graphite">Core ideas that drive my building process.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm">Architecture First</h3>
            <p className="mt-3 text-xs leading-relaxed text-graphite">
              Every product starts with clear system boundaries. I define data streams, API contracts, and constraints before touching the keyboard.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm">AI is a Tool</h3>
            <p className="mt-3 text-xs leading-relaxed text-graphite">
              AI generates functional boilerplate code quickly. Humans must own the architectural decisions, verification, and code quality controls.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm">Automation by Default</h3>
            <p className="mt-3 text-xs leading-relaxed text-graphite">
              Anything repetitive should eventually disappear. I write automation scripts, templates, and triggers to clear away operational overhead.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm">Production &gt; Prototype</h3>
            <p className="mt-3 text-xs leading-relaxed text-graphite">
              A prototype that doesn&apos;t ship holds zero value. Shipping reliably, early, and observing telemetry in production defines real success.
            </p>
          </div>
        </div>
      </section>

      {/* 6. INFRASTRUCTURE OVERVIEW (Animated Diagram) */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Self-Hosted Infrastructure</h2>
          <p className="mt-2 text-sm text-graphite">Centralized control and container routing across my private network.</p>
        </div>
        <div className="card p-8 bg-zinc-950 overflow-hidden flex flex-col items-center">
          <div className="w-full max-w-2xl font-mono text-[10px] text-zinc-400">
            <div className="text-center text-zinc-500 mb-6 border border-zinc-800 rounded py-1 px-3">
              Infrastructure Routing Topology
            </div>

            <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Network topology: internet traffic routed through Cloudflare and a cloud tunnel to a reverse proxy, which distributes to Node Commander, the Docker fleet, and monitoring, all serving apps">
              {/* Nodes */}
              <rect x="20" y="90" width="80" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="60" y="115" textAnchor="middle" fill="#f4f4f5" fontSize="10" fontWeight="bold">Internet</text>

              <rect x="160" y="90" width="85" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="202" y="115" textAnchor="middle" fill="#f4f4f5" fontSize="10">Cloudflare</text>

              <rect x="300" y="90" width="80" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="340" y="115" textAnchor="middle" fill="#f4f4f5" fontSize="10">Cloud Tunnel</text>

              <rect x="430" y="90" width="90" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="475" y="115" textAnchor="middle" fill="#f4f4f5" fontSize="10">Reverse Proxy</text>

              <rect x="570" y="30" width="90" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="615" y="55" textAnchor="middle" fill="#f4f4f5" fontSize="10">Node Cmdr</text>

              <rect x="570" y="90" width="90" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="615" y="115" textAnchor="middle" fill="#f4f4f5" fontSize="10">Docker Fleet</text>

              <rect x="570" y="150" width="90" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="615" y="175" textAnchor="middle" fill="#f4f4f5" fontSize="10">Monitoring</text>

              <rect x="710" y="90" width="70" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900 animate-pulse" />
              <text x="745" y="115" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Apps</text>

              {/* Connections with custom animated class */}
              <path d="M100 110 H160" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M245 110 H300" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M380 110 H430" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              
              <path d="M520 110 H570" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M520 110 L570 50" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M520 110 L570 170" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />

              <path d="M660 50 L710 110" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M660 110 H710" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M660 170 L710 110" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* 7. AI STACK OVERVIEW (Visual Flow) */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">AI Processing Stack</h2>
          <p className="mt-2 text-sm text-graphite">Visualizing the orchestration pipelines that power my AI tools.</p>
        </div>
        <div className="card p-8 bg-zinc-950 overflow-hidden flex flex-col items-center">
          <div className="w-full max-w-2xl font-mono text-[10px] text-zinc-400">
            <div className="text-center text-zinc-500 mb-6 border border-zinc-800 rounded py-1 px-3">
              Context-Aware Retrieval and Agent Execution Pipeline
            </div>

            <svg viewBox="0 0 800 160" className="w-full h-auto text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AI pipeline: raw models flow through a smart router, prompt builder, Knowledge Hub, and agent planner into an execution sandbox managed by Node Commander">
              {/* Nodes */}
              <rect x="15" y="60" width="85" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="57" y="85" textAnchor="middle" fill="#f4f4f5" fontSize="10">Raw Models</text>

              <rect x="125" y="60" width="85" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="167" y="85" textAnchor="middle" fill="#f4f4f5" fontSize="10">Smart Router</text>

              <rect x="235" y="60" width="95" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="282" y="85" textAnchor="middle" fill="#f4f4f5" fontSize="10">Prompt Builder</text>

              <rect x="355" y="60" width="95" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="402" y="85" textAnchor="middle" fill="#f4f4f5" fontSize="10">Knowledge Hub</text>

              <rect x="475" y="60" width="85" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="517" y="85" textAnchor="middle" fill="#f4f4f5" fontSize="10">Agent Planner</text>

              <rect x="585" y="60" width="85" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900" />
              <text x="627" y="85" textAnchor="middle" fill="#f4f4f5" fontSize="10">Execution Sandbox</text>

              <rect x="695" y="60" width="90" height="40" rx="4" className="stroke-zinc-700 fill-zinc-900 animate-pulse" />
              <text x="740" y="85" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Node Cmdr</text>

              {/* Connectors */}
              <path d="M100 80 H125" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M210 80 H235" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M330 80 H355" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M450 80 H475" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M560 80 H585" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
              <path d="M670 80 H695" className="stroke-zinc-500 flow-line" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* 8. CASE STUDIES (Enterprise / Systems) */}
      <section id="case-studies" className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Engineering Case Studies</h2>
          <p className="mt-2 text-sm text-graphite">Additional project breakdowns detailing deep system integration.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {regularCaseStudies.slice(0, 4).map((p) => (
            <div key={p.slug} className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-graphite font-mono">
                  <span>{p.type}</span>
                  <span>{p.timeline}</span>
                </div>
                <h3 className="mt-3 font-bold text-ink text-sm">{p.title}</h3>
                <p className="mt-2 text-xs text-graphite leading-relaxed">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="badge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <Link href={`/projects/${p.slug}`} className="mt-4 inline-block text-[11px] font-semibold text-ink underline underline-offset-4">
                Read Case Study
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Link href="/projects" className="text-xs font-semibold text-ink underline underline-offset-4">
            View all projects →
          </Link>
        </div>
      </section>

      {/* 9. SKILLS (Categorized) */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="mt-2 text-sm text-graphite">Structured stacks representing my core competencies.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm border-b border-mist pb-2">Frontend</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-graphite">
              <li>Angular</li>
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Design Tokens</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm border-b border-mist pb-2">Backend</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-graphite">
              <li>FastAPI (Python)</li>
              <li>Node.js (TypeScript)</li>
              <li>PostgreSQL</li>
              <li>Redis</li>
              <li>Typesense Search</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm border-b border-mist pb-2">Infrastructure</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-graphite">
              <li>Docker / Docker Compose</li>
              <li>Proxmox VE</li>
              <li>Cloudflare Tunnels</li>
              <li>Linux Node Ops</li>
              <li>CI/CD Workflows</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-ink text-sm border-b border-mist pb-2">AI Stack</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-graphite">
              <li>Agentic Development (build → run → diagnose → fix)</li>
              <li>AI Agents (LangChain, Custom)</li>
              <li>Tool Calling Architectures</li>
              <li>Structured Outputs</li>
              <li>Context Engineering (AST RAG)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. LATEST ARTICLES (hidden until articles.json has real, non-placeholder links) */}
      {articles.length > 0 && (
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Latest Articles</h2>
          <p className="mt-2 text-sm text-graphite">Technical deep-dives published on my engineering blog.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="card p-6 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="mt-3 font-bold text-ink text-sm leading-snug group-hover:underline">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-graphite leading-relaxed">
                  {article.summary}
                </p>
              </div>
              <span className="mt-4 text-[11px] font-semibold text-ink group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Article <span className="font-sans">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>
      )}

      {/* 11. EXPERIENCE TIMELINE */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Experience Timeline</h2>
          <p className="mt-2 text-sm text-graphite">Chronological record of system ownership and delivery.</p>
        </div>
        <div className="card p-8">
          <div className="relative pl-6 border-l-2 border-mist space-y-10">
            {experienceData.timeline.map((entry) => (
              <div key={entry.title} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-stone" />
                <div className="flex items-center justify-between text-xs text-graphite font-mono">
                  <span className="font-bold text-ink text-sm">{entry.title}</span>
                  <span>{entry.period}</span>
                </div>
                <p className="mt-2 text-xs text-graphite leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONTACT SECTION */}
      <section className="card p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Ready to deploy?</h2>
        <p className="mt-3 text-sm text-graphite max-w-md mx-auto">
          Let&apos;s build reliable platforms, context-rich developer tools, and solid AI infrastructure.
        </p>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 max-w-lg">
            <span className="badge">Founding Engineer</span>
            <span className="badge">Senior AI Engineer</span>
            <span className="badge">Platform Engineer</span>
            <span className="badge">Developer Tools</span>
            <span className="badge">Remote</span>
            <span className="badge">Hybrid</span>
            <span className="badge">Contract</span>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${site.email}`} className="btn-brand">
              Work with me
            </a>
            <Button href="/resume" variant="secondary">
              View Resume
            </Button>
            <Link href="/contact" className="btn border border-mist bg-card-bg text-ink hover:bg-mist/35">
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
