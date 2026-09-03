import { ImageResponse } from "next/og";
import site from "@/content/site.json";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const title = post?.title ?? "Blog";
  const summary = post?.summary ?? site.description;
  const tags = post?.tags?.slice(0, 3).join(" · ") ?? "AI Systems · SEO · LinkedIn";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050506 0%, #0f172a 50%, #111827 100%)",
          color: "#f8fafc",
          padding: 72,
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#94a3b8", fontSize: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#10b981" }} />
            buildwithshashank.com/blog
          </div>
          <div style={{ fontSize: 22, border: "1px solid #334155", borderRadius: 9999, padding: "10px 18px" }}>SEO-ready</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 24, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 5 }}>
            {tags}
          </div>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1030 }}>
            {title}
          </div>
          <div style={{ fontSize: 34, color: "#cbd5e1", lineHeight: 1.3, maxWidth: 1000 }}>
            {summary}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#94a3b8", fontSize: 26 }}>
          <div>{site.name}</div>
          <div>{site.title}</div>
        </div>
      </div>
    ),
    size
  );
}
