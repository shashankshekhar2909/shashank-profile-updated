"use client";

import { useEffect, useRef, useState } from "react";
import graphData from "@/content/playground-graph.json";

type NodeType = "application" | "service" | "datastore" | "concept";

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  info: string;
}

interface SimNode extends GraphNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  px: number; // projected
  py: number;
  pr: number; // projected radius
  depth: number;
}

const TYPE_STYLES: Record<NodeType, { dark: string; light: string; shape: "circle" | "diamond" | "square" | "triangle"; label: string }> = {
  application: { dark: "#34d399", light: "#059669", shape: "circle", label: "Application" },
  service: { dark: "#60a5fa", light: "#2563eb", shape: "diamond", label: "Service" },
  datastore: { dark: "#fbbf24", light: "#b45309", shape: "square", label: "Datastore" },
  concept: { dark: "#c084fc", light: "#7e22ce", shape: "triangle", label: "Concept" }
};

const BASE_RADIUS: Record<NodeType, number> = {
  application: 11,
  service: 8,
  datastore: 8,
  concept: 10
};

export default function OkfGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  selectedRef.current = selected;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDark = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const nodes: SimNode[] = graphData.nodes.map((n, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / graphData.nodes.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 150;
      return {
        ...(n as GraphNode),
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: 0,
        vy: 0,
        vz: 0,
        px: 0,
        py: 0,
        pr: 0,
        depth: 0
      };
    });
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const links = graphData.links
      .map((l) => ({ a: byId.get(l.source), b: byId.get(l.target) }))
      .filter((l): l is { a: SimNode; b: SimNode } => Boolean(l.a && l.b));
    const neighbors = new Map<string, Set<string>>();
    links.forEach(({ a, b }) => {
      if (!neighbors.has(a.id)) neighbors.set(a.id, new Set());
      if (!neighbors.has(b.id)) neighbors.set(b.id, new Set());
      neighbors.get(a.id)!.add(b.id);
      neighbors.get(b.id)!.add(a.id);
    });

    function simTick(strength: number) {
      // link springs
      for (const { a, b } of links) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dz = b.z - a.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
        const force = ((dist - 95) / dist) * 0.02 * strength;
        a.vx += dx * force;
        a.vy += dy * force;
        a.vz += dz * force;
        b.vx -= dx * force;
        b.vy -= dy * force;
        b.vz -= dz * force;
      }
      // repulsion + centering
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dz = b.z - a.z;
          const d2 = dx * dx + dy * dy + dz * dz + 0.01;
          const force = (1600 / d2) * strength;
          const d = Math.sqrt(d2);
          a.vx -= (dx / d) * force;
          a.vy -= (dy / d) * force;
          a.vz -= (dz / d) * force;
          b.vx += (dx / d) * force;
          b.vy += (dy / d) * force;
          b.vz += (dz / d) * force;
        }
        a.vx -= a.x * 0.001 * strength;
        a.vy -= a.y * 0.001 * strength;
        a.vz -= a.z * 0.001 * strength;
      }
      for (const n of nodes) {
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.vz *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
      }
    }
    for (let i = 0; i < 300; i++) simTick(1);

    let rotY = 0.4;
    let rotX = 0.25;
    let zoom = 1;
    let autoRotate = !reducedMotion;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;

    function resize() {
      if (!canvas || !wrap) return;
      const dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth;
      const h = Math.min(560, Math.max(380, w * 0.62));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    function project() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      for (const n of nodes) {
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;
        const f = (520 / (520 + z2)) * zoom;
        n.px = w / 2 + x1 * f;
        n.py = h / 2 + y2 * f;
        n.pr = BASE_RADIUS[n.type] * f;
        n.depth = z2;
      }
    }

    function drawShape(x: number, y: number, r: number, shape: string) {
      if (!ctx) return;
      ctx.beginPath();
      if (shape === "circle") {
        ctx.arc(x, y, r, 0, Math.PI * 2);
      } else if (shape === "square") {
        ctx.rect(x - r * 0.9, y - r * 0.9, r * 1.8, r * 1.8);
      } else if (shape === "diamond") {
        ctx.moveTo(x, y - r * 1.15);
        ctx.lineTo(x + r * 1.15, y);
        ctx.lineTo(x, y + r * 1.15);
        ctx.lineTo(x - r * 1.15, y);
        ctx.closePath();
      } else {
        ctx.moveTo(x, y - r * 1.2);
        ctx.lineTo(x + r * 1.1, y + r * 0.85);
        ctx.lineTo(x - r * 1.1, y + r * 0.85);
        ctx.closePath();
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      const sel = selectedRef.current;
      const selNeighbors = sel ? neighbors.get(sel) : null;

      const linkBase = dark ? "148, 163, 184" : "71, 85, 105";
      for (const { a, b } of links) {
        const active = sel && (a.id === sel || b.id === sel);
        const dimmed = sel && !active;
        const depthAlpha = Math.max(0.12, 0.55 - ((a.depth + b.depth) / 2 + 200) / 900);
        ctx.strokeStyle = active
          ? dark ? "rgba(52, 211, 153, 0.9)" : "rgba(5, 150, 105, 0.9)"
          : `rgba(${linkBase}, ${dimmed ? 0.06 : depthAlpha})`;
        ctx.lineWidth = active ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      }

      const sorted = [...nodes].sort((a, b) => b.depth - a.depth);
      for (const n of sorted) {
        const style = TYPE_STYLES[n.type];
        const color = dark ? style.dark : style.light;
        const isSel = n.id === sel;
        const isNeighbor = selNeighbors?.has(n.id);
        const dimmed = sel && !isSel && !isNeighbor;
        const depthAlpha = Math.max(0.35, 1 - (n.depth + 200) / 620);
        ctx.globalAlpha = dimmed ? 0.15 : depthAlpha;
        ctx.fillStyle = color;
        drawShape(n.px, n.py, n.pr, style.shape);
        ctx.fill();
        if (isSel || isNeighbor) {
          ctx.globalAlpha = 1;
          ctx.strokeStyle = dark ? "#f4f4f5" : "#09090b";
          ctx.lineWidth = 1.5;
          drawShape(n.px, n.py, n.pr + 2, style.shape);
          ctx.stroke();
        }
        const showLabel =
          isSel || isNeighbor || (!sel && (n.type === "application" || n.type === "concept"));
        if (showLabel && !dimmed) {
          ctx.globalAlpha = Math.max(0.6, depthAlpha);
          ctx.fillStyle = dark ? "#e4e4e7" : "#18181b";
          ctx.font = "11px ui-monospace, monospace";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.px, n.py - n.pr - 7);
        }
        ctx.globalAlpha = 1;
      }
    }

    function frame() {
      if (autoRotate && !dragging) rotY += 0.0028;
      simTick(0.25);
      project();
      draw();
      raf = requestAnimationFrame(frame);
    }
    if (reducedMotion) {
      project();
      draw();
    } else {
      raf = requestAnimationFrame(frame);
    }

    function hitTest(mx: number, my: number): SimNode | null {
      let best: SimNode | null = null;
      for (const n of nodes) {
        const d = Math.hypot(n.px - mx, n.py - my);
        if (d < n.pr + 6 && (!best || n.depth < best.depth)) best = n;
      }
      return best;
    }

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (dragging) {
        rotY += (e.clientX - lastX) * 0.005;
        rotX += (e.clientY - lastY) * 0.005;
        rotX = Math.max(-1.4, Math.min(1.4, rotX));
        lastX = e.clientX;
        lastY = e.clientY;
        if (reducedMotion) {
          project();
          draw();
        }
      } else {
        const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
        setHovered(hit ? { id: hit.id, label: hit.label, type: hit.type, info: hit.info } : null);
        canvas.style.cursor = hit ? "pointer" : "grab";
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      const rect = canvas.getBoundingClientRect();
      const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) {
        setSelected((prev) => (prev === hit.id ? null : hit.id));
        if (reducedMotion) {
          project();
          draw();
        }
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom = Math.max(0.5, Math.min(2.2, zoom * (e.deltaY > 0 ? 0.94 : 1.06)));
      if (reducedMotion) {
        project();
        draw();
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div ref={wrapRef} className="relative card overflow-hidden bg-card-bg">
        <canvas ref={canvasRef} aria-label="Interactive 3D knowledge graph of the BuildOS platform architecture" role="img" />
        {hovered && (
          <div className="pointer-events-none absolute left-4 top-4 max-w-xs rounded-lg border border-mist bg-card-bg/95 p-3 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-ink">{hovered.label}</span>
              <span className="badge">{TYPE_STYLES[hovered.type].label}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-graphite">{hovered.info}</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-graphite">
        <div className="flex flex-wrap gap-4">
          {Object.entries(TYPE_STYLES).map(([type, style]) => (
            <span key={type} className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                {style.shape === "circle" && <circle cx="6" cy="6" r="5" fill={style.dark} />}
                {style.shape === "square" && <rect x="1" y="1" width="10" height="10" fill={style.dark} />}
                {style.shape === "diamond" && <path d="M6 0 L12 6 L6 12 L0 6 Z" fill={style.dark} />}
                {style.shape === "triangle" && <path d="M6 0.5 L11.5 11 L0.5 11 Z" fill={style.dark} />}
              </svg>
              {style.label}
            </span>
          ))}
        </div>
        <span className="font-mono">drag to rotate · scroll to zoom · click a node to focus</span>
      </div>
    </div>
  );
}
