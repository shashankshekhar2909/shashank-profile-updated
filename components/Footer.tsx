import Link from "next/link";
import site from "@/content/site.json";

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-stone px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-xs text-graphite md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-ink font-semibold text-sm">{site.footerLine}</p>
          <p className="mt-1.5">{site.location}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-medium">
          <Link href={site.links.v2} className="link-hover underline underline-offset-4">
            Profile v2 (beta)
          </Link>
          <Link href={site.links.linkedin} className="link-hover">
            LinkedIn
          </Link>
          <Link href={site.links.github} className="link-hover">
            GitHub
          </Link>
          <Link href="/resume" className="link-hover">
            Resume
          </Link>
          <Link href="/contact" className="link-hover">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
