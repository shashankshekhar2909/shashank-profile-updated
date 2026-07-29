import { ImageResponse } from "next/og";
import site from "@/content/site.json";

export const runtime = "nodejs";
export const alt = "Shashank Shekhar — AI-Native Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          padding: 80,
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#a1a1aa",
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: 4
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#10b981"
            }}
          />
          buildwithshashank.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 16, fontSize: 44, color: "#a1a1aa" }}>
            {site.title}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#a1a1aa" }}>
          <div style={{ border: "1px solid #1f1f23", borderRadius: 10, padding: "10px 24px" }}>
            Developer Tools
          </div>
          <div style={{ border: "1px solid #1f1f23", borderRadius: 10, padding: "10px 24px" }}>
            AI Systems
          </div>
          <div style={{ border: "1px solid #1f1f23", borderRadius: 10, padding: "10px 24px" }}>
            Self-Hosted Infrastructure
          </div>
        </div>
      </div>
    ),
    size
  );
}
