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
        ink: "#0b0f14",
        stone: "#f6f5f2",
        mist: "#e5e1da",
        graphite: "#2a2f36",
        accent: "#6b6f76"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(11, 15, 20, 0.08)",
        outline: "0 0 0 1px rgba(11, 15, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
