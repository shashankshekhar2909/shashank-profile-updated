import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Agentic Development, AI Systems & Infrastructure",
  description:
    "Technical deep-dives by Shashank Shekhar on agentic development, AI agent architecture, code RAG, Docker infrastructure, and the BuildOS platform.",
  alternates: {
    canonical: "/blog"
  }
};

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Blog</h1>
        <p className="mt-3 text-base leading-relaxed text-graphite max-w-2xl">
          Technical deep-dives from building BuildOS: agentic development, AI
          agent architecture, code retrieval, and self-hosted infrastructure.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card p-6 group"
          >
            <div className="flex justify-between text-[11px] text-graphite font-mono">
              <span>{post.displayDate}</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-ink leading-snug group-hover:underline">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-graphite leading-relaxed">{post.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
