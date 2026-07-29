import type { MetadataRoute } from "next";
import site from "@/content/site.json";
import { getProjectSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/experience", "/projects", "/resume", "/contact"];

  const staticEntries = routes.map((route) => ({
    url: `${site.siteUrl}${route}`
  }));

  const projectEntries = getProjectSlugs().map((slug) => ({
    url: `${site.siteUrl}/projects/${slug}`
  }));

  return [...staticEntries, ...projectEntries];
}
