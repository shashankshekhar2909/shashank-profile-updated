import type { Metadata } from "next";
import site from "@/content/site.json";
import ShowcaseStory from "@/components/ShowcaseStory";

export const metadata: Metadata = {
  title: "Showcase — Cinematic Portfolio Experience",
  description:
    "The scroll-driven, cinematic edition of Shashank Shekhar's portfolio: agentic development, the BuildOS platform, and 8+ years of product engineering — same story, immersive experience.",
  alternates: {
    canonical: "/showcase"
  }
};

export default function ShowcasePage() {
  return <ShowcaseStory metrics={site.metrics} />;
}
