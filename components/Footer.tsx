import Link from "next/link";
import site from "@/content/site.json";

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-white px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-accent md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-ink font-medium">{site.footerLine}</p>
          <p className="mt-1">{site.location}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
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
