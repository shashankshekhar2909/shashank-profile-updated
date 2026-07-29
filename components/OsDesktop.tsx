"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Terminal, { type TerminalProject } from "@/components/Terminal";

interface OsDesktopProps {
  projects: TerminalProject[];
  siteName: string;
  siteTitle: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  metrics: { value: string; label: string }[];
}

type AppId = "about" | "projects" | "terminal" | "metrics" | "resume" | "contact";

interface OsWindow {
  appId: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
}

const DEFAULT_W = 640;
const DEFAULT_H = 420;

function playChime() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [523.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.12 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.55);
    });
  } catch {
    // Audio not available or blocked by autoplay policy — boot silently.
  }
}

const APPS: { id: AppId; title: string; icon: string }[] = [
  { id: "about", title: "About", icon: "👤" },
  { id: "projects", title: "Projects", icon: "🗂️" },
  { id: "terminal", title: "Terminal", icon: "🖥️" },
  { id: "metrics", title: "Metrics", icon: "📊" },
  { id: "resume", title: "Resume", icon: "📄" },
  { id: "contact", title: "Contact", icon: "✉️" }
];

const BOOT_LINES = [
  { text: "BuildOS v2.0 — initializing kernel...", style: "text-zinc-500" },
  { text: "✓ Mounted /dev/portfolio", style: "text-emerald-400" },
  { text: "✓ Loaded 10 project modules", style: "text-emerald-400" },
  { text: "✓ SSH fleet connection established", style: "text-emerald-400" },
  { text: "✓ Knowledge graph indexed (OKF)", style: "text-emerald-400" },
  { text: "→ Starting desktop environment...", style: "text-blue-400" }
];

