"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CountUpMetric from "@/components/CountUpMetric";

interface ShowcaseStoryProps {
  metrics: { value: string; label: string }[];
}

const STATEMENT =
  "I am a product engineer with 8+ years across Angular, React, and FastAPI. Today I build AI agents that build whole applications, execute them on real infrastructure, diagnose what breaks, and ship the fix.";

const PRODUCTS = [
  {
    index: "01",
    name: "Knowledge Hub",
    tag: "Understand",
    copy: "Tree-sitter parses every repository into a structural knowledge graph — classes, APIs, schemas, dependencies. Agents navigate architecture, not text chunks.",
    href: "/projects/buildos-knowledge-hub",
    lines: [
      { text: "// Indexing changed sources...", cls: "text-zinc-500" },
      { text: "→ Scanned 18 modules (Python, TypeScript)", cls: "text-blue-400" },
      { text: "✓ Exported OKF schema graph map", cls: "text-emerald-400" },
      { text: "✓ Synchronized 42 vector embeddings", cls: "text-purple-400" }
    ]
  },
  {
    index: "02",
    name: "BuildOS Agent",
    tag: "Plan",
    copy: "Feature requests become stateful planning queues. Specialized agents — database, API, UI — execute sequentially with deterministic context and a circuit breaker watching every loop.",
    href: "/projects/buildos-agent",
    lines: [
      { text: "// Initiating planner execution...", cls: "text-zinc-500" },
      { text: "✓ Loaded repository structure in 12ms", cls: "text-emerald-400" },
      { text: "✓ Compiled AST schema (Tree-sitter)", cls: "text-emerald-400" },
      { text: "→ Spawning Database Agent for migrations", cls: "text-blue-400" }
    ]
  },
  {
    index: "03",
    name: "Node Commander",
    tag: "Execute",
    copy: "Agentless SSH control of the whole Docker fleet. Deployments, live metrics, browser terminals, and near-zero-downtime migrations — no daemons installed anywhere.",
    href: "/projects/buildos-node-commander",
    lines: [
      { text: "$ node-commander status --fleet", cls: "text-zinc-500" },
      { text: "● node-01 [SSH connected] - 18 containers", cls: "text-emerald-400" },
      { text: "● node-02 [SSH connected] - 12 containers", cls: "text-emerald-400" },
      { text: "→ Syncing volumes for migration... 72%", cls: "text-blue-400" }
    ]
  }
];

const LOOP_STEPS = [
  { name: "Build", copy: "Agents generate real applications against structural context, not guesses." },
  { name: "Execute", copy: "Code runs on actual infrastructure over SSH — sandboxed, streamed, observed." },
  { name: "Diagnose", copy: "Failures are read, not ignored: logs, states, and exit codes feed back in." },
  { name: "Modify", copy: "Fixes ship in a closed loop, with validation gates and human review where it matters." }
];

