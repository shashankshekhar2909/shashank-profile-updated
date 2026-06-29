import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";
import Button from "@/components/Button";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Shashank Shekhar | AI-Native Product Engineer",
  description:
    "Shashank Shekhar is an AI-Native Product Engineer building developer tools, AI systems, self-hosted infrastructure, and production platforms.",
  keywords: [
    "Shashank Shekhar",
    "AI-Native Product Engineer",
    "BuildOS",
    "Node Commander",
    "Knowledge Hub",
    "DevOps",
    "FastAPI",
    "Next.js",
    "Typesense",
    "Frontend Architect"
  ],
  alternates: {
    canonical: "/"
  }
};

export default async function HomePage() {
  const projects = await getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const regularCaseStudies = projects.filter((p) => !p.featured);

  // Hardcoded articles since RSS parser requires external requests
  const articles = [
    {
      title: "Building BuildOS: Reimagining the AI Agent Execution Loop",
      summary: "How we implemented event-driven microservice orchestration and Paramiko SSH streaming to execute code safely across private fleets.",
      date: "June 2026",
      readTime: "8 min read",
      url: "https://blogmanager.buildwithshashank.com"
    },
    {
      title: "Why AST-Parsing Trumps Raw Vector Embeddings for Code RAG",
      summary: "An in-depth look at using Tree-sitter AST queries to build deterministic model context maps rather than relying purely on semantic vector chunking.",
      date: "May 2026",
      readTime: "12 min read",
      url: "https://blogmanager.buildwithshashank.com"
    },
    {
      title: "Zero-Downtime Docker Compose Migrations via Secure Relays",
      summary: "Solving remote volume migration issues without direct host-to-host SSH trust configurations.",
      date: "April 2026",
      readTime: "6 min read",
      url: "https://blogmanager.buildwithshashank.com"
    }
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-32">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-8 md:pt-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-mist px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-graphite bg-card-bg mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Currently building BuildOS
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-6xl md:text-7xl font-sans leading-none">
            AI-Native <br />
            Product Engineer
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-graphite max-w-2xl font-sans">
            I design and build developer tools, AI systems, self-hosted infrastructure, and production software.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#products" variant="primary">
              See Products
            </Button>
            <Button href="#case-studies" variant="secondary">
              Read Case Studies
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
      </section>

      {/* 2. METRICS SECTION */}
      <section className="border-y border-mist py-12 bg-card-bg/30">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 text-center md:text-left">
          <div>
            <div className="text-3xl font-extrabold text-ink md:text-4xl">8+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-graphite">Years</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-ink md:text-4xl">7.7M+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-graphite">Products Indexed</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-ink md:text-4xl">20+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-graphite">Self-Hosted Services</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-ink md:text-4xl">60+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-graphite">Repositories</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-ink md:text-4xl">5+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-graphite">Production Platforms</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-ink md:text-4xl">100+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-graphite">AI Experiments</div>
          </div>
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
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Planning</span>
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
              <div className="p-8 bg-zinc-950/40 border-b lg:border-b-0 lg:border-r border-mist flex flex-col justify-between min-h-[300px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="badge">{product.type}</span>
                    <span className="text-[10px] tracking-wide text-graphite font-mono">{product.timeline}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-ink">{product.title}</h3>
                  <p className="text-sm leading-relaxed text-graphite">{product.summary}</p>
                </div>
                
                {/* CSS Generated Dashboard Layout Mockup */}
                <div className="mt-8 rounded-lg border border-mist bg-zinc-900/60 p-4 font-mono text-[10px] text-zinc-400 select-none shadow-inner">
                  <div className="flex items-center justify-between border-b border-mist pb-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500/80"></span>
                      <span className="h-2 w-2 rounded-full bg-yellow-500/80"></span>
                      <span className="h-2 w-2 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className="text-[9px] text-zinc-500">session: {product.slug}</span>
                  </div>
                  {product.slug === "buildos-agent" && (
                    <div className="space-y-1">
                      <p className="text-zinc-500">{"// Initiating planner execution..."}</p>
                      <p className="text-emerald-400">✓ Loaded repository structure in 12ms</p>
                      <p className="text-emerald-400">✓ Compiled AST schema (Tree-sitter)</p>
                      <p className="text-blue-400">→ Spawning Database Agent to verify migrations</p>
                      <div className="mt-2 h-1.5 w-full bg-zinc-800 rounded overflow-hidden">
                        <div className="h-full w-2/3 bg-zinc-400 pulse-slow"></div>
                      </div>
                    </div>
                  )}
                  {product.slug === "buildos-node-commander" && (
                    <div className="space-y-1">
                      <p className="text-zinc-500">$ node-commander status --fleet</p>
                      <p className="text-emerald-400">● node-01 [SSH connected] - Docker: 18 Containers</p>
                      <p className="text-emerald-400">● node-02 [SSH connected] - Docker: 12 Containers</p>
                      <p className="text-blue-400">→ Syncing database volumes for node migration...</p>
                      <p className="text-zinc-500">[||||||||||||||||||||        ] 72% transferred</p>
                    </div>
                  )}
                  {product.slug === "buildos-knowledge-hub" && (
                    <div className="space-y-1">
                      <p className="text-zinc-500">{"// Indexing changed sources..."}</p>
                      <p className="text-blue-400">→ Scanned 18 modules (Python, TypeScript)</p>
                      <p className="text-emerald-400">✓ Exported OKF schema graph map</p>
                      <p className="text-purple-400">✓ Synchronized 42 vector embeddings to store</p>
                      <p className="text-zinc-500">{"Query semantic search: \"Auth callback flow\""}</p>
                    </div>
                  )}
                </div>
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
                  
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink">Highlights</h4>
                    <ul className="mt-2 grid gap-1.5 text-xs text-graphite">
                      {product.slug === "buildos-agent" && (
                        <>
                          <li className="flex items-center gap-2">✔ High-relevance, AST-based dynamic prompts</li>
                          <li className="flex items-center gap-2">✔ Stateful multi-agent planning queues</li>
                          <li className="flex items-center gap-2">✔ Reusable, file-integrated project context</li>
                        </>
                      )}
                      {product.slug === "buildos-node-commander" && (
                        <>
                          <li className="flex items-center gap-2">✔ 100% agentless server command streaming</li>
                          <li className="flex items-center gap-2">✔ Safe volume migrations across remote nodes</li>
                          <li className="flex items-center gap-2">✔ Browser-integrated terminal shell access</li>
                        </>
                      )}
                      {product.slug === "buildos-knowledge-hub" && (
                        <>
                          <li className="flex items-center gap-2">✔ Tree-sitter code layout parsing</li>
                          <li className="flex items-center gap-2">✔ Unified repository dependency graph</li>
                          <li className="flex items-center gap-2">✔ Semantic and relationship hybrid search</li>
                        </>
                      )}
                    </ul>
                  </div>

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
        <div className="card p-8 bg-zinc-950/60 overflow-hidden flex flex-col items-center">
          <div className="w-full max-w-2xl font-mono text-[10px] text-zinc-400">
            <div className="text-center text-zinc-500 mb-6 border border-zinc-800 rounded py-1 px-3">
              Infrastructure Routing Topology
            </div>
            
            <svg viewBox="0 0 800 220" className="w-full h-auto text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="card p-8 bg-zinc-950/60 overflow-hidden flex flex-col items-center">
          <div className="w-full max-w-2xl font-mono text-[10px] text-zinc-400">
            <div className="text-center text-zinc-500 mb-6 border border-zinc-800 rounded py-1 px-3">
              Context-Aware Retrieval and Agent Execution Pipeline
            </div>

            <svg viewBox="0 0 800 160" className="w-full h-auto text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <li>AI Agents (LangChain, Custom)</li>
              <li>Tool Calling Architectures</li>
              <li>Structured Outputs</li>
              <li>Prompt Engineering</li>
              <li>Context Engineering (AST RAG)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. LATEST ARTICLES */}
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

      {/* 11. EXPERIENCE TIMELINE */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="section-title">Experience Timeline</h2>
          <p className="mt-2 text-sm text-graphite">Chronological record of system ownership and delivery.</p>
        </div>
        <div className="card p-8 bg-zinc-950/20">
          <div className="relative pl-6 border-l-2 border-mist space-y-10">
            {/* 2026 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-stone" />
              <div className="flex items-center justify-between text-xs text-graphite font-mono">
                <span className="font-bold text-ink text-sm">BuildOS & Node Commander</span>
                <span>2025 - 2026</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                Designed and released BuildOS Node Commander agentless infrastructure tool. Integrated Tree-sitter code indexes and multi-agent systems to orchestrate container configurations.
              </p>
            </div>
            
            {/* 2024 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-stone" />
              <div className="flex items-center justify-between text-xs text-graphite font-mono">
                <span className="font-bold text-ink text-sm">AI-Powered Systems & Automation</span>
                <span>2023 - 2024</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                Authored visual workflow editor platforms utilizing NL-to-graph translation pipelines. Built automated microservices backed by FastAPI and PostgreSQL.
              </p>
            </div>

            {/* 2022 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-stone" />
              <div className="flex items-center justify-between text-xs text-graphite font-mono">
                <span className="font-bold text-ink text-sm">Product Discovery & Catalog Platforms</span>
                <span>2021 - 2022</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                Scaled enterprise catalog systems for CrowdAnalytix indexing over 7.7M+ SKUs. Tuned search results, relevance boosting, and facets with Typesense clusters.
              </p>
            </div>

            {/* 2020 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-stone" />
              <div className="flex items-center justify-between text-xs text-graphite font-mono">
                <span className="font-bold text-ink text-sm">Enterprise Governance Systems</span>
                <span>2019 - 2020</span>
              </div>
              <p className="mt-2 text-xs text-graphite leading-relaxed">
                Constructed category classification trees and governed attribute dashboards. Interfaced layout boundaries using reusable component layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CONTACT SECTION */}
      <section className="card p-8 bg-zinc-950/40 text-center">
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
            <Button href={`mailto:${site.email}`} variant="primary">
              Work with me
            </Button>
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
