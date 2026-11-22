import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        stone: "var(--color-stone)",
        mist: "var(--color-mist)",
        graphite: "var(--color-graphite)",
        accent: "var(--color-accent)",
        "card-bg": "var(--card-bg)",
        "surface-alt": "var(--color-surface-alt)",
        brand: "var(--color-brand)",
        "brand-hover": "var(--color-brand-hover)",
        "brand-dim": "var(--color-brand-dim)",
        "on-brand": "var(--color-on-brand)"
      },
      fontFamily: {
        sans: ["var(--kalaa-font-sans)"],
        mono: ["var(--kalaa-font-mono)"],
        serif: ["var(--kalaa-font-serif)"]
      },
      borderRadius: {
        none: "0px",
        sm: "var(--kalaa-radius-sm)",
        DEFAULT: "var(--kalaa-radius-sm)",
        md: "var(--kalaa-radius-sm)",
        lg: "var(--kalaa-radius-md)",
        xl: "var(--kalaa-radius-lg)",
        "2xl": "var(--kalaa-radius-lg)",
        "3xl": "var(--kalaa-radius-lg)",
        pill: "var(--kalaa-radius-pill)",
        full: "var(--kalaa-radius-full)"
      },
      boxShadow: {
        soft: "var(--kalaa-shadow-2)",
        outline: "0 0 0 1px var(--color-mist)"
      }
    }
  },
  plugins: []
};

export default config;
