import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string; // ISO, e.g. "2026-06-15"
  displayDate: string; // e.g. "June 2026"
  readTime: string;
  summary: string;
  tags: string[];
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
}

const blogDirectory = path.join(process.cwd(), "content", "blog");

function getBlogFiles() {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".md"));
}

export function getAllPostMeta(): BlogFrontmatter[] {
  const posts = getBlogFiles().map((file) => {
    const fileContents = fs.readFileSync(path.join(blogDirectory, file), "utf8");
    return matter(fileContents).data as BlogFrontmatter;
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostSlugs(): string[] {
  return getBlogFiles().map((file) => file.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const file = getBlogFiles().find((f) => f.replace(/\.md$/, "") === slug);
  if (!file) return undefined;

  const fileContents = fs.readFileSync(path.join(blogDirectory, file), "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);

  return {
    ...(data as BlogFrontmatter),
    content: processed.toString()
  };
}
