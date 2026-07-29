"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import site from "@/content/site.json";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Showcase", href: "/showcase" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Playground", href: "/playground" },
  { label: "OS", href: "/os" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-mist bg-stone/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="text-sm font-semibold tracking-wide text-ink" onClick={() => setOpen(false)}>
          {site.name}
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-accent md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={clsx("link-hover", isActive(item.href) && "font-semibold text-brand")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-brand !px-3 !py-1.5 !text-[11px]" onClick={() => setOpen(false)}>
            Book a call
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-lg border border-mist md:hidden"
          >
            <span
              className={clsx(
                "h-[1.5px] w-4 bg-ink transition-transform duration-200",
                open && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span className={clsx("h-[1.5px] w-4 bg-ink transition-opacity duration-200", open && "opacity-0")} />
            <span
              className={clsx(
                "h-[1.5px] w-4 bg-ink transition-transform duration-200",
                open && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-mist bg-stone/95 px-6 pb-4 pt-2 backdrop-blur md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={clsx(
                  "rounded-lg px-3 py-2.5 text-sm text-accent hover:bg-mist/30",
                  isActive(item.href) && "font-semibold text-brand"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
