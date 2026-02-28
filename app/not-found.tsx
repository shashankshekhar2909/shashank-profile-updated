import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="text-sm text-graphite">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
