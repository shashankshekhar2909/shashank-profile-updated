"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export interface TerminalProject {
  slug: string;
  title: string;
  type: string;
  timeline: string;
  summary: string;
  stack: string[];
}

interface TerminalProps {
  projects: TerminalProject[];
  siteName: string;
  siteTitle: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  /** Auto-types demo commands until the visitor interacts. */
  autoDemo?: boolean;
  className?: string;
  /** BuildOS Desktop only: launch an OS app window. Returns false if the app id is unknown. */
  onLaunchApp?: (app: string) => boolean;
  /** App ids offered for `launch` tab completion. */
  launchableApps?: string[];
}

interface OutputLine {
  text: string;
  style?: "muted" | "ok" | "info" | "accent" | "error" | "ink";
}

const lineStyles: Record<string, string> = {
  muted: "text-zinc-500",
  ok: "text-emerald-400",
  info: "text-blue-400",
  accent: "text-purple-400",
  error: "text-red-400",
  ink: "text-zinc-100"
};

const COMMANDS = [
  "help",
  "whoami",
  "neofetch",
  "projects",
  "open",
  "cat",
  "stack",
  "contact",
  "resume",
  "clear"
];

export default function Terminal({
  projects,
  siteName,
  siteTitle,
  email,
  github,
  linkedin,
  location,
  autoDemo = false,
  className,
  onLaunchApp,
  launchableApps = []
}: TerminalProps) {
  const router = useRouter();
  const demoStopped = useRef(!autoDemo);
  const [lines, setLines] = useState<OutputLine[]>([
    { text: `${siteName} — portfolio shell v1.0`, style: "ink" },
    { text: "Type 'help' to list commands. Tab completes, arrows recall history.", style: "muted" }
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (next: OutputLine[]) => setLines((prev) => [...prev, ...next]);

  const run = (raw: string) => {
    const cmdLine = raw.trim();
    print([{ text: `visitor@buildwithshashank:~$ ${cmdLine}`, style: "muted" }]);
    if (!cmdLine) return;

    const [cmd, ...args] = cmdLine.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd) {
      case "help":
        print([
          { text: "Available commands:", style: "ink" },
          { text: "  help                 this list" },
          { text: "  whoami               who runs this place" },
          { text: "  neofetch             system card" },
          { text: "  projects             list all projects" },
          { text: "  open <slug>          jump to a case study" },
          { text: "  cat <slug>           project summary inline" },
          { text: "  stack                technologies in production" },
          { text: "  contact              email and socials" },
          { text: "  resume               open resume page" },
          { text: "  clear                wipe the screen" },
          ...(onLaunchApp
            ? [{ text: "  launch <app>         open a desktop app window", style: "accent" as const }]
            : [])
        ]);
        break;

      case "launch": {
        if (!onLaunchApp) {
          print([{ text: "launch: only available inside BuildOS Desktop — boot it at /os", style: "error" }]);
          break;
        }
        if (!arg) {
          print([{ text: `usage: launch <${launchableApps.join("|")}>`, style: "error" }]);
          break;
        }
        if (onLaunchApp(arg)) {
          print([{ text: `Launching ${arg}...`, style: "ok" }]);
        } else {
          print([{ text: `launch: no such app: ${arg} — try <${launchableApps.join("|")}>`, style: "error" }]);
        }
        break;
      }

      case "whoami":
        print([
          { text: siteName, style: "ink" },
          { text: siteTitle, style: "accent" },
          { text: location, style: "muted" },
          { text: "Builds AI agents that build, execute, diagnose, and modify whole apps." },
          { text: "Also: developer tools, AI systems, self-hosted infrastructure." }
        ]);
        break;

      case "neofetch": {
        const featured = projects.filter((p) => ["buildos-agent", "buildos-node-commander", "buildos-knowledge-hub"].includes(p.slug));
        print([
          { text: "        ▄▄▄▄▄▄        ", style: "accent" },
          { text: "      ▄█  ██  █▄      " + `  ${siteName.toLowerCase().replace(" ", "@")}`, style: "accent" },
          { text: "      ██  ██  ██      " + "  ------------------", style: "accent" },
          { text: "      ██  ▀▀  ██      " + `  Role: ${siteTitle}`, style: "accent" },
          { text: "      ▀█▄▄▄▄▄▄█▀      " + `  OS: BuildOS (self-hosted)`, style: "accent" },
          { text: "                      " + `  Uptime: 8+ years in production`, style: "accent" },
          { text: "                      " + `  Packages: ${projects.length} shipped projects`, style: "accent" },
          ...featured.map((p) => ({
            text: `                        Active: ${p.title}`,
            style: "ok" as const
          }))
        ]);
        break;
      }

      case "projects":
        print([
          { text: `${projects.length} projects indexed. 'open <slug>' for full case study.`, style: "muted" },
          ...projects.map((p) => ({
            text: `  ${p.slug.padEnd(32)} ${p.type} · ${p.timeline}`,
            style: "ink" as const
          }))
        ]);
        break;

      case "open": {
        if (!arg) {
          print([{ text: "usage: open <slug> — try 'projects' to list slugs", style: "error" }]);
          break;
        }
        const project = projects.find((p) => p.slug === arg);
        if (!project) {
          print([{ text: `open: no such project: ${arg}`, style: "error" }]);
          break;
        }
        print([{ text: `Opening ${project.title}...`, style: "ok" }]);
        router.push(`/projects/${project.slug}`);
        break;
      }

      case "cat": {
        const project = projects.find((p) => p.slug === arg);
        if (!project) {
          print([{ text: `cat: ${arg || "<slug>"}: no such project`, style: "error" }]);
          break;
        }
        print([
          { text: project.title, style: "ink" },
          { text: `${project.type} · ${project.timeline}`, style: "muted" },
          { text: project.summary },
          { text: `stack: ${project.stack.join(", ")}`, style: "info" }
        ]);
        break;
      }

      case "stack": {
        const all = Array.from(new Set(projects.flatMap((p) => p.stack))).sort();
        print([
          { text: `${all.length} technologies across ${projects.length} projects:`, style: "muted" },
          { text: all.join(" · "), style: "ink" }
        ]);
        break;
      }

      case "contact":
        print([
          { text: `email:    ${email}`, style: "ink" },
          { text: `github:   ${github}`, style: "info" },
          { text: `linkedin: ${linkedin}`, style: "info" },
          { text: "Or just type 'resume'.", style: "muted" }
        ]);
        break;

      case "resume":
        print([{ text: "Opening resume...", style: "ok" }]);
        router.push("/resume");
        break;

      case "clear":
        setLines([]);
        break;

      case "sudo":
        print([{ text: "visitor is not in the sudoers file. This incident will be reported.", style: "error" }]);
        break;

      default:
        print([{ text: `${cmd}: command not found — try 'help'`, style: "error" }]);
    }
  };

  const runRef = useRef(run);
  runRef.current = run;

  useEffect(() => {
    if (!autoDemo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) =>
      timers.push(
        window.setTimeout(() => {
          if (!cancelled && !demoStopped.current) fn();
        }, ms)
      );

    const typeCmd = (cmd: string, onDone?: () => void) => {
      for (let i = 1; i <= cmd.length; i++) {
        later(() => setInput(cmd.slice(0, i)), i * 60);
      }
      later(() => {
        setInput("");
        runRef.current(cmd);
        onDone?.();
      }, cmd.length * 60 + 400);
    };

    later(() => typeCmd("neofetch", () => later(() => typeCmd("help"), 2200)), 1000);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDemo]);

  const stopDemo = () => {
    if (!demoStopped.current) {
      demoStopped.current = true;
      setInput("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = input;
      setInput("");
      setHistoryIndex(-1);
      if (value.trim()) setHistory((prev) => [value, ...prev]);
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next < 0 ? -1 : next);
      setInput(next < 0 ? "" : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const commandList = onLaunchApp ? [...COMMANDS, "launch"] : COMMANDS;
      if (parts.length <= 1) {
        const match = commandList.find((c) => c.startsWith(parts[0] ?? ""));
        if (match) setInput(match + " ");
      } else if (["open", "cat"].includes(parts[0])) {
        const partial = parts[parts.length - 1];
        const match = projects.find((p) => p.slug.startsWith(partial));
        if (match) setInput(`${parts[0]} ${match.slug}`);
      } else if (parts[0] === "launch") {
        const partial = parts[parts.length - 1];
        const match = launchableApps.find((a) => a.startsWith(partial));
        if (match) setInput(`launch ${match}`);
      }
    }
  };

  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-950 shadow-soft overflow-hidden font-mono text-xs ${className ?? ""}`}
      onClick={() => {
        stopDemo();
        inputRef.current?.focus();
      }}
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 bg-zinc-900/60">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
        </div>
        <span className="text-[10px] text-zinc-500">visitor@buildwithshashank — zsh</span>
      </div>
      <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-3 space-y-0.5" role="log" aria-live="polite">
        {lines.map((line, i) => (
          <p key={i} className={`whitespace-pre-wrap leading-5 ${lineStyles[line.style ?? ""] ?? "text-zinc-400"}`}>
            {line.text}
          </p>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 shrink-0">visitor@buildwithshashank:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              stopDemo();
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              stopDemo();
              onKeyDown(e);
            }}
            className="w-full bg-transparent text-zinc-100 outline-none caret-emerald-400"
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
