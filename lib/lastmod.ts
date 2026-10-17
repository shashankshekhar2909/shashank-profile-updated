import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Last-modified date for a source file: last git commit date, else file mtime, else now (build date).
 * Paths are relative to the project root.
 */
export function sourceLastModified(relativePath: string): Date {
  const full = path.join(process.cwd(), relativePath);
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", relativePath], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();
    if (out) {
      const d = new Date(out);
      if (!Number.isNaN(d.getTime())) return d;
    }
  } catch {
    // git unavailable (for example inside a container build): fall through
  }
  try {
    return fs.statSync(full).mtime;
  } catch {
    return new Date();
  }
}
