import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import site from "@/content/site.json";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Article" };

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 pt-8">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-graphite hover:text-ink transition-colors"
        >
          <span className="font-sans">←</span> All articles
        </Link>
      </div>

      <section className="border-b border-mist pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-graphite">
          <span>{post.displayDate}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-graphite">{post.summary}</p>
      </section>

      <section className="prose-content pb-16">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: post.title,
              description: post.summary,
              datePublished: post.date,
              url: `${site.siteUrl}/blog/${post.slug}`,
              keywords: post.tags,
              author: {
                "@type": "Person",
                "@id": `${site.siteUrl}/#person`,
                name: site.name
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${site.siteUrl}/blog` },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `${site.siteUrl}/blog/${post.slug}`
                }
              ]
            }
          ])
        }}
      />
    </div>
  );
}
