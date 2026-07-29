import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface MockupLine {
  text: string;
  style: "muted" | "ok" | "info" | "accent";
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  type: string;
  tags: string[];
  timeline: string;
  stack: string[];
  featured: boolean;
  links?: { label: string; url: string }[];
  summary: string;
  problem?: string;
  outcome?: string;
  highlights?: string[];
  mockup?: MockupLine[];
  stats?: { value: string; label: string }[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function getProjectFiles() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function sortProjects<T extends ProjectFrontmatter>(projects: T[]): T[] {
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
}

export function getAllProjectMeta(): ProjectFrontmatter[] {
  const projects = getProjectFiles().map((file) => {
    const fileContents = fs.readFileSync(path.join(projectsDirectory, file), "utf8");
    return matter(fileContents).data as ProjectFrontmatter;
  });

  return sortProjects(projects);
}

export async function getAllProjects(): Promise<Project[]> {
  const files = getProjectFiles();

  const projects = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const processed = await remark().use(html).process(content);

      return {
        ...(data as ProjectFrontmatter),
        content: processed.toString()
      };
    })
  );

  return sortProjects(projects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const file = getProjectFiles().find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return undefined;

  const fileContents = fs.readFileSync(path.join(projectsDirectory, file), "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);

  return {
    ...(data as ProjectFrontmatter),
    content: processed.toString()
  };
}

export function getProjectSlugs(): string[] {
  const files = getProjectFiles();
  return files.map((file) => file.replace(/\.mdx?$/, ""));
}

export async function getAllTags(): Promise<string[]> {
  const projects = await getAllProjects();
  const tags = new Set(projects.flatMap((project) => project.tags));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
