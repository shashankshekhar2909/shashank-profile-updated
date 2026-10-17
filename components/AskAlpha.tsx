"use client";

import { useEffect, useId, useRef, useState } from "react";

const ENABLED = process.env.NEXT_PUBLIC_ASK_ALPHA !== "false";
const CHAT_URL =
  process.env.NEXT_PUBLIC_ASK_ALPHA_URL ||
  "https://homelab.buildwithshashank.com/alpha/talk?embed=1&from=portfolio";
const ALPHA_HOME = "https://homelab.buildwithshashank.com/alpha";
// Only show the button when the homelab chat is open and its model is reachable (homelab may be offline).
const HEALTH_URL = `${new URL(CHAT_URL).origin}/api/chat/health`;

export default function AskAlpha() {
  const [open, setOpen] = useState(false);
  // The iframe is mounted on first open and then kept, so closing the panel does not drop the chat.
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [healthy, setHealthy] = useState(false);

  useEffect(() => {
    if (!ENABLED) return;
    let alive = true;
    const check = async () => {
      try {
        const r = await fetch(HEALTH_URL, { cache: "no-store", signal: AbortSignal.timeout(4000) });
        const d = r.ok ? await r.json() : null;
        if (alive) setHealthy(Boolean(d && d.ok));
      } catch {
        if (alive) setHealthy(false);
      }
    };
    check();
    const t = setInterval(check, 120_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      buttonRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Full-screen sheet on small screens: stop the page behind it from scrolling.
  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 640px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep an open panel visible even if a later check fails; only hide the launcher.
  if (!ENABLED || (!healthy && !open)) return null;

  return (
    <div className="print:hidden">
      <section
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label="Ask Alpha"
        hidden={!open}
        className={`fixed inset-0 z-[60] ${open ? "flex" : "hidden"} flex-col overflow-hidden bg-card-bg sm:inset-auto sm:bottom-20 sm:right-5 sm:h-[600px] sm:max-h-[calc(100dvh-6.5rem)] sm:w-[400px] sm:rounded-2xl sm:border sm:border-mist sm:shadow-soft`}
      >
        <div className="flex items-center justify-between border-b border-mist px-4 py-2.5">
          <p className="text-sm font-semibold text-ink">Ask Alpha</p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close Ask Alpha"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-mist text-accent hover:bg-mist/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 bg-[#0f1115]">
          {mounted && (
            <iframe
              src={CHAT_URL}
              title="Ask Alpha, Shashank's local AI assistant"
              loading="lazy"
              className="block h-full w-full border-0"
            />
          )}
        </div>
        <p className="border-t border-mist px-4 py-2 text-xs text-graphite">
          Runs on Shashank&rsquo;s homelab, local model.{" "}
          <a
            href={ALPHA_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
          >
            About Alpha
          </a>
        </p>
      </section>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setMounted(true);
          setOpen((v) => !v);
        }}
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-mist bg-card-bg px-4 text-sm font-semibold text-ink shadow-soft hover:bg-mist/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] motion-reduce:transition-none"
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
        Ask Alpha
      </button>
    </div>
  );
}
