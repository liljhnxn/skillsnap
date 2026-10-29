import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#0b0c0f",
          900: "#111317",
          850: "#16181f",
          800: "#1b1e26",
          700: "#272c38",
          600: "#363c4d",
          500: "#4b5368",
        },
        brand: {
          purple: {
            DEFAULT: "#8b5cf6",
            muted: "#7c3aed",
            soft: "#a78bfa",
            deep: "#4c1d95",
            dark: "#2e1065",
          },
          green: {
            DEFAULT: "#10b981",
            muted: "#059669",
            soft: "#34d399",
            dark: "#064e3b",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

