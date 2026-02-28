import Link from "next/link";
import clsx from "clsx";

interface TagFilterProps {
  tags: string[];
  activeTag?: string;
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/projects"
        className={clsx(
          "badge",
          !activeTag && "border-ink text-ink"
        )}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/projects?tag=${encodeURIComponent(tag)}`}
          className={clsx(
            "badge",
            activeTag === tag && "border-ink text-ink"
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
