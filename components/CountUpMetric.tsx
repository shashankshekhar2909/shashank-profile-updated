"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpMetricProps {
  value: string; // e.g. "7.7M+", "60+", "100+"
  label: string;
}

function parseValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return { target: parseFloat(match[1]), suffix: match[2], decimals: match[1].includes(".") ? 1 : 0 };
}

export default function CountUpMetric({ value, label }: CountUpMetricProps) {
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : value);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!parsed || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${(parsed.target * eased).toFixed(parsed.decimals)}${parsed.suffix}`);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div ref={ref}>
      <div className="text-3xl font-extrabold text-ink md:text-4xl tabular-nums">{display}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-graphite">{label}</div>
    </div>
  );
}
