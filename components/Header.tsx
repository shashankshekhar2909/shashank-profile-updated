import Link from "next/link";
import site from "@/content/site.json";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" }
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-mist bg-stone/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="text-sm font-semibold tracking-wide text-ink">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-accent md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="link-hover">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="badge">Open to EU/Remote</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 pb-3 text-xs text-accent md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="link-hover">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
