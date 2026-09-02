import type { MetadataRoute } from "next";
import site from "@/content/site.json";
import { getProjectSlugs } from "@/lib/projects";
import { getAllPostMeta } from "@/lib/blog";

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/showcase", changeFrequency: "monthly", priority: 0.6 },
  { path: "/playground", changeFrequency: "monthly", priority: 0.5 },
  { path: "/os", changeFrequency: "monthly", priority: 0.5 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map(({ path: routePath, changeFrequency, priority }) => ({
    url: `${site.siteUrl}${routePath}`,
    changeFrequency,
    priority
  }));

  const projectEntries = getProjectSlugs().map((slug) => ({
    url: `${site.siteUrl}/projects/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const blogEntries = getAllPostMeta().map((post) => ({
    url: `${site.siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
