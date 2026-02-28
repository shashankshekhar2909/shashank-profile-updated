import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ href, variant = "primary", children }: ButtonProps) {
  return (
    <Link href={href} className={clsx(variant === "primary" ? "btn-primary" : "btn-secondary")}>
      {children}
    </Link>
  );
}
