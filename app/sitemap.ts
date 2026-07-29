import type { MetadataRoute } from "next";
import site from "@/content/site.json";
import { getProjectSlugs } from "@/lib/projects";
import { getPostSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/experience", "/showcase", "/projects", "/blog", "/playground", "/os", "/resume", "/contact"];

  const staticEntries = routes.map((route) => ({
    url: `${site.siteUrl}${route}`
  }));

  const projectEntries = getProjectSlugs().map((slug) => ({
    url: `${site.siteUrl}/projects/${slug}`
  }));

  const blogEntries = getPostSlugs().map((slug) => ({
    url: `${site.siteUrl}/blog/${slug}`
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
