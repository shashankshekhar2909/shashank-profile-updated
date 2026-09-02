import type { Metadata } from "next";
import site from "@/content/site.json";
import ShowcaseStory from "@/components/ShowcaseStory";

export const metadata: Metadata = {
  title: "Showcase — Cinematic Portfolio Experience",
  description:
    "The scroll-driven, cinematic edition of Shashank Shekhar's portfolio: agentic development, the BuildOS platform, and 8+ years of product engineering.",
  alternates: {
    canonical: "/showcase"
  },
  openGraph: {
    title: "Showcase — Cinematic Portfolio Experience | Shashank Shekhar",
    description:
      "The scroll-driven, cinematic edition of Shashank Shekhar's portfolio: agentic development, the BuildOS platform, and 8+ years of product engineering.",
    url: "/showcase",
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
    title: "Showcase — Cinematic Portfolio Experience | Shashank Shekhar",
    description:
      "The scroll-driven, cinematic edition of Shashank Shekhar's portfolio: agentic development, the BuildOS platform, and 8+ years of product engineering.",
    images: ["/opengraph-image"]
  }
};

export default function ShowcasePage() {
  return <ShowcaseStory metrics={site.metrics} />;
}
