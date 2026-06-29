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
        "card-bg": "var(--card-bg)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0, 0, 0, 0.25)",
        outline: "0 0 0 1px var(--color-mist)"
      }
    }
  },
  plugins: []
};

export default config;