function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return setProgress(1);
        setProgress(Math.max(0, Math.min(1, -rect.top / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return progress;
}

export default function ShowcaseStory({ metrics }: ShowcaseStoryProps) {
  const [reduced, setReduced] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLElement>(null);
  const [heroFade, setHeroFade] = useState(0);

  const statementProgress = useScrollProgress(statementRef);
  const productsProgress = useScrollProgress(productsRef);
  const loopProgress = useScrollProgress(loopRef);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setHeroFade(Math.min(1, window.scrollY / (window.innerHeight * 0.7)))
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = STATEMENT.split(" ");
  const activeProduct = reduced
    ? -1
    : Math.min(PRODUCTS.length - 1, Math.floor(productsProgress * PRODUCTS.length));
  const activeStep = reduced
    ? -1
    : Math.min(LOOP_STEPS.length - 1, Math.floor(loopProgress * LOOP_STEPS.length));

  return (
    <div className="-mx-6 -mt-28 -mb-24 sm:-mx-10 bg-[#060608] text-zinc-100">
      {/* 1. HERO */}
      <section className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div
          ref={heroRef}
          className="relative text-center"
          style={
            reduced
              ? undefined
              : { opacity: 1 - heroFade, transform: `scale(${1 - heroFade * 0.08}) translateY(${heroFade * -30}px)` }
          }
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            AI-Native Product Engineer
          </p>
          <h1 className="mt-6 text-6xl font-extrabold tracking-tighter sm:text-8xl">
            Shashank
            <br />
            Shekhar<span className="text-emerald-400">.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-zinc-400 sm:text-2xl">
            I make AI agents build, execute, diagnose, and modify whole applications.
          </p>
        </div>
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <span className="block h-8 w-px animate-pulse bg-zinc-600" />
        </div>
      </section>

      {/* 2. STATEMENT — word-by-word reveal */}
      <section ref={statementRef} className={reduced ? "px-6 py-32" : "relative h-[220vh]"}>
        <div className={reduced ? "" : "sticky top-0 flex h-screen items-center"}>
          <p className="mx-auto max-w-4xl px-6 text-3xl font-bold leading-snug tracking-tight sm:text-5xl sm:leading-tight">
            {words.map((word, i) => {
              const threshold = i / words.length;
              const on = reduced || statementProgress > threshold * 0.9;
              return (
                <span
                  key={i}
                  className="transition-opacity duration-200"
                  style={{ opacity: on ? 1 : 0.12 }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      {/* 3. PRODUCT TRIO — sticky crossfade */}
      <section ref={productsRef} className={reduced ? "px-6 pb-32" : "relative h-[320vh]"}>
        <div className={reduced ? "flex flex-col gap-24" : "sticky top-0 flex h-screen items-center overflow-hidden"}>
          {PRODUCTS.map((product, i) => {
            const visible = reduced || i === activeProduct;
            return (
              <div
                key={product.name}
                className={
                  reduced
                    ? "mx-auto w-full max-w-5xl"
                    : "absolute inset-0 flex items-center justify-center px-6 transition-all duration-500"
                }
                style={
                  reduced
                    ? undefined
                    : {
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : i < activeProduct ? "translateY(-40px)" : "translateY(40px)",
                        pointerEvents: visible ? "auto" : "none"
                      }
                }
              >
                <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
                  <div>
                    <p className="font-mono text-sm text-zinc-600">{product.index}</p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
                      {product.tag}
                    </p>
                    <h2 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
                      {product.name}
                    </h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
                      {product.copy}
                    </p>
                    <Link
                      href={product.href}
                      className="mt-8 inline-block text-sm font-semibold text-emerald-400 hover:underline"
                    >
                      Read the case study →
                    </Link>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs shadow-2xl">
                    <div className="mb-3 flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                      <span className="h-2 w-2 rounded-full bg-red-500/80" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                      <span className="h-2 w-2 rounded-full bg-green-500/80" />
                    </div>
                    <div className="space-y-1.5">
                      {product.lines.map((line) => (
                        <p key={line.text} className={line.cls}>
                          {line.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. METRICS */}
      <section className="border-y border-zinc-800/60 px-6 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 text-center md:grid-cols-6 md:text-left">
          {metrics.map((m) => (
            <CountUpMetric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </section>

      {/* 5. THE LOOP */}
      <section ref={loopRef} className={reduced ? "px-6 py-32" : "relative h-[260vh]"}>
        <div className={reduced ? "" : "sticky top-0 flex h-screen items-center"}>
          <div className="mx-auto w-full max-w-4xl px-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">The loop</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Build. Execute. Diagnose. Modify.
            </h2>
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {LOOP_STEPS.map((step, i) => {
                const on = reduced || i <= activeStep;
                return (
                  <div
                    key={step.name}
                    className="border-l-2 pl-5 transition-all duration-500"
                    style={{
                      borderColor: on ? "#10b981" : "#27272a",
                      opacity: on ? 1 : 0.3
                    }}
                  >
                    <p className="text-xl font-bold">{step.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          Your product could feel like this.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          This page and the minimal site carry the same information — two
          experiences, one engineer. Whether your product needs quiet clarity or
          cinematic polish, I build both.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-brand !px-6 !py-3 !text-sm">
            Book a call
          </Link>
          <Link href="/" className="btn border border-zinc-700 bg-zinc-900 !px-6 !py-3 !text-sm text-zinc-100 hover:bg-zinc-800">
            See the minimal version
          </Link>
          <Link href="/os" className="btn border border-zinc-700 bg-zinc-900 !px-6 !py-3 !text-sm text-zinc-100 hover:bg-zinc-800">
            Boot the desktop
          </Link>
        </div>
      </section>
    </div>
  );
}
