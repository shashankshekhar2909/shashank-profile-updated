import { ImageResponse } from "next/og";
import { getAllProjectMeta } from "@/lib/projects";

export const runtime = "nodejs";
export const alt = "Case study by Shashank Shekhar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ProjectOgImage({ params }: { params: { slug: string } }) {
  const project = getAllProjectMeta().find((p) => p.slug === params.slug);
  const title = project?.title ?? "Case Study";
  const summary = project?.summary ?? "";
  const stack = project?.stack.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060608",
          color: "#f4f4f5",
          padding: 72,
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#a1a1aa",
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: 4
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#10b981" }} />
          Case Study — Shashank Shekhar
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1 }}>
            {title}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 1000
            }}
          >
            {summary.length > 140 ? `${summary.slice(0, 140)}…` : summary}
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#a1a1aa" }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{ border: "1px solid #1f1f23", borderRadius: 8, padding: "8px 18px" }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