export default function OsDesktop(props: OsDesktopProps) {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<OsWindow[]>([]);
  const [clock, setClock] = useState("");
  const zRef = useRef(10);
  const dragRef = useRef<{ appId: AppId; dx: number; dy: number } | null>(null);
  const resizeRef = useRef<{ appId: AppId; startX: number; startY: number; startW: number; startH: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      setBooted(true);
      if (!reduced) playChime();
    }, reduced ? 0 : 2300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (booted && windows.length === 0) {
      openApp("terminal");
      openApp("about");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  function openApp(appId: AppId) {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      zRef.current += 1;
      if (existing) {
        return prev.map((w) =>
          w.appId === appId ? { ...w, minimized: false, z: zRef.current } : w
        );
      }
      const small = typeof window !== "undefined" && window.innerWidth < 640;
      const offset = small ? prev.length * 14 : prev.length * 28;
      return [
        ...prev,
        {
          appId,
          x: small ? 8 : 60 + offset,
          y: (small ? 44 : 50) + offset,
          w: small ? window.innerWidth - 16 : DEFAULT_W,
          h: small ? Math.min(DEFAULT_H, Math.round(window.innerHeight * 0.5)) : DEFAULT_H,
          z: zRef.current,
          minimized: false
        }
      ];
    });
  }

  function closeApp(appId: AppId) {
    setWindows((prev) => prev.filter((w) => w.appId !== appId));
  }

  function minimizeApp(appId: AppId) {
    setWindows((prev) =>
      prev.map((w) => (w.appId === appId ? { ...w, minimized: true } : w))
    );
  }

  function focusApp(appId: AppId) {
    zRef.current += 1;
    setWindows((prev) =>
      prev.map((w) => (w.appId === appId ? { ...w, z: zRef.current } : w))
    );
  }

  function onTitlePointerDown(e: React.PointerEvent, appId: AppId) {
    const win = windows.find((w) => w.appId === appId);
    if (!win) return;
    focusApp(appId);
    dragRef.current = { appId, dx: e.clientX - win.x, dy: e.clientY - win.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onResizePointerDown(e: React.PointerEvent, appId: AppId) {
    const win = windows.find((w) => w.appId === appId);
    if (!win) return;
    e.stopPropagation();
    focusApp(appId);
    resizeRef.current = {
      appId,
      startX: e.clientX,
      startY: e.clientY,
      startW: win.w,
      startH: win.h
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const drag = dragRef.current;
    const resize = resizeRef.current;
    if (resize) {
      setWindows((prev) =>
        prev.map((w) =>
          w.appId === resize.appId
            ? {
                ...w,
                w: Math.max(340, Math.min(960, resize.startW + (e.clientX - resize.startX))),
                h: Math.max(220, Math.min(window.innerHeight * 0.8, resize.startH + (e.clientY - resize.startY)))
              }
            : w
        )
      );
      return;
    }
    if (!drag) return;
    const bounds = desktopRef.current?.getBoundingClientRect();
    const maxX = (bounds?.width ?? 1200) - 120;
    const maxY = (bounds?.height ?? 800) - 80;
    setWindows((prev) =>
      prev.map((w) =>
        w.appId === drag.appId
          ? {
              ...w,
              x: Math.max(-200, Math.min(maxX, e.clientX - drag.dx)),
              y: Math.max(28, Math.min(maxY, e.clientY - drag.dy))
            }
          : w
      )
    );
  }

  function onPointerUp() {
    dragRef.current = null;
    resizeRef.current = null;
  }

  const activeWindow = [...windows]
    .filter((w) => !w.minimized)
    .sort((a, b) => b.z - a.z)[0];

  function renderApp(appId: AppId) {
    switch (appId) {
      case "about":
        return (
          <div className="space-y-3 text-sm text-zinc-300">
            <div>
              <p className="text-lg font-bold text-zinc-100">{props.siteName}</p>
              <p className="text-emerald-400 text-xs font-semibold">{props.siteTitle}</p>
              <p className="text-zinc-500 text-xs mt-1">{props.location}</p>
            </div>
            <p className="leading-relaxed">
              I build AI agents that build, execute, diagnose, and modify whole
              applications — plus the developer tools and self-hosted
              infrastructure they run on.
            </p>
            <p className="text-xs text-zinc-500">
              8+ years: enterprise search (7.7M+ SKUs), Angular/React systems,
              FastAPI services, Docker fleets.
            </p>
            <Link href="/about" className="inline-block text-xs font-semibold text-emerald-400 hover:underline">
              Full story →
            </Link>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-2">
            {props.projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="block rounded-lg border border-zinc-800 p-3 hover:border-emerald-500/40 hover:bg-zinc-900/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-100">{p.title}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{p.timeline}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed line-clamp-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        );
      case "terminal":
        return (
          <div className="-m-4">
            <Terminal
              projects={props.projects}
              siteName={props.siteName}
              siteTitle={props.siteTitle}
              email={props.email}
              github={props.github}
              linkedin={props.linkedin}
              location={props.location}
              className="border-0 rounded-none shadow-none"
              launchableApps={APPS.map((a) => a.id)}
              onLaunchApp={(app) => {
                const match = APPS.find((a) => a.id === app);
                if (!match) return false;
                openApp(match.id);
                return true;
              }}
            />
          </div>
        );
      case "metrics":
        return (
          <div className="grid grid-cols-2 gap-3">
            {props.metrics.map((m, i) => (
              <div key={m.label} className="rounded-lg border border-zinc-800 p-3">
                <div className="text-xl font-extrabold text-zinc-100">{m.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">{m.label}</div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded bg-zinc-800">
                  <div
                    className="h-full bg-emerald-500/70 pulse-slow"
                    style={{ width: `${55 + ((i * 17) % 40)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case "resume":
        return (
          <div className="space-y-3 text-sm text-zinc-300">
            <p className="font-semibold text-zinc-100">Shashank Shekhar — Resume</p>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>• CrowdAnalytix — Software Engineer II (Product Systems), 2019–Present</li>
              <li>• Freelance Developer, 2017–2019 — 15+ apps delivered</li>
              <li>• MCA (BBAU, Lucknow) · B.Sc. IT (Amity, Lucknow)</li>
              <li>• Angular · React/Next.js · FastAPI · Typesense · Docker · AWS/GCP</li>
            </ul>
            <div className="flex gap-3 pt-1">
              <a
                href="/resume-shashank-shekhar.pdf"
                className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-emerald-950 hover:opacity-90"
              >
                Download PDF
              </a>
              <Link href="/resume" className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800">
                Open full page
              </Link>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-3 text-sm text-zinc-300">
            <p className="leading-relaxed">
              Building AI-integrated products, agentic systems, or
              infrastructure? Let&apos;s talk.
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <p>
                <span className="text-zinc-500">email:</span>{" "}
                <a className="text-emerald-400 hover:underline" href={`mailto:${props.email}`}>{props.email}</a>
              </p>
              <p>
                <span className="text-zinc-500">github:</span>{" "}
                <a className="text-blue-400 hover:underline" href={props.github} target="_blank" rel="noreferrer">{props.github.replace("https://", "")}</a>
              </p>
              <p>
                <span className="text-zinc-500">linkedin:</span>{" "}
                <a className="text-blue-400 hover:underline" href={props.linkedin} target="_blank" rel="noreferrer">{props.linkedin.replace("https://", "")}</a>
              </p>
            </div>
            <a
              href={`mailto:${props.email}`}
              className="inline-block rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-emerald-950 hover:opacity-90"
            >
              Book a call
            </a>
          </div>
        );
    }
  }

  if (!booted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#060608]">
        <div className="w-full max-w-md px-8 font-mono text-xs">
          <p className="mb-6 text-center text-2xl font-bold tracking-tight text-zinc-100">
            ▲ BuildOS
          </p>
          <div className="space-y-1.5">
            {BOOT_LINES.map((line, i) => (
              <p
                key={line.text}
                className={`os-boot-line ${line.style}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {line.text}
              </p>
            ))}
          </div>
          <div className="mt-6 h-1 w-full overflow-hidden rounded bg-zinc-800">
            <div
              className="h-full w-full origin-left bg-emerald-500/80"
              style={{ animation: "os-progress 2.1s linear forwards" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={desktopRef}
      className="os-desktop-in os-wallpaper fixed inset-0 z-[60] overflow-hidden bg-[#060608] font-sans select-none"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Menu bar */}
      <div className="absolute inset-x-0 top-0 z-[200] flex h-8 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-4 text-xs text-zinc-300 backdrop-blur">
        <div className="flex items-center gap-4">
          <span className="font-bold text-zinc-100">▲ BuildOS</span>
          <span className="hidden sm:inline text-zinc-500">
            {activeWindow ? APPS.find((a) => a.id === activeWindow.appId)?.title : "Desktop"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-500 hover:text-zinc-200 transition-colors">
            Exit to classic site
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-zinc-400">{clock}</span>
          </span>
        </div>
      </div>

      {/* Windows */}
      {windows
        .filter((w) => !w.minimized)
        .map((w) => {
          const app = APPS.find((a) => a.id === w.appId)!;
          const isActive = activeWindow?.appId === w.appId;
          return (
            <div
              key={w.appId}
              className={`os-window absolute rounded-xl border bg-zinc-950/95 shadow-2xl backdrop-blur ${
                isActive ? "border-zinc-600" : "border-zinc-800"
              }`}
              style={{ left: w.x, top: w.y, zIndex: w.z, width: `min(${w.w}px, 94vw)` }}
              onPointerDown={() => focusApp(w.appId)}
            >
              <div
                className="flex cursor-grab items-center justify-between rounded-t-xl border-b border-zinc-800 bg-zinc-900/70 px-3 py-2 active:cursor-grabbing"
                onPointerDown={(e) => onTitlePointerDown(e, w.appId)}
              >
                <div className="flex items-center gap-2">
                  <button
                    aria-label={`Close ${app.title}`}
                    onClick={() => closeApp(w.appId)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="h-3 w-3 rounded-full bg-red-500/90 hover:bg-red-400"
                  />
                  <button
                    aria-label={`Minimize ${app.title}`}
                    onClick={() => minimizeApp(w.appId)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="h-3 w-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400"
                  />
                  <span className="h-3 w-3 rounded-full bg-zinc-700" />
                </div>
                <span className="text-xs font-semibold text-zinc-300">
                  {app.icon} {app.title}
                </span>
                <span className="w-14" />
              </div>
              <div className="overflow-y-auto p-4" style={{ height: w.h }}>
                {renderApp(w.appId)}
              </div>
              <div
                aria-hidden="true"
                onPointerDown={(e) => onResizePointerDown(e, w.appId)}
                className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, transparent 55%, #3f3f46 55%, #3f3f46 62%, transparent 62%, transparent 72%, #3f3f46 72%, #3f3f46 79%, transparent 79%)"
                }}
              />
            </div>
          );
        })}

      {/* Dock */}
      <div className="absolute inset-x-0 bottom-4 z-[200] flex justify-center">
        <div className="flex items-end gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 backdrop-blur">
          {APPS.map((app) => {
            const open = windows.some((w) => w.appId === app.id);
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                className="os-dock-icon group relative flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900/80 text-2xl hover:bg-zinc-800"
                aria-label={`Open ${app.title}`}
              >
                {app.icon}
                <span className="pointer-events-none absolute -top-8 rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-200 opacity-0 transition-opacity group-hover:opacity-100">
                  {app.title}
                </span>
                {open && (
                  <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
